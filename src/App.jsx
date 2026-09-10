import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from './components/Sidebar'

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

        <main className="flex flex-1 items-center justify-center text-gray-400">
          <p>Main content goes here</p>
        </main>
      </div>
    </div>
  )
}

export default App
