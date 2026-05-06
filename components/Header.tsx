'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import logoImage from './IMG/enhancceelogotemp.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── MOBILE NAV: white bg, dark text, Enquiry button ── */}
      <div className="md:hidden bg-white/95 backdrop-blur border-b border-[#ebebeb] flex items-center justify-between px-5 py-[14px]">
        <Link href="/" className="font-serif text-[17px] text-[#111] tracking-[-0.01em]">enhanccee</Link>
        <div className="flex items-center gap-[14px]">
          <Link href="/contact" className="text-[11px] font-semibold text-[#111] border-[1.5px] border-[#ddd] px-3 py-[5px] rounded-md">
            Enquiry
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <div className="flex flex-col gap-[4px]">
              <span className="block w-5 h-[1.5px] bg-[#111] rounded-sm" />
              <span className="block w-5 h-[1.5px] bg-[#111] rounded-sm" />
              <span className="block w-5 h-[1.5px] bg-[#111] rounded-sm" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#ebebeb] px-5 py-4 flex flex-col gap-4">
          {[
            { label: 'Home', href: '/' },
            { label: 'Clientele', href: '/clientele' },
            { label: 'Our Services', href: '/services' },
            { label: 'Why Choose Us?', href: '/why-choose-us' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact Us', href: '/contact' },
          ].map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}
              className="text-[13px] font-medium text-[#111] hover:text-[#555] transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* ── DESKTOP NAV: black bg ── */}
      <nav className="hidden md:block w-full max-w-[1920px] mx-auto bg-black border-b border-white/15 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="block hover:opacity-70 transition-opacity">
              <Image src={logoImage} alt="Enhanccee Logo" width={150} height={40} className="h-8 lg:h-10 w-auto" priority />
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-6 lg:space-x-10 xl:space-x-12 flex-1">
            {[
              { label: 'HOME', href: '/' },
              { label: 'CLIENTELE', href: '/clientele' },
              { label: 'OUR SERVICES', href: '/services' },
              { label: 'WHY CHOOSE US?', href: '/why-choose-us' },
              { label: 'BLOG', href: '/blog' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-xs lg:text-sm text-white hover:text-white/70 transition-colors whitespace-nowrap uppercase tracking-wider">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center flex-shrink-0">
            <Link href="/contact" className="bg-white text-black px-6 py-2 font-semibold text-xs lg:text-sm hover:bg-gray-200 transition-all duration-300 hover:scale-105 uppercase tracking-wider whitespace-nowrap">
              ENQUIRY
            </Link>
          </div>
        </div>
      </nav>

    </header>
  )
}
