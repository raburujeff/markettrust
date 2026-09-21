# MarketTrust — Capstone Summary (paste into form)

**Track:** Transparency & Accountability (cross-track: also Safety / Stability)  
**Country:** Kenya  

---

MarketTrust helps East African traders and small businesses find, understand, verify, and act on civic information they can trust — especially permits, taxes, tenders, market fees, and common scams.

**Problem.** In Kenya’s informal and SME economy, people often rely on WhatsApp forwards, informal “agents,” and rumours for high-stakes decisions. That leads to unpaid or unofficial fees, tender/M-Pesa scams, and weaker trust between communities and institutions. Official information exists, but it is hard to find, hard to trust, and hard to act on in everyday conditions.

**Users.** Market traders and micro-entrepreneurs (primary); small business owners navigating county and national requirements; and responders/partner organisations who need a simple tip → triage path.

**Approach.** The PoC is a WhatsApp-shaped web assistant with three flows: (1) Ask — English/Kiswahili questions over a curated Kenya SME civic corpus; every reply includes a trust label (Verified / Check locally / Unclear), public sources, and next steps; (2) Report — anonymous tips for scams, unofficial fees, rumours, or threats; (3) Cases — a lightweight triage queue showing human handoff after intake.

**Information sources.** Seed answers cite public portals and institutions such as Nairobi City County / county e-services guidance, BRS, KRA iTax, the Public Procurement Information Portal (tenders.go.ke), PPRA, Safaricom customer-care channels, SHA, and county labour offices. Where fees or procedures vary by locality, answers are labelled “Check locally” and point users to stamped notices or official desks rather than inventing certainty.

**Trust and accuracy.** MarketTrust does not present all answers as equally true. Retrieval is constrained to a curated corpus; unmatched questions return Unclear instead of hallucinated guidance. Trust labels and source links make verification visible. Anonymous reporting defaults to privacy-preserving tips. The product is explicitly not a substitute for emergency services.

**Use of AI tools.** AI coding assistants supported implementation (scaffolding, UI, and iteration speed). The core product idea — trusted civic answers for East Africa’s hustle economy via find/verify/act — was defined for this capstone. The demo PoC uses deterministic retrieval over the curated corpus so judges can reproduce answers without an API key; a production path would add WhatsApp delivery and stronger retrieval/LLM assistance with human escalation.

**Why it matters.** It meets people where they already seek advice (chat), makes trust explicit, and connects understanding to action and reporting — aligned with civic information people can trust and use in everyday life.
