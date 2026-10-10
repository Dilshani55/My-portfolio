import { ArrowUp } from 'lucide-react'
import { personal } from '../data/portfolioData'
import Button from './ui/Button'
import SocialLinks from './ui/SocialLinks'

// Always the current year - no need to edit it every January.
// (Calculated once when the page loads, in the visitor's browser.)
const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-fg">{personal.name}</p>
            <p className="mt-1 text-sm text-muted">{personal.title}</p>
          </div>
          <SocialLinks />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {currentYear} {personal.name}. All rights reserved.
          </p>
          <Button href="#home" variant="secondary" icon={ArrowUp} className="self-start sm:self-auto">
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  )
}
