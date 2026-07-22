'use client'
import { useState, useEffect, useCallback } from 'react'
import { Sparkles, Info, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

/** Les 16 reconstitutions. La decennie sert au libelle « inspire d'images des annees … ». */
const items = [
  { key: 'housing',   file: 'cwb-rec-01.jpg', decade: '1980' },
  { key: 'varna',     file: 'cwb-rec-02.jpg', decade: '1970' },
  { key: 'airport',   file: 'cwb-rec-03.jpg', decade: '1980' },
  { key: 'parade',    file: 'cwb-rec-04.jpg', decade: '1980' },
  { key: 'radar',     file: 'cwb-rec-05.jpg', decade: '1970' },
  { key: 'shipka',    file: 'cwb-rec-06.jpg', decade: '1970' },
  { key: 'street',    file: 'cwb-rec-07.jpg', decade: '1980' },
  { key: 'station',   file: 'cwb-rec-08.jpg', decade: '1970' },
  { key: 'resthouse', file: 'cwb-rec-09.jpg', decade: '1970' },
  { key: 'militia',   file: 'cwb-rec-10.jpg', decade: '1970' },
  { key: 'march3',    file: 'cwb-rec-11.jpg', decade: '1980' },
  { key: 'largo',     file: 'cwb-rec-12.jpg', decade: '1970' },
  { key: 'tram',      file: 'cwb-rec-13.jpg', decade: '1970' },
  { key: 'convoy',    file: 'cwb-rec-14.jpg', decade: '1980' },
  { key: 'cafe',      file: 'cwb-rec-15.jpg', decade: '1980' },
  { key: 'computers', file: 'cwb-rec-16.jpg', decade: '1980' },
]

export default function ReconstructionsSection() {
  const t = useTranslations('reconstructions')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(() => setOpenIndex(i => (i === null ? i : (i - 1 + items.length) % items.length)), [])
  const next = useCallback(() => setOpenIndex(i => (i === null ? i : (i + 1) % items.length)), [])

  // Clavier : Echap ferme, fleches naviguent
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    // on bloque le defilement de la page pendant l'ouverture
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [isOpen, close, prev, next])

  const current = openIndex !== null ? items[openIndex] : null

  return (
    <section id="reconstructions" className="cwb-rec-section" style={{position: 'relative', padding: '128px 0', background: '#0a0a0b', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(ellipse at 100% 0%, #e63946 0%, transparent 60%)'}} />
      <style>{`
        .cwb-rec-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .cwb-rec-strip::-webkit-scrollbar { height: 6px; }
        .cwb-rec-strip::-webkit-scrollbar-thumb { background: #374151; }
        .cwb-rec-strip::-webkit-scrollbar-track { background: transparent; }
        @media (max-width: 640px) {
          .cwb-rec-section { padding: 72px 0 !important; }
          .cwb-rec-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
          .cwb-rec-arrow { display: none !important; }
        }
      `}</style>

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

        {/* Note d'intention, volontairement placee avant les images */}
        <div style={{marginBottom: '40px', padding: '24px', border: '1px solid rgba(230,57,70,0.3)', borderLeft: '3px solid #e63946', background: 'rgba(230,57,70,0.04)', display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
          <Info size={20} style={{color: '#e63946', flexShrink: 0, marginTop: '2px'}} />
          <div>
            <p style={{color: 'white', fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0'}}>{t('notice_title')}</p>
            <p style={{color: '#9ca3af', fontSize: '13px', lineHeight: '1.7', margin: 0, maxWidth: '760px'}}>{t('notice_body')}</p>
          </div>
        </div>

        <div className="cwb-rec-grid">
          {items.map((item, i) => (
            <button
              key={item.key}
              onClick={() => setOpenIndex(i)}
              style={{position: 'relative', padding: 0, border: '1px solid #1f2937', background: '#111114', cursor: 'pointer', overflow: 'hidden', display: 'block', width: '100%'}}
            >
              <img
                src={`/reconstructions/${item.file}`}
                alt={t(`items.${item.key}`)}
                loading="lazy"
                style={{width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block'}}
              />
              <div style={{position: 'absolute', top: '8px', left: '8px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(10,10,11,0.82)', border: '1px solid rgba(230,57,70,0.5)', padding: '3px 7px'}}>
                <Sparkles size={9} style={{color: '#e63946'}} />
                <span style={{color: '#e63946', fontSize: '8px', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                  {t('ai_badge')}
                </span>
              </div>
              <div style={{padding: '10px 12px', textAlign: 'left'}}>
                <p style={{color: '#d1d5db', fontSize: '12px', fontWeight: 'bold', margin: '0 0 3px 0'}}>{t(`items.${item.key}`)}</p>
                <p style={{color: '#4b5563', fontSize: '10px', fontFamily: 'monospace', margin: 0}}>{t('after_photo', {decade: item.decade})}</p>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* ---------- Carrousel plein ecran ---------- */}
      {current && (
        <div
          onClick={close}
          style={{position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(5,5,6,0.96)', display: 'flex', flexDirection: 'column'}}
        >
          {/* Fermeture, toujours accessible en haut a droite */}
          <button
            onClick={(e) => { e.stopPropagation(); close() }}
            aria-label="Fermer"
            style={{position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: '#e63946', border: 'none', color: 'white', cursor: 'pointer', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0}}
          >
            <X size={20} />
          </button>

          {/* Image, contrainte a la hauteur disponible */}
          <div style={{flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '56px 16px 12px', position: 'relative'}}>
            <button
              className="cwb-rec-arrow"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Précédent"
              style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,11,0.75)', border: '1px solid #374151', color: '#d1d5db', cursor: 'pointer', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0}}
            >
              <ChevronLeft size={22} />
            </button>

            <img
              src={`/reconstructions/${current.file}`}
              alt={t(`items.${current.key}`)}
              onClick={(e) => e.stopPropagation()}
              style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', border: '1px solid #1f2937'}}
            />

            <button
              className="cwb-rec-arrow"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Suivant"
              style={{position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,11,0.75)', border: '1px solid #374151', color: '#d1d5db', cursor: 'pointer', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0}}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Legende + bandeau de vignettes */}
          <div onClick={(e) => e.stopPropagation()} style={{flexShrink: 0, borderTop: '1px solid #1f2937', background: 'rgba(10,10,11,0.9)', padding: '14px 16px 16px'}}>
            <div style={{maxWidth: '1100px', margin: '0 auto'}}>
              <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: '12px', flexWrap: 'wrap'}}>
                <div>
                  <p style={{color: 'white', fontSize: '15px', fontWeight: 'bold', margin: '0 0 3px 0'}}>{t(`items.${current.key}`)}</p>
                  <p style={{color: '#6b7280', fontSize: '11px', fontFamily: 'monospace', margin: 0}}>
                    {t('ai_badge')} · {t('after_photo', {decade: current.decade})}
                  </p>
                </div>
                <span style={{color: '#4b5563', fontSize: '11px', fontFamily: 'monospace', whiteSpace: 'nowrap'}}>
                  {(openIndex ?? 0) + 1} / {items.length}
                </span>
              </div>

              <div className="cwb-rec-strip" style={{display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px'}}>
                {items.map((item, i) => (
                  <button
                    key={item.key}
                    onClick={() => setOpenIndex(i)}
                    aria-label={t(`items.${item.key}`)}
                    style={{flexShrink: 0, padding: 0, cursor: 'pointer', background: 'none', lineHeight: 0,
                            border: i === openIndex ? '2px solid #e63946' : '1px solid #374151',
                            opacity: i === openIndex ? 1 : 0.5}}
                  >
                    <img src={`/reconstructions/${item.file}`} alt="" style={{width: '62px', height: '62px', objectFit: 'cover', display: 'block'}} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}