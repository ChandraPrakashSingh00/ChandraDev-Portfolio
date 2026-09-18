import { useEffect, useRef } from 'react'

/**
 * Full-page animated dot-grid background.
 * Renders a fixed <canvas> behind all content: a soft grid of dots that
 * gently drift and pulse, with dots near the cursor glowing brighter.
 */
export default function DotBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let dots = []
    let mouse = { x: -9999, y: -9999 }
    const GAP = 34
    const RADIUS = 1.15

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Touch devices and reduced-motion users get a static grid (no rAF loop).
    const isStatic = reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
      buildDots()
      if (isStatic) drawFrame()
    }

    const buildDots = () => {
      dots = []
      const cols = Math.ceil(window.innerWidth / GAP) + 1
      const rows = Math.ceil(window.innerHeight / GAP) + 1
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            baseX: i * GAP,
            baseY: j * GAP,
            phase: Math.random() * Math.PI * 2,
            speed: 0.6 + Math.random() * 0.6,
          })
        }
      }
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    let t = 0
    const drawFrame = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const d of dots) {
        const drift = isStatic ? 0 : Math.sin(t * d.speed + d.phase) * 3
        const x = d.baseX
        const y = d.baseY + drift

        const dx = x - mouse.x
        const dy = y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / 160)

        const r = RADIUS + influence * 1.8
        const alpha = 0.28 + influence * 0.55

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = influence > 0.05
          ? `rgba(8, 111, 253, ${alpha})`
          : `rgba(100, 116, 139, ${alpha})`
        ctx.fill()
      }
    }

    const draw = () => {
      t += 0.016
      drawFrame()
      raf = requestAnimationFrame(draw)
    }

    // Pause the loop while the tab is hidden.
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!isStatic) {
      window.addEventListener('mousemove', onMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onLeave)
      document.addEventListener('visibilitychange', onVisibility)
      draw()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* soft fade so dots don't fight with section content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.15)_75%,rgba(255,255,255,0.55)_100%)]" />
    </div>
  )
}
