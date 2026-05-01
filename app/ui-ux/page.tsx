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

function Divider({ mb = '6rem', isWhite = false }: { mb?: string; isWhite?: boolean }) {
  const dividerColor = isWhite ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'
  const bgColor = isWhite ? '#ffffff' : '#000000'
  const dotColor = isWhite ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'
  return (
    <div style={{ width:'100%', height:1, background:`linear-gradient(to right, transparent, ${dividerColor}, transparent)`, position:'relative', marginBottom:mb }}>
      <span style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', color:dotColor, fontSize:'.5rem', background:bgColor, padding:'0 1rem' }}>◆</span>
    </div>
  )
}

function MobileSlider({ items, renderItem }: { items: any[], renderItem: (item: any, i: number) => React.ReactNode }) {
  const [idx, setIdx] = useState(0)
  const touchStart = useRef(0)
  const touchEnd = useRef(0)
  function onTouchStart(e: React.TouchEvent) { touchStart.current = e.targetTouches[0].clientX }
  function onTouchMove(e: React.TouchEvent) { touchEnd.current = e.targetTouches[0].clientX }
  function onTouchEnd() {
    const diff = touchStart.current - touchEnd.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) setIdx(i => Math.min(i + 1, items.length - 1))
      else setIdx(i => Math.max(i - 1, 0))
    }
  }
  return (
    <div>
      <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{ overflow:'hidden' }}>
        <div style={{ display:'flex', transition:'transform .4s cubic-bezier(.16,1,.3,1)', transform:`translateX(-${idx * 100}%)` }}>
          {items.map((item, i) => (
            <div key={i} style={{ minWidth:'100%' }}>{renderItem(item, i)}</div>
          ))}
        </div>
      </div>
      <div style={{ display:'flex', gap:6, marginTop:20, justifyContent:'center' }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ height:2, width: i === idx ? 36 : 18, background: i === idx ? '#fff' : 'rgba(255,255,255,.25)', border:'none', cursor:'pointer', transition:'all .3s', padding:0 }}/>
        ))}
      </div>
    </div>
  )
}

export default function UIUXPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
        const a = .04 + Math.sin(t * .0006 + i) * .02
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, i % 2 === 0 ? `rgba(255,255,255,${a * 0.4})` : `rgba(200,200,200,${a * 0.2})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      }
      t++; raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  const philItems = [
    { n:'01', strong:'Design must reduce friction.', body:'Every interaction is engineered to simplify user decisions and remove unnecessary effort.' },
    { n:'02', strong:'Improve navigation.', body:'Clear structures and intentional pathways help users move effortlessly through every touchpoint.' },
    { n:'03', strong:'Transform complexity into simplicity.', body:'No decorative interfaces. No cluttered layouts. Only purposeful UI/UX systems built for clarity.' },
    { n:'04', strong:'Built for growth.', body:'Intentional experience design that improves engagement, product performance, and long-term digital outcomes.' },
  ]

  const diffItems = [
    { vs:'Designed to', h:'Perform Better', p:'Our approach prioritises clarity, usability, and product performance over complexity.' },
    { vs:'Not Decorative', h:'Not Confusing', p:'No visual noise. No cluttered systems. Only intentional UX built for clarity and ease.' },
    { vs:'Not Feature-Heavy', h:'Across Every Platform', p:'Every experience is engineered to improve engagement and user retention across all devices.' },
    { vs:'Built for Ease', h:'Not attention-seeking', p:'Because great design does not demand attention. It makes everything easier.' },
  ]

  return (
    <>
      <style>{`
        @keyframes ux-fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ux-orbFloat { 0%,100%{transform:translate(0,0)scale(1)} 33%{transform:translate(30px,-20px)scale(1.05)} 66%{transform:translate(-20px,15px)scale(.97)} }
        @keyframes ux-breathe { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }

        .ux-btn-white { display:inline-block; padding:.85rem 2rem; border:1px solid rgba(255,255,255,0.6); color:#ffffff; font-size:.75rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; position:relative; overflow:hidden; transition:color .4s; }
        .ux-btn-white::before { content:''; position:absolute; inset:0; background:#ffffff; transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.77,0,.175,1); }
        .ux-btn-white:hover::before { transform:scaleX(1); }
        .ux-btn-white span { position:relative; z-index:1; }
        .ux-btn-white:hover span { color:#000 !important; }
        .ux-btn-ghost { display:inline-block; padding:.85rem 2rem; color:rgba(255,255,255,.6); font-size:.75rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(255,255,255,.15); transition:all .4s; }
        .ux-btn-ghost:hover { border-color:rgba(255,255,255,.5); color:#ffffff; }

        .ux-img-banner { width:100%; position:relative; overflow:hidden; display:block; line-height:0; }
        .ux-img-banner img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.45) saturate(.5); transition:transform 8s ease, filter .6s; }
        .ux-img-banner:hover img { transform:scale(1.03); filter:brightness(.55) saturate(.6); }
        .ux-img-banner::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.05) 50%, rgba(0,0,0,.45) 100%); pointer-events:none; }
        .ux-img-caption { position:absolute; bottom:1.5rem; left:1.5rem; z-index:2; font-size:.62rem; letter-spacing:.3em; text-transform:uppercase; color:rgba(255,255,255,.4); }

        .ux-eco-card { background:#0a0a0a; padding:2.5rem; position:relative; overflow:hidden; transition:background .5s; }
        @media(min-width:768px){ .ux-eco-card { padding:5rem 4rem; } }
        .ux-eco-card:hover { background:#111111; }
        .ux-eco-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(to right, transparent, #ffffff, transparent); opacity:0; transition:opacity .5s; }
        .ux-eco-card:hover::before { opacity:1; }
        .ux-eco-num { font-family:var(--font-cormorant),serif; font-size:5rem; font-weight:300; color:rgba(255,255,255,.15); position:absolute; top:1rem; right:1.5rem; pointer-events:none; transition:color .5s; }
        @media(min-width:768px){ .ux-eco-num { font-size:7rem; right:2rem; } }
        .ux-eco-card:hover .ux-eco-num { color:rgba(255,255,255,.25); }
        .ux-tag-item { font-size:.68rem; padding:.3rem .7rem; border:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.45); transition:all .3s; display:inline-block; }
        .ux-eco-card:hover .ux-tag-item { border-color:rgba(255,255,255,.3); color:rgba(255,255,255,.75); }

        .ux-diff-item { padding:2rem; border-bottom:1px solid rgba(255,255,255,.06); border-right:1px solid rgba(255,255,255,.06); }
        @media(min-width:768px){ .ux-diff-item { padding:4rem; } }
        .ux-diff-item:nth-child(even) { border-right:none; }
        .ux-diff-item:nth-last-child(-n+2) { border-bottom:none; }

        .ux-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:1; }
        .ux-orb-1 { width:300px; height:300px; background:rgba(40,40,40,.5); top:-100px; left:-100px; animation:ux-orbFloat 12s ease-in-out infinite; }
        .ux-orb-2 { width:250px; height:250px; background:rgba(255,255,255,.04); bottom:-80px; right:-80px; animation:ux-orbFloat 12s ease-in-out infinite; animation-delay:-6s; }
        @media(min-width:768px){ .ux-orb-1{width:500px;height:500px;left:-150px;} .ux-orb-2{width:400px;height:400px;right:-100px;} }

        .ux-2col { display:grid; grid-template-columns:1fr; gap:2px; }
        @media(min-width:640px){ .ux-2col { grid-template-columns:1fr 1fr; } }

        /* 3-col banner: 2 cols on mobile, 3 on desktop */
        .ux-3col { display:grid; grid-template-columns:1fr 1fr; gap:2px; }
        @media(min-width:768px){ .ux-3col { grid-template-columns:2fr 1fr 1fr; } }

        .ux-stat-grid { display:grid; grid-template-columns:1fr; gap:1px; }
        @media(min-width:640px){ .ux-stat-grid { grid-template-columns:repeat(3,1fr); } }

        .ux-process-row { display:grid; grid-template-columns:1fr; gap:2px; }
        @media(min-width:768px){ .ux-process-row { grid-template-columns:1fr 1fr; min-height:500px; } }

        .ux-section { padding:8vh 6vw; }
        @media(min-width:768px){ .ux-section { padding:14vh 8vw; } }

        .ux-cta-pad { padding:3rem 1.5rem; }
        @media(min-width:768px){ .ux-cta-pad { padding:8rem 6rem; } }

        .ux-phil-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem 5rem; }

        .ux-diff-grid { display:grid; grid-template-columns:1fr 1fr; }
      `}</style>

      <Header />

      <main style={{ backgroundColor:'#000000', color:'#ffffff', fontFamily:'var(--font-montserrat)', overflowX:'hidden' }}>

        {/* ══ HERO ══ */}
        <section style={{ position:'relative', minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:'120px 6vw 60px' }}>
          <div className="ux-orb ux-orb-1"/>
          <div className="ux-orb ux-orb-2"/>
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.4 }}/>
          <div style={{ position:'absolute', inset:0, zIndex:1, background:'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,30,30,.4) 0%, transparent 70%), #000000' }}/>
          <div style={{ position:'relative', zIndex:3, textAlign:'center', maxWidth:1280, width:'100%' }}>
            <p style={{ fontWeight:200, fontSize:'clamp(.65rem,1.2vw,.8rem)', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', opacity:0, animation:'ux-fadeUp 1s ease .3s forwards', marginBottom:'1.5rem' }}>
              Enhanccee — UI/UX Design
            </p>
            <h1 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,5rem)', lineHeight:1.1, color:'#ffffff', opacity:0, animation:'ux-fadeUp 1.1s ease .6s forwards', marginBottom:'1.2rem' }}>
              Designing Experiences<br />That Feel <em style={{ fontStyle:'normal', fontWeight:300 }}>Effortless</em><br />and Perform Exceptionally
            </h1>
            <p style={{ fontWeight:200, fontSize:'clamp(.85rem,1.5vw,1.1rem)', lineHeight:1.8, color:'rgba(255,255,255,.55)', maxWidth:900, margin:'0 auto 2.5rem', opacity:0, animation:'ux-fadeUp 1.1s ease .9s forwards' }}>
              Digital products are not remembered for features. They are remembered for how they feel to use.
            </p>
            <div style={{ opacity:0, animation:'ux-fadeUp 1.1s ease 1.1s forwards' }}>
              <Link href="/contact" className="ux-btn-white"><span>Begin Your Experience</span></Link>
            </div>
          </div>
        </section>

        {/* ══ BANNER 1 ══ */}
        <FadeIn>
          <div className="ux-img-banner" style={{ height:'clamp(280px,45vh,700px)' }}>
            <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1800&q=80&fit=crop&crop=center" alt="Modern UI design workspace" loading="lazy"/>
            <span className="ux-img-caption">Great experiences are designed with intention</span>
          </div>
        </FadeIn>

        {/* ══ PHILOSOPHY ══ */}
        <section className="ux-section" style={{ background:'#000000' }}>
          <Divider mb="4rem" isWhite={false}/>
          <FadeIn><p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:'2.5rem' }}>The Philosophy</p></FadeIn>
          <FadeIn>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,5vw,6rem)', lineHeight:1.1, color:'#ffffff', marginBottom:'3rem' }}>
              We don&apos;t just design interfaces.<br />We design <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>digital experiences.</em>
            </h2>
          </FadeIn>
          <FadeIn>
            <p style={{ fontSize:'clamp(.9rem,1.35vw,1.15rem)', lineHeight:1.95, color:'rgba(255,255,255,.58)', fontWeight:200, marginBottom:'3rem', maxWidth:1020 }}>
              User experience is more than layout or aesthetics. It is the intersection of human behaviour, product strategy, and interface design.
            </p>
          </FadeIn>

          {/* Mobile: slider, Desktop: grid */}
          {isMobile ? (
            <MobileSlider items={philItems} renderItem={(b, i) => (
              <div style={{ padding:'2rem 0' }}>
                <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'4rem', color:'rgba(255,255,255,.15)', lineHeight:1, marginBottom:'1rem', fontWeight:300 }}>{b.n}</div>
                <p style={{ fontSize:'clamp(.9rem,1.4vw,1.1rem)', lineHeight:1.9, color:'rgba(255,255,255,.55)', fontWeight:200 }}>
                  <strong style={{ color:'#ffffff', fontWeight:400 }}>{b.strong}</strong> {b.body}
                </p>
              </div>
            )}/>
          ) : (
            <div className="ux-phil-grid">
              {philItems.map((b, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div>
                    <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'4rem', color:'rgba(255,255,255,.15)', lineHeight:1, marginBottom:'1rem', fontWeight:300 }}>{b.n}</div>
                    <p style={{ fontSize:'clamp(.9rem,1.4vw,1.1rem)', lineHeight:1.9, color:'rgba(255,255,255,.55)', fontWeight:200 }}>
                      <strong style={{ color:'#ffffff', fontWeight:400 }}>{b.strong}</strong> {b.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </section>

        {/* ══ BANNER 2 SPLIT ══ */}
        <div className="ux-2col" style={{ background:'rgba(255,255,255,.1)' }}>
          <FadeIn>
            <div className="ux-img-banner" style={{ height:'clamp(240px,38vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80&fit=crop" alt="User research" loading="lazy"/>
              <span className="ux-img-caption">User Research</span>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="ux-img-banner" style={{ height:'clamp(240px,38vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80&fit=crop" alt="Interface design" loading="lazy"/>
              <span className="ux-img-caption">Interface Design</span>
            </div>
          </FadeIn>
        </div>

        {/* ══ ECOSYSTEM ══ */}
        <section className="ux-section" style={{ background:'#000000' }}>
          <Divider mb="5rem" isWhite={false}/>
          <div style={{ textAlign:'center', marginBottom:'4rem' }}>
            <FadeIn><span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:'1.5rem' }}>What We Deliver</span></FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>
                Your Complete<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>UX & UI Ecosystem</em>
              </h2>
            </FadeIn>
          </div>
          <div className="ux-2col" style={{ background:'rgba(255,255,255,.08)' }}>
            {[
              { num:'I', tag:'Strategy', title:'UX Strategy\n& Research', body:'Great experiences start with understanding people. We conduct user research, behavioural analysis, journey mapping, and product strategy workshops.', tags:['User Research','Behavioural Analysis','Journey Mapping','Product Strategy'] },
              { num:'II', tag:'Architecture', title:'Information Architecture\n& User Flow', body:'Clarity drives engagement. We structure information architecture, navigation frameworks, and user journey flows that help users move effortlessly.', tags:['Navigation','User Flow','Journey Design','Clarity'] },
              { num:'III', tag:'Interface', title:'Interface Design\n& Visual Systems', body:'Design should feel effortless. Through modern UI design systems, interface components, typography frameworks, and responsive layouts.', tags:['UI Systems','Components','Typography','Responsive'] },
              { num:'IV', tag:'Performance', title:'Product Experience\nOptimization', body:'Experience does not end at launch. We refine platforms through usability testing, UX optimisation, conversion design improvements.', tags:['Usability Testing','UX Optimisation','Conversion','Performance'] },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="ux-eco-card">
                  <span className="ux-eco-num">{card.num}</span>
                  <p style={{ fontSize:'.62rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1rem' }}>{card.tag}</p>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.6rem,2.8vw,2.8rem)', color:'#ffffff', marginBottom:'1.2rem', lineHeight:1.2, whiteSpace:'pre-line' }}>{card.title}</h3>
                  <p style={{ fontSize:'.88rem', lineHeight:1.85, color:'rgba(255,255,255,.5)', fontWeight:200 }}>{card.body}</p>
                  <div style={{ marginTop:'1.5rem', display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
                    {card.tags.map((t, j) => <span key={j} className="ux-tag-item">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══ PROCESS ROW ══ */}
        <FadeIn>
          <div className="ux-process-row" style={{ background:'rgba(0,0,0,.08)' }}>
            <div style={{ position:'relative', overflow:'hidden', minHeight:280 }}>
              <img src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80&fit=crop" alt="Design process" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.6)', display:'block', position:'absolute', inset:0 }}/>
            </div>
            <div style={{ background:'#000000', padding:'3rem 2rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <span style={{ fontSize:'.65rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.5rem' }}>The Enhanccee Process</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(1.8rem,3.5vw,4rem)', lineHeight:1.15, color:'#ffffff', marginBottom:'1.5rem' }}>
                Precision<br />at <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>every interaction</em>
              </h2>
              <div style={{ display:'grid', gap:'.8rem' }}>
                {[
                  '01 Discovery — Understanding product goals and user behaviour through UX audits.',
                  '02 Strategy — Developing UX strategy, user flow architecture, and interaction design framework.',
                  '03 Design — Crafting wireframes, UI systems, and interface prototypes.',
                  '04 Testing — Validating usability through UX testing and behavioural analysis.',
                  '05 Refinement — Continuously evolving the product experience.',
                ].map((step, idx) => (
                  <p key={idx} style={{ margin:0, fontSize:'.83rem', lineHeight:1.75, color:'rgba(255,255,255,.62)', fontWeight:300 }}>{step}</p>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ══ BANNER 3 ══ */}
        <FadeIn>
          <div className="ux-img-banner" style={{ height:'clamp(220px,35vh,540px)' }}>
            <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1800&q=80&fit=crop" alt="Digital interface design" loading="lazy"/>
            <span className="ux-img-caption">Where strategy becomes experience</span>
          </div>
        </FadeIn>

        {/* ══ STATS ══ */}
        <section className="ux-section" style={{ position:'relative', overflow:'hidden', background:'#000000' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(20,20,20,.4) 0%, transparent 70%)', animation:'ux-breathe 8s ease-in-out infinite', pointerEvents:'none' }}/>
          <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.4rem,6vw,6.5rem)', lineHeight:1.05, textAlign:'center', color:'#ffffff', marginBottom:'3rem' }}>
                Exceptional Products<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Begin with User Experience</em>
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p style={{ fontSize:'clamp(.9rem,1.6vw,1.3rem)', lineHeight:1.9, color:'rgba(255,255,255,.5)', textAlign:'center', fontWeight:200, marginBottom:'4rem' }}>
                <strong style={{ color:'#ffffff' }}>Effortless experiences are always designed.</strong>
              </p>
            </FadeIn>
            <div className="ux-stat-grid" style={{ background:'rgba(255,255,255,.08)', marginTop:'3rem' }}>
              {[
                { word:'Clarity', sub:'Over Noise' },
                { word:'Usability', sub:'Over Visual Clutter' },
                { word:'Flow', sub:'Over Friction' },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div style={{ background:'#000000', padding:'2.5rem 1.5rem', textAlign:'center', border:'1px solid rgba(255,255,255,.1)' }}>
                    <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.3rem,2vw,1.6rem)', fontWeight:400, color:'#ffffff', display:'block', marginBottom:'.5rem' }}>{s.word}</span>
                    <span style={{ fontSize:'.72rem', letterSpacing:'.15em', color:'rgba(255,255,255,.4)', textTransform:'uppercase', fontWeight:200 }}>{s.sub}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BANNER TRIO — fixed ══ */}
        <div className="ux-3col" style={{ background:'rgba(255,255,255,.08)' }}>
          {[
            { src:'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80&fit=crop', cap:'Wireframing' },
            { src:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&fit=crop', cap:'Prototyping' },
            { src:'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&q=80&fit=crop', cap:'Visual Design' },
          ].map((img, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="ux-img-banner" style={{ height:'clamp(200px,32vh,460px)' }}>
                <img src={img.src} alt={img.cap} loading="lazy"/>
                <span className="ux-img-caption">{img.cap}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ══ DIFFERENTIATORS ══ */}
        <section className="ux-section" style={{ background:'#000000' }}>
          <Divider mb="4rem" isWhite={false}/>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>
                Designed to<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Perform Better</em>
              </h2>
            </FadeIn>
          </div>

          {/* Mobile: slider, Desktop: grid */}
          {isMobile ? (
            <MobileSlider items={diffItems} renderItem={(d, i) => (
              <div style={{ padding:'2rem 0' }}>
                <div style={{ width:40, height:1, background:'rgba(255,255,255,.4)', marginBottom:'1.5rem', position:'relative' }}>
                  <span style={{ position:'absolute', right:0, top:-3, width:7, height:7, borderRadius:'50%', background:'rgba(255,255,255,.6)', display:'block' }}/>
                </div>
                <span style={{ fontSize:'.68rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'.8rem', display:'block' }}>{d.vs}</span>
                <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.8rem,2.5vw,2.5rem)', color:'#ffffff', marginBottom:'.8rem', lineHeight:1.2 }}>{d.h}</h3>
                <p style={{ fontSize:'.85rem', lineHeight:1.85, color:'rgba(255,255,255,.5)', fontWeight:200 }}>{d.p}</p>
              </div>
            )}/>
          ) : (
            <div className="ux-diff-grid" style={{ maxWidth:1200, margin:'4rem auto 0' }}>
              {diffItems.map((d, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="ux-diff-item">
                    <div style={{ width:40, height:1, background:'rgba(255,255,255,.4)', marginBottom:'1.5rem', position:'relative' }}>
                      <span style={{ position:'absolute', right:0, top:-3, width:7, height:7, borderRadius:'50%', background:'rgba(255,255,255,.6)', display:'block' }}/>
                    </div>
                    <span style={{ fontSize:'.68rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'.8rem', display:'block' }}>{d.vs}</span>
                    <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.4rem,2.5vw,2.5rem)', color:'#ffffff', marginBottom:'.8rem', lineHeight:1.2 }}>{d.h}</h3>
                    <p style={{ fontSize:'.85rem', lineHeight:1.85, color:'rgba(255,255,255,.5)', fontWeight:200 }}>{d.p}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </section>

        {/* ══ CLOSING ROW ══ */}
        <FadeIn>
          <div className="ux-process-row" style={{ background:'rgba(0,0,0,.08)' }}>
            <div style={{ background:'#000000', padding:'3rem 2rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(1.8rem,3.5vw,4rem)', lineHeight:1.15, color:'#ffffff', marginBottom:'1.5rem' }}>
                Experiences that feel<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>inevitable</em>
              </h2>
              <p style={{ fontSize:'.9rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', fontWeight:200 }}>When design clarity, usability, and human psychology work together, digital experiences become natural.</p>
            </div>
            <div style={{ position:'relative', overflow:'hidden', minHeight:280 }}>
              <img src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80&fit=crop" alt="Premium digital interface" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.6)', display:'block', position:'absolute', inset:0 }}/>
            </div>
          </div>
        </FadeIn>

        {/* ══ SIGNATURE QUOTE ══ */}
        <section className="ux-section" style={{ position:'relative', overflow:'hidden', textAlign:'center', background:'#000000' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(25,25,25,.4) 0%, transparent 70%)', animation:'ux-breathe 10s ease-in-out infinite alternate', pointerEvents:'none' }}/>
          <FadeIn delay={100}>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,6.5vw,7.5rem)', lineHeight:1.1, color:'#ffffff', maxWidth:1280, margin:'0 auto 2rem', position:'relative', zIndex:1 }}>
              When simplicity<br />and intelligence align,<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>experience is born.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ width:200, height:1, background:'linear-gradient(to right, transparent, rgba(255,255,255,.3), transparent)', margin:'0 auto', position:'relative', zIndex:1 }}/>
          </FadeIn>
        </section>

        {/* ══ BANNER 5 ══ */}
        <FadeIn>
          <div className="ux-img-banner" style={{ height:'clamp(180px,24vh,360px)' }}>
            <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1800&q=80&fit=crop" alt="UI/UX design consultation" loading="lazy"/>
            <span className="ux-img-caption">Where vision meets experience</span>
          </div>
        </FadeIn>

        {/* ══ CTA ══ */}
        <section className="ux-section" style={{ background:'#000000' }}>
          <FadeIn>
            <div style={{ background:'rgba(10,10,10,.9)', border:'1px solid rgba(255,255,255,.1)', backdropFilter:'blur(20px)', textAlign:'center', position:'relative', overflow:'hidden', maxWidth:1100, margin:'0 auto' }} className="ux-cta-pad">
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(255,255,255,.3), transparent)' }}/>
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,.03) 0%, transparent 60%)', pointerEvents:'none' }}/>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.1, marginBottom:'1.5rem', position:'relative', zIndex:1 }}>
                Your product experience is<br />your <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>competitive advantage</em>
              </h2>
              <p style={{ fontSize:'clamp(.85rem,1.3vw,1.1rem)', color:'rgba(255,255,255,.45)', fontWeight:200, lineHeight:1.8, maxWidth:620, margin:'0 auto 3rem', position:'relative', zIndex:1 }}>Exceptional UI/UX systems designed for clarity, usability, and growth across every interaction.</p>
              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', position:'relative', zIndex:1 }}>
                <Link href="/contact" className="ux-btn-white"><span>Begin Your Experience</span></Link>
                <Link href="/clientele" className="ux-btn-ghost">View Our Work</Link>
              </div>
            </div>
          </FadeIn>
        </section>

      </main>

      <Footer />
    </>
  )
}
