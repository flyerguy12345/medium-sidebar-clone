import { Newspaper, Search, Users } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PUBLICATIONS, STORIES } from '../data/searchIndex'
import PageShell from './PageShell'

function normalize(value) {
  return value.trim().toLowerCase()
}

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const rawQuery = searchParams.get('q') ?? ''
  const query = normalize(rawQuery)

  const matchedStories = useMemo(() => {
    if (!query) return []
    return STORIES.filter(({ title, author, publication }) =>
      [title, author, publication].some((field) => normalize(field).includes(query)),
    )
  }, [query])

  const matchedPeople = useMemo(() => {
    if (!query) return []
    return PUBLICATIONS.filter((name) => normalize(name).includes(query))
  }, [query])

  const totalResults = matchedStories.length + matchedPeople.length

  if (!query) {
    return (
      <PageShell
        icon={Search}
        title="Search"
        description="Type something in the sidebar search bar to find stories, writers, and publications."
      />
    )
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 p-6 sm:p-10">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Results for "{rawQuery}"</h1>
        <p className="mt-1 text-sm text-gray-500">
          {totalResults} {totalResults === 1 ? 'result' : 'results'}
        </p>
      </div>

      {totalResults === 0 && (
        <p className="text-sm text-gray-500">
          No stories, writers, or publications matched your search.
        </p>
      )}

      {matchedStories.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-400 uppercase">
            <Newspaper size={14} />
            Stories
          </h2>
          <ul className="flex flex-col gap-4">
            {matchedStories.map((story) => (
              <li key={story.id} className="border-b border-gray-100 pb-4 last:border-none">
                <h3 className="font-medium text-gray-900">{story.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {story.author} · {story.publication} · {story.readTime}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {matchedPeople.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-400 uppercase">
            <Users size={14} />
            People &amp; publications
          </h2>
          <ul className="flex flex-col gap-3">
            {matchedPeople.map((name) => (
              <li key={name} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                  {name.trim().charAt(0).toUpperCase()}
                </span>
                <span className="text-gray-800">{name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
