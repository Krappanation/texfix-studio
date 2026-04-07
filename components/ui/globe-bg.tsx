'use client'

import { Globe } from '@/components/ui/globe'

export function GlobeBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Bottom fade so card text remains readable */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Globe — positioned so the top half fills the card */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[520px] h-[520px]">
        <Globe />
      </div>
    </div>
  )
}
