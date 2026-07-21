'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer')

  return (
    <footer style={{ background: '#050505', borderTop: '1px solid #1f2937', padding: '64px 0 32px' }}>
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '64px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/assets/logo carre blanc.png" alt="Cold War Bulgaria" style={{ width: '40px', height: '40px', borderRadius: '4px' }} />
              <div>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>Cold War Bulgaria™</div>
                <div style={{ color: '#6b7280', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Online Museum</div>
              </div>
            </div>
            <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.6', maxWidth: '280px' }}>
              {t('description')}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ color: 'white', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', fontFamily: 'monospace' }}>
              {t('explore')}
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Timeline', 'Themes', 'Map', 'Museum', 'Media'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`}
                    style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e63946')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: 'white', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', fontFamily: 'monospace' }}>
              {t('legal')}
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { key: 'privacy', section: 'privacy' },
                { key: 'terms', section: 'terms' },
                { key: 'cookies', section: 'cookies' },
                { key: 'mentions', section: 'mentions' },
                { key: 'gdpr', section: 'gdpr' },
              ].map(({ key, section }) => (
                <li key={key}>
                  <Link href={`/${locale}/legal?s=${section}`}
                    style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e63946')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Notice */}
          <div>
            <h4 style={{ color: 'white', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', fontFamily: 'monospace' }}>
              {t('notice_title')}
            </h4>
            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: '1.6' }}>
              {t('notice_text')}
            </p>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1f2937', marginBottom: '24px' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ color: '#4b5563', fontSize: '11px', fontFamily: 'monospace', margin: 0 }}>
            © 2026 Cold War Bulgaria™ — All rights reserved · SOC TRADE BULGARIA EOOD · EIK 208209146
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#4b5563', fontSize: '11px', fontFamily: 'monospace' }}>Est. 2025</span>
            <span style={{ color: '#1f2937' }}>·</span>
            <span style={{ color: '#e63946', fontSize: '11px', fontFamily: 'monospace' }}>1944 — 1989</span>
          </div>
        </div>

      </div>
    </footer>
  )
}