import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'FAQ | THORChain',
  description: 'Frequently Asked Questions about THORChain.',
}

export default function FAQPage() {
  return <IframePage src="https://thorchain.org/faq" title="THORChain FAQ" />
}
