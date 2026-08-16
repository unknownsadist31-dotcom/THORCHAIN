import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Ecosystem | THORChain',
  description: 'Explore the THORChain ecosystem of apps, wallets, and integrations.',
}

export default function EcosystemPage() {
  return <IframePage src="https://thorchain.org/ecosystem" title="THORChain Ecosystem" />
}
