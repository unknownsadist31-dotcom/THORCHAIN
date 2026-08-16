import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Bond $RUNE | THORChain',
  description: 'Bond RUNE to secure the THORChain network.',
}

export default function BondRunePage() {
  return <IframePage src="https://thorchain.org/bond-rune" title="Bond $RUNE" />
}
