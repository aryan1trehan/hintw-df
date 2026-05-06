'use client'
import { useEffect, useRef, useState } from 'react'

export default function ResultsSection() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (!sectionRef.current || !mounted) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold: 0.1 })
    io.observe(sectionRef.current); return () => io.disconnect()
  }, [mounted])

  const results = [
    { number: '15+', label: 'Years of Experience', icon: '◆' },
    { number: '100+', label: 'Happy Clients', icon: '✦' },
    { number: '15x', label: 'Growth / Month', icon: '●' },
  ]

  return (
    <section ref={sectionRef} className="bg-black">

      {/* ── MOBILE ── */}
      <div className="md:hidden px-5 py-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-2">Results</p>
        <h2 className="font-serif text-[1.4rem] text-white font-light mb-2 leading-snug">Numbers That Speak Louder Than Words</h2>
        <p className="text-[13px] text-white/50 mb-6">Performance is not a promise. It is a pattern.</p>
        <div className="grid grid-cols-3 border border-white/20 rounded-xl overflow-hidden">
          {results.map((r, i) => (
            <div key={i} className={`flex flex-col items-center justify-center py-5 px-2 text-center ${i < 2 ? 'border-r border-white/20' : ''}`}>
              <span className="text-[10px] text-white/30 mb-2">{r.icon}</span>
              <span className="font-serif text-[1.6rem] text-white leading-none mb-1">{r.number}</span>
              <span className="text-[9px] uppercase tracking-wide text-white/40 leading-tight mt-1">{r.label}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-white/25 mt-4 uppercase tracking-wider">Results are not milestones. They are standards.</p>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block pt-24 md:pt-32 pb-12 md:pb-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="container mx-auto px-12 lg:px-16 relative z-10">
          <div className={`text-center mb-16 md:mb-20 ${visible ? 'result-header-visible' : 'result-header-hidden'}`}>
            <span className="text-white/40 text-xs font-semibold uppercase tracking-[0.3em] mb-6 block">Results</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif font-light mb-4">Numbers That Speak Louder Than Words</h2>
            <p className="text-white/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">Performance is not a promise.<br />It is a pattern.</p>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {results.map((result, index) => (
              <div key={index} className={`result-card bg-black border border-white/10 px-8 py-10 text-center hover:border-white/30 group relative flex flex-col items-center justify-center min-h-[200px] ${visible ? 'result-card-visible' : 'result-card-hidden'}`}
                style={{ transitionDelay: visible ? `${index * 150}ms` : '0ms', transition: `opacity 0.8s ease ${index*150}ms, transform 0.8s ease ${index*150}ms, border-color 0.4s` }}>
                <div className="result-icon">{result.icon}</div>
                <div className="result-number text-4xl font-bold mb-3 group-hover:scale-[1.03] transition-transform duration-500">{result.number}</div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-[0.12em] mb-2">{result.label}</h3>
                <div className="h-px w-10 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <span className="text-white/40 text-xs uppercase tracking-widest">Results are not milestones. They are standards.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
