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
          <button key={i} onClick={() => setIdx(i)} style={{ height:2, width: i === idx ? 36 : 18, background: i === idx ? '#000' : 'rgba(0,0,0,.25)', border:'none', cursor:'pointer', transition:'all .3s', padding:0 }}/>
        ))}
      </div>
    </div>
  )
}

function MobileSliderDark({ items, renderItem }: { items: any[], renderItem: (item: any, i: number) => React.ReactNode }) {
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

export default function BrandingPage() {
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
    { n:'01', strong:'Identity ecosystems aligned with your vision.', body:'Every branding decision is intentionally engineered to reinforce who you are and how your market remembers you.' },
    { n:'02', strong:'Emotion comes before conviction.', body:'Trust begins with feeling. We design identities that connect emotionally before they communicate rationally.' },
    { n:'03', strong:'No templates. No shortcuts.', body:'No recycled playbooks. No decorative branding. Only intentional systems designed to elevate perception and authority.' },
    { n:'04', strong:'Timeless market presence.', body:'Because true branding does not chase trends. It builds consistency, recall, and long-term brand equity.' },
  ]

  const diffItems = [
    { vs:'Built to Be', h:'Inevitable', p:'Our approach to branding is designed for longevity and influence, not short-term aesthetics.' },
    { vs:'Not Trend-led', h:'Not Decorative', p:'Every identity system is engineered to strengthen recognition, authority, and brand recall.' },
    { vs:'Not Temporary', h:'Across All Markets', p:'Designed to remain consistent and influential across evolving markets, channels, and platforms.' },
    { vs:'Engineered', h:'to command attention', p:'Because the strongest brands do not compete for attention. They command it.' },
  ]

  return (
    <>
      <style>{`
        @keyframes br-fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes br-orbFloat { 0%,100%{transform:translate(0,0)scale(1)} 33%{transform:translate(30px,-20px)scale(1.05)} 66%{transform:translate(-20px,15px)scale(.97)} }
        @keyframes br-breathe { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }

        .br-btn-white { display:inline-block; padding:.85rem 2rem; border:1px solid rgba(255,255,255,0.6); color:#ffffff; font-size:.75rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; position:relative; overflow:hidden; transition:color .4s; }
        .br-btn-white::before { content:''; position:absolute; inset:0; background:#ffffff; transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.77,0,.175,1); }
        .br-btn-white:hover::before { transform:scaleX(1); }
        .br-btn-white:hover span { color:#000000 !important; }
        .br-btn-white span { position:relative; z-index:1; }
        .br-btn-ghost { display:inline-block; padding:.85rem 2rem; color:rgba(255,255,255,.6); font-size:.75rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(255,255,255,.15); transition:all .4s; }
        .br-btn-ghost:hover { border-color:rgba(255,255,255,.5); color:#ffffff; }

        .br-img-banner { width:100%; position:relative; overflow:hidden; display:block; line-height:0; }
        .br-img-banner img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.45) saturate(.5); transition:transform 8s ease, filter .6s; }
        .br-img-banner:hover img { transform:scale(1.03); filter:brightness(.55) saturate(.6); }
        .br-img-banner::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.05) 50%, rgba(0,0,0,.45) 100%); pointer-events:none; }
        .br-img-caption { position:absolute; bottom:1.5rem; left:1.5rem; z-index:2; font-size:.62rem; letter-spacing:.3em; text-transform:uppercase; color:rgba(255,255,255,.4); }

        .br-eco-card { background:#0a0a0a; padding:2.5rem; position:relative; overflow:hidden; transition:background .5s; }
        @media(min-width:768px){ .br-eco-card { padding:5rem 4rem; } }
        .br-eco-card:hover { background:#111111; }
        .br-eco-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(to right, transparent, #ffffff, transparent); opacity:0; transition:opacity .5s; }
        .br-eco-card:hover::before { opacity:1; }
        .br-eco-num { font-family:var(--font-cormorant),serif; font-size:5rem; font-weight:300; color:rgba(255,255,255,.15); position:absolute; top:1rem; right:1.5rem; pointer-events:none; transition:color .5s; }
        @media(min-width:768px){ .br-eco-num { font-size:7rem; right:2rem; } }
        .br-eco-card:hover .br-eco-num { color:rgba(255,255,255,.25); }
        .br-tag-item { font-size:.68rem; padding:.3rem .7rem; border:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.45); transition:all .3s; display:inline-block; }
        .br-eco-card:hover .br-tag-item { border-color:rgba(255,255,255,.3); color:rgba(255,255,255,.75); }

        .br-diff-item { padding:2rem; border-bottom:1px solid rgba(255,255,255,.06); border-right:1px solid rgba(255,255,255,.06); }
        @media(min-width:768px){ .br-diff-item { padding:4rem; } }
        .br-diff-item:nth-child(even) { border-right:none; }
        .br-diff-item:nth-last-child(-n+2) { border-bottom:none; }

        .br-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:1; }
        .br-orb-1 { width:300px; height:300px; background:rgba(40,40,40,.5); top:-100px; left:-100px; animation:br-orbFloat 12s ease-in-out infinite; }
        .br-orb-2 { width:250px; height:250px; background:rgba(255,255,255,.04); bottom:-80px; right:-80px; animation:br-orbFloat 12s ease-in-out infinite; animation-delay:-6s; }
        @media(min-width:768px){ .br-orb-1{width:500px;height:500px;left:-150px;} .br-orb-2{width:400px;height:400px;right:-100px;} }

        .br-2col { display:grid; grid-template-columns:1fr; gap:2px; }
        @media(min-width:640px){ .br-2col { grid-template-columns:1fr 1fr; } }
        .br-3col { display:grid; grid-template-columns:1fr 1fr; gap:2px; }
        @media(min-width:768px){ .br-3col { grid-template-columns:2fr 1fr 1fr; } }
        .br-stat-grid { display:grid; grid-template-columns:1fr; gap:1px; }
        @media(min-width:640px){ .br-stat-grid { grid-template-columns:repeat(3,1fr); } }
        .br-process-row { display:grid; grid-template-columns:1fr; gap:2px; }
        @media(min-width:768px){ .br-process-row { grid-template-columns:1fr 1fr; min-height:500px; } }
        .br-section { padding:8vh 6vw; }
        @media(min-width:768px){ .br-section { padding:14vh 8vw; } }
        .br-cta-pad { padding:3rem 1.5rem; }
        @media(min-width:768px){ .br-cta-pad { padding:8rem 6rem; } }
        .br-phil-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem 5rem; }
        .br-diff-grid { display:grid; grid-template-columns:1fr 1fr; }
      `}</style>

      <Header />

      <main style={{ backgroundColor:'#000000', color:'#ffffff', fontFamily:'var(--font-montserrat)', overflowX:'hidden' }}>

        {/* ══ HERO ══ */}
        <section style={{ position:'relative', minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:'120px 6vw 60px' }}>
          <div className="br-orb br-orb-1"/>
          <div className="br-orb br-orb-2"/>
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.4 }}/>
          <div style={{ position:'absolute', inset:0, zIndex:1, background:'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,30,30,.4) 0%, transparent 70%), #000000' }}/>
          <div style={{ position:'relative', zIndex:3, textAlign:'center', maxWidth:1280, width:'100%' }}>
            <p style={{ fontWeight:200, fontSize:'clamp(.65rem,1.2vw,.8rem)', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', opacity:0, animation:'br-fadeUp 1s ease .3s forwards', marginBottom:'1.5rem' }}>
              Enhanccee — Branding &amp; Identity
            </p>
            <h1 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,5rem)', lineHeight:1.1, color:'#ffffff', opacity:0, animation:'br-fadeUp 1.1s ease .6s forwards', marginBottom:'1.2rem' }}>
              Crafting Brands<br />That <em style={{ fontStyle:'normal', fontWeight:300 }}>Rise Above</em><br />the Noise
            </h1>
            <p style={{ fontWeight:200, fontSize:'clamp(.85rem,1.5vw,1.1rem)', lineHeight:1.8, color:'rgba(255,255,255,.55)', maxWidth:900, margin:'0 auto 2.5rem', opacity:0, animation:'br-fadeUp 1.1s ease .9s forwards' }}>
              Brands are not built by visibility alone. They are built by identity. At Enhanccee, we design brand identities and strategic brand foundations that transform businesses into recognisable market authorities.
            </p>
            <div style={{ opacity:0, animation:'br-fadeUp 1.1s ease 1.1s forwards' }}>
              <Link href="/contact" className="br-btn-white"><span>Begin Your Identity</span></Link>
            </div>
          </div>
        </section>

        {/* ══ BANNER 1 ══ */}
        <FadeIn>
          <div className="br-img-banner" style={{ height:'clamp(280px,45vh,700px)' }}>
            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1800&q=80&fit=crop&crop=center" alt="Abstract luxury visual identity" loading="lazy"/>
            <span className="br-img-caption">Identity is felt before it is seen</span>
          </div>
        </FadeIn>

        {/* ══ PHILOSOPHY (white bg) ══ */}
        <section className="br-section" style={{ background:'#ffffff' }}>
          <Divider mb="4rem" isWhite={true}/>
          <FadeIn><p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(0,0,0,.5)', marginBottom:'2.5rem' }}>The Philosophy</p></FadeIn>
          <FadeIn>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,5vw,6rem)', lineHeight:1.1, color:'#000000', marginBottom:'3rem' }}>
              We don&apos;t design logos.<br />We build <em style={{ fontStyle:'italic', color:'rgba(0,0,0,.7)' }}>brand universes.</em>
            </h2>
          </FadeIn>
          <FadeIn>
            <p style={{ fontSize:'clamp(.9rem,1.35vw,1.15rem)', lineHeight:1.95, color:'rgba(0,0,0,.58)', fontWeight:200, marginBottom:'3rem', maxWidth:980 }}>
              A powerful brand is not a single design asset. It is a complete identity system that influences how people perceive, trust, and connect with your business. Every element is engineered to create consistency, emotional resonance, and long-term brand equity.
            </p>
          </FadeIn>

          {isMobile ? (
            <MobileSlider items={philItems} renderItem={(b, i) => (
              <div style={{ padding:'2rem 0' }}>
                <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'4rem', color:'rgba(0,0,0,.15)', lineHeight:1, marginBottom:'1rem', fontWeight:300 }}>{b.n}</div>
                <p style={{ fontSize:'clamp(.9rem,1.4vw,1.1rem)', lineHeight:1.9, color:'rgba(0,0,0,.55)', fontWeight:200 }}>
                  <strong style={{ color:'#000000', fontWeight:400 }}>{b.strong}</strong> {b.body}
                </p>
              </div>
            )}/>
          ) : (
            <div className="br-phil-grid">
              {philItems.map((b, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div>
                    <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'4rem', color:'rgba(0,0,0,.15)', lineHeight:1, marginBottom:'1rem', fontWeight:300 }}>{b.n}</div>
                    <p style={{ fontSize:'clamp(.9rem,1.4vw,1.1rem)', lineHeight:1.9, color:'rgba(0,0,0,.55)', fontWeight:200 }}>
                      <strong style={{ color:'#000000', fontWeight:400 }}>{b.strong}</strong> {b.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </section>

        {/* ══ BANNER 2 SPLIT ══ */}
        <div className="br-2col" style={{ background:'rgba(255,255,255,.1)' }}>
          <FadeIn>
            <div className="br-img-banner" style={{ height:'clamp(240px,38vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=1200&q=80&fit=crop" alt="Brand strategy session" loading="lazy"/>
              <span className="br-img-caption">Brand Strategy</span>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="br-img-banner" style={{ height:'clamp(240px,38vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&fit=crop" alt="Visual identity" loading="lazy"/>
              <span className="br-img-caption">Visual Identity</span>
            </div>
          </FadeIn>
        </div>

        {/* ══ ECOSYSTEM ══ */}
        <section className="br-section" style={{ background:'#000000' }}>
          <Divider mb="5rem" isWhite={false}/>
          <div style={{ textAlign:'center', marginBottom:'4rem' }}>
            <FadeIn><span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:'1.5rem' }}>What We Deliver</span></FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>
                Your Complete<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Branding Ecosystem</em>
              </h2>
            </FadeIn>
          </div>
          <div className="br-2col" style={{ background:'rgba(255,255,255,.08)' }}>
            {[
              { num:'I', tag:'Foundation', title:'Brand Strategy\n& Foundation', body:'The architecture beneath every iconic brand. We establish purpose, values, positioning, archetype, and audience clarity — so every future decision builds on truth.', tags:['Purpose','Positioning','Archetype','Personality','Audience Clarity'] },
              { num:'II', tag:'Visual', title:'Visual Identity\nSystems', body:'Design that communicates authority. From logo design and typography systems to colour psychology, visual frameworks, and brand guidelines.', tags:['Logo Design','Typography','Colour Psychology','Guidelines'] },
              { num:'III', tag:'Expression', title:'Communication\n& Voice', body:'Brands speak long before they sell. We design brand voice, storytelling frameworks, messaging systems, and communication guidelines.', tags:['Brand Voice','Storytelling','Messaging','Communication'] },
              { num:'IV', tag:'Activation', title:'Brand in Action', body:'A brand is only powerful when it is experienced everywhere. We translate identity into digital platforms, marketing assets, websites, and campaigns.', tags:['Websites','Campaigns','Assets','Touchpoints'] },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="br-eco-card">
                  <span className="br-eco-num">{card.num}</span>
                  <p style={{ fontSize:'.62rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1rem' }}>{card.tag}</p>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.6rem,2.8vw,2.8rem)', color:'#ffffff', marginBottom:'1.2rem', lineHeight:1.2, whiteSpace:'pre-line' }}>{card.title}</h3>
                  <p style={{ fontSize:'.88rem', lineHeight:1.85, color:'rgba(255,255,255,.5)', fontWeight:200 }}>{card.body}</p>
                  <div style={{ marginTop:'1.5rem', display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
                    {card.tags.map((t, j) => <span key={j} className="br-tag-item">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══ PROCESS ROW ══ */}
        <FadeIn>
          <div className="br-process-row" style={{ background:'rgba(0,0,0,.08)' }}>
            <div style={{ position:'relative', overflow:'hidden', minHeight:280 }}>
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&fit=crop" alt="Creative brand design process" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.6)', display:'block', position:'absolute', inset:0 }}/>
            </div>
            <div style={{ background:'#ffffff', padding:'3rem 2rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <span style={{ fontSize:'.65rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(0,0,0,.4)', marginBottom:'1.5rem' }}>The Enhanccee Process</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(1.8rem,3.5vw,4rem)', lineHeight:1.15, color:'#000000', marginBottom:'1.5rem' }}>
                Intention<br />at <em style={{ fontStyle:'italic', color:'rgba(0,0,0,.65)' }}>every stage</em>
              </h2>
              <p style={{ fontSize:'.9rem', lineHeight:1.9, color:'rgba(0,0,0,.5)', fontWeight:200, marginBottom:'1.5rem' }}>
                Brand leadership is never accidental. It is built through deliberate progression.
              </p>
              <div style={{ display:'grid', gap:'.8rem' }}>
                {[
                  '01 Discovery — Deep research into market landscape, audience psychology, and brand perception.',
                  '02 Positioning — Defining your brand strategy, identity direction, and competitive positioning.',
                  '03 Design — Crafting the visual identity system, brand assets, and creative frameworks.',
                  '04 Activation — Deploying brand identity across websites, marketing channels, and platforms.',
                  '05 Evolution — Refining and expanding the brand as it grows.',
                ].map((step, idx) => (
                  <p key={idx} style={{ margin:0, fontSize:'.83rem', lineHeight:1.75, color:'rgba(0,0,0,.62)', fontWeight:300 }}>{step}</p>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ══ BANNER 3 ══ */}
        <FadeIn>
          <div className="br-img-banner" style={{ height:'clamp(220px,35vh,540px)' }}>
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1800&q=80&fit=crop" alt="Premium creative studio" loading="lazy"/>
            <span className="br-img-caption">Where strategy becomes sensation</span>
          </div>
        </FadeIn>

        {/* ══ STATS (white bg) ══ */}
        <section className="br-section" style={{ position:'relative', overflow:'hidden', background:'#ffffff' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(240,240,240,.4) 0%, transparent 70%)', animation:'br-breathe 8s ease-in-out infinite', pointerEvents:'none' }}/>
          <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.4rem,6vw,6.5rem)', lineHeight:1.05, textAlign:'center', color:'#000000', marginBottom:'3rem' }}>
                Luxury Begins<br /><em style={{ fontStyle:'italic', color:'rgba(0,0,0,.65)' }}>with Identity</em>
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p style={{ fontSize:'clamp(.9rem,1.6vw,1.3rem)', lineHeight:1.9, color:'rgba(0,0,0,.5)', textAlign:'center', fontWeight:200, marginBottom:'4rem' }}>
                <strong style={{ color:'#000000' }}>Luxury is not decoration. It is precision in identity.</strong>
              </p>
            </FadeIn>
            <div className="br-stat-grid" style={{ background:'rgba(0,0,0,.08)', marginTop:'3rem' }}>
              {[
                { word:'Precision', sub:'Over Decoration' },
                { word:'Clarity', sub:'Over Noise' },
                { word:'Distinction', sub:'Over Trends' },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div style={{ background:'#ffffff', padding:'2.5rem 1.5rem', textAlign:'center', border:'1px solid rgba(0,0,0,.1)' }}>
                    <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.3rem,2vw,1.6rem)', fontWeight:400, color:'#000000', display:'block', marginBottom:'.5rem' }}>{s.word}</span>
                    <span style={{ fontSize:'.72rem', letterSpacing:'.15em', color:'rgba(0,0,0,.4)', textTransform:'uppercase', fontWeight:200 }}>{s.sub}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BANNER TRIO ══ */}
        <div className="br-3col" style={{ background:'rgba(255,255,255,.08)' }}>
          {[
            { src:'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80&fit=crop', cap:'Brand Collateral' },
            { src:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&fit=crop', cap:'Typography' },
            { src:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80&fit=crop', cap:'Brand in Action' },
          ].map((img, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="br-img-banner" style={{ height:'clamp(200px,32vh,460px)' }}>
                <img src={img.src} alt={img.cap} loading="lazy"/>
                <span className="br-img-caption">{img.cap}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ══ DIFFERENTIATORS ══ */}
        <section className="br-section" style={{ background:'#000000' }}>
          <Divider mb="4rem" isWhite={false}/>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>
                Built to Be<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Inevitable</em>
              </h2>
            </FadeIn>
          </div>

          {isMobile ? (
            <MobileSliderDark items={diffItems} renderItem={(d, i) => (
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
            <div className="br-diff-grid" style={{ maxWidth:1200, margin:'4rem auto 0' }}>
              {diffItems.map((d, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="br-diff-item">
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
          <div className="br-process-row" style={{ background:'rgba(0,0,0,.08)' }}>
            <div style={{ background:'#ffffff', padding:'3rem 2rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(1.8rem,3.5vw,4rem)', lineHeight:1.15, color:'#000000', marginBottom:'1.5rem' }}>
                Brands that feel<br /><em style={{ fontStyle:'italic', color:'rgba(0,0,0,.65)' }}>inevitable</em>
              </h2>
              <p style={{ fontSize:'.9rem', lineHeight:1.9, color:'rgba(0,0,0,.5)', fontWeight:200 }}>When emotion, strategy, and design align, identity becomes powerful. A brand that people recognise instantly. Trust naturally. Remember permanently.</p>
            </div>
            <div style={{ position:'relative', overflow:'hidden', minHeight:280 }}>
              <img src="https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&q=80&fit=crop" alt="Elevated premium brand environment" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.6)', display:'block', position:'absolute', inset:0 }}/>
            </div>
          </div>
        </FadeIn>

        {/* ══ SIGNATURE QUOTE ══ */}
        <section className="br-section" style={{ position:'relative', overflow:'hidden', textAlign:'center', background:'#000000' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(25,25,25,.4) 0%, transparent 70%)', animation:'br-breathe 10s ease-in-out infinite alternate', pointerEvents:'none' }}/>
          <FadeIn delay={100}>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,6.5vw,7.5rem)', lineHeight:1.1, color:'#ffffff', maxWidth:1280, margin:'0 auto 2rem', position:'relative', zIndex:1 }}>
              When emotion<br />and function align,<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>identity is born.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ width:200, height:1, background:'linear-gradient(to right, transparent, rgba(255,255,255,.3), transparent)', margin:'0 auto', position:'relative', zIndex:1 }}/>
          </FadeIn>
        </section>

        {/* ══ BANNER 5 ══ */}
        <FadeIn>
          <div className="br-img-banner" style={{ height:'clamp(180px,24vh,360px)' }}>
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1800&q=80&fit=crop" alt="Luxury brand discovery" loading="lazy"/>
            <span className="br-img-caption">Where vision meets identity</span>
          </div>
        </FadeIn>

        {/* ══ CTA ══ */}
        <section className="br-section" style={{ background:'#000000' }}>
          <FadeIn>
            <div style={{ background:'rgba(10,10,10,.9)', border:'1px solid rgba(255,255,255,.1)', backdropFilter:'blur(20px)', textAlign:'center', position:'relative', overflow:'hidden', maxWidth:1100, margin:'0 auto' }} className="br-cta-pad">
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(255,255,255,.3), transparent)' }}/>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.1, marginBottom:'1.5rem', position:'relative', zIndex:1 }}>
                Your brand identity is<br />your <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>future</em>
              </h2>
              <p style={{ fontSize:'clamp(.85rem,1.3vw,1.1rem)', color:'rgba(255,255,255,.45)', fontWeight:200, lineHeight:1.8, maxWidth:600, margin:'0 auto 3rem', position:'relative', zIndex:1 }}>A brand that people recognise instantly. Trust naturally. Remember permanently.</p>
              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', position:'relative', zIndex:1 }}>
                <Link href="/contact" className="br-btn-white"><span>Begin Your Identity</span></Link>
                <Link href="/clientele" className="br-btn-ghost">View Our Work</Link>
              </div>
            </div>
          </FadeIn>
        </section>

      </main>

      <Footer />
    </>
  )
}
