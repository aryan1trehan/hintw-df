import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24" style={{ backgroundColor: '#000000' }}>
      <Header />
      <ContactForm />
      <Footer />
    </main>
  )
}
