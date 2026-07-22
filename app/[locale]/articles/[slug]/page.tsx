import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Info, Headphones, Clock } from 'lucide-react'
import ReadingProgress from '@/components/ui/ReadingProgress'

/** Les articles n'existent qu'en francais pour le moment. */
const SLUGS = ['origins','coup','terror','spearhead','zealous','economy','security','traffic','republic'] as const

/** Episode audio correspondant a chaque article. */
const AUDIO: Record<string, string> = {
  origins: 'cwb-pod-01.mp3',
  coup: 'cwb-pod-02.mp3',
  terror: 'cwb-pod-03.mp3',
  spearhead: 'cwb-pod-04.mp3',
  zealous: 'cwb-pod-05.mp3',
  economy: 'cwb-pod-06.mp3',
  security: 'cwb-pod-07.mp3',
  traffic: 'cwb-pod-08.mp3',
  republic: 'cwb-pod-09.mp3',
}

const READING: Record<string, string> = {
  fr: 'min de lecture', en: 'min read', bg: 'мин. четене',
  de: 'Min. Lesezeit', es: 'min de lectura', ru: 'мин чтения',
  tr: 'dk okuma', ar: 'دقيقة قراءة', ja: '分で読めます', zh: '分钟阅读',
}

const MORE: Record<string, string> = {
  fr: 'Autres articles', en: 'More articles', bg: 'Други статии',
  de: 'Weitere Artikel', es: 'Otros artículos', ru: 'Другие статьи',
  tr: 'Diğer makaleler', ar: 'مقالات أخرى', ja: 'ほかの記事', zh: '其他文章',
}

const LISTEN: Record<string, string> = {
  fr: "Écouter cet épisode", en: "Listen to this episode", bg: "Чуй този епизод",
  de: "Diese Folge anhören", es: "Escuchar este episodio", ru: "Слушать выпуск",
  tr: "Bu bölümü dinle", ar: "استمع إلى هذه الحلقة", ja: "このエピソードを聴く", zh: "收听本集",
}

export function generateStaticParams() {
  return SLUGS.map(slug => ({ slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!SLUGS.includes(slug as typeof SLUGS[number])) notFound()

  const file = path.join(process.cwd(), 'content', 'articles', `${slug}.md`)
  if (!fs.existsSync(file)) notFound()
  const markdown = fs.readFileSync(file, 'utf8')

  // On coupe apres le chapeau en italique, pour glisser le lecteur juste en dessous.
  const cut = markdown.indexOf('\n\n', markdown.indexOf('*Article compagnon'))
  const intro = cut > 0 ? markdown.slice(0, cut) : markdown
  const body = cut > 0 ? markdown.slice(cut) : ''

  const words = markdown.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))

  // Les autres articles, dans l'ordre, en repartant au debut apres le dernier.
  const idx = SLUGS.indexOf(slug as typeof SLUGS[number])
  const others = [...SLUGS.slice(idx + 1), ...SLUGS.slice(0, idx)].map(s2 => {
    const f = path.join(process.cwd(), 'content', 'articles', `${s2}.md`)
    const first = fs.existsSync(f)
      ? fs.readFileSync(f, 'utf8').split('\n').find(l => l.startsWith('# '))
      : null
    return { slug: s2, title: first ? first.replace(/^#\s*/, '').trim() : s2, n: SLUGS.indexOf(s2) + 1 }
  })

  const isFrench = locale === 'fr'

  return (
    <main style={{background: '#0a0a0b', minHeight: '100vh', width: '100%'}}>
      <ReadingProgress />
      <style>{`
        .cwb-article { color: #d1d5db; font-size: 16px; line-height: 1.8; }
        .cwb-article h1 { color: #fff; font-size: clamp(1.9rem, 4.5vw, 2.8rem); font-weight: 700; line-height: 1.2; margin: 0 0 8px; }
        .cwb-article h2 { color: #fff; font-size: 22px; font-weight: 700; margin: 48px 0 16px; padding-top: 20px; border-top: 1px solid #1f2937; }
        .cwb-article h3 { color: #e63946; font-size: 16px; font-weight: 700; margin: 32px 0 12px; }
        .cwb-article p { margin: 0 0 20px; }
        .cwb-article strong { color: #fff; font-weight: 600; }
        .cwb-article em { color: #9ca3af; }
        .cwb-article a { color: #e63946; }
        .cwb-article hr { border: none; border-top: 1px solid #1f2937; margin: 48px 0 24px; }
        .cwb-article hr + p { color: #6b7280; font-size: 13px; font-style: italic; }
        .cwb-article table { width: 100%; border-collapse: collapse; margin: 0 0 28px; font-size: 14px; }
        .cwb-article th { text-align: left; color: #e63946; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; padding: 10px 12px; border-bottom: 1px solid #374151; font-weight: 700; }
        .cwb-article td { padding: 10px 12px; border-bottom: 1px solid #1f2937; color: #9ca3af; vertical-align: top; }
        .cwb-article ul, .cwb-article ol { margin: 0 0 20px; padding-left: 22px; }
        .cwb-article li { margin-bottom: 8px; }
        .cwb-article blockquote { border-left: 3px solid #e63946; padding-left: 18px; margin: 0 0 24px; color: #9ca3af; font-style: italic; }
        .cwb-more-strip { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 10px; scroll-snap-type: x mandatory; }
        .cwb-more-strip::-webkit-scrollbar { height: 6px; }
        .cwb-more-strip::-webkit-scrollbar-thumb { background: #374151; }
        .cwb-more-strip::-webkit-scrollbar-track { background: transparent; }
        .cwb-more-card { flex: 0 0 232px; scroll-snap-align: start; border: 1px solid #1f2937; background: rgba(17,17,20,0.8); padding: 18px; text-decoration: none; transition: border-color 0.25s, background 0.25s; }
        .cwb-more-card:hover { border-color: rgba(230,57,70,0.5); background: rgba(230,57,70,0.05); }
        @media (max-width: 640px) {
          .cwb-more-card { flex: 0 0 200px; }
          .cwb-article { font-size: 15px; }
          .cwb-article table { display: block; overflow-x: auto; }
        }
      `}</style>

      <div style={{position: 'relative', width: '100%', maxWidth: '760px', margin: '0 auto', padding: '112px 24px 96px'}}>

        <a
          href={`/${locale}#media`}
          style={{display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', marginBottom: '40px'}}
        >
          <ArrowLeft size={14} />
          Cold War Bulgaria
        </a>

        {!isFrench && (
          <div style={{marginBottom: '32px', padding: '16px 18px', border: '1px solid rgba(230,57,70,0.3)', borderLeft: '3px solid #e63946', background: 'rgba(230,57,70,0.04)', display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
            <Info size={16} style={{color: '#e63946', flexShrink: 0, marginTop: '2px'}} />
            <p style={{color: '#9ca3af', fontSize: '13px', lineHeight: '1.6', margin: 0}}>
              This article is currently available in French only.
            </p>
          </div>
        )}

        <article className="cwb-article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro}</ReactMarkdown>
        </article>

        <div style={{display: 'flex', alignItems: 'center', gap: '7px', margin: '0 0 20px'}}>
          <Clock size={13} style={{color: '#4b5563'}} />
          <span style={{color: '#4b5563', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
            {minutes} {READING[locale] ?? READING.en}
          </span>
        </div>

        {/* Lecteur, propose comme alternative a la lecture. Aucune lecture automatique. */}
        <div style={{margin: '8px 0 40px', padding: '18px 20px', border: '1px solid #1f2937', background: 'rgba(17,17,20,0.8)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px'}}>
            <Headphones size={15} style={{color: '#e63946'}} />
            <span style={{color: '#9ca3af', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
              {LISTEN[locale] ?? LISTEN.en}
            </span>
          </div>
          <audio controls preload="none" src={`/podcasts/${AUDIO[slug]}`} style={{width: '100%', height: '36px', display: 'block'}} />
        </div>

        <article className="cwb-article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </article>

        {/* Autres articles, defilement horizontal */}
        <div style={{marginTop: '64px', paddingTop: '32px', borderTop: '1px solid #1f2937'}}>
          <h2 style={{color: '#e63946', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 20px'}}>
            {MORE[locale] ?? MORE.en}
          </h2>
          <div className="cwb-more-strip">
            {others.map(o => (
              <a
                key={o.slug}
                href={`/${locale}/articles/${o.slug}`}
                className="cwb-more-card"
              >
                <span style={{color: '#374151', fontSize: '17px', fontFamily: 'monospace', fontWeight: 700, display: 'block', marginBottom: '10px'}}>
                  {String(o.n).padStart(2, '0')}
                </span>
                <span style={{color: '#d1d5db', fontSize: '14px', fontWeight: 600, lineHeight: '1.4', display: 'block'}}>
                  {o.title}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}