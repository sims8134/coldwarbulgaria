import fs from 'fs'
import path from 'path'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'

const SLUGS = ['origins','coup','terror','spearhead','zealous','economy','security','traffic','republic'] as const

const HEADINGS: Record<string, { title: string; sub: string; notice: string }> = {
  fr: { title: 'Articles', sub: 'Neuf articles sur la Bulgarie de la Guerre froide, compagnons des épisodes du podcast.', notice: '' },
  en: { title: 'Articles', sub: 'Nine articles on Cold War Bulgaria, companions to the podcast episodes.', notice: 'These articles are currently available in French only.' },
  bg: { title: 'Статии', sub: 'Девет статии за България през Студената война, придружаващи епизодите на подкаста.', notice: 'Тези статии засега са достъпни само на френски.' },
  de: { title: 'Artikel', sub: 'Neun Artikel über Bulgarien im Kalten Krieg, begleitend zu den Podcast-Folgen.', notice: 'Diese Artikel sind derzeit nur auf Französisch verfügbar.' },
  es: { title: 'Artículos', sub: 'Nueve artículos sobre la Bulgaria de la Guerra Fría, complemento de los episodios del pódcast.', notice: 'Estos artículos están disponibles por ahora solo en francés.' },
  ru: { title: 'Статьи', sub: 'Девять статей о Болгарии времён холодной войны, дополняющих выпуски подкаста.', notice: 'Эти статьи пока доступны только на французском.' },
  tr: { title: 'Makaleler', sub: 'Soğuk Savaş Bulgaristanı üzerine dokuz makale, podcast bölümlerinin tamamlayıcısı.', notice: 'Bu makaleler şimdilik yalnızca Fransızca mevcuttur.' },
  ar: { title: 'مقالات', sub: 'تسع مقالات عن بلغاريا في الحرب الباردة، مرافقة لحلقات البودكاست.', notice: 'هذه المقالات متاحة حاليًا بالفرنسية فقط.' },
  ja: { title: '記事', sub: '冷戦期ブルガリアをめぐる9本の記事。ポッドキャスト各話の姉妹編。', notice: 'これらの記事は現時点ではフランス語のみです。' },
  zh: { title: '文章', sub: '九篇关于冷战时期保加利亚的文章，与播客各集相配。', notice: '这些文章目前仅提供法语版本。' },
}

/** Premiere ligne de titre du fichier markdown. */
function readTitle(slug: string) {
  const file = path.join(process.cwd(), 'content', 'articles', `${slug}.md`)
  if (!fs.existsSync(file)) return slug
  const first = fs.readFileSync(file, 'utf8').split('\n').find(l => l.startsWith('# '))
  return first ? first.replace(/^#\s*/, '').trim() : slug
}

export default async function ArticlesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const h = HEADINGS[locale] ?? HEADINGS.en
  const items = SLUGS.map((slug, i) => ({ slug, n: i + 1, title: readTitle(slug) }))

  return (
    <main style={{background: '#0a0a0b', minHeight: '100vh', width: '100%'}}>
      <div style={{width: '100%', maxWidth: '860px', margin: '0 auto', padding: '112px 24px 96px'}}>

        <a
          href={`/${locale}#media`}
          style={{display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', marginBottom: '40px'}}
        >
          <ArrowLeft size={14} />
          Cold War Bulgaria
        </a>

        <h1 style={{color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', margin: '0 0 14px'}}>
          {h.title}
        </h1>
        <p style={{color: '#9ca3af', fontSize: '16px', lineHeight: '1.6', margin: '0 0 32px', maxWidth: '560px'}}>
          {h.sub}
        </p>

        {h.notice && (
          <div style={{marginBottom: '32px', padding: '16px 18px', border: '1px solid rgba(230,57,70,0.3)', borderLeft: '3px solid #e63946', background: 'rgba(230,57,70,0.04)', display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
            <Info size={16} style={{color: '#e63946', flexShrink: 0, marginTop: '2px'}} />
            <p style={{color: '#9ca3af', fontSize: '13px', lineHeight: '1.6', margin: 0}}>{h.notice}</p>
          </div>
        )}

        <div style={{display: 'flex', flexDirection: 'column'}}>
          {items.map(({slug, n, title}) => (
            <a
              key={slug}
              href={`/${locale}/articles/${slug}`}
              style={{display: 'flex', alignItems: 'center', gap: '18px', padding: '20px 4px', borderBottom: '1px solid #1f2937', textDecoration: 'none'}}
            >
              <span style={{color: '#374151', fontSize: '18px', fontFamily: 'monospace', fontWeight: 'bold', flexShrink: 0, width: '28px'}}>
                {String(n).padStart(2, '0')}
              </span>
              <span style={{color: '#d1d5db', fontSize: '16px', fontWeight: 600, flex: 1, lineHeight: '1.4'}}>
                {title}
              </span>
              <ArrowRight size={16} style={{color: '#e63946', flexShrink: 0}} />
            </a>
          ))}
        </div>

      </div>
    </main>
  )
}