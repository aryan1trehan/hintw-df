'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const WORDS = ['Inspire', 'Flow', 'Move']

export default function StatementSection() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIndex(i => (i + 1) % WORDS.length); setVisible(true) }, 400)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-black border-t border-white/10">

      {/* ── MOBILE ── */}
      <div className="md:hidden px-5 py-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">Project in Mind?</p>
        <h2 className="font-serif text-[1.5rem] text-white font-light mb-6 leading-snug">
          Let&apos;s build something extraordinary together.
        </h2>
        <Link href="/contact" className="block w-full bg-white text-black py-3.5 rounded-lg text-[13px] font-semibold uppercase tracking-[0.12em] mb-8">
          Work With Us →
        </Link>
        <div className="flex justify-center gap-4">
          {['FB', 'TW', 'DR', 'IG'].map((s, i) => (
            <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
              <span className="text-white/30 text-[9px] font-semibold">{s}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex relative min-h-[100dvh] flex-col justify-between px-12 lg:px-16 pt-10 pb-16 overflow-x-hidden">
        <div className="flex-1 flex flex-col justify-center gap-0 max-w-[100vw]">
          <div className="flex items-start justify-between gap-2 w-full">
            <span className="text-white font-sans font-semibold leading-[0.95]" style={{ fontSize:'clamp(2.25rem, min(12vw, 11vh), 10rem)' }}>Design</span>
            <span className="text-white font-sans font-semibold leading-[0.95] text-right" style={{ fontSize:'clamp(2.25rem, min(12vw, 11vh), 10rem)' }}>That</span>
          </div>
          <div className="flex justify-center my-2">
            <span className="text-white font-sans font-semibold leading-[0.95] text-center" style={{ fontSize:'clamp(2.25rem, min(12vw, 11vh), 10rem)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0px)' : 'translateY(12px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
              {WORDS[index]}
            </span>
          </div>
          <div className="flex flex-row items-end justify-between gap-3 w-full">
            <span className="text-white font-sans font-semibold leading-[0.95]" style={{ fontSize:'clamp(2.25rem, min(12vw, 11vh), 10rem)' }}>You</span>
            <Link href="/contact" className="self-center text-center border border-white text-white rounded-full px-8 py-3 text-sm font-light tracking-wide hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap shrink-0">
              Work With Us
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}
