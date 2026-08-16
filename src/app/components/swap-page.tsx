import Script from 'next/script'
import { Suspense } from 'react'
import { Footer } from '@/components/footer/footer'
import { GlobalDialog } from '@/components/global-dialog'
import { Header } from '@/components/header/header'
import { Swap } from '@/components/swap/swap'
import { AppConfig } from '@/config'

export function SwapPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense>
        <Swap />
      </Suspense>
      <GlobalDialog />
      <Footer />
      {AppConfig.pixelEvent && (
        <Script
          id="twitter-events"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `if (typeof window !== 'undefined' && typeof window.twq === 'function') { window.twq('event', '${AppConfig.pixelEvent}', {}); }`
          }}
        />
      )}
    </main>
  )
}