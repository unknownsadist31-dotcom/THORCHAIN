import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Pro Trader | THORChain',
  description: 'Pro trading tools and resources on THORChain.',
}

export default function ProTraderPage() {
  return <IframePage src="https://thorchain.org/pro-trader" title="THORChain Pro Trader" />
}
