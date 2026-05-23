import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg border transition',
        'border-slate-200 bg-slate-50 text-deep hover:bg-slate-100',
        'dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink)] dark:hover:bg-[var(--color-card-hover)]',
        className,
      )}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  )
}
