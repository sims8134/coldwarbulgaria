'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'

const localeLabels = [
  { code: 'en', label: 'EN' },
  { code: 'bg', label: 'BG' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'tr', label: 'TR'},
  { code: 'es', label: 'ES' },
  { code: 'ru', label: 'RU' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本' },
  { code: 'ar', label: 'AR' },
]

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Ordre identique a celui des sections dans app/[locale]/page.tsx
  const navLinks = [
    { href: '#timeline', label: t('timeline') },
    { href: '#map', label: t('map') },
    { href: '#themes', label: t('themes') },
    { href: '#museum', label: t('museum') },
    { href: '#reconstructions', label: t('reconstructions') },
    { href: '#media', label: t('media') },
    { href: '#publications', label: t('publications') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-800' : 'bg-gray-950/80 backdrop-blur-sm border-b border-gray-800/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <img src="/assets/logo carre blanc.png" alt="Cold War Bulgaria" className="h-10 w-10 rounded-sm" />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">Cold War Bulgaria™</div>
              <div className="text-gray-500 text-xs font-mono uppercase tracking-widest">Online Museum</div>
            </div>
          </Link>

          {/* Nav links */}
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-gray-400 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1">
              {localeLabels.map((loc) => (
                <Link
                  key={loc.code}
                  href={`/${loc.code}`}
                  className={`px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                    locale === loc.code ? 'text-cwb-red' : 'text-gray-600 hover:text-white'
                  }`}
                >
                  {loc.label}
                </Link>
              ))}
            </div>
            <a href="#contribute" className="hidden lg:flex items-center gap-2 border border-cwb-red text-cwb-red hover:bg-cwb-red hover:text-white px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300">
              Contribute
            </a>
            <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-400 hover:text-white">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-gray-950/98 backdrop-blur-lg flex flex-col items-center justify-center gap-6 transition-all duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}
            className="text-2xl font-bold text-white hover:text-cwb-red transition-colors uppercase tracking-widest font-mono">
            {link.label}
          </a>
        ))}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {localeLabels.map((loc) => (
            <Link key={loc.code} href={`/${loc.code}`} onClick={() => setOpen(false)}
              className={`px-3 py-2 text-sm font-mono font-bold uppercase tracking-wider border transition-colors ${
                locale === loc.code ? 'border-cwb-red text-cwb-red' : 'border-gray-700 text-gray-500 hover:text-white'
              }`}>
              {loc.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}