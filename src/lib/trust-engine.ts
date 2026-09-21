import { KNOWLEDGE, STARTER_PROMPTS, type KnowledgeEntry, type TrustLevel } from '../data/knowledge'

export type AnswerResult = {
  entry: KnowledgeEntry | null
  score: number
  trust: TrustLevel
  answer: string
  unmatched: boolean
  suggestions?: string[]
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const PROBE = /^(test|testing|hello|hi|hey|yo|ok|okay|ping|asdf|demo|habari|jambo|mambo|sasa)[\s!.?]*$/i

function scoreEntry(q: string, entry: KnowledgeEntry): number {
  let score = 0

  for (const phrase of entry.phrases ?? []) {
    const p = normalize(phrase)
    if (!p) continue
    if (q.includes(p)) score += 10 + Math.min(p.length, 12)
  }

  for (const kw of entry.keywords) {
    const k = normalize(kw)
    if (!k) continue
    if (q.includes(k)) score += k.length > 5 ? 4 : 2
    else if (k.split(' ').filter(Boolean).every((w) => w.length > 2 && q.includes(w))) score += 2
  }

  for (const neg of entry.negative ?? []) {
    const n = normalize(neg)
    if (n && q.includes(n)) score -= 8
  }

  // Light title token overlap (skip ultra-common words)
  const stop = new Set(['for', 'the', 'and', 'a', 'of', 'to', 'or', 'in', 'on'])
  for (const token of normalize(entry.title).split(' ')) {
    if (token.length < 3 || stop.has(token)) continue
    if (q.includes(token)) score += 1
  }

  return score
}

/** Lightweight retrieval for the PoC — no API key required. */
export function findAnswer(
  query: string,
  lang: 'en' | 'sw' = 'en',
  options?: { plain?: boolean },
): AnswerResult {
  const q = normalize(query)
  if (!q) {
    return {
      entry: null,
      score: 0,
      trust: 'unclear',
      unmatched: true,
      suggestions: [...STARTER_PROMPTS],
      answer: 'Ask about permits, taxes, tenders, market fees, or scams — in English or Kiswahili.',
    }
  }

  if (PROBE.test(q)) {
    return {
      entry: null,
      score: 0,
      trust: 'unclear',
      unmatched: true,
      suggestions: [...STARTER_PROMPTS],
      answer:
        lang === 'sw'
          ? 'PoC inafanya kazi. Andika swali halisi — kibali, KRA, zabuni, ada za soko, au udanganyifu — au chagua moja hapa chini.'
          : 'PoC is working. Type a real question — permits, KRA, tenders, market fees, or scams — or tap a suggestion below.',
    }
  }

  let best: { entry: KnowledgeEntry; score: number } | null = null
  let second = 0

  for (const entry of KNOWLEDGE) {
    const score = scoreEntry(q, entry)
    if (!best || score > best.score) {
      second = best?.score ?? 0
      best = { entry, score }
    } else if (score > second) {
      second = score
    }
  }

  // Require a clear hit; ambiguous near-ties stay Unclear
  const margin = best ? best.score - second : 0
  const strongEnough =
    !!best && best.score >= 6 && (margin >= 2 || best.score >= 14)

  if (!best || !strongEnough) {
    return {
      entry: null,
      score: best?.score ?? 0,
      trust: 'unclear',
      unmatched: true,
      suggestions: [...STARTER_PROMPTS],
      answer:
        lang === 'sw'
          ? 'Sijaweza kuthibitisha jibu kwa uhakika kutoka vyanzo vilivyowekwa. Jaribu kuuliza kuhusu kibali cha biashara, KRA PIN, zabuni, ada za soko, au udanganyifu wa M-Pesa — au wasilisha ripoti.'
          : 'I could not match this to a verified source in the PoC corpus yet. Try a topic below — or file a report if something unsafe happened.',
    }
  }

  const entry = best.entry
  const useSimple = options?.plain
  let answer: string
  if (lang === 'sw') {
    if (useSimple && entry.answerSwSimple) answer = entry.answerSwSimple
    else if (entry.answerSw) answer = entry.answerSw
    else if (useSimple && entry.answerSimple) answer = entry.answerSimple
    else answer = entry.answer
  } else if (useSimple && entry.answerSimple) {
    answer = entry.answerSimple
  } else {
    answer = entry.answer
  }

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
