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

export default function UIUXPage() {
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
    const dot = document.getElementById('ux-dot')
    const ring = document.getElementById('ux-ring')
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
        @keyframes ux-fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ux-orbFloat { 0%,100%{transform:translate(0,0)scale(1)} 33%{transform:translate(30px,-20px)scale(1.05)} 66%{transform:translate(-20px,15px)scale(.97)} }
        @keyframes ux-breathe { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        .ux-btn-white { display:inline-block; padding:1rem 2.8rem; border:1px solid rgba(255,255,255,0.6); color:#ffffff; font-size:.8rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; position:relative; overflow:hidden; transition:color .4s; }
        .ux-btn-white::before { content:''; position:absolute; inset:0; background:#ffffff; transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.77,0,.175,1); }
        .ux-btn-white:hover::before { transform:scaleX(1); }
        .ux-btn-white span { position:relative; z-index:1; }
        .ux-btn-white:hover span { color:#000 !important; }
        .ux-btn-ghost { display:inline-block; padding:1rem 2.8rem; color:rgba(255,255,255,.6); font-size:.8rem; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(255,255,255,.15); transition:all .4s; }
        .ux-btn-ghost:hover { border-color:rgba(255,255,255,.5); color:#ffffff; }
        .ux-img-banner { width:100%; position:relative; overflow:hidden; display:block; line-height:0; }
        .ux-img-banner img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.45) saturate(.5); transition:transform 8s ease, filter .6s; }
        .ux-img-banner:hover img { transform:scale(1.03); filter:brightness(.55) saturate(.6); }
        .ux-img-banner::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.05) 50%, rgba(0,0,0,.45) 100%); pointer-events:none; }
        .ux-img-caption { position:absolute; bottom:2.5rem; left:3rem; z-index:2; font-size:.68rem; letter-spacing:.3em; text-transform:uppercase; color:rgba(255,255,255,.4); }
        .ux-eco-card { background:#0a0a0a; padding:5rem 4rem; position:relative; overflow:hidden; transition:background .5s; }
        .ux-eco-card:hover { background:#111111; }
        .ux-eco-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(to right, transparent, #ffffff, transparent); opacity:0; transition:opacity .5s; }
        .ux-eco-card:hover::before { opacity:1; }
        .ux-eco-num { font-family:var(--font-cormorant),serif; font-size:7rem; font-weight:300; color:rgba(255,255,255,.15); position:absolute; top:1rem; right:2rem; pointer-events:none; transition:color .5s; }
        .ux-eco-card:hover .ux-eco-num { color:rgba(255,255,255,.25); }
        .ux-tag-item { font-size:.72rem; padding:.3rem .8rem; border:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.45); transition:all .3s; display:inline-block; }
        .ux-eco-card:hover .ux-tag-item { border-color:rgba(255,255,255,.3); color:rgba(255,255,255,.75); }
        .ux-diff-item { padding:4rem; border-bottom:1px solid rgba(255,255,255,.06); border-right:1px solid rgba(255,255,255,.06); position:relative; overflow:hidden; }
        .ux-diff-item:nth-child(even) { border-right:none; }
        .ux-diff-item:nth-last-child(-n+2) { border-bottom:none; }
        .ux-diff-item::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,.02); opacity:0; transition:opacity .4s; }
        .ux-diff-item:hover::after { opacity:1; }
        .ux-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:1; }
        .ux-orb-1 { width:500px; height:500px; background:rgba(40,40,40,.5); top:-100px; left:-150px; animation:ux-orbFloat 12s ease-in-out infinite; }
        .ux-orb-2 { width:400px; height:400px; background:rgba(255,255,255,.04); bottom:-80px; right:-100px; animation:ux-orbFloat 12s ease-in-out infinite; animation-delay:-6s; }
        .ux-orb-3 { width:300px; height:300px; background:rgba(30,30,30,.5); top:50%; right:10%; animation:ux-orbFloat 12s ease-in-out infinite; animation-delay:-3s; }
      `}</style>

      {/* Custom cursor */}
      <div id="ux-dot" style={{ position:'fixed', width:10, height:10, background:'#ffffff', borderRadius:'50%', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', mixBlendMode:'difference' }}/>
      <div id="ux-ring" style={{ position:'fixed', width:36, height:36, border:'1px solid rgba(255,255,255,.3)', borderRadius:'50%', pointerEvents:'none', zIndex:9998, transform:'translate(-50%,-50%)' }}/>

      <Header />

      <main style={{ backgroundColor:'#000000', color:'#ffffff', fontFamily:'var(--font-montserrat)', cursor:'none' }}>

        {/* ══════════════ HERO ══════════════ */}
        <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:'0 6vw' }}>
          <div className="ux-orb ux-orb-1"/>
          <div className="ux-orb ux-orb-2"/>
          <div className="ux-orb ux-orb-3"/>
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.4 }}/>
          {/* Overlay */}
          <div style={{ position:'absolute', inset:0, zIndex:1, background:'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,30,30,.4) 0%, transparent 70%), #000000' }}/>
          {/* Noise */}
          <div style={{ position:'absolute', inset:0, opacity:.03, zIndex:2, pointerEvents:'none', backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}/>

          {/* Content */}
          <div style={{ position:'relative', zIndex:3, textAlign:'center', maxWidth:1280 }}>
            <p style={{ fontWeight:200, fontSize:'clamp(.65rem,1.2vw,.8rem)', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', opacity:0, animation:'ux-fadeUp 1s ease .3s forwards', marginBottom:'2rem' }}>
              Enhanccee — UI/UX Design
            </p>
            <h1 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,4vw,5rem)', lineHeight:1, color:'#ffffff', opacity:0, animation:'ux-fadeUp 1.1s ease .6s forwards', marginBottom:'1.2rem' }}>
              Designing Experiences<br />That Feel <em style={{ fontStyle:'normal', fontWeight:300, color:'#ffffff' }}>Effortless</em><br />and Perform Exceptionally
            </h1>
            <p style={{ fontWeight:200, fontSize:'clamp(.9rem,1.5vw,1.1rem)', lineHeight:1.8, color:'rgba(255,255,255,.55)', maxWidth:980, margin:'0 auto 3.5rem', opacity:0, animation:'ux-fadeUp 1.1s ease .9s forwards' }}>
              Digital products are not remembered for features. They are remembered for how they feel to use. At Enhanccee, we craft user experience design (UX) and user interface design (UI) systems that transform digital platforms into intuitive, high-performing experiences. Because the most powerful products are not complicated. They are clear, seamless, and impossible to leave. A beautiful interface alone is not enough. True digital leadership comes from UX strategy, usability optimisation, interaction design, and conversion-focused interface systems that guide users naturally. Design should not create friction. It should create flow.
            </p>
            <div style={{ opacity:0, animation:'ux-fadeUp 1.1s ease 1.1s forwards', display:'inline-flex', gap:'1.5rem', alignItems:'center' }}>
              <Link href="/contact" className="ux-btn-white"><span>Begin Your Experience</span></Link>
            </div>
          </div>

        </section>

        {/* ══════════════ BANNER 1 ══════════════ */}
        <FadeIn>
          <div className="ux-img-banner" style={{ height:'clamp(400px,58vh,700px)' }}>
            <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1800&q=80&fit=crop&crop=center" alt="Modern UI design workspace" loading="lazy"/>
            <span className="ux-img-caption">Great experiences are designed with intention</span>
          </div>
        </FadeIn>

        {/* ══════════════ PHILOSOPHY ══════════════ */}
        <section style={{ padding:'14vh 8vw', background:'#000000', transition:'background 0.6s ease' }}>
          <Divider mb="6rem" isWhite={false}/>
          <FadeIn>
            <p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:'4rem' }}>The Philosophy</p>
          </FadeIn>
          <FadeIn>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.4rem,5.5vw,6rem)', lineHeight:1.1, color:'#ffffff', marginBottom:'5rem' }}>
              We don&apos;t just design interfaces.<br />We design <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>digital experiences.</em>
            </h2>
          </FadeIn>
          <FadeIn>
            <p style={{ fontSize:'clamp(1rem,1.35vw,1.15rem)', lineHeight:1.95, color:'rgba(255,255,255,.58)', fontWeight:200, marginBottom:'4rem', maxWidth:1020 }}>
              User experience is more than layout or aesthetics. It is the intersection of human behaviour, product strategy, and interface design. At Enhanccee, every UI/UX project begins with user research, behavioural insights, and product experience strategy before a single pixel is designed. From information architecture and interaction design to usability optimisation and responsive interface systems, every decision is engineered to improve clarity, engagement, and performance. Because great products do not confuse users. They guide them.
            </p>
          </FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem 8rem' }}>
            {[
              { n:'01', strong:'Design must reduce friction.', body:'Every interaction is engineered to simplify user decisions and remove unnecessary effort.' },
              { n:'02', strong:'Improve navigation.', body:'Clear structures and intentional pathways help users move effortlessly through every touchpoint.' },
              { n:'03', strong:'Transform complexity into simplicity.', body:'No decorative interfaces. No cluttered layouts. Only purposeful UI/UX systems built for clarity and usability.' },
              { n:'04', strong:'Built for growth.', body:'Intentional experience design that improves engagement, product performance, and long-term digital outcomes.' },
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
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.1)' }}>
          <FadeIn>
            <div className="ux-img-banner" style={{ height:'clamp(300px,44vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80&fit=crop" alt="User research and testing" loading="lazy"/>
              <span className="ux-img-caption">User Research</span>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="ux-img-banner" style={{ height:'clamp(300px,44vh,560px)' }}>
              <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80&fit=crop" alt="Interface design process" loading="lazy"/>
              <span className="ux-img-caption">Interface Design</span>
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
                Your Complete<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>UX & UI Ecosystem</em>
              </h2>
            </FadeIn>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(255,255,255,.08)' }}>
            {[
              { num:'I', tag:'Strategy', title:'UX Strategy\n& Research', body:'Great experiences start with understanding people. We conduct user research, behavioural analysis, journey mapping, and product strategy workshops to uncover how users think, navigate, and make decisions.', tags:['User Research','Behavioural Analysis','Journey Mapping','Product Strategy'] },
              { num:'II', tag:'Architecture', title:'Information Architecture\n& User Flow', body:'Clarity drives engagement. We structure information architecture, navigation frameworks, and user journey flows that help users move effortlessly through digital products.', tags:['Navigation','User Flow','Journey Design','Clarity'] },
              { num:'III', tag:'Interface', title:'Interface Design\n& Visual Systems', body:'Design should feel effortless. Through modern UI design systems, interface components, typography frameworks, and responsive layouts, we craft interfaces that balance beauty with usability.', tags:['UI Systems','Components','Typography','Responsive'] },
              { num:'IV', tag:'Performance', title:'Product Experience\nOptimization', body:'Experience does not end at launch. We refine platforms through usability testing, UX optimisation, conversion design improvements, and interface performance analysis.', tags:['Usability Testing','UX Optimisation','Conversion','Performance'] },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="ux-eco-card">
                  <span className="ux-eco-num">{card.num}</span>
                  <p style={{ fontSize:'.65rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.5rem' }}>{card.tag}</p>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:400, fontSize:'clamp(1.8rem,2.8vw,2.8rem)', color:'#ffffff', marginBottom:'1.8rem', lineHeight:1.2, whiteSpace:'pre-line' }}>{card.title}</h3>
                  <p style={{ fontSize:'.9rem', lineHeight:1.85, color:'rgba(255,255,255,.5)', fontWeight:200 }}>{card.body}</p>
                  <div style={{ marginTop:'2rem', display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
                    {card.tags.map((t, j) => <span key={j} className="ux-tag-item">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={100}>
            <p style={{ textAlign:'center', marginTop:'6rem', fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.3rem,2.5vw,2rem)', fontStyle:'italic', color:'rgba(255,255,255,.5)', fontWeight:300 }}>
              Every element designed to work together — <em style={{ color:'rgba(255,255,255,.8)', fontStyle:'normal' }}>functionally, visually, and emotionally.</em>
            </p>
          </FadeIn>
        </section>

        {/* ══════════════ IMAGE + TEXT ROW — PROCESS ══════════════ */}
        <FadeIn>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'rgba(0,0,0,.08)', minHeight:500 }}>
            <div style={{ position:'relative', overflow:'hidden' }}>
              <img src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80&fit=crop" alt="Design process and collaboration" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.6)', display:'block' }}/>
            </div>
            <div style={{ background:'#000000', padding:'6rem 5rem', display:'flex', flexDirection:'column', justifyContent:'center', transition:'background 0.6s ease' }}>
              <span style={{ fontSize:'.68rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.8rem' }}>The Enhanccee Process</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,3.5vw,4rem)', lineHeight:1.15, color:'#ffffff', marginBottom:'2rem' }}>
                Precision<br />at <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>every interaction</em>
              </h2>
              <p style={{ fontSize:'.95rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', fontWeight:200, marginBottom:'2rem' }}>
                Exceptional digital products are never accidental. They are the result of structured thinking, user research, and iterative design refinement. Our UX design process blends product strategy, interaction design, and usability engineering to ensure every interaction improves the user journey.
              </p>
              <div style={{ display:'grid', gap:'1rem' }}>
                {[
                  '01 Discovery — Understanding product goals, user behaviour, and digital challenges through UX audits and product research.',
                  '02 Strategy — Developing a clear UX strategy, user flow architecture, and interaction design framework aligned with business objectives.',
                  '03 Design — Crafting wireframes, UI systems, and interface prototypes that translate strategy into intuitive digital experiences.',
                  '04 Testing — Validating usability through UX testing, behavioural analysis, and interface optimisation.',
                  '05 Refinement — Continuously evolving the product experience through UX improvements, performance insights, and data-driven design iteration.',
                ].map((step, idx) => (
                  <p key={idx} style={{ margin:0, fontSize:'.87rem', lineHeight:1.75, color:'rgba(255,255,255,.62)', fontWeight:300 }}>{step}</p>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ══════════════ BANNER 3 ══════════════ */}
        <FadeIn>
          <div className="ux-img-banner" style={{ height:'clamp(300px,42vh,540px)' }}>
            <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1800&q=80&fit=crop" alt="Modern digital interface design" loading="lazy"/>
            <span className="ux-img-caption">Where strategy becomes experience</span>
          </div>
        </FadeIn>

        {/* ══════════════ PHILOSOPHY STATS ══════════════ */}
        <section style={{ padding:'16vh 8vw', position:'relative', overflow:'hidden', background:'#000000', transition:'background 0.6s ease' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(20,20,20,.4) 0%, transparent 70%)', animation:'ux-breathe 8s ease-in-out infinite', pointerEvents:'none' }}/>
          <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
            <FadeIn>
              <p style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'4rem', textAlign:'center' }}>Exceptional Products Begin with User Experience</p>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.8rem,6vw,6.5rem)', lineHeight:1.05, textAlign:'center', color:'#ffffff', marginBottom:'5rem' }}>
                Exceptional Products<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Begin with User Experience</em>
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p style={{ fontSize:'clamp(1.1rem,1.6vw,1.3rem)', lineHeight:1.9, color:'rgba(255,255,255,.5)', textAlign:'center', fontWeight:200, marginBottom:'5rem' }}>
                The most successful digital products share a common principle.<br />
                They prioritise user experience design over visual noise.<br />
                Because users stay where experiences feel effortless. <strong style={{ color:'#ffffff' }}>And effortless experiences are always designed.</strong>
              </p>
            </FadeIn>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(255,255,255,.08)', marginTop:'4rem' }}>
              {[
                { word:'Clarity', sub:'Over Noise' },
                { word:'Usability', sub:'Over Visual Clutter' },
                { word:'Flow', sub:'Over Friction' },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div style={{ background:'#000000', padding:'3rem 2rem', textAlign:'center', border:'1px solid rgba(255,255,255,.1)' }}>
                    <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.6rem', fontWeight:400, color:'#ffffff', display:'block', marginBottom:'.5rem' }}>{s.word}</span>
                    <span style={{ fontSize:'.75rem', letterSpacing:'.15em', color:'rgba(255,255,255,.4)', textTransform:'uppercase', fontWeight:200 }}>{s.sub}</span>
              </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ BANNER 4 — TRIO ══════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:2, background:'rgba(255,255,255,.08)' }}>
          {[
            { src:'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80&fit=crop', cap:'Wireframing' },
            { src:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&fit=crop', cap:'Prototyping' },
            { src:'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&q=80&fit=crop', cap:'Visual Design' },
          ].map((img, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="ux-img-banner" style={{ height:'clamp(260px,38vh,460px)' }}>
                <img src={img.src} alt={img.cap} loading="lazy"/>
                <span className="ux-img-caption">{img.cap}</span>
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
                Designed to<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>Perform Better</em>
              </h2>
            </FadeIn>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', maxWidth:1200, margin:'6rem auto 0' }}>
            {[
              { vs:'Designed to', h:'Perform Better', p:'Our approach to UI and UX design prioritises clarity, usability, and product performance over complexity.' },
              { vs:'Not Decorative', h:'Not Confusing', p:'No visual noise. No cluttered systems. Only intentional UX built for clarity and ease.' },
              { vs:'Not Feature-Heavy', h:'Across Every Platform', p:'Every experience is engineered to improve engagement, user retention, and product efficiency across devices and platforms.' },
              { vs:'Built for Ease', h:'Not attention-seeking', p:'Because great design does not demand attention. It makes everything easier.' },
            ].map((d, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="ux-diff-item">
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
            <div style={{ background:'#000000', padding:'6rem 5rem', display:'flex', flexDirection:'column', justifyContent:'center', transition:'background 0.6s ease' }}>
              <span style={{ fontSize:'.68rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'1.8rem' }}>Closing Section</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,3.5vw,4rem)', lineHeight:1.15, color:'#ffffff', marginBottom:'2rem' }}>
                Experiences that feel<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>inevitable</em>
              </h2>
              <p style={{ fontSize:'.95rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', fontWeight:200 }}>When design clarity, usability, and human psychology work together, digital experiences become natural. Users move without hesitation. Navigation becomes instinctive. Interaction becomes seamless. The result is a product that feels intuitive from the first moment.</p>
            </div>
            <div style={{ position:'relative', overflow:'hidden' }}>
              <img src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80&fit=crop" alt="Premium digital interface" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.6)', display:'block' }}/>
            </div>
          </div>
        </FadeIn>

        {/* ══════════════ SIGNATURE QUOTE ══════════════ */}
        <section style={{ padding:'20vh 8vw', position:'relative', overflow:'hidden', textAlign:'center', background:'#000000', transition:'background 0.6s ease' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(25,25,25,.4) 0%, transparent 70%)', animation:'ux-breathe 10s ease-in-out infinite alternate', pointerEvents:'none' }}/>
          <FadeIn>
            <p style={{ fontSize:'.7rem', letterSpacing:'.45em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', marginBottom:'4rem', position:'relative', zIndex:1 }}>When simplicity and intelligence align</p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,6.5vw,7.5rem)', lineHeight:1.1, color:'#ffffff', maxWidth:1280, margin:'0 auto 3rem', position:'relative', zIndex:1 }}>
              When simplicity<br />and intelligence align,<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>experience is born.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ width:200, height:1, background:'linear-gradient(to right, transparent, rgba(255,255,255,.3), transparent)', margin:'0 auto', position:'relative', zIndex:1 }}/>
          </FadeIn>
        </section>

        {/* ══════════════ BANNER 5 ══════════════ */}
        <FadeIn>
          <div className="ux-img-banner" style={{ height:'clamp(200px,28vh,360px)' }}>
            <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1800&q=80&fit=crop" alt="UI/UX design consultation" loading="lazy"/>
            <span className="ux-img-caption">Where vision meets experience</span>
          </div>
        </FadeIn>

        {/* ══════════════ CTA ══════════════ */}
        <section style={{ padding:'14vh 8vw', background:'#000000', transition:'background 0.6s ease' }}>
          <FadeIn>
            <div style={{ background:'rgba(10,10,10,.9)', border:'1px solid rgba(255,255,255,.1)', backdropFilter:'blur(20px)', padding:'8rem 6rem', textAlign:'center', position:'relative', overflow:'hidden', maxWidth:1100, margin:'0 auto' }}>
              {/* Top line */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(255,255,255,.3), transparent)' }}/>
              {/* Radial glow */}
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,.03) 0%, transparent 60%)', pointerEvents:'none' }}/>
              <span style={{ fontSize:'.7rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:'2rem', display:'block', position:'relative', zIndex:1 }}>Your product experience is your competitive advantage</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.5rem,5vw,5.5rem)', color:'#ffffff', lineHeight:1.1, marginBottom:'2rem', position:'relative', zIndex:1 }}>
                Your product experience is<br />your <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.65)' }}>competitive advantage</em> —<br />designed with clarity, intention, and precision.
              </h2>
              <p style={{ fontSize:'clamp(.9rem,1.3vw,1.1rem)', color:'rgba(255,255,255,.45)', fontWeight:200, lineHeight:1.8, maxWidth:620, margin:'0 auto 4rem', position:'relative', zIndex:1 }}>Exceptional UI/UX systems designed for clarity, usability, and growth across every interaction.</p>
              <div style={{ display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap', position:'relative', zIndex:1 }}>
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
