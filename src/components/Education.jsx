import { Calendar, GraduationCap } from 'lucide-react'
import { education } from '../data/portfolioData'
import Badge from './ui/Badge'
import Card from './ui/Card'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import { Timeline, TimelineItem } from './ui/Timeline'

export default function Education() {
  return (
    <Section id="education" labelledBy="education-title">
      <SectionHeading id="education-title" eyebrow="05 / Education" title="Education" />

      <Timeline label="Education history">
        {education.map((entry, index) => (
          <TimelineItem key={entry.id} delay={index * 0.08}>
            <Card as="article" className="p-6 sm:p-8">
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent/20 to-accent-2/10 text-accent ring-1 ring-accent/20">
                  <GraduationCap className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold text-fg sm:text-2xl">{entry.degree}</h3>
                  <p className="mt-1 font-medium text-accent">{entry.institution}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge icon={Calendar}>{entry.period}</Badge>
                    <Badge tone="accent">{entry.status}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  )
}
