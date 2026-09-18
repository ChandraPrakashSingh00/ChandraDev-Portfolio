import { gsap, useGSAP, MQ } from './gsap'
import { EASE, STAGGER } from './tokens'

// Elements taking part in the first-load sequence, in order. Markup opts in
// with data-intro="<key>"; word-level heading reveals use [data-intro-word]
// (each word must sit inside an overflow-hidden mask).
const SEQUENCE = [
  { sel: '[data-intro="nav"]', from: { y: -20 }, dur: 0.7, at: 0 },
  { sel: '[data-intro="eyebrow"]', from: { y: 16 }, dur: 0.6, at: 0.1 },
  { sel: '[data-intro-word]', from: { yPercent: 110, autoAlpha: 1 }, dur: 1.1, at: 0.15, ease: EASE.expo, stagger: STAGGER.base },
  { sel: '[data-intro="sub"]', from: { y: 20 }, dur: 0.7, at: 0.45 },
  { sel: '[data-intro="text"]', from: { y: 25 }, dur: 0.8, at: 0.55 },
  { sel: '[data-intro="cta"] > *', from: { y: 20 }, dur: 0.7, at: 0.7, stagger: STAGGER.base },
  { sel: '[data-intro="social"] > *', from: { y: 12 }, dur: 0.6, at: 0.8, stagger: STAGGER.tight },
  { sel: '[data-intro="visual"]', from: { scale: 0.95 }, dur: 1.2, at: 0.35, ease: EASE.strong },
]

/**
 * First-load entrance. Targets are hidden before first paint (while the
 * loader covers the page) and the timeline plays once `ready` flips true.
 * Runs only once per full page load; later route changes render normally.
 */
export function usePageIntro(ready) {
  useGSAP(
    () => {
      if (window.matchMedia(MQ.reduceMotion).matches) return

      if (!ready) {
        SEQUENCE.forEach(({ sel, from }) => {
          const els = gsap.utils.toArray(sel)
          if (els.length) gsap.set(els, { autoAlpha: 0, ...from })
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out } })
      SEQUENCE.forEach(({ sel, from, dur, at, ease, stagger }) => {
        const els = gsap.utils.toArray(sel)
        if (!els.length) return
        const to = { autoAlpha: 1, duration: dur, clearProps: 'transform,opacity,visibility' }
        Object.keys(from).forEach((k) => {
          if (k !== 'autoAlpha') to[k] = k === 'scale' ? 1 : 0
        })
        if (ease) to.ease = ease
        if (stagger) to.stagger = stagger
        tl.to(els, to, at)
      })
    },
    // Keep the hidden state when `ready` flips — don't revert between runs.
    { dependencies: [ready], revertOnUpdate: false }
  )
}
