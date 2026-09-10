import { Heart, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { STORIES } from '../data/searchIndex'

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 p-6 sm:p-10">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Home</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your personalized feed of stories from writers and publications you follow.
        </p>
      </div>

      <ul className="flex flex-col">
        {STORIES.map((story) => (
          <li key={story.id} className="border-b border-gray-100 py-6 first:pt-0 last:border-none">
            <article>
              <p className="text-xs font-medium text-gray-500">
                {story.publication} · {story.author}
              </p>
              <Link to={`/article/${story.id}`} className="group mt-1 block">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:underline">
                  {story.title}
                </h2>
                {story.subtitle && (
                  <p className="mt-1 text-sm text-gray-500">{story.subtitle}</p>
                )}
              </Link>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{story.excerpt}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                <span>{story.date}</span>
                <span>·</span>
                <span>{story.readTime}</span>
                <span className="flex items-center gap-1">
                  <Heart size={14} />
                  {story.claps}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  {story.responses}
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
