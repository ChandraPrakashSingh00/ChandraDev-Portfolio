import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

const QUICK_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const SOCIALS = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter / X' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-slate-900 text-slate-300">
      {/* subtle brand glow */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-bluesec/20 blur-[110px]" />

      <div className="section-container relative py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-display text-2xl font-bold text-white">
              Chandra<span className="gradient-text">.dev</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Full Stack Engineer crafting fast, elegant web applications with the
              MERN stack — from data models and APIs to interfaces people enjoy using.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:-translate-y-1 hover:border-primary/60 hover:text-primary"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.id}>
                  <Link
                    to="/"
                    state={{ scrollTo: l.id }}
                    className="text-sm text-slate-400 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Get in Touch</p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Mail size={15} className="mt-0.5 shrink-0 text-primary" />
                <a href="mailto:hello@chandraprakash.dev" className="hover:text-primary">
                  hello@chandraprakash.dev
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Phone size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>Bengaluru, India</span>
              </li>
            </ul>
            <Link
              to="/"
              state={{ scrollTo: 'contact' }}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Start a project <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="section-container flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} Chandra Prakash. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link to="/privacy-policy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="transition-colors hover:text-primary">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
