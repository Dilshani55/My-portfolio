// Tiny helper to join CSS class names, ignoring empty values:
// cx('p-4', isActive && 'text-accent')  ->  'p-4 text-accent'  (or just 'p-4')
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

// True only when a data value was really filled in (not '' or spaces).
export function isProvided(value) {
  return typeof value === 'string' && value.trim() !== ''
}

// Turns a path to a file in /public into a URL that works wherever the site is hosted.
//   On your own domain / Vercel / localhost the site lives at "/"        -> '/profile.jpg'
//   On GitHub Pages project sites it lives at "/your-repo-name/"         -> '/your-repo-name/profile.jpg'
// Without this, '/profile.jpg' would point at the wrong place (a 404) on GitHub Pages.
// Full web addresses (https://...) are left alone.
export function assetUrl(path) {
  if (!isProvided(path)) return ''
  const trimmed = path.trim()
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:')) return trimmed
  return import.meta.env.BASE_URL + trimmed.replace(/^\/+/, '')
}

// Works out what kind of demo video a data value is:
//   '/videos/demo.mp4'              -> { type: 'file', src }   plays in a <video> tag
//   'https://youtu.be/AbCdEfGhIjK'  -> { type: 'youtube', id } click-to-play YouTube embed
//   'https://loom.com/share/...'    -> { type: 'link', href }  just a "Watch demo" link
//   ''                              -> null                     nothing is shown
const YOUTUBE_PATTERN = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/i
const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg)(\?.*)?$/i

export function getVideoSource(value) {
  if (!isProvided(value)) return null
  const trimmed = value.trim()

  const youtube = trimmed.match(YOUTUBE_PATTERN)
  if (youtube) return { type: 'youtube', id: youtube[1] }

  if (VIDEO_FILE_PATTERN.test(trimmed)) {
    // assetUrl() adds the site's base path (needed on GitHub Pages project sites)
    return { type: 'file', src: assetUrl(trimmed) }
  }

  return { type: 'link', href: normalizeUrl(trimmed) }
}

// Makes a typed-in URL safe to use as a link.
//   ''                       -> ''
//   'linkedin.com/in/me'     -> 'https://linkedin.com/in/me'
//   'https://example.com'    -> 'https://example.com'
export function normalizeUrl(value) {
  if (!isProvided(value)) return ''
  const trimmed = value.trim()
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}
