import path from 'path'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const SUBDOMAIN_ROUTES = [
  { path: '/tcy', host: 'tcy.thorchain.org' },
  { path: '/bond', host: 'bond.thorchain.org' },
  { path: '/memo', host: 'memo.thorchain.org' },
  { path: '/pool', host: 'pool.thorchain.org' },
  { path: '/thorname', host: 'thorname.thorchain.org' }
] as const

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
const discoveryLinks = [
  '</.well-known/mcp-server-card.json>; rel="mcp-server-card"; type="application/json"',
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</auth.md>; rel="service-doc"; type="text/markdown"',
  '</llms.txt>; rel="alternate"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"'
].join(', ')

const proxyRewrites = [
  // THORSwap API
  { source: '/api/proxy/thorswap/:path*', destination: 'https://api.thorswap.net/:path*' },
  // THORChain memoless
  { source: '/api/proxy/thorchain/:path*', destination: 'https://api.thorchain.org/:path*' },
  // Liquify THORNode
  { source: '/api/proxy/lq-thornode/:path*', destination: 'https://gateway.liquify.com/chain/thorchain_api/:path*' },
  // Liquify Midgard
  { source: '/api/proxy/lq-midgard/:path*', destination: 'https://gateway.liquify.com/chain/thorchain_midgard/:path*' },
  // Maya Midgard
  { source: '/api/proxy/mayamidgard/:path*', destination: 'https://midgard.mayachain.info/:path*' },
  // MayaNode
  { source: '/api/proxy/mayanode/:path*', destination: 'https://mayanode.mayachain.info/:path*' },
  // DexScreener
  { source: '/api/proxy/dexscreener/:path*', destination: 'https://api.dexscreener.com/:path*' },
  // SwapKit Token Logo CDN (production bucket; -dev 404s for many assets)
  { source: '/api/proxy/logos/:path*', destination: 'https://storage.googleapis.com/token-list-swapkit/:path*' },
]

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-slider',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-separator',
      '@react-spring/web',
      'date-fns',
      'ethers',
    ],
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: discoveryLinks
          }
        ]
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Signal',
            value: 'search=yes, ai-input=yes, ai-train=yes'
          }
        ]
      }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: SUBDOMAIN_ROUTES.map(({ host, path }) => ({
        source: '/',
        has: [{ type: 'host', value: host }],
        destination: path
      })),
      afterFiles: proxyRewrites,
      fallback: []
    }
  },
  webpack: (config, { webpack, isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd(), 'src'),
    }
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: { request: string }) => {
        resource.request = resource.request.replace(/^node:/, '')
      })
    )
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        buffer: false,
        http: false,
        https: false,
        zlib: false,
        fs: false,
        net: false,
        tls: false,
        'supports-color': false
      }
      config.output.chunkLoadTimeout = 300000
    }
    return config
  }
}

export default withNextIntl(nextConfig)
