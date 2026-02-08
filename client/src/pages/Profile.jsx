import { FaLinkedinIn, FaGithub, FaGlobe } from "react-icons/fa";

function Profile() {
  return (
    <section
      className="w-full min-h-screen bg-[#0b0f19]
      flex items-center justify-center
      px-4 sm:px-6 pt-28 pb-24 overflow-hidden"
    >
      <div
        className="relative w-full max-w-6xl bg-[#151a25] rounded-3xl
        shadow-[0_0_60px_#00f6ff40]
        p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* BLOBS */}
        <div className="absolute top-10 left-10 w-28 sm:w-40 h-28 sm:h-40 bg-cyan-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-32 sm:w-48 h-32 sm:h-48 bg-cyan-400/20 blur-3xl rounded-full" />

        {/* LEFT */}
        <div className="text-white z-10 text-center lg:text-left">

          <p className="text-gray-400 mb-2 text-sm sm:text-base">
            Hello, It's Me
          </p>

          {/* NAME (ONE LINE RESPONSIVE) */}
          <h1
            className="font-bold mb-2 leading-tight
            text-[22px] sm:text-3xl md:text-4xl lg:text-5xl
            max-w-full truncate"
          >
            Chandra Prakash Singh
          </h1>

          <h2 className="text-sm sm:text-lg md:text-xl text-cyan-400 font-semibold mb-4">
            Full Stack Developer
          </h2>

          <p className="text-gray-400 max-w-md mx-auto lg:mx-0 mb-6 text-sm sm:text-base">
            MERN Stack Developer building modern web applications with AI
            integrations and futuristic UI.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 justify-center lg:justify-start mb-6 flex-wrap">
            {[FaLinkedinIn, FaGithub, FaGlobe].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border border-cyan-400 text-cyan-400
                flex items-center justify-center hover:bg-cyan-400 hover:text-black
                transition cursor-pointer"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>

          <button
            className="px-7 sm:px-8 py-2.5 sm:py-3 bg-cyan-400 text-black rounded-full font-semibold
            shadow-[0_0_20px_#00f6ff] hover:scale-105 transition"
          >
            Download CV
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center relative z-10 mt-8 lg:mt-0">
          <div className="relative">

            <div
              className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80
              rounded-full bg-gradient-to-tr from-cyan-400 via-transparent to-cyan-400
              flex items-center justify-center shadow-[0_0_45px_#00f6ff]"
            >
              <div className="w-[85%] h-[85%] rounded-full bg-white/10 backdrop-blur-xl p-2">
                <img
                  src="/img/s.jpg"
                  alt="profile"
                  className="w-full h-full object-cover rounded-full object-[50%_30%]"
                />
              </div>
            </div>

            <div className="absolute inset-0 bg-cyan-400 blur-[100px] opacity-30 -z-10 rounded-full" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Profile;
