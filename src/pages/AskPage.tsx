import { useEffect, useRef, useState } from 'react'
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
}

export function AskPage() {
  const [lang, setLang] = useState<'en' | 'sw'>('en')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'welcome',
      role: 'bot',
      text:
        'Habari. I am MarketTrust — ask about permits, KRA, market fees, tenders, or scams. I will answer with a trust label and sources.',
      trust: 'verified',
    },
  ])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function ask(raw: string) {
    const q = raw.trim()
    if (!q) return

    const result = findAnswer(q, lang)
    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text: q }
    const botMsg: Msg = {
      id: `b-${Date.now()}`,
      role: 'bot',
      text: result.answer,
      trust: result.trust,
      entry: result.entry,
      unmatched: result.unmatched,
    }
    setMessages((m) => [...m, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="shell ask-layout">
      <div>
        <div className="page-head" style={{ paddingTop: '0.5rem' }}>
          <p className="section-label">Demo</p>
          <h1>Ask MarketTrust</h1>
          <p>Working PoC — retrieval over a Kenya SME civic corpus. No API key required.</p>
        </div>

        <div className="chat-panel" style={{ marginTop: '1rem' }}>
          <div className="chat-header">
            <div>
              <strong>MarketTrust Assistant</strong>
              <span>Online · trust-labelled answers</span>
            </div>
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={lang === 'en' ? 'active' : undefined}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={lang === 'sw' ? 'active' : undefined}
                onClick={() => setLang('sw')}
              >
                SW
              </button>
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
                    {msg.entry ? <span className="case-meta">{msg.entry.title}</span> : null}
                  </div>
                ) : null}
                <div>{msg.text}</div>
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
      </aside>
    </div>
  )
}
