import { BarChart2 } from 'lucide-react'
import PageShell from './PageShell'

export default function StatsPage() {
  return (
    <PageShell
      icon={BarChart2}
      title="Stats"
      description="Views, reads, and fans across all of your stories."
    />
  )
}
