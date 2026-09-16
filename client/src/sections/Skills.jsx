import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
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

function SkillCard({ skill, index }) {
  const cardRef = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const Icon = ICON_MAP[skill.icon] || Code2

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setRotate({ x: py * -10, y: px * 10 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (index % 5) * 0.06, duration: 0.5 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        transform: `perspective(700px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/50"
    >
      {/* glow blob on hover */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
        style={{ background: skill.color }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
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
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          className="h-full rounded-full bg-brand-gradient"
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-container py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Skills</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Tools I build <span className="gradient-text">production software</span> with
        </h2>
        <p className="mt-4 text-text">
          A snapshot of the technologies I reach for most, from data modeling to
          the last pixel of the interface.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </section>
  )
}
