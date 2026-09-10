import {
  Bell,
  PenSquare,
  Home,
  BookMarked,
  User,
  Newspaper,
  BarChart2,
  Users,
  ChevronDown,
  Search,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PUBLICATIONS as FOLLOWING } from '../data/searchIndex'

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home, end: true },
  { label: 'Library', path: '/library', icon: BookMarked },
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Stories', path: '/stories', icon: Newspaper },
  { label: 'Stats', path: '/stats', icon: BarChart2 },
  { label: 'Following', path: '/following', icon: Users },
]

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'MLGuy started following you', time: '2h ago', read: false },
  { id: 2, title: 'Your story was mentioned in Generative AI', time: '5h ago', read: false },
  { id: 3, title: 'Towards AI published a new story you might like', time: '1d ago', read: true },
]

const FOOTER_LINKS = [
  'Help',
  'Status',
  'About',
  'Careers',
  'Press',
  'Blog',
  'Store',
  'Privacy',
  'Rules',
  'Terms',
  'Text to speech',
]

const AVATAR_COLORS = [
  'bg-rose-200 text-rose-800',
  'bg-amber-200 text-amber-800',
  'bg-emerald-200 text-emerald-800',
  'bg-sky-200 text-sky-800',
  'bg-violet-200 text-violet-800',
  'bg-fuchsia-200 text-fuchsia-800',
]

function Avatar({ name, index }) {
  const initial = name.trim().charAt(0).toUpperCase()
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${color}`}
      aria-hidden="true"
    >
      {initial}
    </span>
  )
}

export default function Sidebar({
  userName = 'Dan Dickinson',
  isOpen = false,
  onClose = () => {},
}) {
  const [showAllFollowing, setShowAllFollowing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const visibleFollowing = showAllFollowing ? FOLLOWING : FOLLOWING.slice(0, 6)
  const navigate = useNavigate()
  const notificationsRef = useRef(null)
  const unreadCount = notifications.filter((notification) => !notification.read).length

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const trimmed = searchQuery.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    onClose()
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  useEffect(() => {
    if (!isNotificationsOpen) return undefined

    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNotificationsOpen])

  return (
    <>
      {/* Backdrop, mobile only, shown while the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-64 shrink-0 flex-col border-r border-gray-200 bg-white text-sm text-gray-800 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Search */}
        <form role="search" onSubmit={handleSearchSubmit} className="px-5 pt-6">
          <label htmlFor="sidebar-search" className="sr-only">
            Search
          </label>
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-gray-500 focus-within:ring-2 focus-within:ring-gray-300">
            <Search size={16} className="shrink-0" />
            <input
              id="sidebar-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none"
            />
          </div>
        </form>

        {/* Top actions */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <NavLink
            to="/write"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors ${
                isActive ? 'font-medium text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`
            }
          >
            <PenSquare size={18} />
            <span>Write</span>
          </NavLink>
          <div className="flex items-center gap-1">
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                aria-label="Notifications"
                aria-haspopup="true"
                aria-expanded={isNotificationsOpen}
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white"
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div
                  role="region"
                  aria-label="Notifications"
                  className="absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                >
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-sm font-semibold text-gray-900">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <p className="px-2 py-4 text-sm text-gray-500">You're all caught up.</p>
                  ) : (
                    <ul className="mt-1 flex flex-col">
                      {notifications.map((notification) => (
                        <li key={notification.id}>
                          <button
                            type="button"
                            onClick={() => markAsRead(notification.id)}
                            className={`flex w-full flex-col items-start gap-0.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-gray-50 ${
                              notification.read ? 'text-gray-500' : 'text-gray-900'
                            }`}
                          >
                            <span className="flex items-center gap-2 text-sm">
                              {!notification.read && (
                                <span
                                  aria-hidden="true"
                                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                                />
                              )}
                              {notification.title}
                            </span>
                            <span className="text-xs text-gray-400">{notification.time}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
            {userName.charAt(0)}
          </span>
          <span className="font-medium text-gray-900">{userName}</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col px-2">
          {NAV_ITEMS.map(({ label, path, icon: Icon, end }) => (
            <NavLink
              key={label}
              to={path}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                  isActive
                    ? 'bg-gray-100 font-medium text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mx-5 my-3 border-t border-gray-200" />

        {/* Following */}
        <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-4">
          <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-400 uppercase">
            Following
          </h3>
          <ul className="flex flex-col gap-3">
            {visibleFollowing.map((name, index) => (
              <li key={name}>
                <a
                  href="#"
                  onClick={onClose}
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
                >
                  <Avatar name={name} index={index} />
                  <span className="truncate">{name}</span>
                </a>
              </li>
            ))}
          </ul>

          {FOLLOWING.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAllFollowing((prev) => !prev)}
              className="mt-4 flex items-center gap-1 text-gray-500 hover:text-gray-900"
            >
              <span>{showAllFollowing ? 'Less' : 'More'}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${showAllFollowing ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
          <nav className="flex flex-wrap gap-x-2 gap-y-1">
            {FOOTER_LINKS.map((link) => (
              <a key={link} href="#" className="hover:text-gray-600 hover:underline">
                {link}
              </a>
            ))}
          </nav>
        </footer>
      </aside>
    </>
  )
}
