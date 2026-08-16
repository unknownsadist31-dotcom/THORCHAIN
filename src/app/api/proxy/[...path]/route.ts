import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const PROXY_TARGETS: Record<string, string> = {
  thorswap: 'https://api.thorswap.net',
  thorchain: 'https://api.thorchain.org',
  'lq-thornode': 'https://gateway.liquify.com/chain/thorchain_api',
  'lq-midgard': 'https://gateway.liquify.com/chain/thorchain_midgard',
  midgard: 'https://midgard.ninerealms.com',
  thornode: 'https://thornode.ninerealms.com',
  sanity: 'https://355nlzcp.api.sanity.io',
  swapkit: 'https://storage.googleapis.com/token-list-swapkit',
  mayamidgard: 'https://midgard.mayachain.info',
  mayanode: 'https://mayanode.mayachain.info',
  dexscreener: 'https://api.dexscreener.com',
}


async function proxyRequest(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path = [] } = await context.params
  if (!path.length) {
    return NextResponse.json({ error: 'Missing proxy path' }, { status: 400 })
  }

  const prefix = path[0]
  const targetBase = PROXY_TARGETS[prefix]
  if (!targetBase) {
    return NextResponse.json({ error: `Unknown proxy target: ${prefix}` }, { status: 400 })
  }

  const targetPath = '/' + path.slice(1).join('/')
  const url = new URL(req.url)
  const targetUrl = `${targetBase}${targetPath}${url.search}`

  const headers: Record<string, string> = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept: req.headers.get('accept') || '*/*',
  }

  if (prefix === 'thorswap') {
    headers['Referer'] = 'https://app.thorswap.finance'
    headers['Origin'] = 'https://app.thorswap.finance'
  }

  const contentType = req.headers.get('content-type')
  if (contentType) {
    headers['Content-Type'] = contentType
  }

  const method = req.method
  const fetchOptions: RequestInit = {
    method,
    headers,
  }

  if (method !== 'GET' && method !== 'HEAD') {
    try {
      fetchOptions.body = await req.text()
    } catch {
      // no body
    }
  }

  try {
    const res = await fetch(targetUrl, {
      ...fetchOptions,
      signal: AbortSignal.timeout(20_000),
    })

    const responseContentType = res.headers.get('content-type') || 'application/json'
    const buffer = await res.arrayBuffer()

    return new NextResponse(buffer, {
      status: res.status,
      headers: {
        'Content-Type': responseContentType,
        'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=120',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err: any) {
    if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
      return NextResponse.json({ error: 'Upstream timeout' }, { status: 504 })
    }
    return NextResponse.json({ error: 'Upstream error', message: err?.message }, { status: 502 })
  }
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, ctx)
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, ctx)
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, ctx)
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, ctx)
}
