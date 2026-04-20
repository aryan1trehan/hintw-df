'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ─── SCROLL REVEAL WRAPPER ─── */
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

/* ─── DIVIDER ─── */
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

export default function SEOPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  /* ─── LIQUID CANVAS ─── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let t = 0, raf = 0
    function resize() {
      if (!canvas) return
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    function draw() {
      const w = canvas!.width, h = canvas!.height
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

  /* ─── CURSOR (desktop only via matchMedia) ─── */
  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return
    const dot = document.getElementById('seo-dot')
    const ring = document.getElementById('seo-ring')
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

  return (
    <>
      {/* ─── dangerouslySetInnerHTML fixes the hydration mismatch from quote escaping ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes seo-fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes seo-orbFloat { 0%,100%{transform:translate(0,0)scale(1)} 33%{transform:translate(30px,-20px)scale(1.05)} 66%{transform:translate(-20px,15px)scale(.97)} }
        @keyframes seo-breathe { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        .seo-btn-white { display:inline-block; padding:1rem 2.8rem; border:1px solid rgba(255,255,255,0.6); color:#ffffff; font-size:.8rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; position:relative; overflow:hidden; transition:color .4s; }
        .seo-btn-white::before { content:''; position:absolute; inset:0; background:#ffffff; transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.77,0,.175,1); }
        .seo-btn-white:hover::before { transform:scaleX(1); }
        .seo-btn-white:hover span { color:#000000 !important; }
        .seo-btn-white span { position:relative; z-index:1; }
        .seo-btn-ghost { display:inline-block; padding:1rem 2.8rem; color:rgba(255,255,255,.6); font-size:.8rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(255,255,255,.15); transition:all .4s; }
        .seo-btn-ghost:hover { border-color:rgba(255,255,255,.5); color:#ffffff; }
        .seo-img-banner { width:100%; position:relative; overflow:hidden; display:block; line-height:0; }
        .seo-img-banner img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.4) saturate(.5); transition:transform 8s ease, filter .6s; }
        .seo-img-banner:hover img { transform:scale(1.03); filter:brightness(.5) saturate(.6); }
        .seo-img-banner::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.05) 50%, rgba(0,0,0,.45) 100%); pointer-events:none; }
        .seo-img-caption { position:absolute; bottom:2.5rem; left:3rem; z-index:2; font-size:.68rem; letter-spacing:.3em; text-transform:uppercase; color:rgba(255,255,255,.4); }
        .seo-eco-card { background:#0a0a0a; padding:5rem 4rem; position:relative; overflow:hidden; transition:background .5s; }
        .seo-eco-card:hover { background:#111111; }
        .seo-eco-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(to right, transparent, #ffffff, transparent); opacity:0; transition:opacity .5s; }
        .seo-eco-card:hover::before { opacity:1; }
        .seo-eco-num { font-family:var(--font-cormorant),serif; font-size:7rem; font-weight:300; color:rgba(255,255,255,.15); position:absolute; top:1rem; right:2rem; pointer-events:none; transition:color .5s; }
        .seo-eco-card:hover .seo-eco-num { color:rgba(255,255,255,.25); }
        .seo-tag-item { font-size:.72rem; padding:.3rem .8rem; border:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.45); transition:all .3s; display:inline-block; }
        .seo-eco-card:hover .seo-tag-item { border-color:rgba(255,255,255,.3); color:rgba(255,255,255,.75); }
        .seo-diff-item { padding:4rem; border-bottom:1px solid rgba(255,255,255,.06); border-right:1px solid rgba(255,255,255,.06); position:relative; overflow:hidden; }
        .seo-diff-item:nth-child(even) { border-right:none; }
        .seo-diff-item:nth-last-child(-n+2) { border-bottom:none; }
        .seo-diff-item::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,.02); opacity:0; transition:opacity .4s; }
        .seo-diff-item:hover::after { opacity:1; }
        .seo-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:1; }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 767px) {
          #seo-dot, #seo-ring { display: none !important; }
          .seo-cursor-none { cursor: auto !important; }
          .seo-cursor-none * { cursor: auto !important; }
          .seo-cursor-none button { cursor: pointer !important; }
          .seo-cursor-none a { cursor: pointer !important; }
          .seo-grid-2 { grid-template-columns: 1fr !important; }
          .seo-grid-3 { grid-template-columns: 1fr !important; }
          .seo-grid-trio { grid-template-columns: 1fr !important; }
          .seo-split-img { min-height: 260px !important; height: 260px !important; }
          .seo-split-content { padding: 3rem 1.8rem !important; }
          .seo-pad-section { padding: 8vh 5vw !important; }
          .seo-eco-card { padding: 3rem 1.8rem !important; }
          .seo-diff-item { padding: 2rem 1.5rem !important; border-right: none !important; }
          .seo-diff-item:nth-last-child(-n+2) { border-bottom: 1px solid rgba(255,255,255,.06) !important; }
          .seo-diff-item:last-child { border-bottom: none !important; }
          .seo-stat-box { padding: 2rem 1rem !important; }
          .seo-faq-wrap { padding: 0 1.2rem !important; }
          .seo-cta-box { padding: 4rem 1.5rem !important; }
          .seo-img-caption { left: 1.5rem !important; bottom: 1.5rem !important; }
          .seo-banner-split { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .seo-grid-2 { grid-template-columns: 1fr !important; }
          .seo-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .seo-grid-trio { grid-template-columns: 1fr 1fr !important; }
          .seo-split-img { min-height: 320px !important; height: 320px !important; }
          .seo-split-content { padding: 4rem 3rem !important; }
          .seo-pad-section { padding: 10vh 6vw !important; }
          .seo-cta-box { padding: 6rem 3rem !important; }
          .seo-banner-split { grid-template-columns: 1fr !important; }
        }
      ` }} />

      {/* Cursor — always in DOM, CSS hides on mobile instantly (no hydration flicker) */}
      <div id="seo-dot" style={{ position:'fixed', width:10, height:10, background:'#ffffff', borderRadius:'50%', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', mixBlendMode:'difference' }}/>
      <div id="seo-ring" style={{ position:'fixed', width:36, height:36, border:'1px solid rgba(255,255,255,.3)', borderRadius:'50%', pointerEvents:'none', zIndex:9998, transform:'translate(-50%,-50%)' }}/>

      <Header />

      <main style={{ backgroundColor:'#000000', color:'#ffffff', fontFamily:'var(--font-montserrat)', cursor:'none' }} className="seo-cursor-none">

        {/* ══════════════ HERO ══════════════ */}
        <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:'0 6vw' }}>
          <div className="seo-orb" style={{ width:500, height:500, background:'rgba(35,35,35,.5)', top:-100, left:-150, animation:'seo-orbFloat 12s ease-in-out infinite' }}/>
          <div className="seo-orb" style={{ width:400, height:400, background:'rgba(255,255,255,.04)', bottom:-80, right:-100, animation:'seo-orbFloat 12s ease-in-out infinite', animationDelay:'-6s' }}/>
          <div className="seo-orb" style={{ width:300, height:300, background:'rgba(25,25,25,.5)', top:'50%', right:'10%', animation:'seo-orbFloat 12s ease-in-out infinite', animationDelay:'-3s' }}/>
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.4 }}/>
          <div style={{ position:'absolute', inset:0, zIndex:1, background:'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(25,25,25,.45) 0%, transparent 70%), #000000' }}/>
          <div style={{ position:'absolute', inset:0, opacity:.03, zIndex:2, pointerEvents:'none', backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}/>
          <div style={{ position:'relative', zIndex:3, textAlign:'center', maxWidth:1280 }}>
            <p style={{ fontWeight:200, fontSize:'clamp(.65rem,1.2vw,.8rem)', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', opacity:0, animation:'seo-fadeUp 1s ease .3s forwards', marginBottom:'2rem' }}>
              Enhanccee — Search Engine Optimization
            </p>
            <h1 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,6rem)', lineHeight:1, color:'#ffffff', opacity:0, animation:'seo-fadeUp 1.1s ease .6s forwards', marginBottom:'1.2rem' }}>
              Where visibility is<br /><em style={{ fontStyle:'normal', fontWeight:300, color:'#ffffff' }}>engineered</em><br />not chased.
            </h1>
            <p style={{ fontWeight:200, fontSize:'clamp(.9rem,1.5vw,1.1rem)', lineHeight:1.8, color:'rgba(255,255,255,.55)', maxWidth:650, margin:'0 auto 3.5rem', opacity:0, animation:'seo-fadeUp 1.1s ease .9s forwards' }}>
              We engineer scalable organic growth for brands that demand authority, not just traffic. This is not reactive optimisation. It is strategic visibility architecture. No shortcuts. No recycled playbooks. Only intentional SEO for brands that intend to lead their category.
            </p>
            <div style={{ opacity:0, animation:'seo-fadeUp 1.1s ease 1.1s forwards', display:'inline-flex', gap:'1.5rem', alignItems:'center', flexWrap:'wrap', justifyContent:'center' }}>
              <Link href="/contact" className="seo-btn-white"><span>Book Your Strategy Session</span></Link>
            </div>
          </div>
        </section>

        {/* ══════════════ BANNER 1 ══════════════ */}
        <FadeIn>
          <div className="seo-img-banner" style={{ height:'clamp(220px,58vh,700px)' }}>
            <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1800&q=80&fit=crop&crop=center" alt="Data analytics — search architecture" loading="lazy"/>
            <span className="seo-img-caption">Strategic visibility architecture</span>
          </div>
        </FadeIn>

        {/* ══════════════ PHILOSOPHY ══════════════ */}
        <section style={{ padding:'14vh 8vw' }} className="seo-pad-section">
          <Divider mb="6rem"/>
          <FadeIn>
            <p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:'4rem' }}>The Enhanccee Standard</p>
          </FadeIn>
          <FadeIn>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.4rem,5.5vw,6rem)', lineHeight:1.1, color:'#ffffff', marginBottom:'5rem' }}>
              The difference between<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>ranking and relevance</em><br />is intention.
            </h2>
          </FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem 8rem' }} className="seo-grid-2">
            {[
              { n:'01', strong:'Positioning, not just traffic.', body:'Brands partner with Enhanccee because they want more than visits — they want positioning embedded into their search presence and organic growth that scales without eroding perception.' },
              { n:'02', strong:'Business impact over algorithms.', body:'We don\'t optimise for algorithms alone. We optimise for measurable business expansion — transparent reporting centred on organic growth, conversions, and ROI, not vanity metrics.' },
              { n:'03', strong:'Strategic visibility architecture.', body:'This is not reactive optimisation. It\'s an engineered performance ecosystem where each layer reinforces the next, building search momentum that compounds over time.' },
              { n:'04', strong:'A signature experience.', body:'At Enhanccee, SEO isn\'t a service. It\'s a signature experience designed to turn visibility into authority — and authority into enterprise value.' },
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

        {/* ══════════════ BANNER 2 — SPLIT ══════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.1)' }} className="seo-banner-split">
          <FadeIn>
            <div className="seo-img-banner" style={{ height:'clamp(220px,44vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop" alt="Search analytics and keyword strategy" loading="lazy"/>
              <span className="seo-img-caption">Technical precision</span>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="seo-img-banner" style={{ height:'clamp(220px,44vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80&fit=crop" alt="Content strategy and authority building" loading="lazy"/>
              <span className="seo-img-caption">Authority-driven content</span>
            </div>
          </FadeIn>
        </div>

        {/* ══════════════ ECOSYSTEM ══════════════ */}
        <section style={{ padding:'14vh 8vw' }} className="seo-pad-section">
          <Divider mb="8rem"/>
          <div style={{ textAlign:'center', marginBottom:'8rem' }}>
            <FadeIn><span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:'1.5rem' }}>What We Deliver</span></FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>
                Focused. Strategic.<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Built for scale.</em>
              </h2>
            </FadeIn>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.08)' }} className="seo-grid-2">
            {[
              { num:'I', tag:'Authority-Driven Content SEO', title:'Intent-led content\nsystems', body:'Content systems designed to build topical authority, strengthen trust, and guide users toward conversion. We eliminate keyword clutter and focus on strategic relevance aligned with brand positioning and commercial outcomes.', tags:['Topical Authority','Content Systems','Trust Signals','Conversion Paths','Relevance'] },
              { num:'II', tag:'Keyword + On-Page Intelligence', title:'Opportunity-led\noptimisation', body:'High-impact keyword mapping aligned with business intent, real search behaviour, and revenue potential — paired with precision on-page optimisation across structure, internal linking, headings hierarchy, content refinement, and UX signals.', tags:['Keyword Mapping','Internal Linking','Headings','UX Signals','Revenue Intent'] },
              { num:'III', tag:'Technical SEO Foundation', title:'Structural precision\nfor performance', body:'Clean site architecture, advanced crawlability, structured indexation, mobile-first optimisation, site speed enhancement, schema implementation, and metadata refinement — engineered for performance. Scalable visibility begins with structural precision.', tags:['Architecture','Crawlability','Indexation','Schema','Site Speed'] },
              { num:'IV', tag:'Authority Signals + Future Readiness', title:'Earned trust\nthat compounds', body:'Quality backlinks, strategic brand mentions, and digital credibility signals that strengthen domain authority — plus AEO & GEO readiness so visibility extends into Answer Engines and generative search environments as discovery evolves.', tags:['Backlinks','Brand Mentions','Authority','AEO','GEO'] },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="seo-eco-card">
                  <span className="seo-eco-num">{card.num}</span>
                  <p style={{ fontSize:'.65rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.5rem' }}>{card.tag}</p>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.8rem,2.8vw,2.8rem)', color:'#ffffff', marginBottom:'1.8rem', lineHeight:1.2, whiteSpace:'pre-line' }}>{card.title}</h3>
                  <p style={{ fontSize:'.9rem', lineHeight:1.85, color:'rgba(255,255,255,.5)', fontWeight:200 }}>{card.body}</p>
                  <div style={{ marginTop:'2rem', display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
                    {card.tags.map((t, j) => <span key={j} className="seo-tag-item">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={100}>
            <p style={{ textAlign:'center', marginTop:'6rem', fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.3rem,2.5vw,2rem)', fontStyle:'italic', color:'rgba(255,255,255,.5)', fontWeight:300 }}>
              Every engagement is structured as a performance ecosystem — <em style={{ color:'rgba(255,255,255,.8)', fontStyle:'normal' }}>each layer reinforces the next.</em>
            </p>
          </FadeIn>
        </section>

        {/* ══════════════ PROCESS SPLIT ══════════════ */}
        <FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.08)', minHeight:500 }} className="seo-grid-2">
            <div style={{ position:'relative', overflow:'hidden' }} className="seo-split-img">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop" alt="SEO strategy process" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.5)', display:'block' }}/>
            </div>
            <div style={{ background:'#0a0a0a', padding:'6rem 5rem', display:'flex', flexDirection:'column', justifyContent:'center' }} className="seo-split-content">
              <span style={{ fontSize:'.68rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.8rem' }}>Strategic Framework</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,3.5vw,4rem)', lineHeight:1.15, color:'#ffffff', marginBottom:'2rem' }}>
                The path to<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>dominance</em>
              </h2>
              <p style={{ fontSize:'.95rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', fontWeight:200, marginBottom:'2.5rem' }}>
                Search leadership is not accidental. It is built through sequence, discipline, and precision.
              </p>
              <div style={{ display:'grid', gap:'1.4rem' }}>
                {[
                  { n: '01', t: 'Audit', d: 'Comprehensive technical SEO and competitive analysis to uncover structural gaps, authority weaknesses, and organic growth opportunities across your search ecosystem.' },
                  { n: '02', t: 'Strategy', d: 'A data-driven SEO roadmap aligned with business goals, revenue targets, and long-term positioning — integrating SEO, AEO, and GEO readiness.' },
                  { n: '03', t: 'Execution', d: 'Precision implementation across technical SEO, content optimisation, on-page SEO, and authority signals — engineered for performance and scalability.' },
                  { n: '04', t: 'Optimization', d: 'Continuous refinement powered by performance tracking, search intelligence, and conversion insights — strengthening visibility and protecting brand equity.' },
                  { n: '05', t: 'Scale', d: 'Sustained organic growth, expanded keyword territory, and strengthened market presence built to compound over time.' },
                ].map((s) => (
                  <div key={s.n} style={{ display:'grid', gridTemplateColumns:'3.2rem 1fr', gap:'1.2rem', alignItems:'start' }}>
                    <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'2.4rem', lineHeight:1, color:'rgba(255,255,255,.18)', fontWeight:300 }}>{s.n}</span>
                    <div>
                      <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.45rem', color:'#ffffff', fontWeight:400 }}>{s.t}</span>
                      <p style={{ margin:'.35rem 0 0', fontSize:'.9rem', lineHeight:1.85, color:'rgba(255,255,255,.55)', fontWeight:200 }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ══════════════ BANNER 3 ══════════════ */}
        <FadeIn>
          <div className="seo-img-banner" style={{ height:'clamp(200px,42vh,540px)' }}>
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80&fit=crop" alt="Data-driven search strategy" loading="lazy"/>
            <span className="seo-img-caption">Built through sequence and precision</span>
          </div>
        </FadeIn>

        {/* ══════════════ WHY BRANDS ══════════════ */}
        <section style={{ padding:'16vh 8vw', position:'relative', overflow:'hidden', background:'#050505' }} className="seo-pad-section">
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(25,25,25,.4) 0%, transparent 70%)', animation:'seo-breathe 8s ease-in-out infinite', pointerEvents:'none' }}/>
          <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
            <FadeIn>
              <p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'4rem', textAlign:'center' }}>Why Brands Choose Enhanccee</p>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.4rem,6vw,6.5rem)', lineHeight:1.05, textAlign:'center', color:'#ffffff', marginBottom:'5rem' }}>
                Built for authority.<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Measured by growth.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p style={{ fontSize:'clamp(1rem,1.6vw,1.3rem)', lineHeight:1.9, color:'rgba(255,255,255,.5)', textAlign:'center', fontWeight:200, marginBottom:'5rem' }}>
                Brands partner with Enhanccee because they want more than traffic.<br />
                They want positioning, trust, and scalable organic growth embedded into their search presence.<br />
                <strong style={{ color:'#ffffff' }}>We don't optimise for algorithms alone.</strong> We optimise for business impact.
              </p>
            </FadeIn>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(255,255,255,.08)', marginTop:'4rem' }} className="seo-grid-3">
              {[
                { word:'100×', sub:'Traffic Scale' },
                { word:'60%', sub:'Revenue Growth' },
                { word:'10+', sub:'Years Experience' },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div style={{ background:'#000', padding:'3rem 2rem', textAlign:'center' }} className="seo-stat-box">
                    <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.6rem', fontWeight:400, color:'#ffffff', display:'block', marginBottom:'.5rem' }}>{s.word}</span>
                    <span style={{ fontSize:'.75rem', letterSpacing:'.15em', color:'rgba(255,255,255,.4)', textTransform:'uppercase', fontWeight:200 }}>{s.sub}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ BANNER 4 — TRIO ══════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:2, background:'rgba(255,255,255,.08)' }} className="seo-grid-trio">
          {[
            { src:'https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?w=1200&q=80&fit=crop', cap:'Content Strategy' },
            { src:'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&fit=crop', cap:'Analytics' },
            { src:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&fit=crop', cap:'Editorial Authority' },
          ].map((img, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="seo-img-banner" style={{ height:'clamp(200px,38vh,460px)' }}>
                <img src={img.src} alt={img.cap} loading="lazy"/>
                <span className="seo-img-caption">{img.cap}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ══════════════ DIFFERENTIATORS ══════════════ */}
        <section style={{ padding:'14vh 8vw' }} className="seo-pad-section">
          <Divider mb="6rem"/>
          <div style={{ textAlign:'center', marginBottom:'4rem' }}>
            <FadeIn><span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', display:'block', marginBottom:'1.5rem' }}>What Makes Us Different</span></FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>
                Strategic.<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Future-ready.</em>
              </h2>
            </FadeIn>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', maxWidth:1200, margin:'6rem auto 0' }} className="seo-grid-2">
            {[
              { vs:'Strategic Intelligence', h:'SEO veterans', p:'SEO veterans with 10+ years driving enterprise and luxury brand growth through structured, scalable organic strategies.' },
              { vs:'Technical Precision', h:'Engineered implementation', p:'Clean, engineered implementation across every technical SEO layer — architecture, crawlability, indexation, schema, and performance optimisation.' },
              { vs:'Future-Ready', h:'AEO + GEO optimisation', p:'Advanced AEO and GEO optimisation ensuring visibility across AI-driven search, Answer Engines, and evolving discovery ecosystems.' },
              { vs:'ROI-Focused', h:'Reporting that matters', p:'Transparent reporting centred on organic growth, conversions, and revenue impact — not vanity metrics.' },
            ].map((d, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="seo-diff-item">
                  <div style={{ width:48, height:1, background:'rgba(255,255,255,.4)', marginBottom:'2rem', position:'relative' }}>
                    <span style={{ position:'absolute', right:0, top:-3, width:7, height:7, borderRadius:'50%', background:'rgba(255,255,255,.6)', display:'block' }}/>
                  </div>
                  <span style={{ fontSize:'.7rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'1rem', display:'block' }}>{d.vs}</span>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.6rem,2.5vw,2.5rem)', color:'#ffffff', marginBottom:'1rem', lineHeight:1.2 }}>{d.h}</h3>
                  <p style={{ fontSize:'.88rem', lineHeight:1.85, color:'rgba(255,255,255,.5)', fontWeight:200 }}>{d.p}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══════════════ RECOGNITION SPLIT ══════════════ */}
        <FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.08)', minHeight:500 }} className="seo-grid-2">
            <div style={{ background:'#0a0a0a', padding:'6rem 5rem', display:'flex', flexDirection:'column', justifyContent:'center' }} className="seo-split-content">
              <span style={{ fontSize:'.68rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.8rem' }}>Recognition</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,3.5vw,4rem)', lineHeight:1.15, color:'#ffffff', marginBottom:'2rem' }}>
                Recognised among<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>emerging best SEO companies</em>
              </h2>
              <p style={{ fontSize:'.95rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', fontWeight:200 }}>Delivering SEO services across India, UAE, Australia, and the US — supporting both local dominance and global expansion through strategic search engine optimisation.</p>
            </div>
            <div style={{ position:'relative', overflow:'hidden' }} className="seo-split-img">
              <img src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1200&q=80&fit=crop" alt="Organic search authority outcome" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.38) saturate(.5)', display:'block' }}/>
            </div>
          </div>
        </FadeIn>

        {/* ══════════════ SIGNATURE QUOTE ══════════════ */}
        <section style={{ padding:'20vh 8vw', position:'relative', overflow:'hidden', textAlign:'center' }} className="seo-pad-section">
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(20,20,20,.4) 0%, transparent 70%)', animation:'seo-breathe 10s ease-in-out infinite alternate', pointerEvents:'none' }}/>
          <FadeIn>
            <p style={{ fontSize:'.7rem', letterSpacing:'.45em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', marginBottom:'4rem', position:'relative', zIndex:1 }}>The Enhanccee Search Statement</p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,6.5vw,7.5rem)', lineHeight:1.1, color:'#ffffff', maxWidth:1280, margin:'0 auto 3rem', position:'relative', zIndex:1 }}>
              The difference between<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>ranking and relevance</em><br />is intention.
            </h2>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ width:200, height:1, background:'linear-gradient(to right, transparent, rgba(255,255,255,.3), transparent)', margin:'0 auto', position:'relative', zIndex:1 }}/>
          </FadeIn>
        </section>

        {/* ══════════════ BANNER 5 ══════════════ */}
        <FadeIn>
          <div className="seo-img-banner" style={{ height:'clamp(160px,28vh,360px)' }}>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80&fit=crop" alt="SEO strategy session" loading="lazy"/>
            <span className="seo-img-caption">Ready to scale?</span>
          </div>
        </FadeIn>

        {/* ══════════════ FAQ ══════════════ */}
        <section style={{ padding:'14vh 8vw' }} className="seo-pad-section">
          <Divider mb="6rem"/>
          <div style={{ textAlign:'center', marginBottom:'4rem' }}>
            <FadeIn>
              <span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', display:'block', marginBottom:'1.5rem' }}>
                Frequently Asked Questions
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,4.2vw,4.8rem)', color:'#ffffff', lineHeight:1.15 }}>
                Clarity before<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>commitment</em>
              </h2>
            </FadeIn>
          </div>
          <div style={{ maxWidth: 1100, margin: '0 auto', background: 'rgba(10,10,10,.6)', border: '1px solid rgba(255,255,255,.08)', padding: '0 3rem' }} className="seo-faq-wrap">
            {[
              { q: 'How quickly can we expect SEO results?', a: 'SEO is a long-term growth engine. Initial traction typically begins within months, with compounding authority and organic growth building over time.' },
              { q: 'What makes Enhanccee different from other SEO companies?', a: 'Our approach integrates technical SEO, authority-driven content, AEO, and GEO strategy — engineered around business impact, not just rankings.' },
              { q: 'Do you work with luxury and enterprise brands?', a: 'Yes. Our frameworks are designed for brands that prioritise positioning, authority, and scalable market leadership.' },
              { q: 'What regions do you serve?', a: 'We deliver SEO services across India, UAE, Australia, and the US, supporting both regional and global growth strategies.' },
              { q: 'Is your SEO approach future-ready?', a: 'Yes. We actively integrate AEO and GEO optimisation to ensure visibility across AI-driven and generative search environments.' },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 80}>
                <FAQItem
                  q={item.q}
                  a={item.a}
                  open={openFAQ === idx}
                  onToggle={() => setOpenFAQ((v) => (v === idx ? null : idx))}
                />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══════════════ CTA ══════════════ */}
        <section style={{ padding:'14vh 8vw' }} className="seo-pad-section">
          <FadeIn>
            <div style={{ background:'rgba(12,12,12,.9)', border:'1px solid rgba(255,255,255,.1)', backdropFilter:'blur(20px)', padding:'8rem 6rem', textAlign:'center', position:'relative', overflow:'hidden', maxWidth:1100, margin:'0 auto' }} className="seo-cta-box">
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(255,255,255,.3), transparent)' }}/>
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,.025) 0%, transparent 60%)', pointerEvents:'none' }}/>
              <span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'2rem', display:'block', position:'relative', zIndex:1 }}>Ready to scale?</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.1, marginBottom:'2rem', position:'relative', zIndex:1 }}>
                Let's Engineer Your<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>SEO Strategy</em>
              </h2>
              <p style={{ fontSize:'clamp(.9rem,1.3vw,1.1rem)', color:'rgba(255,255,255,.45)', fontWeight:200, lineHeight:1.8, maxWidth:720, margin:'0 auto 4rem', position:'relative', zIndex:1 }}>Partner with Enhanccee for SEO that builds authority, strengthens trust, and drives scalable organic growth designed to compound over time.</p>
              <div style={{ display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap', position:'relative', zIndex:1 }}>
                <Link href="/contact" className="seo-btn-white"><span>Book Your Strategy Session</span></Link>
                <Link href="/clientele" className="seo-btn-ghost">Start Your Growth</Link>
              </div>
            </div>
          </FadeIn>
        </section>

      </main>

      <Footer />
    </>
  )
}