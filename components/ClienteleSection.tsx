import Image from 'next/image'
import Link from 'next/link'
import Fabcurate from './IMG/images (1).png'
import Superkicks from './IMG/images (2).png'
import Tichu from './IMG/images (4)_edited.png'
import RangatJaipur from './IMG/images (4)_edited_edited.jpg'
import Vako from './IMG/Untitled design (7).png'
import Outro from './IMG/Untitled design (8).png'

const clients = [
  { name: 'Fabcurate', logo: Fabcurate },
  { name: 'Superkicks', logo: Superkicks },
  { name: 'Tichu', logo: Tichu },
  { name: 'Rangat Jaipur', logo: RangatJaipur },
  { name: 'VAKO', logo: Vako },
  { name: 'OUTRO', logo: Outro },
]

export default function ClienteleSection() {
  return (
    <section id="clientele" className="py-16 sm:py-20 md:py-24 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="text-white/60 text-xs uppercase tracking-[0.25em] font-medium">Trusted By</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 sm:mb-4 px-2">
            Our Clientele
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed sm:leading-8 px-2">
            We partner with founders, visionaries, and enterprises who think beyond immediate wins.
            {' '}
            <span className="hidden sm:inline">
              <br />
            </span>
            Ambition recognizes ambition. Precision attracts precision.
            {' '}
            <span className="hidden sm:inline">
              <br />
            </span>
            Together, we don&apos;t chase markets - we shape them.
          </p>
        </div>

        {/* Grid — logo area sized for readability (not tiny squares in empty cards) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto mb-10 sm:mb-12">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center border border-white/20 rounded-xl sm:rounded-2xl px-2 py-5 sm:px-4 sm:py-7 bg-black hover:border-white/40 transition-all duration-300 group min-h-[112px] sm:min-h-[140px] md:min-h-[152px]"
            >
              <div className="relative h-[4.25rem] w-full max-w-[200px] sm:h-[5.25rem] sm:max-w-[240px] md:h-28 md:max-w-[260px]">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px"
                  className="object-contain object-center invert opacity-95 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/clientele"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-medium tracking-wide px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 w-full max-w-xs sm:w-auto"
          >
            View All Clients
          </Link>
        </div>

      </div>
    </section>
  )
}