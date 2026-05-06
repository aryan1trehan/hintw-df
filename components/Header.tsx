'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import logoImage from './IMG/enhancceelogotemp.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:50 }}>
      <style>{`
        .mobile-nav { display: flex; }
        .desktop-nav { display: none; }
        @media (min-width: 768px) {
          .mobile-nav { display: none !important; }
          .mobile-dropdown { display: none !important; }
          .desktop-nav { display: block; }
        }
      `}</style>

      {/* MOBILE NAV */}
      <div className="mobile-nav" style={{ background:'#000', borderBottom:'1px solid rgba(255,255,255,0.1)', padding:'12px 16px', flexDirection:'row', flexWrap:'nowrap', alignItems:'center', justifyContent:'space-between', width:'100%', boxSizing:'border-box' }}>
        <Link href="/" style={{ color:'#fff', textDecoration:'none', fontSize:16, flexShrink:0 }}>
          enhanccee
        </Link>
        <div style={{ display:'flex', flexDirection:'row', alignItems:'center', gap:10, flexShrink:0 }}>
          <Link href="/contact" style={{ fontSize:11, fontWeight:600, color:'#fff', border:'1.5px solid rgba(255,255,255,0.4)', padding:'5px 10px', borderRadius:6, textDecoration:'none', whiteSpace:'nowrap' }}>
            Enquiry
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" style={{ background:'none', border:'none', padding:'2px 0', cursor:'pointer', display:'flex', flexDirection:'column', gap:4, flexShrink:0 }}>
            <span style={{ display:'block', width:18, height:2, background:'#fff', borderRadius:1 }} />
            <span style={{ display:'block', width:18, height:2, background:'#fff', borderRadius:1 }} />
            <span style={{ display:'block', width:18, height:2, background:'#fff', borderRadius:1 }} />
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="mobile-dropdown" style={{ background:'#000', borderBottom:'1px solid rgba(255,255,255,0.1)', padding:'16px 20px', display:'flex', flexDirection:'column', gap:16 }}>
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

      {/* DESKTOP NAV */}
      <nav className="desktop-nav" style={{ background:'#000', borderBottom:'1px solid rgba(255,255,255,0.15)', padding:'16px 24px' }}>
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
