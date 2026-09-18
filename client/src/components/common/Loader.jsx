import { useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../animations/gsap'

const SMOKE_PUFFS = 6

function Rocket() {
  return (
    <svg viewBox="0 0 64 100" className="h-24 w-[3.9rem]" aria-hidden="true">
      <defs>
        <linearGradient id="rocket-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#086FFD" />
          <stop offset="55%" stopColor="#0447D2" />
          <stop offset="100%" stopColor="#032487" />
        </linearGradient>
        <linearGradient id="rocket-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* fins */}
      <path d="M16 58 L4 78 L4 90 L16 82 Z" fill="#0447D2" />
      <path d="M48 58 L60 78 L60 90 L48 82 Z" fill="#0447D2" />
      {/* body */}
      <path d="M32 2 C44 14 48 32 48 54 L48 84 L16 84 L16 54 C16 32 20 14 32 2 Z" fill="url(#rocket-body)" />
      <path d="M32 2 C26 10 22 24 21 40 L21 84 L16 84 L16 54 C16 32 20 14 32 2 Z" fill="url(#rocket-shine)" />
      {/* window */}
      <circle cx="32" cy="38" r="8" fill="#FFFFFF" />
      <circle cx="32" cy="38" r="5" fill="#EAF2FF" stroke="#086FFD" strokeWidth="1.5" />
      {/* center fin */}
      <path d="M30 62 H34 V86 H30 Z" fill="#032487" />
      {/* nozzle */}
      <rect x="22" y="84" width="20" height="7" rx="2" fill="#334155" />
    </svg>
  )
}

function Flame() {
  return (
    <svg viewBox="0 0 24 48" className="h-12 w-6 origin-top animate-flicker" aria-hidden="true">
      <defs>
        <linearGradient id="flame-outer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB020" />
          <stop offset="55%" stopColor="#FF6A1A" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF6A1A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flame-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFE08A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M2 0 H22 C22 16 17 30 12 48 C7 30 2 16 2 0 Z" fill="url(#flame-outer)" />
      <path d="M7 0 H17 C17 10 15 18 12 28 C9 18 7 10 7 0 Z" fill="url(#flame-inner)" />
    </svg>
  )
}

/**
 * Rocket-launch intro. The rocket appears on its pad, ignites (flame, smoke,
 * light rumble) and launches off-screen; `onDone` fires as it leaves so the
 * page intro overlaps the loader fade. Reduced motion gets a brief static fade.
 */
export default function Loader({ onDone }) {
  const root = useRef(null)
  const [visible, setVisible] = useState(true)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const hide = () => setVisible(false)

      if (prefersReducedMotion()) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.3, delay: 0.4, onStart: onDone, onComplete: hide })
        return
      }

      const launchDistance = window.innerHeight * 0.7 + 240

      gsap.set(q('[data-flame]'), { scaleY: 0, autoAlpha: 0, transformOrigin: 'top center' })
      gsap.set(q('[data-trail]'), { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(q('[data-smoke]'), { scale: 0, autoAlpha: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(q('[data-rocket]'), { y: 24, autoAlpha: 0, duration: 0.5 })
        .from(q('[data-pad]'), { scaleX: 0, autoAlpha: 0, duration: 0.5 }, '<')
        .from(q('[data-loader-text]'), { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, '<0.1')

        // Ignition
        .addLabel('ignite', '-=0.15')
        .to(q('[data-flame]'), { scaleY: 1, autoAlpha: 1, duration: 0.25, ease: 'power2.out' }, 'ignite')
        .to(q('[data-smoke]'), { scale: 1, autoAlpha: 0.9, duration: 0.25, stagger: 0.04 }, 'ignite')
        .to(
          q('[data-smoke]'),
          {
            scale: 1.8,
            autoAlpha: 0,
            x: (i) => (i - (SMOKE_PUFFS - 1) / 2) * 20,
            y: -8,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.04,
          },
          'ignite+=0.2'
        )
        .to(q('[data-rocket-body]'), { x: 1.2, duration: 0.04, repeat: 7, yoyo: true, ease: 'none' }, 'ignite')
        .addLabel('launch', 'ignite+=0.35')

        // Lift-off
        .to(q('[data-rocket]'), { y: -launchDistance, duration: 0.9, ease: 'power3.in' }, 'launch')
        .to(q('[data-flame]'), { scaleY: 1.6, duration: 0.4, ease: 'power2.in' }, 'launch')
        .to(q('[data-trail]'), { scaleY: 1, duration: 0.8, ease: 'power2.in' }, 'launch')
        .to(q('[data-pad]'), { scaleX: 0.4, autoAlpha: 0, duration: 0.5 }, 'launch')
        .to(q('[data-loader-text]'), { y: -10, autoAlpha: 0, duration: 0.35, stagger: 0.05, ease: 'power2.in' }, 'launch+=0.2')

        // Hand off to the page intro while the overlay fades.
        .add(() => onDone?.(), 'launch+=0.55')
        .to(root.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, 'launch+=0.6')
        .add(hide)
    },
    { scope: root }
  )

  if (!visible) return null

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg"
    >
      <div className="flex flex-col items-center">
        {/* Launch stage */}
        <div className="relative flex h-44 w-40 items-end justify-center">
          {/* pad shadow */}
          <div data-pad className="absolute bottom-0 h-2 w-20 rounded-full bg-slate-900/10 blur-[2px]" />

          {/* smoke */}
          {Array.from({ length: SMOKE_PUFFS }).map((_, i) => (
            <span
              key={i}
              data-smoke
              className="absolute bottom-0 left-1/2 -ml-4 h-8 w-8 rounded-full bg-slate-200"
            />
          ))}

          {/* rocket + flame + trail move together */}
          <div data-rocket className="relative mb-3 flex flex-col items-center">
            <div data-rocket-body>
              <Rocket />
            </div>
            {/* exhaust sits below the nozzle without taking layout space */}
            <div className="absolute left-1/2 top-full -ml-3 -mt-1 w-6">
              <div data-flame>
                <Flame />
              </div>
              <div
                data-trail
                className="absolute left-1/2 top-6 -ml-[3px] h-[55vh] w-1.5 rounded-full bg-gradient-to-b from-orange-300/70 via-primary/25 to-transparent"
              />
            </div>
          </div>
        </div>

        <p data-loader-text className="mt-14 font-display text-3xl font-semibold tracking-tight">
          <span className="gradient-text">Chandra.Dev</span>
        </p>
        <p data-loader-text className="mt-3 text-xs uppercase tracking-[0.3em] text-muted">
          Software Developer
        </p>
      </div>
    </div>
  )
}
