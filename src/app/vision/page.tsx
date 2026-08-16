import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Vision | THORChain',
  description: 'The vision and roadmap for THORChain and decentralized cross-chain infrastructure.',
}

export default function VisionPage() {
  return <IframePage src="https://thorchain.org/vision" title="THORChain Vision" />
}
