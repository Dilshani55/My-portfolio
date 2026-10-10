import { Database, Monitor, Server, Sparkles, Wrench } from 'lucide-react'
import { skillCategories } from '../data/portfolioData'
import { cx } from '../lib/helpers'
import Card from './ui/Card'
import Reveal from './ui/Reveal'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

// Maps the icon name written in portfolioData.js to the real icon component.
const categoryIcons = {
  monitor: Monitor,
  server: Server,
  database: Database,
  wrench: Wrench,
  sparkles: Sparkles,
}

export default function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        eyebrow="02 / Skills"
        title="Technical skills"
        description="The technologies and habits I use to build and maintain web applications."
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => {
          const Icon = categoryIcons[category.icon] ?? Sparkles
          const titleId = `skills-${category.id}`
          return (
            <Reveal as="li" key={category.id} delay={(index % 3) * 0.08} className={cx(category.id === 'core' && 'lg:col-span-2')}>
              <Card as="article" aria-labelledby={titleId} className="group h-full p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent/20 to-accent-2/10 text-accent ring-1 ring-accent/20 transition-transform duration-300 motion-safe:group-hover:scale-110">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 id={titleId} className="font-display text-lg font-semibold text-fg">
                    {category.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{category.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
