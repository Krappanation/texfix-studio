'use client'

import { useEffect, useRef } from 'react'

// Track whether the CDN script tag has been appended (survives navigation)
const US_SCRIPT_KEY = '__us_script_appended__'

export default function AuraBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = containerRef.current
    if (!el) return

    let scenes: any[] = []
    let cancelled = false
    let isReturn = false   // true on any navigation after the first load

    // ── 1. Fade in at reduced opacity ────────────────────────────────────────
    const fadeIn = () => {
      if (cancelled) return
      // Return visits fade in faster so there's no noticeable delay
      el.style.transition = isReturn
        ? 'opacity 0.5s ease'
        : 'opacity 1.8s cubic-bezier(0.16,1,0.3,1)'
      el.style.opacity = '0.25'
    }

    // ── 2. IntersectionObserver: pause WebGL when hero is off-screen ─────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scenes.forEach(s => s?.play?.())
          el.style.visibility = 'visible'
        } else {
          scenes.forEach(s => s?.pause?.())
          el.style.visibility = 'hidden'
        }
      },
      { threshold: 0 }
    )
    observer.observe(el)

    // ── 3. Always call init() on mount so the new DOM element gets a scene ───
    //    This is the critical fix: we no longer cache isInitialized,
    //    because each navigation creates a fresh data-us-project div
    //    that UnicornStudio hasn't seen yet.
    const initScenes = async () => {
      if (cancelled) return
      try {
        el.style.transition = 'none'
        el.style.opacity = '0'
        const result = await (window as any).UnicornStudio.init()
        if (Array.isArray(result)) scenes = result
      } catch (_) {}
      // No artificial delay — fade in the moment WebGL is ready
      fadeIn()
    }

    if (!(window as any)[US_SCRIPT_KEY]) {
      // First ever load — append the script tag once
      ;(window as any)[US_SCRIPT_KEY] = true
      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js'
      script.onload = initScenes
      ;(document.head || document.body).appendChild(script)
    } else {
      // Script already in DOM — use one rAF to let the new div render, then init
      isReturn = true
      requestAnimationFrame(initScenes)
    }

    return () => {
      cancelled = true
      observer.disconnect()
      // Destroy scenes so the next mount starts with a clean slate
      scenes.forEach(s => s?.destroy?.())
      scenes = []
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="aura-background-component absolute inset-0 w-full h-full z-0 pointer-events-none"
      data-alpha-mask="80"
      style={{
        opacity: 0,
        willChange: 'opacity',
        maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
      }}
    >
      <div
        data-us-project="cqcLtDwfoHqqRPttBbQE"
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  )
}
