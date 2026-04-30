'use client'

import { useState, useEffect } from 'react'
import SplashScreen from '@/components/SplashScreen'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('splashSeen')
    if (seen) {
      // Already seen — show content immediately, no splash
      setReady(true)
    } else {
      // First visit — show splash
      setShowSplash(true)
    }
  }, [])

  function handleComplete() {
    sessionStorage.setItem('splashSeen', '1')
    setShowSplash(false)
    setReady(true)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      <div style={{
        opacity: ready ? 1 : 0,
        visibility: ready ? 'visible' : 'hidden',
        transition: ready ? 'opacity 0.8s ease' : 'none',
      }}>
        {children}
      </div>
    </>
  )
}
