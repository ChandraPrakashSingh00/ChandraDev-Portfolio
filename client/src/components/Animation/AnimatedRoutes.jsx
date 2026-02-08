import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Profile from "../../pages/Profile";
import Contact from "../../pages/Contact";
import Projects from "../../pages/Projects";
import About from "../../pages/About";
import HireMe from "../../pages/Hireme";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full min-h-screen
      overflow-x-hidden"
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div
      className="relative min-h-screen bg-[#0b0f19]
      overflow-x-hidden pt-28"
    >
      {/* pt-28 = navbar height reserve (IMPORTANT) */}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Profile />
              </PageWrapper>
            }
          />

          <Route
            path="/projects"
            element={
              <PageWrapper>
                <Projects />
              </PageWrapper>
            }
          />

          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />

          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />

          <Route
            path="/hireme"
            element={
              <PageWrapper>
                <HireMe />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedRoutes;
