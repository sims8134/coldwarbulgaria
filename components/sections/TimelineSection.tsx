'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { timelineEvents } from '@/components/timeline/timelineData'

export default function TimelineSection() {
  const t = useTranslations('timeline')
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - windowHeight)))
      setScrollProgress(progress * 100)

      let count = 0
      itemRefs.current.forEach((ref) => {
        if (!ref) return
        const itemRect = ref.getBoundingClientRect()
        const itemCenterY = itemRect.top + itemRect.height / 2
        if (itemCenterY < windowHeight * 0.6) count++
      })
      setActiveCount(count)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="timeline" ref={sectionRef} style={{position: 'relative', padding: '128px 0', background: '#000', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(ellipse at 50% 0%, #e63946 0%, transparent 60%)'}} />
      <div style={{position: 'relative', zIndex: 1, width: '100%', maxWidth: '768px', margin: '0 auto', padding: '0 24px'}}>

        {/* Disclaimer top */}
        <div style={{marginBottom: '48px'}}>
          <p style={{color: '#4b5563', fontSize: '12px', fontFamily: 'monospace', fontStyle: 'italic', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto', borderLeft: '2px solid #374151', paddingLeft: '16px'}}>
            {t('disclaimer')}
          </p>
        </div>

        {/* Header */}
        <div style={{textAlign: 'center', marginBottom: '80px'}}>
          <span style={{color: '#e63946', fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
            {t('badge')}
          </span>
          <h2 style={{color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', marginTop: '16px', marginBottom: '16px'}}>
            {t('title')} <span style={{color: '#e63946'}}>{t('title_accent')}</span>
          </h2>
          <p style={{color: '#9ca3af', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6'}}>
            {t('description')}
          </p>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
            <div style={{width: '3px', height: '32px', background: '#e63946', flexShrink: 0}} />
            <blockquote style={{color: '#6b7280', fontStyle: 'italic', fontSize: '14px', textAlign: 'left', margin: 0}}>
              "{t('quote')}"
            </blockquote>
          </div>
        </div>

        {/* Timeline */}
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', left: '44px', top: 0, height: 'calc(100% - 88px)', width: '2px', background: '#1f2937'}} />
          <div style={{position: 'absolute', left: '44px', top: 0, width: '2px', height: `min(${scrollProgress}%, calc(100% - 88px))`, background: '#e63946', transition: 'height 0.1s linear'}} />

          {timelineEvents.map((event, index) => {
            const isActive = index < activeCount
            const isLast = index === timelineEvents.length - 1
            const title = t(`events.${event.key}.title`)
            const description = t(`events.${event.key}.description`)
            return (
              <div
                key={event.key}
                ref={el => { itemRefs.current[index] = el }}
                style={{position: 'relative', display: 'flex', alignItems: 'center', gap: '24px', marginBottom: isLast ? '0' : '40px'}}
              >
                <div style={{position: 'relative', flexShrink: 0, zIndex: 10}}>
                  <div style={{width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden', border: isActive ? '2px solid #e63946' : '2px solid #374151', boxShadow: isActive ? '0 0 20px rgba(230,57,70,0.4)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s'}}>
                    <img src={event.image} alt={title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </div>
                </div>
                <div style={{flex: 1, background: 'rgba(17,17,20,0.8)', border: '1px solid #1f2937', padding: '20px 24px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                    <span style={{color: '#e63946', fontSize: '14px', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.05em', whiteSpace: 'nowrap'}}>
                      {event.date}
                    </span>
                    <h3 style={{color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0}}>
                      {title}
                    </h3>
                  </div>
                  <p style={{color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', margin: 0}}>
                    {description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Disclaimer bottom */}
        <div style={{textAlign: 'center', marginTop: '64px', paddingTop: '48px', borderTop: '1px solid #1f2937'}}>
          <p style={{color: '#4b5563', fontSize: '12px', fontFamily: 'monospace', fontStyle: 'italic', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto'}}>
            {t('disclaimer')}
          </p>
        </div>

      </div>
    </section>
  )
}