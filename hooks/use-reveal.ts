'use client'
import { useEffect, useRef, useState } from 'react'

export function useReveal(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

/** inline style for one word in the reveal sequence */
export function wordStyle(visible: boolean, delay: number): React.CSSProperties {
  return {
    display:   'block',
    opacity:    visible ? 1 : 0,
    animation:  visible ? `wordReveal 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s both` : 'none',
  }
}
