import { Newspaper } from 'lucide-react'
import PageShell from './PageShell'

export default function StoriesPage() {
  return (
    <PageShell
      icon={Newspaper}
      title="Stories"
      description="Drafts, scheduled, and published stories you've written."
    />
  )
}
