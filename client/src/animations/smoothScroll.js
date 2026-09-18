import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenis = null

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis
 * share one frame loop. Skipped entirely when reduced motion is preferred.
 * Touch devices keep native scrolling (Lenis' default `syncTouch: false`).
 * Nested scroll areas (modals, chat) must carry `data-lenis-prevent`.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    const onTick = (time) => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      lenis = null
    }
  }, [])
}

/** Smoothly scroll to a section by id (falls back to native scrolling). */
export function scrollToSection(id, { offset = 0 } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    // The page height may have just changed (e.g. after a route change).
    lenis.resize()
    lenis.scrollTo(el, { offset })
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }
}

/** Jump to the top instantly — used on route changes. */
export function resetScroll() {
  if (lenis) {
    lenis.resize()
    lenis.scrollTo(0, { immediate: true, force: true })
  } else {
    window.scrollTo(0, 0)
  }
}
