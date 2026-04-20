import Link from 'next/link'

export default function ServicesSection() {
  const services = [
    {
      title: 'Meta Advertising',
      description: 'High-performance campaigns that drive measurable results',
      link: '/meta',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'SEO',
      description: 'Scalable organic growth for brands that demand authority',
      link: '/seo',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: 'Web Development',
      description: 'High-performance websites engineered for conversion',
      link: '/web-dev',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive experiences',
      link: '/ui-ux',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: 'Branding',
      description: 'Complete brand identity systems that command attention',
      link: '/branding',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
    },
    {
      title: 'SaaS Development',
      description: 'Scalable SaaS solutions that grow with your business',
      link: '/saas',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <span className="text-white/50 text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-serif font-light px-2">
            Focused. Strategic. Built for Scale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="bg-black p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-white group flex flex-col min-h-0"
            >
              <div className="text-white/60 mb-4 sm:mb-6 group-hover:text-black group-hover:scale-110 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white uppercase tracking-widest mb-3 group-hover:text-black transition-colors duration-300">
                {service.title}
              </h3>
              <div className="h-px w-8 bg-white/20 mb-4 group-hover:w-16 group-hover:bg-black transition-all duration-300" />
              <p className="text-white/60 leading-relaxed text-sm flex-1 group-hover:text-black transition-colors duration-300">{service.description}</p>
              <span className="mt-6 text-white/40 text-xs uppercase tracking-[0.2em] group-hover:text-black transition-colors duration-300">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
