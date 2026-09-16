import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="section-container py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-brand-gradient px-8 py-16 text-center shadow-glow sm:px-16"
      >
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <span className="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Let's work together
        </span>

        <h2 className="relative mt-5 font-display text-3xl font-bold text-bg sm:text-4xl lg:text-5xl">
          Have a project in mind?
          <br />
          Let's build it together.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-sm text-white/80 sm:text-base">
          Whether it's a full product, an MVP, or a feature your team is stuck on — I'd love to hear
          about it.
        </p>

        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 rounded-full bg-bg px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-105"
          >
            <Mail size={16} strokeWidth={2.5} />
            Start a conversation
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </section>
  )
}
