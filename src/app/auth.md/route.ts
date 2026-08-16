import { NextResponse } from 'next/server'
import { authMarkdown } from '@/lib/agent-discovery'

export const dynamic = 'force-dynamic'

export function GET() {
  return new NextResponse(authMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  })
}

