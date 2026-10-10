import Reveal from './Reveal'

/**
 * A vertical line with dots, used by both Experience and Education.
 * Semantically it is an ordered list (<ol>) because the order matters.
 */
export function Timeline({ label, children }) {
  return (
    <ol aria-label={label} className="relative ml-2 space-y-8 border-l border-line pl-6 sm:pl-10">
      {children}
    </ol>
  )
}

export function TimelineItem({ delay = 0, children }) {
  return (
    <Reveal as="li" delay={delay} className="relative">
      {/* The dot sits exactly on the line: -(padding + half the line + half the dot) */}
      <span
        aria-hidden="true"
        className="absolute top-8 -left-[calc(1.5rem+6.5px)] h-3 w-3 rounded-full bg-accent ring-4 ring-bg sm:-left-[calc(2.5rem+6.5px)]"
      />
      {children}
    </Reveal>
  )
}
