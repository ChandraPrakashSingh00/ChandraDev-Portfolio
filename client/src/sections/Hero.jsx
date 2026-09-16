import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Download, ArrowRight, ChevronDown, Github, Linkedin, Instagram} from 'lucide-react'

export default function Hero() {
  const sceneRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handle = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      setTilt({ x, y })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <section
      id="home"
      ref={sceneRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Animated gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-radial-glow" />
        <motion.div
          className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-purple/20 blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="section-container grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Software Developer
          </span>

          <h1 className="font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl">
            Hi, I'm <span className="gradient-text">Chandra Prakash</span>
          </h1>

          <div className="mt-4 h-10 font-display text-xl font-medium text-primary sm:text-2xl">
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

          <p className="mt-6 max-w-lg text-base leading-relaxed text-text">
            My name is Chandra Prakash Singh, a MERN Stack Developer skilled in MongoDB, Express.js, React.js, and Node.js. I have worked on the UTCI project for *IIT Roorkee, gaining hands-on experience in building scalable, real-world web applications.

          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-bg shadow-glow transition-transform hover:scale-105"
            >
              <Download size={17} strokeWidth={2.5} />
              Download Resume
            </a>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:border-primary hover:text-primary"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-10 flex items-center gap-5">
            {[
              { icon: Github, href: 'https://github.com' },
              { icon: Linkedin, href: 'https://linkedin.com' },
              { icon: Instagram, href: 'https://instagram.com' },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-md items-center justify-center sm:flex"
          style={{
            transform: `perspective(1000px) rotateY(${tilt.x * 6}deg) rotateX(${-tilt.y * 6}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* rotating conic glow ring */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-[2rem] opacity-60 blur-2xl"
            style={{
              background:
                'conic-gradient(from 0deg, #086FFD, #032487, transparent, #086FFD)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
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
                {/* shine sweep */}
                <motion.span
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-120%', '340%'] }}
                  transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
                />
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
                  <motion.span
                    className="ml-0.5 inline-block h-3.5 w-[6px] translate-y-[2px] bg-primary"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                  />
                </code>
              </pre>

              {/* terminal strip */}
              <div className="border-t border-white/10 bg-black/30 px-4 py-2.5 font-mono text-[10px] text-slate-400">
                <span className="text-[#27C93F]">➜</span>{' '}
                <span className="text-slate-300">npm run dev</span>{' '}
                <span className="text-slate-500">— server ready on :3000</span>
              </div>
            </div>

            <motion.div
              className="absolute -top-6 -right-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-glow"
              animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-display text-lg font-bold text-primary">JS</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-8 -left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-glow-purple"
              animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-display text-lg font-bold text-purple">DB</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 right-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-card"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            >
              <span className="font-display text-sm font-bold text-bluesec">API</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={26} />
      </motion.button>
    </section>
  )
}
