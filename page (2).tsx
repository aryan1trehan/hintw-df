'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const capabilities = [
  { cat: 'Discipline 01', title: 'UI / UX Design', desc: 'Interfaces that communicate precision at first sight and guide users with effortless intelligence. We design for emotion, then optimise for conversion.', list: ['Brand discovery & visual strategy', 'Wireframing & information architecture', 'High-fidelity visual design', 'Motion design & micro-interactions', 'Design systems & component libraries'], icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
  { cat: 'Discipline 02', title: 'Development Architecture', desc: 'Every line of code serves a purpose. Modern frameworks, clean architecture, and a relentless commitment to technical performance at every layer.', list: ['React, Next.js & modern frameworks', 'Headless CMS architecture', 'Custom API integrations', 'Progressive web applications', 'Performance auditing & optimisation'], icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg> },
  { cat: 'Discipline 03', title: 'eCommerce Excellence', desc: 'Premium products deserve premium commerce environments. Buying experiences that reduce friction and amplify desire in equal, precise measure.', list: ['Shopify Plus bespoke builds', 'Custom checkout architecture', 'Immersive product experiences', 'Multi-currency & global payments', 'Loyalty & subscription systems'], icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> },
  { cat: 'Discipline 04', title: 'Intelligent Automation', desc: 'Remove the manual. Amplify the meaningful. Smart automation that frees your team while delivering better experiences at scale.', list: ['CRM & ERP integrations', 'Behaviour-triggered email flows', 'Workflow automation (Make / Zapier)', 'Personalised dynamic content', 'AI-powered site features'], icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M12 2a10 10 0 1 0 10 10"/><path d="M22 2L12 12"/><path d="M16 2h6v6"/></svg> },
  { cat: 'Discipline 05', title: 'Performance Engineering', desc: 'Speed is a luxury. We optimise every layer — delivering sub-second load times and flawless experiences under global demand.', list: ['Core Web Vitals optimisation', 'Global CDN architecture', 'Next-gen image delivery', 'Multi-layer caching strategy', 'Load testing & stress analysis'], icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg> },
  { cat: 'Discipline 06', title: 'Security Standards', desc: "Your brand's reputation is non-negotiable. Enterprise-grade security protocols protecting your platform, your data, and your clients.", list: ['SSL / TLS end-to-end encryption', 'DDoS mitigation & WAF', 'Role-based access control', 'GDPR & global compliance', 'Penetration testing & audits'], icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { cat: 'Discipline 07', title: 'Built for Global Scale', desc: 'Global ambition requires global infrastructure. Platforms that grow with your brand — across markets, languages, and volumes.', list: ['Cloud architecture (AWS / GCP / Azure)', 'Multi-region global deployment', 'Microservices & containerisation', 'Multi-language & localisation', 'Disaster recovery & uptime SLA'], icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
]

const ecosystemCards = [
  { n:'01', t:'Brand-Led Digital Identity', d:'We translate the essence of your brand into visual language and interaction patterns that are unmistakably yours.', tag:'Identity Architecture' },
  { n:'02', t:'Precision UI/UX Design', d:'Every interface element is purposeful — guiding visitors with elegant intention while maximising conversion.', tag:'Experience Design' },
  { n:'03', t:'High-Performance Development', d:'Built on robust, scalable foundations. Our code is as refined as our design — optimised for speed and global reliability.', tag:'Engineering' },
  { n:'04', t:'eCommerce Architecture', d:'Premium retail demands a premium experience. Environments that make purchasing feel as elevated as the products themselves.', tag:'Revenue Systems' },
  { n:'05', t:'Intelligent Automation', d:'Smart workflows that reduce operational overhead while elevating the customer experience across every touchpoint.', tag:'Systems Integration' },
  { n:'06', t:'Security & Scale', d:'Enterprise-grade infrastructure designed for global growth — built to protect your brand and handle demand without compromise.', tag:'Infrastructure' },
]

const processSteps = [
  { num: '01', phase: 'Phase One', title: 'Discover', desc: 'We immerse ourselves in your world — brand values, commercial objectives, competitive landscape, and audience psychology.', tags: ['Brand Audit', 'Stakeholder Sessions', 'Market Analysis'] },
  { num: '02', phase: 'Phase Two', title: 'Define', desc: 'Strategy crystallises into structure. Information architecture, user journey mapping, and technical specifications.', tags: ['IA Mapping', 'User Journey Design', 'Technical Spec'] },
  { num: '03', phase: 'Phase Three', title: 'Design', desc: 'The atelier phase. Our creative team transforms strategy into visual language — crafting interfaces of exceptional refinement.', tags: ['Visual Design', 'Prototyping', 'Animation Direction'] },
  { num: '04', phase: 'Phase Four', title: 'Develop', desc: 'Engineering executes with precision. We build on modern, scalable foundations with rigorous quality assurance at every stage.', tags: ['Frontend Build', 'Backend Architecture', 'QA & Testing'] },
  { num: '05', phase: 'Phase Five', title: 'Launch & Support', desc: "We don't deliver and disappear. Launch is the beginning of our partnership — with ongoing performance monitoring and strategic support.", tags: ['Staged Launch', 'Performance Monitoring', 'Ongoing Retainer', 'Growth Optimisation'] },
]

const whyRows = [
  { title: 'Strategy Before Aesthetics', desc: 'Every design decision is rooted in commercial strategy. We never sacrifice performance for beauty — we engineer both to coexist at the highest possible level.' },
  { title: 'Senior-Led, Always', desc: 'Your project is led by a senior creative and technical director from day one to launch. No junior handoffs. No dilution of vision.' },
  { title: 'Built for Global Markets', desc: 'Localisation, multi-currency, regional performance, and cultural nuance are embedded from the architecture level — not retrofitted later.' },
  { title: 'Full Ownership. Always.', desc: 'You own everything — full source code, complete documentation, thorough knowledge transfer. We build for your independence.' },
]

function Rule() {
  return <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 100%)' }} />
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

export default function WebDevPage() {
  const [capIdx, setCapIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  function goTo(idx: number) { setCapIdx(Math.max(0, Math.min(capabilities.length - 1, idx))) }

  useEffect(() => {
    if (trackRef.current && !isMobile) {
      trackRef.current.style.transform = `translateX(-${capIdx * 343}px)`
    }
  }, [capIdx, isMobile])

  return (
    <>
      <style>{`
        @keyframes wd-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .wd-a1{animation:wd-up .8s .3s ease forwards;opacity:0}
        .wd-a2{animation:wd-up .9s .5s ease forwards;opacity:0}
        .wd-a3{animation:wd-up .9s .7s ease forwards;opacity:0}
        .wd-a4{animation:wd-up .9s .9s ease forwards;opacity:0}

        * { box-sizing: border-box; }

        .wd-card { background:#111; border:1px solid rgba(255,255,255,.06); padding:32px 28px; }
        .wd-procstep { background:#111; border:1px solid rgba(255,255,255,.06); padding:36px 28px; position:relative; }

        .wd-btn-white { background:#fff; color:#000; font-size:.58rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; padding:14px 28px; display:inline-block; }
        .wd-btn-outline { border:1px solid rgba(255,255,255,.3); color:#fff; font-size:.58rem; letter-spacing:.2em; text-transform:uppercase; padding:14px 28px; display:inline-block; }

        /* MOBILE FIRST */
        .wd-px { padding-left:24px; padding-right:24px; }
        .wd-section { padding:3.5rem 24px; }

        .wd-hero { display:flex; flex-direction:column; min-height:100svh; }
        .wd-hero-left { padding:110px 24px 52px; }
        .wd-hero-right { min-height:260px; position:relative; overflow:hidden; }
        .wd-hero-title { font-family:var(--font-cormorant); font-size:clamp(2.4rem,9vw,5rem); font-weight:400; line-height:1.08; color:#fff; margin-bottom:20px; }
        .wd-badge { display:none; }

        .wd-manifesto-grid { display:flex; flex-direction:column; gap:32px; }
        .wd-manifesto-quote { font-family:var(--font-cormorant); font-size:clamp(2rem,7vw,4rem); font-weight:400; line-height:1.18; color:#fff; }

        .wd-eco-header { display:flex; flex-direction:column; gap:16px; margin-bottom:32px; }
        .wd-eco-desc { font-size:.78rem; line-height:2; color:rgba(255,255,255,.5); }

        .wd-section-title { font-family:var(--font-cormorant); font-size:clamp(1.8rem,6vw,3rem); font-weight:400; color:#fff; }

        .wd-cap-section { padding:3.5rem 0 3.5rem 24px; background:#0a0a0a; overflow:hidden; }
        .wd-cap-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:28px; padding-right:24px; }
        .wd-cap-card { width:calc(100vw - 48px); max-width:360px; background:#111; border:1px solid rgba(255,255,255,.06); padding:32px 28px; flex-shrink:0; }

        .wd-process-grid { display:flex; flex-direction:column; gap:3px; }
        .wd-why-img { display:none; }
        .wd-why-content { padding:36px 24px; background:#111; border:1px solid rgba(255,255,255,.06); }
        .wd-whyrow { padding:18px 0; border-bottom:1px solid rgba(255,255,255,.06); display:flex; gap:16px; }
        .wd-whyrow:last-child { border-bottom:none; }

        .wd-sig { position:relative; overflow:hidden; min-height:320px; display:flex; align-items:center; }
        .wd-sig-title { font-family:var(--font-cormorant); font-size:clamp(2rem,6vw,5.5rem); font-weight:400; line-height:1.1; color:#fff; margin-bottom:16px; }
        .wd-strip { display:grid; grid-template-columns:1fr 1fr; height:150px; gap:3px; }
        .wd-cta { padding:3.5rem 24px; text-align:center; background:#000; }
        .wd-cta-title { font-family:var(--font-cormorant); font-size:clamp(2.2rem,7vw,4.4rem); font-weight:400; line-height:1.12; color:#fff; margin-bottom:16px; }

        /* DESKTOP */
        @media(min-width:768px){
          .wd-section { padding:6rem 3.75rem; }
          .wd-hero { flex-direction:row; min-height:100vh; }
          .wd-hero-left { flex:1; padding:0 3.75rem 90px; display:flex; flex-direction:column; justify-content:flex-end; background:linear-gradient(110deg,#000 40%,rgba(0,0,0,.7) 100%); }
          .wd-hero-right { flex:1; min-height:unset; }
          .wd-badge { display:block; position:absolute; bottom:60px; right:20px; background:rgba(0,0,0,.85); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.15); padding:24px 32px; width:220px; }
          .wd-manifesto-grid { flex-direction:row; align-items:center; gap:80px; }
          .wd-eco-header { flex-direction:row; justify-content:space-between; align-items:flex-end; margin-bottom:48px; }
          .wd-eco-desc { max-width:360px; text-align:right; }
          .wd-eco-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:3px; }
          .wd-cap-section { padding:6rem 0 6rem 3.75rem; }
          .wd-cap-header { padding-right:3.75rem; margin-bottom:48px; }
          .wd-cap-card { width:340px; padding:52px 44px; }
          .wd-process-grid { display:grid; grid-template-columns:1fr 1fr; gap:3px; }
          .wd-procstep { padding:52px 48px; }
          .wd-why-img { display:block; position:relative; overflow:hidden; min-height:600px; }
          .wd-why-grid { display:grid; grid-template-columns:1fr 1fr; gap:3px; }
          .wd-why-content { padding:64px 56px; }
          .wd-sig { min-height:580px; }
          .wd-strip { grid-template-columns:repeat(4,1fr); height:220px; }
          .wd-cta { padding:6rem 3.75rem; }
        }
      `}</style>

      <Header />

      <main style={{ backgroundColor:'#000', color:'#fff', fontFamily:'var(--font-montserrat)', overflowX:'hidden', maxWidth:'100vw' }}>

        {/* ══ HERO ══ */}
        <section className="wd-hero" style={{ background:'#000' }}>
          <div className="wd-hero-left">
            <p className="wd-a1" style={{ fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', marginBottom:24 }}>Website Design &amp; Development</p>
            <h1 className="wd-hero-title wd-a2">
              Where Luxury Brands<br />
              <em style={{ fontStyle:'normal' }}>Become Digital<br />Experiences</em>
            </h1>
            <p className="wd-a3" style={{ fontSize:'.83rem', lineHeight:1.95, color:'rgba(255,255,255,.55)', maxWidth:440, marginBottom:36 }}>
              We don&apos;t build websites. We architect digital environments — precision-engineered to perform, crafted to captivate, and built to endure across every market.
            </p>
            <div className="wd-a4" style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link href="/contact" className="wd-btn-white">Get in Touch</Link>
              <Link href="/clientele" className="wd-btn-outline">View Clientele</Link>
            </div>
          </div>
          <div className="wd-hero-right">
            <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80&fit=crop" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.55) saturate(.7)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #000 0%, transparent 35%), linear-gradient(to top, #000 0%, transparent 35%)' }}/>
            <div className="wd-badge wd-a4">
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'2.4rem', lineHeight:1, color:'#fff', marginBottom:6 }}>3.4×</div>
              <div style={{ fontSize:'.6rem', color:'rgba(255,255,255,.55)', letterSpacing:'.08em', lineHeight:1.5 }}>Average conversion uplift across client portfolios</div>
            </div>
          </div>
        </section>

        <Rule />

        {/* ══ MANIFESTO ══ */}
        <section className="wd-section" style={{ background:'#0a0a0a' }}>
          <div className="wd-manifesto-grid" style={{ maxWidth:1280, margin:'0 auto' }}>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'6rem', lineHeight:.7, color:'rgba(255,255,255,.06)', marginBottom:8 }}>&ldquo;</div>
              <blockquote className="wd-manifesto-quote">
                Your website is not a marketing asset.<br />
                <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>It is your most powerful business instrument.</em>
              </blockquote>
            </div>
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:28 }}>
              {[
                { title:'Beyond Aesthetics', body:'Every premium brand deserves a digital presence that matches its stature. We merge the discipline of high-end architecture with performance engineering.' },
                { title:'Engineered to Convert', body:'Beauty without performance is decoration. We build experiences that are as relentless in conversion as they are refined in design.' },
                { title:'A Living System', body:'A website is a living system. We design with growth embedded from the foundation — ensuring your digital architecture scales effortlessly.' },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft:'1px solid rgba(255,255,255,.15)', paddingLeft:20 }}>
                  <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', color:'#fff', marginBottom:8 }}>{item.title}</div>
                  <p style={{ fontSize:'.79rem', lineHeight:1.9, color:'rgba(255,255,255,.55)' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Rule />

        {/* ══ ECOSYSTEM ══ */}
        <section className="wd-section" style={{ background:'#000' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <div className="wd-eco-header">
              <div>
                <span style={{ fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:12 }}>What We Deliver</span>
                <h2 className="wd-section-title">A Complete <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Digital Ecosystem</em></h2>
              </div>
              <p className="wd-eco-desc">Six interconnected disciplines. One unified architecture. Engineered to perform at the highest level.</p>
            </div>

            {/* Mobile: slider */}
            {isMobile ? (
              <MobileSlider items={ecosystemCards} renderItem={(c, i) => (
                <div className="wd-card" style={{ display:'flex', flexDirection:'column' }}>
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'2.8rem', lineHeight:1, color:'rgba(255,255,255,.15)', marginBottom:14 }}>{c.n}</div>
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.3rem', color:'#fff', marginBottom:10, lineHeight:1.3 }}>{c.t}</div>
                  <p style={{ fontSize:'.76rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', flex:1 }}>{c.d}</p>
                  <span style={{ marginTop:20, fontSize:'.55rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', borderBottom:'1px solid rgba(255,255,255,.12)', paddingBottom:3, alignSelf:'flex-start' }}>{c.tag}</span>
                </div>
              )}/>
            ) : (
              <div className="wd-eco-grid">
                <div style={{ padding:0, overflow:'hidden', position:'relative', minHeight:280, background:'#111', border:'1px solid rgba(255,255,255,.06)' }}>
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&fit=crop" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.45) saturate(.7)' }}/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 55%)' }}/>
                  <div style={{ position:'absolute', bottom:20, left:24, fontSize:'.58rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.6)' }}>Digital Architecture</div>
                </div>
                {ecosystemCards.map((c, i) => (
                  <div key={i} className="wd-card" style={{ display:'flex', flexDirection:'column' }}>
                    <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'2.8rem', lineHeight:1, color:'rgba(255,255,255,.15)', marginBottom:14 }}>{c.n}</div>
                    <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.2rem', color:'#fff', marginBottom:10, lineHeight:1.3 }}>{c.t}</div>
                    <p style={{ fontSize:'.75rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', flex:1 }}>{c.d}</p>
                    <span style={{ marginTop:20, fontSize:'.55rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', borderBottom:'1px solid rgba(255,255,255,.12)', paddingBottom:3, alignSelf:'flex-start' }}>{c.tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Rule />

        {/* ══ CAPABILITIES ══ */}
        <section className="wd-cap-section">
          <div className="wd-cap-header">
            <div>
              <span style={{ fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:12 }}>Technical Mastery</span>
              <h2 className="wd-section-title">Our <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Capabilities</em></h2>
            </div>
            {!isMobile && (
              <div style={{ display:'flex', gap:8 }}>
                {[['←', () => goTo(capIdx-1)], ['→', () => goTo(capIdx+1)]].map(([lbl, fn], i) => (
                  <button key={i} onClick={fn as ()=>void} style={{ width:42, height:42, border:'1px solid rgba(255,255,255,.2)', background:'none', color:'#fff', cursor:'pointer', fontSize:'1rem', display:'flex', alignItems:'center', justifyContent:'center' }}>{lbl as string}</button>
                ))}
              </div>
            )}
          </div>

          {isMobile ? (
            <div style={{ paddingRight:24 }}>
              <MobileSlider items={capabilities} renderItem={(cap, i) => (
                <div className="wd-cap-card">
                  <div style={{ color:'rgba(255,255,255,.6)', marginBottom:20 }}>{cap.icon}</div>
                  <div style={{ fontSize:'.55rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:10 }}>{cap.cat}</div>
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.5rem', fontWeight:400, color:'#fff', marginBottom:12, lineHeight:1.2 }}>{cap.title}</div>
                  <p style={{ fontSize:'.75rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', marginBottom:20 }}>{cap.desc}</p>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                    {cap.list.map((li: string, j: number) => (
                      <li key={j} style={{ fontSize:'.7rem', color:'rgba(255,255,255,.5)', display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ width:14, height:1, background:'#fff', flexShrink:0, display:'inline-block' }}/>{li}
                      </li>
                    ))}
                  </ul>
                </div>
              )}/>
            </div>
          ) : (
            <>
              <div style={{ overflow:'hidden', position:'relative' }}>
                <div style={{ position:'absolute', top:0, right:0, width:60, height:'100%', background:'linear-gradient(to right, transparent, #0a0a0a)', zIndex:2, pointerEvents:'none' }}/>
                <div ref={trackRef} style={{ display:'flex', gap:3, transition:'transform .65s cubic-bezier(.16,1,.3,1)' }}>
                  {capabilities.map((cap, i) => (
                    <div key={i} className="wd-cap-card">
                      <div style={{ color:'rgba(255,255,255,.6)', marginBottom:24 }}>{cap.icon}</div>
                      <div style={{ fontSize:'.55rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:12 }}>{cap.cat}</div>
                      <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.5rem', fontWeight:400, color:'#fff', marginBottom:14, lineHeight:1.2 }}>{cap.title}</div>
                      <p style={{ fontSize:'.75rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', marginBottom:24 }}>{cap.desc}</p>
                      <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                        {cap.list.map((li, j) => (
                          <li key={j} style={{ fontSize:'.7rem', color:'rgba(255,255,255,.5)', display:'flex', alignItems:'center', gap:10 }}>
                            <span style={{ width:14, height:1, background:'#fff', flexShrink:0, display:'inline-block' }}/>{li}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', gap:6, marginTop:28, paddingRight:40 }}>
                {capabilities.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} style={{ height:2, width: i === capIdx ? 36 : 18, background: i === capIdx ? '#fff' : 'rgba(255,255,255,.2)', border:'none', cursor:'pointer', transition:'all .3s', padding:0 }}/>
                ))}
              </div>
            </>
          )}
        </section>

        <Rule />

        {/* ══ PROCESS ══ */}
        <section className="wd-section" style={{ background:'#000' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <span style={{ fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:12 }}>How We Build</span>
            <h2 className="wd-section-title" style={{ marginBottom:32 }}>The Enhanccee <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Method</em></h2>

            {isMobile ? (
              <MobileSlider items={processSteps} renderItem={(s, i) => (
                <div className="wd-procstep">
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'3.5rem', lineHeight:1, color:'rgba(255,255,255,.1)', position:'absolute', top:16, right:20 }}>{s.num}</div>
                  <div style={{ fontSize:'.55rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:10 }}>{s.phase}</div>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.8rem', fontWeight:400, color:'#fff', marginBottom:14 }}>{s.title}</h3>
                  <p style={{ fontSize:'.77rem', lineHeight:2, color:'rgba(255,255,255,.5)', marginBottom:20 }}>{s.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {s.tags.map((tag: string, j: number) => (
                      <span key={j} style={{ padding:'5px 12px', border:'1px solid rgba(255,255,255,.12)', fontSize:'.57rem', letterSpacing:'.12em', color:'rgba(255,255,255,.5)', textTransform:'uppercase' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}/>
            ) : (
              <div className="wd-process-grid">
                {processSteps.map((s, i) => (
                  <div key={i} className={`wd-procstep${i === 4 ? ' wd-full' : ''}`} style={i === 4 ? { gridColumn:'1 / -1' } : {}}>
                    <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'4rem', lineHeight:1, color:'rgba(255,255,255,.1)', position:'absolute', top:20, right:24 }}>{s.num}</div>
                    <div style={{ fontSize:'.55rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:10 }}>{s.phase}</div>
                    <h3 style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.9rem', fontWeight:400, color:'#fff', marginBottom:14 }}>{s.title}</h3>
                    <p style={{ fontSize:'.77rem', lineHeight:2, color:'rgba(255,255,255,.5)', marginBottom:20 }}>{s.desc}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                      {s.tags.map((tag, j) => (
                        <span key={j} style={{ padding:'5px 12px', border:'1px solid rgba(255,255,255,.12)', fontSize:'.57rem', letterSpacing:'.12em', color:'rgba(255,255,255,.5)', textTransform:'uppercase' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Rule />

        {/* ══ WHY US ══ */}
        <section className="wd-section" style={{ background:'#0a0a0a', padding: isMobile ? '3.5rem 0' : undefined }}>
          <div className="wd-why-grid" style={{ maxWidth:1280, margin:'0 auto' }}>
            <div className="wd-why-img">
              <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&q=80&fit=crop" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.7)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 50%)' }}/>
              <div style={{ position:'absolute', bottom:24, left:20, right:20, display:'flex', gap:2 }}>
                {[['98%','Client retention'],['40+','Countries served'],['3.4×','Avg. uplift']].map(([n,l],i) => (
                  <div key={i} style={{ flex:1, background:'rgba(0,0,0,.8)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,.12)', padding:'14px 10px', textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.7rem', color:'#fff', lineHeight:1, marginBottom:5 }}>{n}</div>
                    <div style={{ fontSize:'.52rem', color:'rgba(255,255,255,.45)', lineHeight:1.4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="wd-why-content">
              <span style={{ fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:14 }}>The Difference</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, lineHeight:1.2, color:'#fff', marginBottom:14 }}>
                Why International Brands Choose <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Enhanccee®</em>
              </h2>
              <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.5)', marginBottom:28 }}>We are not an agency. We are a digital atelier — a focused team of specialists who hold themselves to one standard: exceptional.</p>
              {whyRows.map((row, i) => (
                <div key={i} className="wd-whyrow">
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.3rem', color:'rgba(255,255,255,.2)', flexShrink:0, minWidth:28 }}>0{i+1}</div>
                  <div>
                    <div style={{ fontSize:'.73rem', fontWeight:600, letterSpacing:'.08em', color:'#fff', marginBottom:5, textTransform:'uppercase' }}>{row.title}</div>
                    <p style={{ fontSize:'.73rem', lineHeight:1.85, color:'rgba(255,255,255,.5)' }}>{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Rule />

        {/* ══ SIGNATURE ══ */}
        <section className="wd-sig">
          <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80&fit=crop" alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.25) saturate(.6)' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,#000 0%,rgba(0,0,0,.6) 50%,#000 100%)' }}/>
          <div style={{ position:'relative', zIndex:2, width:'100%', textAlign:'center', padding:'60px 24px' }}>
            <p style={{ fontSize:'.58rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:24 }}>Enhanccee® — A Statement of Intent</p>
            <h2 className="wd-sig-title">A premium brand demands<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>a premium digital experience.</em></h2>
            <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.5)', maxWidth:520, margin:'0 auto' }}>There is no version of brand excellence that tolerates digital mediocrity.</p>
          </div>
        </section>

        {/* ══ STRIP ══ */}
        <div className="wd-strip">
          {[
            { src:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&fit=crop', cap:'Design' },
            { src:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop', cap:'Craft' },
            { src:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&fit=crop', cap:'Engineering' },
            { src:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop', cap:'Launch' },
          ].map((cell, i) => (
            <div key={i} style={{ position:'relative', overflow:'hidden' }}>
              <img src={cell.src} alt={cell.cap} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.7)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 50%)' }}/>
              <span style={{ position:'absolute', bottom:12, left:14, fontSize:'.55rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.6)' }}>{cell.cap}</span>
            </div>
          ))}
        </div>

        <Rule />

        {/* ══ FINAL CTA ══ */}
        <section className="wd-cta">
          <span style={{ fontSize:'.58rem', letterSpacing:'.38em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', display:'block', marginBottom:20 }}>Begin the Conversation</span>
          <h2 className="wd-cta-title">Your digital<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>architecture awaits.</em></h2>
          <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.5)', maxWidth:560, margin:'0 auto 36px' }}>Select clients only. We partner with a limited number of brands each quarter.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:40 }}>
            <Link href="/contact" className="wd-btn-white">Get in Touch</Link>
            <Link href="/clientele" className="wd-btn-outline">View Clientele</Link>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:20, maxWidth:280, margin:'0 auto' }}>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,.15)' }}/>
            <span style={{ fontSize:'.6rem', color:'rgba(255,255,255,.3)', letterSpacing:'.15em', textTransform:'uppercase' }}>Enhanccee®</span>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,.15)' }}/>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
