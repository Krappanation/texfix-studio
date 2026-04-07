'use client'

import { useEffect } from 'react'

export default function ScrollToSection() {
  useEffect(() => {
    const hash = sessionStorage.getItem('scrollTo')
    if (!hash) return
    sessionStorage.removeItem('scrollTo')

    // Wait for the page to fully render before scrolling
    const attempt = (tries = 0) => {
      const el = document.getElementById(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      } else if (tries < 10) {
        setTimeout(() => attempt(tries + 1), 150)
      }
    }
    attempt()
  }, [])

  return null
}
