import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Contributors | THORChain',
  description: 'Contributors to the THORChain ecosystem.',
}

export default function ContributorsPage() {
  return <IframePage src="https://thorchain.org/contributors" title="THORChain Contributors" />
}
