'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const capabilities = [
  {
    cat: 'Discipline 01', title: 'Product Strategy',
    desc: 'We map your product vision to market reality — defining the growth architecture that turns early traction into durable, compounding revenue.',
    list: ['ICP definition & market positioning', 'Jobs-to-be-done research', 'Competitive landscape analysis', 'Pricing & packaging strategy', 'Go-to-market roadmap'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  },
  {
    cat: 'Discipline 02', title: 'Acquisition Systems',
    desc: 'Building predictable, scalable pipelines that fill your funnel with high-intent users — across organic, paid, and product-led channels.',
    list: ['SEO & content growth engine', 'Paid acquisition architecture', 'Product-led growth loops', 'Partnership & affiliate systems', 'Account-based marketing (ABM)'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
  },
  {
    cat: 'Discipline 03', title: 'Onboarding & Activation',
    desc: 'The first 7 days define retention. We engineer activation flows that deliver your core value promise before users have a reason to churn.',
    list: ['Time-to-value optimisation', 'In-app onboarding design', 'Triggered email sequences', 'Feature adoption campaigns', 'Activation milestone tracking'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    cat: 'Discipline 04', title: 'Retention Engineering',
    desc: 'Churn is a product problem, not a support ticket. We instrument the signals that predict departure and intervene before the decision is made.',
    list: ['Churn prediction modelling', 'Health score frameworks', 'Customer success playbooks', 'Re-engagement campaigns', 'NPS & CSAT programmes'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    cat: 'Discipline 05', title: 'Revenue Expansion',
    desc: 'Net revenue retention above 120% is the hallmark of elite SaaS. We build the upsell, cross-sell, and expansion motions that compound your ARR.',
    list: ['Expansion revenue architecture', 'Upsell & cross-sell sequences', 'Usage-based pricing triggers', 'Annual commitment campaigns', 'Customer advocacy & referral'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>,
  },
  {
    cat: 'Discipline 06', title: 'Analytics & Intelligence',
    desc: 'You cannot optimise what you cannot measure. We instrument your product and growth stack to surface the decisions that actually move the needle.',
    list: ['Full-funnel attribution', 'Product analytics implementation', 'Cohort & LTV modelling', 'A/B testing infrastructure', 'Executive growth dashboards'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  },
  {
    cat: 'Discipline 07', title: 'Infrastructure & Scale',
    desc: 'Growth breaks things. We architect the technical and operational foundations that hold under pressure — from Series A to IPO scale.',
    list: ['Cloud architecture (AWS / GCP)', 'Multi-tenant SaaS infrastructure', 'API-first platform design', 'Compliance & security (SOC2 / GDPR)', 'DevOps & release engineering'],
    icon: <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  },
]

const processSteps = [
  { num: '01', phase: 'Phase One', title: 'Diagnose', desc: 'We audit your entire growth system — acquisition channels, activation funnel, retention signals, and revenue architecture. No assumption goes unexamined; no data source goes unmined.', tags: ['Funnel Audit', 'Cohort Analysis', 'Competitive Mapping'] },
  { num: '02', phase: 'Phase Two', title: 'Architect', desc: 'Growth strategy crystallises into a precise system: the channels, experiments, and infrastructure priorities that will compound your ARR fastest with the capital and team you have today.', tags: ['Growth Roadmap', 'Experiment Backlog', 'Resource Allocation'] },
  { num: '03', phase: 'Phase Three', title: 'Activate', desc: 'Execution begins with the highest-leverage levers. We build, launch, and iterate across acquisition, onboarding, and retention simultaneously — compressing the learning cycle at every stage.', tags: ['Sprint Execution', 'A/B Testing', 'Funnel Optimisation'] },
  { num: '04', phase: 'Phase Four', title: 'Compound', desc: 'The systems that work are scaled. The channels that compound are invested in. We institutionalise what works and relentlessly eliminate what does not — building momentum that persists beyond any single campaign.', tags: ['Channel Scaling', 'Playbook Creation', 'Team Enablement'] },
]

const whyRows = [
  { title: 'Systems, Not Campaigns', desc: 'We build growth infrastructure that compounds over time — not one-off campaigns that spike and fade. Every initiative is designed to become a permanent part of your growth engine.' },
  { title: 'Full-Funnel Ownership', desc: 'Most agencies own one slice. We own the full funnel — from first click to expansion revenue — ensuring every stage is optimised as part of a unified commercial system.' },
  { title: 'Embedded, Not Outsourced', desc: 'We work as an extension of your team: inside your Slack, in your sprint reviews, aligned to your ARR targets. Not a vendor. A growth partner with skin in the game.' },
  { title: 'Metrics That Matter', desc: 'CAC, LTV, NRR, payback period — we speak the language of SaaS investors and operators. Every initiative is measured against the metrics that determine your next round.' },
]

/* ─────────────────────────────────────
   DIVIDER
───────────────────────────────────── */
function Rule() {
  return (
    <div className="relative h-px overflow-hidden" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 100%)' }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)', width:'40%', animation:'rule-sweep 4s ease-in-out infinite' }}/>
    </div>
  )
}

/* ─────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────── */
function RevealSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold: 0.05 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: 'opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)' }}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────
   PAGE
───────────────────────────────────── */
export default function SaaSPage() {
  const [capIdx, setCapIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const CARD_W = 343
  function goTo(idx: number) {
    setCapIdx(Math.max(0, Math.min(capabilities.length - 1, idx)))
  }
  useEffect(() => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${capIdx * CARD_W}px)`
  }, [capIdx])

  /* cursor */
  useEffect(() => {
    const dot = document.getElementById('saas-dot')
    const ring = document.getElementById('saas-ring')
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
        @keyframes saas-up { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        .saas-eco-card { background:#111; border:1px solid rgba(255,255,255,.06); transition:all .45s cubic-bezier(.16,1,.3,1); }
        .saas-eco-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#fff,transparent); transform:scaleX(0); transform-origin:left; transition:transform .55s; }
        .saas-eco-card:hover { background:#1a1a1a; transform:translateY(-3px); box-shadow:0 28px 70px rgba(0,0,0,.6); }
        .saas-eco-card:hover::before { transform:scaleX(1); }
        .saas-cap-card { flex-shrink:0; width:340px; background:#111; border:1px solid rgba(255,255,255,.06); padding:52px 44px; position:relative; overflow:hidden; transition:all .4s cubic-bezier(.16,1,.3,1); }
        .saas-cap-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#fff,transparent); transform:scaleX(0); transition:transform .5s; }
        .saas-cap-card:hover { background:#1a1a1a; transform:translateY(-4px); box-shadow:0 30px 80px rgba(0,0,0,.5); }
        .saas-cap-card:hover::after { transform:scaleX(1); }
        .saas-proc-step { background:#111; border:1px solid rgba(255,255,255,.06); padding:56px 52px; position:relative; overflow:hidden; transition:background .4s; }
        .saas-proc-step:hover { background:#1a1a1a; }
        .saas-why-row { padding:28px 0; border-bottom:1px solid rgba(255,255,255,.06); display:flex; gap:24px; align-items:flex-start; transition:all .35s; }
        .saas-why-row:last-child { border-bottom:none; }
        .saas-why-row:hover .saas-why-num { color:#ffffff !important; }
        .saas-ed-cell:hover img { transform:scale(1.06); }
        .saas-btn-primary { background:#ffffff; color:#000000 !important; font-size:.6rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; padding:16px 40px; display:inline-block; position:relative; overflow:hidden; transition:all .35s ease; }
        .saas-btn-primary:hover { background:#e5e5e5; color:#000000 !important; transform:translateY(-2px); box-shadow:0 16px 40px rgba(255,255,255,.15); }
        .saas-btn-primary * { color:#000000 !important; }
        .saas-btn-outline { border:1px solid rgba(255,255,255,.3); color:#ffffff; font-size:.6rem; font-weight:500; letter-spacing:.2em; text-transform:uppercase; padding:16px 40px; display:inline-block; transition:all .35s; }
        .saas-btn-outline:hover { border-color:#ffffff; background:rgba(255,255,255,.08); }
      `}</style>

      {/* Cursor */}
      <div id="saas-dot" className="fixed pointer-events-none z-[9999]" style={{ mixBlendMode:'difference' }}>
        <div style={{ width:6, height:6, borderRadius:'50%', background:'#ffffff', transform:'translate(-50%,-50%)' }}/>
      </div>
      <div id="saas-ring" className="fixed pointer-events-none z-[9998]">
        <div style={{ width:38, height:38, borderRadius:'50%', border:'1px solid rgba(255,255,255,.4)', transform:'translate(-50%,-50%)' }}/>
      </div>

      <Header />

      <main style={{ backgroundColor:'#000000', color:'#ffffff', fontFamily:'var(--font-montserrat)' }}>

        {/* ══════════════ 1 — HERO ══════════════ */}
        <section style={{ height:'100vh', minHeight:700, display:'grid', gridTemplateColumns:'1fr 1fr', overflow:'hidden', position:'relative' }}>
          {/* Left */}
          <div style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 3.75rem 90px', position:'relative', zIndex:3, background:'linear-gradient(110deg, #000 40%, rgba(0,0,0,.7) 100%)' }}>
            <p style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:28, animation:'saas-up .8s .3s ease forwards', opacity:0 }}>
              SaaS Growth Systems
            </p>
            <h1 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2.8rem,4.5vw,5rem)', fontWeight:400, lineHeight:1.08, color:'#ffffff', marginBottom:30, animation:'saas-up .9s .5s ease forwards', opacity:0 }}>
              Where Software<br />
              <em style={{ fontStyle:'normal', fontWeight:400, color:'#ffffff', display:'block' }}>Compounds Into<br />Unstoppable Growth</em>
            </h1>
            <p style={{ fontSize:'.83rem', lineHeight:1.95, color:'rgba(255,255,255,.55)', maxWidth:440, marginBottom:48, animation:'saas-up .9s .7s ease forwards', opacity:0 }}>
              We don&apos;t run campaigns. We engineer growth systems — precision-built to acquire, activate, retain, and expand the right users at every stage of your SaaS journey.
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', animation:'saas-up .9s .9s ease forwards', opacity:0 }}>
              <Link href="/contact" className="saas-btn-primary">Commission Growth</Link>
              <Link href="/clientele" className="saas-btn-outline">View Clientele</Link>
            </div>
          </div>

          {/* Right — image */}
          <div style={{ position:'relative', overflow:'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85&fit=crop"
              alt="SaaS growth dashboard"
              style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.5) saturate(.8)' }}
            />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #000 0%, transparent 30%), linear-gradient(to top, #000 0%, transparent 30%)' }}/>
            {/* Floating badge */}
            <div style={{ position:'absolute', bottom:60, right:20, zIndex:4, background:'rgba(0,0,0,.82)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,.15)', padding:'24px 32px', width:220, animation:'saas-up .9s 1.1s ease forwards', opacity:0 }}>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'2.6rem', lineHeight:1, color:'#ffffff', marginBottom:8 }}>127%</div>
              <div style={{ fontSize:'.62rem', color:'rgba(255,255,255,.55)', letterSpacing:'.08em', lineHeight:1.5 }}>Average net revenue retention across portfolio</div>
            </div>
          </div>

        </section>

        <Rule />

        {/* ══════════════ 2 — MANIFESTO ══════════════ */}
        <RevealSection style={{ padding:'6rem 3.75rem', position:'relative', overflow:'hidden', background:'#0a0a0a' }}>
          <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:100, alignItems:'center' }}>
            <div>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'8rem', lineHeight:.6, color:'rgba(255,255,255,.06)', marginBottom:-16, display:'block' }}>&ldquo;</div>
              <blockquote style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2.4rem,3.8vw,4rem)', fontWeight:400, lineHeight:1.18, color:'#ffffff' }}>
                Growth is not a feature.<br />It is not a campaign.<br />
                <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>It is a system you<br />build or you don&apos;t.</em>
              </blockquote>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:48 }}>
              {[
                { title:'Beyond Vanity Metrics', body:'MRR, ARR, NRR, CAC payback — these are the numbers that matter. We orient every decision around the metrics that determine your valuation, your next round, and your long-term survival.' },
                { title:'The Full Funnel', body:'Acquisition without retention is a leaky bucket. Retention without expansion is a growth ceiling. We engineer every stage as a unified system — compounding at every layer.' },
                { title:'Permanent Infrastructure', body:'The best growth work compounds over time. We build systems, playbooks, and foundations that outlast any single quarter — accelerating as your product and team mature.' },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft:'1px solid rgba(255,255,255,.15)', paddingLeft:28 }}>
                  <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.72rem', fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', color:'#ffffff', marginBottom:12 }}>{item.title}</div>
                  <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.55)' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <Rule />

        {/* ══════════════ 3 — ECOSYSTEM ══════════════ */}
        <RevealSection style={{ padding:'6rem 3.75rem', background:'#000000' }}>
          <div style={{ maxWidth:1280, margin:'0 auto 80px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div>
              <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:16, display:'block' }}>What We Deliver</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,3.2vw,3rem)', fontWeight:400, lineHeight:1.2, color:'#ffffff' }}>
                A Complete <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Growth Architecture</em>
              </h2>
            </div>
            <p style={{ fontSize:'.78rem', lineHeight:2, color:'rgba(255,255,255,.5)', maxWidth:360, textAlign:'right' }}>Six compounding growth disciplines. One unified system. Engineered to drive acquisition, activation, retention, and expansion simultaneously.</p>
          </div>

          <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:3 }}>
            {/* Image card */}
            <div className="saas-eco-card" style={{ gridColumn:'span 1', gridRow:'span 2', minHeight:420, padding:0, overflow:'hidden', position:'relative' }}>
              <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=85&fit=crop" alt="SaaS growth infrastructure" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.7)', transition:'transform .8s cubic-bezier(.16,1,.3,1)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 55%)' }}/>
              <div style={{ position:'absolute', bottom:32, left:36, fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.6)' }}>Growth Infrastructure</div>
            </div>
            {/* Cards 01–04 */}
            {[
              { n:'01', t:'Acquisition Architecture', d:'We build predictable, scalable pipelines that fill your funnel with high-intent users — blending organic, paid, and product-led channels into a unified acquisition system.', tag:'Pipeline Building' },
              { n:'02', t:'Activation & Onboarding', d:'The first 7 days define lifetime value. We engineer activation flows that deliver your core value promise before a new user has any reason to leave.', tag:'Time-to-Value' },
              { n:'03', t:'Retention Engineering', d:'Churn is a product problem, not a support ticket. We instrument the signals that predict departure and build the interventions that prevent it.', tag:'Churn Reduction' },
              { n:'04', t:'Revenue Expansion', d:'Net revenue retention above 120% is the hallmark of elite SaaS. We build the upsell, cross-sell, and expansion motions that compound your ARR quarter over quarter.', tag:'NRR Optimisation' },
            ].map((c, i) => (
              <div key={i} className="saas-eco-card" style={{ padding:'52px 48px', position:'relative', display:'flex', flexDirection:'column' }}>
                <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'3rem', lineHeight:1, color:'rgba(255,255,255,.15)', marginBottom:20 }}>{c.n}</div>
                <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.25rem', fontWeight:400, color:'#ffffff', marginBottom:14, lineHeight:1.3 }}>{c.t}</div>
                <p style={{ fontSize:'.76rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', flex:1 }}>{c.d}</p>
                <span style={{ display:'inline-block', marginTop:28, fontSize:'.55rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', borderBottom:'1px solid rgba(255,255,255,.15)', paddingBottom:3, alignSelf:'flex-start' }}>{c.tag}</span>
              </div>
            ))}
            {/* Wide card 05 */}
            <div className="saas-eco-card" style={{ gridColumn:'span 2', padding:'52px 48px', position:'relative', display:'flex', flexDirection:'column' }}>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'3rem', lineHeight:1, color:'rgba(255,255,255,.15)', marginBottom:20 }}>05</div>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.25rem', color:'#ffffff', marginBottom:14 }}>Growth Analytics & Intelligence</div>
              <p style={{ fontSize:'.76rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', flex:1 }}>You cannot optimise what you cannot measure. We instrument your full growth stack to surface the cohort insights, attribution clarity, and leading indicators that drive compounding decisions.</p>
              <span style={{ display:'inline-block', marginTop:28, fontSize:'.55rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', borderBottom:'1px solid rgba(255,255,255,.15)', paddingBottom:3, alignSelf:'flex-start' }}>Data Infrastructure</span>
            </div>
            {/* Card 06 */}
            <div className="saas-eco-card" style={{ padding:'52px 48px', position:'relative', display:'flex', flexDirection:'column' }}>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'3rem', lineHeight:1, color:'rgba(255,255,255,.15)', marginBottom:20 }}>06</div>
              <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.25rem', color:'#ffffff', marginBottom:14 }}>Technical Scalability</div>
              <p style={{ fontSize:'.76rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', flex:1 }}>Growth breaks infrastructure. We build the cloud architecture, API design, and operational foundations that hold under demand — from first paying customer to enterprise scale.</p>
              <span style={{ display:'inline-block', marginTop:28, fontSize:'.55rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', borderBottom:'1px solid rgba(255,255,255,.15)', paddingBottom:3, alignSelf:'flex-start' }}>Platform Engineering</span>
            </div>
          </div>
        </RevealSection>

        <Rule />

        {/* ══════════════ 4 — CAPABILITIES CAROUSEL ══════════════ */}
        <RevealSection style={{ padding:'6rem 0 6rem 3.75rem', background:'#0a0a0a', overflow:'hidden' }}>
          <div style={{ maxWidth:1280, margin:'0 0 64px', display:'flex', alignItems:'flex-end', justifyContent:'space-between', paddingRight:'3.75rem' }}>
            <div>
              <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:16, display:'block' }}>Technical Mastery</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,3.2vw,3rem)', fontWeight:400, color:'#ffffff' }}>
                Our <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>SaaS Capabilities</em>
              </h2>
            </div>
            <div style={{ display:'flex', gap:12 }}>
              {(['←', '→'] as const).map((label, i) => (
                <button key={i} onClick={() => goTo(i === 0 ? capIdx - 1 : capIdx + 1)} style={{ width:48, height:48, border:'1px solid rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#ffffff', background:'none', cursor:'pointer', fontSize:'1.1rem', transition:'all .3s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.08)')} onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, right:0, width:120, height:'100%', background:'linear-gradient(to right, transparent, #0a0a0a)', zIndex:2, pointerEvents:'none' }}/>
            <div ref={trackRef} style={{ display:'flex', gap:3, transition:'transform .65s cubic-bezier(.16,1,.3,1)', willChange:'transform' }}>
              {capabilities.map((cap, i) => (
                <div key={i} className="saas-cap-card">
                  <div style={{ color:'rgba(255,255,255,.6)', marginBottom:32 }}>{cap.icon}</div>
                  <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.55rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:16 }}>{cap.cat}</div>
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.6rem', fontWeight:400, color:'#ffffff', marginBottom:20, lineHeight:1.2 }}>{cap.title}</div>
                  <p style={{ fontSize:'.76rem', lineHeight:1.9, color:'rgba(255,255,255,.5)', marginBottom:36 }}>{cap.desc}</p>
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

          <div style={{ display:'flex', gap:6, alignItems:'center', marginTop:40, paddingRight:60 }}>
            {capabilities.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ height:2, width: i === capIdx ? 48 : 24, background: i === capIdx ? '#ffffff' : 'rgba(255,255,255,.2)', border:'none', cursor:'pointer', transition:'all .4s', padding:0 }}/>
            ))}
          </div>
        </RevealSection>

        <Rule />

        {/* ══════════════ 5 — PROCESS ══════════════ */}
        <RevealSection style={{ padding:'6rem 3.75rem', background:'#000000', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(30,30,30,.5) 0%, transparent 65%)' }}/>
          <div style={{ position:'relative', zIndex:2, maxWidth:1280, margin:'0 auto' }}>
            <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:16, display:'block' }}>How We Grow You</span>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,3.2vw,3rem)', fontWeight:400, color:'#ffffff', marginBottom:80 }}>
              The Enhanccee <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Growth System</em>
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:3 }}>
              {processSteps.map((s, i) => (
                <div key={i} className="saas-proc-step">
                  <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'5rem', lineHeight:1, color:'rgba(255,255,255,.15)', position:'absolute', top:32, right:40 }}>{s.num}</div>
                  <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.55rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.45)', marginBottom:14 }}>{s.phase}</div>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontSize:'2rem', fontWeight:400, color:'#ffffff', marginBottom:20 }}>{s.title}</h3>
                  <p style={{ fontSize:'.78rem', lineHeight:2, color:'rgba(255,255,255,.5)', maxWidth:480 }}>{s.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:28 }}>
                    {s.tags.map((tag, j) => (
                      <span key={j} style={{ padding:'6px 18px', border:'1px solid rgba(255,255,255,.12)', fontSize:'.58rem', letterSpacing:'.15em', color:'rgba(255,255,255,.5)', textTransform:'uppercase' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
              {/* Full-width step 05 */}
              <div className="saas-proc-step" style={{ gridColumn:'span 2' }}>
                <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'5rem', lineHeight:1, color:'rgba(255,255,255,.15)', position:'absolute', top:32, right:40 }}>05</div>
                <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.55rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.45)', marginBottom:14 }}>Phase Five</div>
                <h3 style={{ fontFamily:'var(--font-cormorant)', fontSize:'2rem', fontWeight:400, color:'#ffffff', marginBottom:20 }}>Scale &amp; Institutionalise</h3>
                <p style={{ fontSize:'.78rem', lineHeight:2, color:'rgba(255,255,255,.5)', maxWidth:680 }}>The experiments that work become channels. The channels that compound become institutions. We build the playbooks, the dashboards, and the team capability that ensures your growth engine accelerates without us — long after our engagement ends.</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:28 }}>
                  {['Channel Scaling','Playbook Codification','Team Enablement','Growth Infrastructure Handoff'].map((t,j) => (
                    <span key={j} style={{ padding:'6px 18px', border:'1px solid rgba(255,255,255,.12)', fontSize:'.58rem', letterSpacing:'.15em', color:'rgba(255,255,255,.5)', textTransform:'uppercase' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <Rule />

        {/* ══════════════ 6 — WHY US ══════════════ */}
        <RevealSection style={{ padding:'6rem 3.75rem', background:'#0a0a0a' }}>
          <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:3 }}>
            {/* Image */}
            <div style={{ position:'relative', overflow:'hidden', minHeight:700 }}>
              <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=85&fit=crop" alt="SaaS team strategy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.7)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, transparent 60%, #0a0a0a 100%), linear-gradient(to top, #0a0a0a 0%, transparent 40%)' }}/>
              {/* Stat boxes */}
              <div style={{ position:'absolute', bottom:48, left:40, right:40, display:'flex', gap:2 }}>
                {[['127%','Avg. NRR'],['40+','SaaS clients'],['18mo','Avg. payback']].map(([n,l],i) => (
                  <div key={i} style={{ flex:1, background:'rgba(0,0,0,.8)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,.12)', padding:'24px 20px', textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'2.2rem', color:'#ffffff', lineHeight:1, marginBottom:6 }}>{n}</div>
                    <div style={{ fontSize:'.58rem', color:'rgba(255,255,255,.45)', letterSpacing:'.08em', lineHeight:1.4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Content */}
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,.06)', padding:'72px 64px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:16, display:'block' }}>The Difference</span>
              <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,2.8vw,2.8rem)', fontWeight:400, lineHeight:1.2, color:'#ffffff', marginBottom:20 }}>
                Why Ambitious SaaS<br />Companies Choose <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>Enhanccee®</em>
              </h2>
              <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.5)', marginBottom:52 }}>We are not a marketing agency. We are a growth engineering firm — a focused team of SaaS operators who build the systems that separate market leaders from also-rans.</p>
              <div>
                {whyRows.map((row, i) => (
                  <div key={i} className="saas-why-row">
                    <div className="saas-why-num" style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.4rem', color:'rgba(255,255,255,.2)', flexShrink:0, lineHeight:1.3, minWidth:32, transition:'color .35s' }}>0{i+1}</div>
                    <div>
                      <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.75rem', fontWeight:600, letterSpacing:'.08em', color:'#ffffff', marginBottom:8, textTransform:'uppercase' }}>{row.title}</div>
                      <p style={{ fontSize:'.74rem', lineHeight:1.85, color:'rgba(255,255,255,.5)' }}>{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        <Rule />

        {/* ══════════════ 7 — SIGNATURE ══════════════ */}
        <RevealSection style={{ position:'relative', overflow:'hidden', height:580, display:'flex', alignItems:'center' }}>
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=85&fit=crop" alt="SaaS growth vision" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 40%', filter:'brightness(.22) saturate(.6)' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #000 0%, rgba(0,0,0,.6) 50%, #000 100%), linear-gradient(to bottom, #000 0%, transparent 20%, transparent 80%, #000 100%)' }}/>
          <div style={{ position:'relative', zIndex:2, width:'100%', textAlign:'center', padding:'0 60px' }}>
            <p style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:36 }}>Enhanccee® — A Statement of Intent</p>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2.6rem,5.5vw,5.5rem)', fontWeight:400, lineHeight:1.1, color:'#ffffff', maxWidth:1280, margin:'0 auto 32px' }}>
              Elite SaaS companies don&apos;t hope for growth.<br />
              <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>They architect it.</em>
            </h2>
            <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.5)', maxWidth:520, margin:'0 auto' }}>The difference between companies that compound and companies that plateau is not luck, product, or market. It is the presence or absence of a deliberate, engineered growth system.</p>
          </div>
        </RevealSection>

        {/* ══════════════ EDITORIAL STRIP ══════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:3, height:220 }}>
          {[
            { src:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&fit=crop', cap:'Analytics' },
            { src:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&fit=crop', cap:'Activation' },
            { src:'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&fit=crop', cap:'Retention' },
            { src:'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop', cap:'Scale' },
          ].map((cell, i) => (
            <div key={i} className="saas-ed-cell" style={{ position:'relative', overflow:'hidden' }}>
              <img src={cell.src} alt={cell.cap} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.35) saturate(.7)', transition:'transform 1.2s cubic-bezier(.16,1,.3,1)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 50%)' }}/>
              <span style={{ position:'absolute', bottom:20, left:20, fontFamily:'var(--font-montserrat)', fontSize:'.55rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', zIndex:2 }}>{cell.cap}</span>
            </div>
          ))}
        </div>

        <Rule />

        {/* ══════════════ 8 — FINAL CTA ══════════════ */}
        <RevealSection style={{ padding:'180px 60px', background:'#000000', position:'relative', textAlign:'center', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 55% 55% at 50% 100%, rgba(30,30,30,.5) 0%, transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:2, maxWidth:740, margin:'0 auto' }}>
            <span style={{ fontFamily:'var(--font-montserrat)', fontSize:'.58rem', letterSpacing:'.38em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:28, display:'block' }}>Begin the Conversation</span>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2.6rem,4.5vw,4.4rem)', fontWeight:400, lineHeight:1.12, color:'#ffffff', marginBottom:24 }}>
              Your growth system<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.7)' }}>starts here.</em>
            </h2>
            <p style={{ fontSize:'.8rem', lineHeight:2, color:'rgba(255,255,255,.5)', marginBottom:64 }}>Select clients only. We partner with a limited number of SaaS companies each quarter — ensuring every engagement receives the full weight of our senior team&apos;s attention and expertise.</p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:72 }}>
              <Link href="/contact" className="saas-btn-primary">Commission Growth</Link>
              <Link href="/clientele" className="saas-btn-outline">View Clientele</Link>
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
