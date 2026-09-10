import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

function renderApp(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  it('renders the Home page at the root route', () => {
    renderApp('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeInTheDocument()
  })

  it.each([
    ['/library', 'Library'],
    ['/profile', 'Profile'],
    ['/stories', 'Stories'],
    ['/stats', 'Stats'],
    ['/following', 'Following'],
  ])('renders the %s page at %s', (route, heading) => {
    const { unmount } = renderApp(route)

    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()

    unmount()
  })

  it('redirects unknown routes back to Home', () => {
    renderApp('/does-not-exist')

    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeInTheDocument()
  })

  it('navigates to a new page when a sidebar nav link is clicked', async () => {
    const user = userEvent.setup()
    renderApp('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /^Stats$/ }))

    expect(screen.getByRole('heading', { level: 1, name: 'Stats' })).toBeInTheDocument()
  })

  it('opens the mobile sidebar via the header menu button', async () => {
    const user = userEvent.setup()
    const { container } = renderApp('/')

    expect(container.querySelector('.bg-black\\/40')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /open sidebar/i }))

    expect(container.querySelector('.bg-black\\/40')).toBeInTheDocument()
  })

  it('closes the mobile sidebar again after navigating', async () => {
    const user = userEvent.setup()
    const { container } = renderApp('/')

    await user.click(screen.getByRole('button', { name: /open sidebar/i }))
    expect(container.querySelector('.bg-black\\/40')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /^Profile$/ }))

    expect(container.querySelector('.bg-black\\/40')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Profile' })).toBeInTheDocument()
  })

  it('navigates to search results when a query is submitted from the sidebar', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.type(screen.getByRole('searchbox'), 'react hooks')
    await user.keyboard('{Enter}')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Results for "react hooks"' }),
    ).toBeInTheDocument()
  })
})
