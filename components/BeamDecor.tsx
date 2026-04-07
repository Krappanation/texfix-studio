'use client'

// Replicates the exact animated beam from AnimatedBadge, placed subtly
// at a few corners/edges across all pages for a consistent techy accent.

interface BeamProps {
  id: string
  color?: string
  width: number
  height: number
  path: string          // SVG path for the trace + offset-path
  duration: string
  delay: string
  style?: React.CSSProperties
}

function Beam({ id, color = '#3B82F6', width, height, path, duration, delay, style }: BeamProps) {
  const maskId   = `bm-mask-${id}`
  const gradId   = `bm-grad-${id}`
  const dotClass = `bm-dot-${id}`

  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className="absolute pointer-events-none hidden lg:block"
        style={style}
        aria-hidden
      >
        <defs>
          <mask id={maskId}>
            <path d={path} strokeWidth="0.6" stroke="white" fill="none" />
          </mask>
          <radialGradient id={gradId} fx="1">
            <stop offset="0%"   stopColor={color} />
            <stop offset="20%"  stopColor={color} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Faint trace line */}
        <path d={path} strokeWidth="0.5" stroke="rgba(255,255,255,0.06)" fill="none" />

        {/* Traveling glow dot */}
        <g mask={`url(#${maskId})`}>
          <circle
            className={`${dotClass} bm-dot`}
            cx="0" cy="0" r="20"
            fill={`url(#${gradId})`}
          />
        </g>
      </svg>

      <style>{`
        .${dotClass} {
          offset-anchor: 10px 0px;
          offset-path: path("${path}");
          animation: bm-travel ${duration} linear ${delay} infinite;
        }
        @keyframes bm-travel {
          0%   { offset-distance: 0%;   }
          50%  { offset-distance: 100%; }
          100% { offset-distance: 100%; }
        }
      `}</style>
    </>
  )
}

export default function BeamDecor() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden>

      {/* Top-left corner — same direction as badge */}
      <Beam
        id="tl"
        width={120} height={80}
        path="M 120 0 h -40 q -4 0 -4 4 v 18 q 0 4 -4 4 h -28 q -4 0 -4 4 v 18 q 0 4 -4 4 h -40"
        duration="3.5s" delay="0s"
        style={{ top: 80, left: 0, opacity: 0.9 }}
      />

      {/* Top-right corner — mirrored */}
      <Beam
        id="tr"
        width={120} height={80}
        path="M 0 0 h 40 q 4 0 4 4 v 18 q 0 4 4 4 h 28 q 4 0 4 4 v 18 q 0 4 4 4 h 40"
        duration="4s" delay="-1.5s"
        style={{ top: 80, right: 0, opacity: 0.8 }}
      />

      {/* Bottom-left */}
      <Beam
        id="bl"
        width={100} height={70}
        path="M 100 70 h -32 q -4 0 -4 -4 v -16 q 0 -4 -4 -4 h -24 q -4 0 -4 -4 v -16 q 0 -4 -4 -4 h -40"
        duration="3.8s" delay="-2s"
        style={{ bottom: 120, left: 0, opacity: 0.7 }}
      />

      {/* Bottom-right */}
      <Beam
        id="br"
        width={100} height={70}
        path="M 0 70 h 32 q 4 0 4 -4 v -16 q 0 -4 4 -4 h 24 q 4 0 4 -4 v -16 q 0 -4 4 -4 h 40"
        duration="4.2s" delay="-0.8s"
        style={{ bottom: 120, right: 0, opacity: 0.7 }}
      />

      {/* Left mid — longer trace */}
      <Beam
        id="lm"
        width={80} height={90}
        path="M 80 0 h -24 q -4 0 -4 4 v 22 q 0 4 -4 4 h -20 q -4 0 -4 4 v 22 q 0 4 -4 4 h -28"
        duration="5s" delay="-2.5s"
        style={{ top: '42%', left: 0, opacity: 0.6 }}
      />

      {/* Right mid */}
      <Beam
        id="rm"
        width={80} height={90}
        path="M 0 0 h 24 q 4 0 4 4 v 22 q 0 4 4 4 h 20 q 4 0 4 4 v 22 q 0 4 4 4 h 28"
        duration="5s" delay="-4s"
        style={{ top: '38%', right: 0, opacity: 0.6 }}
      />

    </div>
  )
}
