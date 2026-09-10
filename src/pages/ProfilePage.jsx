import { User } from 'lucide-react'
import PageShell from './PageShell'

export default function ProfilePage() {
  return (
    <PageShell
      icon={User}
      title="Profile"
      description="Manage your public profile, bio, and published stories."
    />
  )
}
