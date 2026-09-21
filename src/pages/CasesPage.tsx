import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loadCases, saveCase, updateCaseStatus, type ReportCase } from '../lib/reports'

const LABELS: Record<ReportCase['category'], string> = {
  fee: 'Unofficial fee',
  scam: 'Scam',
  threat: 'Threat',
  rumour: 'Rumour',
  other: 'Other',
}

export function CasesPage() {
  const [cases, setCases] = useState(() => loadCases())

  function setStatus(id: string, status: ReportCase['status']) {
    setCases(updateCaseStatus(id, status))
  }

  function seedDemoTip() {
    const item = saveCase({
      category: 'fee',
      location: 'Gikomba, Nairobi',
      summary:
        'Someone in a reflective jacket demanded an “extra market fee” with no county receipt. Asked for M-Pesa to a personal number.',
      anonymous: true,
    })
    setCases(loadCases())
    return item
  }

  return (
    <div className="shell page-centered">
      <div className="page-head">
        <p className="section-label">Ops demo</p>
        <h1>Cases</h1>
        <p>
          Lightweight triage queue for tips filed in this browser. Shows how MarketTrust hands off
          to humans / partner orgs after AI intake — privacy-preserving by default.
        </p>
      </div>

      {cases.length === 0 ? (
        <div className="empty-panel">
          <p className="empty">No tips yet — file one from Report, or load a sample tip to try triage.</p>
          <div className="hero-actions">
            <Link to="/report" className="btn btn-primary">
              File a tip
            </Link>
            <button type="button" className="btn btn-ghost" onClick={seedDemoTip}>
              Load sample tip
            </button>
          </div>
        </div>
      ) : (
        <div className="case-list">
          {cases.map((c) => (
            <article key={c.id} className="case-item">
              <header>
                <strong>
                  {c.id} · {LABELS[c.category]}
                </strong>
                <div className="status-pills" role="group" aria-label={`Status for ${c.id}`}>
                  {(['new', 'triaged', 'escalated'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={c.status === s ? 'active' : undefined}
                      onClick={() => setStatus(c.id, s)}
                      aria-pressed={c.status === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </header>
              <p className="case-meta">
                {new Date(c.createdAt).toLocaleString()} · {c.location}
                {c.anonymous ? ' · Anonymous' : ''}
              </p>
              <p style={{ margin: 0, color: 'var(--paper-dim)', lineHeight: 1.45 }}>{c.summary}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
