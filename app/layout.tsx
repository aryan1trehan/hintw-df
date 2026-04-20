import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import CinematicEffects from '@/components/CinematicEffects'
import WaterRipple from '@/components/WaterRipple'

/* ─── Cormorant Garamond — Headings (H1 / H2) ─── */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

/* ─── Montserrat — Body / UI / Navigation ─── */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Enhanccee - Elite Marketing & Growth Partner',
  description: 'Crafting brands that stand above the noise',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable}`}
      style={{ backgroundColor: '#000000' }}
    >
      <body
        className="min-h-screen font-body"
        style={{ backgroundColor: '#000000', color: '#ffffff' }}
      >
        <CinematicEffects />
        <WaterRipple />
        {children}
      </body>
    </html>
  )
}
