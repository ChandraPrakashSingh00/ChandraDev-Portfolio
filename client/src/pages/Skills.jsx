import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGithub,
  FaDatabase,
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss } from "react-icons/si";

const skills = [
  { name: "React", icon: FaReact },
  { name: "Node.js", icon: FaNodeJs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "JavaScript", icon: FaJs },
  { name: "HTML5", icon: FaHtml5 },
  { name: "CSS3", icon: FaCss3Alt },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "GitHub", icon: FaGithub },
  { name: "Database", icon: FaDatabase },
];

function Skills() {
  return (
    <section className="w-full min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 pt-32 pb-24">

      <div className="relative w-full max-w-6xl bg-[#151a25] rounded-3xl
      shadow-[0_0_60px_#00f6ff40] p-6 sm:p-10">

        {/* BLOBS */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full" />

        {/* HEADER */}
        <div className="text-center text-white mb-12 z-10 relative">

          <p className="text-gray-400 mb-2">My Expertise</p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Skills & Technologies
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Technologies I use to build modern, scalable and AI powered web
            applications.
          </p>

        </div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 relative z-10">

          {skills.map((skill, i) => {
            const Icon = skill.icon;

            return (
              <div
                key={i}
                className="bg-[#0b0f19] rounded-2xl border border-cyan-400/20
                p-6 flex flex-col items-center justify-center gap-3
                hover:border-cyan-400 hover:shadow-[0_0_25px_#00f6ff40]
                transition group"
              >
                <Icon
                  size={40}
                  className="text-cyan-400 group-hover:scale-110 transition"
                />

                <p className="text-white text-sm sm:text-base font-medium">
                  {skill.name}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Skills;
