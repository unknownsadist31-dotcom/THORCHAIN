import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Integrate | THORChain',
  description: 'Integrate THORChain into your app, wallet, or website. Free API for any platform.',
}

export default function IntegratePage() {
  return <IframePage src="https://thorchain.org/integrate" title="Integrate THORChain" />
}
