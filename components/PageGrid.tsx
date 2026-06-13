/**
 * PageGrid — full-viewport grid texture for inner pages.
 *
 * Uses `fixed` positioning so the grid stays locked to the viewport
 * as the user scrolls (same feel as the hero section on the homepage).
 * The vertical mask fades the grid at the very top (nav area) and
 * very bottom, keeping it subtle rather than painting the whole screen.
 */
export default function PageGrid() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 bg-grid pointer-events-none z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        opacity: 0.85,          // slightly softer than the homepage section grids
      }}
    />
  )
}
