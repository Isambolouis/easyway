import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Figure({
  children,
  caption,
  className,
}: {
  children: ReactNode
  caption: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        'my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-md',
        className,
      )}
    >
      {children}
      <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  )
}
