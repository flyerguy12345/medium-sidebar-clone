import { ArrowLeft, Gem, Heart, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { STORIES } from '../data/searchIndex'
import { ARTICLE_CONTENT } from '../data/articleContent'
import PageShell from './PageShell'

function ArticleSection({ heading, paragraphs = [], list, trailingParagraphs = [] }) {
  return (
    <section className="flex flex-col gap-3">
      {heading && <h2 className="text-lg font-semibold text-gray-900">{heading}</h2>}
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-relaxed text-gray-700">
          {paragraph}
        </p>
      ))}
      {list && (
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-700">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {trailingParagraphs.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-relaxed text-gray-700">
          {paragraph}
        </p>
      ))}
    </section>
  )
}

export default function ArticlePage() {
  const { id } = useParams()
  const story = STORIES.find((item) => item.id === id)
  const [isFollowingAuthor, setIsFollowingAuthor] = useState(false)

  // Reset the follow toggle when navigating between articles, since this
  // component instance is reused across /article/:id route changes. This
  // adjusts state during render rather than in an effect, per React's
  // guidance for resetting state when a prop changes.
  const [renderedId, setRenderedId] = useState(id)
  if (renderedId !== id) {
    setRenderedId(id)
    setIsFollowingAuthor(false)
  }

  if (!story) {
    return (
      <PageShell
        title="Article not found"
        description="This story doesn't exist, or may have been removed."
      />
    )
  }

  const sections = ARTICLE_CONTENT[story.id]

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-6 sm:p-10">
      <Link
        to="/"
        className="flex w-fit items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <header className="flex flex-col gap-3">
        {story.isMemberOnly && (
          <span className="flex w-fit items-center gap-1.5 text-xs font-semibold text-amber-600">
            <Gem size={14} className="fill-amber-400 text-amber-500" />
            Member-only story
          </span>
        )}

        {story.tags && (
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{story.title}</h1>
        {story.subtitle && <p className="text-lg text-gray-500">{story.subtitle}</p>}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
          <span className="font-medium text-gray-700">{story.author}</span>
          <span>in {story.publication}</span>
          <span>·</span>
          <span>{story.date}</span>
          <span>·</span>
          <span>{story.readTime}</span>
        </div>

        <div className="flex items-center gap-4 border-y border-gray-100 py-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Heart size={16} />
            {story.claps}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={16} />
            {story.responses}
          </span>
        </div>
      </header>

      {sections ? (
        <div className="flex flex-col gap-6">
          {sections.map((section, index) => (
            <ArticleSection key={section.heading ?? `intro-${index}`} {...section} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-gray-700">{story.excerpt}</p>
          <p className="text-sm text-gray-400">
            The full article isn't available yet — check back soon.
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-900 text-base font-semibold text-white">
            {story.author.trim().charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="font-medium text-gray-900">Written by {story.author}</p>
            <p className="text-sm text-gray-500">{story.publication}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsFollowingAuthor((prev) => !prev)}
          aria-pressed={isFollowingAuthor}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            isFollowingAuthor
              ? 'border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600'
              : 'bg-gray-900 text-white hover:bg-gray-700'
          }`}
        >
          {isFollowingAuthor ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  )
}
