import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navItems, personal } from '../data/portfolioData'
import { cx } from '../lib/helpers'
import { useActiveSection } from '../hooks/useActiveSection'
import ThemeToggle from './ui/ThemeToggle'

// Defined once, outside the component, so the array never changes between renders.
const sectionIds = navItems.map((item) => item.id)

export default function Navbar({ theme, onToggleTheme }) {
  const activeId = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef(null)

  // Add a frosted background once the user scrolls away from the top.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Escape closes the mobile menu and gives focus back to the hamburger button.
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={cx(
        'sticky top-0 z-50 w-full border-b transition-colors duration-300',
        scrolled || menuOpen ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        {/* -m-1 p-1 makes the tap area 44px while the logo itself stays 36px */}
        <a href="#home" onClick={closeMenu} className="group -m-1 flex items-center gap-3 p-1" aria-label={`${personal.name} - back to top`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-accent to-accent-2 font-display text-sm font-bold text-on-accent shadow-md shadow-accent/20 transition-transform duration-300 motion-safe:group-hover:rotate-6">
            {personal.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-fg sm:block">{personal.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cx(
                    'relative inline-flex min-h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-accent' : 'text-muted hover:text-fg',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-accent/10 ring-1 ring-accent/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-fg transition duration-200 hover:border-accent/50 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/*
        Mobile menu.
        It is an OVERLAY (absolute, hanging below the header) and not part of the
        normal page flow. If it pushed the page down while open, the browser would
        calculate the wrong scroll position when you tap a link and the menu closes.
      */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-line bg-bg shadow-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navItems.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={closeMenu}
                      aria-current={isActive ? 'location' : undefined}
                      className={cx(
                        'flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors duration-200',
                        isActive ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-surface-2 hover:text-fg',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
