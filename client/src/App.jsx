import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Loader from './components/common/Loader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { ScrollProgressBar } from './components/common/ScrollToTop'
import CustomCursor from './components/common/CustomCursor'
import DotBackground from './components/common/DotBackground'
import WhatsAppButton from './components/common/WhatsAppButton'
import AIAssistant from './components/common/AIAssistant'
import CommandPalette from './components/common/CommandPalette'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import { ScrollTrigger } from './animations/gsap'
import { usePageIntro } from './animations/pageLoad'
import { useSmoothScroll, resetScroll } from './animations/smoothScroll'

export default function App() {
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()

  useSmoothScroll()
  usePageIntro(!loading)

  // New route: start at the top and re-measure scroll-driven animations.
  useEffect(() => {
    resetScroll()
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <div className="relative bg-bg font-body text-text">
      <DotBackground />
      <Loader onDone={() => setLoading(false)} />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
      <AIAssistant />
      <CommandPalette />
    </div>
  )
}
