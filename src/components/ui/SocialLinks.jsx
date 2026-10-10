import { availableChannels } from '../../lib/contactChannels'
import { cx } from '../../lib/helpers'

/**
 * Row of round icon links (Email / LinkedIn / GitHub).
 * It renders ONLY the channels you filled in inside portfolioData.js,
 * and renders nothing at all when none are filled in.
 */
export default function SocialLinks({ className = '' }) {
  if (availableChannels.length === 0) return null

  return (
    <ul className={cx('flex flex-wrap items-center gap-3', className)} aria-label="Social links">
      {availableChannels.map(({ id, label, href, icon: Icon, external }) => (
        <li key={id}>
          <a
            href={href}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            title={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-muted transition duration-200 hover:border-accent/50 hover:text-accent motion-safe:hover:-translate-y-0.5"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
