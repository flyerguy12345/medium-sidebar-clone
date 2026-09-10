import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from './Sidebar'

const NAV_LABELS = ['Home', 'Library', 'Profile', 'Stories', 'Stats', 'Following']

function renderSidebar(props = {}, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Sidebar {...props} />
    </MemoryRouter>,
  )
}

describe('Sidebar', () => {
  it('renders the user name and all primary navigation items', () => {
    renderSidebar()

    expect(screen.getByText('Dan Dickinson')).toBeInTheDocument()
    NAV_LABELS.forEach((label) => {
      expect(screen.getByRole('link', { name: new RegExp(`^${label}$`) })).toBeInTheDocument()
    })
  })

  it('accepts a custom user name and shows its initial in the avatar', () => {
    renderSidebar({ userName: 'Ada Lovelace' })

    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('marks the nav item matching the current route as active', () => {
    renderSidebar({}, { route: '/stats' })

    expect(screen.getByRole('link', { name: /^Stats$/ })).toHaveClass('bg-gray-100')
    expect(screen.getByRole('link', { name: /^Home$/ })).not.toHaveClass('bg-gray-100')
  })

  it('only marks Home active on the exact root route, not on nested paths', () => {
    renderSidebar({}, { route: '/library' })

    expect(screen.getByRole('link', { name: /^Home$/ })).not.toHaveClass('bg-gray-100')
    expect(screen.getByRole('link', { name: /^Library$/ })).toHaveClass('bg-gray-100')
  })

  it('calls onClose when a nav link is clicked, to auto-close on mobile', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderSidebar({ onClose })

    await user.click(screen.getByRole('link', { name: /^Library$/ }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders the write link and notifications button', () => {
    renderSidebar()

    expect(screen.getByRole('link', { name: /write/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^notifications$/i })).toBeInTheDocument()
  })

  it('navigates to /write and closes on mobile when the write link is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderSidebar({ onClose })

    await user.click(screen.getByRole('link', { name: /write/i }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('shows an unread count badge and toggles the notifications panel', async () => {
    const user = userEvent.setup()
    renderSidebar()

    const bellButton = screen.getByRole('button', { name: /^notifications$/i })
    expect(within(bellButton).getByText('2')).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: /notifications/i })).not.toBeInTheDocument()

    await user.click(bellButton)

    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument()
    expect(screen.getByText('MLGuy started following you')).toBeInTheDocument()

    await user.click(bellButton)

    expect(screen.queryByRole('region', { name: /notifications/i })).not.toBeInTheDocument()
  })

  it('marks a single notification as read when clicked', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('button', { name: /^notifications$/i }))
    await user.click(screen.getByText('MLGuy started following you'))

    const bellButton = screen.getByRole('button', { name: /^notifications$/i })
    expect(within(bellButton).getByText('1')).toBeInTheDocument()
  })

  it('marks all notifications as read and clears the badge', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('button', { name: /^notifications$/i }))
    await user.click(screen.getByRole('button', { name: /mark all as read/i }))

    expect(screen.queryByRole('button', { name: /mark all as read/i })).not.toBeInTheDocument()
    const bellButton = screen.getByRole('button', { name: /^notifications$/i })
    expect(within(bellButton).queryByText('2')).not.toBeInTheDocument()
  })

  it('closes the notifications panel when clicking outside', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('button', { name: /^notifications$/i }))
    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument()

    await user.click(document.body)

    expect(screen.queryByRole('region', { name: /notifications/i })).not.toBeInTheDocument()
  })

  it('shows the mobile backdrop only when open, and closes on backdrop click', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    const { container, rerender } = renderSidebar({ isOpen: false, onClose })

    expect(container.querySelector('.bg-black\\/40')).not.toBeInTheDocument()

    rerender(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar isOpen onClose={onClose} />
      </MemoryRouter>,
    )

    const backdrop = container.querySelector('.bg-black\\/40')
    expect(backdrop).toBeInTheDocument()

    await user.click(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes via the in-sidebar close button', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderSidebar({ isOpen: true, onClose })

    await user.click(screen.getByRole('button', { name: /close sidebar/i }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('shows only the first 6 following entries by default, then expands on "More"', async () => {
    const user = userEvent.setup()
    renderSidebar()

    expect(screen.getByText('Sensual: An Erotic Life')).toBeInTheDocument()
    expect(screen.getByText('Data Science Collective')).toBeInTheDocument()
    expect(screen.queryByText('AI Advances')).not.toBeInTheDocument()
    expect(screen.queryByText('MLGuy')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^More$/ }))

    expect(screen.getByText('AI Advances')).toBeInTheDocument()
    expect(screen.getByText('MLGuy')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Less$/ })).toBeInTheDocument()
  })

  it('calls onClose when a following link is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderSidebar({ onClose })

    await user.click(screen.getByText('Generative AI'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders a search input at the top of the sidebar', () => {
    renderSidebar()

    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('does not navigate on submit when the search field is empty', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('searchbox'))
    await user.keyboard('{Enter}')

    expect(screen.getByRole('searchbox')).toHaveValue('')
  })

  it('navigates to the search results route and closes on submit', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderSidebar({ onClose })

    await user.type(screen.getByRole('searchbox'), 'react hooks')
    await user.keyboard('{Enter}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
