import { NextResponse } from 'next/server'
import { agentsMarkdown } from '@/lib/agent-discovery'

export const dynamic = 'force-dynamic'

export function GET() {
  return new NextResponse(agentsMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  })
}

