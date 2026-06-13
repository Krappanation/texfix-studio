'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const Lenis = (await import('lenis')).default
      gsap.registerPlugin(ScrollTrigger)

      // ── Lenis smooth scroll ─────────────────────────────────────────────
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)
      const rafTicker = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(rafTicker)
      gsap.ticker.lagSmoothing(0)

      // Project Cards Staggered Fade In
      gsap.utils.toArray<Element>('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
          y: 50, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
        })
      })

      // Bento Cards Staggered Fade In
      gsap.utils.toArray<Element>('.bento-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: '#about', start: 'top 70%' },
          y: 30, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
        })
      })

      cleanup = () => {
        lenis.destroy()
        gsap.ticker.remove(rafTicker)
      }
    }

    // Delay init until after all hero entry animations finish (~2.3s).
    // GSAP/Lenis module evaluation is JS-heavy and would starve the CSS
    // animation engine during the critical first-paint window.
    const timer = setTimeout(init, 2000)

    return () => { clearTimeout(timer); cleanup?.() }
  }, [])

  return null
}
