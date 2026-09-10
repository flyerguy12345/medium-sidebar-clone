import { BookMarked } from 'lucide-react'
import PageShell from './PageShell'

export default function LibraryPage() {
  return (
    <PageShell
      icon={BookMarked}
      title="Library"
      description="Stories you've saved or highlighted, all in one place."
    />
  )
}
