import { useState, type ReactNode } from 'react'
import { Header } from './Header'
import { ProgressBar } from './ProgressBar'
import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <ProgressBar />
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="mx-auto flex max-w-7xl">
        <aside
          className={cn(
            'no-print fixed inset-y-0 left-0 z-40 w-72 translate-x-0 border-r border-slate-200 bg-white pt-16 transition-transform lg:static lg:block lg:translate-x-0 lg:pt-4',
            sidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0',
          )}
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>
        {sidebarOpen && (
          <button
            type="button"
            className="no-print fixed inset-0 z-30 bg-black/30 lg:hidden"
            aria-label="Fermer le menu"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="min-w-0 flex-1 px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
