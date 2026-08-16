# AGENTS.md — THORChain Swap

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
