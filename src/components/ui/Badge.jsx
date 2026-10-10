import { cx } from '../../lib/helpers'

const tones = {
  neutral: 'border-line bg-surface-2 text-muted',
  accent: 'border-accent/25 bg-accent/10 text-accent',
}

/** Small rounded label, e.g. "Internship" or "December 2025 – June 2026". */
export default function Badge({ tone = 'neutral', icon: Icon, className = '', children }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  )
}
