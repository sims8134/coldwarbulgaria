'use client'
import { Download } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

/** Langues dans lesquelles « Les Secrets de la Colline de Reduta » existe. */
const REDUTA_LANGS = ['fr', 'bg', 'en'] as const
type RedutaLang = (typeof REDUTA_LANGS)[number]

export default function PublicationsSection() {
  const t = useTranslations('publications')
  const locale = useLocale()

  // Repli sur l'anglais pour les sept autres langues du site.
  const redutaLang: RedutaLang = (REDUTA_LANGS as readonly string[]).includes(locale)
    ? (locale as RedutaLang)
    : 'en'

  const publications = [
    {
      id: 'catalogue',
      titleKey: 'pub1_title',
      descKey: 'pub1_desc',
      typeKey: 'pub1_type',
      year: '2025',
      pages: 280,
      cover: '/publications/cover-catalogue.webp',
      file: '/publications/collection-catalogue.pdf',
      langNote: t('pub1_langs'),
    },
    {
      id: 'reduta',
      titleKey: 'pub2_title',
      descKey: 'pub2_desc',
      typeKey: 'pub2_type',
      year: '2025',
      pages: 45,
      cover: `/publications/cover-reduta-${redutaLang}.jpg`,
      file: `/publications/reduta-${redutaLang}.pdf`,
      langNote: t('pub2_langs'),
    },
  ]

  return (
    <section id="publications" style={{position: 'relative', padding: '128px 0', background: '#050505', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(ellipse at 0% 100%, #e63946 0%, transparent 60%)'}} />

      <div style={{position: 'relative', zIndex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>

        <div style={{marginBottom: '64px'}}>
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

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px'}}>
          {publications.map((pub) => (
            <div key={pub.id} style={{display: 'flex', gap: '24px', background: 'rgba(17,17,20,0.8)', border: '1px solid #1f2937', padding: '24px', flexWrap: 'wrap'}}>

              <div style={{flexShrink: 0, width: '150px'}}>
                <img
                  src={pub.cover}
                  alt={t(pub.titleKey)}
                  style={{width: '100%', height: 'auto', display: 'block', border: '1px solid #1f2937'}}
                />
              </div>

              <div style={{flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'inline-flex', alignSelf: 'flex-start', background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.3)', padding: '3px 9px', marginBottom: '12px'}}>
                  <span style={{color: '#e63946', fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                    {t(pub.typeKey)}
                  </span>
                </div>

                <h3 style={{color: 'white', fontSize: '17px', fontWeight: 'bold', margin: '0 0 10px 0', lineHeight: '1.4'}}>
                  {t(pub.titleKey)}
                </h3>

                <p style={{color: '#9ca3af', fontSize: '13px', lineHeight: '1.65', margin: '0 0 16px 0'}}>
                  {t(pub.descKey)}
                </p>

                <p style={{color: '#4b5563', fontSize: '11px', fontFamily: 'monospace', margin: '0 0 20px 0', lineHeight: '1.7'}}>
                  {pub.year} · {t('pages', {count: pub.pages})}<br/>
                  {pub.langNote}
                </p>

                <a
                  href={pub.file}
                  download
                  style={{marginTop: 'auto', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e63946', color: '#e63946', padding: '10px 20px', fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', whiteSpace: 'nowrap'}}
                >
                  <Download size={14} />
                  {t('download')}
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}