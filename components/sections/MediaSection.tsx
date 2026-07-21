'use client'
import { Play, Mic, Film, ArrowRight, Tv } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function MediaSection() {
  const t = useTranslations('media')

  const mediaTypes = [
    { icon: Tv, titleKey: 'doc_title', descKey: 'doc_desc', statusKey: 'doc_status', isActive: true },
    { icon: Film, titleKey: 'footage_title', descKey: 'footage_desc', statusKey: 'footage_status', isActive: false },
    { icon: Mic, titleKey: 'podcast_title', descKey: 'podcast_desc', statusKey: 'podcast_status', isActive: false },
  ]

  return (
    <section id="media" style={{position: 'relative', padding: '128px 0', background: '#0a0a0b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(ellipse at 50% 0%, #e63946 0%, transparent 60%)'}} />

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

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px'}}>
          {mediaTypes.map(({icon: Icon, titleKey, descKey, statusKey, isActive}) => (
            <div key={titleKey} style={{background: 'rgba(17,17,20,0.8)', border: '1px solid #1f2937', padding: '32px'}}>
              <div style={{width: '48px', height: '48px', background: 'rgba(230,57,70,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                <Icon size={22} style={{color: '#e63946'}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px'}}>
                <h3 style={{color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0}}>{t(titleKey)}</h3>
                <span style={{color: isActive ? '#e63946' : '#374151', fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', fontStyle: 'italic'}}>
                  {t(statusKey)}
                </span>
              </div>
              <p style={{color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', margin: 0}}>{t(descKey)}</p>
            </div>
          ))}
        </div>

        <div style={{padding: '32px', border: '1px solid #1f2937', borderLeft: '3px solid #e63946', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <Play size={28} style={{color: '#e63946', flexShrink: 0}} />
            <div>
              <p style={{color: 'white', fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0'}}>{t('youtube_title')}</p>
              <p style={{color: '#6b7280', fontSize: '13px', margin: 0}}>{t('youtube_desc')}</p>
            </div>
          </div>
          <a href="https://www.youtube.com/@PeoplesRepublicOfBulgaria1505" target="_blank" rel="noopener noreferrer"
            style={{display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e63946', color: '#e63946', padding: '10px 20px', fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', whiteSpace: 'nowrap'}}>
            {t('youtube_cta')} <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  )
}