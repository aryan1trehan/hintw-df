'use client'

export default function BentoFeatures() {
  return (
    <section>
      {/* ── MOBILE: dark bg, 2x2 grid with VISIBLE text ── */}
      <div className="md:hidden bg-[#111] px-5 py-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40 mb-4">Why Choose Us</p>
        <div className="grid grid-cols-2 gap-[10px]">
          {[
            { title: 'Real data, not guesswork', desc: 'Every campaign is data-driven and optimised for results' },
            { title: 'Unveiled Metrics', desc: 'Total visibility into your marketing investments' },
            { title: 'Top industry experience', desc: '15+ years of proven expertise across industries' },
            { title: 'Client-first approach', desc: 'Your goals become our KPIs — always' },
          ].map((p, i) => (
            <div key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] px-3 py-4">
              <h3 className="text-[12px] font-bold text-white mb-[6px] leading-[1.3]">{p.title}</h3>
              <p className="text-[10px] text-white/50 leading-[1.5]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: original layout ── */}
      <div className="hidden md:block py-20 md:py-24 bg-black">
        <div className="container mx-auto px-12 lg:px-16">
          <div className="text-center mb-14">
            <span className="text-white/50 text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-serif font-light">Built Different. By Design.</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 min-h-[400px]">
            {[
              { title: 'Real data, not guesswork', subtitle: 'Every campaign is data-driven and optimised for results' },
              { title: 'Unveiled Metrics', subtitle: 'Total visibility into your marketing investments' },
              { title: 'Top industry experience', subtitle: '15+ years of proven expertise across industries' },
              { title: 'Client-first approach', subtitle: 'Your goals become our KPIs — always' },
            ].map((item, i) => (
              <div key={i} className="bg-black p-8 md:p-10 flex flex-col justify-between group hover:bg-white transition-all duration-300">
                <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-black/20 mb-6 flex items-center justify-center">
                  <span className="text-white/40 group-hover:text-black/40 text-xs font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-white group-hover:text-black font-semibold text-base mb-2 transition-colors duration-300">{item.title}</h3>
                  <p className="text-white/50 group-hover:text-black/60 text-sm leading-relaxed transition-colors duration-300">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
