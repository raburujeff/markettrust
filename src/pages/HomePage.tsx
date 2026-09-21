import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <>
      <section className="hero" aria-label="MarketTrust">
        <div className="hero-media" aria-hidden="true" />
        <div className="shell hero-copy">
          <p className="hero-kicker">Andela × Open Society Foundations · Invention sprint</p>
          <h1>
            Market<span>Trust</span>
          </h1>
          <p>Civic information people can find, verify, and act on — before they pay, click, or move.</p>
          <p className="hero-sub">Kenya first · English + Kiswahili · Working PoC</p>
          <div className="hero-actions">
            <Link to="/ask" className="btn btn-primary">
              Try the PoC
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="section-label">The problem</p>
          <h2>WhatsApp forwards are not civic infrastructure.</h2>
          <p className="lede">
            Traders and small businesses still lean on forwards and middlemen for permits, taxes, and
            payments. Official pages exist — but when you’re under pressure, confident wrong advice
            wins.
          </p>
          <div className="feature-row">
            <article>
              <h3>Find</h3>
              <p>Ask about permits, KRA, market fees, tenders, or scams — in English or Kiswahili.</p>
            </article>
            <article>
              <h3>Verify</h3>
              <p>
                Each reply is marked Verified, Check locally, or Unclear, with a public source you
                can open yourself.
              </p>
            </article>
            <article>
              <h3>Act</h3>
              <p>Get a short checklist — or send an anonymous tip if something feels off.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell">
          <p className="section-label">Who it’s for</p>
          <h2>The hustle economy — and those who protect it.</h2>
          <div className="users-row">
            <article>
              <h3>Market traders</h3>
              <p>Check a fee, permit, or odd SMS before money leaves the phone.</p>
            </article>
            <article>
              <h3>Small businesses</h3>
              <p>Cut through KRA, tender, and county rules without paying an “agent.”</p>
            </article>
            <article>
              <h3>Community responders</h3>
              <p>Pick up anonymous tips in Cases, already sorted for follow-up.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="section-label">Why this exists</p>
          <h2>Chat that sounds sure isn’t always safe</h2>
          <div className="compare-grid">
            <div className="compare-card">
              <h3>Open-ended AI chat</h3>
              <ul>
                <li>Rewards a fluent, confident reply</li>
                <li>Can invent fees, links, or “refund” steps</li>
                <li>Stops at the answer — no tip pathway</li>
              </ul>
            </div>
            <div className="compare-card compare-card--accent">
              <h3>MarketTrust</h3>
              <ul>
                <li>Answers only from a Kenya civic corpus we curated</li>
                <li>Says Unclear instead of guessing</li>
                <li>Lets you report quietly, then triage in Cases</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell">
          <p className="section-label">Hackathon tracks</p>
          <h2>Cross-track on purpose.</h2>
          <div className="tracks">
            <div className="track">
              <h3>Permits &amp; fees</h3>
              <p>Single business permits, market fees, and what counts as official.</p>
            </div>
            <div className="track">
              <h3>Scams &amp; threats</h3>
              <p>Fake KRA texts, tender awards, M-Pesa tricks — plus anonymous reporting.</p>
            </div>
            <div className="track">
              <h3>Rumours vs notices</h3>
              <p>When a WhatsApp forward says the market is closing, ask for the stamped notice.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="section-label">How we keep it honest</p>
          <h2>Useful on a slow phone, careful with your tip</h2>
          <div className="constraint-row">
            <div>
              <strong>Sources you can open</strong>
              <p>We point at public portals — and show when that guidance was last reviewed.</p>
            </div>
            <div>
              <strong>Works with little data</strong>
              <p>Light pages, answers from an on-device corpus — Ask still works offline.</p>
            </div>
            <div>
              <strong>Private by default</strong>
              <p>Tips stay in this browser for the demo. No account. No name required.</p>
            </div>
            <div>
              <strong>Plain words when you want them</strong>
              <p>Turn on plain language in Ask if long answers get in the way.</p>
            </div>
          </div>
          <div className="hero-actions" style={{ marginTop: '1.75rem' }}>
            <Link to="/ask" className="btn btn-primary">
              Try asking about a KRA text
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--next">
        <div className="shell">
          <p className="section-label">What’s next</p>
          <h2>Meet people where they already ask</h2>
          <p className="lede">
            This demo proves the loop: verify, then act or escalate. The natural next step is
            WhatsApp delivery, a deeper living corpus with partners, and real case routing — so
            labelled tips reach people who can help.
          </p>
          <div className="hero-actions" style={{ marginTop: '1.75rem', justifyContent: 'flex-start' }}>
            <Link to="/ask" className="btn btn-primary">
              Open Ask
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
