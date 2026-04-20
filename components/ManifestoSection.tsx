export default function ManifestoSection() {
  return (
    <section className="py-12 sm:py-16 bg-black border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">

          <div className="relative">
            {/* Opening quote */}
            <span
              className="text-white/20 font-serif select-none block leading-[0.4] md:leading-[0.2] m-0 p-0 md:pl-2 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem]"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Main heading */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-snug sm:leading-tight mb-0 px-0 sm:px-4 md:px-8">
              From presence to permanence, Enhanccee builds brands that define their era.
            </h2>

            {/* Closing quote */}
            <span
              className="text-white/20 font-serif select-none block leading-[0.2] text-right m-0 p-0 md:pr-4 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem]"
              aria-hidden="true"
            >
              &rdquo;
            </span>
          </div>

            {/* Divider */}
          <div className="h-px w-16 sm:w-20 mb-6 sm:mb-8 lg:ml-auto" style={{ backgroundColor: '#C9A84C' }} />

          {/* Subtext */}
          <p className="text-white/50 text-sm sm:text-base md:text-lg font-light tracking-wide text-left lg:text-right max-w-prose lg:max-w-none lg:ml-auto">
          This is our commitment to every partner who walks through our doors.
          </p>

        </div>
      </div>
    </section>
  )
}