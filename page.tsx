'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const capabilities = [
  {
    cat: 'Discipline 01', title: 'UI / UX Design',
    desc: 'Interfaces that communicate precision at first sight and guide users with effortless intelligence. We design for emotion, then optimise for conversion.',
    list: ['Brand discovery & visual strategy', 'Wireframing & information architecture', 'High-fidelity visual design', 'Motion design & micro-interactions', 'Design systems & component libraries'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  },
  {
    cat: 'Discipline 02', title: 'Development Architecture',
    desc: 'Every line of code serves a purpose. Modern frameworks, clean architecture, and a relentless commitment to technical performance at every layer.',
    list: ['React, Next.js & modern frameworks', 'Headless CMS architecture', 'Custom API integrations', 'Progressive web applications', 'Performance auditing & optimisation'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>,
  },
  {
    cat: 'Discipline 03', title: 'eCommerce Excellence',
    desc: 'Premium products deserve premium commerce environments. Buying experiences that reduce friction and amplify desire in equal, precise measure.',
    list: ['Shopify Plus bespoke builds', 'Custom checkout architecture', 'Immersive product experiences', 'Multi-currency & global payments', 'Loyalty & subscription systems'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  },
  {
    cat: 'Discipline 04', title: 'Intelligent Automation',
    desc: 'Remove the manual. Amplify the meaningful. Smart automation that frees your team while delivering better experiences at scale.',
    list: ['CRM & ERP integrations', 'Behaviour-triggered email flows', 'Workflow automation (Make / Zapier)', 'Personalised dynamic content', 'AI-powered site features'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M12 2a10 10 0 1 0 10 10"/><path d="M22 2L12 12"/><path d="M16 2h6v6"/></svg>,
  },
  {
    cat: 'Discipline 05', title: 'Performance Engineering',
    desc: 'Speed is a luxury. We optimise every layer — delivering sub-second load times and flawless experiences under global demand.',
    list: ['Core Web Vitals optimisation', 'Global CDN architecture', 'Next-gen image delivery', 'Multi-layer caching strategy', 'Load testing & stress analysis'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>,
  },
  {
    cat: 'Discipline 06', title: 'Security Standards',
    desc: 'Your brand\'s reputation is non-negotiable. Enterprise-grade security protocols protecting your platform, your data, and your clients.',
    list: ['SSL / TLS end-to-end encryption', 'DDoS mitigation & WAF', 'Role-based access control', 'GDPR & global compliance', 'Penetration testing & audits'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    cat: 'Discipline 07', title: 'Built for Global Scale',
    desc: 'Global ambition requires global infrastructure. Platforms that grow with your brand — across markets, languages, and volumes.',
    list: ['Cloud architecture (AWS / GCP / Azure)', 'Multi-region global deployment', 'Microservices & containerisation', 'Multi-language & localisation', 'Disaster recovery & uptime SLA'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  },
]

const processSteps = [
  { num: '01', phase: 'Phase One', title: 'Discover', desc: 'We immerse ourselves in your world — brand values, commercial objectives, competitive landscape, and audience psychology. True architecture begins with deep strategic understanding.', tags: ['Brand Audit', 'Stakeholder Sessions', 'Market Analysis'] },
  { num: '02', phase: 'Phase Two', title: 'Define', desc: 'Strategy crystallises into structure. Information architecture, user journey mapping, and technical specifications — the precise blueprint from which everything is built.', tags: ['IA Mapping', 'User Journey Design', 'Technical Spec'] },
  { num: '03', phase: 'Phase Three', title: 'Design', desc: 'The atelier phase. Our creative team transforms strategy into visual language — crafting interfaces of exceptional refinement, with every detail considered as part of a cohesive whole.', tags: ['Visual Design', 'Prototyping', 'Animation Direction'] },
  { num: '04', phase: 'Phase Four', title: 'Develop', desc: 'Engineering executes with precision. We build on modern, scalable foundations — with rigorous quality assurance at every stage and continuous client collaboration throughout.', tags: ['Frontend Build', 'Backend Architecture', 'QA & Testing'] },
]

const whyRows = [
  { title: 'Strategy Before Aesthetics', desc: 'Every design decision is rooted in commercial strategy. We never sacrifice performance for beauty — we engineer both to coexist at the highest possible level.' },
  { title: 'Senior-Led, Always', desc: 'Your project is led by a senior creative and technical director from day one to launch. No junior handoffs. No dilution of vision. One team, one standard.' },
  { title: 'Built for Global Markets', desc: 'Localisation, multi-currency, regional performance, and cultural nuance are embedded from the architecture level — not retrofitted later.' },
  { title: 'Full Ownership. Always.', desc: 'You own everything — full source code, complete documentation, thorough knowledge transfer. We build for your independence, not your dependency.' },
]

function Rule() {
  return (
    <div className="relative h-px overflow-hidden" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 100%)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)', width: '40%', animation: 'rule-sweep 4s ease-in-out infinite' }}/>
    </div>
  )
}

export default function WebDevPage() {
  const [capIdx, setCapIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const CARD_W = 343
  function goTo(idx: number) {
    const max = capabilities.length - 1
    setCapIdx(Math.max(0, Math.min(max, idx)))
  }
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${capIdx * CARD_W}px)`
    }
  }, [capIdx])

  useEffect(() => {
    const dot = document.getElementById('wd-dot')
    const ring = document.getElementById('wd-ring')
    if (!dot || !ring) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx}px,${my}px)`
    }
    document.addEventListener('mousemove', onMove);
    (function loop() {
      rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14
      ring.style.transform = `translate(${rx}px,${ry}px)`
      requestAnimationFrame(loop)
    })()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <style>{`
        @keyframes rule-sweep { 0%{left:-60%} 100%{left:120%} }
        @keyframes wd-up { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        .eco-card { background:#111; border:1px solid rgba(255,255,255,.06); transition:all .45s cubic-bezier(.16,1,.3,1); position:relative; overflow:hidden; }
        .eco-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#fff,transparent); transform:scaleX(0); transform-origin:left; transition:transform .55s; }
        .eco-card:hover { background:#1a1a1a; transform:translateY(-3px); box-shadow:0 28px 70px rgba(0,0,0,.6); }
        .eco-card:hover::before { transform:scaleX(1); }
        .cap-card { flex-shrink:0; width:300px; background:#111; border:1px solid rgba(255,255,255,.06); padding:40px 32px; position:relative; overflow:hidden; transition:all .4s cubic-bezier(.16,1,.3,1); }
        @media(min-width:640px){ .cap-card { width:340px; padding:52px 44px; } }
        .cap-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#fff,transparent); transform:scaleX(0); transition:transform .5s; }
        .cap-card:hover { background:#1a1a1a; transform:translateY(-4px); box-shadow:0 30px 80px rgba(0,0,0,.5); }
        .cap-card:hover::after { transform:scaleX(1); }
        .proc-step { background:#111; border:1px solid rgba(255,255,255,.06); padding:40px 32px; position:relative; overflow:hidden; transition:background .4s; }
        @media(min-width:768px){ .proc-step { padding:56px 52px; } }
        .proc-step:hover { background:#1a1a1a; }
        .why-row { padding:24px 0; border-bottom:1px solid rgba(255,255,255,.06); display:flex; gap:20px; align-items:flex-start; transition:all .35s; }
        .why-row:last-child { border-bottom:none; }
        .why-row:hover .why-num { color:#ffffff !important; }
        .ed-cell:hover img { transform:scale(1.06); }
        .btn-primary { background:#ffffff; color:#000000; font-size:.6rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; padding:14px 32px; display:inline-block; position:relative; overflow:hidden; transition:all .35s ease; }
        .btn-primary:hover { background:#e5e5e5; transform:translateY(-2px); }
        .btn-outline { border:1px solid rgba(255,255,255,.3); color:#ffffff; font-size:.6rem; font-weight:500; letter-spacing:.2em; text-transform:uppercase; padding:14px 32px; display:inline-block; transition:all .35s; }
        .btn-outline:hover { border-color:#ffffff; background:rgba(255,255,255,.08); }
        .meta-btn-white { background:#ffffff; color:#000000; font-size:.6rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; padding:14px 32px; display:inline-block; transition:all .35s; }
        .meta-btn-white:hover { background:#e5e5e5; }
      `}</style>

      {/* Cursor — hidden on touch devices */}
      <div id="wd-dot" className="fixed pointer-events-none z-[9999] hidden md:block" style={{ mixBlendMode:'difference' }}>
        <div style={{ width:6, height:6, borderRadius:'50%', background:'#ffffff', transform:'translate(-50%,-50%)' }}/>
      </div>
      <div id="wd-ring" className="fixed pointer-events-none z-[9998] hidden md:block">
        <div style={{ width:38, height:38, borderRadius:'50%', border:'1px solid rgba(255,255,255,.4)', transform:'translate(-50%,-50%)' }}/>
      </div>

      <Header />

      <main style={{ backgroundColor:'#000000', color:'#ffffff', fontFamily:'var(--font-montserrat)' }}>

        {/* ══ 1 — HERO ══ */}
        <section style={{ minHeight:'100svh', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }} className="md:grid md:[grid-template-columns:1fr_1fr]">
          {/* Left */}
          <div style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'120px 24px 60px', position:'relative', zIndex:3, background:'linear-gradient(110deg, #000 40%, rgba(0,0,0,.7) 100%)' }} className="sm:px-10 md:px-[3.75rem] md:pb-[90px]">
            <p style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:28, animation:'wd-up .8s .3s ease forwards', opacity:0 }}>
              Website Design &amp; Development
            </p>
            <h1 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2.4rem,8vw,5rem)', fontWeight:400, lineHeight:1.08, color:'#ffffff', marginBottom:24, animation:'wd-up .9s .5s ease forwards', opacity:0 }}>
              Where Luxury Brands<br />
              <em style={{ fontStyle:'normal', fontWeight:400, color:'#ffffff', display:'block' }}>Become Digital<br />Experiences</em>
            </h1>
            <p style={{ fontSize:'.83rem', lineHeight:1.95, color:'rgba(255,255,255,.55)', maxWidth:440, marginBottom:40, animation:'wd-up .9s .7s ease forwards', opacity:0 }}>
              We don&apos;t build websites. We architect digital environments — precision-engineered to perform, crafted to captivate, and built to endure across every market.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap', animation:'wd-up .9s .9s ease forwards', opacity:0 }}>
              <Link href="/contact" className="meta-btn-white"><span>Get in Touch</span></Link>
              <Link href="/clientele" className="btn-outline">View Clientele</Link>
            </div>
          </div>

          {/* Right — image */}
          <div style={{ position:'relative', overflow:'hidden', minHeight:300 }} className="md:min-h-0">
            <img
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80&fit=crop"
              alt="Digital design workspace"
              style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.55) saturate(.7)' }}
            />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #000 0%, transparent 30%), linear-gradient(to top, #000 0%, transparent 30%)' }}/>
            <div style={{ position:'absolute', bottom:32, right:16, zIndex:4, background:'rgba(0,0,0,.82)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,.15)', padding:'20px 24px', width:200, animation:'wd-up .9s 1.1s ease forwards', opacity:0 }} className="sm:right-5 sm:w-[220px] sm:p-6">
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'2.6rem', lineHeight:1, color:'#ffffff', marginBottom:8 }}>3.4×</div>
              <div style={{ fontSize:'.62rem', color:'rgba(255,255,255,.55)', letterSpacing:'.08em', lineHeight:1.5 }}>Average conversion uplift across client portfolios</div>
            </div>
          </div>
        </section>

        <Rule />

        {/* ══ 2 — MANIFESTO ══ */}
        <RevealSection style={{ padding:'5rem 24px', position:'relative', overflow:'hidden', background:'#0a0a0a' }} className="sm:px-10 md:px-[3.75rem]">
          <div style={{ maxWidth:1280, margin:'0 auto' }} className="md:grid md:[grid-template-columns:1fr_1.1fr] md:gap-[100px] md:items-center flex flex-col gap-12">
            <div>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'8rem', lineHeight:.6, color:'rgba(255,255,255,.06)', marginBottom:-16, display:'block' }}>&ldquo;</div>
              <blockquote style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,5vw,4rem)', fontWeight:400, lineHeight:1.18, color:'#ffffff' }}>
                Your website is not a<br />marketing asset.<br />
                <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>It is your most powerful<br />business instrument.</em>
              </blockquote>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:36 }} className="md:gap-12">
              {[
                { title:'Beyond Aesthetics', body:'Every premium brand deserves a digital presence that matches its stature. We merge the discipline of high-end architecture with performance engineering — creating spaces that communicate authority the moment a visitor arrives.' },
                { title:'Engineered to Convert', body:'Beauty without performance is decoration. We build experiences that are as relentless in conversion as they are refined in design. Every pixel, every interaction, every millisecond is part of a unified strategy.' },
                { title:'A Living System', body:'A website is a living system. We design with growth embedded from the foundation — ensuring your digital architecture scales effortlessly as your brand expands across global markets.' },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft:'1px solid rgba(255,255,255,.15)', paddingLeft:24 }}>
                  <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.72rem', fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', color:'#ffffff', marginBottom:12 }}>{item.title}</div>
                  <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.55)' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <Rule />

        {/* ══ 3 — ECOSYSTEM ══ */}
        <RevealSection style={{ padding:'5rem 24px', background:'#000000' }} className="sm:px-10 md:px-[3.75rem]">
          <div style={{ maxWidth:1280, margin:'0 auto 60px' }} className="md:flex md:justify-between md:items-end">
            <div className="mb-6 md:mb-0">
              <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:16, display:'block' }}>What We Deliver</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:400, lineHeight:1.2, color:'#ffffff' }}>
                A Complete <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Digital Ecosystem</em>
              </h2>
            </div>
            <p style={{ fontSize:'.78rem', lineHeight:2, color:'rgba(255,255,255,.5)', maxWidth:360 }} className="md:text-right">Six interconnected disciplines. One unified architecture. Engineered to perform at the highest level of digital commerce and brand communication.</p>
          </div>

          <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gap:3 }} className="grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:1fr_1fr_1fr]">
            {/* Image card */}
            <div className="eco-card sm:row-span-2" style={{ minHeight:280, padding:0, overflow:'hidden', position:'relative' }}>
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&fit=crop" alt="Digital design process" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.45) saturate(.7)', transition:'transform .8s cubic-bezier(.16,1,.3,1)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 55%)' }}/>
              <div style={{ position:'absolute', bottom:24, left:28, fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.6)' }}>Digital Architecture</div>
            </div>
            {[
              { n:'01', t:'Brand-Led Digital Identity', d:'We translate the essence of your brand into visual language, interaction patterns, and atmospheric depth that are unmistakably yours.', tag:'Identity Architecture' },
              { n:'02', t:'Precision UI/UX Design', d:'Every interface element is purposeful — guiding visitors with elegant intention while maximising desire and conversion at every step.', tag:'Experience Design' },
              { n:'03', t:'High-Performance Development', d:'Built on robust, scalable foundations. Our code is as refined as our design — optimised for speed and global reliability.', tag:'Engineering' },
              { n:'04', t:'eCommerce Architecture', d:'Premium retail demands a premium experience. Environments that make purchasing feel as elevated as the products themselves.', tag:'Revenue Systems' },
            ].map((c, i) => (
              <div key={i} className="eco-card" style={{ padding:'40px 36px', display:'flex', flexDirection:'column' }}>
                <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'3rem', lineHeight:1, color:'rgba(255,255,255,.15)', marginBottom:16 }}>{c.n}</div>
                <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.25rem', fontWeight:400, color:'#ffffff', marginBottom:12, lineHeight:1.3 }}>{c.t}</div>
                <p style={{ fontSize:'.76rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', flex:1 }}>{c.d}</p>
                <span style={{ display:'inline-block', marginTop:24, fontSize:'.55rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', borderBottom:'1px solid rgba(255,255,255,.15)', paddingBottom:3, alignSelf:'flex-start' }}>{c.tag}</span>
              </div>
            ))}
            <div className="eco-card sm:col-span-2 lg:col-span-2" style={{ padding:'40px 36px', display:'flex', flexDirection:'column' }}>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'3rem', lineHeight:1, color:'rgba(255,255,255,.15)', marginBottom:16 }}>05</div>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.25rem', color:'#ffffff', marginBottom:12 }}>Intelligent Automation</div>
              <p style={{ fontSize:'.76rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', flex:1 }}>Smart workflows that reduce operational overhead while elevating the customer experience across every touchpoint and market.</p>
              <span style={{ display:'inline-block', marginTop:24, fontSize:'.55rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', borderBottom:'1px solid rgba(255,255,255,.15)', paddingBottom:3, alignSelf:'flex-start' }}>Systems Integration</span>
            </div>
            <div className="eco-card" style={{ padding:'40px 36px', display:'flex', flexDirection:'column' }}>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'3rem', lineHeight:1, color:'rgba(255,255,255,.15)', marginBottom:16 }}>06</div>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.25rem', color:'#ffffff', marginBottom:12 }}>Security &amp; Scale</div>
              <p style={{ fontSize:'.76rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', flex:1 }}>Enterprise-grade infrastructure designed for global growth — built to protect your brand and handle demand without compromise.</p>
              <span style={{ display:'inline-block', marginTop:24, fontSize:'.55rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', borderBottom:'1px solid rgba(255,255,255,.15)', paddingBottom:3, alignSelf:'flex-start' }}>Infrastructure</span>
            </div>
          </div>
        </RevealSection>

        <Rule />

        {/* ══ 4 — CAPABILITIES CAROUSEL ══ */}
        <RevealSection style={{ padding:'5rem 0 5rem 24px', background:'#0a0a0a', overflow:'hidden' }} className="sm:pl-10 md:pl-[3.75rem]">
          <div style={{ margin:'0 0 48px', display:'flex', alignItems:'flex-end', justifyContent:'space-between', paddingRight:24 }} className="sm:pr-10 md:pr-[3.75rem]">
            <div>
              <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:16, display:'block' }}>Technical Mastery</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:400, color:'#ffffff' }}>
                Our <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Capabilities</em>
              </h2>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {[['←', () => goTo(capIdx-1)], ['→', () => goTo(capIdx+1)]].map(([label, fn], i) => (
                <button key={i} onClick={fn as () => void} style={{ width:44, height:44, border:'1px solid rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#ffffff', background:'none', cursor:'pointer', fontSize:'1.1rem', transition:'all .3s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.08)')} onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                  {label as string}
                </button>
              ))}
            </div>
          </div>

          <div style={{ position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, right:0, width:80, height:'100%', background:'linear-gradient(to right, transparent, #0a0a0a)', zIndex:2, pointerEvents:'none' }}/>
            <div ref={trackRef} style={{ display:'flex', gap:3, transition:'transform .65s cubic-bezier(.16,1,.3,1)', willChange:'transform' }}>
              {capabilities.map((cap, i) => (
                <div key={i} className="cap-card">
                  <div style={{ color:'rgba(255,255,255,.6)', marginBottom:28 }}>{cap.icon}</div>
                  <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.55rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:14 }}>{cap.cat}</div>
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.6rem', fontWeight:400, color:'#ffffff', marginBottom:16, lineHeight:1.2 }}>{cap.title}</div>
                  <p style={{ fontSize:'.76rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', marginBottom:28 }}>{cap.desc}</p>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                    {cap.list.map((li, j) => (
                      <li key={j} style={{ fontSize:'.7rem', color:'rgba(255,255,255,.5)', display:'flex', alignItems:'center', gap:12 }}>
                        <span style={{ width:18, height:1, background:'#ffffff', flexShrink:0, display:'inline-block' }}/>
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', gap:6, alignItems:'center', marginTop:32, paddingRight:40 }}>
            {capabilities.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ height:2, width: i === capIdx ? 48 : 24, background: i === capIdx ? '#ffffff' : 'rgba(255,255,255,.2)', border:'none', cursor:'pointer', transition:'all .4s', padding:0 }}/>
            ))}
          </div>
        </RevealSection>

        <Rule />

        {/* ══ 5 — PROCESS ══ */}
        <RevealSection style={{ padding:'5rem 24px', background:'#000000', position:'relative', overflow:'hidden' }} className="sm:px-10 md:px-[3.75rem]">
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(30,30,30,.5) 0%, transparent 65%)' }}/>
          <div style={{ position:'relative', zIndex:2, maxWidth:1280, margin:'0 auto' }}>
            <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:16, display:'block' }}>How We Build</span>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:400, color:'#ffffff', marginBottom:48 }} className="md:mb-[80px]">
              The Enhanccee <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Method</em>
            </h2>
            <div style={{ display:'grid', gap:3 }} className="grid-cols-1 md:grid-cols-2">
              {processSteps.map((s, i) => (
                <div key={i} className="proc-step">
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'4rem', lineHeight:1, color:'rgba(255,255,255,.15)', position:'absolute', top:24, right:28 }}>{s.num}</div>
                  <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.55rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.45)', marginBottom:12 }}>{s.phase}</div>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontSize:'2rem', fontWeight:400, color:'#ffffff', marginBottom:16 }}>{s.title}</h3>
                  <p style={{ fontSize:'.78rem', lineHeight:2, color:'rgba(255,255,255,.5)' }}>{s.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:24 }}>
                    {s.tags.map((tag, j) => (
                      <span key={j} style={{ padding:'6px 14px', border:'1px solid rgba(255,255,255,.12)', fontSize:'.58rem', letterSpacing:'.15em', color:'rgba(255,255,255,.5)', textTransform:'uppercase' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="proc-step md:col-span-2">
                <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'4rem', lineHeight:1, color:'rgba(255,255,255,.15)', position:'absolute', top:24, right:28 }}>05</div>
                <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.55rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.45)', marginBottom:12 }}>Phase Five</div>
                <h3 style={{ fontFamily:'var(--font-cormorant)', fontSize:'2rem', fontWeight:400, color:'#ffffff', marginBottom:16 }}>Launch &amp; Support</h3>
                <p style={{ fontSize:'.78rem', lineHeight:2, color:'rgba(255,255,255,.5)', maxWidth:680 }}>We don&apos;t deliver and disappear. Launch is the beginning of our partnership — with ongoing performance monitoring, continuous improvement, and strategic support as your brand evolves across new markets.</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:24 }}>
                  {['Staged Launch','Performance Monitoring','Ongoing Retainer','Growth Optimisation'].map((t,j) => (
                    <span key={j} style={{ padding:'6px 14px', border:'1px solid rgba(255,255,255,.12)', fontSize:'.58rem', letterSpacing:'.15em', color:'rgba(255,255,255,.5)', textTransform:'uppercase' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <Rule />

        {/* ══ 6 — WHY US ══ */}
        <RevealSection style={{ padding:'5rem 24px', background:'#0a0a0a' }} className="sm:px-10 md:px-[3.75rem]">
          <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gap:3 }} className="grid-cols-1 md:grid-cols-2">
            <div style={{ position:'relative', overflow:'hidden', minHeight:400 }} className="md:min-h-[700px]">
              <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&q=80&fit=crop" alt="Premium brand experience" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.7)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, transparent 60%, #0a0a0a 100%), linear-gradient(to top, #0a0a0a 0%, transparent 40%)' }}/>
              <div style={{ position:'absolute', bottom:32, left:20, right:20, display:'flex', gap:2 }} className="sm:left-10 sm:right-10 md:left-10 md:right-10">
                {[['98%','Client retention'],['40+','Countries served'],['3.4×','Avg. conversion uplift']].map(([n,l],i) => (
                  <div key={i} style={{ flex:1, background:'rgba(0,0,0,.8)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,.12)', padding:'16px 12px', textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.8rem', color:'#ffffff', lineHeight:1, marginBottom:6 }}>{n}</div>
                    <div style={{ fontSize:'.55rem', color:'rgba(255,255,255,.45)', letterSpacing:'.06em', lineHeight:1.4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,.06)', padding:'48px 32px', display:'flex', flexDirection:'column', justifyContent:'center' }} className="md:px-[64px] md:py-[72px]">
              <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:16, display:'block' }}>The Difference</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:400, lineHeight:1.2, color:'#ffffff', marginBottom:16 }}>
                Why International<br />Brands Choose <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Enhanccee®</em>
              </h2>
              <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.5)', marginBottom:40 }}>We are not an agency. We are a digital atelier — a focused team of specialists who hold themselves to one standard: exceptional.</p>
              <div>
                {whyRows.map((row, i) => (
                  <div key={i} className="why-row">
                    <div className="why-num" style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.4rem', color:'rgba(255,255,255,.2)', flexShrink:0, lineHeight:1.3, minWidth:32, transition:'color .35s' }}>0{i+1}</div>
                    <div>
                      <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.75rem', fontWeight:600, letterSpacing:'.08em', color:'#ffffff', marginBottom:6, textTransform:'uppercase' }}>{row.title}</div>
                      <p style={{ fontSize:'.74rem', lineHeight:1.85, color:'rgba(255,255,255,.5)' }}>{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        <Rule />

        {/* ══ 7 — SIGNATURE ══ */}
        <RevealSection style={{ position:'relative', overflow:'hidden', minHeight:400, display:'flex', alignItems:'center' }} className="md:h-[580px]">
          <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80&fit=crop" alt="Premium brand landscape" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%', filter:'brightness(.25) saturate(.6)' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #000 0%, rgba(0,0,0,.6) 50%, #000 100%), linear-gradient(to bottom, #000 0%, transparent 20%, transparent 80%, #000 100%)' }}/>
          <div style={{ position:'relative', zIndex:2, width:'100%', textAlign:'center', padding:'60px 24px' }} className="sm:px-10">
            <p style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:28 }}>Enhanccee® — A Statement of Intent</p>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2.2rem,6vw,5.5rem)', fontWeight:400, lineHeight:1.1, color:'#ffffff', maxWidth:1280, margin:'0 auto 24px' }}>
              A premium brand demands<br />
              <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>a premium digital experience.</em>
            </h2>
            <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.5)', maxWidth:520, margin:'0 auto' }}>There is no version of brand excellence that tolerates digital mediocrity. The world&apos;s most respected brands have always understood this.</p>
          </div>
        </RevealSection>

        {/* ══ EDITORIAL STRIP ══ */}
        <div style={{ display:'grid', gap:3, height:180 }} className="grid-cols-2 md:grid-cols-4 md:h-[220px]">
          {[
            { src:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&fit=crop', cap:'Design' },
            { src:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop', cap:'Craft' },
            { src:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&fit=crop', cap:'Engineering' },
            { src:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop', cap:'Launch' },
          ].map((cell, i) => (
            <div key={i} className="ed-cell" style={{ position:'relative', overflow:'hidden' }}>
              <img src={cell.src} alt={cell.cap} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.7)', transition:'transform 1.2s cubic-bezier(.16,1,.3,1)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 50%)' }}/>
              <span style={{ position:'absolute', bottom:16, left:16, fontFamily:'var(--font-montserrat)', fontSize:'.55rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', zIndex:2 }}>{cell.cap}</span>
            </div>
          ))}
        </div>

        <Rule />

        {/* ══ 8 — FINAL CTA ══ */}
        <RevealSection style={{ padding:'5rem 24px', background:'#000000', position:'relative', textAlign:'center', overflow:'hidden' }} className="sm:px-10 md:px-[3.75rem]">
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 55% 55% at 50% 100%, rgba(30,30,30,.5) 0%, transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:2, maxWidth:1280, margin:'0 auto' }}>
            <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.38em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:24, display:'block' }}>Begin the Conversation</span>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2.4rem,5vw,4.4rem)', fontWeight:400, lineHeight:1.12, color:'#ffffff', marginBottom:20 }}>
              Your digital<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>architecture awaits.</em>
            </h2>
            <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.5)', marginBottom:48 }}>Select clients only. We partner with a limited number of brands each quarter — ensuring every project receives the full weight of our attention and expertise.</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:56 }}>
              <Link href="/contact" className="meta-btn-white"><span>Get in Touch</span></Link>
              <Link href="/clientele" className="btn-outline">View Clientele</Link>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:24, maxWidth:300, margin:'0 auto' }}>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,.15)' }}/>
              <span style={{ fontSize:'.6rem', color:'rgba(255,255,255,.3)', letterSpacing:'.15em', textTransform:'uppercase', whiteSpace:'nowrap' }}>Enhanccee®</span>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,.15)' }}/>
            </div>
          </div>
        </RevealSection>

      </main>

      <Footer />
    </>
  )
}

function RevealSection({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold: 0.05 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: 'opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)' }}>
      {children}
    </div>
  )
}
