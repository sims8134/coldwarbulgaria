'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { ArrowDown, Play } from 'lucide-react'

export default function HeroSection() {
  const t = useTranslations('hero')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} style={{position: 'relative', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxSizing: 'border-box', paddingTop: '16px', paddingBottom: '40px'}}>
      <div style={{position: 'absolute', inset: 0}}>
        <img src="/assets/bzd.jpg" alt="Buzludzha Monument" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,11,0.2) 0%, rgba(10,10,11,0.5) 50%, #0a0a0b 100%)'}} />
      </div>
      <div style={{position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center'}}>
        <div style={{maxWidth: '896px', margin: '0 auto'}}>

          <div className="reveal" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '48px'}}>
            <span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#e63946', display: 'inline-block'}} />
            <span style={{color: '#d1d5db', fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
              Est. 2025 — Digital Archive
            </span>
          </div>

          <h1 className="reveal reveal-delay-1" style={{fontWeight: 'bold', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: '1.15', marginBottom: '56px'}}>
            <span style={{color: 'white', display: 'block'}}>{t('title1')}</span>
            <span style={{color: '#e63946', display: 'block'}}>{t('title2')}</span>
          </h1>

          <p className="reveal reveal-delay-2" style={{color: '#d1d5db', fontSize: '18px', maxWidth: '672px', margin: '0 auto', marginBottom: '64px', lineHeight: '1.8'}}>
            {t('description')}
          </p>

          <div className="reveal reveal-delay-3" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '64px', marginBottom: '72px'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{color: 'white', fontSize: '30px', fontWeight: 'bold', margin: 0}}>1944</p>
              <p style={{color: '#6b7280', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '12px', marginBottom: 0}}>{t('start')}</p>
            </div>
            <div style={{width: '96px', height: '1px', background: 'linear-gradient(to right, rgba(230,57,70,0.2), #e63946, rgba(230,57,70,0.2))'}} />
            <div style={{textAlign: 'center'}}>
              <p style={{color: 'white', fontSize: '30px', fontWeight: 'bold', margin: 0}}>1989</p>
              <p style={{color: '#6b7280', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '12px', marginBottom: 0}}>{t('end')}</p>
            </div>
          </div>

          <div className="reveal reveal-delay-4" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px'}}>
            <a href="#museum" style={{border: '1px solid #e63946', color: '#e63946', padding: '12px 32px', fontSize: '13px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
              <Play size={14} />
              {t('cta_museum')}
            </a>
            <a href="#timeline" style={{color: '#9ca3af', padding: '12px 32px', fontSize: '13px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none'}}>
              {t('cta_timeline')}
            </a>
          </div>

        </div>
      </div>

      <div style={{position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', pointerEvents: 'none'}}>
        <ArrowDown size={16} style={{color: '#e63946'}} />
      </div>
    </section>
  )
}