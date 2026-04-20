'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Enhanccee
          </h1>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <p className="mt-4 text-white/60 text-sm animate-pulse">
          {progress}%
        </p>
      </div>
    </div>
  )
}


