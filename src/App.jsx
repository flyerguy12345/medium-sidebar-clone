import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import ProfilePage from './pages/ProfilePage'
import StoriesPage from './pages/StoriesPage'
import StatsPage from './pages/StatsPage'
import FollowingPage from './pages/FollowingPage'
import SearchPage from './pages/SearchPage'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <Menu size={20} />
          </button>
          <span className="font-medium text-gray-900">Medium</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
