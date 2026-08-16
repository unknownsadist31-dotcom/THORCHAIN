import { NextResponse } from 'next/server'
import { llmsTxt } from '@/lib/agent-discovery'

export const dynamic = 'force-dynamic'

export function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  })
}

