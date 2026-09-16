import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { experience } from '../data/experience'

const TYPE_META = {
  work: { label: 'Professional Experience', badge: 'border-primary/30 bg-primary/10 text-primary' },
  education: { label: 'Education', badge: 'border-bluesec/40 bg-bluesec/10 text-bluesec' },
  achievement: { label: 'Certification', badge: 'border-purple/40 bg-purple/10 text-slate-900/90' },
}

export default function Experience() {
  return (
    <section id="experience" className="section-container py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Experience</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          My <span className="gradient-text">professional journey</span>
        </h2>
        <p className="mt-4 text-text">Work, education, and milestones that shaped how I build.</p>
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl">
        {/* Timeline rail */}
        <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-border" />
        <motion.div
          className="absolute left-[19px] top-2 w-px origin-top bg-brand-gradient"
          initial={{ height: 0 }}
          whileInView={{ height: 'calc(100% - 1rem)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        <div className="space-y-8">
          {experience.map((item, i) => {
            const meta = TYPE_META[item.type] ?? TYPE_META.work
            const isCurrent = /present/i.test(item.period)

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-12"
              >
                {/* Node */}
                <span className="absolute left-[19px] top-1.5 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-xl border border-border bg-card shadow-card">
                  <item.icon size={16} className="text-primary" />
                </span>

                {/* Card */}
                <div className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                        <Building2 size={14} className="shrink-0 text-muted" />
                        {item.org}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-text">
                        {item.period}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-text">{item.description}</p>

                  <span
                    className={`mt-4 inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${meta.badge}`}
                  >
                    {meta.label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
