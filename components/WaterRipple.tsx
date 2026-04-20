'use client'

import { useEffect, useRef } from 'react'

const SIM = 256

export default function WaterRipple() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const offscreen = document.createElement('canvas')
    offscreen.width  = SIM
    offscreen.height = SIM
    const octx = offscreen.getContext('2d')!
    const imgData = octx.createImageData(SIM, SIM)

    const ripples: { x: number; y: number; r: number; max: number; alpha: number }[] = []

    let lastX = -1, lastY = -1

    const onMove = (e: MouseEvent) => {
      if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < 20) return
      lastX = e.clientX; lastY = e.clientY
      ripples.push({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        r: 0,
        max: 0.04,
        alpha: 1
      })
    }

    window.addEventListener('mousemove', onMove)

    function uploadFrame() {
      const d = imgData.data

      // Reset to neutral grey (128 = no displacement)
      for (let i = 0; i < SIM * SIM; i++) {
        d[i*4]   = 128
        d[i*4+1] = 128
        d[i*4+2] = 128
        d[i*4+3] = 255
      }

      for (let ri = ripples.length - 1; ri >= 0; ri--) {
        const rp = ripples[ri]
        rp.r     += 0.003
        rp.alpha *= 0.85

        if (rp.alpha < 0.02 || rp.r > rp.max) {
          ripples.splice(ri, 1)
          continue
        }

        const cx        = Math.floor(rp.x * SIM)
        const cy        = Math.floor(rp.y * SIM)
        const rad       = Math.floor(rp.r * SIM)
        const thickness = 20

        for (let dy = -rad - thickness; dy <= rad + thickness; dy++) {
          for (let dx = -rad - thickness; dx <= rad + thickness; dx++) {
            const dist = Math.sqrt(dx*dx + dy*dy)
            const diff = Math.abs(dist - rad)

            if (diff <= thickness) {
              const px = cx + dx
              const py = cy + dy
              if (px < 0 || px >= SIM || py < 0 || py >= SIM) continue
              const i = py * SIM + px

              // inner edge pulls inward, outer edge pushes outward
              // so cursor stays at the visual center of the ripple
              const side = dist < rad ? -1 : 1
              const v = 128 + side * (128 - (diff / thickness) * 128) * rp.alpha
              d[i*4]   = v
              d[i*4+1] = v
              d[i*4+2] = v
            }
          }
        }
      }

      octx.putImageData(imgData, 0, 0)
      const feImg = svgRef.current?.querySelector('#wfe') as SVGFEImageElement | null
      if (feImg) feImg.setAttribute('href', offscreen.toDataURL())
    }

    let id: number
    const loop = () => { id = requestAnimationFrame(loop); uploadFrame() }
    loop()

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <svg
        ref={svgRef}
        style={{ position: 'absolute', width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="wave-filter" x="0%" y="0%" width="100%" height="100%"
                  colorInterpolationFilters="sRGB">
            <feImage id="wfe" result="wmap"
                     preserveAspectRatio="none" />
            <feDisplacementMap
              in="SourceGraphic" in2="wmap"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9990,
          backdropFilter: 'url(#wave-filter)',
          WebkitBackdropFilter: 'url(#wave-filter)',
        }}
      />
    </>
  )
}