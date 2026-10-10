import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

// index.html already set the .dark class before React started (so the page
// never flashes the wrong colours). Here we simply read what it decided.
function getInitialTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/**
 * Custom hook: remembers "dark" or "light", updates <html>, and saves the
 * choice in the browser (localStorage) so it survives a page refresh.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  // Whenever `theme` changes, sync it to the <html> element.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme // makes scrollbars/form controls match
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be blocked (private mode). The toggle still works.
    }
  }, [theme])

  return { theme, toggleTheme }
}
