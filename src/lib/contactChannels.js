import { BookOpen, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons'
import { contact, links, personal } from '../data/portfolioData'
import { assetUrl, isProvided, normalizeUrl } from './helpers'

/**
 * Turns the raw values in portfolioData.js into ready-to-use link objects.
 * Anything missing or invalid gets `href: ''`, and every component skips (or
 * shows a placeholder for) channels without an href. That is how we make
 * sure the site never contains a fake or broken link.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 'https://www.github.com/me/' -> 'github.com/me'
function prettyUrl(url) {
  return url
    .replace(/^https?:\/\/(www\.)?/i, '')
    .replace(/\/$/, '')
}

const email = isProvided(links.email) && EMAIL_PATTERN.test(links.email.trim()) ? links.email.trim() : ''
const linkedinUrl = normalizeUrl(links.linkedin)
const githubUrl = normalizeUrl(links.github)
const blogUrl = normalizeUrl(links.blog)

export const contactChannels = [
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    href: email ? `mailto:${email}` : '',
    display: email,
    external: false,
    placeholder: 'Add your email address',
    dataKey: 'links.email',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: LinkedinIcon,
    href: linkedinUrl,
    display: prettyUrl(linkedinUrl),
    external: true,
    placeholder: 'Add your LinkedIn profile URL',
    dataKey: 'links.linkedin',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: GithubIcon,
    href: githubUrl,
    display: prettyUrl(githubUrl),
    external: true,
    placeholder: 'Add your GitHub profile URL',
    dataKey: 'links.github',
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: BookOpen,
    href: blogUrl,
    display: prettyUrl(blogUrl),
    external: true,
    placeholder: 'Add your blog URL',
    dataKey: 'links.blog',
  },
]

// Only the channels that really exist (used for icon rows in hero + footer)
export const availableChannels = contactChannels.filter((channel) => channel.href)

// Where the contact form sends messages. '' (= no form) unless the form is switched
// on in the data file AND a valid email exists.
export const formEndpoint = contact.enableForm && email ? `https://formsubmit.co/ajax/${email}` : ''

// The visitor-facing email address (used in "email me directly" fallbacks).
export const contactEmail = email

// '' unless a CV path was provided. Controls the "Download CV" button in the navbar.
export const cvHref = assetUrl(links.cv)

// The name the CV gets when someone downloads it, e.g. 'Dilshani-Vitharana-CV.pdf'
export const cvFileName = `${personal.name.trim().replace(/\s+/g, '-')}-CV.pdf`
