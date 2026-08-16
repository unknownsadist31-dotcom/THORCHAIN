#!/usr/bin/env node
/**
 * Standalone THORSwap support bot (long-poll).
 *
 * Can run:
 *   1. ON THE SAME HOST as the website: shares data/support-chats.json directly.
 *   2. ON A SEPARATE VPS: syncs via HTTP with the website using SITE_URL & CHAT_BOT_SECRET.
 *
 * Env:
 *   SITE_URL               e.g. https://thorchain.fly.dev or http://localhost:8081 (for separate VPS)
 *   CHAT_BOT_SECRET        secret key (default falls back to TELEGRAM_BOT_TOKEN slice)
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_ADMIN_IDS     comma-separated (default 7098060388,8311638055)
 *   TELEGRAM_GROUP_ID
 *   CHAT_STORE_PATH        override path to support-chats.json (local mode)
 */

import { mkdirSync, readFileSync, writeFileSync, renameSync, existsSync, unlinkSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Load .env.local / .env if present
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.join(ROOT, envFile)
  if (existsSync(envPath)) {
    const lines = readFileSync(envPath, 'utf8').split('\n')
    for (const line of lines) {
      const match = line.trim().match(/^([^=]+)=(.*)$/)
      if (match && !process.env[match[1].trim()]) {
        process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '')
      }
    }
  }
}

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8140825280:AAEd2TDo2fgZv_bDEfu7wNggxHrD7jHdr8g'
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_IDS || '7098060388,8311638055')
  .split(',')
  .map(s => Number(s.trim()))
  .filter(n => Number.isFinite(n) && n > 0)
const GROUP_ID = process.env.TELEGRAM_GROUP_ID || '-5160305858'
const STORE_PATH =
  process.env.CHAT_STORE_PATH || path.join(ROOT, 'data', 'support-chats.json')
const SITE_URL = process.env.SITE_URL ? process.env.SITE_URL.replace(/\/+$/, '') : ''
const CHAT_BOT_SECRET =
  process.env.CHAT_BOT_SECRET ||
  process.env.TELEGRAM_WEBHOOK_SECRET ||
  TOKEN.slice(-16) ||
  'thorswap-chat-dev-secret'
const API = `https://api.telegram.org/bot${TOKEN}`

let offset = 0
let running = true

// ── Local Store Helper ───────────────────────────────────────────────────

function emptyStore() {
  return { sessions: {}, adminPending: {} }
}

function ensureDir() {
  const dir = path.dirname(STORE_PATH)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

function readStore() {
  try {
    ensureDir()
    if (!existsSync(STORE_PATH)) return emptyStore()
    const parsed = JSON.parse(readFileSync(STORE_PATH, 'utf8'))
    if (!parsed.sessions) parsed.sessions = {}
    if (!parsed.adminPending) parsed.adminPending = {}
    return parsed
  } catch {
    return emptyStore()
  }
}

function writeStore(data) {
  try {
    ensureDir()
    const tmp = `${STORE_PATH}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`
    writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8')
    try {
      renameSync(tmp, STORE_PATH)
    } catch {
      writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf8')
      if (existsSync(tmp)) {
        try { unlinkSync(tmp) } catch { /* ignore */ }
      }
    }
  } catch (err) {
    console.error('[bot] writeStore error:', err)
  }
}

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

function getSessionLocal(id) {
  return readStore().sessions[id] || null
}

function appendAdminMessageLocal(sessionId, text, adminName) {
  const trimmed = String(text || '').trim()
  if (!trimmed || trimmed.length > 4000) return { ok: false, error: 'empty message' }
  const data = readStore()
  const session = data.sessions[sessionId]
  if (!session) return { ok: false, error: 'session not found' }
  const msg = {
    id: uid('msg'),
    role: 'admin',
    text: trimmed,
    ts: Date.now(),
    adminName: adminName || 'Support'
  }
  session.messages.push(msg)
  if (session.messages.length > 200) session.messages = session.messages.slice(-200)
  session.updatedAt = msg.ts
  writeStore(data)
  return { ok: true, msg }
}

function setPendingLocal(adminId, sessionId) {
  const data = readStore()
  if (!data.sessions[sessionId]) return false
  data.adminPending[String(adminId)] = {
    mode: 'awaiting_reply',
    sessionId,
    since: Date.now()
  }
  writeStore(data)
  return true
}

function clearPendingLocal(adminId) {
  const data = readStore()
  delete data.adminPending[String(adminId)]
  writeStore(data)
}

function getPendingLocal(adminId) {
  return readStore().adminPending[String(adminId)] || null
}

function listRecentLocal(limit = 10) {
  return Object.values(readStore().sessions)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, limit)
}

// ── Remote API Helper (for separate VPS) ──────────────────────────────────

async function siteApi(action, payload = {}, method = 'POST') {
  if (!SITE_URL) return null
  try {
    const url =
      method === 'GET'
        ? `${SITE_URL}/api/chat/admin?${new URLSearchParams(payload)}`
        : `${SITE_URL}/api/chat/admin`
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-chat-bot-secret': CHAT_BOT_SECRET
      },
      body: method === 'POST' ? JSON.stringify({ action, ...payload }) : undefined
    })
    const data = await res.json().catch(() => null)
    return { ok: res.ok, status: res.status, data }
  } catch (err) {
    console.error(`[bot] siteApi ${action} error:`, err.message)
    return null
  }
}

async function getSessionAsync(sessionId) {
  if (!sessionId) return null
  // 1. Try remote site if configured
  if (SITE_URL) {
    const res = await siteApi('get', { sessionId }, 'GET')
    if (res?.ok && res.data && !res.data.error) {
      return res.data
    }
  }
  // 2. Fallback to local store
  return getSessionLocal(sessionId)
}

async function listRecentAsync(limit = 10) {
  if (SITE_URL) {
    const res = await siteApi('list', { limit: String(limit) }, 'GET')
    if (res?.ok && Array.isArray(res.data?.sessions)) {
      return res.data.sessions
    }
  }
  return listRecentLocal(limit)
}

// In-memory pending fallback for quick response
const memoryPending = new Map()

async function getPendingAsync(adminId) {
  if (memoryPending.has(String(adminId))) {
    return memoryPending.get(String(adminId))
  }
  const local = getPendingLocal(adminId)
  if (local) return local

  if (SITE_URL) {
    const res = await siteApi('pending_get', { adminId })
    if (res?.ok && res.data?.pending) {
      return res.data.pending
    }
  }
  return null
}

function setPendingAsync(adminId, sessionId) {
  memoryPending.set(String(adminId), {
    mode: 'awaiting_reply',
    sessionId,
    since: Date.now()
  })
  setPendingLocal(adminId, sessionId)
  if (SITE_URL) {
    siteApi('pending_set', { adminId, sessionId }).catch(() => {})
  }
}

function clearPendingAsync(adminId) {
  memoryPending.delete(String(adminId))
  clearPendingLocal(adminId)
  if (SITE_URL) {
    siteApi('pending_clear', { adminId }).catch(() => {})
  }
}

// ── Telegram Bot API ─────────────────────────────────────────────────────

function esc(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

async function tg(method, body) {
  const res = await fetch(`${API}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  })
  const data = await res.json().catch(() => null)
  if (!data?.ok) {
    console.error(`[bot] ${method} failed:`, data?.description || res.status)
  }
  return data
}

async function send(chatId, text, extra = {}) {
  return tg('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    ...extra
  })
}

function isAdmin(id) {
  return ADMIN_IDS.includes(Number(id))
}

function extractSessionId(text) {
  if (!text) return null
  const m =
    String(text).match(/sess_[a-z0-9]+_[a-z0-9]+/i) ||
    String(text).match(/\/reply\s+(sess_[a-z0-9]+_[a-z0-9]+)/i)
  return m ? m[1] || m[0] : null
}

function adminLabel(from) {
  if (!from) return 'Support'
  if (from.username) return `@${from.username}`
  return from.first_name || `Admin ${from.id}`
}

async function deliverReply(sessionId, text, from, chatId) {
  const admin = adminLabel(from)
  let delivered = false

  // 1. If remote SITE_URL is configured, deliver to website API
  if (SITE_URL) {
    const res = await siteApi('reply', {
      sessionId,
      text,
      adminName: admin,
      adminId: from.id
    })
    if (res?.ok && res.data?.ok) {
      delivered = true
    } else {
      console.warn('[bot] remote reply returned:', res?.data?.error || res?.status)
    }
  }

  // 2. If not delivered yet (or in local mode), deliver to local store
  if (!delivered) {
    const localRes = appendAdminMessageLocal(sessionId, text, admin)
    if (localRes.ok) {
      delivered = true
    }
  }

  clearPendingAsync(from.id)

  if (!delivered) {
    await send(
      chatId,
      `⚠️ <b>Delivery Failed:</b> Session not found or site is unreachable.\n` +
        `Use /pending to see active chats.`
    )
    return false
  }

  await send(
    chatId,
    `✅ <b>Reply delivered to site chat</b>\nSession: <code>${esc(sessionId)}</code>\n\n${esc(text.slice(0, 500))}`
  )

  // Notify other admins / group
  const note = `✅ <b>${esc(admin)}</b> replied to <code>${esc(sessionId)}</code>`
  for (const id of [...ADMIN_IDS, Number(GROUP_ID)]) {
    if (Number(id) === Number(chatId) || Number(id) === Number(from.id)) continue
    await send(id, note).catch(() => {})
  }
  return true
}

async function enterReplyMode(chatId, adminId, sessionId) {
  const session = await getSessionAsync(sessionId)
  if (!session) {
    await send(
      chatId,
      '⚠️ Session not found or expired on the site.\nUse /pending to view recent chats.'
    )
    return
  }
  setPendingAsync(adminId, sessionId)
  await send(
    chatId,
    `✍️ <b>Reply mode ON</b>\n` +
      `Session: <code>${esc(sessionId)}</code>\n` +
      `User: <b>${esc(session.userLabel || 'Visitor')}</b>\n\n` +
      `Type your answer now.\n/cancel to abort.`,
    {
      reply_markup: {
        force_reply: true,
        selective: true,
        input_field_placeholder: 'Type admin reply…'
      }
    }
  )
}

async function showHistory(chatId, sessionId) {
  const session = await getSessionAsync(sessionId)
  if (!session) {
    await send(chatId, '⚠️ Session not found.')
    return
  }
  const msgs = session.messages || []
  const lines = msgs
    .filter(m => m.role !== 'system')
    .slice(-12)
    .map(m => {
      const who = m.role === 'user' ? '👤 User' : `🛡 ${m.adminName || 'Admin'}`
      return `${who}: ${esc(m.text)}`
    })
  await send(
    chatId,
    `📋 <b>History</b> <code>${esc(sessionId)}</code>\n\n${lines.join('\n\n') || '(empty)'}`,
    {
      reply_markup: {
        inline_keyboard: [[{ text: '💬 Reply', callback_data: `reply:${sessionId}` }]]
      }
    }
  )
}

async function handleCallback(cb) {
  const chatId = cb.message?.chat?.id
  const data = cb.data || ''
  const from = cb.from
  await tg('answerCallbackQuery', { callback_query_id: cb.id })

  if (!chatId || !isAdmin(from?.id)) {
    if (chatId) await send(chatId, '⛔ Not authorized.')
    return
  }

  if (data.startsWith('reply:')) {
    await enterReplyMode(chatId, from.id, data.slice(6))
    return
  }
  if (data.startsWith('hist:')) {
    await showHistory(chatId, data.slice(5))
  }
}

async function handleMessage(msg) {
  let text = (msg.text || '').trim()
  if (!text || !msg.from) return

  const chatId = msg.chat.id
  const from = msg.from
  const isPrivate = msg.chat.type === 'private'

  // Strip @botname from group commands: /reply@bot ...
  if (text.startsWith('/')) {
    text = text.replace(/^\/([a-zA-Z0-9_]+)@[A-Za-z0-9_]+/, '/$1')
  }

  // Ignore plain group chatter
  if (!isPrivate && !text.startsWith('/') && !msg.reply_to_message) return

  if (!isAdmin(from.id)) {
    if (isPrivate) await send(chatId, 'This bot is for THORSwap support admins only.')
    return
  }

  if (text === '/start' || text === '/help') {
    await send(
      chatId,
      `🟢 <b>THORSwap Support Bot</b> — online\n\n` +
        `When a visitor chats on the site you get a notification.\n\n` +
        `<b>Reply (any of these):</b>\n` +
        `1. Tap <b>Reply</b> under the alert, then type\n` +
        `2. Swipe-reply on the alert message, then type\n` +
        `3. <code>/reply SESSION_ID your message</code>\n\n` +
        `<b>Other</b>\n` +
        `/pending — list active chats\n` +
        `/cancel — leave reply mode\n` +
        `/help`
    )
    return
  }

  if (text === '/cancel') {
    clearPendingAsync(from.id)
    await send(chatId, 'Cancelled reply mode.')
    return
  }

  if (text === '/pending' || text.startsWith('/pending ')) {
    const recent = await listRecentAsync(10)
    if (!recent.length) {
      await send(chatId, 'No chat sessions found yet.')
      return
    }
    const buttons = recent.slice(0, 5).map(s => [
      { text: `💬 Reply ${s.userLabel || s.id.slice(-6)}`, callback_data: `reply:${s.id}` },
      { text: `📋 History`, callback_data: `hist:${s.id}` }
    ])
    const lines = recent.map(s => {
      const last =
        s.lastUser ||
        [...(s.messages || [])].reverse().find(m => m.role === 'user')?.text ||
        '(no msg)'
      return (
        `• <code>${esc(s.id)}</code> — <b>${esc(s.userLabel || 'Visitor')}</b>\n` +
        `  ${esc(String(last).slice(0, 80))}`
      )
    })
    await send(chatId, `📬 <b>Recent chats</b>\n\n${lines.join('\n\n')}`, {
      reply_markup: { inline_keyboard: buttons }
    })
    return
  }

  if (text.startsWith('/reply ')) {
    const rest = text.slice(7).trim()
    const sp = rest.indexOf(' ')
    if (sp <= 0) {
      await send(chatId, 'Usage: <code>/reply SESSION_ID your message</code>')
      return
    }
    await deliverReply(rest.slice(0, sp).trim(), rest.slice(sp + 1).trim(), from, chatId)
    return
  }

  // Telegram native swipe-reply on a support notification → extract session id
  if (msg.reply_to_message) {
    const sid =
      extractSessionId(msg.reply_to_message.text) ||
      extractSessionId(msg.reply_to_message.caption)
    if (sid) {
      await deliverReply(sid, text, from, chatId)
      return
    }
  }

  // Pending typed reply after tapping Reply button / force_reply
  const pending = await getPendingAsync(from.id)
  if (pending?.mode === 'awaiting_reply') {
    await deliverReply(pending.sessionId, text, from, chatId)
    return
  }

  if (isPrivate) {
    await send(
      chatId,
      'No active reply mode.\nTap <b>Reply</b> on a chat alert, swipe-reply it, or use /pending.\n/help'
    )
  }
}

async function handleUpdate(update) {
  try {
    if (update.callback_query) {
      await handleCallback(update.callback_query)
      return
    }
    if (update.message) {
      await handleMessage(update.message)
    }
  } catch (err) {
    console.error('[bot] update error:', err)
  }
}

async function loop() {
  console.log('[bot] THORSwap support bot starting')
  if (SITE_URL) {
    console.log('[bot] Mode: REMOTE SYNC via HTTP API')
    console.log('[bot] Site URL:', SITE_URL)
  } else {
    console.log('[bot] Mode: LOCAL DIRECT STORE')
    console.log('[bot] Store path:', STORE_PATH)
  }
  console.log('[bot] Admins:', ADMIN_IDS.join(', '))

  try {
    await tg('deleteWebhook', { drop_pending_updates: false })
  } catch (e) {
    console.warn('[bot] deleteWebhook:', e.message)
  }

  const me = await tg('getMe')
  if (!me?.ok) {
    console.error('[bot] getMe failed — check TELEGRAM_BOT_TOKEN', me)
    process.exit(1)
  }
  console.log(`[bot] Logged in as @${me.result.username} — listening…`)

  while (running) {
    try {
      const data = await tg('getUpdates', {
        offset,
        timeout: 25,
        allowed_updates: ['message', 'callback_query']
      })
      if (!data?.ok) {
        console.error('[bot] getUpdates error:', data?.description)
        await sleep(3000)
        continue
      }
      for (const update of data.result || []) {
        offset = update.update_id + 1
        await handleUpdate(update)
      }
    } catch (e) {
      console.error('[bot] loop error:', e.message)
      await sleep(3000)
    }
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

process.on('SIGINT', () => {
  running = false
  console.log('[bot] stopping…')
  process.exit(0)
})
process.on('SIGTERM', () => {
  running = false
  process.exit(0)
})

loop()
