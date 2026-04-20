import Header from './Header'
import Footer from './Footer'

interface ServiceLayoutProps {
  title: string
  subtitle: string
  description: string
  badge: string
  children: React.ReactNode
}

export default function ServiceLayout({ title, subtitle, description, badge, children }: ServiceLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />

      {/* ── HERO — BLACK ── */}
      <section className="relative px-6 md:px-12 lg:px-16 py-20 md:py-36 flex flex-col items-center justify-center min-h-[75vh] bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-white/40 text-xs font-semibold uppercase tracking-[0.3em] mb-6 block">
            {badge}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-6 leading-tight text-white">
            {title}<br />
            <em className="not-italic text-white/60">{subtitle}</em>
          </h1>
          <div className="h-px w-16 bg-white/20 mx-auto mb-8" />
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* ── CONTENT — BLACK ── */}
      <section className="px-6 md:px-12 lg:px-16 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </section>

      <Footer />
    </div>
  )
}
