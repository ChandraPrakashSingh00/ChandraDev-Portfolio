import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  // 🔒 BODY SCROLL LOCK WITHOUT LAYOUT SHIFT
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* ================= FIXED NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center">
        <div className="mt-4 w-[95%] max-w-7xl">
          <div
            className="bg-[#0b0f19]/80 backdrop-blur-xl
            border border-cyan-400/20
            rounded-full shadow-[0_0_30px_#00f6ff25]
            px-6 py-3 flex items-center justify-between"
          >
            {/* LOGO */}
            <Link
              to="/"
              className="text-white font-bold text-lg tracking-wide"
            >
              Chandra<span className="text-cyan-400">.Dev</span>
            </Link>

            {/* DESKTOP LINKS */}
            <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
              {links.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-3 py-1 transition-all duration-300
                    ${
                      isActive
                        ? "text-cyan-400"
                        : "text-white hover:text-cyan-400"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <span
                          className="absolute inset-0 -z-10
                          bg-cyan-400/10 rounded-full
                          shadow-[0_0_12px_#00f6ff]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              {/* CTA */}
              <Link
                to="/hireme"
                className="ml-2 px-6 py-2 bg-cyan-400 text-black
                rounded-full font-semibold text-sm
                shadow-[0_0_20px_#00f6ff]
                hover:scale-105 transition"
              >
                Hire Me
              </Link>
            </ul>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white text-xl"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur
        transition-opacity duration-300
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* ================= MOBILE PANEL ================= */}
      <div
        className={`fixed bottom-0 left-0 w-full z-50
        bg-[#151a25]
        rounded-t-[2.5rem]
        border-t border-cyan-400/30
        shadow-[0_-15px_35px_#00f6ff30]
        transform transition-transform duration-300 ease-out
        will-change-transform
        ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="py-10 flex flex-col items-center gap-6 text-white">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-lg font-semibold transition
                ${
                  isActive
                    ? "text-black bg-cyan-400 px-10 py-2 rounded-full shadow-[0_0_20px_#00f6ff]"
                    : "text-white hover:text-cyan-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <Link
            to="/hireme"
            onClick={() => setOpen(false)}
            className="mt-2 px-14 py-3 bg-cyan-400 text-black
            rounded-full font-semibold text-lg
            shadow-[0_0_30px_#00f6ff] hover:scale-105 transition"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
