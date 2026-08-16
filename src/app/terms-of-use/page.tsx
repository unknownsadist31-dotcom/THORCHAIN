import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Terms of Use | THORChain',
  description: 'THORChain Terms of Use.',
}

export default function TermsOfUsePage() {
  return <IframePage src="https://thorchain.org/terms-of-use" title="Terms of Use" />
}
