import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { useInView as useIOInView } from 'react-intersection-observer'
import { Code2, GraduationCap, MapPin, Sparkles } from 'lucide-react'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.floor(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

const HIGHLIGHTS = [
  { label: 'Years Experience', value: 1, suffix: '+' },
  { label: 'Projects Delivered', value: 7, suffix: '+' },
  { label: 'Happy Clients', value: 5, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
]

export default function About() {
  const [ref, inView] = useIOInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" className="section-container py-28">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass gradient-border relative overflow-hidden rounded-3xl shadow-card"
          >
            <img
              src="./aboutbanner.jpg"
              alt="Portrait of Chandra Prakash at a desk"
              className="aspect-[4/6] w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className="glass absolute -bottom-6 -right-6 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles size={18} className="text-primary" />
            <div>
              <p className="text-sm font-semibold text-slate-900">1+ Years</p>
              <p className="text-xs text-muted">Building for the web</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">About Me</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Turning ideas into <span className="gradient-text">reliable software</span>
          </h2>
          <p className="mt-5 leading-relaxed text-text">
           Hey, I'm Chandra Prakash Singh, a MERN Stack Developer skilled in MongoDB, Express.js, React.js, and Node.js. I have worked on the UTCI project for *IIT Roorkee, gaining hands-on experience in building scalable, real-world web applications.
          </p>
          <p className="mt-4 leading-relaxed text-text">
            I've shipped products across e-commerce, SaaS dashboards, and
            real-time messaging — always focused on clean code, thoughtful UX,
            and performance that holds up under real traffic.
          </p>

          <p className="mt-4 leading-relaxed text-text">I am passionate about developing clean, efficient, and user-focused solutions, and I am eager to contribute my skills while growing with your organization.</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <GraduationCap size={16} className="text-primary" /> BCA, Bachelor of Computer Applications
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-primary" /> Greater Noida, India
            </span>
            <span className="inline-flex items-center gap-2">
              <Code2 size={16} className="text-primary" /> Open to remote roles
            </span>
          </div>

          <div ref={ref} className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border bg-card px-4 py-5 text-center shadow-card"
              >
                <p className="font-display text-2xl font-bold gradient-text sm:text-3xl">
                  <Counter to={h.value} suffix={h.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
