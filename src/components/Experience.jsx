import { Calendar, Check, Layers } from 'lucide-react'
import { experience } from '../data/portfolioData'
import Badge from './ui/Badge'
import Card from './ui/Card'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import { Timeline, TimelineItem } from './ui/Timeline'

export default function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        eyebrow="04 / Experience"
        title="Professional experience"
        description="Hands-on, team-based software engineering experience from my internship."
      />

      <Timeline label="Work experience">
        {experience.map((job, index) => (
          <TimelineItem key={job.id} delay={index * 0.08}>
            <Card as="article" className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-fg sm:text-2xl">{job.role}</h3>
                  <p className="mt-1 font-medium text-accent">{job.company}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge icon={Calendar}>{job.period}</Badge>
                  <Badge tone="accent">{job.type}</Badge>
                </div>
              </div>

              <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                <Layers className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  Main focus: <span className="font-semibold text-fg">{job.focus}</span>
                </span>
              </p>

              <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">Responsibilities</h4>
              <ul className="mt-3 space-y-3">
                {job.responsibilities.map((task) => (
                  <li key={task} className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-base">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-muted">Technologies used</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <li key={tech} className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs font-medium text-fg">
                    {tech}
                  </li>
                ))}
              </ul>
            </Card>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  )
}
