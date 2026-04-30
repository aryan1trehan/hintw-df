'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const PALETTES: Record<string, string[]> = {
  mono: ['#cccccc', '#888888', '#ffffff', '#555555'],
}

const rng = (a: number, b: number) => a + Math.random() * (b - a)
const NUM_RIBBONS = 6
const ribbons = Array.from({ length: NUM_RIBBONS }, (_, i) => ({
  baseY:    0.15 + (i / NUM_RIBBONS) * 0.7,
  width:    rng(0.12, 0.28),
  freq1:    rng(0.08, 0.20),
  freq2:    rng(0.12, 0.28),
  freq3:    rng(0.05, 0.15),
  amp1:     rng(0.06, 0.18),
  amp2:     rng(0.03, 0.10),
  amp3:     rng(0.02, 0.07),
  phase1:   rng(0, Math.PI * 2),
  phase2:   rng(0, Math.PI * 2),
  phase3:   rng(0, Math.PI * 2),
  xOff:     rng(0, Math.PI * 2),
  palIdx:   i % 4,
  alpha:    rng(0.13, 0.22),
  segments: 120,
}))

type Ribbon = typeof ribbons[0]
const cfg = { intensity: 0.85, speed: 3.0, scale: 1.1 }

function liquidY(r: Ribbon, nx: number, t: number) {
  return r.baseY
    + Math.sin(nx * 2.1 + t * r.freq1 * cfg.speed + r.phase1) * r.amp1
    + Math.sin(nx * 4.3 + t * r.freq2 * cfg.speed + r.phase2) * r.amp2
    + Math.sin(nx * 7.7 + t * r.freq3 * cfg.speed + r.phase3) * r.amp3
}

function liquidW(r: Ribbon, nx: number, t: number) {
  return r.width * (0.6 + 0.4 * Math.abs(Math.sin(nx * 3.1 + t * r.freq2 * cfg.speed * 0.7 + r.xOff)))
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const start = performance.now()
    let raf: number

    function frame(now: number) {
      if (!ctx || !canvas) return
      const t = (now - start) / 1000
      const W = canvas.width, H = canvas.height
      const pal = PALETTES.mono

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, W, H)

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      for (const r of ribbons) {
        const col = pal[r.palIdx]
        const segs = r.segments
        const topPts: [number, number][] = []
        const botPts: [number, number][] = []

        for (let s = 0; s <= segs; s++) {
          const nx = s / segs
          const cx = nx * W
          const cy = liquidY(r, nx / cfg.scale, t) * H
          const hw = liquidW(r, nx / cfg.scale, t) * H * 0.5 * (1 / cfg.scale)
          topPts.push([cx, cy - hw])
          botPts.push([cx, cy + hw])
        }

        ctx.beginPath()
        ctx.moveTo(topPts[0][0], topPts[0][1])
        for (let s = 1; s <= segs; s++) {
          const [x0, y0] = topPts[s - 1], [x1, y1] = topPts[s]
          ctx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
        }
        ctx.lineTo(botPts[segs][0], botPts[segs][1])
        for (let s = segs - 1; s >= 0; s--) {
          const [x0, y0] = botPts[s + 1], [x1, y1] = botPts[s]
          ctx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
        }
        ctx.closePath()

        const midY = liquidY(r, 0.5 / cfg.scale, t) * H
        const hw = liquidW(r, 0.5 / cfg.scale, t) * H * 0.5 * (1 / cfg.scale)
        const grad = ctx.createLinearGradient(0, midY - hw, 0, midY + hw)
        const a = Math.round(r.alpha * cfg.intensity * 255).toString(16).padStart(2, '0')
        const amid = Math.round(r.alpha * cfg.intensity * 0.55 * 255).toString(16).padStart(2, '0')
        grad.addColorStop(0,   col + '00')
        grad.addColorStop(0.3, col + amid)
        grad.addColorStop(0.5, col + a)
        grad.addColorStop(0.7, col + amid)
        grad.addColorStop(1,   col + '00')
        ctx.fillStyle = grad
        ctx.fill()
      }

      const cgx = W * 0.5, cgy = H * 0.5
      const cgrad = ctx.createRadialGradient(cgx, cgy, 0, cgx, cgy, W * 0.5)
      cgrad.addColorStop(0, pal[0] + Math.round(0.06 * cfg.intensity * 255).toString(16).padStart(2, '0'))
      cgrad.addColorStop(1, pal[0] + '00')
      ctx.fillStyle = cgrad
      ctx.fillRect(0, 0, W, H)

      ctx.restore()

      const vig = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, W*0.88)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.88)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    setTimeout(() => { if (canvas) canvas.style.opacity = '1' }, 80)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-[100dvh] min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 pt-28 pb-24 sm:pt-32 sm:pb-28 md:py-32" style={{ background: '#000' }}>

      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0, transition:'opacity 1.5s ease' }} />

      <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, backgroundSize:'200px', opacity:0.5, pointerEvents:'none' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mb-8">
          <span className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] px-1">
            Elite Marketing &amp; Growth Partner
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-6 leading-[1.1] sm:leading-tight text-white px-1">
          Crafting brands that<br />stand above the noise
        </h1>
        <div className="h-px w-16 bg-white/20 mx-auto mb-8" />
        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 sm:mb-12 px-1">
          We engineer scalable growth for brands that demand authority, not just visibility.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none mx-auto">
          <Link href="/clientele" className="bg-white text-black px-8 sm:px-10 py-3.5 sm:py-4 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-center" style={{ backgroundColor:'#ffffff', color:'#000000' }}>
            View Portfolio
          </Link>
          <Link href="/services" className="border-2 border-white text-white px-8 sm:px-10 py-3.5 sm:py-4 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-center" style={{ backgroundColor:'#000000', color:'#ffffff', borderColor:'#ffffff' }}>
            Our Services
          </Link>
        </div>
      </div>

    </section>
  )
}
