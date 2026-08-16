import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Brand Assets | THORChain',
  description: 'Download official THORChain brand assets, logos, and guidelines.',
}

export default function BrandAssetsPage() {
  return <IframePage src="https://thorchain.org/brand-assets" title="THORChain Brand Assets" />
}
