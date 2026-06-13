'use client'

import { useEffect } from 'react'

/**
 * Lightweight smooth scroll — replicates Lenis behaviour with ~50 lines of
 * vanilla JS. Uses a wheel-event interceptor + rAF lerp loop on desktop only.
 * Mobile/tablet keep native scroll (touch events are not intercepted).
 *
 * GSAP ScrollTrigger works without any extra wiring because every
 * window.scrollTo() call fires the native 'scroll' event that ScrollTrigger
 * already listens to internally.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Desktop + fine pointer only — leave touch devices on native scroll
    const isFine  = window.matchMedia('(pointer: fine)').matches
    const isWide  = window.innerWidth >= 768
    if (!isFine || !isWide) return

    const EASE      = 0.1          // 0.07–0.12 feels closest to Lenis duration 1.2–1.6
    const THRESHOLD = 0.5          // stop animating below this pixel delta

    let target  = window.scrollY
    let current = window.scrollY
    let rafId   = 0
    let running = false

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight

    // ── Wheel handler — only update the target, never touch the DOM ──────────
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      // normalise trackpad vs mouse wheel delta
      const delta = e.deltaMode === 1 ? e.deltaY * 28 : e.deltaY
      target = Math.max(0, Math.min(target + delta, maxScroll()))
      if (!running) startLoop()
    }

    // ── rAF loop — lerp current toward target ────────────────────────────────
    const tick = () => {
      const diff = target - current
      if (Math.abs(diff) < THRESHOLD) {
        current = target
        window.scrollTo(0, current)
        running = false
        return            // stop looping — restarts on next wheel event
      }
      current += diff * EASE
      window.scrollTo(0, current)
      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      running = true
      rafId = requestAnimationFrame(tick)
    }

    // ── Sync target when user scrolls via scrollbar, keyboard, anchor, etc. ──
    // Fires when the native scroll position and our target diverge significantly
    const onScroll = () => {
      if (Math.abs(window.scrollY - target) > 60) {
        target  = window.scrollY
        current = window.scrollY
      }
    }

    window.addEventListener('wheel',  onWheel,  { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true  })

    return () => {
      window.removeEventListener('wheel',  onWheel)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
