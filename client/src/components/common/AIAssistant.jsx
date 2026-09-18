import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, Sparkles, User } from 'lucide-react'
import { skills } from '../../data/skills'
import { projects } from '../../data/projects'
import { services } from '../../data/services'
import { experience } from '../../data/experience'

const SUGGESTIONS = [
  'What skills does he have?',
  'Show me his projects',
  'What services does he offer?',
  'How can I contact him?',
]

const GREETING =
  "Hi! I'm Chandra's portfolio assistant \uD83D\uDC4B Ask me about his skills, projects, experience, or how to get in touch."

function buildReply(rawInput) {
  const q = rawInput.toLowerCase()

  if (/(skill|tech|stack|know|technolog)/.test(q)) {
    const top = skills
      .slice()
      .sort((a, b) => b.level - a.level)
      .slice(0, 6)
      .map((s) => s.name)
      .join(', ')
    return `Chandra's core stack is the MERN stack (MongoDB, Express, React, Node.js). His strongest skills right now: ${top}. Scroll to the Skills section to see the full list with proficiency levels.`
  }

  if (/(project|work|built|portfolio|nexcommerce|taskflow)/.test(q)) {
    const list = projects
      .slice(0, 3)
      .map((p) => `• ${p.title} — ${p.category}`)
      .join('\n')
    return `Here are a few featured projects:\n${list}\n\nCheck the Projects section for live demos, source code, and full case studies.`
  }

  if (/(service|offer|help|hire|freelance)/.test(q)) {
    const list = services
      .slice(0, 4)
      .map((s) => `• ${s.title}`)
      .join('\n')
    return `Chandra offers:\n${list}\n\nAnd more — open the Services section and click "View details" on any card for the full scope.`
  }

  if (/(experience|work history|career|job|company)/.test(q)) {
    const current = experience.find((e) => e.type === 'work')
    return `He's currently ${current?.title} at ${current?.org} (${current?.period}). Check the Experience timeline for his full work history and education.`
  }

  if (/(contact|email|reach|hire|connect|whatsapp|phone|call)/.test(q)) {
    return "You can reach out via the Contact form at the bottom of the page, or use the green WhatsApp button in the bottom-left corner for a quick chat."
  }

  if (/(resume|cv|download)/.test(q)) {
    return 'You can download his resume anytime using the "Resume" button in the navbar or the "Download Resume" button in the hero section.'
  }

  if (/(hello|hi|hey|namaste)/.test(q)) {
    return GREETING
  }

  return "I'm a simple demo assistant built into this portfolio, so I can only help with questions about Chandra's skills, projects, services, experience, or contact info. Try one of the suggestions below!"
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'bot', text: GREETING }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, open])

  // Allow other UI (e.g. the Cmd+K command palette) to open this assistant
  useEffect(() => {
    const openFromEvent = () => setOpen(true)
    window.addEventListener('open-ai-assistant', openFromEvent)
    return () => window.removeEventListener('open-ai-assistant', openFromEvent)
  }, [])

  const send = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)
    const delay = 500 + Math.random() * 500
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { role: 'bot', text: buildReply(trimmed) }])
    }, delay)
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        className="group fixed bottom-7 right-7 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-bg shadow-glow"
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary opacity-30" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'bot'}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.18 }}
          >
            {open ? <X size={22} /> : <Bot size={24} />}
          </motion.span>
        </AnimatePresence>

        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100">
            Ask AI Assistant
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass fixed bottom-24 right-4 z-50 flex h-[28rem] w-[calc(100%-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border shadow-glow sm:right-7"
          >
            {/* header */}
            <div className="flex items-center gap-3 bg-brand-gradient px-4 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-bg">
                <Sparkles size={17} />
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-semibold text-bg">Chandra.dev Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-bg/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Online — ask me anything
                </p>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto bg-card/40 px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      m.role === 'user' ? 'bg-secondary text-primary' : 'bg-brand-gradient text-bg'
                    }`}
                  >
                    {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </span>
                  <p
                    className={`whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-card ${
                      m.role === 'user'
                        ? 'rounded-br-sm bg-brand-gradient text-bg'
                        : 'rounded-bl-sm border border-border bg-card text-text'
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-bg">
                    <Bot size={12} />
                  </span>
                  <span className="rounded-2xl rounded-bl-sm border border-border bg-card px-2 shadow-card">
                    <TypingDots />
                  </span>
                </div>
              )}
            </div>

            {/* suggestions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 border-t border-border bg-card/40 px-3 py-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-medium text-slate-900 transition-colors hover:border-primary hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-border bg-white p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-slate-900 placeholder:text-muted focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-bg disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
