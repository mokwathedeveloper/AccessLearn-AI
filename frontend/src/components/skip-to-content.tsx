import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function SkipToContent() {
  return (
    <Button
      asChild
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50"
      variant="secondary"
    >
      <Link href="#main-content">Skip to Main Content</Link>
    </Button>
  )
}
