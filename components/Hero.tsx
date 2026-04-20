'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 pt-28 pb-24 sm:pt-32 sm:pb-28 md:py-32">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mb-8">
          <span className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] px-1">
            Elite Marketing &amp; Growth Partner
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-6 leading-[1.1] sm:leading-tight text-white px-1">
          Crafting brands that<br />
          stand above the noise
        </h1>

        <div className="h-px w-16 bg-white/20 mx-auto mb-8" />

        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 sm:mb-12 px-1">
          We engineer scalable growth for brands that demand authority, not just visibility.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none mx-auto">
          <Link
            href="/clientele"
            className="bg-white text-black px-8 sm:px-10 py-3.5 sm:py-4 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-center"
            style={{ backgroundColor: '#ffffff', color: '#000000' }}
          >
            View Portfolio
          </Link>
          <Link
            href="/services"
            className="bg-black border-2 border-white text-white px-8 sm:px-10 py-3.5 sm:py-4 font-semibold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-center"
            style={{ 
              backgroundColor: '#000000', 
              color: '#ffffff', 
              borderColor: '#ffffff',
              WebkitTextFillColor: '#ffffff'
            }}
          >
            Our Services
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          })
        }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:opacity-70 transition-opacity"
        aria-label="Scroll down"
      >
        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  )
}
