import { ArrowUpRight, Download, Eye, FileText } from 'lucide-react'
import { contact } from '../data/portfolioData'
import { contactChannels, cvFileName, cvHref, formEndpoint } from '../lib/contactChannels'
import { cx } from '../lib/helpers'
import ContactForm from './ContactForm'
import Button from './ui/Button'
import Card from './ui/Card'
import Reveal from './ui/Reveal'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

function IconBox({ icon: Icon, muted = false }) {
  return (
    <span
      className={
        muted
          ? 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-line text-muted'
          : 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent/20 to-accent-2/10 text-accent ring-1 ring-accent/20'
      }
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </span>
  )
}

// One contact method. A real link when the value exists, a clear placeholder when it does not.
function ChannelCard({ channel }) {
  const { label, icon, href, display, external, placeholder, dataKey } = channel

  if (!href) {
    return (
      <div className="flex h-full items-center gap-4 rounded-2xl border border-dashed border-line bg-surface/40 p-5 sm:p-6">
        <IconBox icon={icon} muted />
        <div className="min-w-0">
          <p className="font-display text-base font-semibold text-fg">{label}</p>
          <p className="text-sm text-muted">{placeholder}</p>
          <p className="mt-1 break-all font-mono text-xs text-muted/80">Edit {dataKey} in src/data/portfolioData.js</p>
        </div>
      </div>
    )
  }

  return (
    <Card
      as="a"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex h-full items-center gap-4 p-5 sm:p-6"
    >
      <IconBox icon={icon} />
      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-semibold text-fg">
          {label}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </p>
        {/* wrap-anywhere lets a long email or URL break instead of widening the card on tiny screens */}
        <p className="wrap-anywhere text-sm text-muted">{display}</p>
      </div>
      <ArrowUpRight
        className="h-5 w-5 shrink-0 text-muted transition duration-200 group-hover:text-accent motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Card>
  )
}

// View (opens the PDF in a new tab) and Download. Only rendered when links.cv is set.
function CvCard() {
  return (
    <Card hover={false} className="h-full p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <IconBox icon={FileText} />
        <div className="min-w-0">
          <p className="font-display text-base font-semibold text-fg">CV</p>
          <p className="text-sm text-muted">PDF document</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button href={cvHref} variant="secondary" icon={Eye} external>
          View CV
        </Button>
        <Button href={cvHref} icon={Download} download={cvFileName}>
          Download CV
        </Button>
      </div>
    </Card>
  )
}

export default function Contact() {
  const hasForm = Boolean(formEndpoint)

  // The cards: every contact channel, plus the CV card when a CV is set.
  const cards = [
    ...contactChannels.map((channel) => ({ key: channel.id, node: <ChannelCard channel={channel} /> })),
    ...(cvHref ? [{ key: 'cv', node: <CvCard /> }] : []),
  ]
  // With an odd number of cards, the last one takes a full row so there is no gap in the 2-column layout.
  const lastCardSpan = cards.length % 2 === 1 ? (hasForm ? 'sm:col-span-2 lg:col-span-1' : 'sm:col-span-2') : ''

  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading id="contact-title" eyebrow="07 / Contact" title={contact.heading} description={contact.intro} />

      {/* With the form: form on the left, cards on the right (desktop). Without it: just the cards. */}
      <div className={cx(hasForm && 'grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start')}>
        {hasForm && (
          <Reveal className="min-w-0">
            <ContactForm />
          </Reveal>
        )}

        <ul className={cx('grid gap-4', hasForm ? 'sm:grid-cols-2 lg:grid-cols-1' : 'sm:grid-cols-2 sm:gap-5')}>
          {cards.map((card, index) => (
            <Reveal
              as="li"
              key={card.key}
              delay={index * 0.08}
              className={cx('min-w-0', index === cards.length - 1 && lastCardSpan)}
            >
              {card.node}
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
