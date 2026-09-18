import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Check } from 'lucide-react'
import { services } from '../data/services'
import { useReveal } from '../animations/scrollReveal'
import { scrollToSection } from '../animations/smoothScroll'

export default function Services() {
  const [selected, setSelected] = useState(null)
  const scope = useReveal()

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <section ref={scope} id="services" className="bg-secondary/30 py-28">
      <div className="section-container">
        <div data-reveal="up" className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Services</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            How I can <span className="gradient-text">help your team</span>
          </h2>
          <p className="mt-4 text-text">
            From a single feature to a full product build, here's where I add the most value.
          </p>
        </div>

        <div data-reveal-stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/40"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-colors duration-500 group-hover:bg-primary/20" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-[transform,background-color] duration-500 ease-premium group-hover:scale-110 group-hover:bg-primary/10">
                <s.icon size={22} strokeWidth={1.8} />
              </div>
              <h3 className="relative mt-4 font-display text-base font-semibold text-slate-900">{s.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{s.description}</p>

              <button
                onClick={() => setSelected(s)}
                className="group/btn relative mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-primary"
              >
                <span className="link-underline">View details</span>
                <ArrowRight size={13} className="transition-transform duration-300 ease-premium group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border shadow-glow"
            >
              {/* header with icon instead of image */}
              <div className="relative flex items-center gap-4 overflow-hidden bg-brand-gradient px-6 py-8">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-10 left-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-bg backdrop-blur-sm">
                  <selected.icon size={26} strokeWidth={1.8} />
                </span>
                <h3 className="relative font-display text-2xl font-bold text-bg">{selected.title}</h3>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/30 text-white transition-colors hover:bg-slate-900/50"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-text">{selected.details}</p>

                <h4 className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
                  What's Included
                </h4>
                <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text">
                      <Check size={15} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
                  Tools & Technologies
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.stack.map((t) => (
                    <span key={t} className="rounded-md border border-border px-2.5 py-1 text-xs text-text">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setSelected(null)
                      scrollToSection('contact')
                    }}
                    className="btn-press group flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-bg"
                  >
                    Start a project
                    <ArrowRight size={15} className="transition-transform duration-300 ease-premium group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="btn-press rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-slate-900 hover:border-primary hover:text-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
