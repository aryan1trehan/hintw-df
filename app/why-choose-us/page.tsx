'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
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

export default function WhyChooseUsPage() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        a.border-white:hover {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }
        .why-card {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .why-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, #ffffff, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .why-card:hover::before {
          transform: scaleX(1);
        }
        .why-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,.03) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .why-card:hover::after {
          opacity: 1;
        }
        @media (hover: hover) {
          .why-card:hover {
            transform: translateY(-8px);
          }
        }
        @media (max-width: 767px) {
          .why-card:hover {
            transform: none;
          }
        }
        .why-number {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(2.25rem, 9vw, 8rem);
          font-weight: 200;
          line-height: 1;
          color: rgba(255, 255, 255, 0.08);
          position: absolute;
          top: clamp(-0.35rem, -0.5vw, -1rem);
          right: clamp(0.35rem, 2vw, 1rem);
          transition: color 0.5s;
          pointer-events: none;
          max-width: 45%;
          text-align: right;
          overflow: hidden;
        }
        @media (min-width: 480px) {
          .why-number {
            font-size: clamp(2.75rem, 11vw, 8rem);
            max-width: 50%;
          }
        }
        @media (min-width: 768px) {
          .why-number {
            font-size: clamp(3.25rem, 14vw, 8rem);
            max-width: 55%;
          }
        }
        .why-card:hover .why-number {
          color: rgba(255, 255, 255, 0.15);
        }
        .why-img-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: clamp(200px, 42vw, 300px);
          min-height: 180px;
        }
        @media (min-width: 768px) {
          .why-img-wrapper {
            height: 300px;
          }
        }
        .why-img-wrapper--thumb {
          height: clamp(140px, 38vw, 200px) !important;
          min-height: 140px !important;
          max-height: 200px;
        }
        @media (min-width: 640px) {
          .why-img-wrapper--thumb {
            width: 8rem !important;
            height: 8rem !important;
            min-height: 8rem !important;
            max-height: none;
          }
        }
        /* Smaller on phones — pairs with image + title row (e.g. “Selective Partnership”) */
        .why-number--compact {
          font-size: clamp(1.65rem, 6.5vw, 6rem) !important;
          top: 0 !important;
          right: 0.4rem !important;
          max-width: 38% !important;
        }
        @media (min-width: 480px) {
          .why-number--compact {
            font-size: clamp(2rem, 8vw, 6rem) !important;
            max-width: 42% !important;
          }
        }
        @media (min-width: 640px) {
          .why-number--compact {
            font-size: clamp(2.35rem, 9vw, 6rem) !important;
            max-width: 45% !important;
          }
        }
        @media (min-width: 768px) {
          .why-number--compact {
            font-size: clamp(2.75rem, 11vw, 6rem) !important;
            top: -0.25rem !important;
            max-width: 50% !important;
          }
        }
        .why-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease, filter 0.6s;
          filter: brightness(0.4) saturate(0.6);
        }
        .why-card:hover .why-img-wrapper img {
          transform: scale(1.1);
          filter: brightness(0.5) saturate(0.7);
        }
        .why-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
        }
      `}</style>

      <Header />

      <main className="min-h-screen bg-black text-white overflow-x-hidden pt-20 sm:pt-24">
        
        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[100dvh] min-h-[90vh] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 pt-28 pb-24 sm:pt-32 sm:pb-28 md:py-32 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
              animation: 'pulse 8s ease-in-out infinite'
            }} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center px-1">
            <FadeIn delay={100}>
              <span className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 block px-2">
                The Enhanccee Difference
              </span>
            </FadeIn>
            <FadeIn delay={200}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light mb-6 sm:mb-8 leading-[1.08] sm:leading-tight text-white px-1">
                Why Choose<br />
                <em className="not-italic text-white/70">Enhanccee?</em>
              </h1>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6 sm:mb-10" />
            </FadeIn>
            <FadeIn delay={400}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-2">
                We don&apos;t just deliver services. We engineer systems that compound value over time — 
                building brands that outlast trends and drive measurable business impact.
              </p>
            </FadeIn>
            <FadeIn delay={500}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none mx-auto">
                <Link
                  href="/contact"
                  className="bg-white text-black px-8 sm:px-10 py-3.5 sm:py-4 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-center"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                >
                  Start Your Journey
                </Link>
                <Link
                  href="/services"
                  className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3.5 sm:py-4 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-center"
                  style={{ 
                    borderColor: '#ffffff', 
                    color: '#ffffff', 
                    WebkitTextFillColor: '#ffffff'
                  }}
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
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              })
            }}
            className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Scroll down"
          >
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </section>

        {/* ── SECTION 1: THE STANDARD ── */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12 sm:mb-16 md:mb-20 px-1">
                <span className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 block">
                  Our Foundation
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 sm:mb-6 text-white leading-tight">
                  The Enhanccee<br />
                  <em className="not-italic text-white/70">Standard</em>
                </h2>
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
              <FadeIn delay={100}>
                <div className="why-img-wrapper rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&fit=crop"
                    alt="Team collaboration and strategy"
                    loading="lazy"
                  />
                  <div className="why-img-overlay" />
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="space-y-5 sm:space-y-6">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white mb-4 sm:mb-6 leading-tight">
                    Precision Meets<br />
                    <span className="text-white/70">Performance</span>
                  </h3>
                  <div className="space-y-3 sm:space-y-4 text-white/70 leading-relaxed">
                    <p className="text-base sm:text-lg">
                      The difference between ranking and relevance is <span className="text-white font-semibold">intention</span>.
                      We don&apos;t optimize for algorithms alone; we optimize for <span className="text-white font-semibold">business impact</span>.
                    </p>
                    <p className="text-base sm:text-lg">
                      At Enhanccee, excellence isn&apos;t a service — it&apos;s a <span className="text-white font-semibold">signature experience</span>.
                      Every engagement is built on clarity, strategy, and execution that compounds over time.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  number: '01',
                  title: 'Strategic Clarity',
                  description: 'Every project begins with deep understanding — of your market, your customer, and the outcomes that actually matter.',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fit=crop'
                },
                {
                  number: '02',
                  title: 'Systematic Execution',
                  description: 'We build interconnected systems, not isolated campaigns. Every component works together to create compounding value.',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop'
                },
                {
                  number: '03',
                  title: 'Measurable Impact',
                  description: 'Data-driven decisions meet creative excellence. We track what matters and optimize for real business results.',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop'
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 150}>
                  <div className="why-card bg-black border border-white/10 p-5 sm:p-6 md:p-8 rounded-lg group">
                    <div className="why-number">{item.number}</div>
                    <div className="why-img-wrapper rounded-lg mb-4 sm:mb-6">
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <div className="why-img-overlay" />
                    </div>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-serif font-light text-white mb-3 sm:mb-4 group-hover:text-white transition-colors pr-2">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2: OUR APPROACH ── */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-black relative">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12 sm:mb-16 md:mb-20 px-1">
                <span className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 block">
                  How We Work
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 sm:mb-6 text-white leading-tight">
                  Partnership, Not<br />
                  <em className="not-italic text-white/70">Vendor Rotation</em>
                </h2>
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
              <FadeIn delay={100}>
                <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                  <div className="space-y-5 sm:space-y-6">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-lg sm:text-xl font-light group-hover:border-white/40 transition-colors">
                        1
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-serif font-light text-white mb-2 sm:mb-3">Deep Discovery</h3>
                        <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                          We begin by understanding your business, your market position, and your long-term vision. 
                          No assumptions. Only clarity.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-lg sm:text-xl font-light group-hover:border-white/40 transition-colors">
                        2
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-serif font-light text-white mb-2 sm:mb-3">Strategic Architecture</h3>
                        <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                          We design systems that work together — from brand identity through acquisition, 
                          retention, and expansion. Every piece connects.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-lg sm:text-xl font-light group-hover:border-white/40 transition-colors">
                        3
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-serif font-light text-white mb-2 sm:mb-3">Continuous Optimization</h3>
                        <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                          We measure, learn, and iterate. Your brand evolves based on real data and real results, 
                          not guesswork.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="why-img-wrapper rounded-lg overflow-hidden order-1 lg:order-2">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&fit=crop"
                    alt="Strategic planning and execution"
                    loading="lazy"
                  />
                  <div className="why-img-overlay" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: WHAT SETS US APART ── */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-black relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <FadeIn>
              <div className="text-center mb-12 sm:mb-16 md:mb-20 px-1">
                <span className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 block">
                  What Sets Us Apart
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 sm:mb-6 text-white leading-tight">
                  Built for<br />
                  <em className="not-italic text-white/70">Long-Term Success</em>
                </h2>
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-px bg-transparent sm:bg-white/10 mb-10 sm:mb-16 rounded-lg sm:rounded-none overflow-hidden border border-white/10 sm:border-0">
              {[
                {
                  title: 'Selective Partnership',
                  description: 'We work with a limited number of brands at a time. This ensures senior talent stays on your work, from strategy through execution.',
                  icon: '✓',
                  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop'
                },
                {
                  title: 'Multidisciplinary Team',
                  description: 'Our team brings together strategists, designers, engineers, and performance specialists — all working as one unified intelligence.',
                  icon: '◆',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fit=crop'
                },
                {
                  title: 'Results That Compound',
                  description: 'We build systems that get stronger over time. Every campaign, every piece of content, every design decision serves your long-term growth.',
                  icon: '★',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop'
                },
                {
                  title: 'Transparent Communication',
                  description: 'You&apos;ll always know where your brand stands. We provide clear reporting, regular check-ins, and honest assessments of what&apos;s working.',
                  icon: '●',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop'
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="why-card bg-black p-5 sm:p-8 md:p-10 group border border-white/10 sm:border-0 rounded-lg sm:rounded-none">
                    <div className="why-number why-number--compact">{String(i + 1).padStart(2, '0')}</div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div className="why-img-wrapper why-img-wrapper--thumb rounded-lg flex-shrink-0 w-full max-w-[220px] sm:max-w-none sm:w-32 mx-auto sm:mx-0">
                        <img src={item.image} alt={item.title} loading="lazy" />
                        <div className="why-img-overlay" />
                      </div>
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <div className="text-3xl sm:text-4xl text-white/10 mb-3 sm:mb-4 group-hover:text-white/20 transition-colors">{item.icon}</div>
                        <h3 className="text-xl sm:text-2xl font-serif font-light text-white mb-2 sm:mb-3 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: CTA ── */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-black relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
              animation: 'pulse 10s ease-in-out infinite'
            }} />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10 px-1">
            <FadeIn>
              <span className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 block">
                Ready to Begin?
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 sm:mb-8 text-white leading-tight">
                Let&apos;s Build Something<br />
                <em className="not-italic text-white/70">Extraordinary</em>
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6 sm:mb-10" />
            </FadeIn>
            <FadeIn delay={300}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
                We partner with founders, leaders, and visionaries who value long-term brand building 
                over short-term spikes. If that sounds like you, let&apos;s start the conversation.
              </p>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none mx-auto">
                <Link
                  href="/contact"
                  className="bg-white text-black px-8 sm:px-12 py-4 sm:py-5 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-center"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                >
                  Start a Project
                </Link>
                <Link
                  href="/clientele"
                  className="bg-transparent border-2 border-white text-white px-8 sm:px-12 py-4 sm:py-5 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-center"
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
                  View Our Work
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

