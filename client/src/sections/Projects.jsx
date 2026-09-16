import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section-container py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="mb-4 eyebrow">
              SELECTED PROJECTS
            </p>

            <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Some of my recent work
            </h2>

            <div className="mt-8 h-[2px] w-14 rounded-full bg-primary" />
          </div>

          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-slate-900"
          >
            <span className="font-medium">
              View GitHub
            </span>

            <ExternalLink
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => {
            const firstLetter = project.title?.charAt(0)?.toUpperCase() || "P";

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card"
              >
                {/* Browser Header */}
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
                </div>

                {/* Project Letter Preview */}
                <div className="relative flex h-[220px] items-center justify-center overflow-hidden bg-slate-950">
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
                      transition-all duration-500
                      group-hover:scale-110
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

                  {/* Project Name */}
                  <div
                    className="
                      absolute bottom-4 left-5
                      max-w-[70%]
                      truncate
                      text-xs font-medium
                      uppercase tracking-[0.18em]
                      text-white/50
                    "
                  >
                    {project.title}
                  </div>

                  {/* Live Button */}
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} live`}
                    className="
                      absolute bottom-4 right-4
                      flex h-14 w-14 flex-col
                      items-center justify-center
                      rounded-2xl
                      border border-white/10
                      bg-white
                      text-slate-900
                      shadow-xl
                      transition-all duration-300
                      hover:scale-105
                    "
                  >
                    <span className="text-[9px] font-medium">
                      Live
                    </span>

                    <ExternalLink size={17} />
                  </a>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="mb-2 text-xs uppercase tracking-wide text-primary">
                    {project.category}
                  </p>

                  <h3 className="text-xl font-semibold text-slate-900">
                    {project.title}
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
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}