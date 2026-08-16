import type { Metadata } from 'next'
import { IframePage } from '@/app/components/iframe-page'

export const metadata: Metadata = {
  title: 'Node Operator | THORChain',
  description: 'Learn how to run a THORChain validator node.',
}

export default function NodeOperatorPage() {
  return <IframePage src="https://thorchain.org/node-operator" title="THORChain Node Operator" />
}
