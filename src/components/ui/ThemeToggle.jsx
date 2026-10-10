import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

/**
 * Round button that switches between dark and light theme.
 * The label changes so screen readers announce what will happen on click.
 */
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface text-muted transition duration-200 hover:border-accent/50 hover:text-accent motion-safe:active:scale-95"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
          transition={{ duration: 0.18 }}
          className="inline-flex"
        >
          {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
