# MarketTrust — Capstone Summary (paste into form)

**Track:** Transparency & Accountability (cross-track: Safety, Reporting & Protection · Stability & Social Cohesion)  
**Country / local relevance:** Kenya seed (county permits, KRA, PPIP, markets); corpus pattern designed to adapt to other OSF geographies  

---

MarketTrust helps traders and small businesses **find, verify, and act on** civic information — permits, taxes, tenders, market fees, and scams — through a WhatsApp-shaped assistant that makes trust visible instead of implying it.

**Problem.** In Kenya’s hustle economy, people decide with WhatsApp forwards and “agents.” Official portals exist but are hard to use under pressure. Fluent general AI can invent fees or refund steps with false certainty — costly when money and safety are on the line.

**Users.** Market traders and micro-entrepreneurs (primary); small firms navigating county/national rules; responders and partners who need anonymous tip → triage.

**Approach.** Three PoC flows: (1) **Ask** — EN/SW retrieval over a curated Kenya SME corpus; every matched reply shows a trust label (Verified / Check locally / Unclear), public sources, **last reviewed date**, and next steps; unmatched → Unclear (no hallucination); plain-language mode for lower literacy / digital confidence; (2) **Report** — anonymous tips, stored in-browser only for the PoC; (3) **Cases** — human triage handoff. Offline: Ask still runs from the in-bundle corpus.

**Information sources.** Nairobi City County / county e-services, BRS, KRA iTax, PPIP (tenders.go.ke), PPRA, Safaricom care channels, SHA, county labour offices. Locally variable procedures use **Check locally**.

**Trust and accuracy.** Constrained corpus + intent-aware scoring (e.g. “I got a KRA text” ≠ “KRA PIN”). Labels and source links make verification easy. Entries carry a **reviewed date** so users know when guidance was last checked. Privacy by default on tips. Not a substitute for emergency services (999 / 112).

**Operating constraints addressed.** Trust/verification · low bandwidth (static SPA, offline corpus) · accessibility (skip link, keyboard select, plain language, reduced motion) · privacy (local tips, anonymous default) · multilingual (EN/SW live; FR/AR/PT + local languages on the expansion path) · local relevance (Kenya seed, adaptable packs) · clear next steps + Report.

**Use of AI tools (judging criterion).** AI coding assistants accelerated UI, retrieval iteration, and submission packaging. The **core capstone idea** — trusted civic answers for the hustle economy via find/verify/act — is original to this submission, not AI-generated. The demo uses **deterministic retrieval** so judges can reproduce answers without an API key.

**Uniqueness.** Separates fluency from trust: Unclear is a first-class outcome; intent-aware civic corpus + anonymous Report→Cases is not “another chatbot.”

**Scalability.** Swap locale corpus packs (laws, institutions, languages) while keeping the same trust-label + next-steps + escalation shell — Kenya first, OSF regions next.

**Potential impact.** Fewer mistaken payments and scam clicks; labelled tips for partners; a path to WhatsApp delivery where traders already are.

**Why develop further.** Invention sprint PoC proves the loop. Next: Meta Cloud WhatsApp, deeper maintained corpus with counties/CSOs, case routing to verified responders.
