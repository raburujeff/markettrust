import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <>
      <section className="hero" aria-label="MarketTrust">
        <div className="hero-media" aria-hidden="true" />
        <div className="shell hero-copy">
          <h1>MarketTrust</h1>
          <p>
            Trusted civic answers for East Africa’s hustle economy — permits, taxes, tenders, and
            scams you can verify before you pay or move.
          </p>
          <div className="hero-actions">
            <Link to="/ask" className="btn btn-primary">
              Ask a question
            </Link>
            <Link to="/report" className="btn btn-ghost">
              Report a tip
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="section-label">The problem</p>
          <h2>Information people can trust — and act on</h2>
          <p className="lede">
            Traders and small businesses get advice from WhatsApp forwards, “agents”, and rumours.
            MarketTrust turns civic questions into plain answers with sources, a trust label, and a
            clear next step.
          </p>
          <div className="feature-row">
            <article>
              <h3>Find</h3>
              <p>Ask in English or Kiswahili — business permits, KRA, market fees, tenders.</p>
            </article>
            <article>
              <h3>Verify</h3>
              <p>
                Every reply shows Verified / Check locally / Unclear — plus the public source we used.
              </p>
            </article>
            <article>
              <h3>Act</h3>
              <p>Checklist next steps, or anonymously report a scam or unofficial fee demand.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <p className="section-label">Challenge tracks</p>
          <h2>Built for civic reality</h2>
          <div className="tracks">
            <div className="track">
              <h3>Transparency &amp; accountability</h3>
              <p>Understand permits, taxes, and official fees — without middlemen.</p>
            </div>
            <div className="track">
              <h3>Safety &amp; reporting</h3>
              <p>Spot tender and M-Pesa scams; file anonymous tips for triage.</p>
            </div>
            <div className="track">
              <h3>Stability &amp; cohesion</h3>
              <p>Separate market rumours from stamped county notices.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <p className="section-label">East Africa first</p>
          <h2>WhatsApp-shaped. Low bandwidth ready.</h2>
          <p className="lede">
            This PoC runs as a web chat that mirrors how people already ask for help on WhatsApp —
            designed for offline-friendly follow-ups, multilingual access, and human escalation via
            cases. Kenya seed corpus today; EAC expansion next.
          </p>
          <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
            <Link to="/ask" className="btn btn-primary">
              Open the demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
