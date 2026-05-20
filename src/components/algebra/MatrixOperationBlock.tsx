import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'

type MatrixOperationBlockProps = {
  step: string
  title: string
  definition: string
  tex?: string[]
  python: string
  utility?: string
  warning?: string
}

export function MatrixOperationBlock({
  step,
  title,
  definition,
  tex = [],
  python,
  utility,
  warning,
}: MatrixOperationBlockProps) {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-violet-600">{step}</p>
      <h4 className="mt-1 text-lg font-bold text-deep">{title}</h4>
      <p className="mt-2 text-sm text-muted">{definition}</p>
      {tex.map((t) => (
        <MathBlock key={t} tex={t} className="!my-2" />
      ))}
      {warning && (
        <Callout variant="important" title="Condition" className="mt-3">
          {warning}
        </Callout>
      )}
      {utility && (
        <Callout variant="definition" title="Utilité" className="mt-3">
          {utility}
        </Callout>
      )}
      <Accordion title="Code Python (NumPy)" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{python}</pre>
      </Accordion>
    </section>
  )
}
