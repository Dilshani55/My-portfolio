import { cx } from '../../lib/helpers'

/**
 * A clean surface card.
 *  - hover (default true): lifts slightly with a soft blue glow, only for
 *    people who allow motion. Turn off for cards that are not "clickable".
 *  - as: change the HTML tag (div, article, dl, li ...)
 */
export default function Card({ as: Tag = 'div', hover = true, className = '', children, ...rest }) {
  return (
    <Tag
      className={cx(
        'rounded-2xl border border-line bg-surface shadow-card',
        hover &&
          'transition-[transform,box-shadow,border-color] duration-300 hover:border-accent/40 hover:shadow-card-hover motion-safe:hover:-translate-y-1',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
