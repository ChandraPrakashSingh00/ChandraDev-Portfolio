import { Code2, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { gsap, useGSAP, MQ } from '../animations/gsap'
import { useReveal } from '../animations/scrollReveal'
import CountUp from '../animations/CountUp'

const HIGHLIGHTS = [
  { label: 'Years Experience', value: 1, suffix: '+' },
  { label: 'Projects Delivered', value: 7, suffix: '+' },
  { label: 'Happy Clients', value: 5, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
]

export default function About() {
  const scope = useReveal()

  // Gentle scroll parallax on the portrait (desktop only).
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MQ.desktop} and ${MQ.motionOK}`, () => {
        gsap.fromTo(
          '[data-parallax]',
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: '[data-parallax-frame]', start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })
      return () => mm.revert()
    },
    { scope }
  )

  return (
    <section ref={scope} id="about" className="section-container py-28">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Image */}
        <div data-reveal="scale" className="relative mx-auto w-full max-w-sm">
          <div
            data-parallax-frame
            className="glass gradient-border relative overflow-hidden rounded-3xl shadow-card"
          >
            <img
              data-parallax
              src="./aboutbanner.jpeg"
              alt="Portrait of Chandra Prakash at a desk"
              className="aspect-[4/6] w-full scale-[1.14] object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-reveal="up"
            data-reveal-delay="0.25"
            className="glass absolute -bottom-6 -right-6 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-glow"
          >
            <Sparkles size={18} className="text-primary" />
            <div>
              <p className="text-sm font-semibold text-slate-900">1+ Years</p>
              <p className="text-xs text-muted">Building for the web</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <span data-reveal="up" className="eyebrow inline-block">About Me</span>
          <h2 data-reveal="up" className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Turning ideas into <span className="gradient-text">reliable software</span>
          </h2>
          <p data-reveal="up" className="mt-5 leading-relaxed text-text">
           Hey, I'm Chandra Prakash Singh, a MERN Stack Developer skilled in MongoDB, Express.js, React.js, and Node.js. I have worked on the UTCI project for *IIT Roorkee, gaining hands-on experience in building scalable, real-world web applications.
          </p>
          <p data-reveal="up" className="mt-4 leading-relaxed text-text">
            I've shipped products across e-commerce, SaaS dashboards, and
            real-time messaging — always focused on clean code, thoughtful UX,
            and performance that holds up under real traffic.
          </p>

          <p data-reveal="up" className="mt-4 leading-relaxed text-text">I am passionate about developing clean, efficient, and user-focused solutions, and I am eager to contribute my skills while growing with your organization.</p>

          <div data-reveal-stagger className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <GraduationCap size={16} className="text-primary" /> BCA, Bachelor of Computer Applications
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-primary" /> Greater Noida, India
            </span>
            <span className="inline-flex items-center gap-2">
              <Code2 size={16} className="text-primary" /> Open to remote roles
            </span>
          </div>

          <div data-reveal-stagger className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                className="card-lift rounded-2xl border border-border bg-card px-4 py-5 text-center shadow-card hover:border-primary/40"
              >
                <p className="font-display text-2xl font-bold gradient-text sm:text-3xl">
                  <CountUp to={h.value} suffix={h.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
