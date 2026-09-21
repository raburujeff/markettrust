# MarketTrust

**Trusted civic answers for East Africa’s informal & SME economy.**

Civic invention PoC covering transparency, safety, and social cohesion tracks.

## What it does

1. **Ask** — WhatsApp-shaped chat. Answers include a trust label (`Verified` / `Check locally` / `Unclear`), sources, and next steps. EN + SW.
2. **Report** — Anonymous tips (scam, unofficial fees, rumours, threats).
3. **Cases** — Demo triage queue (localStorage) showing human handoff.

Built as a fast, offline-friendly web PoC. Production path: Meta WhatsApp + case management for partner orgs.

## Quick start

```bash
cd products/markettrust
npm install
npm run dev
```

## Demo script

1. Open **Ask** → try “How do I get a Nairobi business permit?”
2. Try “Someone says I won a tender”
3. Switch **SW** and ask about `kibali` / `biashara`
4. **Report** an unofficial fee → open **Cases** and triage

## Stack

- Vite + React + TypeScript
- Client-side retrieval over a Kenya SME civic corpus (no API key required for the PoC)
- LocalStorage for tip cases

## Notes

- Seed sources point at public government portals — verify before production
- Not a substitute for emergency services
