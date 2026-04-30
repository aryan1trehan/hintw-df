import Hero from '@/components/Hero'
import MotionLogo from '@/components/MotionLogos'
import ResultsSection from '@/components/ResultsSection'
import ServicesSection from '@/components/ServicesSection'
import BentoFeatures from '@/components/BentoFeatures'
import PhilosophySection from '@/components/PhilosophySection'
import ManifestoSection from '@/components/ManifestoSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg overflow-x-hidden">
      <Header />
      <Hero />
      <MotionLogo />
      <ResultsSection />
      <ServicesSection />
      <BentoFeatures />
      <PhilosophySection />
      <ManifestoSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
