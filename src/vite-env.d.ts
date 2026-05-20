/// <reference types="vite/client" />

declare module 'react-katex' {
  import type { ReactNode } from 'react'
  export function BlockMath(props: { math: string; children?: ReactNode }): ReactNode
  export function InlineMath(props: { math: string }): ReactNode
}
