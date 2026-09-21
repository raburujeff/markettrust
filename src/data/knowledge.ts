export type TrustLevel = 'verified' | 'check' | 'unclear'

/** When the Kenya seed corpus was last reviewed for the PoC. */
export const CORPUS_BUILT = '2026-09-21'

export type KnowledgeEntry = {
  id: string
  title: string
  /** Strong multi-word cues — preferred over single tokens */
  phrases?: string[]
  keywords: string[]
  /** If present in the query, this entry is a poor match */
  negative?: string[]
  answer: string
  /** Shorter answer for lower literacy / plain-language mode */
  answerSimple?: string
  answerSw?: string
  answerSwSimple?: string
  trust: TrustLevel
  /** ISO date — when this entry was last checked against public sources */
  updated: string
  sources: { label: string; url?: string; note?: string }[]
  nextSteps: string[]
  track: 'transparency' | 'safety' | 'stability'
}

/**
 * Seed corpus for Kenya SME / informal economy PoC.
 * Sources are public government portals — verify before production use.
 */
export const KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: 'sbb-permit',
    title: 'Single Business Permit (Nairobi)',
    phrases: [
      'business permit',
      'single business permit',
      'nairobi permit',
      'county permit',
      'get a permit',
      'need a permit',
    ],
    keywords: ['sbp', 'licence', 'license', 'kibali', 'biashara', 'permit'],
    negative: ['kra', 'tender', 'mpesa', 'm-pesa'],
    answer:
      'In Nairobi, most traders need a Single Business Permit (SBP) from Nairobi City County. Apply online via the county e-services portal, pay the fee for your business category, then display the permit at your premises. Fees vary by activity and size — do not pay “facilitators” who demand cash outside official channels.',
    answerSimple:
      'In Nairobi most traders need a Single Business Permit from the county. Apply and pay only on official county channels — not cash to facilitators.',
    answerSw:
      'Nairobi, wafanyibiashara wengi wanahitaji Single Business Permit (SBP) kutoka Nairobi City County. Omba mtandaoni kupitia e-services za kaunti, lipa ada rasmi, kisha weka kibali mahali pa biashara. Usilipe “wakala” wa fedha taslimu nje ya njia rasmi.',
    answerSwSimple:
      'Nairobi, wafanyibiashara wengi wanahitaji kibali cha biashara kutoka kaunti. Omba na lipa njia rasmi tu.',
    trust: 'verified',
    updated: '2026-09-21',
    sources: [
      {
        label: 'Nairobi City County e-services',
        url: 'https://nairobi.go.ke',
        note: 'Confirm current SBP fees on the official portal',
      },
      {
        label: 'Business registration (national)',
        url: 'https://brs.go.ke',
        note: 'Company / business name registration is separate from county SBP',
      },
    ],
    nextSteps: [
      'Decide if you need a business name at BRS.go.ke first',
      'Open Nairobi County e-services and start SBP application',
      'Pay only via official county payment channels',
      'Keep a digital + printed copy of the permit',
    ],
    track: 'transparency',
  },
  {
    id: 'kra-sms-scam',
    title: 'Suspicious KRA SMS / refund text',
    phrases: [
      'kra text',
      'kra sms',
      'kra message',
      'got a kra',
      'received a kra',
      'kra refund',
      'kra owed',
      'kra link',
      'fake kra',
      'kra phishing',
      'message from kra',
      'sms from kra',
      'text from kra',
    ],
    keywords: ['sms', 'text', 'message', 'refund', 'owed', 'click', 'link', 'phishing', 'ujumbe'],
    negative: ['register pin', 'create pin', 'get a pin', 'need a pin', 'how do i get'],
    answer:
      'Treat unexpected KRA texts with suspicion. KRA does not send random “you are owed a refund — click this link” or “pay a fee to unlock your PIN” messages. Do not tap links in the SMS. Open iTax yourself by typing itax.kra.go.ke in the browser (not from the text), or use the official KRA app / published contacts. If the message asks for PIN, password, ID photos, or M-Pesa to a personal number — it is a scam. Screenshot and report it.',
    answerSimple:
      'Unexpected KRA texts are often scams. Do not tap links. Open itax.kra.go.ke yourself. If they ask for PIN, password, or M-Pesa to a personal number — report it.',
    answerSw:
      'Ujumbe usiotarajiwa wa “KRA” huwa wa udanganyifu mara nyingi. KRA haitumi ujumbe wa “bonus/refund — bofya kiungo”. Usibofye kiungo. Fungua iTax mwenyewe kwa kuandika itax.kra.go.ke. Ukitakiwa PIN, nenosiri, au M-Pesa kwa nambari binafsi — ni udanganyifu. Piga picha na ripoti.',
    answerSwSimple:
      'Ujumbe wa KRA usiotarajiwa huwa udanganyifu. Usibofye kiungo. Fungua itax.kra.go.ke mwenyewe. Ukitakiwa PIN au M-Pesa binafsi — ripoti.',
    trust: 'verified',
    updated: '2026-09-21',
    sources: [
      { label: 'KRA iTax (type the URL yourself)', url: 'https://itax.kra.go.ke' },
      { label: 'KRA official site', url: 'https://www.kra.go.ke', note: 'Use published contacts only' },
    ],
    nextSteps: [
      'Do not click links or dial odd numbers from the SMS',
      'Open itax.kra.go.ke yourself to check any real notices',
      'Block/report the sender on your phone',
      'File a MarketTrust tip with a screenshot (hide personal data)',
    ],
    track: 'safety',
  },
  {
    id: 'kra-pin',
    title: 'KRA PIN for a small business',
    phrases: [
      'kra pin',
      'get a pin',
      'need a pin',
      'register pin',
      'create pin',
      'itax',
      'i-tax',
      'tax pin',
      'kra for my stall',
      'kra for my business',
    ],
    keywords: ['vat', 'usuru', 'kodi', 'tin', 'etims', 'withholding'],
    negative: ['sms', 'text', 'message', 'refund', 'owed', 'got a kra', 'received a kra', 'link'],
    answer:
      'Every adult and registered business in Kenya needs a KRA PIN. Individuals register on iTax; companies get a PIN when incorporated. You use it for tax returns, withholding, and many licences. There is no fee to get a basic PIN — beware of WhatsApp “agents” selling fake PINs.',
    answerSimple:
      'You need a free KRA PIN on iTax for tax and many licences. Do not pay WhatsApp agents for a fake PIN.',
    answerSw:
      'Kila mtu mzima na biashara iliyosajiliwa Kenya inahitaji KRA PIN. Sajili kwenye iTax. Hakuna ada ya kupata PIN ya msingi — jihadhari na “mawakala” wa WhatsApp wanaouza PIN bandia.',
    answerSwSimple:
      'Unahitaji KRA PIN bure kwenye iTax. Usilipe mawakala wa WhatsApp kwa PIN bandia.',
    trust: 'verified',
    updated: '2026-09-21',
    sources: [
      { label: 'KRA iTax', url: 'https://itax.kra.go.ke', note: 'Official registration and filing' },
      { label: 'KRA website', url: 'https://www.kra.go.ke' },
    ],
    nextSteps: [
      'Go to itax.kra.go.ke → Create PIN / New PIN',
      'Use your ID / passport details only',
      'Enable eTIMS if you issue invoices (rules depend on turnover)',
      'Never share your iTax password',
    ],
    track: 'transparency',
  },
  {
    id: 'market-stall',
    title: 'Market stall / county market fees',
    phrases: ['market fee', 'market fees', 'stall fee', 'unofficial fee', 'county fee'],
    keywords: ['market', 'stall', 'soko', 'kibanda', 'hawk', 'hawker', 'sokoni', 'ada'],
    negative: ['kra pin', 'tender', 'mpesa pin'],
    answer:
      'County markets usually require allocation from the market office plus daily or monthly fees set by the county. Fee schedules should be posted or available from the market superintendent. If someone demands “extra” to keep your stall, ask for an official receipt with the county stamp — and report unofficial collections.',
    trust: 'check',
    updated: '2026-09-21',
    sources: [
      {
        label: 'Your county finance / markets department',
        note: 'Fees differ by county and market — ask for the gazetted schedule',
      },
    ],
    nextSteps: [
      'Visit the market office and request the official fee list',
      'Pay only against a county receipt',
      'Photograph receipts and any fee notice boards',
      'Use MarketTrust Report if you face unofficial demands',
    ],
    track: 'transparency',
  },
  {
    id: 'tender-scam',
    title: 'Government tender / supply scams',
    phrases: [
      'won a tender',
      'tender award',
      'commitment fee',
      'bid bond',
      'supply contract',
    ],
    keywords: ['tender', 'procurement', 'supply', 'ppip', 'ifmis', 'award', 'zabuni', 'scam'],
    negative: ['kra pin', 'business permit', 'market fee'],
    answer:
      'Real public tenders in Kenya are published on the Public Procurement Information Portal (PPIP) and often IFMIS. Nobody needs you to pay “commitment fees”, “bid bonds” to a personal M-Pesa, or send money to “unlock” an award. If a WhatsApp contact claims you won a tender you never bid for — treat it as a scam.',
    answerSimple:
      'Real tenders are on tenders.go.ke. Do not pay commitment fees to personal M-Pesa. If someone says you won a tender you never bid for — it is a scam.',
    trust: 'verified',
    updated: '2026-09-21',
    sources: [
      { label: 'PPIP – Public Procurement Information Portal', url: 'https://tenders.go.ke' },
      { label: 'PPRA', url: 'https://ppra.go.ke', note: 'Public Procurement Regulatory Authority' },
    ],
    nextSteps: [
      'Search the tender on tenders.go.ke before paying anything',
      'Never pay bid-related fees to personal numbers',
      'Report the number and screenshots via MarketTrust Report',
      'Forward evidence to the Directorate of Criminal Investigations if money was lost',
    ],
    track: 'safety',
  },
  {
    id: 'mpesa-agent',
    title: 'Fake M-Pesa / till payment tricks',
    phrases: [
      'mpesa pin',
      'm-pesa pin',
      'fake till',
      'wrong till',
      'paybill',
      'reverse the money',
    ],
    keywords: ['m-pesa', 'mpesa', 'till', 'agent', 'otp', 'safaricom'],
    negative: ['kra pin', 'business permit'],
    answer:
      'Common tricks: “send to till then we reverse”, asking for your M-Pesa PIN/OTP, or fake SMS. Safaricom will never ask for your PIN. Confirm till/paybill names in the app before sending. If you already sent money to a wrong till, contact Safaricom and your bank immediately and file a report.',
    answerSimple:
      'Never share your M-Pesa PIN or OTP. Check the till name before paying. Call Safaricom 100 if money went to the wrong till.',
    trust: 'verified',
    updated: '2026-09-21',
    sources: [
      { label: 'Safaricom customer care', note: '100 / *234# / app support' },
      { label: 'CA / consumer protection channels', note: 'For persistent fraud patterns' },
    ],
    nextSteps: [
      'Do not share PIN or OTP with anyone',
      'Match till name to the business before paying',
      'Call Safaricom 100 if funds left wrongly',
      'Log the incident in MarketTrust Report for community awareness',
    ],
    track: 'safety',
  },
  {
    id: 'nhif-sha',
    title: 'SHA / health cover for traders',
    phrases: ['social health', 'activate sha', 'nhif'],
    keywords: ['sha', 'health', 'afya', 'insurance', 'hospital'],
    answer:
      'Kenya’s Social Health Authority (SHA) replaced the old NHIF model. Informal workers can register and contribute as guided on official SHA channels. Hospital staff or “agents” who demand cash “to activate SHA” outside official payment methods should be challenged — use only published contribution channels.',
    trust: 'check',
    updated: '2026-09-21',
    sources: [
      {
        label: 'Social Health Authority',
        url: 'https://sha.go.ke',
        note: 'Confirm registration and contribution steps on the official site',
      },
    ],
    nextSteps: [
      'Visit sha.go.ke or an official registration desk',
      'Keep contribution receipts',
      'Ask the facility to verify your cover in their system',
      'Report unofficial “activation fees”',
    ],
    track: 'transparency',
  },
  {
    id: 'labour-dispute',
    title: 'Wage / casual labour dispute',
    phrases: ['not paid', 'owe me', 'casual labour', 'labour office'],
    keywords: ['salary', 'wage', 'casual', 'fired', 'sacked', 'labour', 'ajira', 'mshahara'],
    answer:
      'Even casual workers have rights under Kenyan labour law (written or implied terms, timely pay, safe conditions). Start with a written demand to the employer, then escalate to the County Labour Office / Ministry of Labour. Keep timesheets, M-Pesa statements, and any messages about pay.',
    trust: 'check',
    updated: '2026-09-21',
    sources: [
      {
        label: 'Ministry of Labour / County Labour Office',
        note: 'Visit the labour office in your county with evidence',
      },
    ],
    nextSteps: [
      'Write a short demand letter with amounts owed and dates',
      'Collect M-Pesa / bank proof of underpayment',
      'Visit the County Labour Office',
      'Consider legal aid clinics if the amount is significant',
    ],
    track: 'stability',
  },
  {
    id: 'rumour-fuel',
    title: 'Market rumour vs verified notice',
    phrases: ['whatsapp forward', 'market closure', 'demolition notice'],
    keywords: ['rumour', 'rumor', 'closure', 'eviction', 'demolition', 'notice'],
    answer:
      'Market closures, demolitions, and fee hikes should come with a county notice on letterhead or a public announcement. Viral WhatsApp forwards are often wrong or outdated. Ask the market office for the written notice, check the date and stamp, and compare with the county website or verified social accounts before you move goods or pay “protection”.',
    trust: 'verified',
    updated: '2026-09-21',
    sources: [
      { label: 'Market superintendent / county notice board' },
      { label: 'Official county website or verified social pages' },
    ],
    nextSteps: [
      'Ask to see the original stamped notice',
      'Photograph it (date, stamp, signature)',
      'Ignore unsigned forwards',
      'Share the verified notice with your trader association',
    ],
    track: 'stability',
  },
  {
    id: 'export-ke',
    title: 'Starting small cross-border trade (EAC)',
    phrases: ['cross border', 'cross-border', 'eac trade'],
    keywords: ['export', 'uganda', 'tanzania', 'border', 'customs', 'eac', 'import'],
    answer:
      'Small cross-border trade in the EAC still needs the right goods declarations and, where applicable, simplified trade regimes for certain products. Rules differ by border and product. Start with KEBS/standards for goods, KRA Customs guidance, and the official border desk — not “clearing agents” who only take cash with no paperwork.',
    trust: 'unclear',
    updated: '2026-09-21',
    sources: [
      { label: 'KRA Customs', url: 'https://www.kra.go.ke' },
      { label: 'KEBS', url: 'https://www.kebs.org', note: 'Standards for many goods' },
    ],
    nextSteps: [
      'List your product and check if it needs a permit/standard',
      'Ask Customs at your intended border about simplified procedures',
      'Budget for official duties only',
      'Keep all entry documents',
    ],
    track: 'transparency',
  },
  {
    id: 'gbv-help',
    title: 'Threats, violence, or abuse — get help',
    phrases: ['in danger', 'being threatened', 'harassment'],
    keywords: ['violence', 'abuse', 'gbv', 'threat', 'police', 'hotline', 'usalama', 'dhuluma'],
    answer:
      'If you or someone else is in danger, prioritise safety first. In Kenya you can call emergency services, report at the nearest police station, and use recognised GBV/helpline channels. MarketTrust can log an anonymous tip for awareness, but it is not a substitute for emergency response.',
    trust: 'verified',
    updated: '2026-09-21',
    sources: [
      { label: 'Kenya emergency / police', note: '999 / 112 (verify locally)' },
      { label: 'Recognised GBV helplines', note: 'Use nationally published numbers from trusted orgs' },
    ],
    nextSteps: [
      'If in immediate danger, call emergency services now',
      'Move to a safe location if you can',
      'Report at a police station and request an OB number',
      'Optionally file an anonymous MarketTrust tip after you are safe',
    ],
    track: 'safety',
  },
]

export const STARTER_PROMPTS = [
  'I got a KRA text — is it real?',
  'How do I get a Nairobi business permit?',
  'Someone says I won a tender — is it real?',
  'Do I need a KRA PIN for my stall?',
  'Fake M-Pesa till asked for my PIN',
]
