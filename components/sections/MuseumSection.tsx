'use client'
import { useState } from 'react'
import { Package, Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function MuseumSection() {
  const t = useTranslations('museum')
  const tThemes = useTranslations('themes')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { key: 'all', label: t('cat_all') },
    { key: 'daily_life', label: tThemes('daily_life_title') },
    { key: 'youth', label: tThemes('youth_title') },
    { key: 'sports', label: tThemes('sports_title') },
    { key: 'labor', label: tThemes('labor_title') },
    { key: 'politics', label: tThemes('politics_title') },
    { key: 'propaganda', label: tThemes('propaganda_title') },
    { key: 'tech', label: tThemes('tech_title') },
    { key: 'military', label: tThemes('military_title') },
    { key: 'surveillance', label: tThemes('surveillance_title') },
    { key: 'borders', label: tThemes('borders_title') },
    { key: 'documents', label: tThemes('documents_title') },
  ]

  const placeholders = [
    { id: 1, categoryKey: 'daily_life', date: '1944–1989' },
    { id: 2, categoryKey: 'military', date: '1944–1989' },
    { id: 3, categoryKey: 'propaganda', date: '1944–1989' },
    { id: 4, categoryKey: 'politics', date: '1944–1989' },
    { id: 5, categoryKey: 'labor', date: '1944–1989' },
    { id: 6, categoryKey: 'youth', date: '1944–1989' },
  ]

  return (
    <section id="museum" style={{position: 'relative', padding: '128px 0', background: '#050505', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(ellipse at 50% 100%, #e63946 0%, transparent 60%)'}} />

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

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px'}}>
          {categories.map(({key, label}) => (
            <button key={key} onClick={() => setActiveCategory(key)}
              style={{
                padding: '8px 16px', fontSize: '11px', fontFamily: 'monospace',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                background: activeCategory === key ? '#e63946' : 'transparent',
                color: activeCategory === key ? 'white' : '#6b7280',
                border: activeCategory === key ? '1px solid #e63946' : '1px solid #1f2937',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
          {placeholders.map((item) => (
            <div key={item.id} style={{background: 'rgba(17,17,20,0.8)', border: '1px solid #1f2937', overflow: 'hidden', opacity: 0.6}}>
              <div style={{width: '100%', aspectRatio: '4/3', background: 'rgba(230,57,70,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', borderBottom: '1px solid #1f2937'}}>
                <Lock size={24} style={{color: '#374151'}} />
                <span style={{color: '#374151', fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                  {t('cataloguing')}
                </span>
              </div>
              <div style={{padding: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  <span style={{color: '#e63946', fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid rgba(230,57,70,0.3)', padding: '2px 6px'}}>
                    {tThemes(`${item.categoryKey}_title`)}
                  </span>
                </div>
                <h3 style={{color: '#374151', fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px 0'}}>
                  {t('artifact_title')}
                </h3>
                <p style={{color: '#1f2937', fontSize: '11px', fontFamily: 'monospace', margin: 0}}>
                  {item.date} — {t('artifact_source')}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop: '48px', padding: '24px', border: '1px solid #1f2937', borderLeft: '3px solid #e63946', display: 'flex', alignItems: 'center', gap: '16px'}}>
          <Package size={24} style={{color: '#e63946', flexShrink: 0}} />
          <div>
            <p style={{color: 'white', fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px 0'}}>
              {t('banner_title')}
            </p>
            <p style={{color: '#6b7280', fontSize: '13px', margin: 0}}>
              {t('banner_desc')}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}