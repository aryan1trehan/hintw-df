'use client'

export default function PartnersSaySection() {
  const quotes = [
    'Enhanccee didn’t just grow our business — they elevated our entire market position. We shifted from competing on price to commanding premium.',
    'Finally, a strategic partner who thinks five moves ahead. They don’t execute tasks — they engineer outcomes.',
    'Working with Enhanccee was our inflection point. They helped us transition from startup to industry authority.',
  ]

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <span className="text-white/40 text-xs font-semibold uppercase tracking-[0.3em] mb-5 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-serif font-light px-2">
            What Our Partners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {quotes.map((quote, index) => (
            <article
              key={index}
              className="border border-white/10 bg-black p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl hover:border-white/25 transition-colors duration-300 h-full min-h-0 md:min-h-[200px] flex items-start"
            >
              <p className="text-white/75 text-sm sm:text-base md:text-lg leading-relaxed text-left">“{quote}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
