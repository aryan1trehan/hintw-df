import Link from 'next/link'

export default function LongGameSection() {
  return (
    <section className="bg-black border-t border-white/10">

      {/* ── MOBILE ── */}
      <div className="md:hidden px-5 py-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">Our Philosophy</p>
        <h2 className="font-serif text-[1.4rem] text-white font-light mb-2 leading-snug">Built for the Long Game</h2>
        <p className="text-[13px] font-semibold text-white/60 mb-2">Through strategy, design, and performance.</p>
        <p className="text-[13px] text-white/40 leading-relaxed mb-6">
          We craft brands with presence, precision, and authority. Our methodology combines strategic foresight, behavioral psychology, and market dynamics to create brands that appreciate in value over time. We&apos;re not here to make noise — we&apos;re here to build empires.
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {[
            { title: 'Strategic Foresight', desc: 'We map market trajectories before they become obvious' },
            { title: 'Behavioral Mastery', desc: 'Psychology-driven campaigns that resonate at a deeper level' },
            { title: 'Legacy Building', desc: 'Creating brands that compound in value over decades' },
          ].map((c, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-4 py-4">
              <h3 className="text-[13px] font-semibold text-white/80 mb-1">{c.title}</h3>
              <p className="text-[11px] text-white/40 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/why-choose-us" className="block w-full text-center bg-white text-black py-3 rounded-lg text-[12px] font-semibold uppercase tracking-[0.12em]">
          Explore Our Methodology →
        </Link>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block py-20 md:py-24">
        <div className="container mx-auto px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="text-white/60 text-xs uppercase tracking-[0.25em] font-medium">Our Philosophy</span>
            </div>
            <div className="grid grid-cols-2 gap-14 lg:gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">Built for the Long Game</h2>
                <p className="text-xl font-semibold text-white/70 mb-6">Through strategy, design, and performance</p>
                <p className="text-white/50 text-base leading-relaxed mb-10">
                  We craft brands with presence, precision, and authority. Our methodology combines strategic foresight, behavioral psychology, and market dynamics to create brands that appreciate in value over time. We&apos;re not here to make noise—we&apos;re here to build empires.
                </p>
                <Link href="/why-choose-us" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/90">
                  Explore Our Methodology &#8594;
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Strategic Foresight', desc: 'We map market trajectories before they become obvious', d: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
                  { title: 'Behavioral Mastery', desc: 'Psychology-driven campaigns that resonate at a deeper level', d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                  { title: 'Legacy Building', desc: 'Creating brands that compound in value over decades', d: 'M13 10V3L4 14h7v7l9-11h-7z' },
                ].map((card, i) => (
                  <div key={i} className="flex items-start gap-5 border border-white/10 rounded-xl px-6 py-5 hover:border-white/20 transition-colors duration-300">
                    <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={card.d} /></svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-1">{card.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
