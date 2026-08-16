import { writeFileSync } from 'fs';

const agentsMarkdown = `# AGENTS.md — THORChain Swap

Guidance for AI agents interacting with the public THORChain Swap web interface.

## What This Site Does

THORChain Swap is a public web interface for native cross-chain swaps powered by THORChain and Maya Protocol.
There are no user accounts; users connect their own wallets in the browser and sign transactions locally.

## MCP Server

A public, unauthenticated, rate-limited MCP server (streamable HTTP, stateless, JSON responses) is available at:

- Endpoint: /mcp
- Server card: /.well-known/mcp-server-card

Tools (read-only):

- get_swap_quote — fetch a THORChain swap quote for an asset pair.
- list_pools — list liquidity pools with status, depths, and USD asset price.
- get_network_status — current THORChain network parameters.

## Public Pages

- Swap: /swap
- Pool: https://pool.thorchain.org/
- Bond: https://bond.thorchain.org/
- Memo: https://memo.thorchain.org/
- TCY: https://tcy.thorchain.org/
- THORName: https://thorname.thorchain.org/
`;

const openapi = {
  openapi: '3.1.0',
  info: {
    title: 'THORChain Swap Public API',
    version: '0.1.0',
    description: 'Public support endpoints exposed by the THORChain Swap web interface.'
  },
  servers: [{ url: 'https://thorchain.org' }],
  paths: {
    '/api/newsletter': {
      post: {
        summary: 'Subscribe an email address to THORChain Swap updates.',
        operationId: 'subscribeNewsletter',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string', format: 'email' }
                },
                additionalProperties: false
              }
            }
          }
        },
        responses: {
          '200': { description: 'Subscription accepted.' },
          '400': { description: 'Invalid email address.' }
        }
      }
    }
  }
};

writeFileSync('public/AGENTS.md', agentsMarkdown, 'utf8');
writeFileSync('public/openapi.json', JSON.stringify(openapi, null, 2), 'utf8');
console.log('Static discovery files created in public/');
