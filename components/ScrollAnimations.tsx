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

      // Process Steps Flip In
      const processSteps = gsap.utils.toArray<Element>('.process-step')
      if (processSteps.length) {
        gsap.fromTo(
          processSteps,
          { rotationY: -90, opacity: 0, transformPerspective: 1000 },
          {
            scrollTrigger: { trigger: '#process', start: 'top 90%', toggleActions: 'play none none reverse' },
            rotationY: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            stagger: 0.2,
          }
        )
      }

      cleanup = () => {
        lenis.destroy()
        gsap.ticker.remove(rafTicker)
      }
    }

    init()

    return () => { cleanup?.() }
  }, [])

  return null
}
