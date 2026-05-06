'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import logoImage from './IMG/enhancceelogotemp.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:50 }}>

      {/* ── MOBILE NAV ── */}
      <div className="md:hidden" style={{ background:'#000', borderBottom:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px' }}>
        {/* Logo */}
        <Link href="/" style={{ fontFamily:'var(--font-cormorant), Georgia, serif', fontSize:17, color:'#fff', textDecoration:'none', letterSpacing:'-0.01em' }}>
          enhanccee
        </Link>
        {/* Right side: Enquiry + Hamburger */}
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <Link href="/contact" style={{ fontSize:11, fontWeight:600, color:'#fff', border:'1.5px solid rgba(255,255,255,0.3)', padding:'5px 12px', borderRadius:6, textDecoration:'none' }}>
            Enquiry
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" style={{ background:'none', border:'none', padding:0, cursor:'pointer', display:'flex', flexDirection:'column', gap:5 }}>
            <span style={{ display:'block', width:20, height:1.5, background:'#fff', borderRadius:2 }} />
            <span style={{ display:'block', width:20, height:1.5, background:'#fff', borderRadius:2 }} />
            <span style={{ display:'block', width:20, height:1.5, background:'#fff', borderRadius:2 }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden" style={{ background:'#000', borderBottom:'1px solid rgba(255,255,255,0.1)', padding:'16px 20px', display:'flex', flexDirection:'column', gap:16 }}>
          {[
            { label: 'Home', href: '/' },
            { label: 'Clientele', href: '/clientele' },
            { label: 'Our Services', href: '/services' },
            { label: 'Why Choose Us?', href: '/why-choose-us' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact Us', href: '/contact' },
          ].map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}
              style={{ color:'rgba(255,255,255,0.7)', fontSize:13, fontWeight:500, textDecoration:'none', display:'block' }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* ── DESKTOP NAV ── */}
      <nav className="hidden md:block" style={{ background:'#000', borderBottom:'1px solid rgba(255,255,255,0.15)', padding:'16px 24px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:1920, margin:'0 auto' }}>
          <Link href="/" style={{ display:'block' }}>
            <Image src={logoImage} alt="Enhanccee Logo" width={150} height={40} style={{ height:40, width:'auto' }} priority />
          </Link>
          <div style={{ display:'flex', alignItems:'center', gap:40 }}>
            {['HOME','CLIENTELE','OUR SERVICES','WHY CHOOSE US?','BLOG'].map((label, i) => (
              <Link key={label} href={['/','/clientele','/services','/why-choose-us','/blog'][i]}
                style={{ fontSize:12, color:'#fff', textDecoration:'none', letterSpacing:'0.1em', textTransform:'uppercase', whiteSpace:'nowrap' }}>
                {label}
              </Link>
            ))}
          </div>
          <Link href="/contact" style={{ background:'#fff', color:'#000', padding:'8px 24px', fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', textDecoration:'none', whiteSpace:'nowrap' }}>
            ENQUIRY
          </Link>
        </div>
      </nav>

    </header>
  )
}
