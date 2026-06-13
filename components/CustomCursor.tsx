'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const circle = circleRef.current
    if (!circle) return

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0
    let rafId: number
    let started = false

    // Cache bento cards once — never query the DOM on every mousemove
    let bentoCards: HTMLElement[] = []
    const cacheBentoCards = () => {
      bentoCards = Array.from(document.querySelectorAll<HTMLElement>('.bento-card'))
    }
    // Initial cache after a short delay so the DOM is ready
    setTimeout(cacheBentoCards, 500)
    // Re-cache on route change in case cards mount later
    window.addEventListener('popstate', cacheBentoCards)

    // Bento spotlight: only update cards that are currently near the cursor
    // (checked inside the rAF loop — free since we're already running it)
    const updateBentoSpotlight = () => {
      for (const card of bentoCards) {
        const rect = card.getBoundingClientRect()
        // Skip cards nowhere near the viewport vertical slice of the cursor
        if (mouseY < rect.top - 100 || mouseY > rect.bottom + 100) continue
        card.style.setProperty('--mouse-x', `${mouseX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${mouseY - rect.top}px`)
      }
    }

    // mousemove: only store coordinates — never touch the DOM here
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!started) {
        curX = mouseX
        curY = mouseY
        started = true
        circle.classList.add('is-visible')
      }
    }

    // Single rAF loop handles lerp + bento spotlight together
    const animate = () => {
      curX += (mouseX - curX) * 0.07
      curY += (mouseY - curY) * 0.07
      circle.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`

      updateBentoSpotlight()

      if (circle.classList.contains('is-service')) {
        const el = document.elementFromPoint(mouseX, mouseY)
        if (!el?.closest('.service-row')) {
          circle.classList.remove('is-service')
        }
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const onDelegatedEnter = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('.service-row')) {
        circle.classList.add('is-service')
        circle.classList.remove('is-hidden')
      } else {
        circle.classList.remove('is-service')
        if (target.closest('button, .shiny-cta, .contact-cta, [role="button"]')) {
          circle.classList.add('is-hidden')
        } else if (target.closest('.glass-card, .bento-card')) {
          circle.classList.add('is-hovering')
        }
      }
    }
    const onDelegatedLeave = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('.service-row')) {
        circle.classList.remove('is-service')
      } else if (target.closest('button, .shiny-cta, .contact-cta, [role="button"]')) {
        circle.classList.remove('is-hidden')
      } else if (target.closest('.glass-card, .bento-card')) {
        circle.classList.remove('is-hovering')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onDelegatedEnter)
    document.addEventListener('mouseout', onDelegatedLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('popstate', cacheBentoCards)
      document.removeEventListener('mouseover', onDelegatedEnter)
      document.removeEventListener('mouseout', onDelegatedLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={circleRef} className="cursor-circle hidden md:block" />
}
