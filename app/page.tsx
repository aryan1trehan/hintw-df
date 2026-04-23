import Hero from '@/components/Hero'
import MotionLogo from '@/components/MotionLogos'
import ManifestoSection from '@/components/ManifestoSection' 
import BentoFeatures from '@/components/BentoFeatures'
import ServicesSection from '@/components/ServicesSection'
import PhilosophySection from '@/components/PhilosophySection'
import ClienteleSection from '@/components/ClienteleSection'
import ResultsSection from '@/components/ResultsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg overflow-x-hidden">
      <Header />
      <Hero />
      <MotionLogo />
      <ManifestoSection />
      <BentoFeatures />
      <ServicesSection />
      <PhilosophySection />
      <ClienteleSection />
      <ResultsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
