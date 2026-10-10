import { Award, ExternalLink } from 'lucide-react'
import { certifications } from '../data/portfolioData'
import { isProvided, normalizeUrl } from '../lib/helpers'
import Badge from './ui/Badge'
import Card from './ui/Card'
import Reveal from './ui/Reveal'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

// Shown whenever a detail in portfolioData.js is still empty.
function Pending() {
  return <span className="italic text-muted/80">To be verified</span>
}

function Detail({ label, value }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2.5 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-fg">{isProvided(value) ? value : <Pending />}</dd>
    </div>
  )
}

export default function Certifications() {
  return (
    <Section id="certifications" labelledBy="certifications-title">
      <SectionHeading
        id="certifications-title"
        eyebrow="06 / Certifications"
        title="Certifications"
        description="Professional learning in GitHub and automation workflows."
      />

      <ul className="grid gap-5 md:grid-cols-2">
        {certifications.map((cert, index) => {
          const titleId = `cert-${cert.id}`
          const credentialHref = normalizeUrl(cert.credentialUrl)
          const allVerified = [cert.issuer, cert.date].every(isProvided)
          return (
            <Reveal as="li" key={cert.id} delay={index * 0.08}>
              <Card as="article" aria-labelledby={titleId} className="flex h-full flex-col p-6 sm:p-7">
                {/* flex-1 pushes the details list to the bottom so both cards line up */}
                <div className="flex flex-1 items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent/20 to-accent-2/10 text-accent ring-1 ring-accent/20">
                    <Award className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 id={titleId} className="font-display text-lg font-semibold leading-snug text-fg">
                      {cert.title}
                    </h3>
                    {!allVerified && (
                      <Badge className="mt-2" tone="accent">
                        Details being verified
                      </Badge>
                    )}
                  </div>
                </div>

                <dl className="mt-5 divide-y divide-line border-t border-line">
                  <Detail label="Issued by" value={cert.issuer} />
                  <Detail label="Issue date" value={cert.date} />
                  <Detail label="Credential ID" value={cert.credentialId} />
                </dl>

                {credentialHref && (
                  <a
                    href={credentialHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm font-semibold text-accent hover:underline"
                  >
                    View credential
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </Card>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
