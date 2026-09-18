import { Building2 } from 'lucide-react'
import { experience } from '../data/experience'
import { gsap, useGSAP, MQ } from '../animations/gsap'
import { useReveal } from '../animations/scrollReveal'
import { DURATION, EASE, REVEAL_START } from '../animations/tokens'

const TYPE_META = {
  work: { label: 'Professional Experience', badge: 'border-primary/30 bg-primary/10 text-primary' },
  education: { label: 'Education', badge: 'border-bluesec/40 bg-bluesec/10 text-bluesec' },
  achievement: { label: 'Certification', badge: 'border-purple/40 bg-purple/10 text-slate-900/90' },
}

export default function Experience() {
  const scope = useReveal()

  // Rail fills as the timeline scrolls past; items slide in from the left.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motionOK, () => {
        gsap.fromTo(
          '[data-timeline-fill]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 70%', scrub: 0.5 },
          }
        )
        gsap.utils.toArray('[data-timeline-item]').forEach((item) => {
          gsap.from(item, {
            autoAlpha: 0,
            x: -24,
            duration: DURATION.reveal,
            ease: EASE.out,
            clearProps: 'transform,opacity,visibility',
            scrollTrigger: { trigger: item, start: REVEAL_START, once: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope }
  )

  return (
    <section ref={scope} id="experience" className="section-container py-28">
      <div data-reveal="up" className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Experience</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          My <span className="gradient-text">professional journey</span>
        </h2>
        <p className="mt-4 text-text">Work, education, and milestones that shaped how I build.</p>
      </div>

      <div data-timeline className="relative mx-auto mt-16 max-w-3xl">
        {/* Timeline rail */}
        <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-border" />
        <div
          data-timeline-fill
          className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-brand-gradient"
        />

        <div className="space-y-8">
          {experience.map((item) => {
            const meta = TYPE_META[item.type] ?? TYPE_META.work
            const isCurrent = /present/i.test(item.period)

            return (
              <div key={item.id} data-timeline-item className="relative pl-12">
                {/* Node */}
                <span className="absolute left-[19px] top-1.5 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-xl border border-border bg-card shadow-card">
                  <item.icon size={16} className="text-primary" />
                </span>

                {/* Card */}
                <div className="card-lift group rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/40">
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
