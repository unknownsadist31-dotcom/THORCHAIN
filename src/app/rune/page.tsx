import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'RUNE | THORChain',
  description: 'Learn about RUNE, the native token of THORChain.',
}

export default function RunePage() {
  return <IframePage src="https://thorchain.org/rune" title="RUNE - THORChain" />
}
