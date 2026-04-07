'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface HackerBackgroundProps {
  color?: string
  fontSize?: number
  speed?: number
  className?: string
}

export function HackerBackground({
  color = '#0F0',
  fontSize = 14,
  speed = 1,
  className,
}: HackerBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let width  = canvas.width  = canvas.offsetWidth
    let height = canvas.height = canvas.offsetHeight
    let columns = Math.floor(width / fontSize)
    let drops: number[] = Array(columns).fill(1)
    let interval: ReturnType<typeof setInterval> | null = null

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = color
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const start = () => {
      if (!interval) interval = setInterval(draw, 33 / speed)
    }

    const stop = () => {
      if (interval) { clearInterval(interval); interval = null }
    }

    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? start() : stop() },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    const onResize = () => {
      width  = canvas.width  = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      columns = Math.floor(width / fontSize)
      drops = Array(columns).fill(1)
    }
    window.addEventListener('resize', onResize)

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [color, fontSize, speed])

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
    />
  )
}
