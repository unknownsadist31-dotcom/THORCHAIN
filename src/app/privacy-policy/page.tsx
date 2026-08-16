import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Privacy Policy | THORChain',
  description: 'THORChain Privacy Policy.',
}

export default function PrivacyPolicyPage() {
  return <IframePage src="https://thorchain.org/privacy-policy" title="Privacy Policy" />
}
