import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Shared media queries used with gsap.matchMedia() so every animation reacts
// the same way to reduced-motion preferences and device capabilities.
export const MQ = {
  motionOK: '(prefers-reduced-motion: no-preference)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 768px)',
  finePointer: '(hover: hover) and (pointer: fine)',
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(MQ.reduceMotion).matches

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia(MQ.finePointer).matches

export { gsap, ScrollTrigger, useGSAP }
