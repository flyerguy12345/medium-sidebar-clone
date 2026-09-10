import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ArticlePage from './ArticlePage'

function renderArticlePage(id) {
  return render(
    <MemoryRouter initialEntries={[`/article/${id}`]}>
      <Routes>
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ArticlePage', () => {
  it('renders the full OpenClaw 2.0 article content', () => {
    renderArticlePage('openclaw-2-0')

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'OpenClaw 2.0 Just Dropped and It Is a Massive Upgrade',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: '1. Setup Stops Interrogating You' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Should You Update?' })).toBeInTheDocument()
    expect(screen.getByText('Fresh OpenAI setups default to GPT-5.6.')).toBeInTheDocument()
  })

  it('shows an excerpt-only fallback for articles without full content', () => {
    renderArticlePage('react-hooks-2026')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Mastering React Hooks in 2026' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/hooks stopped being the new thing/i)).toBeInTheDocument()
    expect(screen.getByText(/full article isn't available yet/i)).toBeInTheDocument()
  })

  it('shows the Member-only story badge and tag pills for a member-only article', () => {
    renderArticlePage('openclaw-2-0')

    expect(screen.getByText('Member-only story')).toBeInTheDocument()
    ;['AI', 'Openclaw', 'AI Agent', 'Technology', 'Automation'].forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })

  it('does not show the Member-only badge for articles that are not member-only', () => {
    renderArticlePage('react-hooks-2026')

    expect(screen.queryByText('Member-only story')).not.toBeInTheDocument()
  })

  it('shows a not-found state for an unknown article id', () => {
    renderArticlePage('does-not-exist')

    expect(screen.getByRole('heading', { level: 1, name: 'Article not found' })).toBeInTheDocument()
  })

  it('has a link back to Home', () => {
    renderArticlePage('openclaw-2-0')

    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/')
  })
})
