# Castlevania: Belmont's Curse Wiki

Fan-made wiki for **Castlevania: Belmont's Curse** (KONAMI / Evil Empire / Motion Twin — PC, PS5, Switch, Xbox Series X|S; launches October 15, 2026).

- Live site: https://castlevania-belmonts-curse.wiki
- Steam: https://store.steampowered.com/app/4231820/
- Deploy: Cloudflare Workers Builds (Git integration) — v1.0.0
- Build: `corepack enable && pnpm install --frozen-lockfile && pnpm run build`

## About

Boss strategies, Arcana build guides, weapon and relic loadouts, and full map
coverage for KONAMI's 2D action-exploration return to Castlevania. This wiki is
not affiliated with KONAMI or Evil Empire.

## Deploy

Cloudflare Worker Static Assets + CF-native Worker Builds Git integration
(push main → automatic build + deploy). Custom domains
(castlevania-belmonts-curse.wiki) are bound via the Cloudflare Workers Domains API.
