import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, MQ } from './gsap'
import { DURATION, EASE, STAGGER, DISTANCE, REVEAL_START } from './tokens'

// Props GSAP leaves inline after a reveal. Clearing them hands control back to
// CSS so hover states (which use the independent `translate`/`scale`
// properties) keep working.
const CLEAR = 'transform,opacity,visibility,clipPath'

function fromState(variant, d) {
  switch (variant) {
    case 'fade':
      return { autoAlpha: 0 }
    case 'left':
      return { autoAlpha: 0, x: -d }
    case 'right':
      return { autoAlpha: 0, x: d }
    case 'scale':
      return { autoAlpha: 0, scale: 0.96, y: d / 2 }
    case 'clip':
      return { autoAlpha: 0, clipPath: 'inset(10% 10% 10% 10%)', scale: 1.04 }
    case 'up':
    default:
      return { autoAlpha: 0, y: d }
  }
}

function toState(variant) {
  const base = { autoAlpha: 1, x: 0, y: 0, scale: 1 }
  if (variant === 'clip') return { ...base, clipPath: 'inset(0% 0% 0% 0%)' }
  return base
}

/**
 * Declarative scroll reveals. Attach the returned ref to a section and mark
 * elements inside it:
 *
 *   data-reveal="up|fade|left|right|scale|clip"  single element reveal
 *   data-reveal-delay="0.1"                       optional delay (s)
 *   data-reveal-stagger                           container whose children
 *                                                 (or [data-reveal-item]s)
 *                                                 reveal in staggered batches
 *   data-reveal-bar                               progress bar, grows via scaleX
 *
 * Nothing is hidden when the user prefers reduced motion.
 */
export function useReveal() {
  const scope = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add({ motionOK: MQ.motionOK, desktop: MQ.desktop }, ({ conditions }) => {
        if (!conditions.motionOK) return
        const d = conditions.desktop ? DISTANCE.desktop : DISTANCE.mobile
        const q = gsap.utils.selector(scope)

        q('[data-reveal]').forEach((el) => {
          const variant = el.dataset.reveal || 'up'
          gsap.fromTo(el, fromState(variant, d), {
            ...toState(variant),
            duration: variant === 'clip' ? DURATION.intro : DURATION.reveal,
            delay: Number(el.dataset.revealDelay) || 0,
            ease: variant === 'clip' ? EASE.strong : EASE.out,
            clearProps: CLEAR,
            scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
          })
        })

        q('[data-reveal-stagger]').forEach((container) => {
          const marked = container.querySelectorAll(':scope > [data-reveal-item]')
          const items = marked.length ? [...marked] : [...container.children]
          if (!items.length) return

          gsap.set(items, fromState('up', d))
          ScrollTrigger.batch(items, {
            start: REVEAL_START,
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                ...toState('up'),
                duration: DURATION.reveal,
                ease: EASE.out,
                stagger: STAGGER.base,
                overwrite: true,
                clearProps: CLEAR,
              }),
          })
        })

        q('[data-reveal-bar]').forEach((bar) => {
          gsap.fromTo(
            bar,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.2,
              ease: EASE.out,
              scrollTrigger: { trigger: bar, start: 'top 95%', once: true },
            }
          )
        })
      })

      return () => mm.revert()
    },
    { scope }
  )

  return scope
}
