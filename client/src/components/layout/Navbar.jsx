import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Download } from 'lucide-react'
import { useActiveSection } from '../../hooks/useActiveSection'

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const active = useActiveSection(LINKS.map((l) => l.id))

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollTo = (id) => {
    setOpen(false)

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
      return
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 md:px-6">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`flex w-full max-w-7xl items-center justify-between rounded-full border transition-all duration-300 ${
          scrolled
            ? 'glass border-border/80 px-4 py-2 shadow-card md:px-6'
            : 'border-transparent bg-white/40 px-4 py-3 backdrop-blur-md md:px-6'
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
                className={`relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active === link.id
                    ? 'text-bg'
                    : 'text-muted hover:text-slate-900'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-glow"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Resume Button */}
        <div className="hidden md:block shrink-0">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-bg shadow-glow transition-all hover:scale-105"
          >
            <Download size={16} />
            <span className="hidden lg:inline">
              Resume
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-slate-900"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="absolute left-3 right-3 top-[calc(100%+10px)] xl:hidden"
          >
            <div className="glass overflow-hidden rounded-3xl border border-border/80 shadow-card">
              <ul className="flex flex-col p-3">
                {LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all ${
                        active === link.id
                          ? 'bg-brand-gradient text-bg'
                          : 'text-muted hover:bg-secondary'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}

                <li className="mt-2">
                  <a
                    href="/resume.pdf"
                    download
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-bg"
                  >
                    <Download size={16} />
                    Resume
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}