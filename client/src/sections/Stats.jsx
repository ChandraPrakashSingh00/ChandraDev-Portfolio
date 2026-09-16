import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Folder, Users, Clock, Cpu } from 'lucide-react'

function StatCounter({ to, suffix }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setVal(Math.floor(v)) })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

const STATS = [
  { icon: Folder, value: 7, suffix: '+', label: 'Projects Shipped' },
  { icon: Users, value: 5, suffix: '+', label: 'Happy Clients' },
  { icon: Clock, value: 1, suffix: '+', label: 'Years Experience' },
  { icon: Cpu, value: 15, suffix: '+', label: 'Technologies' },
]

export default function Stats() {
  return (
    <section className="section-container -mt-1 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="gradient-border relative overflow-hidden rounded-3xl bg-card px-6 py-10 shadow-glow sm:px-10"
      >
        <div className="absolute inset-0 bg-radial-glow opacity-60" />
        <div className="relative grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto mb-2 text-primary" size={22} strokeWidth={1.8} />
              <p className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                <StatCounter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
