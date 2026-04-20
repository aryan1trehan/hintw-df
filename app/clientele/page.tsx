import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Fabcurate from '@/components/IMG/images (1).png'
import Superkicks from '@/components/IMG/images (2).png'
import Tichu from '@/components/IMG/images (4)_edited.png'
import RangatJaipur from '@/components/IMG/images (4)_edited_edited.jpg'
import Vako from '@/components/IMG/Untitled design (7).png'
import Outro from '@/components/IMG/Untitled design (8).png'

const clients = [
  { name: 'Fabcurate', logo: Fabcurate },
  { name: 'Superkicks', logo: Superkicks },
  { name: 'Tichu', logo: Tichu },
  { name: 'Rangat Jaipur', logo: RangatJaipur },
  { name: 'VAKO', logo: Vako },
  { name: 'OUTRO', logo: Outro },
]

export default function ClientelePage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden pt-20 sm:pt-24">
      <Header />

      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <span className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 block">
              Our Clientele
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-4 sm:mb-6 px-1 leading-tight">
              Our Collaborations
            </h1>
            <div className="h-px w-12 sm:w-16 bg-white/20 mx-auto mb-4 sm:mb-6" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 italic max-w-3xl mx-auto leading-relaxed px-2">
              Select brands that trust Enhanccee with their identity, digital presence, and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 rounded-xl sm:rounded-2xl border border-white/20 bg-black hover:border-white/45 transition-all duration-300 group min-h-0"
              >
                <div className="relative mx-auto h-36 w-full max-w-[300px] sm:h-40 sm:max-w-[320px] md:h-44 lg:h-48">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                    className="object-contain object-center invert opacity-95 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
