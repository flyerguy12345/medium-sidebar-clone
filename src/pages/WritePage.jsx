import { PenSquare } from 'lucide-react'
import PageShell from './PageShell'

export default function WritePage() {
  return (
    <PageShell
      icon={PenSquare}
      title="Write a story"
      description="Start drafting your next story. Your work is saved automatically."
    />
  )
}
