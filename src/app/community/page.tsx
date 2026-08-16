import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Community | THORChain',
  description: 'Join the THORChain community. Connect with other users, developers, and node operators.',
}

export default function CommunityPage() {
  return <IframePage src="https://thorchain.org/community" title="THORChain Community" />
}
