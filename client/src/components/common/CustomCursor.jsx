import { useRef, useState } from 'react'
import { gsap, useGSAP, MQ } from '../../animations/gsap'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor]'

/**
 * Subtle trailing ring that complements (never replaces) the native cursor.
 * States: default ring → grows over interactive elements → becomes a "View"
 * pill over elements marked `data-cursor="view"`. Desktop + motion only.
 */
export default function CustomCursor() {
  const ringRef = useRef(null)
  const [state, setState] = useState('default') // default | hover | view

  useGSAP(() => {
    const ring = ringRef.current
    const mm = gsap.matchMedia()

    mm.add(`${MQ.finePointer} and ${MQ.motionOK}`, () => {
      gsap.set(ring, { xPercent: -50, yPercent: -50, autoAlpha: 0 })
      const xTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
      const yTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })
      let visible = false

      const onMove = (e) => {
        if (!visible) {
          gsap.set(ring, { x: e.clientX, y: e.clientY })
          gsap.to(ring, { autoAlpha: 1, duration: 0.3 })
          visible = true
        }
        xTo(e.clientX)
        yTo(e.clientY)
      }
      const onOver = (e) => {
        const target = e.target.closest?.(INTERACTIVE)
        if (!target) return setState('default')
        setState(target.dataset.cursor === 'view' ? 'view' : 'hover')
      }
      const onLeaveWindow = () => {
        gsap.to(ring, { autoAlpha: 0, duration: 0.3 })
        visible = false
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeaveWindow)
      return () => {
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerover', onOver)
        document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
      }
    })

    return () => mm.revert()
  })

  const size =
    state === 'view'
      ? 'h-16 w-16 border-transparent bg-primary shadow-glow'
      : state === 'hover'
        ? 'h-11 w-11 border-primary/50 bg-primary/5'
        : 'h-7 w-7 border-primary/40 bg-transparent'

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className={`pointer-events-none invisible fixed left-0 top-0 z-[90] hidden items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-premium md:flex ${size}`}
    >
      <span
        className={`text-[11px] font-semibold tracking-wide text-white transition-opacity duration-200 ${
          state === 'view' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        View
      </span>
    </div>
  )
}
