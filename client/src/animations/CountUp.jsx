import { useRef } from 'react'
import { gsap, useGSAP, MQ } from './gsap'

/**
 * Counts from 0 to `to` the first time it scrolls into view. The final value
 * is rendered in markup, so it's correct without JS or with reduced motion.
 */
export default function CountUp({ to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motionOK, () => {
        // Update React's own text node so reconciliation stays intact.
        const node = ref.current.firstChild
        const counter = { value: 0 }
        const render = () => {
          node.nodeValue = `${Math.round(counter.value)}${suffix}`
        }
        render()
        gsap.to(counter, {
          value: to,
          duration,
          ease: 'power2.out',
          onUpdate: render,
          scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
        })
        return () => {
          node.nodeValue = `${to}${suffix}`
        }
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [to, suffix] }
  )

  return (
    <span ref={ref} className="tabular-nums">
      {`${to}${suffix}`}
    </span>
  )
}
