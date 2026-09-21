import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Select } from '../components/Select'
import { saveCase } from '../lib/reports'

const CATEGORY_OPTIONS = [
  { value: 'scam', label: 'Scam / fraud' },
  { value: 'fee', label: 'Unofficial fee demand' },
  { value: 'rumour', label: 'Harmful rumour' },
  { value: 'threat', label: 'Threat / harassment' },
  { value: 'other', label: 'Other' },
] as const

type Category = (typeof CATEGORY_OPTIONS)[number]['value']

function parseCategory(raw: string | null): Category {
  const hit = CATEGORY_OPTIONS.find((o) => o.value === raw)
  return hit?.value ?? 'scam'
}

export function ReportPage() {
  const [params] = useSearchParams()
  const [category, setCategory] = useState<Category>(() => parseCategory(params.get('category')))
  const [location, setLocation] = useState('')
  const [summary, setSummary] = useState(() => params.get('summary') ?? '')
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
    <div className="shell page-centered">
      <div className="page-head">
        <p className="section-label">Safety</p>
        <h1>Report a tip</h1>
        <p>
          Anonymous by default. Tips stay in this browser for the PoC Cases queue — nothing is sent
          to a server. In production they would route to verified responders / partner orgs.
        </p>
        <p className="privacy-note">
          Privacy: no account required. Clear site data to wipe tips. Not for emergencies — call
          999 / 112 if you are in danger.
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
            <Select
              value={category}
              options={[...CATEGORY_OPTIONS]}
              onChange={setCategory}
              aria-label="Category"
            />
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
