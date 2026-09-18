import { useReveal } from '../animations/scrollReveal'
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
  const scope = useReveal()

  return (
    <section ref={scope} id="process" className="py-28">
      <div className="section-container">
        <div data-reveal="up" className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How I work</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            A process built for <span className="gradient-text">clarity and speed</span>
          </h2>
          <p className="mt-4 text-text">
            Every project moves through the same four stages — no surprises, just steady progress.
          </p>
        </div>

        <div className="relative mt-16">
          {/* connecting line for desktop */}
          <div data-reveal-bar className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-border lg:block" />

          <div data-reveal-stagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="group relative flex flex-col items-start">
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-bg shadow-glow transition-[scale] duration-500 ease-premium group-hover:[scale:1.06]">
                <step.icon size={26} strokeWidth={1.8} />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card font-display text-[11px] font-bold text-primary">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
