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
  const displaySize = 'clamp(2.25rem, min(12vw, 11vh), 10rem)'

  return (
    <section>
      {/* ── MOBILE: dark bg, centered CTA, social dots, exactly like wireframe ── */}
      <div className="md:hidden bg-[#111] px-5 py-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#555] mb-[10px]">Project in Mind?</p>
        <h2 className="font-serif text-[22px] leading-[1.2] text-white font-normal mb-[10px]">
          Let&apos;s build something extraordinary together.
        </h2>
        <button className="w-full py-3 mt-2 rounded-lg text-[12px] font-semibold bg-white text-[#111] border-[1.5px] border-white mb-5">
          <Link href="/contact">Work With Us →</Link>
        </button>
        <div className="flex justify-center gap-4">
          {['#','#','#','#'].map((href, i) => (
            <a key={i} href={href} className="w-[30px] h-[30px] rounded-full bg-[#1c1c1c] border border-[#2a2a2a]" />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: animated "Design That Flow You" ── */}
      <div className="hidden md:flex relative min-h-[100dvh] flex-col justify-between bg-black px-12 lg:px-16 pt-10 pb-16 overflow-x-hidden">
        <div className="flex-1 flex flex-col justify-center gap-0 max-w-[100vw]">
          <div className="flex items-start justify-between gap-2 w-full">
            <span className="text-white font-sans font-semibold leading-[0.95] shrink min-w-0" style={{ fontSize: displaySize }}>Design</span>
            <span className="text-white font-sans font-semibold leading-[0.95] shrink-0 text-right" style={{ fontSize: displaySize }}>That</span>
          </div>
          <div className="flex justify-center my-2 px-1">
            <span className="text-white font-sans font-semibold leading-[0.95] text-center" style={{ fontSize: displaySize, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0px)' : 'translateY(12px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
              {WORDS[index]}
            </span>
          </div>
          <div className="flex flex-row items-end justify-between gap-3 w-full">
            <span className="text-white font-sans font-semibold leading-[0.95]" style={{ fontSize: displaySize }}>You</span>
            <Link href="/contact" className="self-center text-center border border-white text-white rounded-full px-8 py-3 text-sm font-light tracking-wide hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap shrink-0">
              Work With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
