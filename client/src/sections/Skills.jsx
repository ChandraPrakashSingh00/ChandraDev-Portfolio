import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiJsonwebtokens,
  SiFirebase,
  SiDocker,
  SiGithub,
  SiCloudinary,
} from 'react-icons/si'
import { Code2 } from 'lucide-react'
import { skills } from '../data/skills'
import { useReveal } from '../animations/scrollReveal'

const ICON_MAP = {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiJsonwebtokens,
  SiFirebase,
  SiDocker,
  SiGithub,
  SiCloudinary,
}

function SkillCard({ skill }) {
  const Icon = ICON_MAP[skill.icon] || Code2

  return (
    <div className="card-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary/40 hover:bg-white">
      {/* soft tint on hover */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ background: skill.color }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-white shadow-sm transition-transform duration-500 ease-premium group-hover:scale-110"
            style={{ color: skill.color }}
          >
            <Icon size={22} />
          </span>
          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900">{skill.name}</h3>
            <span className="mt-0.5 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
              {skill.category}
            </span>
          </div>
        </div>
        <span className="font-display text-sm font-bold text-primary">{skill.level}%</span>
      </div>

      <div className="relative mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          data-reveal-bar
          style={{ width: `${skill.level}%` }}
          className="h-full rounded-full bg-brand-gradient"
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const scope = useReveal()

  return (
    <section ref={scope} id="skills" className="section-container py-28">
      <div data-reveal="up" className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Skills</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Tools I build <span className="gradient-text">production software</span> with
        </h2>
        <p className="mt-4 text-text">
          A snapshot of the technologies I reach for most, from data modeling to
          the last pixel of the interface.
        </p>
      </div>

      <div data-reveal-stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  )
}
