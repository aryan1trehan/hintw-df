'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import logoImage from './IMG/enhancceelogotemp.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/15">
      <nav className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 py-3 sm:py-4 relative">
        <div className="flex items-center justify-between">

          {/* Logo – Left */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="block hover:opacity-70 transition-opacity"
            >
              <Image
                src={logoImage}
                alt="Enhanccee Logo"
                width={150}
                height={40}
                className="h-8 lg:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav – Center */}
          <div className="hidden md:flex items-center justify-center space-x-6 lg:space-x-10 xl:space-x-12 flex-1">
            {[
              { label: 'HOME', href: '/' },
              { label: 'CLIENTELE', href: '/clientele' },
              { label: 'OUR SERVICES', href: '/services' },
              { label: 'WHY CHOOSE US?', href: '/why-choose-us' },
              { label: 'BLOG', href: '/blog' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs lg:text-sm text-white hover:text-white/70 transition-colors whitespace-nowrap uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Inquiry Button – Right */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link
              href="/contact"
              className="bg-white text-black px-6 py-2 font-semibold text-xs lg:text-sm hover:bg-gray-200 transition-all duration-300 hover:scale-105 uppercase tracking-wider whitespace-nowrap"
            >
              ENQUIRY
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-4 max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto overscroll-contain">
            {[
              { label: 'HOME', href: '/' },
              { label: 'CLIENTELE', href: '/clientele' },
              { label: 'OUR SERVICES', href: '/services' },
              { label: 'WHY CHOOSE US?', href: '/why-choose-us' },
              { label: 'BLOG', href: '/blog' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-xs text-white hover:text-white/70 transition-colors uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block bg-white text-black px-6 py-2 font-semibold text-xs text-center uppercase tracking-wider mt-4 hover:bg-gray-200 transition-colors"
            >
              ENQUIRY
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
