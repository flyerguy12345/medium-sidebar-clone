import { Home } from 'lucide-react'
import PageShell from './PageShell'

export default function HomePage() {
  return (
    <PageShell
      icon={Home}
      title="Home"
      description="Your personalized feed of stories from writers and publications you follow."
    />
  )
}
