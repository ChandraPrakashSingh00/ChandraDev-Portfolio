import { FaCode, FaLaptopCode, FaRocket } from "react-icons/fa";
import Skills from "./Skills";

function About() {
  return (
    <>
      <section className="w-full min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 sm:px-8 pt-32 pb-24 overflow-hidden">
        <div
          className="relative w-full max-w-7xl rounded-[2.5rem]
          bg-gradient-to-br from-[#151a25] via-[#111827] to-[#0b0f19]
          border border-cyan-400/20
          shadow-[0_0_80px_#00f6ff30]
          p-6 sm:p-12 lg:p-16"
        >
          {/* BACKGROUND GLOWS */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-400/20 blur-[140px] rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* LEFT CONTENT */}
            <div className="text-white">
              <p className="text-cyan-400 tracking-widest text-xs sm:text-sm mb-3">
                WHO AM I
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                About <span className="text-cyan-400">Me</span>
              </h1>

              <p className="text-gray-400 text-sm sm:text-base leading-7 max-w-xl mb-8">
                I'm <span className="text-white font-semibold">Chandra Prakash Singh</span>, a
                passionate Full Stack MERN Developer who builds modern, scalable
                web applications with futuristic UI and AI-powered features.
                Clean code, performance and user experience are my top priorities.
              </p>

              {/* HIGHLIGHTS */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <FaCode className="text-cyan-400 text-lg mt-1" />
                  <p className="text-gray-300 text-sm sm:text-base">
                    Strong expertise in <span className="text-white">React, Node.js, Express & MongoDB</span>.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <FaLaptopCode className="text-cyan-400 text-lg mt-1" />
                  <p className="text-gray-300 text-sm sm:text-base">
                    Designing modern UI using <span className="text-white">Tailwind, Framer Motion & Glassmorphism</span>.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <FaRocket className="text-cyan-400 text-lg mt-1" />
                  <p className="text-gray-300 text-sm sm:text-base">
                    Building <span className="text-white">AI-powered apps, SaaS platforms & automation tools</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Experience", value: "1+ Years" },
                { title: "Projects", value: "20+" },
                { title: "Tech Stack", value: "MERN" },
                { title: "Focus", value: "AI + Web" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative group bg-white/5 backdrop-blur-xl
                  border border-cyan-400/25
                  rounded-2xl p-6 text-center
                  shadow-[0_0_25px_#00f6ff25]
                  transition hover:-translate-y-1 hover:shadow-[0_0_40px_#00f6ff50]"
                >
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                    {item.title}
                  </p>
                  <p className="text-cyan-400 text-2xl font-bold">
                    {item.value}
                  </p>

                  {/* glow hover */}
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 opacity-0 group-hover:opacity-100 blur-xl transition -z-10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Skills />
    </>
  );
}

export default About;
