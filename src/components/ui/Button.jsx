import { cx } from '../../lib/helpers'

const baseStyles = [
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5',
  'text-sm font-semibold transition duration-200 motion-safe:active:scale-[0.97]',
  'disabled:cursor-not-allowed disabled:opacity-70',
].join(' ')

const variantStyles = {
  // Main call-to-action: blue -> cyan gradient
  primary:
    'bg-linear-to-r from-accent to-accent-2 text-on-accent shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:brightness-110',
  // Outlined button
  secondary: 'border border-line bg-surface text-fg hover:border-accent/50 hover:text-accent',
  // Quiet button without border
  ghost: 'text-muted hover:bg-surface-2 hover:text-fg',
}

/**
 * One button component for the whole site.
 *  - With `href`   -> renders an <a> link (semantic: links go places).
 *  - Without href  -> renders a <button> (semantic: buttons do things).
 *  - `external`    -> opens in a new tab, safely.
 */
export default function Button({ href, variant = 'primary', external = false, icon: Icon, iconClassName = '', className = '', children, ...rest }) {
  const classes = cx(baseStyles, variantStyles[variant], className)
  const content = (
    <>
      {Icon && <Icon className={cx('h-4 w-4 shrink-0', iconClassName)} aria-hidden="true" />}
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  )

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
