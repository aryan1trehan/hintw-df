'use client'

import { useState } from 'react'
import SplashScreen from '@/components/SplashScreen'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)

  return (
    <>
      {!done && <SplashScreen onComplete={() => setDone(true)} />}
      <div style={{
        opacity: done ? 1 : 0,
        visibility: done ? 'visible' : 'hidden',
        transition: 'opacity 0.8s ease',
      }}>
        {children}
      </div>
    </>
  )
}
