import Reveal from './Reveal'

/**
 * The small label + big title + optional sentence that opens each section.
 * `id` is used by the section's aria-labelledby.
 */
export default function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-14">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-linear-to-r from-accent to-accent-2" />
      {description && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  )
}
