'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const WORDS = ['Inspire', 'Flow', 'Move']

export default function StatementSection() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setVisible(false)
      setTimeout(() => {
        // swap word then fade in
        setIndex(i => (i + 1) % WORDS.length)
        setVisible(true)
      }, 400) // 400ms fade out, then swap
    }, 2200) // change every 2.2s

    return () => clearInterval(interval)
  }, [])

  const displaySize = 'clamp(2.25rem, min(12vw, 11vh), 10rem)'

  return (
    <section className="relative min-h-[100dvh] min-h-screen bg-black flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-16 pt-8 pb-12 sm:pt-10 sm:pb-16 overflow-x-hidden">

      {/* Main text */}
      <div className="flex-1 flex flex-col justify-center gap-2 sm:gap-0 max-w-[100vw]">

        {/* Row 1 — left + right */}
        <div className="flex items-start justify-between gap-2 w-full">
          <span
            className="text-white font-sans font-semibold leading-[0.95] shrink min-w-0"
            style={{ fontSize: displaySize }}
          >
            Design
          </span>
          <span
            className="text-white font-sans font-semibold leading-[0.95] shrink-0 text-right"
            style={{ fontSize: displaySize }}
          >
            That
          </span>
        </div>

        {/* Row 2 — center animated word */}
        <div className="flex justify-center my-1 sm:my-2 px-1">
          <span
            className="text-white font-sans font-semibold leading-[0.95] text-center max-w-full transition-all duration-600"
            style={{
              fontSize: displaySize,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0px)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {WORDS[index]}
          </span>
        </div>

        {/* Row 3 — left + right CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-3 w-full">
          <span
            className="text-white font-sans font-semibold leading-[0.95] self-start sm:self-auto"
            style={{ fontSize: displaySize }}
          >
            You
          </span>
          <Link
            href="/contact"
            className="self-stretch sm:self-center text-center border border-white text-white rounded-full px-6 sm:px-8 py-3 text-sm font-light tracking-wide hover:bg-white hover:text-black transition-all duration-300 sm:whitespace-nowrap sm:shrink-0"
          >
            Work With Us
          </Link>
        </div>

      </div>

    </section>
  )
}

// ---

// **How the animation works:**
// ```
// every 2200ms:
//   1. set visible = false  → word fades out + slides down (400ms)
//   2. after 400ms: swap to next word, set visible = true → fades in + slides up