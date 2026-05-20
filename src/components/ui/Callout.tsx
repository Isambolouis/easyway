import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type Variant = 'definition' | 'important' | 'resume'

const styles: Record<Variant, string> = {
  definition: 'border-teal bg-teal-50/80',
  important: 'border-coral bg-orange-50/80',
  resume: 'border-deep bg-blue-50/80',
}

const titles: Record<Variant, string> = {
  definition: 'Définition',
  important: 'À retenir',
  resume: 'Résumé',
}

export function Callout({
  variant = 'definition',
  title,
  children,
  className,
}: {
  variant?: Variant
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn(
        'my-6 rounded-2xl border-l-4 p-4 shadow-sm',
        styles[variant],
        className,
      )}
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-deep">
        {title ?? titles[variant]}
      </p>
      <div className="text-[0.98rem] leading-relaxed text-ink/90">{children}</div>
    </aside>
  )
}
