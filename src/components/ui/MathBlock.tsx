import katex from 'katex'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type KatexOptions = {
  displayMode: boolean
}

function renderKatex(el: HTMLElement, tex: string, { displayMode }: KatexOptions) {
  el.innerHTML = ''
  katex.render(tex, el, {
    displayMode,
    throwOnError: false,
    strict: 'ignore',
    trust: false,
    output: 'html',
  })
}

export function MathBlock({ tex, className }: { tex: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    try {
      renderKatex(el, tex, { displayMode: true })
    } catch {
      el.textContent = tex
    }
  }, [tex])

  return (
    <div
      className={cn(
        'math-block scroll-x-card my-4 max-w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center',
        className,
      )}
    >
      <div ref={containerRef} className="katex-display" />
    </div>
  )
}

export function MathInline({ tex, className }: { tex: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    try {
      renderKatex(el, tex, { displayMode: false })
    } catch {
      el.textContent = tex
    }
  }, [tex])

  return <span ref={containerRef} className={cn('katex-inline', className)} />
}
