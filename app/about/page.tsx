import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* ── SECTION 1: HERO — BLACK ── */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-black flex items-center justify-center min-h-[70vh]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-white/40 text-xs font-semibold uppercase tracking-[0.35em] mb-6 block">
            About Enhanccee
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight">
            Engineering Growth Through<br />
            <em className="not-italic text-white/60">Intelligent Craft</em>
          </h1>
          <div className="h-px w-16 bg-white/20 mx-auto mb-8" />
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Enhanccee is a strategy, design, and growth studio for brands that refuse to be average. We combine rigorous thinking, sharp creative, and performance discipline to build brands that compound in value over time.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: OUR STORY — WHITE ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-black/40 text-xs uppercase tracking-[0.3em] mb-4 block">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-6">What We Stand For</h2>
            <div className="h-px w-12 bg-black/20 mb-6" />
            <div className="space-y-4 text-black/70 leading-relaxed">
              <p>We believe durable brands are engineered, not improvised. Every engagement starts with clarity — on your market, your customer, and the outcomes that actually matter. From there, we design systems: of identity, of experience, of acquisition and retention.</p>
              <p>Our work blends editorial-level storytelling, product-level craft, and performance marketing rigour. Strategy lives in every layout, every word, and every campaign decision.</p>
            </div>
          </div>
          <div>
            <span className="text-black/40 text-xs uppercase tracking-[0.3em] mb-4 block">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-6">How We Work</h2>
            <div className="h-px w-12 bg-black/20 mb-6" />
            <div className="space-y-4 text-black/70 leading-relaxed">
              <p>Enhanccee operates as an embedded partner, not a rotating vendor. We work with a limited number of brands at a time so senior talent stays on the work, from first principles through execution.</p>
              <p>Our team is intentionally small, multidisciplinary, and remote-first — bringing together strategists, designers, engineers, and performance specialists around a single, shared architecture for your brand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE STANDARD — BLACK ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4 block">Our Principles</span>
            <h3 className="text-3xl md:text-4xl font-semibold text-white">The Enhanccee Standard</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {[
              { title: 'Precision', desc: 'We sweat the structure — of messaging, of funnels, of interfaces — because small details shift big outcomes.' },
              { title: 'Partnership', desc: 'We work with founders and teams who value long-term brand building over short spikes in attention.' },
              { title: 'Performance', desc: 'Every idea is held to a simple standard: does it move the metrics that matter for your business?' },
            ].map((item, i) => (
              <div key={i} className="bg-black p-10 group hover:bg-white/5 transition-all duration-300">
                <h4 className="text-white text-sm font-semibold uppercase tracking-[0.2em] mb-4">{item.title}</h4>
                <div className="h-px w-8 bg-white/20 mb-4 group-hover:w-16 transition-all duration-300" />
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: CTA — WHITE ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-black/40 text-xs uppercase tracking-[0.3em] mb-6 block">Work With Us</span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-6">Ready to build something enduring?</h2>
          <div className="h-px w-16 bg-black/20 mx-auto mb-10" />
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-black text-white px-12 py-5 font-semibold text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          >
            Speak to Enhanccee
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

