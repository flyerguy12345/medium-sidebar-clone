import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'
import { STORIES } from '../data/searchIndex'

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('renders the feed heading', () => {
    renderHomePage()

    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeInTheDocument()
  })

  it('renders every story as a feed item linking to its article page', () => {
    renderHomePage()

    STORIES.forEach((story) => {
      const heading = screen.getByRole('heading', { level: 2, name: story.title })
      const link = heading.closest('a')
      expect(link).toHaveAttribute('href', `/article/${story.id}`)
    })
  })

  it('shows story metadata for each feed item', () => {
    renderHomePage()

    expect(screen.getByText('No Time · Pranit naik')).toBeInTheDocument()
    expect(screen.getByText('228')).toBeInTheDocument()
  })
})
