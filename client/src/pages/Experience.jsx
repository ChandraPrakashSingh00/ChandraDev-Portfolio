function Experience() {
  return (
    <section
      className="
        w-full
        bg-gradient-to-br from-[#01686d] to-[#00444b]
        py-20
      "
    >
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* ================= Section Heading ================= */}
        <div className="text-center mb-20">
          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-extrabold
              text-white
              tracking-wide
              drop-shadow-lg
              mb-4
            "
          >
            Experience
          </h2>

          {/* Accent Line */}
          <div
            className="
              mx-auto
              w-20
              h-1
              bg-[#f27b22]
              rounded-full
              shadow-md
            "
          />
        </div>

        {/* Timeline Wrapper */}
        <div className="relative pl-10">

          {/* Vertical Line */}
          <div
            className="
              absolute left-2 top-0
              w-[3px] h-full
              bg-gradient-to-b
              from-white/60
              via-white/30
              to-transparent
              rounded-full
            "
          />

          {/* ===== Experience Card 1 ===== */}
          <div className="mb-14 group">
            <div
              className="
                bg-white
                p-8
                rounded-2xl
                shadow-xl
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:shadow-2xl
              "
            >
              <h3 className="text-xl font-semibold mb-1 text-[#00444b]">
                Software Developer
              </h3>

              <p className="text-[#f27b22] font-medium mb-3">
                TechMind IT Solutions
              </p>

              <p className="text-gray-600 leading-relaxed">
                Building scalable SaaS platforms, MERN stack applications,
                and AI-powered solutions with focus on clean architecture,
                performance optimization, and modern UI/UX.
              </p>
            </div>
          </div>

          {/* ===== Experience Card 2 ===== */}
          <div className="group">
            <div
              className="
                bg-white
                p-8
                rounded-2xl
                shadow-xl
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:shadow-2xl
              "
            >
              <h3 className="text-xl font-semibold mb-1 text-[#00444b]">
                Full Stack Developer
              </h3>

              <p className="text-[#f27b22] font-medium mb-3">
                Freelance / Client Projects
              </p>

              <p className="text-gray-600 leading-relaxed">
                Developed full-stack web applications using MERN stack,
                integrated AI APIs, built dashboards, authentication systems,
                and optimized apps for scalability and deployment.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Experience;
