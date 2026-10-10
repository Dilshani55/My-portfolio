import { motion } from 'motion/react'

/**
 * Wraps content so it fades + slides up the first time it scrolls into view.
 * Reduced-motion users: <MotionConfig reducedMotion="user"> in App.jsx removes
 * the slide automatically and keeps only a gentle fade.
 *
 * Props:
 *  - delay: seconds to wait (use small steps like 0.08 for staggering)
 *  - as: which HTML tag to render ('div', 'li', 'article'...)
 */
export default function Reveal({ children, delay = 0, as = 'div', className = '' }) {
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
