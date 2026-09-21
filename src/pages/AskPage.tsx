import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { STARTER_PROMPTS } from '../data/knowledge'
import { findAnswer, trustLabel } from '../lib/trust-engine'
import type { KnowledgeEntry, TrustLevel } from '../data/knowledge'

type Msg = {
  id: string
  role: 'user' | 'bot'
  text: string
  trust?: TrustLevel
  entry?: KnowledgeEntry | null
  unmatched?: boolean
  suggestions?: string[]
  reportCategory?: 'scam' | 'fee' | 'rumour' | 'threat' | 'other'
  reportHint?: string
}

const WELCOME: Record<'en' | 'sw', string> = {
  en: 'Habari. I am MarketTrust — ask about permits, KRA texts, market fees, tenders, or scams. I answer with a trust label and sources. If I cannot verify, I say Unclear.',
  sw: 'Habari. Mimi ni MarketTrust — uliza kuhusu vibali, ujumbe wa KRA, ada za soko, zabuni, au udanganyifu. Najibu kwa lebo ya uaminifu na vyanzo. Nisipothibitisha, nasema Haijulikani.',
}

const DEMO_FLOW = [
  'I got a KRA text — is it real?',
  'Do I need a KRA PIN for my stall?',
  'Someone says I won a tender — is it real?',
] as const

function reportPath(category: string, summary: string) {
  const q = new URLSearchParams({
    category,
    summary: summary.slice(0, 280),
  })
  return `/report?${q.toString()}`
}

function categoryForEntry(entry: KnowledgeEntry | null | undefined): Msg['reportCategory'] {
  if (!entry) return 'other'
  if (entry.track === 'safety') return 'scam'
  if (entry.id === 'market-stall') return 'fee'
  if (entry.id === 'rumour-fuel') return 'rumour'
  return 'other'
}

export function AskPage() {
  const [lang, setLang] = useState<'en' | 'sw'>('en')
  const [plain, setPlain] = useState(false)
  const [input, setInput] = useState('')
  const [demoRunning, setDemoRunning] = useState(false)
  const [online, setOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  )
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: WELCOME.en,
      trust: 'verified',
    },
  ])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  function ask(raw: string, activeLang: 'en' | 'sw' = lang) {
    const q = raw.trim()
    if (!q) return

    const result = findAnswer(q, activeLang, { plain })
    const userMsg: Msg = { id: `u-${Date.now()}-${Math.random()}`, role: 'user', text: q }
    const botMsg: Msg = {
      id: `b-${Date.now()}-${Math.random()}`,
      role: 'bot',
      text: result.answer,
      trust: result.trust,
      entry: result.entry,
      unmatched: result.unmatched,
      suggestions: result.suggestions,
      reportCategory: result.unmatched
        ? 'scam'
        : categoryForEntry(result.entry),
      reportHint: q,
    }
    setMessages((m) => [...m, userMsg, botMsg])
    setInput('')
  }

  function switchLang(next: 'en' | 'sw') {
    setLang(next)
    setMessages((m) => {
      if (m.length === 1 && m[0]?.id === 'welcome') {
        return [{ ...m[0], text: WELCOME[next] }]
      }
      return m
    })
  }

  async function runJudgeDemo() {
    if (demoRunning) return
    setDemoRunning(true)
    setLang('en')
    setMessages([
      {
        id: 'welcome',
        role: 'bot',
        text: WELCOME.en,
        trust: 'verified',
      },
    ])
    for (const q of DEMO_FLOW) {
      await new Promise((r) => setTimeout(r, 650))
      ask(q, 'en')
    }
    setDemoRunning(false)
  }

  return (
    <div className="shell page-centered ask-layout">
      <div className="ask-main">
        <div className="page-head" style={{ paddingTop: '0.5rem' }}>
          <p className="section-label">Ask</p>
          <h1>Ask MarketTrust</h1>
          <p>
            Answers come from a Kenya civic corpus — not an open guess. If we can’t match your
            question, we say Unclear.
          </p>
          <div className="poc-chips" aria-label="PoC guarantees">
            <span>No model API</span>
            <span>Trust labels</span>
            <span>EN · SW</span>
            <span>Sources + next steps</span>
            <span>{online ? 'Online' : 'Offline · corpus still works'}</span>
          </div>
          <div className="ask-toggles">
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={lang === 'en' ? 'active' : undefined}
                onClick={() => switchLang('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={lang === 'sw' ? 'active' : undefined}
                onClick={() => switchLang('sw')}
              >
                SW
              </button>
            </div>
            <button
              type="button"
              className={`plain-toggle${plain ? ' active' : ''}`}
              aria-pressed={plain}
              onClick={() => setPlain((v) => !v)}
            >
              {plain ? 'Plain language · on' : 'Plain language'}
            </button>
          </div>
          <button
            type="button"
            className="btn btn-ghost demo-run"
            onClick={runJudgeDemo}
            disabled={demoRunning}
          >
            {demoRunning ? 'Running demo…' : 'Run a quick demo'}
          </button>
        </div>

        <div className="chat-panel" style={{ marginTop: '1rem' }}>
          <div className="chat-header">
            <div>
              <strong>MarketTrust Assistant</strong>
              <span>
                {online ? 'Online' : 'Offline'} · corpus retrieval · trust-labelled
                {plain ? ' · plain' : ''}
              </span>
            </div>
          </div>

          <div className="chat-thread" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`bubble ${msg.role}`}>
                {msg.role === 'bot' && msg.trust ? (
                  <div className="meta">
                    <span className={`trust-badge ${msg.trust}`}>
                      {trustLabel(msg.trust, lang)}
                    </span>
                    {msg.entry ? (
                      <span className="case-meta">
                        {msg.entry.title}
                        {' · Reviewed '}
                        {msg.entry.updated}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <div>{msg.text}</div>
                {msg.unmatched && msg.suggestions?.length ? (
                  <div className="inline-suggestions">
                    {msg.suggestions.slice(0, 4).map((p) => (
                      <button key={p} type="button" onClick={() => ask(p)}>
                        {p}
                      </button>
                    ))}
                    <Link
                      to={reportPath(msg.reportCategory ?? 'other', msg.reportHint ?? '')}
                      className="inline-report"
                    >
                      {lang === 'sw' ? 'Wasilisha ripoti' : 'File a report'}
                    </Link>
                  </div>
                ) : null}
                {msg.entry && !msg.unmatched ? (
                  <>
                    <ul className="sources">
                      {msg.entry.sources.map((s) => (
                        <li key={s.label}>
                          {s.url ? (
                            <a href={s.url} target="_blank" rel="noopener noreferrer">
                              {s.label}
                            </a>
                          ) : (
                            <strong>{s.label}</strong>
                          )}
                          {s.note ? ` — ${s.note}` : ''}
                        </li>
                      ))}
                    </ul>
                    <ul className="next-steps">
                      {msg.entry.nextSteps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                    {(msg.entry.track === 'safety' || msg.entry.id === 'market-stall') && (
                      <div className="inline-suggestions">
                        <Link
                          to={reportPath(
                            categoryForEntry(msg.entry) ?? 'scam',
                            msg.reportHint ?? msg.entry.title,
                          )}
                          className="inline-report"
                        >
                          {lang === 'sw' ? 'Wasilisha ripoti' : 'File a report on this'}
                        </Link>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form
            className="chat-compose"
            onSubmit={(e) => {
              e.preventDefault()
              ask(input)
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === 'sw' ? 'Uliza kuhusu kibali, kodi, zabuni…' : 'Ask about permits, tax, tenders…'
              }
              aria-label="Your question"
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>

      <aside className="side-panel">
        <h2>Try these</h2>
        <div className="prompt-list">
          {STARTER_PROMPTS.map((p) => (
            <button key={p} type="button" onClick={() => ask(p)}>
              {p}
            </button>
          ))}
        </div>
        <p className="side-note">
          Tips filed in Report stay in this browser for the PoC triage demo — privacy by default.
          Turn off your network to see Ask keep working from the in-bundle corpus.
        </p>
      </aside>
    </div>
  )
}
