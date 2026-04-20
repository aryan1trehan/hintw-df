'use client'

import { useEffect } from 'react'

// Lightweight cinematic cursor + scroll reveal effects adapted from the provided prototype.
// Layout of the existing page is unchanged – this component only adds overlays and JS effects.

export default function CinematicEffects() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    const curRing = document.getElementById('curR')
    if (!cur || !curRing) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    document.addEventListener('mousemove', onMove)

    // Enlarge ring when hovering interactive elements
    const hoverTargets = Array.from(
      document.querySelectorAll<HTMLElement>('a, button, [data-cursor-big]')
    )
    const addHover = (el: HTMLElement) => {
      el.addEventListener('mouseenter', () => curRing.classList.add('big'))
      el.addEventListener('mouseleave', () => curRing.classList.remove('big'))
    }
    hoverTargets.forEach(addHover)

    const loop = () => {
      cur.style.left = `${mx}px`
      cur.style.top = `${my}px`
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      curRing.style.left = `${rx}px`
      curRing.style.top = `${ry}px`
      requestAnimationFrame(loop)
    }
    loop()

    // Scroll reveal for sections – keep existing layout, just add animation classes.
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'))
    sections.forEach((sec) => sec.classList.add('cinematic-section'))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            entry.target.classList.add('cinematic-section-visible')
          }
        })
      },
      { threshold: [0.25, 0.5] }
    )

    sections.forEach((sec) => io.observe(sec))

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement
      if (link && link.hash) {
        e.preventDefault()
        const targetId = link.hash.substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', handleAnchorClick)
      io.disconnect()
    }
  }, [])

  return (
    <>
      <div id="cur" />
      <div id="curR" />
    </>
  )
}





