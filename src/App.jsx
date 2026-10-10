import { MotionConfig } from 'motion/react'
import About from './components/About'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    // reducedMotion="user": if the visitor's system asks for less motion,
    // Motion automatically switches off slides/movements site-wide.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
