// Animation design tokens — use these instead of ad-hoc timings so the whole
// site moves with one consistent rhythm.

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  reveal: 0.9,
  intro: 1.1,
}

export const EASE = {
  out: 'power3.out',
  strong: 'power4.out',
  expo: 'expo.out',
  inOut: 'power2.inOut',
}

export const STAGGER = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
}

// Distance (px) elements travel during a reveal.
export const DISTANCE = {
  desktop: 40,
  mobile: 24,
}

// ScrollTrigger start position for reveals.
export const REVEAL_START = 'top 88%'
