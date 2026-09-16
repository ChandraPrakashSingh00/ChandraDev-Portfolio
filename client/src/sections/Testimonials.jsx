import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [paused])

  const item = testimonials[index]

  return (
    <section id="testimonials" className="bg-secondary/30 py-28">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            What people <span className="gradient-text">say about working with me</span>
          </h2>
        </div>

        <div
          className="relative mx-auto mt-14 max-w-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="mx-auto mb-4 text-primary/40" size={36} />
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8 text-center shadow-card"
            >
              <div className="mb-4 flex justify-center gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg leading-relaxed text-text">"{item.text}"</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <img src={item.avatar} alt={item.name} className="h-12 w-12 rounded-full border-2 border-primary/50 object-cover" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-muted">{item.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-slate-900 transition-colors hover:border-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-brand-gradient' : 'w-2 bg-border'
                }`}
              />
            ))}
            <button
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-slate-900 transition-colors hover:border-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
