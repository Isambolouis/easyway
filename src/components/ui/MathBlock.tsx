import { BlockMath, InlineMath } from 'react-katex'
import { cn } from '@/lib/utils'

export function MathBlock({ tex, className }: { tex: string; className?: string }) {
  return (
    <div
      className={cn(
        'my-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center',
        className,
      )}
    >
      <BlockMath math={tex} />
    </div>
  )
}

export function MathInline({ tex }: { tex: string }) {
  return <InlineMath math={tex} />
}
