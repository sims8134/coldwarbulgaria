'use client'
import { useState } from 'react'
import { Mic, Info } from 'lucide-react'
import { useTranslations } from 'next-intl'

/** Les six episodes, dans l'ordre des fichiers cwb-pod-01 a 06. */
const episodes = [
  { key: 'origins',   file: 'cwb-pod-01.mp3' },
  { key: 'coup',      file: 'cwb-pod-02.mp3' },
  { key: 'terror',    file: 'cwb-pod-03.mp3' },
  { key: 'spearhead', file: 'cwb-pod-04.mp3' },
  { key: 'zealous',   file: 'cwb-pod-05.mp3' },
  { key: 'economy',   file: 'cwb-pod-06.mp3' },
  { key: 'security',  file: 'cwb-pod-07.mp3' },
  { key: 'traffic',   file: 'cwb-pod-08.mp3' },
  { key: 'republic',  file: 'cwb-pod-09.mp3' },
  { key: 'surplus',   file: 'cwb-pod-10.mp3', bonus: true },
]

export default function MediaSection() {
  const t = useTranslations('media')
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="media" className="cwb-media-section" style={{position: 'relative', padding: '128px 0', background: '#0a0a0b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(ellipse at 50% 0%, #e63946 0%, transparent 60%)'}} />
      <style>{`
        .cwb-pod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
        @media (max-width: 640px) {
          .cwb-media-section { padding: 72px 0 !important; }
          .cwb-pod-grid { grid-template-columns: 1fr; gap: 14px; }
        }
      `}</style>

      <div style={{position: 'relative', zIndex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>

        <div style={{marginBottom: '40px'}}>
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

        {/* Note d'honnetete, avant les episodes */}
        <div style={{marginBottom: '40px', padding: '24px', border: '1px solid rgba(230,57,70,0.3)', borderLeft: '3px solid #e63946', background: 'rgba(230,57,70,0.04)', display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
          <Info size={20} style={{color: '#e63946', flexShrink: 0, marginTop: '2px'}} />
          <div>
            <p style={{color: 'white', fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0'}}>{t('notice_title')}</p>
            <p style={{color: '#9ca3af', fontSize: '13px', lineHeight: '1.7', margin: 0, maxWidth: '760px'}}>{t('notice_body')}</p>
          </div>
        </div>

        <div className="cwb-pod-grid">
          {episodes.map((ep, i) => {
            const isHovered = hovered === ep.key
            return (
              <div
                key={ep.key}
                onMouseEnter={() => setHovered(ep.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex', flexDirection: 'column',
                  background: isHovered ? 'rgba(230,57,70,0.05)' : 'rgba(17,17,20,0.8)',
                  border: isHovered ? '1px solid rgba(230,57,70,0.5)' : '1px solid #1f2937',
                  padding: '26px 24px', transition: 'all 0.3s ease',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
                  <div style={{
                    width: '44px', height: '44px',
                    background: isHovered ? 'rgba(230,57,70,0.2)' : 'rgba(230,57,70,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'background 0.3s',
                  }}>
                    <Mic size={20} style={{color: '#e63946'}} />
                  </div>
                  {ep.bonus ? (
                    <span style={{color: '#e63946', fontSize: '10px', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.14em', border: '1px solid rgba(230,57,70,0.45)', padding: '4px 9px'}}>
                      {t('bonus')}
                    </span>
                  ) : (
                    <span style={{color: '#374151', fontSize: '22px', fontFamily: 'monospace', fontWeight: 'bold', lineHeight: 1}}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  )}
                </div>

                <h3 style={{color: isHovered ? '#e63946' : 'white', fontSize: '17px', fontWeight: 'bold', margin: '0 0 10px 0', lineHeight: '1.35', transition: 'color 0.3s'}}>
                  {t(`episodes.${ep.key}.title`)}
                </h3>

                <p style={{color: '#9ca3af', fontSize: '13px', lineHeight: '1.65', margin: '0 0 20px 0', flex: 1}}>
                  {t(`episodes.${ep.key}.desc`)}
                </p>

                <audio controls preload="none" src={`/podcasts/${ep.file}`} style={{width: '100%', height: '36px', display: 'block'}}>
                  {t('no_audio')}
                </audio>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}