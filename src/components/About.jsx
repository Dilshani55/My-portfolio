import { Briefcase, Building2, GraduationCap, MapPin } from 'lucide-react'
import { about } from '../data/portfolioData'
import Card from './ui/Card'
import Reveal from './ui/Reveal'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

// Maps the icon name written in portfolioData.js to the real icon component.
const factIcons = {
  graduation: GraduationCap,
  building: Building2,
  briefcase: Briefcase,
  pin: MapPin,
}

export default function About() {
  const [lead, ...rest] = about.paragraphs

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading id="about-title" eyebrow="01 / About" title="About me" />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        {/* Text column */}
        <Reveal className="space-y-5">
          <p className="text-lg leading-relaxed text-fg sm:text-xl">{lead}</p>
          {rest.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
          <p className="rounded-xl border-l-4 border-accent bg-accent/5 px-5 py-4 text-base font-medium leading-relaxed text-fg">
            {about.goal}
          </p>
        </Reveal>

        {/* Facts column */}
        <Reveal delay={0.1}>
          <Card as="dl" hover={false} className="divide-y divide-line p-2">
            {about.facts.map(({ icon, label, value }) => {
              const Icon = factIcons[icon] ?? Briefcase
              return (
                <div key={label} className="flex items-start gap-4 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted">{label}</dt>
                    <dd className="mt-0.5 font-medium text-fg">{value}</dd>
                  </div>
                </div>
              )
            })}
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
