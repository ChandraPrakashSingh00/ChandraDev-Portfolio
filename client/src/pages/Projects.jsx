import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "AI Code Review Tool",
    desc: "AI powered tool to review, optimize & secure code.",
    tech: ["React", "Node", "MongoDB", "AI"],
    github: "#",
    live: "#",
  },
  {
    title: "Ghost Chat AI",
    desc: "Real time spooky chatbot powered by Gemini & OpenAI.",
    tech: ["React", "Express", "Gemini"],
    github: "#",
    live: "#",
  },
  {
    title: "Expense Tracker AI",
    desc: "Smart expense tracker with AI insights.",
    tech: ["MERN", "Charts", "AI"],
    github: "#",
    live: "#",
  },
];

function Projects() {
  return (
    <section className="relative w-full min-h-screen bg-[#0b0f19] pt-32 pb-24 px-4 overflow-hidden">

      {/* BLOBS */}
      <div className="absolute top-40 left-20 w-48 h-48 bg-cyan-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-40 right-20 w-60 h-60 bg-cyan-400/20 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14 text-white">

          <p className="text-gray-400 mb-2">My Work</p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Projects
          </h1>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Some of my featured projects built using modern technologies.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-[#151a25] rounded-2xl p-6 border border-cyan-400/20
              hover:shadow-[0_0_30px_#00f6ff40] hover:-translate-y-2 transition-all duration-300"
            >
              <h2 className="text-white text-lg font-semibold mb-2">
                {p.title}
              </h2>

              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {p.desc}
              </p>

              {/* TECH */}
              <div className="flex flex-wrap gap-2 mb-6">

                {p.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400"
                  >
                    {t}
                  </span>
                ))}

              </div>

              {/* LINKS */}
              <div className="flex justify-between text-sm">

                <a
                  href={p.github}
                  className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition"
                >
                  <FaGithub /> Code
                </a>

                <a
                  href={p.live}
                  className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition"
                >
                  <FaExternalLinkAlt /> Live
                </a>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Projects;
