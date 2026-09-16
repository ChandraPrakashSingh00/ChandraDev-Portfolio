import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `When you use the contact form on this site, we collect the details you
    submit — your name, email address, phone number (if provided), and message
    content. We do not collect this information through any other means, and we
    do not track you across other websites.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `Information submitted through the contact form is used solely to
    respond to your enquiry. We do not sell, rent, or share your personal
    information with third parties, and we do not use it for marketing
    without your explicit consent.`,
  },
  {
    title: '3. Cookies & Analytics',
    body: `This site may use minimal, privacy-respecting analytics to understand
    overall traffic patterns (such as page views). No personally identifiable
    information is collected through analytics, and no advertising cookies
    are used.`,
  },
  {
    title: '4. Data Storage & Security',
    body: `Any information you submit is stored securely and is only accessible
    to the site owner. Reasonable technical and organizational measures are
    taken to protect your data from unauthorized access, alteration, or
    disclosure.`,
  },
  {
    title: '5. Third-Party Links',
    body: `This site links to external platforms such as GitHub, LinkedIn, and
    Twitter/X. We are not responsible for the privacy practices of these
    third-party sites — please review their respective privacy policies
    separately.`,
  },
  {
    title: '6. Your Rights',
    body: `You may request access to, correction of, or deletion of any
    personal data you have submitted through this site at any time by
    contacting us directly using the email address listed on the Contact
    page.`,
  },
  {
    title: '7. Changes to This Policy',
    body: `This Privacy Policy may be updated occasionally to reflect changes
    in practices or for legal reasons. Any updates will be posted on this
    page with a revised effective date.`,
  },
]

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <section className="section-container py-28">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck size={20} />
          </span>
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="mt-1 text-sm text-muted">Last updated: July 2026</p>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-text">
          This Privacy Policy explains how this portfolio website collects, uses,
          and protects any information you provide while using the site,
          particularly through the contact form.
        </p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-slate-900">{s.title}</h2>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-text">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-bluesec/5 p-6">
          <p className="text-sm text-text">
            Questions about this policy? Reach out via the{' '}
            <Link to="/" state={{ scrollTo: 'contact' }} className="font-semibold text-primary hover:underline">
              contact form
            </Link>{' '}
            on the homepage.
          </p>
        </div>
      </div>
    </section>
  )
}
