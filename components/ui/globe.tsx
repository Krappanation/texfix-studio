'use client'

import createGlobe, { COBEOptions } from 'cobe'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const BASE_CONFIG: Omit<COBEOptions, 'width' | 'height'> = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.5,
  baseColor: [0.15, 0.15, 0.15],
  markerColor: [59 / 255, 130 / 255, 246 / 255],
  glowColor: [0.1, 0.3, 0.8],
  markers: [
    { location: [40.7128, -74.006],   size: 0.04 }, // New York
    { location: [51.5072, -0.1276],   size: 0.04 }, // London
    { location: [48.8566, 2.3522],    size: 0.03 }, // Paris
    { location: [35.6762, 139.6503],  size: 0.04 }, // Tokyo
    { location: [22.3193, 114.1694],  size: 0.03 }, // Hong Kong
    { location: [-33.8688, 151.2093], size: 0.03 }, // Sydney
    { location: [1.3521, 103.8198],   size: 0.03 }, // Singapore
    { location: [-23.5505, -46.6333], size: 0.03 }, // São Paulo
    { location: [52.52, 13.405],      size: 0.03 }, // Berlin
    { location: [25.2048, 55.2708],   size: 0.03 }, // Dubai
    { location: [19.4326, -99.1332],  size: 0.03 }, // Mexico City
    { location: [34.0522, -118.2437], size: 0.03 }, // Los Angeles
  ],
}

export function Globe({
  className,
  config = {},
}: {
  className?: string
  config?: Partial<Omit<COBEOptions, 'width' | 'height'>>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const size = canvas.offsetWidth || 300
    let phi = 0
    let rafId: number

    const globe = createGlobe(canvas, {
      ...BASE_CONFIG,
      ...config,
      width: size * 2,
      height: size * 2,
    })

    const animate = () => {
      phi += 0.004
      globe.update({ phi })
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    setTimeout(() => { canvas.style.opacity = '1' }, 100)

    return () => {
      cancelAnimationFrame(rafId)
      globe.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'size-full opacity-0 transition-opacity duration-700',
        className,
      )}
    />
  )
}

