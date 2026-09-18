import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Download } from 'lucide-react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollToSection } from '../../animations/smoothScroll'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

const LINK_IDS = LINKS.map((l) => l.id)

const EASE = [0.22, 1, 0.36, 1]

const drawer = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE, staggerChildren: 0.04, delayChildren: 0.06 },
  },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.2, ease: EASE } },
}

const drawerItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const active = useActiveSection(LINK_IDS, location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const scrollTo = (id) => {
    setOpen(false)

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
      return
    }

    scrollToSection(id)
  }

  return (
    <header
      data-intro="nav"
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 md:px-6"
    >
      <nav
        className={`flex w-full max-w-7xl items-center justify-between rounded-full border px-4 transition-[background-color,border-color,box-shadow,padding,backdrop-filter] duration-500 ease-premium md:px-6 ${
          scrolled
            ? 'border-border/80 bg-white/75 py-2 shadow-card backdrop-blur-xl'
            : 'border-transparent bg-white/40 py-3 backdrop-blur-md'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="shrink-0 font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
        >
          Chandra
          <span className="gradient-text">.dev</span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex items-center gap-1 rounded-full border border-border/70 bg-white/60 p-1">
          {LINKS.map((link) => (
            <li key={link.id} className="relative">
              <button
                onClick={() => scrollTo(link.id)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`group relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  active === link.id
                    ? 'text-bg'
                    : 'text-muted hover:text-slate-900'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                {link.label}
                {active !== link.id && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-primary/70 transition-transform duration-500 ease-premium group-hover:scale-x-100"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Resume Button */}
        <div className="hidden md:block shrink-0">
          <a
            href="/resume.pdf"
            download
            className="btn-press group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-bg shadow-glow"
          >
            <Download size={16} className="transition-transform duration-300 ease-premium group-hover:translate-y-0.5" />
            <span className="hidden lg:inline">
              Resume
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-secondary xl:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={drawer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute left-3 right-3 top-[calc(100%+10px)] origin-top xl:hidden"
          >
            <div className="overflow-hidden rounded-3xl border border-border/80 bg-white/90 shadow-card backdrop-blur-xl">
              <ul className="flex flex-col p-3">
                {LINKS.map((link) => (
                  <motion.li key={link.id} variants={drawerItem}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors duration-300 ${
                        active === link.id
                          ? 'bg-brand-gradient text-bg'
                          : 'text-muted hover:bg-secondary hover:text-slate-900'
                      }`}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}

                <motion.li variants={drawerItem} className="mt-2">
                  <a
                    href="/resume.pdf"
                    download
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-bg"
                  >
                    <Download size={16} />
                    Resume
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
