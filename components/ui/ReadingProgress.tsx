'use client'
import { useEffect, useState } from 'react'

/** Fine barre de progression, calee en haut de l'ecran pendant la lecture. */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'transparent', zIndex: 60, pointerEvents: 'none'}}>
      <div style={{height: '100%', width: `${pct}%`, background: '#e63946', transition: 'width 0.1s linear'}} />
    </div>
  )
}
