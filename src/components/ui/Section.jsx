import { cx } from '../../lib/helpers'

/**
 * Standard page section: gives every section the same id, spacing and
 * centred width. `labelledBy` connects it to its <h2> for screen readers.
 */
export default function Section({ id, labelledBy, className = '', children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx('relative py-20 sm:py-28', className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
