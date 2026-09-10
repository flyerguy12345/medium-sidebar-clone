import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SearchPage from './SearchPage'

function renderSearchPage(query) {
  const route = query ? `/search?q=${encodeURIComponent(query)}` : '/search'
  return render(
    <MemoryRouter initialEntries={[route]}>
      <SearchPage />
    </MemoryRouter>,
  )
}

describe('SearchPage', () => {
  it('shows a prompt when there is no query', () => {
    renderSearchPage()

    expect(screen.getByRole('heading', { level: 1, name: 'Search' })).toBeInTheDocument()
    expect(screen.getByText(/type something in the sidebar search bar/i)).toBeInTheDocument()
  })

  it('matches stories by title', () => {
    renderSearchPage('react hooks')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Results for "react hooks"' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Mastering React Hooks in 2026')).toBeInTheDocument()
    expect(screen.getByText('1 result')).toBeInTheDocument()
  })

  it('matches people and publications by name', () => {
    renderSearchPage('MLGuy')

    expect(screen.getByRole('heading', { level: 2, name: /people & publications/i })).toBeInTheDocument()
    expect(screen.getByText('MLGuy')).toBeInTheDocument()
    // "MLGuy" is also the author of the "ubiquitous language" story, so it should match both sections.
    expect(screen.getByText('Why Every Data Team Needs a Ubiquitous Language')).toBeInTheDocument()
    expect(screen.getByText('2 results')).toBeInTheDocument()
  })

  it('is case-insensitive', () => {
    renderSearchPage('mlguy')

    expect(screen.getByText('MLGuy')).toBeInTheDocument()
  })

  it('shows a no-results message when nothing matches', () => {
    renderSearchPage('zzz-nonexistent-zzz')

    expect(screen.getByText('0 results')).toBeInTheDocument()
    expect(
      screen.getByText('No stories, writers, or publications matched your search.'),
    ).toBeInTheDocument()
  })
})
