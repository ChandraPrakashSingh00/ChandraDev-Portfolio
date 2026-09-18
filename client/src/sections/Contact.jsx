import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { sendContactMessage } from '../lib/api'
import { useReveal } from '../animations/scrollReveal'
import { useMagnetic } from '../animations/magnetic'

function FieldError({ message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-1 text-xs text-red-500"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [toast, setToast] = useState(null)
  const scope = useReveal()
  const submitRef = useMagnetic({ max: 8 })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const showToast = (type, text) => {
    setToast({ type, text })
    setTimeout(() => setToast(null), 4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      await sendContactMessage(form)
      setStatus('success')
      showToast('success', 'Message sent — I will get back to you soon.')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      showToast('error', 'Something went wrong. Please try again or email me directly.')
    } finally {
      setTimeout(() => setStatus('idle'), 1500)
    }
  }

  const field = (name, label, type = 'text') => (
    <div className="relative">
      <input
        id={name}
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder=" "
        aria-invalid={Boolean(errors[name])}
        className={`field-input peer w-full rounded-xl border bg-bg px-4 pb-2.5 pt-5 text-sm text-slate-900 placeholder-transparent hover:border-slate-300 focus:outline-none ${
          errors[name] ? 'border-red-400/60' : 'border-border focus:border-primary'
        }`}
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-3.5 text-sm text-muted transition-all duration-300 ease-premium peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
      <FieldError message={errors[name]} />
    </div>
  )

  return (
    <section ref={scope} id="contact" className="section-container py-28">
      <div data-reveal="up" className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Contact</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Let's build something <span className="gradient-text">great together</span>
        </h2>
        <p className="mt-4 text-text">
          Have a project in mind or just want to say hi? My inbox is always open.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
        {/* Info */}
        <div className="lg:col-span-2">
          <div data-reveal-stagger className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'chandraprakashsingh281@gmail.com' },
              { icon: Phone, label: 'Phone', value: '+91 8810503029' },
              { icon: MapPin, label: 'Location', value: 'Greater Noida Uttar Pradesh, India' },
            ].map((c) => (
              <div key={c.label} className="card-lift group flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/30">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform duration-500 ease-premium group-hover:scale-110">
                  <c.icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted">{c.label}</p>
                  <p className="break-all text-sm font-medium text-slate-900 sm:break-normal">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div data-reveal-stagger className="mt-6 flex gap-3">
            {[
              { icon: Github, href: 'https://github.com' },
              { icon: Linkedin, href: 'https://linkedin.com' },
              { icon: Twitter, href: 'https://twitter.com' },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={new URL(href).hostname.replace('.com', '')}
                className="icon-link flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>

          <div data-reveal="up" className="mt-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-bluesec/5 p-5">
            <p className="text-sm font-semibold text-slate-900">Usually replies within 24 hours</p>
            <p className="mt-1 text-sm text-muted">
              Prefer email? Reach out directly and I'll get back to you as soon as I can.
            </p>
          </div>
        </div>

        {/* Form */}
        <div data-reveal="up" className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8 lg:col-span-3">
          <h3 className="font-display text-lg font-semibold text-slate-900">Send a message</h3>
          <p className="mt-1 text-sm text-muted">Fill out the form and I'll get back to you shortly.</p>

          <form onSubmit={handleSubmit} noValidate data-reveal-stagger className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {field('name', 'Your Name')}
              {field('email', 'Your Email', 'email')}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {field('phone', 'Phone (optional)')}
              {field('subject', 'Subject')}
            </div>
            <div className="relative">
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder=" "
                aria-invalid={Boolean(errors.message)}
                className={`field-input peer w-full resize-none rounded-xl border bg-bg px-4 pb-2.5 pt-5 text-sm text-slate-900 placeholder-transparent hover:border-slate-300 focus:outline-none ${
                  errors.message ? 'border-red-400/60' : 'border-border focus:border-primary'
                }`}
              />
              <label
                htmlFor="message"
                className="pointer-events-none absolute left-4 top-3.5 text-sm text-muted transition-all duration-300 ease-premium peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]"
              >
                Message
              </label>
              <FieldError message={errors.message} />
            </div>

            <div>
            <button
              ref={submitRef}
              type="submit"
              disabled={status === 'loading'}
              className="btn-press group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-bg shadow-glow hover:shadow-[0_10px_40px_rgba(8,111,253,0.35)] disabled:pointer-events-none disabled:opacity-70 sm:w-auto sm:px-8"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} className="transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </>
              )}
            </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 24, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 24, x: '-50%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed bottom-8 left-1/2 z-[70] flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-card ${
              toast.type === 'success' ? 'bg-card text-slate-900 border border-primary/40' : 'bg-card text-slate-900 border border-red-400/40'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={16} className="text-primary" />
            ) : (
              <XCircle size={16} className="text-red-400" />
            )}
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
