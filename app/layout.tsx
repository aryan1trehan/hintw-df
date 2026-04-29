import type { Metadata, Viewport } from 'next'
import './globals.css'
import CinematicEffects from '@/components/CinematicEffects'
import WaterRipple from '@/components/WaterRipple'
import ClientLayout from './ClientLayout'

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
    <html lang="en" style={{ backgroundColor: '#000000' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-cormorant: 'Cormorant Garamond', serif;
            --font-montserrat: 'Montserrat', sans-serif;
          }
        `}</style>
      </head>
      <body className="min-h-screen font-body" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
        <CinematicEffects />
        <WaterRipple />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
