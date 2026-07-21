'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

const sections = ['privacy', 'terms', 'cookies', 'mentions', 'gdpr'] as const
type Section = typeof sections[number]

function LegalContent() {
  const t = useTranslations('legal')
  const searchParams = useSearchParams()
  const router = useRouter()
  const active = (searchParams.get('s') as Section) || 'privacy'

  const sectionLabels: Record<Section, string> = {
    privacy: t('nav_privacy'),
    terms: t('nav_terms'),
    cookies: t('nav_cookies'),
    mentions: t('nav_mentions'),
    gdpr: t('nav_gdpr'),
  }

  return (
    <div style={{ background: '#050505', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px' }}>

        {/* Sidebar */}
        <aside>
          <div style={{ position: 'sticky', top: '96px' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4b5563', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Legal Documents
            </div>
            {sections.map(s => (
              <button key={s} onClick={() => router.push(`?s=${s}`)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', fontSize: '13px', cursor: 'pointer',
                  background: 'none', border: 'none',
                  borderLeft: `2px solid ${active === s ? '#e63946' : 'transparent'}`,
                  color: active === s ? '#e63946' : '#6b7280',
                  backgroundColor: active === s ? 'rgba(230,57,70,0.08)' : 'transparent',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                }}>
                {sectionLabels[s]}
              </button>
            ))}

            <div style={{ marginTop: '32px', borderTop: '1px solid #1f2937', paddingTop: '20px' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4b5563', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Legal Entity
              </div>
              {[
                ['EIK', '208209146'],
                ['Capital', '1 022 €'],
                ['TVA', 'Non assujetti'],
              ].map(([k, v]) => (
                <div key={k} style={{ marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k} · </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#6b7280' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main>
          {active === 'privacy' && <PrivacySection />}
          {active === 'terms' && <TermsSection />}
          {active === 'cookies' && <CookiesSection />}
          {active === 'mentions' && <MentionsSection />}
          {active === 'gdpr' && <GdprSection />}
        </main>

      </div>
    </div>
  )
}

function PageHeader({ category, title, meta }: { category: string; title: string; meta: string[] }) {
  return (
    <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #1f2937' }}>
      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#e63946', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
        {category}
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '12px', lineHeight: 1.2 }}>{title}</h1>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {meta.map(m => <span key={m} style={{ fontFamily: 'monospace', fontSize: '11px', color: '#4b5563' }}>{m}</span>)}
      </div>
    </div>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: '1.05rem', fontWeight: 400, color: 'white', margin: '2.5rem 0 1rem', paddingBottom: '8px', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ display: 'block', width: '3px', height: '16px', background: '#e63946', flexShrink: 0 }} />
      {children}
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: '#9ca3af', margin: '1.5rem 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7, marginBottom: '14px' }}>{children}</p>
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a0a0a', border: '1px solid #1f2937', borderLeft: '3px solid #e63946', padding: '14px 18px', margin: '1.5rem 0', fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
      {children}
    </div>
  )
}

function EntityCard() {
  return (
    <div style={{ background: '#0a0a0a', border: '1px solid #1f2937', padding: '20px', margin: '1.5rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
      {[
        ['Company', 'СОЦ ТРЕЙД БЪЛГАРИЯ ЕООД'],
        ['Transliteration', 'SOC TRADE BULGARIA'],
        ['Legal Form', 'ЕООД'],
        ['EIK / ЕИК', '208209146'],
        ['Capital', '1 022 € (libéré)'],
        ['Registration', '11.03.2025'],
        ['Registered Office', '64А ул. Марагидик, гр. София 1505, България'],
        ['VAT', 'Non assujetti (Не по ЗДДС)'],
        ['Director', 'Simon Henri Beltran'],
        ['DPO / Contact', 'contact@coldwarbulgaria.com'],
      ].map(([k, v]) => (
        <dl key={k} style={{ margin: 0 }}>
          <dt style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>{k}</dt>
          <dd style={{ color: '#e5e7eb', fontSize: '13px', margin: 0 }}>{v}</dd>
        </dl>
      ))}
    </div>
  )
}

function LegalTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{ background: '#0a0a0a', color: '#4b5563', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1f2937' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #111' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '8px 12px', color: '#9ca3af', verticalAlign: 'top' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PrivacySection() {
  return (
    <>
      <PageHeader category="Legal Document · GDPR Art. 13 & 14" title="Privacy Policy" meta={['Last updated: 14 April 2026', 'Version: 1.0']} />
      <InfoBox>
        <strong style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9ca3af' }}>DATA CONTROLLER · </strong>
        СОЦ ТРЕЙД БЪЛГАРИЯ ЕООД (SOC TRADE BULGARIA) — EIK 208209146 — Registered in Bulgaria under the Commercial Act (Търговски закон).
      </InfoBox>
      <H2>1. Identity of the Data Controller</H2>
      <EntityCard />
      <H2>2. Personal Data We Collect</H2>
      <H3>2.1 Data You Provide</H3>
      <ul style={{ paddingLeft: '20px', color: '#9ca3af', fontSize: '14px', lineHeight: 1.8 }}>
        <li>Newsletter: email address, language preference, subscription date and IP (consent record).</li>
        <li>Contact forms: name, email, message content, IP address.</li>
      </ul>
      <H3>2.2 Data Collected Automatically</H3>
      <ul style={{ paddingLeft: '20px', color: '#9ca3af', fontSize: '14px', lineHeight: 1.8 }}>
        <li>IP address and approximate geolocation (country/city)</li>
        <li>Browser type, operating system</li>
        <li>Pages visited, time on page, referrer URL</li>
        <li>Cookie identifiers (see Cookie Policy)</li>
      </ul>
      <H2>3. Purposes and Legal Bases</H2>
      <LegalTable
        headers={['Purpose', 'Legal Basis (GDPR)', 'Retention']}
        rows={[
          ['Delivering the website', 'Art. 6(1)(b) — Contract', 'Session'],
          ['Newsletter', 'Art. 6(1)(a) — Consent', 'Until unsubscribe'],
          ['Analytics', 'Art. 6(1)(f) — Legitimate interest', '26 months'],
          ['Security', 'Art. 6(1)(f) — Legitimate interest', '12 months'],
          ['Legal compliance', 'Art. 6(1)(c) — Legal obligation', '5 years'],
          ['Contact requests', 'Art. 6(1)(f) — Legitimate interest', '3 years'],
        ]}
      />
      <H2>4. Your Rights</H2>
      <P>Contact <strong style={{ color: '#e5e7eb' }}>contact@coldwarbulgaria.com</strong> to exercise: Access (Art. 15), Rectification (Art. 16), Erasure (Art. 17), Restriction (Art. 18), Portability (Art. 20), Objection (Art. 21), Withdrawal of consent (Art. 7(3)).</P>
      <H2>5. Supervisory Authority</H2>
      <InfoBox>
        <strong style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9ca3af' }}>КЗЛД — CPDP · </strong>
        2 Prof. Tsvetan Lazarov Blvd., 1592 Sofia · kzld@cpdp.bg · www.cpdp.bg
      </InfoBox>
    </>
  )
}

function TermsSection() {
  return (
    <>
      <PageHeader category="Legal Document · Terms & Conditions" title="Terms of Use" meta={['Last updated: 14 April 2026', 'Governing law: Bulgaria']} />
      <P>These Terms govern your use of <strong style={{ color: '#e5e7eb' }}>coldwarbulgaria.com</strong>, operated by СОЦ ТРЕЙД БЪЛГАРИЯ ЕООД (EIK 208209146).</P>
      <H2>1. Nature of the Website</H2>
      <P>Cold War Bulgaria is a historical and educational documentary project dedicated to the history of Bulgaria during the Cold War period (1944–1989).</P>
      <H2>2. Intellectual Property</H2>
      <P>All original content is protected under Bulgarian and international copyright law (ЗАПСП). Archival materials credit their source. No reproduction for commercial purposes without prior written consent.</P>
      <H2>3. Permitted Use</H2>
      <P>Personal, non-commercial, educational use. Sharing links. Brief quotations (under 400 words) with full attribution.</P>
      <H2>4. Prohibited Conduct</H2>
      <ul style={{ paddingLeft: '20px', color: '#9ca3af', fontSize: '14px', lineHeight: 1.8 }}>
        <li>Commercial reproduction without written consent.</li>
        <li>Circumventing security measures.</li>
        <li>Bulk automated scraping.</li>
        <li>Any use violating Bulgarian law, EU law, or third-party rights.</li>
      </ul>
      <H2>5. Governing Law</H2>
      <P>Bulgarian law. Disputes: competent Bulgarian courts (Sofia City Court).</P>
      <H2>6. Contact</H2>
      <P><strong style={{ color: '#e5e7eb' }}>contact@coldwarbulgaria.com</strong></P>
    </>
  )
}

function CookiesSection() {
  return (
    <>
      <PageHeader category="Legal Document · ePrivacy Directive" title="Cookie Policy" meta={['Last updated: 14 April 2026']} />
      <P>Compliant with Bulgarian law implementing the ePrivacy Directive (ЗЕС) and GDPR.</P>
      <H2>1. Categories of Cookies</H2>
      <LegalTable
        headers={['Category', 'Name / Provider', 'Purpose', 'Duration', 'Consent']}
        rows={[
          ['Strictly Necessary', 'session_id, csrf_token', 'Security, session', 'Session', 'No'],
          ['Strictly Necessary', 'cookie_consent', 'Cookie preferences', '12 months', 'No'],
          ['Functional', 'lang_pref', 'Language selection', '12 months', 'No'],
          ['Analytics', 'None currently deployed', '—', '—', '—'],
          ['Marketing', 'None currently', '—', '—', 'Yes'],
        ]}
      />
      <H2>2. Managing Preferences</H2>
      <P>Update preferences at any time via "Cookie Settings" in the footer, or through your browser settings.</P>
    </>
  )
}

function MentionsSection() {
  return (
    <>
      <PageHeader category="Legal Notice · Импрес" title="Legal Notice" meta={['Last updated: 14 April 2026']} />
      <H2>Publisher</H2>
      <EntityCard />
      <H2>Trade Register</H2>
      <InfoBox>
        <strong style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9ca3af' }}>Агенция по вписванията · </strong>
        Bulgarian Commercial Register — Registration: 11.03.2025 · EIK 208209146
      </InfoBox>
      <H2>Hosting</H2>
      <InfoBox>
        <strong style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9ca3af' }}>HOSTING · </strong>
        Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA
      </InfoBox>
      <H2>Applicable Law</H2>
      <P>ЗЕТ (Electronic Commerce Act) · ЗЗП (Consumer Protection) · ЗЗЛД (Personal Data Protection) · ЗАПСП (Copyright) · ЗЕС (Electronic Communications)</P>
    </>
  )
}

function GdprSection() {
  return (
    <>
      <PageHeader category="GDPR · Rights & Procedures" title="Exercise Your Rights" meta={['Response: 30 days', 'Free of charge']} />
      <P>Contact <strong style={{ color: '#e5e7eb' }}>contact@coldwarbulgaria.com</strong> — subject: "GDPR Request — [Right Name]".</P>
      <H2>Your Rights</H2>
      {[
        ['Access (Art. 15)', 'Obtain a copy of all personal data held about you.'],
        ['Rectification (Art. 16)', 'Correct inaccurate or incomplete data.'],
        ['Erasure (Art. 17)', 'Request deletion. Subject to 5-year Bulgarian accounting retention.'],
        ['Restriction (Art. 18)', 'Limit processing while contesting accuracy.'],
        ['Portability (Art. 20)', 'Receive your data in CSV/JSON format.'],
        ['Objection (Art. 21)', 'Object to processing based on legitimate interest.'],
        ['Withdraw Consent (Art. 7(3))', 'At any time, without affecting past lawful processing.'],
      ].map(([title, desc]) => (
        <div key={title as string}>
          <H3>{title as string}</H3>
          <P>{desc as string}</P>
        </div>
      ))}
      <H2>Complaint</H2>
      <InfoBox>
        <strong style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9ca3af' }}>КЗЛД — CPDP · </strong>
        2 Prof. Tsvetan Lazarov Blvd., 1592 Sofia · kzld@cpdp.bg · www.cpdp.bg
      </InfoBox>
    </>
  )
}

export default function LegalPage() {
  return (
    <Suspense fallback={<div style={{ background: '#050505', minHeight: '100vh' }} />}>
      <LegalContent />
    </Suspense>
  )
}