import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing and using this website, you accept and agree to be bound
    by these Terms & Conditions. If you do not agree with any part of these
    terms, please discontinue use of the site.`,
  },
  {
    title: '2. Intellectual Property',
    body: `All content on this site — including text, graphics, logos, project
    write-ups, and code samples — is the property of Chandra Prakash unless
    otherwise credited, and may not be reproduced or redistributed without
    prior written permission.`,
  },
  {
    title: '3. Use of the Contact Form',
    body: `The contact form is provided for genuine enquiries only. You agree
    not to use it to transmit spam, unsolicited advertising, or any unlawful,
    abusive, or harmful content.`,
  },
  {
    title: '4. External Links',
    body: `This site contains links to third-party websites such as GitHub,
    LinkedIn, and Twitter/X for reference purposes. These links are provided
    for convenience only, and no responsibility is taken for the content or
    practices of external sites.`,
  },
  {
    title: '5. No Warranty',
    body: `This website and its content are provided "as is" without warranties
    of any kind, express or implied. While reasonable care is taken to keep
    information accurate and up to date, no guarantee is made as to
    completeness or accuracy.`,
  },
  {
    title: '6. Limitation of Liability',
    body: `Chandra Prakash shall not be held liable for any direct, indirect,
    or consequential loss or damage arising from the use of, or inability to
    use, this website.`,
  },
  {
    title: '7. Changes to These Terms',
    body: `These Terms & Conditions may be revised from time to time. Continued
    use of the site after changes are posted constitutes acceptance of the
    updated terms.`,
  },
  {
    title: '8. Governing Law',
    body: `These terms are governed by and construed in accordance with the
    laws of India, without regard to its conflict of law provisions.`,
  },
]

export default function TermsConditions() {
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
            <FileText size={20} />
          </span>
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Terms &amp; <span className="gradient-text">Conditions</span>
            </h1>
            <p className="mt-1 text-sm text-muted">Last updated: July 2026</p>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-text">
          Please read these Terms & Conditions carefully before using this
          website. They set out the rules and guidelines for how the site and
          its contents may be used.
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
            Questions about these terms? Reach out via the{' '}
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
