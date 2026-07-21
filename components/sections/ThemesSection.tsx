'use client'
import { Users, GraduationCap, Trophy, Hammer, Star, Radio, Cpu, Shield, Eye, MapPin, FileText } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const themeKeys = [
  { icon: Users, key: 'daily_life' },
  { icon: GraduationCap, key: 'youth' },
  { icon: Trophy, key: 'sports' },
  { icon: Hammer, key: 'labor' },
  { icon: Star, key: 'politics' },
  { icon: Radio, key: 'propaganda' },
  { icon: Cpu, key: 'tech' },
  { icon: Shield, key: 'military' },
  { icon: Eye, key: 'surveillance' },
  { icon: MapPin, key: 'borders' },
  { icon: FileText, key: 'documents' },
]

export default function ThemesSection() {
  const t = useTranslations('themes')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="themes" style={{position: 'relative', padding: '128px 0', background: '#0a0a0b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(ellipse at 100% 50%, #e63946 0%, transparent 60%)'}} />
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
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px'}}>
          {themeKeys.map(({ icon: Icon, key }, index) => {
            const isHovered = hoveredIndex === index
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: isHovered ? 'rgba(230,57,70,0.05)' : 'rgba(17,17,20,0.8)',
                  border: isHovered ? '1px solid rgba(230,57,70,0.5)' : '1px solid #1f2937',
                  padding: '28px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div style={{
                  width: '44px', height: '44px',
                  background: isHovered ? 'rgba(230,57,70,0.2)' : 'rgba(230,57,70,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'background 0.3s'
                }}>
                  <Icon size={20} style={{color: '#e63946'}} />
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
                    <h3 style={{color: isHovered ? '#e63946' : 'white', fontSize: '16px', fontWeight: 'bold', margin: 0, transition: 'color 0.3s'}}>
                      {t(`${key}_title`)}
                    </h3>
                    <span style={{color: '#374151', fontSize: '11px', fontFamily: 'monospace', whiteSpace: 'nowrap', marginLeft: '8px', fontStyle: 'italic'}}>
                      {t('coming_soon')}
                    </span>
                  </div>
                  <p style={{color: '#9ca3af', fontSize: '13px', lineHeight: '1.6', margin: 0}}>
                    {t(`${key}_desc`)}
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