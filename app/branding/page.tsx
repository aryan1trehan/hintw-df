'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ─── REUSABLE: SCROLL REVEAL WRAPPER ─── */
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

/* ─── GOLD DIVIDER → WHITE DIVIDER ─── */
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

export default function BrandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  /* ─── CURSOR ─── */
  useEffect(() => {
    const dot = document.getElementById('br-dot')
    const ring = document.getElementById('br-ring')
    if (!dot || !ring) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove);
    (function loop() {
      rx += (mx - rx) * .12; ry += (my - ry) * .12
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      requestAnimationFrame(loop)
    })()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <style>{`
        @keyframes br-fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes br-orbFloat { 0%,100%{transform:translate(0,0)scale(1)} 33%{transform:translate(30px,-20px)scale(1.05)} 66%{transform:translate(-20px,15px)scale(.97)} }
        @keyframes br-breathe { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        .br-btn-white { display:inline-block; padding:1rem 2.8rem; border:1px solid rgba(255,255,255,0.6); color:#ffffff; font-size:.8rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; position:relative; overflow:hidden; transition:color .4s; }
        .br-btn-white::before { content:''; position:absolute; inset:0; background:#ffffff; transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.77,0,.175,1); }
        .br-btn-white:hover::before { transform:scaleX(1); }
        .br-btn-white:hover span { color:#000000 !important; }
        .br-btn-white span { position:relative; z-index:1; }
        .br-btn-ghost { display:inline-block; padding:1rem 2.8rem; color:rgba(255,255,255,.6); font-size:.8rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(255,255,255,.15); transition:all .4s; }
        .br-btn-ghost:hover { border-color:rgba(255,255,255,.5); color:#ffffff; }
        .br-img-banner { width:100%; position:relative; overflow:hidden; display:block; line-height:0; }
        .br-img-banner img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.45) saturate(.5); transition:transform 8s ease, filter .6s; }
        .br-img-banner:hover img { transform:scale(1.03); filter:brightness(.55) saturate(.6); }
        .br-img-banner::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.05) 50%, rgba(0,0,0,.45) 100%); pointer-events:none; }
        .br-img-caption { position:absolute; bottom:2.5rem; left:3rem; z-index:2; font-size:.68rem; letter-spacing:.3em; text-transform:uppercase; color:rgba(255,255,255,.4); }
        .br-eco-card { background:#0a0a0a; padding:5rem 4rem; position:relative; overflow:hidden; transition:background .5s; }
        .br-eco-card:hover { background:#111111; }
        .br-eco-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(to right, transparent, #ffffff, transparent); opacity:0; transition:opacity .5s; }
        .br-eco-card:hover::before { opacity:1; }
        .br-eco-num { font-family:var(--font-cormorant),serif; font-size:7rem; font-weight:300; color:rgba(255,255,255,.15); position:absolute; top:1rem; right:2rem; pointer-events:none; transition:color .5s; }
        .br-eco-card:hover .br-eco-num { color:rgba(255,255,255,.25); }
        .br-tag-item { font-size:.72rem; padding:.3rem .8rem; border:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.45); transition:all .3s; display:inline-block; }
        .br-eco-card:hover .br-tag-item { border-color:rgba(255,255,255,.3); color:rgba(255,255,255,.75); }
        .br-diff-item { padding:4rem; border-bottom:1px solid rgba(255,255,255,.06); border-right:1px solid rgba(255,255,255,.06); position:relative; overflow:hidden; }
        .br-diff-item:nth-child(even) { border-right:none; }
        .br-diff-item:nth-last-child(-n+2) { border-bottom:none; }
        .br-diff-item::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,.02); opacity:0; transition:opacity .4s; }
        .br-diff-item:hover::after { opacity:1; }
        .br-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:1; }
        .br-orb-1 { width:500px; height:500px; background:rgba(40,40,40,.5); top:-100px; left:-150px; animation:br-orbFloat 12s ease-in-out infinite; }
        .br-orb-2 { width:400px; height:400px; background:rgba(255,255,255,.04); bottom:-80px; right:-100px; animation:br-orbFloat 12s ease-in-out infinite; animation-delay:-6s; }
        .br-orb-3 { width:300px; height:300px; background:rgba(30,30,30,.5); top:50%; right:10%; animation:br-orbFloat 12s ease-in-out infinite; animation-delay:-3s; }
      `}</style>

      {/* Custom cursor */}
      <div id="br-dot" style={{ position:'fixed', width:10, height:10, background:'#ffffff', borderRadius:'50%', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', mixBlendMode:'difference' }}/>
      <div id="br-ring" style={{ position:'fixed', width:36, height:36, border:'1px solid rgba(255,255,255,.3)', borderRadius:'50%', pointerEvents:'none', zIndex:9998, transform:'translate(-50%,-50%)' }}/>

      <Header />

      <main style={{ backgroundColor:'#000000', color:'#ffffff', fontFamily:'var(--font-montserrat)', cursor:'none' }}>

        {/* ══════════════ HERO ══════════════ */}
        <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:'0 6vw' }}>
          <div className="br-orb br-orb-1"/>
          <div className="br-orb br-orb-2"/>
          <div className="br-orb br-orb-3"/>
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.4 }}/>
          {/* Overlay */}
          <div style={{ position:'absolute', inset:0, zIndex:1, background:'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,30,30,.4) 0%, transparent 70%), #000000' }}/>
          {/* Noise */}
          <div style={{ position:'absolute', inset:0, opacity:.03, zIndex:2, pointerEvents:'none', backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}/>

          {/* Content */}
          <div style={{ position:'relative', zIndex:3, textAlign:'center', maxWidth:1280 }}>
            <p style={{ fontWeight:200, fontSize:'clamp(.65rem,1.2vw,.8rem)', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', opacity:0, animation:'br-fadeUp 1s ease .3s forwards', marginBottom:'2rem' }}>
              Enhanccee — Branding &amp; Identity
            </p>
            <h1 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,4vw,5rem)', lineHeight:1, color:'#ffffff', opacity:0, animation:'br-fadeUp 1.1s ease .6s forwards', marginBottom:'1.2rem' }}>
              Crafting Brands<br />That <em style={{ fontStyle:'normal', fontWeight:300, color:'#ffffff' }}>Rise Above</em><br />the Noise
            </h1>
            <p style={{ fontWeight:200, fontSize:'clamp(.9rem,1.5vw,1.1rem)', lineHeight:1.8, color:'rgba(255,255,255,.55)', maxWidth:1000, margin:'0 auto 3.5rem', opacity:0, animation:'br-fadeUp 1.1s ease .9s forwards' }}>
              Brands are not built by visibility alone. They are built by identity. At Enhanccee, we design brand identities, brand positioning systems, and strategic brand foundations that transform businesses into recognisable market authorities. Because the brands that dominate markets are not simply seen — they are experienced, remembered, and trusted. Your logo is not your brand. Your brand identity, visual language, and strategic positioning are what shape perception, influence decisions, and define how the world remembers you.
            </p>
            <div style={{ opacity:0, animation:'br-fadeUp 1.1s ease 1.1s forwards', display:'inline-flex', gap:'1.5rem', alignItems:'center' }}>
              <Link href="/contact" className="br-btn-white"><span>Begin Your Identity</span></Link>
            </div>
          </div>

        </section>

        {/* ══════════════ BANNER 1 ══════════════ */}
        <FadeIn>
          <div className="br-img-banner" style={{ height:'clamp(400px,58vh,700px)' }}>
            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1800&q=80&fit=crop&crop=center" alt="Abstract luxury visual identity" loading="lazy"/>
            <span className="br-img-caption">Identity is felt before it is seen</span>
          </div>
        </FadeIn>

        {/* ══════════════ PHILOSOPHY ══════════════ */}
        <section style={{ padding:'14vh 8vw', background:'#ffffff', transition:'background 0.6s ease' }}>
          <Divider mb="6rem" isWhite={true}/>
          <FadeIn>
            <p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(0,0,0,.5)', marginBottom:'4rem' }}>The Philosophy</p>
          </FadeIn>
          <FadeIn>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.4rem,5.5vw,6rem)', lineHeight:1.1, color:'#000000', marginBottom:'5rem' }}>
              We don&apos;t design logos.<br />We build <em style={{ fontStyle:'italic', color:'rgba(0,0,0,.7)' }}>brand universes.</em>
            </h2>
          </FadeIn>
          <FadeIn>
            <p style={{ fontSize:'clamp(1rem,1.35vw,1.15rem)', lineHeight:1.95, color:'rgba(0,0,0,.58)', fontWeight:200, marginBottom:'4rem', maxWidth:980 }}>
              A powerful brand is not a single design asset. It is a complete identity system that influences how people perceive, trust, and connect with your business. At Enhanccee, branding begins with strategic clarity and evolves into a fully realised brand ecosystem. Every element — from brand strategy and brand positioning to visual identity and communication design — is engineered to create consistency, emotional resonance, and long-term brand equity. Because true branding does not chase trends. It builds timeless market presence.
            </p>
          </FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem 8rem' }}>
            {[
              { n:'01', strong:'Identity ecosystems aligned with your vision.', body:'Every branding decision is intentionally engineered to reinforce who you are and how your market remembers you.' },
              { n:'02', strong:'Emotion comes before conviction.', body:'Trust begins with feeling. We design identities that connect emotionally before they communicate rationally.' },
              { n:'03', strong:'No templates. No shortcuts.', body:'No recycled playbooks. No decorative branding. Only intentional systems designed to elevate perception and authority.' },
              { n:'04', strong:'Timeless market presence.', body:'Because true branding does not chase trends. It builds consistency, recall, and long-term brand equity.' },
            ].map((b, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div>
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'5rem', color:'rgba(0,0,0,.15)', lineHeight:1, marginBottom:'1.5rem', fontWeight:300 }}>{b.n}</div>
                  <p style={{ fontSize:'clamp(1rem,1.4vw,1.15rem)', lineHeight:1.9, color:'rgba(0,0,0,.55)', fontWeight:200 }}>
                    <strong style={{ color:'#000000', fontWeight:400 }}>{b.strong}</strong> {b.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══════════════ BANNER 2 — SPLIT ══════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.1)' }}>
          <FadeIn>
            <div className="br-img-banner" style={{ height:'clamp(300px,44vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=1200&q=80&fit=crop" alt="Brand strategy session" loading="lazy"/>
              <span className="br-img-caption">Brand Strategy</span>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="br-img-banner" style={{ height:'clamp(300px,44vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&fit=crop" alt="Visual identity exploration" loading="lazy"/>
              <span className="br-img-caption">Visual Identity</span>
            </div>
          </FadeIn>
        </div>

        {/* ══════════════ ECOSYSTEM ══════════════ */}
        <section style={{ padding:'14vh 8vw', background:'#000000', transition:'background 0.6s ease' }}>
          <Divider mb="8rem" isWhite={false}/>
          <div style={{ textAlign:'center', marginBottom:'8rem' }}>
            <FadeIn><span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:'1.5rem' }}>What We Deliver</span></FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>
                Your Complete<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Branding Ecosystem</em>
              </h2>
            </FadeIn>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.08)' }}>
            {[
              { num:'I', tag:'Foundation', title:'Brand Strategy\n& Foundation', body:'The architecture beneath every iconic brand. We establish purpose, values, positioning, archetype, and audience clarity — so every future decision builds on truth.', tags:['Purpose','Positioning','Archetype','Personality','Audience Clarity'] },
              { num:'II', tag:'Visual', title:'Visual Identity\nSystems', body:'Design that communicates authority. From logo design and typography systems to colour psychology, visual frameworks, and brand guidelines, we craft identities that remain instantly recognisable across every platform.', tags:['Logo Design','Typography','Colour Psychology','Guidelines'] },
              { num:'III', tag:'Expression', title:'Communication\n& Voice', body:'Brands speak long before they sell. We design brand voice, storytelling frameworks, messaging systems, and communication guidelines that shape how your brand sounds, feels, and connects with your audience.', tags:['Brand Voice','Storytelling','Messaging','Communication'] },
              { num:'IV', tag:'Activation', title:'Brand in Action', body:'A brand is only powerful when it is experienced everywhere. We translate identity into digital platforms, marketing assets, websites, campaigns, and brand experiences that ensure your presence remains consistent across every touchpoint.', tags:['Websites','Campaigns','Assets','Touchpoints'] },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="br-eco-card">
                  <span className="br-eco-num">{card.num}</span>
                  <p style={{ fontSize:'.65rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.5rem' }}>{card.tag}</p>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.8rem,2.8vw,2.8rem)', color:'#ffffff', marginBottom:'1.8rem', lineHeight:1.2, whiteSpace:'pre-line' }}>{card.title}</h3>
                  <p style={{ fontSize:'.9rem', lineHeight:1.85, color:'rgba(255,255,255,.5)', fontWeight:200 }}>{card.body}</p>
                  <div style={{ marginTop:'2rem', display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
                    {card.tags.map((t, j) => <span key={j} className="br-tag-item">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={100}>
            <p style={{ textAlign:'center', marginTop:'6rem', fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.3rem,2.5vw,2rem)', fontStyle:'italic', color:'rgba(255,255,255,.5)', fontWeight:300 }}>
              Every element designed to work together — <em style={{ color:'rgba(255,255,255,.8)', fontStyle:'normal' }}>strategically, visually, and emotionally.</em>
            </p>
          </FadeIn>
        </section>

        {/* ══════════════ IMAGE + TEXT ROW — PROCESS ══════════════ */}
        <FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(0,0,0,.08)', minHeight:500 }}>
            <div style={{ position:'relative', overflow:'hidden' }}>
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&fit=crop" alt="Creative brand design process" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.6)', display:'block' }}/>
            </div>
            <div style={{ background:'#ffffff', padding:'6rem 5rem', display:'flex', flexDirection:'column', justifyContent:'center', transition:'background 0.6s ease' }}>
              <span style={{ fontSize:'.68rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(0,0,0,.4)', marginBottom:'1.8rem' }}>Process Section</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,3.5vw,4rem)', lineHeight:1.15, color:'#000000', marginBottom:'2rem' }}>
                Intention<br />at <em style={{ fontStyle:'italic', color:'rgba(0,0,0,.65)' }}>every stage</em>
              </h2>
              <p style={{ fontSize:'.95rem', lineHeight:1.9, color:'rgba(0,0,0,.5)', fontWeight:200, marginBottom:'2rem' }}>
                Brand leadership is never accidental. It is built through deliberate progression. Our branding methodology combines brand strategy, creative design systems, and market positioning to ensure every decision strengthens long-term brand equity.
              </p>
              <div style={{ display:'grid', gap:'1rem' }}>
                {[
                  '01 Discovery — Deep research into market landscape, audience psychology, and brand perception to uncover strategic opportunities.',
                  '02 Positioning — Defining your brand strategy, identity direction, and competitive positioning to establish a clear market identity.',
                  '03 Design — Crafting the visual identity system, brand assets, and creative frameworks that translate strategy into powerful design.',
                  '04 Activation — Deploying brand identity across websites, marketing channels, digital platforms, and communication touchpoints.',
                  '05 Evolution — Refining and expanding the brand as it grows — ensuring long-term consistency, authority, and scalability.',
                ].map((step, idx) => (
                  <p key={idx} style={{ margin:0, fontSize:'.87rem', lineHeight:1.75, color:'rgba(0,0,0,.62)', fontWeight:300 }}>{step}</p>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ══════════════ BANNER 3 ══════════════ */}
        <FadeIn>
          <div className="br-img-banner" style={{ height:'clamp(300px,42vh,540px)' }}>
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1800&q=80&fit=crop" alt="Premium creative studio workspace" loading="lazy"/>
            <span className="br-img-caption">Where strategy becomes sensation</span>
          </div>
        </FadeIn>

        {/* ══════════════ PHILOSOPHY STATS ══════════════ */}
        <section style={{ padding:'16vh 8vw', position:'relative', overflow:'hidden', background:'#ffffff', transition:'background 0.6s ease' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(240,240,240,.4) 0%, transparent 70%)', animation:'br-breathe 8s ease-in-out infinite', pointerEvents:'none' }}/>
          <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
            <FadeIn>
              <p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(0,0,0,.4)', marginBottom:'4rem', textAlign:'center' }}>Luxury Begins with Identity</p>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.8rem,6vw,6.5rem)', lineHeight:1.05, textAlign:'center', color:'#000000', marginBottom:'5rem' }}>
                Luxury Begins<br /><em style={{ fontStyle:'italic', color:'rgba(0,0,0,.65)' }}>with Identity</em>
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p style={{ fontSize:'clamp(1.1rem,1.6vw,1.3rem)', lineHeight:1.9, color:'rgba(0,0,0,.5)', textAlign:'center', fontWeight:200, marginBottom:'5rem' }}>
                Luxury brands are never accidental.<br />
                They are intentionally designed to communicate exclusivity, clarity, and distinction.<br />
                At Enhanccee, we craft premium brand identities, luxury brand positioning systems, and refined design frameworks that elevate perception and create lasting brand equity.<br />
                Because luxury is not decoration. <strong style={{ color:'#000000' }}>It is precision in identity.</strong>
              </p>
            </FadeIn>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(0,0,0,.08)', marginTop:'4rem' }}>
              {[
                { word:'Precision', sub:'Over Decoration' },
                { word:'Clarity', sub:'Over Noise' },
                { word:'Distinction', sub:'Over Trends' },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div style={{ background:'#ffffff', padding:'3rem 2rem', textAlign:'center', border:'1px solid rgba(0,0,0,.1)' }}>
                    <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.6rem', fontWeight:400, color:'#000000', display:'block', marginBottom:'.5rem' }}>{s.word}</span>
                    <span style={{ fontSize:'.75rem', letterSpacing:'.15em', color:'rgba(0,0,0,.4)', textTransform:'uppercase', fontWeight:200 }}>{s.sub}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ BANNER 4 — TRIO ══════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:2, background:'rgba(255,255,255,.08)' }}>
          {[
            { src:'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80&fit=crop', cap:'Brand Collateral' },
            { src:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&fit=crop', cap:'Typography' },
            { src:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80&fit=crop', cap:'Brand in Action' },
          ].map((img, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="br-img-banner" style={{ height:'clamp(260px,38vh,460px)' }}>
                <img src={img.src} alt={img.cap} loading="lazy"/>
                <span className="br-img-caption">{img.cap}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ══════════════ DIFFERENTIATORS ══════════════ */}
        <section style={{ padding:'14vh 8vw', background:'#000000', transition:'background 0.6s ease' }}>
          <Divider mb="6rem" isWhite={false}/>
          <div style={{ textAlign:'center', marginBottom:'4rem' }}>
            <FadeIn><span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', display:'block', marginBottom:'1.5rem' }}>Differentiation Section</span></FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.15 }}>
                Built to Be<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Inevitable</em>
              </h2>
            </FadeIn>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', maxWidth:1200, margin:'6rem auto 0' }}>
              {[
                { vs:'Built to Be', h:'Inevitable', p:'Our approach to branding is designed for longevity and influence, not short-term aesthetics.' },
                { vs:'Not Trend-led', h:'Not Decorative', p:'Every identity system is engineered to strengthen recognition, authority, and brand recall — not surface-level aesthetics.' },
                { vs:'Not Temporary', h:'Across All Markets', p:'Designed to remain consistent and influential across evolving markets, channels, and platforms.' },
                { vs:'Engineered', h:'to command attention', p:'Because the strongest brands do not compete for attention. They command it.' },
              ].map((d, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="br-diff-item">
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

        {/* ══════════════ IMAGE + TEXT ROW REVERSED ══════════════ */}
        <FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(0,0,0,.08)', minHeight:500 }}>
            <div style={{ background:'#ffffff', padding:'6rem 5rem', display:'flex', flexDirection:'column', justifyContent:'center', transition:'background 0.6s ease' }}>
              <span style={{ fontSize:'.68rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(0,0,0,.4)', marginBottom:'1.8rem' }}>Closing Section</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,3.5vw,4rem)', lineHeight:1.15, color:'#000000', marginBottom:'2rem' }}>
                Brands that feel<br /><em style={{ fontStyle:'italic', color:'rgba(0,0,0,.65)' }}>inevitable</em>
              </h2>
              <p style={{ fontSize:'.95rem', lineHeight:1.9, color:'rgba(0,0,0,.5)', fontWeight:200 }}>When emotion, strategy, and design align, identity becomes powerful. It moves beyond visuals and becomes a living presence within the market. A brand that people recognise instantly. Trust naturally. Remember permanently.</p>
            </div>
            <div style={{ position:'relative', overflow:'hidden' }}>
              <img src="https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&q=80&fit=crop" alt="Elevated premium brand environment" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.6)', display:'block' }}/>
            </div>
          </div>
        </FadeIn>

        {/* ══════════════ SIGNATURE QUOTE ══════════════ */}
        <section style={{ padding:'20vh 8vw', position:'relative', overflow:'hidden', textAlign:'center', background:'#000000', transition:'background 0.6s ease' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(25,25,25,.4) 0%, transparent 70%)', animation:'br-breathe 10s ease-in-out infinite alternate', pointerEvents:'none' }}/>
          <FadeIn>
            <p style={{ fontSize:'.7rem', letterSpacing:'.45em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', marginBottom:'4rem', position:'relative', zIndex:1 }}>When emotion and function align</p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,6.5vw,7.5rem)', lineHeight:1.1, color:'#ffffff', maxWidth:1280, margin:'0 auto 3rem', position:'relative', zIndex:1 }}>
                When emotion<br />and function align,<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>identity is born.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ width:200, height:1, background:'linear-gradient(to right, transparent, rgba(255,255,255,.3), transparent)', margin:'0 auto', position:'relative', zIndex:1 }}/>
          </FadeIn>
        </section>

        {/* ══════════════ BANNER 5 ══════════════ */}
        <FadeIn>
          <div className="br-img-banner" style={{ height:'clamp(200px,28vh,360px)' }}>
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1800&q=80&fit=crop" alt="Luxury brand discovery consultation" loading="lazy"/>
            <span className="br-img-caption">Where vision meets identity</span>
          </div>
        </FadeIn>

        {/* ══════════════ CTA ══════════════ */}
        <section style={{ padding:'14vh 8vw', background:'#000000', transition:'background 0.6s ease' }}>
          <FadeIn>
            <div style={{ background:'rgba(10,10,10,.9)', border:'1px solid rgba(0,0,0,.1)', backdropFilter:'blur(20px)', padding:'8rem 6rem', textAlign:'center', position:'relative', overflow:'hidden', maxWidth:1100, margin:'0 auto' }}>
              {/* Top line */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(0,0,0,.3), transparent)' }}/>
              {/* Radial glow */}
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,0,0,.03) 0%, transparent 60%)', pointerEvents:'none' }}/>
              <span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(0,0,0,.4)', marginBottom:'2rem', display:'block', position:'relative', zIndex:1 }}>Your brand identity is your future</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#000000', lineHeight:1.1, marginBottom:'2rem', position:'relative', zIndex:1 }}>
                Your brand identity is<br />your <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>future</em> — designed with<br />clarity, elegance, and intention.
              </h2>
              <p style={{ fontSize:'clamp(.9rem,1.3vw,1.1rem)', color:'rgba(0,0,0,.45)', fontWeight:200, lineHeight:1.8, maxWidth:600, margin:'0 auto 4rem', position:'relative', zIndex:1 }}>A brand that people recognise instantly. Trust naturally. Remember permanently.</p>
              <div style={{ display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap', position:'relative', zIndex:1 }}>
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
