import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { saveCase } from '../lib/reports'

export function ReportPage() {
  const [category, setCategory] = useState<'fee' | 'scam' | 'threat' | 'rumour' | 'other'>('scam')
  const [location, setLocation] = useState('')
  const [summary, setSummary] = useState('')
  const [anonymous, setAnonymous] = useState(true)
  const [doneId, setDoneId] = useState<string | null>(null)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!summary.trim()) return
    const item = saveCase({
      category,
      location: location.trim() || 'Not specified',
      summary: summary.trim(),
      anonymous,
    })
    setDoneId(item.id)
    setSummary('')
    setLocation('')
  }

  return (
    <div className="shell">
      <div className="page-head">
        <p className="section-label">Safety</p>
        <h1>Report a tip</h1>
        <p>
          Anonymous by default. This PoC stores tips in your browser for the demo cases queue — in
          production they would route to verified responders.
        </p>
      </div>

      {doneId ? (
        <div className="success-note">
          <strong>Tip logged · {doneId}</strong>
          <p style={{ margin: '0.4rem 0 0', color: 'var(--paper-dim)' }}>
            Thank you. If you are in danger, contact emergency services first.
          </p>
          <div className="hero-actions" style={{ marginTop: '0.9rem' }}>
            <Link to="/cases" className="btn btn-primary">
              View cases
            </Link>
            <button type="button" className="btn btn-ghost" onClick={() => setDoneId(null)}>
              File another
            </button>
          </div>
        </div>
      ) : (
        <form className="form-panel" onSubmit={onSubmit}>
          <label>
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
            >
              <option value="scam">Scam / fraud</option>
              <option value="fee">Unofficial fee demand</option>
              <option value="rumour">Harmful rumour</option>
              <option value="threat">Threat / harassment</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Location (market, estate, county)
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Gikomba, Nairobi"
            />
          </label>
          <label>
            What happened?
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              placeholder="Describe what you saw or were asked to pay. No need for your name."
            />
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Keep this tip anonymous
          </label>
          <button type="submit" className="btn btn-primary">
            Submit tip
          </button>
        </form>
      )}
    </div>
  )
}
