'use client'

import { useState, useEffect } from 'react'
import SplashScreen from '@/components/SplashScreen'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('splashSeen')
    if (!seen) {
      setShowSplash(true)
    } else {
      setReady(true)
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
        transition: 'opacity 0.8s ease',
      }}>
        {children}
      </div>
    </>
  )
}
