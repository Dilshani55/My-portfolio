import { useState } from 'react'
import { Check, ExternalLink, FolderGit2, MonitorPlay, Play } from 'lucide-react'
import { projects } from '../data/portfolioData'
import { assetUrl, getVideoSource, normalizeUrl } from '../lib/helpers'
import { GithubIcon } from './ui/BrandIcons'
import Card from './ui/Card'
import Reveal from './ui/Reveal'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

// One small link at the bottom of a card ("Code" / "Live demo" / "Watch demo").
function ProjectLink({ href, icon: Icon, label, projectTitle }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${projectTitle} (opens in a new tab)`}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-accent transition-colors duration-200 hover:bg-accent/10"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  )
}

// YouTube "click to play": nothing is loaded from YouTube until the visitor presses play.
// (Faster page, and no tracking cookies unless they choose to watch.)
function YouTubeEmbed({ id, title }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={`Demo video: ${title}`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        className="h-full w-full"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play demo video: ${title}`}
      className="group relative block h-full w-full overflow-hidden bg-linear-to-br from-accent/25 to-accent-2/15"
    >
      {/* Thumbnail from YouTube. If it fails to load, the gradient behind it still looks fine. */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/20 transition-colors duration-200 group-hover:bg-black/30" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition-transform duration-200 motion-safe:group-hover:scale-110">
        <Play className="ml-0.5 h-6 w-6" fill="currentColor" aria-hidden="true" />
      </span>
    </button>
  )
}

// The demo video at the top of a card. Renders nothing when the project has no video.
function ProjectVideo({ source, title, poster }) {
  if (!source || source.type === 'link') return null

  return (
    <div className="mb-5 aspect-video overflow-hidden rounded-xl border border-line bg-surface-2">
      {source.type === 'youtube' ? (
        <YouTubeEmbed id={source.id} title={title} />
      ) : (
        <video
          controls
          playsInline
          preload="metadata"
          poster={assetUrl(poster) || undefined}
          aria-label={`Demo video: ${title}`}
          className="h-full w-full bg-black object-contain"
        >
          <source src={source.src} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

function ProjectCard({ project }) {
  const titleId = `project-${project.id}`
  // normalizeUrl returns '' for empty values, so missing links simply do not render
  const githubHref = normalizeUrl(project.githubUrl)
  const liveHref = normalizeUrl(project.liveUrl)
  const video = getVideoSource(project.videoUrl)
  const hasLinks = githubHref || liveHref || video?.type === 'link'

  return (
    <Card as="article" aria-labelledby={titleId} className="flex h-full flex-col p-6 sm:p-7">
      <ProjectVideo source={video} title={project.title} poster={project.videoPoster} />

      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent/20 to-accent-2/10 text-accent ring-1 ring-accent/20">
          <FolderGit2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 id={titleId} className="font-display text-lg font-semibold leading-snug text-fg">
          {project.title}
        </h3>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>

      {project.highlights?.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {project.highlights.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* mt-auto pushes the tech list and links to the bottom so cards line up */}
      <ul aria-label="Technologies used" className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.technologies.map((tech) => (
          <li key={tech} className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs font-medium text-fg">
            {tech}
          </li>
        ))}
      </ul>

      {hasLinks && (
        <div className="mt-4 border-t border-line pt-3">
          {/* -mx-3 cancels the links' own padding so their text lines up with the rest of the card */}
          <div className="-mx-3 flex flex-wrap gap-1">
            {githubHref && <ProjectLink href={githubHref} icon={GithubIcon} label="Code" projectTitle={project.title} />}
            {liveHref && <ProjectLink href={liveHref} icon={ExternalLink} label="Live site" projectTitle={project.title} />}
            {video?.type === 'link' && <ProjectLink href={video.href} icon={MonitorPlay} label="Watch demo" projectTitle={project.title} />}
          </div>
        </div>
      )}
    </Card>
  )
}

// Shown only while the `projects` list in portfolioData.js is empty.
function EmptyState() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-line bg-surface/40 p-6 sm:flex-row sm:items-center sm:p-8">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-line text-muted">
        <FolderGit2 className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-lg font-semibold text-fg">Projects coming soon</p>
        <p className="text-sm text-muted">Selected projects will be listed here.</p>
        <p className="mt-1 break-words font-mono text-xs text-muted/80">Add them to `projects` in src/data/portfolioData.js</p>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        eyebrow="03 / Projects"
        title="Projects"
        description="Selected projects, with the technologies used and links to the code."
      />

      {projects.length === 0 ? (
        <Reveal>
          <EmptyState />
        </Reveal>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.id} delay={(index % 2) * 0.08} className="min-w-0">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  )
}
