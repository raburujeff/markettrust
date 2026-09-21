# MarketTrust — Written Summary

## One-liner
MarketTrust helps East African traders and small businesses **find, verify, and act on** civic information — permits, taxes, tenders, fees, and scams — through a WhatsApp-shaped chat with trust labels, sources, and clear next steps.

## Problem
In Kenya’s informal and SME economy, people rely on WhatsApp forwards, “agents,” and rumours for high-stakes decisions: business permits, county fees, KRA obligations, tenders, and payments. Bad information leads to lost money, unofficial fee demands, and eroded trust between communities and institutions.

## Intended users
- Market traders and micro-entrepreneurs (primary)
- Small business owners navigating county and national requirements
- Community responders / partner orgs who triage anonymous tips (Cases view)

## Solution (PoC)
A lightweight web product with three flows:

1. **Ask** — Multilingual (English / Kiswahili) Q&A over a Kenya SME civic corpus. Every answer includes:
   - Trust label: **Verified** / **Check locally** / **Unclear**
   - Public sources (e.g. county portals, KRA, PPIP)
   - Actionable next steps
2. **Report** — Anonymous tips for scams, unofficial fees, rumours, or threats
3. **Cases** — Simple triage queue showing human handoff after AI intake

Designed for real-world constraints: low-bandwidth UX, privacy by default on tips, local relevance (Kenya seed; EAC expansion path), and WhatsApp-shaped interaction for eventual Meta Cloud deployment.

## Challenge tracks
**Cross-track**, led by **Transparency & Accountability**, with **Safety, Reporting & Protection** (anonymous tips, scam pathways) and **Stability & Social Cohesion** (rumour vs stamped notices).

## How it works (demo)
1. User asks: “How do I get a Nairobi business permit?”
2. MarketTrust returns a Verified answer, official sources, and a checklist
3. User can report an unofficial fee demand anonymously
4. A responder triages the tip in Cases

## Why develop further
- Meets people where they already are (chat / WhatsApp)
- Makes trust *visible* instead of implied
- Separates retrieval + verification + action + escalation
- Clear path: deepen corpus → live WhatsApp → partner org case routing → county/CSO pilots

## Tech (PoC)
Vite, React, TypeScript. Client-side retrieval over a curated knowledge base (no API key required for the demo). Tips stored locally for the PoC triage queue.

## Status
Working proof of concept. Not production-ready; not a substitute for emergency services.

## Repo / run
```bash
npm install
npm run dev
```
