'use client'
import { BookOpen, Map, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function PublicationsSection() {
  const t = useTranslations('publications')

  const publications = [
    { icon: BookOpen, typeKey: 'pub1_type', titleKey: 'pub1_title', descKey: 'pub1_desc', statusKey: 'pub1_status', year: '2025' },
    { icon: Map,      typeKey: 'pub2_type', titleKey: 'pub2_title', descKey: 'pub2_desc', statusKey: 'pub2_status', year: '2025' },
    { icon: BookOpen, typeKey: 'pub3_type', titleKey: 'pub3_title', descKey: 'pub3_desc', statusKey: 'pub3_status', year: '2026' },
  ]

  return (
    <section id="publications" style={{position: 'relative', padding: '128px 0', background: '#050505', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(ellipse at 0% 100%, #e63946 0%, transparent 60%)'}} />

      <div style={{position: 'relative', zIndex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>

        <div style={{marginBottom: '80px'}}>
          <span style={{color: '#e63946', fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
            {t('badge')}
          </span>
          <h2 style={{color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', marginTop: '16px', marginBottom: '16px', maxWidth: '600px'}}>
            {t('title')} <span style={{color: '#e63946'}}>{t('title_accent')}</span>
          </h2>
          <p style={{color: '#9ca3af', maxWidth: '500px', lineHeight: '1.6', fontSize: '16px', margin: 0}}>
            {t('description')}
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '64px'}}>
          {publications.map(({icon: Icon, typeKey, titleKey, descKey, statusKey, year}) => (
            <div key={titleKey} style={{background: 'rgba(17,17,20,0.8)', border: '1px solid #1f2937', overflow: 'hidden'}}>
              <div style={{width: '100%', aspectRatio: '16/9', background: 'rgba(230,57,70,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', borderBottom: '1px solid #1f2937', position: 'relative'}}>
                <Icon size={32} style={{color: '#1f2937'}} />
                <span style={{color: '#1f2937', fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                  {t('cover_coming')}
                </span>
                <div style={{position: 'absolute', top: '12px', left: '12px', background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.3)', padding: '4px 10px'}}>
                  <span style={{color: '#e63946', fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                    {t(typeKey)}
                  </span>
                </div>
                <div style={{position: 'absolute', top: '12px', right: '12px'}}>
                  <span style={{color: '#374151', fontSize: '10px', fontFamily: 'monospace', fontStyle: 'italic'}}>
                    {t(statusKey)}
                  </span>
                </div>
              </div>
              <div style={{padding: '24px'}}>
                <p style={{color: '#4b5563', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0'}}>
                  {year}
                </p>
                <h3 style={{color: 'white', fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0', lineHeight: '1.4'}}>
                  {t(titleKey)}
                </h3>
                <p style={{color: '#9ca3af', fontSize: '13px', lineHeight: '1.6', margin: 0}}>
                  {t(descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{padding: '32px', border: '1px solid #1f2937', borderLeft: '3px solid #e63946', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'}}>
          <div>
            <p style={{color: 'white', fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0'}}>
              {t('notify_title')}
            </p>
            <p style={{color: '#6b7280', fontSize: '13px', margin: 0}}>
              {t('notify_desc')}
            </p>
          </div>
          <a href="https://www.youtube.com/@PeoplesRepublicOfBulgaria1505" target="_blank" rel="noopener noreferrer"
            style={{display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e63946', color: '#e63946', padding: '10px 20px', fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', whiteSpace: 'nowrap'}}>
            {t('notify_cta')} <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  )
}