export type TrustLevel = 'verified' | 'check' | 'unclear'

export type KnowledgeEntry = {
  id: string
  title: string
  keywords: string[]
  answer: string
  answerSw?: string
  trust: TrustLevel
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
    keywords: [
      'business permit',
      'single business permit',
      'sbp',
      'licence',
      'license',
      'nairobi permit',
      'county permit',
      'kibali',
      'biashara',
    ],
    answer:
      'In Nairobi, most traders need a Single Business Permit (SBP) from Nairobi City County. Apply online via the county e-services portal, pay the fee for your business category, then display the permit at your premises. Fees vary by activity and size — do not pay “facilitators” who demand cash outside official channels.',
    answerSw:
      'Nairobi, wafanyibiashara wengi wanahitaji Single Business Permit (SBP) kutoka Nairobi City County. Omba mtandaoni kupitia e-services za kaunti, lipa ada rasmi, kisha weka kibali mahali pa biashara. Usilipe “wakala” wa fedha taslimu nje ya njia rasmi.',
    trust: 'verified',
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
    id: 'kra-pin',
    title: 'KRA PIN for a small business',
    keywords: ['kra', 'pin', 'tax', 'vat', 'i-tax', 'usuru', 'kodi', 'tin'],
    answer:
      'Every adult and registered business in Kenya needs a KRA PIN. Individuals register on iTax; companies get a PIN when incorporated. You use it for tax returns, withholding, and many licences. There is no fee to get a basic PIN — beware of WhatsApp “agents” selling fake PINs.',
    answerSw:
      'Kila mtu mzima na biashara iliyosajiliwa Kenya inahitaji KRA PIN. Sajili kwenye iTax. Hakuna ada ya kupata PIN ya msingi — jihadhari na “mawakala” wa WhatsApp wanaouza PIN bandia.',
    trust: 'verified',
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
    keywords: ['market', 'stall', 'soko', 'kibanda', 'county fee', 'hawk', 'hawker', 'sokoni'],
    answer:
      'County markets usually require allocation from the market office plus daily or monthly fees set by the county. Fee schedules should be posted or available from the market superintendent. If someone demands “extra” to keep your stall, ask for an official receipt with the county stamp — and report unofficial collections.',
    trust: 'check',
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
    keywords: [
      'tender',
      'procurement',
      'supply',
      'ppip',
      'ifmis',
      'contract',
      'award',
      'zabuni',
      'scam',
    ],
    answer:
      'Real public tenders in Kenya are published on the Public Procurement Information Portal (PPIP) and often IFMIS. Nobody needs you to pay “commitment fees”, “bid bonds” to a personal M-Pesa, or send money to “unlock” an award. If a WhatsApp contact claims you won a tender you never bid for — treat it as a scam.',
    trust: 'verified',
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
    keywords: ['m-pesa', 'mpesa', 'till', 'paybill', 'agent', 'reverse', 'otp', 'pin'],
    answer:
      'Common tricks: “send to till then we reverse”, asking for your M-Pesa PIN/OTP, or fake SMS. Safaricom will never ask for your PIN. Confirm till/paybill names in the app before sending. If you already sent money to a wrong till, contact Safaricom and your bank immediately and file a report.',
    trust: 'verified',
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
    keywords: ['nhif', 'sha', 'health', 'afya', 'insurance', 'hospital', 'social health'],
    answer:
      'Kenya’s Social Health Authority (SHA) replaced the old NHIF model. Informal workers can register and contribute as guided on official SHA channels. Hospital staff or “agents” who demand cash “to activate SHA” outside official payment methods should be challenged — use only published contribution channels.',
    trust: 'check',
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
    keywords: ['salary', 'wage', 'casual', 'fired', 'sacked', 'labour', 'ajira', 'mshahara', 'contract'],
    answer:
      'Even casual workers have rights under Kenyan labour law (written or implied terms, timely pay, safe conditions). Start with a written demand to the employer, then escalate to the County Labour Office / Ministry of Labour. Keep timesheets, M-Pesa statements, and any messages about pay.',
    trust: 'check',
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
    keywords: ['rumour', 'rumor', 'whatsapp forward', 'closure', 'eviction', 'demolition', 'notice'],
    answer:
      'Market closures, demolitions, and fee hikes should come with a county notice on letterhead or a public announcement. Viral WhatsApp forwards are often wrong or outdated. Ask the market office for the written notice, check the date and stamp, and compare with the county website or verified social accounts before you move goods or pay “protection”.',
    trust: 'verified',
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
    keywords: ['export', 'uganda', 'tanzania', 'border', 'customs', 'eac', 'import', 'biashara kuvuka'],
    answer:
      'Small cross-border trade in the EAC still needs the right goods declarations and, where applicable, simplified trade regimes for certain products. Rules differ by border and product. Start with KEBS/standards for goods, KRA Customs guidance, and the official border desk — not “clearing agents” who only take cash with no paperwork.',
    trust: 'unclear',
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
    keywords: [
      'violence',
      'abuse',
      'gbv',
      'threat',
      'harassment',
      'police',
      'hotline',
      'usalama',
      'dhuluma',
    ],
    answer:
      'If you or someone else is in danger, prioritise safety first. In Kenya you can call emergency services, report at the nearest police station, and use recognised GBV/helpline channels. MarketTrust can log an anonymous tip for awareness, but it is not a substitute for emergency response.',
    trust: 'verified',
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
  'How do I get a Nairobi business permit?',
  'Someone says I won a tender — is it real?',
  'Do I need a KRA PIN for my stall?',
  'Market fees feel unofficial — what do I do?',
  'Fake M-Pesa till asked for my PIN',
]
