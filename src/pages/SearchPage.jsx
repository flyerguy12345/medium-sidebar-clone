import { Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import PageShell from './PageShell'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  return (
    <PageShell
      icon={Search}
      title={query ? `Results for "${query}"` : 'Search'}
      description={
        query
          ? 'No results yet — this is a placeholder search results page.'
          : 'Type something in the sidebar search bar to get started.'
      }
    />
  )
}
