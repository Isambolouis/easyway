import { useScrollProgress } from '@/hooks/useScrollProgress'
import { motion } from 'framer-motion'

export function ProgressBar() {
  const progress = useScrollProgress()

  return (
    <div className="no-print fixed inset-x-0 top-0 z-[60] h-1 bg-slate-200/80 dark:bg-[var(--color-border)]">
      <motion.div
        className="h-full bg-gradient-to-r from-teal to-deep"
        style={{ width: `${progress}%` }}
        layout
      />
    </div>
  )
}
