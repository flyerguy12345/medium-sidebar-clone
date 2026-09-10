import { Users } from 'lucide-react'
import PageShell from './PageShell'

export default function FollowingPage() {
  return (
    <PageShell
      icon={Users}
      title="Following"
      description="Writers and publications you follow, and their latest stories."
    />
  )
}
