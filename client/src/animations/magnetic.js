import { useRef } from 'react'
import { gsap, useGSAP, MQ } from './gsap'

/**
 * Subtle magnetic pull toward the cursor. Only active on fine pointers with
 * motion allowed; movement is clamped to `max` px in each axis.
 *
 * The offset is written to the CSS `translate` property (via a GSAP-tweened
 * proxy) rather than `transform`, so it composes with CSS hover `scale` and
 * with any GSAP transform animation on the same element or its parents.
 */
export function useMagnetic({ strength = 0.3, max = 10 } = {}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()

      mm.add(`${MQ.finePointer} and ${MQ.motionOK}`, () => {
        const pos = { x: 0, y: 0 }
        const apply = () => {
          el.style.translate = `${pos.x.toFixed(2)}px ${pos.y.toFixed(2)}px`
        }
        const tween = { duration: 0.6, ease: 'power3.out', onUpdate: apply }
        const xTo = gsap.quickTo(pos, 'x', tween)
        const yTo = gsap.quickTo(pos, 'y', tween)
        const clamp = gsap.utils.clamp(-max, max)

        const onMove = (e) => {
          const r = el.getBoundingClientRect()
          xTo(clamp((e.clientX - (r.left + r.width / 2)) * strength))
          yTo(clamp((e.clientY - (r.top + r.height / 2)) * strength))
        }
        const onLeave = () => {
          xTo(0)
          yTo(0)
        }

        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        return () => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
          el.style.translate = ''
        }
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return ref
}
