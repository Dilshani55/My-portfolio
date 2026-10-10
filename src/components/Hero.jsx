import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { education, experience, personal } from '../data/portfolioData'
import { assetUrl, isProvided } from '../lib/helpers'
import Button from './ui/Button'
import SocialLinks from './ui/SocialLinks'

// Animation "recipes". The parent staggers its children one after another.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Facts for the "At a glance" card - all taken from portfolioData.js
const glanceFacts = [
  { label: 'Education', value: `${education[0].degree.replace('Bachelor of Science (Honours)', 'BSc (Hons)')}, ${education[0].institution}` },
  { label: 'Experience', value: `Former ${experience[0].role}, ${experience[0].company}` },
  { label: 'Focus', value: experience[0].focus },
  { label: 'Location', value: personal.location },
]

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid absolute inset-0" />
      <div className="blob -left-24 -top-10 h-72 w-72 sm:h-[28rem] sm:w-[28rem]" style={{ background: 'var(--glow-1)' }} />
      <div className="blob blob-reverse -right-16 top-1/3 h-64 w-64 sm:h-96 sm:w-96" style={{ background: 'var(--glow-2)' }} />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-bg to-transparent" />
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackground />

      <div className="mx-auto flex w-full max-w-6xl items-center px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:min-h-[calc(100svh-4rem)] lg:px-8 lg:pt-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* ---------- Left: main introduction ---------- */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Exploring junior opportunities
            </motion.p>

            <motion.h1
              id="hero-title"
              variants={item}
              className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-fg text-balance sm:text-5xl lg:text-6xl"
            >
              {personal.heroHeadline} <span className="text-gradient">{personal.name}</span>
            </motion.h1>

            <motion.p variants={item} className="mt-5 font-display text-xl font-semibold text-fg/90 sm:text-2xl">
              {personal.title}
            </motion.p>

            <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {personal.heroSummary}
            </motion.p>

            <motion.ul variants={item} aria-label="Core technologies" className="mt-6 flex flex-wrap gap-2">
              {personal.highlights.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-accent/20 bg-accent/10 px-3 py-1.5 font-mono text-xs font-medium text-accent"
                >
                  {tech}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              {/* Only one button here on purpose. LinkedIn etc. live in the icon row below. */}
              <Button href="#contact" icon={ArrowRight}>
                Contact Me
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-8">
              <SocialLinks />
            </motion.div>
          </motion.div>

          {/* ---------- Right: factual "at a glance" card ---------- */}
          <motion.aside
            aria-label="Profile summary"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-line bg-surface/80 p-6 shadow-card backdrop-blur sm:p-7"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-6 -top-px h-px bg-linear-to-r from-transparent via-accent to-transparent"
            />
            {/* Phones/tablets: avatar with the label beside it. Desktop (lg): big portrait with the label below. */}
            <div className="flex items-end gap-4 lg:block">
              {isProvided(personal.photo) && (
                // object-[50%_20%] keeps the face in view when the tall photo is cropped to a square.
                // width/height are the real file size, so the page does not jump while it loads.
                <img
                  src={assetUrl(personal.photo)}
                  alt={`Portrait of ${personal.name}`}
                  width="960"
                  height="1280"
                  fetchPriority="high"
                  decoding="async"
                  className="h-28 w-28 shrink-0 rounded-2xl object-cover object-[50%_20%] ring-1 ring-line lg:mb-6 lg:aspect-square lg:h-auto lg:w-full"
                />
              )}
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">At a glance</p>
            </div>
            <dl className="mt-5 space-y-4">
              {glanceFacts.map(({ label, value }) => (
                <div key={label} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted">{label}</dt>
                  <dd className="mt-1 text-sm font-medium leading-snug text-fg sm:text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
