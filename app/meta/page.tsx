'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: `opacity .85s ease ${delay}ms, transform .85s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

function Divider({ mb = '6rem' }: { mb?: string }) {
  return (
    <div style={{ width: '100%', height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)', position: 'relative', marginBottom: mb }}>
      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '.5rem', background: '#000', padding: '0 1rem' }}>◆</span>
    </div>
  )
}

function FAQItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [h, setH] = useState(0)

  useEffect(() => {
    if (!contentRef.current) return
    const el = contentRef.current
    const measure = () => setH(el.scrollHeight || 0)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '1.8rem 0',
          background: 'transparent',
          border: 0,
          color: '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.1rem,1.8vw,1.7rem)', fontWeight: 400, lineHeight: 1.25 }}>
          {q}
        </span>
        <span
          aria-hidden="true"
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,.18)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,.7)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform .35s ease, border-color .35s ease, color .35s ease',
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? h + 24 : 0,
          overflow: 'hidden',
          transition: 'max-height .55s cubic-bezier(.77,0,.175,1)',
        }}
      >
        <div ref={contentRef} style={{ padding: '0 0 1.8rem 0' }}>
          <p style={{ margin: 0, fontSize: '.95rem', lineHeight: 1.9, color: 'rgba(255,255,255,.55)', fontWeight: 200 }}>
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function MetaPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const canvasEl = canvas
    const ctx = canvasEl.getContext('2d')!
    let t = 0, raf = 0
    function resize() {
      canvasEl.width = canvasEl.parentElement?.offsetWidth || window.innerWidth
      canvasEl.height = canvasEl.parentElement?.offsetHeight || window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    function draw() {
      const w = canvasEl.width, h = canvasEl.height
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < 4; i++) {
        const x = w * .5 + Math.sin(t * .0004 + i * 1.5) * w * .25
        const y = h * .5 + Math.cos(t * .0003 + i * 2.1) * h * .25
        const r = w * .3 + Math.sin(t * .0005 + i) * w * .08
        const a = .035 + Math.sin(t * .0006 + i) * .015
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, i % 2 === 0 ? `rgba(255,255,255,${a * 0.4})` : `rgba(180,180,180,${a * 0.2})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      }
      t++; raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return
    const dot = document.getElementById('meta-dot')
    const ring = document.getElementById('meta-ring')
    if (!dot || !ring) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)
    let active = true
    ;(function loop() {
      if (!active) return
      rx += (mx - rx) * .12; ry += (my - ry) * .12
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      requestAnimationFrame(loop)
    })()
    return () => { active = false; document.removeEventListener('mousemove', onMove) }
  }, [])

  const deliverables = [
    { num: 'I', tag: 'Strategy', title: 'Meta Ads Strategy\nArchitecture', body: 'Comprehensive advertising strategy built around audience intelligence, funnel design, creative positioning, and conversion pathways engineered for scalable performance.' },
    { num: 'II', tag: 'Targeting', title: 'Audience & Targeting\nIntelligence', body: 'Advanced audience research across interests, behaviours, lookalike modelling, and custom audiences to ensure every campaign reaches the highest-value prospects.' },
    { num: 'III', tag: 'Creative', title: 'Creative Strategy &\nAd Development', body: 'Performance-driven ad concepts, copy frameworks, and visual direction designed to capture attention, communicate value, and drive measurable conversions.' },
    { num: 'IV', tag: 'Funnels', title: 'Conversion Funnel\nOptimization', body: 'Strategic campaign structures across awareness, consideration, and conversion stages — ensuring consistent user movement through the customer journey.' },
    { num: 'V', tag: 'Tracking', title: 'Meta Pixel &\nConversion Tracking', body: 'Accurate data tracking through Meta Pixel, event optimisation, and conversion APIs to capture actionable insights and improve campaign performance.' },
    { num: 'VI', tag: 'Retargeting', title: 'Retargeting & Customer\nJourney Ads', body: 'Precision retargeting campaigns that re-engage high-intent users, reduce drop-offs, and maximise conversion potential.' },
  ]

  const frameworkSteps = [
    { n: '01', t: 'Audit', d: 'Comprehensive audit of ad accounts, creative performance, audience data, and conversion tracking to identify optimisation opportunities.' },
    { n: '02', t: 'Strategy', d: 'A data-driven Meta Ads roadmap aligned with business goals, growth targets, and audience acquisition strategy.' },
    { n: '03', t: 'Execution', d: 'Precision campaign deployment across creatives, targeting, and budget allocation to maximise performance and conversion potential.' },
    { n: '04', t: 'Optimization', d: 'Continuous campaign refinement based on real-time performance data, audience signals, and conversion insights.' },
    { n: '05', t: 'Scale', d: 'Sustained ad performance, expanded audience reach, and profitable customer acquisition designed for long-term growth.' },
  ]

  const faqs = [
    { q: 'How quickly can we expect Meta Ads results?', a: 'Meta Ads can begin generating data and early conversions quickly, while optimisation phases improve efficiency and scaling over time.' },
    { q: 'What makes Enhanccee different from other advertising agencies?', a: 'Our Meta Ads strategy combines audience intelligence, creative precision, funnel optimisation, and performance analytics focused on measurable business growth.' },
    { q: 'Do you work with luxury and enterprise brands?', a: 'Yes. Our advertising frameworks are designed for brands focused on authority, premium positioning, and scalable customer acquisition.' },
    { q: 'What regions do you serve?', a: 'We deliver Meta Ads services across India, UAE, Australia, and the US, supporting both regional and global advertising strategies.' },
    { q: 'Do you manage creatives and strategy together?', a: 'Yes. Our team integrates creative strategy with campaign management to ensure advertising performance aligns with brand positioning and conversion goals.' },
  ]

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .meta-grid-2 { grid-template-columns: 1fr !important; }
          .meta-grid-3 { grid-template-columns: 1fr !important; }
          .meta-split-left { min-height: 260px !important; height: 260px !important; }
          .meta-split-right { padding: 3rem 1.8rem !important; }
          .meta-pad-section { padding: 8vh 5vw !important; }
          .meta-pad-hero { padding: 0 5vw !important; }
          .meta-stat-box { padding: 2rem 1rem !important; }
          .meta-cta-box { padding: 4rem 1.5rem !important; }
          .meta-faq-wrap { padding: 0 1.2rem !important; }
          .meta-diff-cell { padding: 2rem 1.5rem !important; border-right: none !important; }
          .meta-deliverable-cell { padding: 2.5rem 1.8rem !important; }
          .meta-why-h2 { font-size: clamp(2.2rem,8vw,3.5rem) !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .meta-grid-2 { grid-template-columns: 1fr !important; }
          .meta-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .meta-split-left { min-height: 320px !important; height: 320px !important; }
          .meta-split-right { padding: 4rem 3rem !important; }
          .meta-pad-section { padding: 10vh 6vw !important; }
          .meta-cta-box { padding: 6rem 3rem !important; }
        }
        @media (max-width: 767px) {
          #meta-dot, #meta-ring { display: none !important; }
          .meta-cursor-none { cursor: auto !important; }
          .meta-cursor-none * { cursor: auto !important; }
          .meta-cursor-none button { cursor: pointer !important; }
          .meta-cursor-none a { cursor: pointer !important; }
        }
      `}</style>

      <div id="meta-dot" style={{ position:'fixed', width:10, height:10, background:'#ffffff', borderRadius:'50%', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', mixBlendMode:'difference' }}/>
      <div id="meta-ring" style={{ position:'fixed', width:36, height:36, border:'1px solid rgba(255,255,255,.3)', borderRadius:'50%', pointerEvents:'none', zIndex:9998, transform:'translate(-50%,-50%)' }}/>

      <Header />
      <main style={{ backgroundColor:'#000000', color:'#ffffff', fontFamily:'var(--font-montserrat)', cursor:'none' }} className="meta-cursor-none">

        {/* HERO */}
        <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:'0 6vw' }} className="meta-pad-hero">
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.4 }}/>
          <div style={{ position:'absolute', inset:0, zIndex:1, background:'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(25,25,25,.45) 0%, transparent 70%), #000000' }}/>
          <div style={{ position:'relative', zIndex:3, textAlign:'center', maxWidth:1280 }}>
            <p style={{ fontWeight:200, fontSize:'clamp(.65rem,1.2vw,.8rem)', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', opacity:0, animation:'meta-fadeUp 1s ease .3s forwards', marginBottom:'2rem' }}>Enhanccee — Meta Ads Architecture</p>
            <h1 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,6rem)', lineHeight:1, color:'#ffffff', opacity:0, animation:'meta-fadeUp 1.1s ease .6s forwards', marginBottom:'1.2rem' }}>
              Where growth is<br /><em style={{ fontStyle:'normal', fontWeight:300, color:'#ffffff' }}>engineered</em><br />not guessed.
            </h1>
            <p style={{ fontWeight:200, fontSize:'clamp(.9rem,1.5vw,1.1rem)', lineHeight:1.8, color:'rgba(255,255,255,.55)', maxWidth:780, margin:'0 auto 3.5rem', opacity:0, animation:'meta-fadeUp 1.1s ease .9s forwards' }}>
              Meta Ads isn't about spending more—it's about precision, performance marketing, and scalable revenue growth. At Enhanccee, we build data-driven Meta Ads systems that optimize customer acquisition, improve ROAS, and drive measurable brand growth.
            </p>
            <div style={{ opacity:0, animation:'meta-fadeUp 1.1s ease 1.1s forwards', display:'inline-flex', gap:'1.5rem', alignItems:'center', flexWrap:'wrap', justifyContent:'center' }}>
              <Link href="/contact" className="meta-btn-white"><span>Book Your Strategy Session</span></Link>
              <Link href="/clientele" className="meta-btn-ghost">Start Your Growth</Link>
            </div>
          </div>
        </section>
 
        {/* BANNER IMAGE */}
        <FadeIn>
          <div className="meta-img-banner" style={{ height:'clamp(220px,58vh,700px)' }}>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80&fit=crop&crop=center" alt="Meta ads analytics" loading="lazy"/>
          </div>
        </FadeIn>

        {/* THE STANDARD */}
        <section style={{ padding:'14vh 8vw' }} className="meta-pad-section">
          <Divider mb="6rem"/>
          <FadeIn><p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:'4rem' }}>The Enhanccee Standard</p></FadeIn>
          <FadeIn><h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.4rem,5.5vw,6rem)', lineHeight:1.1, color:'#ffffff', marginBottom:'5rem' }}>The difference between<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>spending and scaling</em><br />is strategy.</h2></FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem 8rem' }} className="meta-grid-2">
            {[
              { n:'01', strong:'Strategy over spend.', body:'Brands partner with Enhanccee because they want more than ads — they want profitable growth, measurable performance, and scalable acquisition systems.' },
              { n:'02', strong:'Infrastructure mindset.', body:'While most treat Meta advertising as campaign management, we build it as infrastructure for scale and long-term performance.' },
              { n:'03', strong:'Intentional systems.', body:'No random creatives. No algorithm chasing. Only intentional Meta Ads performance systems for measurable growth.' },
              { n:'04', strong:'Business impact focus.', body:'We don\'t run ads for impressions alone. We engineer Meta Ads campaigns for measurable business impact.' },
            ].map((b, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div>
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'5rem', color:'rgba(255,255,255,.15)', lineHeight:1, marginBottom:'1.5rem', fontWeight:300 }}>{b.n}</div>
                  <p style={{ fontSize:'clamp(1rem,1.4vw,1.15rem)', lineHeight:1.9, color:'rgba(255,255,255,.55)', fontWeight:200 }}>
                    <strong style={{ color:'#ffffff', fontWeight:400 }}>{b.strong}</strong> {b.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* DELIVERABLES */}
        <section style={{ padding:'14vh 8vw' }} className="meta-pad-section">
          <Divider mb="8rem"/>
          <div style={{ textAlign:'center', marginBottom:'8rem' }}>
            <FadeIn><span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:'1.5rem' }}>What We Deliver</span></FadeIn>
            <FadeIn delay={100}><h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>Focused. Strategic.<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Built for scale.</em></h2></FadeIn>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.08)' }} className="meta-grid-2">
            {deliverables.map((d, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ background:'#0a0a0a', padding:'4rem 3rem', position:'relative' }} className="meta-deliverable-cell">
                  <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'4.2rem', color:'rgba(255,255,255,.15)', position:'absolute', top:'1rem', right:'1.5rem' }}>{d.num}</span>
                  <p style={{ fontSize:'.65rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.2rem' }}>{d.tag}</p>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.5rem,2.6vw,2.4rem)', color:'#ffffff', marginBottom:'1rem', whiteSpace:'pre-line' }}>{d.title}</h3>
                  <p style={{ fontSize:'.9rem', lineHeight:1.85, color:'rgba(255,255,255,.55)', fontWeight:200 }}>{d.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FRAMEWORK SPLIT */}
        <FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.08)', minHeight:500 }} className="meta-grid-2">
            <div style={{ position:'relative', overflow:'hidden' }} className="meta-split-left">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&fit=crop" alt="Framework process" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.5)', display:'block' }}/>
            </div>
            <div style={{ background:'#0a0a0a', padding:'6rem 5rem', display:'flex', flexDirection:'column', justifyContent:'center' }} className="meta-split-right">
              <span style={{ fontSize:'.68rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.8rem' }}>Strategic Framework</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,3.5vw,4rem)', lineHeight:1.15, color:'#ffffff', marginBottom:'2rem' }}>The path to<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>scalable growth</em></h2>
              <p style={{ fontSize:'.95rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', fontWeight:200, marginBottom:'2.3rem' }}>Performance advertising requires discipline, data intelligence, and structured execution.</p>
              <div style={{ display:'grid', gap:'1.2rem' }}>
                {frameworkSteps.map((s) => (
                  <div key={s.n} style={{ display:'grid', gridTemplateColumns:'3.2rem 1fr', gap:'1.2rem', alignItems:'start' }}>
                    <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'2.2rem', color:'rgba(255,255,255,.18)' }}>{s.n}</span>
                    <div>
                      <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.35rem', color:'#fff' }}>{s.t}</span>
                      <p style={{ margin:'.25rem 0 0', fontSize:'.9rem', lineHeight:1.8, color:'rgba(255,255,255,.55)', fontWeight:200 }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* WHY BRANDS */}
        <section style={{ padding:'16vh 8vw', background:'#050505' }} className="meta-pad-section">
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'3rem', textAlign:'center' }}>Why Brands Choose Enhanccee</p>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.8rem,6vw,6.5rem)', lineHeight:1.05, textAlign:'center', color:'#ffffff', marginBottom:'3rem' }} className="meta-why-h2">Built for performance.<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Measured by growth.</em></h2>
            <p style={{ fontSize:'clamp(1.05rem,1.6vw,1.25rem)', lineHeight:1.9, color:'rgba(255,255,255,.5)', textAlign:'center', fontWeight:200, marginBottom:'4rem' }}>
              The difference between spending and scaling is strategy. Brands partner with Enhanccee because they want more than ads — they want profitable growth, measurable performance, and scalable acquisition systems.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(255,255,255,.08)' }} className="meta-grid-3">
              {[{ w:'5×', s:'ROAS Improvement' }, { w:'40%', s:'Lower CPA' }, { w:'10+', s:'Years Experience' }].map((x, i) => (
                <div key={i} style={{ background:'#000', padding:'3rem 2rem', textAlign:'center' }} className="meta-stat-box">
                  <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.6rem', color:'#fff', display:'block' }}>{x.w}</span>
                  <span style={{ fontSize:'.75rem', letterSpacing:'.15em', color:'rgba(255,255,255,.4)', textTransform:'uppercase' }}>{x.s}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign:'center', marginTop:'2.5rem', color:'rgba(255,255,255,.75)', fontSize:'1.2rem' }}>
              "We don't run ads for impressions alone."<br />We engineer Meta Ads campaigns for measurable business impact.
            </p>
          </div>
        </section>

        {/* WHAT MAKES US DIFFERENT */}
        <section style={{ padding:'14vh 8vw' }} className="meta-pad-section">
          <Divider mb="6rem"/>
          <div style={{ textAlign:'center', marginBottom:'4rem' }}>
            <span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', display:'block', marginBottom:'1.5rem' }}>What Makes Us Different</span>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>Strategic.<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>ROI-first.</em></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', maxWidth:1200, margin:'6rem auto 0' }} className="meta-grid-2">
            {[
              { vs:'Strategic Intelligence', h:'Performance specialists', p:'Performance marketing specialists with 10+ years scaling brands through high-impact Meta Ads strategies.' },
              { vs:'Creative Precision', h:'Stop-scroll creative', p:'Ad creatives engineered to stop scroll behaviour, communicate authority, and drive conversions.' },
              { vs:'Data-Driven Execution', h:'Decisions guided by signals', p:'Every campaign decision guided by analytics, audience signals, and conversion performance.' },
              { vs:'ROI-Focused', h:'Reporting that matters', p:'Transparent reporting centred on revenue growth, customer acquisition cost, and return on ad spend.' },
            ].map((d, i) => (
              <div key={i} style={{ padding:'3rem', borderBottom:'1px solid rgba(255,255,255,.06)', borderRight:i % 2 === 0 ? '1px solid rgba(255,255,255,.06)' : 'none' }} className="meta-diff-cell">
                <span style={{ fontSize:'.7rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'1rem', display:'block' }}>{d.vs}</span>
                <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.6rem,2.5vw,2.5rem)', color:'#ffffff', marginBottom:'1rem' }}>{d.h}</h3>
                <p style={{ fontSize:'.88rem', lineHeight:1.85, color:'rgba(255,255,255,.5)', fontWeight:200 }}>{d.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RECOGNITION SPLIT */}
        <FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.08)', minHeight:500 }} className="meta-grid-2">
            <div style={{ background:'#0a0a0a', padding:'6rem 5rem', display:'flex', flexDirection:'column', justifyContent:'center' }} className="meta-split-right">
              <span style={{ fontSize:'.68rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.8rem' }}>Recognition</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,3.5vw,4rem)', lineHeight:1.15, color:'#ffffff', marginBottom:'2rem' }}>
                Recognised among<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>emerging performance marketing partners</em>
              </h2>
              <p style={{ fontSize:'.95rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', fontWeight:200, marginBottom:'3rem' }}>
                Recognised among emerging performance marketing partners delivering Meta Ads services across India, UAE, Australia, and the US — helping brands scale both locally and globally.
              </p>
              <Link href="/contact" className="meta-btn-white"><span>Start Your Growth</span></Link>
            </div>
            <div style={{ position:'relative', overflow:'hidden' }} className="meta-split-left">
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80&fit=crop" alt="Recognition" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.38) saturate(.5)', display:'block' }}/>
            </div>
          </div>
        </FadeIn>

        {/* FAQ */}
        <section style={{ padding:'14vh 8vw' }} className="meta-pad-section">
          <Divider mb="6rem"/>
          <div style={{ textAlign:'center', marginBottom:'4rem' }}>
            <span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', display:'block', marginBottom:'1.5rem' }}>Frequently Asked Questions</span>
          </div>
          <div style={{ maxWidth: 1100, margin: '0 auto', background: 'rgba(10,10,10,.6)', border: '1px solid rgba(255,255,255,.08)', padding: '0 3rem' }} className="meta-faq-wrap">
            {faqs.map((item, idx) => (
              <FAQItem key={idx} q={item.q} a={item.a} open={openFAQ === idx} onToggle={() => setOpenFAQ((v) => (v === idx ? null : idx))} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:'14vh 8vw' }} className="meta-pad-section">
          <div style={{ background:'rgba(12,12,12,.9)', border:'1px solid rgba(255,255,255,.1)', backdropFilter:'blur(20px)', padding:'8rem 6rem', textAlign:'center', position:'relative', overflow:'hidden', maxWidth:1100, margin:'0 auto' }} className="meta-cta-box">
            <span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'2rem', display:'block' }}>Ready to scale?</span>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.1, marginBottom:'2rem' }}>
              Let's Engineer Your<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Meta Ads Strategy</em>
            </h2>
            <p style={{ fontSize:'clamp(.9rem,1.3vw,1.1rem)', color:'rgba(255,255,255,.45)', fontWeight:200, lineHeight:1.8, maxWidth:720, margin:'0 auto 4rem' }}>
              Partner with Enhanccee to build Meta Ads campaigns that drive conversions, strengthen brand perception, and scale customer acquisition profitably.
            </p>
            <Link href="/contact" className="meta-btn-white"><span>Book Your Strategy Session</span></Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}