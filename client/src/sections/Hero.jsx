import { useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Download, ArrowRight, ChevronDown, Github, Linkedin, Instagram } from 'lucide-react'
import { gsap, useGSAP, MQ } from '../animations/gsap'
import { useMagnetic } from '../animations/magnetic'
import { scrollToSection } from '../animations/smoothScroll'

const HEADING = [
  { text: 'Hi,' },
  { text: "I'm" },
  { text: 'Chandra', accent: true },
  { text: 'Prakash', accent: true },
]

const SOCIALS = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
]

export default function Hero() {
  const visualRef = useRef(null)
  const primaryRef = useMagnetic()
  const secondaryRef = useMagnetic()

  // Very light pointer parallax on the code card (desktop only).
  useGSAP(() => {
    const el = visualRef.current
    const mm = gsap.matchMedia()
    mm.add(`${MQ.finePointer} and ${MQ.motionOK}`, () => {
      const xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' })
      const onMove = (e) => {
        xTo((e.clientX / window.innerWidth - 0.5) * 16)
        yTo((e.clientY / window.innerHeight - 0.5) * 16)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      return () => window.removeEventListener('pointermove', onMove)
    })
    return () => mm.revert()
  })

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Soft static gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-purple/15 blur-[120px]" />
      </div>

      <div className="section-container grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* Left */}
        <div>
          <span data-intro="eyebrow" className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Software Developer
          </span>

          <h1 className="font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl">
            {HEADING.map((word, i) => (
              <span key={word.text} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <span data-intro-word className={`inline-block ${word.accent ? 'gradient-text' : ''}`}>
                  {word.text}
                </span>
                {i < HEADING.length - 1 && '\u00A0'}
              </span>
            ))}
          </h1>

          <div data-intro="sub" className="mt-4 h-10 font-display text-xl font-medium text-primary sm:text-2xl">
            <TypeAnimation
              sequence={[
                'MERN Stack Developer', 1800,
                'React Developer', 1800,
                'Node.js Developer', 1800,
                'Backend Developer', 1800,
                'Frontend Developer', 1800,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor
            />
          </div>

          <p data-intro="text" className="mt-6 max-w-lg text-base leading-relaxed text-text">
            My name is Chandra Prakash Singh, a MERN Stack Developer skilled in MongoDB, Express.js, React.js, and Node.js. I have worked on the UTCI project for *IIT Roorkee, gaining hands-on experience in building scalable, real-world web applications.

          </p>

          <div data-intro="cta" className="mt-9 flex flex-wrap items-center gap-4">
            <div>
              <a
                ref={primaryRef}
                href="/resume.pdf"
                download
                className="btn-press group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-bg shadow-glow hover:shadow-[0_10px_40px_rgba(8,111,253,0.35)]"
              >
                <Download size={17} strokeWidth={2.5} className="transition-transform duration-300 ease-premium group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </div>
            <div>
              <button
                ref={secondaryRef}
                onClick={() => scrollToSection('projects')}
                className="btn-press group inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-6 py-3.5 text-sm font-semibold text-slate-900 hover:border-primary hover:bg-white hover:text-primary"
              >
                View Projects
                <ArrowRight size={16} className="transition-transform duration-300 ease-premium group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div data-intro="social" className="mt-10 flex items-center gap-5">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="icon-link flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Right — illustration */}
        <div
          data-intro="visual"
          className="relative mx-auto hidden aspect-square w-full max-w-md sm:block"
        >
        <div ref={visualRef} className="relative flex h-full w-full items-center justify-center">
          {/* soft glow */}
          <div
            className="absolute inset-0 -z-10 rounded-[2rem] opacity-40 blur-2xl"
            style={{
              background:
                'conic-gradient(from 140deg, #086FFD, #032487, transparent, #086FFD)',
            }}
          />

          <div className="glass gradient-border relative flex h-full w-full items-center justify-center rounded-3xl shadow-glow">
            <div className="absolute inset-4 overflow-hidden rounded-2xl bg-secondary/60" />

            {/* Code editor card */}
            <div className="relative z-10 w-[88%] overflow-hidden rounded-xl border border-border bg-[#0B1120] shadow-card sm:w-[85%]">
            {/* window chrome with tabs */}
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-3 rounded-md bg-white/10 px-2.5 py-1 font-mono text-[10px] text-slate-200">
                  dev.js
                </span>
                <span className="rounded-md px-2.5 py-1 font-mono text-[10px] text-slate-500">
                  api.js
                </span>
                <span className="ml-auto font-mono text-[9px] text-slate-500">UTF-8</span>
              </div>

              {/* code body */}
              <pre className="relative overflow-hidden px-4 py-4 font-mono text-[11px] leading-relaxed sm:text-xs">
                <code>
                  <span className="mr-3 select-none text-slate-600">1</span>
                  <span className="text-[#569CD6]">import</span>{' '}
                  <span className="text-slate-300">{'{'} </span>
                  <span className="text-[#9CDCFE]">express</span>
                  <span className="text-slate-300"> {'}'}</span>{' '}
                  <span className="text-[#569CD6]">from</span>{' '}
                  <span className="text-[#CE9178]">'express'</span>
                  <span className="text-slate-300">;</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">2</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">3</span>
                  <span className="text-[#C586C0]">const</span>{' '}
                  <span className="text-[#9CDCFE]">dev</span>{' '}
                  <span className="text-slate-300">=</span>{' '}
                  <span className="text-slate-300">{'{'}</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">4</span>
                  {'  '}
                  <span className="text-[#9CDCFE]">name</span>
                  <span className="text-slate-300">:</span>{' '}
                  <span className="text-[#CE9178]">'Chandra Prakash'</span>
                  <span className="text-slate-300">,</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">5</span>
                  {'  '}
                  <span className="text-[#9CDCFE]">role</span>
                  <span className="text-slate-300">:</span>{' '}
                  <span className="text-[#CE9178]">'MERN Stack Developer'</span>
                  <span className="text-slate-300">,</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">6</span>
                  {'  '}
                  <span className="text-[#9CDCFE]">stack</span>
                  <span className="text-slate-300">:</span>{' '}
                  <span className="text-slate-300">[</span>
                  <span className="text-[#CE9178]">'React'</span>
                  <span className="text-slate-300">, </span>
                  <span className="text-[#CE9178]">'Node'</span>
                  <span className="text-slate-300">,</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">7</span>
                  {'    '}
                  <span className="text-[#CE9178]">'Express'</span>
                  <span className="text-slate-300">, </span>
                  <span className="text-[#CE9178]">'MongoDB'</span>
                  <span className="text-slate-300">],</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">8</span>
                  {'  '}
                  <span className="text-[#9CDCFE]">focus</span>
                  <span className="text-slate-300">:</span>{' '}
                  <span className="text-[#CE9178]">'clean, fast UI'</span>
                  <span className="text-slate-300">,</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">9</span>
                  {'  '}
                  <span className="text-[#DCDCAA]">isAvailable</span>
                  <span className="text-slate-300">:</span>{' '}
                  <span className="text-[#569CD6]">true</span>
                  <span className="text-slate-300">,</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">10</span>
                  {'  '}
                  <span className="text-[#9CDCFE]">status</span>
                  <span className="text-slate-300">:</span>{' '}
                  <span className="text-[#CE9178]">'shipping 🚀'</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">11</span>
                  <span className="text-slate-300">{'}'}</span>
                  <span className="text-slate-300">;</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">12</span>
                  {'\n'}
                  <span className="mr-3 select-none text-slate-600">13</span>
                  <span className="text-[#569CD6]">export</span>{' '}
                  <span className="text-[#569CD6]">default</span>{' '}
                  <span className="text-[#9CDCFE]">dev</span>
                  <span className="text-slate-300">;</span>
                  <span className="ml-0.5 inline-block h-3.5 w-[6px] translate-y-[2px] animate-blink bg-primary" />
                </code>
              </pre>

              {/* terminal strip */}
              <div className="border-t border-white/10 bg-black/30 px-4 py-2.5 font-mono text-[10px] text-slate-400">
                <span className="text-[#27C93F]">➜</span>{' '}
                <span className="text-slate-300">npm run dev</span>{' '}
                <span className="text-slate-500">— server ready on :3000</span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 flex h-16 w-16 animate-float-soft items-center justify-center rounded-2xl bg-card shadow-glow">
              <span className="font-display text-lg font-bold text-primary">JS</span>
            </div>
            <div className="absolute -bottom-8 -left-6 flex h-16 w-16 animate-float-soft items-center justify-center rounded-2xl bg-card shadow-glow-purple [animation-delay:-2s]">
              <span className="font-display text-lg font-bold text-purple">DB</span>
            </div>
            <div className="absolute -bottom-4 right-2 flex h-12 w-12 animate-float-soft items-center justify-center rounded-2xl bg-card shadow-card [animation-delay:-4s]">
              <span className="font-display text-sm font-bold text-bluesec">API</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-primary"
      >
        <ChevronDown size={26} className="animate-nudge" />
      </button>
    </section>
  )
}
