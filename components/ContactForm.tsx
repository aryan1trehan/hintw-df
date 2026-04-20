'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    brandName: '',
    phone: '',
    email: '',
    projectCategory: '',
    projectTimeline: '',
    vision: '',
    suitableTime: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitMessage(null)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitMessage('Thank you — your inquiry has been submitted.')
      setFormData({
        fullName: '',
        brandName: '',
        phone: '',
        email: '',
        projectCategory: '',
        projectTimeline: '',
        vision: '',
        suitableTime: '',
      })
    } catch (err) {
      console.error(err)
      setSubmitMessage('Something went wrong. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const inputClass =
    'w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all hover:border-white/50 placeholder-white/40'

  return (
    <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]" style={{ backgroundColor: '#000000' }}>
      {/* Left Column – Contact Information */}
      <div className="w-full lg:w-[38%] px-8 md:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center" style={{ backgroundColor: '#000000' }}>
        <div className="mb-8">
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
            Contact Enhanccee
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-sans font-light mb-6">
            Speak to Enhanccee
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-white/80 italic text-lg leading-relaxed">
            Where brands come to evolve, transform, and become unforgettable.
          </p>
          <p className="text-white/80 italic text-lg leading-relaxed">
            We only work with people who value design, clarity, and long-term brand building. If your vision aligns with excellence, we would love to collaborate.
          </p>
        </div>

        <div className="h-px w-16 bg-white/30 mb-8" />

        <div className="space-y-8">
          <div>
            <p className="text-white text-sm font-semibold uppercase tracking-wider mb-2">Office</p>
            <p className="text-white/80 text-lg">Enhanccee Studio</p>
            <p className="text-white/80 text-lg">Jaipur, India</p>
          </div>

          <div className="space-y-4">
            <a
              href="tel:+917891368868"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-lg">+91 7891368868</span>
            </a>

            <a
              href="mailto:info@enhanccee.com"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-lg">info@enhanccee.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Column – Inquiry Form */}
      <div className="w-full lg:w-[62%] flex items-center justify-center py-16 lg:py-24 px-6 md:px-10 lg:px-16" style={{ backgroundColor: '#000000' }}>
        <div className="w-full max-w-2xl bg-black border border-white/10 px-8 md:px-12 py-12 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              ENQUIRY FORM
            </h2>
            <p className="text-white/70 text-lg">
              Share a few details so we can dive into your world before we speak.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-white text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="brandName" className="block text-white text-sm font-semibold mb-2">
                  Brand/Company Name *
                </label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Enter your brand or company name"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-white text-sm font-semibold mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Project Category */}
            <div>
              <label htmlFor="projectCategory" className="block text-white text-sm font-semibold mb-2">
                Project Category
              </label>
              <div className="relative">
                <select
                  id="projectCategory"
                  name="projectCategory"
                  value={formData.projectCategory}
                  onChange={handleChange}
                  className={inputClass + ' appearance-none cursor-pointer'}
                >
                  <option value="">Select a category</option>
                  <option value="seo">SEO</option>
                  <option value="meta">Meta Advertising</option>
                  <option value="web-dev">Web Development</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="branding">Branding</option>
                  <option value="saas">SaaS Development</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Project Timeline */}
            <div>
              <label htmlFor="projectTimeline" className="block text-white text-sm font-semibold mb-2">
                Project Timeline
              </label>
              <div className="relative">
                <select
                  id="projectTimeline"
                  name="projectTimeline"
                  value={formData.projectTimeline}
                  onChange={handleChange}
                  className={inputClass + ' appearance-none cursor-pointer'}
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-plus-months">6+ months</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div>
              <label htmlFor="vision" className="block text-white text-sm font-semibold mb-2">
                Tell us about your vision *
              </label>
              <textarea
                id="vision"
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                required
                rows={6}
                className={inputClass + ' resize-none'}
                placeholder="Describe your project vision and goals..."
              />
            </div>

            {/* Suitable Time */}
            <div>
              <label htmlFor="suitableTime" className="block text-white text-sm font-semibold mb-2">
                Suitable Time to Connect *
              </label>
              <input
                type="text"
                id="suitableTime"
                name="suitableTime"
                value={formData.suitableTime}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="e.g., Weekdays 10 AM - 6 PM IST"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black border border-white text-white px-8 py-4 font-semibold text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ color: '#ffffff', borderColor: '#ffffff'}}
              >
                {isSubmitting ? 'Submitting…' : 'Submit'}
              </button>
              {submitMessage && (
                <p className="text-sm text-white/70 text-center">{submitMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

