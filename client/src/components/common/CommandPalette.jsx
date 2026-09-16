import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Command,
  Search,
  Home,
  User,
  Code2,
  FolderGit2,
  Briefcase,
  Layers,
  Quote,
  Mail,
  Download,
  Github,
  Linkedin,
  Twitter,
  Bot,
  Copy,
  Check,
  CornerDownLeft,
} from 'lucide-react'

const EMAIL = 'hello@chandraprakash.dev'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const commands = useMemo(
    () => [
      { id: 'nav-home', group: 'Navigate', label: 'Go to Home', icon: Home, run: () => goTo('home') },
      { id: 'nav-about', group: 'Navigate', label: 'Go to About', icon: User, run: () => goTo('about') },
      { id: 'nav-skills', group: 'Navigate', label: 'Go to Skills', icon: Code2, run: () => goTo('skills') },
      { id: 'nav-projects', group: 'Navigate', label: 'Go to Projects', icon: FolderGit2, run: () => goTo('projects') },
      { id: 'nav-experience', group: 'Navigate', label: 'Go to Experience', icon: Briefcase, run: () => goTo('experience') },
      { id: 'nav-services', group: 'Navigate', label: 'Go to Services', icon: Layers, run: () => goTo('services') },
      { id: 'nav-testimonials', group: 'Navigate', label: 'Go to Testimonials', icon: Quote, run: () => goTo('testimonials') },
      { id: 'nav-contact', group: 'Navigate', label: 'Go to Contact', icon: Mail, run: () => goTo('contact') },
      {
        id: 'act-resume',
        group: 'Actions',
        label: 'Download Resume',
        icon: Download,
        run: () => {
          const a = document.createElement('a')
          a.href = '/resume.pdf'
          a.download = ''
          a.click()
        },
      },
      {
        id: 'act-email',
        group: 'Actions',
        label: `Copy email — ${EMAIL}`,
        icon: copied ? Check : Copy,
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(EMAIL)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        },
      },
      {
        id: 'act-ai',
        group: 'Actions',
        label: 'Ask the AI Assistant',
        icon: Bot,
        run: () => window.dispatchEvent(new CustomEvent('open-ai-assistant')),
      },
      {
        id: 'con-github',
        group: 'Connect',
        label: 'Open GitHub',
        icon: Github,
        run: () => window.open('https://github.com', '_blank', 'noreferrer'),
      },
      {
        id: 'con-linkedin',
        group: 'Connect',
        label: 'Open LinkedIn',
        icon: Linkedin,
        run: () => window.open('https://linkedin.com', '_blank', 'noreferrer'),
      },
      {
        id: 'con-twitter',
        group: 'Connect',
        label: 'Open Twitter / X',
        icon: Twitter,
        run: () => window.open('https://twitter.com', '_blank', 'noreferrer'),
      },
    ],
    [copied] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q))
  }, [query, commands])

  const close = () => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }

  const execute = (cmd) => {
    if (!cmd) return
    cmd.run()
    if (!cmd.keepOpen) close()
  }

  // Global shortcuts: Cmd/Ctrl+K to toggle, "/" to open when not typing
  useEffect(() => {
    const onKeyDown = (e) => {
      const isMeta = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      const isSlash =
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) &&
        !document.activeElement?.isContentEditable

      if (isMeta || isSlash) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10)
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleKeyNav = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      execute(filtered[activeIndex])
    } else if (e.key === 'Escape') {
      close()
    }
  }

  let runningIndex = -1

  return (
    <>
      {/* Desktop trigger pill */}
      <button
        onClick={() => setOpen(true)}
        className="group hidden items-center gap-2.5 rounded-full border border-border/70 bg-white/60 px-3.5 py-2 text-xs font-medium text-muted shadow-sm backdrop-blur-sm transition-colors hover:border-primary hover:text-primary lg:fixed lg:right-7 lg:top-1/2 lg:z-40 lg:flex lg:-translate-y-1/2"
        aria-label="Open command palette"
      >
        <Search size={14} />
        Quick jump
        <span className="flex items-center gap-0.5 rounded-md border border-border/70 bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted group-hover:border-primary/30 group-hover:text-primary">
          <Command size={10} />K
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              key="palette"
              role="dialog"
              aria-modal="true"
              className="glass fixed left-1/2 top-[12%] z-[101] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border shadow-glow"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3 border-b border-border bg-white/70 px-4 py-3.5">
                <Search size={17} className="shrink-0 text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyNav}
                  placeholder="Jump to a section, run an action, or connect..."
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-muted focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                  esc
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-muted">No matching commands.</p>
                )}

                {['Navigate', 'Actions', 'Connect'].map((group) => {
                  const items = filtered.filter((c) => c.group === group)
                  if (items.length === 0) return null
                  return (
                    <div key={group} className="mb-1.5">
                      <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                        {group}
                      </p>
                      {items.map((cmd) => {
                        runningIndex += 1
                        const idx = runningIndex
                        const isActive = idx === activeIndex
                        const Icon = cmd.icon
                        return (
                          <button
                            key={cmd.id}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => execute(cmd)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                              isActive ? 'bg-brand-gradient text-bg' : 'text-slate-900 hover:bg-secondary'
                            }`}
                          >
                            <Icon size={16} className={isActive ? 'text-bg' : 'text-primary'} />
                            <span className="flex-1">{cmd.label}</span>
                            {isActive && <CornerDownLeft size={14} className="text-bg/80" />}
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
