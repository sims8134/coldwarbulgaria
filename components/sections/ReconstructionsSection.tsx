'use client'
import { useState } from 'react'
import { Sparkles, Info } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ReconstructionsSection() {
  const t = useTranslations('reconstructions')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const placeholders = [
    { id: 1, key: 'street' },
    { id: 2, key: 'interior' },
    { id: 3, key: 'factory' },
    { id: 4, key: 'parade' },
  ]

  return (
    <section id="reconstructions" style={{position: 'relative', padding: '128px 0', background: '#0a0a0b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(ellipse at 100% 0%, #e63946 0%, transparent 60%)'}} />

      <div style={{position: 'relative', zIndex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>

        <div style={{marginBottom: '48px'}}>
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

        {/* Note d'intention — affichee avant les images, volontairement */}
        <div style={{marginBottom: '48px', padding: '24px', border: '1px solid rgba(230,57,70,0.3)', borderLeft: '3px solid #e63946', background: 'rgba(230,57,70,0.04)', display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
          <Info size={20} style={{color: '#e63946', flexShrink: 0, marginTop: '2px'}} />
          <div>
            <p style={{color: 'white', fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0'}}>
              {t('notice_title')}
            </p>
            <p style={{color: '#9ca3af', fontSize: '13px', lineHeight: '1.7', margin: 0, maxWidth: '760px'}}>
              {t('notice_body')}
            </p>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
          {placeholders.map((item) => {
            const isHovered = hoveredId === item.id
            return (
              <div key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{background: 'rgba(17,17,20,0.8)', border: isHovered ? '1px solid rgba(230,57,70,0.5)' : '1px solid #1f2937', overflow: 'hidden', transition: 'border-color 0.3s'}}>
                <div style={{position: 'relative', width: '100%', aspectRatio: '4/3', background: 'rgba(230,57,70,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', borderBottom: '1px solid #1f2937'}}>
                  <Sparkles size={24} style={{color: '#374151'}} />
                  <span style={{color: '#374151', fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                    {t('coming')}
                  </span>
                  {/* Badge IA — toujours visible, sur la vignette elle-meme */}
                  <div style={{position: 'absolute', top: '10px', left: '10px', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.45)', padding: '4px 8px'}}>
                    <Sparkles size={10} style={{color: '#e63946'}} />
                    <span style={{color: '#e63946', fontSize: '9px', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.12em'}}>
                      {t('ai_badge')}
                    </span>
                  </div>
                </div>
                <div style={{padding: '16px'}}>
                  <h3 style={{color: '#4b5563', fontSize: '14px', fontWeight: 'bold', margin: '0 0 6px 0'}}>
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p style={{color: '#374151', fontSize: '11px', fontFamily: 'monospace', margin: 0}}>
                    {t(`items.${item.key}.source`)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
