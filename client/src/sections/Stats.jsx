import { Folder, Users, Clock, Cpu } from 'lucide-react'
import { useReveal } from '../animations/scrollReveal'
import CountUp from '../animations/CountUp'

const STATS = [
  { icon: Folder, value: 7, suffix: '+', label: 'Projects Shipped' },
  { icon: Users, value: 5, suffix: '+', label: 'Happy Clients' },
  { icon: Clock, value: 1, suffix: '+', label: 'Years Experience' },
  { icon: Cpu, value: 15, suffix: '+', label: 'Technologies' },
]

export default function Stats() {
  const scope = useReveal()

  return (
    <section ref={scope} className="section-container -mt-1 pb-4">
      <div
        data-reveal="scale"
        className="gradient-border relative overflow-hidden rounded-3xl bg-card px-6 py-10 shadow-glow sm:px-10"
      >
        <div className="absolute inset-0 bg-radial-glow opacity-60" />
        <div data-reveal-stagger className="relative grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto mb-2 text-primary" size={22} strokeWidth={1.8} />
              <p className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
