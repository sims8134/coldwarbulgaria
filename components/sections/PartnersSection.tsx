'use client'
import { ArrowRight, Handshake } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function PartnersSection() {
  const t = useTranslations('partners')

  const partners = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]

  return (
    <section id="partners" style={{position: 'relative', padding: '96px 0', background: '#0a0a0b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(ellipse at 50% 50%, #e63946 0%, transparent 60%)'}} />

      <div style={{position: 'relative', zIndex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>

        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '64px'}}>
          <div>
            <span style={{color: '#e63946', fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
              {t('badge')}
            </span>
            <h2 style={{color: 'white', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 'bold', marginTop: '16px', marginBottom: '8px'}}>
              {t('title')} <span style={{color: '#e63946'}}>{t('title_accent')}</span>
            </h2>
            <p style={{color: '#9ca3af', maxWidth: '500px', lineHeight: '1.6', fontSize: '15px', margin: 0}}>
              {t('description')}
            </p>
          </div>
          <a href="mailto:contact@coldwarbulgaria.com"
            style={{display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e63946', color: '#e63946', padding: '12px 24px', fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0}}>
            <Handshake size={14} />
            {t('become_partner')} <ArrowRight size={14} />
          </a>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px'}}>
          {partners.map(({id}) => (
            <div key={id} style={{background: 'rgba(17,17,20,0.5)', border: '1px dashed #1f2937', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', minHeight: '140px'}}>
              <div style={{width: '48px', height: '48px', border: '1px dashed #374151', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Handshake size={20} style={{color: '#374151'}} />
              </div>
              <p style={{color: '#374151', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontStyle: 'italic'}}>
                {t('coming_soon')}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}