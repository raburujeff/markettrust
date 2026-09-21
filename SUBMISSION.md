# MarketTrust — Written Summary

## One-liner
MarketTrust helps East African traders and small businesses **find, verify, and act on** civic information — through a WhatsApp-shaped chat with trust labels, sources, next steps, and anonymous reporting.

## Problem
In Kenya’s informal and SME economy, people rely on WhatsApp forwards, “agents,” and rumours for high-stakes decisions. Bad information costs money and trust. General AI chatbots can invent confident wrong advice — dangerous for permits, taxes, and scams.

## Intended users
- Market traders and micro-entrepreneurs (primary)
- Small business owners navigating county and national requirements
- Community responders / partner orgs who triage anonymous tips

## Solution (PoC)
1. **Ask** — EN/SW Q&A over a Kenya SME civic corpus with Verified / Check locally / Unclear, sources, and next steps. Unmatched → Unclear (no fake certainty). Intent-aware retrieval (KRA SMS ≠ KRA PIN).
2. **Report** — Anonymous tips; PoC stores in-browser only.
3. **Cases** — Triage queue for human handoff.

Designed for: trust/verification, privacy, multilingual access, low bandwidth (static SPA, no model API), local KE relevance, clear next steps.

## Challenge tracks
**Cross-track:** Transparency & Accountability · Safety, Reporting & Protection · Stability & Social Cohesion.

## How it works (demo)
1. “I got a KRA text — is it real?” → scam SMS guidance  
2. “Do I need a KRA PIN?” → registration path  
3. Report unofficial fee → triage in Cases  
Or use **Run 60-second judge demo** on Ask.

## Why develop further
Meets people in chat, makes trust visible, separates verification from fluency, and adds reporting escalation. Path: deeper corpus → WhatsApp → CSO/county pilots.

## Tech (PoC)
Vite, React, TypeScript. Client-side retrieval. LocalStorage tips. No API key required.

## Status
Working proof of concept. Not production-ready; not a substitute for emergency services.

## Repo / run
```bash
npm install
npm run dev
```
