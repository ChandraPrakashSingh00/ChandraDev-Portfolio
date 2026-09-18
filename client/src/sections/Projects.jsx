import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "../data/projects";
import { useReveal } from "../animations/scrollReveal";

export default function Projects() {
  const scope = useReveal();

  return (
    <section ref={scope} id="projects" className="section-container py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div data-reveal="up">
            <p className="mb-4 eyebrow">
              SELECTED PROJECTS
            </p>

            <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Some of my recent work
            </h2>

            <div data-reveal-bar className="mt-8 h-[2px] w-14 rounded-full bg-primary" />
          </div>

          <a
            data-reveal="fade"
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-slate-900 transition-colors duration-300 hover:text-primary"
          >
            <span className="link-underline font-medium">
              View GitHub
            </span>

            <ExternalLink
              size={18}
              className="transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Cards */}
        <div data-reveal-stagger className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => {
            const firstLetter = project.title?.charAt(0)?.toUpperCase() || "P";

            return (
              <article
                key={project.id}
                className="card-lift group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card hover:border-primary/30"
              >
                {/* Browser Header */}
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
                </div>

                {/* Project Preview */}
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} live site`}
                  data-cursor="view"
                  className="relative block h-[220px] overflow-hidden bg-slate-950"
                >
                  <div
                    data-reveal="clip"
                    className="absolute inset-0 flex items-center justify-center transition-[scale] duration-700 ease-premium group-hover:[scale:1.04]"
                  >
                    {/* Background Glow */}
                    <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

                    {/* Grid */}
                    <div
                      className="
                        absolute inset-0 opacity-[0.08]
                        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                        bg-[size:32px_32px]
                      "
                    />

                    {/* Letter */}
                    <div
                      className="
                        relative flex h-32 w-32
                        items-center justify-center
                        rounded-[2rem]
                        border border-white/10
                        bg-white/[0.06]
                        shadow-2xl
                        backdrop-blur-xl
                        transition-colors duration-500
                        group-hover:border-primary/40
                      "
                    >
                      <span
                        className="
                          bg-gradient-to-br
                          from-primary
                          via-primary
                          to-cyan-300
                          bg-clip-text
                          text-7xl
                          font-bold
                          tracking-tight
                          text-transparent
                        "
                      >
                        {firstLetter}
                      </span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100" />

                  {/* Project Name */}
                  <div
                    className="
                      absolute bottom-4 left-5
                      max-w-[70%]
                      truncate
                      text-xs font-medium
                      uppercase tracking-[0.18em]
                      text-white/50
                      transition-colors duration-500
                      group-hover:text-white/80
                    "
                  >
                    {project.title}
                  </div>

                  {/* Live Badge */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute bottom-4 right-4
                      flex h-14 w-14 flex-col
                      items-center justify-center
                      rounded-2xl
                      border border-white/10
                      bg-white
                      text-slate-900
                      shadow-xl
                      transition-transform duration-500 ease-premium
                      group-hover:-translate-y-1
                    "
                  >
                    <span className="text-[9px] font-medium">
                      Live
                    </span>

                    <ExternalLink size={17} />
                  </span>
                </a>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 text-xs uppercase tracking-wide text-primary">
                    {project.category}
                  </p>

                  <h3 className="flex items-start justify-between gap-3 text-xl font-semibold text-slate-900">
                    <span className="transition-transform duration-500 ease-premium group-hover:translate-x-1">
                      {project.title}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="mt-1 shrink-0 text-muted transition-[transform,color] duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </h3>

                  <p className="mt-3 line-clamp-4 text-sm leading-7 text-text">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="
                          rounded-lg
                          border border-border
                          px-3 py-1.5
                          text-[11px]
                          text-muted
                          transition-colors
                          duration-300
                          group-hover:border-primary/20
                          group-hover:text-text
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
