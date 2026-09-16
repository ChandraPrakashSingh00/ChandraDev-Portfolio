import { motion } from 'framer-motion'
import { Search, PenTool, Code2, Rocket } from 'lucide-react'

const STEPS = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Understand your goals, users, and constraints before writing a single line of code.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Wireframe the flow and data model, so the architecture stays clean as it grows.',
  },
  {
    icon: Code2,
    title: 'Develop',
    description: 'Build in small, testable increments with clean, typed, and documented code.',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    description: 'Ship with CI/CD, monitor performance, and iterate based on real usage.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-28">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How I work</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            A process built for <span className="gradient-text">clarity and speed</span>
          </h2>
          <p className="mt-4 text-text">
            Every project moves through the same four stages — no surprises, just steady progress.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line for desktop */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-border lg:block" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative flex flex-col items-start"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-bg shadow-glow">
                <step.icon size={26} strokeWidth={1.8} />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card font-display text-[11px] font-bold text-primary">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
