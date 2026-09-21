# MarketTrust

**Civic information you can verify before you act.**

Invention sprint PoC (Andela × OSF) — not a product launch. Demonstrates the problem, users, how the solution works, and why it is worth developing further.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## What it does

1. **Ask** — English / Kiswahili Q&A over a Kenya SME civic corpus. Answers include:
   - Trust label: `Verified` / `Check locally` / `Unclear`
   - Public sources + **last reviewed** date
   - Clear next steps
   - Optional **plain language** mode
2. **Report** — Anonymous tips (stored in this browser only for the PoC)
3. **Cases** — Demo triage queue for human handoff

Unmatched questions stay **Unclear** (no invented advice). Ask works **offline** from the in-bundle corpus.

## Judge demo path

1. **Ask** → **Run 60-second judge demo** (or: “I got a KRA text — is it real?”)
2. Contrast with “Do I need a KRA PIN for my stall?”
3. Toggle **Plain language** / **SW**
4. **File a report on this** → **Cases** → triage (or **Load sample tip**)

## Operating constraints (designed in)

| Constraint | In the PoC |
|------------|------------|
| Trust & verification | Labels, sources, reviewed dates, Unclear |
| Low bandwidth | Static SPA, no model API, offline Ask |
| Accessibility / inclusion | Skip link, keyboard select, plain language, reduced motion |
| Privacy | Tips local + anonymous by default |
| Multilingual | EN + SW now; FR / AR / PT + local on roadmap |
| Local relevance | Kenya seed corpus; pack-based expansion |
| Clear next steps | Checklists + Report escalation |

## Why not ChatGPT?

Constrained corpus · Unclear when unmatched · Report → Cases · reproducible without an API key.

## Stack

Vite + React + TypeScript · client-side retrieval · LocalStorage tips

## Submission pack

| File | Use |
|------|-----|
| `FORM_SUMMARY.md` | Written summary field |
| `MarketTrust-Pitch-Deck.pdf` | Pitch deck (PDF) |
| `pitch-deck.html` | Source for regenerating the PDF |
| `DEMO_SCRIPT.md` | Record the demo video (local; see script) |
| `SUBMISSION.md` | Longer written summary |

## AI coding note

AI assistants helped implement and iterate. The **core idea** (find / verify / act for hustle-economy civic trust) is original to this capstone.

## Notes

- Seed sources are public portals — re-verify before production
- Not a substitute for emergency services
