import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const glow = glowRef.current
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let gx = mx
    let gy = my

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot) {
        dot.style.transform = `translate(${mx}px, ${my}px)`
      }
    }

    const onDown = () => glow?.classList.add('scale-75')
    const onUp = () => glow?.classList.remove('scale-75')

    let raf
    const loop = () => {
      gx += (mx - gx) * 0.12
      gy += (my - gy) * 0.12
      if (glow) glow.style.transform = `translate(${gx}px, ${gy}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      <div
        ref={glowRef}
        className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-transform duration-300 ease-out"
      />
      <div
        ref={dotRef}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-primary"
      />
    </div>
  )
}
