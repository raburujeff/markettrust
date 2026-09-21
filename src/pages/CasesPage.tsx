import { useState } from 'react'
import { loadCases, updateCaseStatus, type ReportCase } from '../lib/reports'

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

  return (
    <div className="shell">
      <div className="page-head">
        <p className="section-label">Ops demo</p>
        <h1>Cases</h1>
        <p>
          Lightweight triage queue for tips filed in this browser. Shows how MarketTrust hands off
          to humans / partner orgs after AI intake.
        </p>
      </div>

      {cases.length === 0 ? (
        <p className="empty">No tips yet — file one from Report.</p>
      ) : (
        <div className="case-list">
          {cases.map((c) => (
            <article key={c.id} className="case-item">
              <header>
                <strong>
                  {c.id} · {LABELS[c.category]}
                </strong>
                <div className="status-pills">
                  {(['new', 'triaged', 'escalated'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={c.status === s ? 'active' : undefined}
                      onClick={() => setStatus(c.id, s)}
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
