import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiTypescript,
  SiTailwindcss, SiNextdotjs, SiRedux, SiDocker, SiGit, SiFigma, SiPostman, SiFirebase,
} from 'react-icons/si'

const TECHS = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Express', icon: SiExpress, color: '#E2E8F0' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#E2E8F0' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
]

function Track({ reverse }) {
  return (
    <div
      className="flex shrink-0 items-center gap-4"
      style={{
        animation: `${reverse ? 'marquee-reverse' : 'marquee'} 32s linear infinite`,
      }}
    >
      {TECHS.map((t, i) => (
        <div
          key={`${t.name}-${i}`}
          className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-border bg-card px-5 py-2.5 shadow-card"
        >
          <t.icon size={18} color={t.color} />
          <span className="text-sm font-medium text-text">{t.name}</span>
        </div>
      ))}
    </div>
  )
}

export default function TechMarquee() {
  return (
    <section className="border-y border-border bg-secondary/30 py-10">
      <div className="section-container mb-6 text-center">
        <span className="eyebrow">Tech I work with</span>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max gap-4">
          <Track />
          <Track />
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max gap-4">
          <Track reverse />
          <Track reverse />
        </div>
      </div>
    </section>
  )
}
