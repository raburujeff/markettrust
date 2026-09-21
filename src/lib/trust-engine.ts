import { KNOWLEDGE, type KnowledgeEntry, type TrustLevel } from '../data/knowledge'

export type AnswerResult = {
  entry: KnowledgeEntry | null
  score: number
  trust: TrustLevel
  answer: string
  unmatched: boolean
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Lightweight retrieval for the PoC — no API key required. */
export function findAnswer(query: string, lang: 'en' | 'sw' = 'en'): AnswerResult {
  const q = normalize(query)
  if (!q) {
    return {
      entry: null,
      score: 0,
      trust: 'unclear',
      unmatched: true,
      answer: 'Ask about permits, taxes, tenders, market fees, or scams — in English or Kiswahili.',
    }
  }

  let best: { entry: KnowledgeEntry; score: number } | null = null

  for (const entry of KNOWLEDGE) {
    let score = 0
    const hay = normalize(`${entry.title} ${entry.keywords.join(' ')} ${entry.answer}`)
    for (const kw of entry.keywords) {
      const k = normalize(kw)
      if (!k) continue
      if (q.includes(k)) score += k.length > 6 ? 4 : 2
      else if (k.split(' ').every((w) => w.length > 2 && q.includes(w))) score += 2
    }
    // token overlap
    for (const token of q.split(' ')) {
      if (token.length < 3) continue
      if (hay.includes(token)) score += 1
    }
    if (!best || score > best.score) best = { entry, score }
  }

  if (!best || best.score < 3) {
    return {
      entry: null,
      score: best?.score ?? 0,
      trust: 'unclear',
      unmatched: true,
      answer:
        lang === 'sw'
          ? 'Sijaweza kuthibitisha jibu kwa uhakika kutoka vyanzo vilivyowekwa. Jaribu kuuliza kuhusu kibali cha biashara, KRA PIN, zabuni, ada za soko, au udanganyifu wa M-Pesa — au wasilisha ripoti.'
          : 'I could not match this to a verified source in the PoC corpus yet. Try asking about business permits, KRA PIN, tenders, market fees, or M-Pesa scams — or file a report.',
    }
  }

  const entry = best.entry
  const answer =
    lang === 'sw' && entry.answerSw ? entry.answerSw : entry.answer

  return {
    entry,
    score: best.score,
    trust: entry.trust,
    unmatched: false,
    answer,
  }
}

export function trustLabel(level: TrustLevel, lang: 'en' | 'sw' = 'en') {
  if (lang === 'sw') {
    if (level === 'verified') return 'Imethibitishwa'
    if (level === 'check') return 'Thibitisha ndani'
    return 'Haijulikani'
  }
  if (level === 'verified') return 'Verified'
  if (level === 'check') return 'Check locally'
  return 'Unclear'
}
