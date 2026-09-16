import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
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

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative bg-bg font-body text-text">
      <DotBackground />
      <Loader show={loading} />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </motion.main>

      <Footer />
      <WhatsAppButton />
      <AIAssistant />
      <CommandPalette />
    </div>
  )
}
