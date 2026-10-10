import { useEffect, useState } from 'react'

/**
 * Custom hook: tells us which page section is currently in the middle of the
 * screen, so the navbar can highlight the matching link.
 *
 * @param {string[]} ids - the `id` of every section, in page order.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0 || !('IntersectionObserver' in window)) return

    // A thin horizontal "detector band" across the middle of the viewport.
    // The section touching that band is the active one.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))

    // Short last section: when the user hits the very bottom, select it.
    const handleScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4
      if (atBottom) setActiveId(ids[ids.length - 1])
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup: runs when the component unmounts.
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ids])

  return activeId
}
