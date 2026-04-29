'use client'

import { useState } from 'react'
import SplashScreen from '@/components/SplashScreen'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div style={{ opacity: showSplash ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        {children}
      </div>
    </>
  )
}
