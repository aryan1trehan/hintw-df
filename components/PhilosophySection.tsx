export default function LongGameSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-3 sm:px-4 py-1.5 mb-8 sm:mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="text-white/60 text-xs uppercase tracking-[0.25em] font-medium">Our Philosophy</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-5 sm:mb-6">
                Built for the Long Game
              </h2>

              <p className="text-lg sm:text-xl font-semibold text-white/70 mb-5 sm:mb-6">
                Through strategy, design, and performance
              </p>

              <p className="text-white/50 text-base leading-relaxed mb-10">
                We craft brands with presence, precision, and authority. Our methodology combines
                strategic foresight, behavioral psychology, and market dynamics to create brands
                that appreciate in value over time. We&apos;re not here to make noise—we&apos;re
                here to build empires.
              </p>

              <a
                href="/why-choose-us"
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/90"
              >
                Explore Our Methodology &#8594;
              </a>
            </div>

            {/* Right — feature cards */}
            <div className="flex flex-col gap-4">

              {/* Card 1 */}
              <div className="flex items-start gap-4 sm:gap-5 border border-white/10 rounded-xl px-4 sm:px-6 py-4 sm:py-5 hover:border-white/20 transition-colors duration-300">
                <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">Strategic Foresight</h3>
                  <p className="text-white/50 text-sm leading-relaxed">We map market trajectories before they become obvious</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex items-start gap-4 sm:gap-5 border border-white/10 rounded-xl px-4 sm:px-6 py-4 sm:py-5 hover:border-white/20 transition-colors duration-300">
                <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">Behavioral Mastery</h3>
                  <p className="text-white/50 text-sm leading-relaxed">Psychology-driven campaigns that resonate at a deeper level</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex items-start gap-4 sm:gap-5 border border-white/10 rounded-xl px-4 sm:px-6 py-4 sm:py-5 hover:border-white/20 transition-colors duration-300">
                <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">Legacy Building</h3>
                  <p className="text-white/50 text-sm leading-relaxed">Creating brands that compound in value over decades</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}