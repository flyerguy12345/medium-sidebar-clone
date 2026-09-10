import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('shows an author profile section with a Follow button', () => {
    renderArticlePage('openclaw-2-0')

    expect(screen.getByText('Written by Pranit naik')).toBeInTheDocument()
    expect(screen.getByText('No Time')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Follow$/ })).toBeInTheDocument()
  })

  it('toggles the Follow button to Following and back when clicked', async () => {
    const user = userEvent.setup()
    renderArticlePage('openclaw-2-0')

    const followButton = screen.getByRole('button', { name: /^Follow$/ })
    expect(followButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(followButton)

    const followingButton = screen.getByRole('button', { name: /^Following$/ })
    expect(followingButton).toHaveAttribute('aria-pressed', 'true')

    await user.click(followingButton)

    expect(screen.getByRole('button', { name: /^Follow$/ })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })
})
