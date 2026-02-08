function Education() {
  return (
    <section className="w-full bg-gradient-to-br from-[#01686d] to-[#00444b] py-20">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-white text-center drop-shadow-lg">
          Education
        </h2>

        {/* Timeline Wrapper */}
        <div className="relative pl-10">

          {/* Vertical Line */}
          <div
            className="absolute left-2 top-0 w-[3px] h-full bg-gradient-to-b from-white/60 via-white/30 to-transparent rounded-full"
          />

          {/* ===== Education Card 1 ===== */}
          <div className="mb-14 group">
            <div
              className="bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold mb-1 text-[#00444b]">
                Bachelor's Degree
              </h3>
              <p className="text-[#f27b22] font-medium mb-3">
                Computer Science / Related Field
              </p>
              <p className="text-gray-600 leading-relaxed">
                Studied core computer science subjects including algorithms,
                data structures, databases, web development, and AI technologies.
              </p>
            </div>
          </div>

          {/* ===== Education Card 2 ===== */}
          <div className="group">
            <div
              className="bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold mb-1 text-[#00444b]">
                High School Diploma
              </h3>
              <p className="text-[#f27b22] font-medium mb-3">
                XYZ Senior Secondary School
              </p>
              <p className="text-gray-600 leading-relaxed">
                Focused on science and mathematics subjects with strong
                fundamentals for computer science and programming skills.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Education;
