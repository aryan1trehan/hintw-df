'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ─── FADE IN COMPONENT ─── */
function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold: 0.1 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(40px)', transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-12 lg:px-16 py-32 overflow-hidden bg-black">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
            animation: 'pulse 8s ease-in-out infinite'
          }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <FadeIn delay={100}>
            <span className="text-white/40 text-xs font-semibold uppercase tracking-[0.3em] mb-6 block">
              Blog
            </span>
          </FadeIn>
          <FadeIn delay={200}>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-light mb-8 leading-tight text-white">
              Coming<br />
              <em className="not-italic text-white/70">Soon</em>
            </h1>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-10" />
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
              We&apos;re crafting insightful content about branding, design, growth, and digital strategy. 
              Check back soon for articles that will help elevate your brand.
            </p>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-black px-10 py-4 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                style={{ backgroundColor: '#ffffff', color: '#000000' }}
              >
                Get Notified
              </a>
              <a
                href="/services"
                className="bg-transparent border-2 border-white text-white px-10 py-4 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                style={{ borderColor: '#ffffff', color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#000000'
                  ;(e.currentTarget.style as any).webkitTextFillColor = '#000000'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff'
                  ;(e.currentTarget.style as any).webkitTextFillColor = '#ffffff'
                }}
              >
                Explore Services
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PLACEHOLDER CONTENT SECTION ── */}
      <section className="py-32 px-6 md:px-12 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-[0.3em] mb-6 block">
                What to Expect
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 text-white">
                Insights That<br />
                <em className="not-italic text-white/70">Drive Growth</em>
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Brand Strategy',
                description: 'Deep dives into building brands that resonate, differentiate, and drive long-term value.',
              },
              {
                title: 'Digital Growth',
                description: 'Tactical insights on scaling acquisition, retention, and revenue through systematic marketing.',
              },
              {
                title: 'Design & UX',
                description: 'Exploring how exceptional design creates competitive advantages and user experiences that convert.',
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-black border border-white/10 p-8 rounded-lg hover:border-white/20 transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-2xl font-serif font-light text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

