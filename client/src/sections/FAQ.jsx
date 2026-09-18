import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useReveal } from '../animations/scrollReveal'

const FAQS = [
  {
    q: 'What is your typical project timeline?',
    a: 'Most MERN stack projects take 3-8 weeks depending on scope — a landing page can ship in days, while a full product with auth, dashboards, and payments usually takes 6-8 weeks.',
  },
  {
    q: 'Do you work with existing codebases?',
    a: 'Yes. I regularly join projects mid-stream — auditing the code, fixing bugs, adding features, or migrating a legacy stack to React and Node without breaking what already works.',
  },
  {
    q: 'What does your development process look like?',
    a: 'Discover, design, develop, deploy. I start with your requirements and data model, share progress in short cycles, and deploy early so you can test real functionality throughout.',
  },
  {
    q: 'Can you handle both frontend and backend?',
    a: 'Absolutely — that is the core of MERN stack development. I build the React interface, the Node/Express API, the MongoDB schema, and the deployment pipeline end-to-end.',
  },
  {
    q: 'How do we get started?',
    a: 'Send a message through the contact form with a short project brief. I usually reply within 24 hours with questions or a proposed scope and timeline.',
  },
]

function FaqItem({ item, isOpen, onClick }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow] duration-300 ${
        isOpen ? 'border-primary/30 shadow-card' : 'border-border hover:border-primary/30'
      }`}
    >
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-sm font-semibold text-slate-900 sm:text-base">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const scope = useReveal()

  return (
    <section ref={scope} id="faq" className="bg-secondary/30 py-28">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal="up">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
            <p className="mt-4 max-w-sm text-text">
              Everything you might want to know before reaching out. Still curious? Send a message —
              I reply fast.
            </p>
          </div>

          <div data-reveal-stagger className="flex flex-col gap-4">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
