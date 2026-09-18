import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import TechMarquee from '../sections/TechMarquee'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Process from '../sections/Process'
import Projects from '../sections/Projects'
import Stats from '../sections/Stats'
import Services from '../sections/Services'
import Experience from '../sections/Experience'
import Testimonials from '../sections/Testimonials'
import FAQ from '../sections/FAQ'
import CTABanner from '../sections/CTABanner'
import Contact from '../sections/Contact'
import { scrollToSection } from '../animations/smoothScroll'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    const t = setTimeout(() => scrollToSection(target), 80)
    window.history.replaceState({}, document.title)
    return () => clearTimeout(t)
  }, [location.state])

  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Process />
      <Projects />
      <Stats />
      <Services />
      <Experience />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Contact />
    </>
  )
}
