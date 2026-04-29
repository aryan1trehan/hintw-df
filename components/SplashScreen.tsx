'use client'

import { useEffect, useRef } from 'react'

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const giantERef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const cornersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Lock scroll while splash is showing
    document.body.style.overflow = 'hidden'

    function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

    function tween(from: number, to: number, dur: number, ease: string, cb: (v: number) => void) {
      return new Promise<void>(resolve => {
        const s = performance.now()
        const e = (t: number) => {
          if (ease === 'out3') return 1 - Math.pow(1 - t, 3)
          if (ease === 'out4') return 1 - Math.pow(1 - t, 4)
          if (ease === 'out5') return 1 - Math.pow(1 - t, 5)
          if (ease === 'in2') return t * t
          if (ease === 'in3') return t * t * t
          return t
        }
        const tick = (now: number) => {
          const p = Math.min((now - s) / dur, 1)
          cb(from + (to - from) * e(p))
          if (p < 1) requestAnimationFrame(tick); else resolve()
        }
        requestAnimationFrame(tick)
      })
    }

    function clamp(min: number, vwN: number, max: number) {
      return Math.min(Math.max(window.innerWidth * vwN / 100, min), max)
    }

    async function run() {
      const giantE = giantERef.current
      const brand = brandRef.current
      const line = lineRef.current
      const tagline = taglineRef.current
      const sub = subtitleRef.current
      const corners = cornersRef.current

      if (!giantE || !brand || !line || !tagline || !sub) return

      // Reset all to hidden
      giantE.style.opacity = '0'
      brand.style.opacity = '0'
      brand.style.transform = 'scale(1)'
      line.style.width = '0'
      tagline.style.opacity = '0'
      sub.style.opacity = '0'
      corners.forEach(c => { if (c) c.style.opacity = '0' })

      await delay(300)

      // Giant E fades in
      await tween(0, 1, 400, 'out3', v => { giantE.style.opacity = String(v) })

      // E scales down, brand name fades in
      await Promise.all([
        tween(1, 0.08, 900, 'out5', v => {
          giantE.style.opacity = String(v * 2 > 1 ? 1 : v * 2)
          giantE.style.transform = `scale(${1 + (1 - v) * 0.5})`
        }),
        (async () => {
          await delay(350)
          await tween(0, 1, 550, 'out4', v => {
            brand.style.opacity = String(v)
            brand.style.transform = `scale(${1 + (1 - v) * 0.04})`
          })
        })(),
      ])

      giantE.style.opacity = '0'
      await delay(120)

      // Line under brand name
      const brandRect = brand.getBoundingClientRect()
      line.style.left = brandRect.left + 'px'
      line.style.top = (brandRect.bottom + clamp(8, 1.5, 14)) + 'px'
      await tween(0, brandRect.width, 500, 'out3', v => { line.style.width = v + 'px' })

      // Tagline and subtitle — use opacity instead of color for crisp rendering
      await Promise.all([
        (async () => {
          const lineRect = line.getBoundingClientRect()
          tagline.style.top = (lineRect.bottom + clamp(12, 2, 20)) + 'px'
          tagline.style.left = '50%'
          tagline.style.transform = 'translateX(-50%)'
          await tween(0, 0.55, 500, 'out3', v => { tagline.style.opacity = String(v) })
        })(),
        (async () => {
          await delay(200)
          const brandRect2 = brand.getBoundingClientRect()
          sub.style.top = (brandRect2.top - clamp(22, 3.5, 36)) + 'px'
          sub.style.left = '50%'
          sub.style.transform = 'translateX(-50%)'
          await tween(0, 0.25, 500, 'out3', v => { sub.style.opacity = String(v) })
        })(),
      ])

      await delay(200)

      // Corner accents
      await Promise.all(corners.map((c, i) => (async () => {
        if (!c) return
        await delay(i * 60)
        await tween(0, 0.4, 400, 'out3', v => { c.style.opacity = String(v) })
      })()))

      await delay(2200)

      // Exit
      await Promise.all([
        tween(1, 0, 500, 'in2', v => { brand.style.opacity = String(v) }),
        tween(brandRect.width, 0, 400, 'in3', v => { line.style.width = v + 'px' }),
        tween(0.4, 0, 400, 'in2', v => { corners.forEach(c => { if (c) c.style.opacity = String(v) }) }),
        tween(0.55, 0, 350, 'in2', v => { tagline.style.opacity = String(v) }),
        tween(0.25, 0, 350, 'in2', v => { sub.style.opacity = String(v) }),
      ])

      await delay(200)
      document.body.style.overflow = ''
      onComplete()
    }

    run()

    return () => { document.body.style.overflow = '' }
  }, [onComplete])

  const cPos = 'clamp(16px, 3vw, 36px)'

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000000', zIndex: 99999,
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Montserrat', sans-serif"
    }}>

      {/* Giant E */}
      <div ref={giantERef} style={{
        position: 'absolute', fontSize: '100vw', fontWeight: 900, color: '#fff',
        lineHeight: 0.75, opacity: 0, transformOrigin: 'center center',
        userSelect: 'none', pointerEvents: 'none', zIndex: 2,
        letterSpacing: '-0.05em', fontFamily: "'Montserrat', sans-serif"
      }}>E</div>

      {/* Brand name */}
      <div ref={brandRef} style={{
        position: 'absolute',
        fontSize: 'clamp(44px, 7.5vw, 108px)',
        fontWeight: 700, letterSpacing: '0.08em', color: '#fff',
        textTransform: 'uppercase', opacity: 0, zIndex: 3, whiteSpace: 'nowrap',
        fontFamily: "'Montserrat', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          fontSize: '1.3em', verticalAlign: 'middle', lineHeight: 0,
          position: 'relative', top: '-0.02em'
        }}>E</span>
        NHANCCEE
      </div>

      {/* Line */}
      <div ref={lineRef} style={{
        position: 'fixed', height: 1, width: 0,
        background: 'rgba(255,255,255,0.3)', zIndex: 3
      }} />

      {/* Tagline — crisp white text with opacity control */}
      <div ref={taglineRef} style={{
        position: 'fixed',
        fontSize: 'clamp(9px, 0.9vw, 13px)',
        fontWeight: 300,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: '#ffffff',
        opacity: 0,
        zIndex: 3,
        whiteSpace: 'nowrap',
        fontFamily: "'Montserrat', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}>
        Elite Marketing &amp; Growth Partner
      </div>

      {/* Subtitle */}
      <div ref={subtitleRef} style={{
        position: 'fixed',
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(12px, 1.2vw, 18px)',
        fontWeight: 300,
        letterSpacing: '0.1em',
        color: '#ffffff',
        opacity: 0,
        zIndex: 3,
        whiteSpace: 'nowrap',
        WebkitFontSmoothing: 'antialiased',
      }}>
        Crafting brands that stand above the noise.
      </div>

      {/* Corners */}
      {[
        { top: cPos, left: cPos },
        { top: cPos, right: cPos },
        { bottom: cPos, left: cPos },
        { bottom: cPos, right: cPos },
      ].map((pos, i) => (
        <div
          key={i}
          ref={el => { if (el) cornersRef.current[i] = el }}
          style={{ position: 'absolute', width: 'clamp(20px,3vw,40px)', height: 'clamp(20px,3vw,40px)', opacity: 0, zIndex: 4, ...pos }}
        >
          <div style={{ position: 'absolute', width: '100%', height: 1, background: 'rgba(255,255,255,0.3)', top: 0, left: 0 }} />
          <div style={{ position: 'absolute', width: 1, height: '100%', background: 'rgba(255,255,255,0.3)', top: 0, left: i === 1 || i === 3 ? 'auto' : 0, right: i === 1 || i === 3 ? 0 : 'auto' }} />
        </div>
      ))}
    </div>
  )
}
