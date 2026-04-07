"use client"

import React, { useState } from "react"

interface LiveButtonProps {
  text: string
  url: string
  className?: string
}

export default function LiveButton({
  text,
  url,
  className = "",
}: LiveButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <button
      className={`group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-zinc-700 bg-transparent px-5 py-3 transition-all duration-500 ease-out before:absolute before:inset-0 before:translate-x-[-100%] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:transition-transform before:duration-700 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 hover:before:translate-x-[100%] active:scale-95 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={() => (window.location.href = url)}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      {/* Text */}
      <span className="relative z-10 text-sm leading-[1.2] font-medium tracking-wide whitespace-nowrap text-white transition-all duration-300 group-hover:text-blue-300">
        {text}
      </span>

      {/* Animated dot */}
      <span
        className={`relative z-10 h-3 w-3 rounded-full bg-blue-500 transition-all duration-500 ease-out ${isHovered ? "scale-125 bg-blue-400 shadow-lg shadow-blue-400/50" : ""} ${isPressed ? "scale-90" : ""} before:absolute before:inset-0 before:animate-pulse before:rounded-full before:bg-blue-300 before:opacity-0 group-hover:before:opacity-50`}
      >
        {/* Ripple effect */}
        <div
          className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-0 group-hover:opacity-60"
          style={{ animationDuration: "2s" }}
        ></div>
      </span>

      {/* Hover state border animation */}
      <div className="absolute inset-0 animate-pulse rounded-lg border-2 border-blue-500/0 opacity-0 transition-all duration-500 group-hover:border-blue-500/30 group-hover:opacity-100"></div>
    </button>
  )
}
