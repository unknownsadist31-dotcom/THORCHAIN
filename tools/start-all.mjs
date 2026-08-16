#!/usr/bin/env node
/**
 * Combined runner for Production:
 * Starts both Next.js Web Server AND Telegram Support Bot in a single container/process.
 * They share the local data/support-chats.json store with zero latency.
 */

import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const PORT = process.env.PORT || '8080'

console.log('[start-all] Starting Next.js website and Telegram support bot...')

// 1. Start Next.js Server
const web = spawn('npx', ['next', 'start', '-p', PORT], {
  cwd: ROOT,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT }
})

// 2. Start Telegram Support Bot
const bot = spawn('node', ['tools/telegram-bot.mjs'], {
  cwd: ROOT,
  stdio: 'inherit',
  shell: true,
  env: process.env
})

function shutdown() {
  console.log('[start-all] Shutting down services...')
  web.kill('SIGTERM')
  bot.kill('SIGTERM')
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

web.on('exit', (code) => {
  if (code !== 0) {
    console.error(`[start-all] Next.js exited with code ${code}`)
  }
})

bot.on('exit', (code) => {
  if (code !== 0) {
    console.error(`[start-all] Telegram bot exited with code ${code}`)
  }
})
