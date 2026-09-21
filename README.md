# MarketTrust

**Trusted civic answers for East Africa’s informal & SME economy.**

Find · Verify · Act — WhatsApp-shaped civic Q&A with trust labels, sources, next steps, anonymous tips, and a triage queue.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## What it does

1. **Ask** — EN/SW chat over a Kenya SME civic corpus. Answers include a trust label (`Verified` / `Check locally` / `Unclear`), sources, and next steps.
2. **Report** — Anonymous tips (scam, unofficial fees, rumours, threats).
3. **Cases** — Demo triage queue (browser `localStorage`).

## Demo path

1. **Ask** → “How do I get a Nairobi business permit?”
2. Try “Someone says I won a tender”
3. Switch **SW** → ask about `kibali` / `biashara`
4. **Report** a tip → open **Cases** and triage

## Stack

- Vite + React + TypeScript
- Client-side retrieval (no API key required for the PoC)
- LocalStorage for tip cases

## Submission materials

| File | Use |
|------|-----|
| `FORM_SUMMARY.md` | Paste into the written summary field |
| `MarketTrust-Pitch-Deck.pdf` | Pitch deck upload |
| `DEMO_SCRIPT.md` | Record the demo video |

## Notes

- Seed sources point at public government portals — verify before production use
- Not a substitute for emergency services
