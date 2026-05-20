export type ViewBounds = {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

export type FunctionGraphPreset = {
  id: string
  tex: string
  fn: (x: number) => number | null
  defaultView: ViewBounds
  /** Limite optionnelle du tracé (ex. x ≥ 0 pour √x) */
  xDomain?: [number, number]
}

export const graphPresets = {
  'x-plus-2': {
    id: 'x-plus-2',
    tex: 'y=x+2',
    fn: (x: number) => x + 2,
    defaultView: { xMin: -6, xMax: 6, yMin: -2, yMax: 10 },
  },
  'x-plus-1': {
    id: 'x-plus-1',
    tex: 'y=x+1',
    fn: (x: number) => x + 1,
    defaultView: { xMin: -5, xMax: 5, yMin: -2, yMax: 8 },
  },
  '2x-plus-1': {
    id: '2x-plus-1',
    tex: 'y=2x+1',
    fn: (x: number) => 2 * x + 1,
    defaultView: { xMin: -4, xMax: 4, yMin: -4, yMax: 12 },
  },
  constant5: {
    id: 'constant5',
    tex: 'y=5',
    fn: () => 5,
    defaultView: { xMin: -6, xMax: 6, yMin: 0, yMax: 10 },
  },
  '3x': {
    id: '3x',
    tex: 'y=3x',
    fn: (x: number) => 3 * x,
    defaultView: { xMin: -4, xMax: 4, yMin: -8, yMax: 8 },
  },
  x: {
    id: 'x',
    tex: 'y=x',
    fn: (x: number) => x,
    defaultView: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
  },
  'x-squared': {
    id: 'x-squared',
    tex: 'y=x^2',
    fn: (x: number) => x * x,
    defaultView: { xMin: -6, xMax: 6, yMin: -1, yMax: 10 },
  },
  'x-squared-minus-4': {
    id: 'x-squared-minus-4',
    tex: 'y=x^2-4',
    fn: (x: number) => x * x - 4,
    defaultView: { xMin: -5, xMax: 5, yMin: -6, yMax: 8 },
  },
  sqrt: {
    id: 'sqrt',
    tex: 'y=\\sqrt{x}',
    fn: (x: number) => (x < 0 ? null : Math.sqrt(x)),
    defaultView: { xMin: -1, xMax: 10, yMin: -1, yMax: 5 },
    xDomain: [0, 10],
  },
  abs: {
    id: 'abs',
    tex: 'y=|x|',
    fn: (x: number) => Math.abs(x),
    defaultView: { xMin: -6, xMax: 6, yMin: -1, yMax: 8 },
  },
  inverse: {
    id: 'inverse',
    tex: 'y=\\frac{1}{x}',
    fn: (x: number) => (Math.abs(x) < 1e-6 ? null : 1 / x),
    defaultView: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
  },
  exp: {
    id: 'exp',
    tex: 'y=e^x',
    fn: (x: number) => Math.exp(x),
    defaultView: { xMin: -3, xMax: 3, yMin: -1, yMax: 10 },
  },
  ln: {
    id: 'ln',
    tex: 'y=\\ln(x)',
    fn: (x: number) => (x <= 0 ? null : Math.log(x)),
    defaultView: { xMin: -1, xMax: 6, yMin: -3, yMax: 3 },
    xDomain: [0.05, 6],
  },
  sin: {
    id: 'sin',
    tex: 'y=\\sin(x)',
    fn: (x: number) => Math.sin(x),
    defaultView: { xMin: -6.5, xMax: 6.5, yMin: -1.5, yMax: 1.5 },
  },
  cos: {
    id: 'cos',
    tex: 'y=\\cos(x)',
    fn: (x: number) => Math.cos(x),
    defaultView: { xMin: -6.5, xMax: 6.5, yMin: -1.5, yMax: 1.5 },
  },
  'x-cubed': {
    id: 'x-cubed',
    tex: 'y=x^3',
    fn: (x: number) => x * x * x,
    defaultView: { xMin: -3, xMax: 3, yMin: -10, yMax: 10 },
  },
  'neg-x': {
    id: 'neg-x',
    tex: 'y=-x',
    fn: (x: number) => -x,
    defaultView: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
  },
  'x-minus-3': {
    id: 'x-minus-3',
    tex: 'y=x-3',
    fn: (x: number) => x - 3,
    defaultView: { xMin: -2, xMax: 8, yMin: -4, yMax: 6 },
  },
  'rational-2-over-x-3': {
    id: 'rational-2-over-x-3',
    tex: 'y=\\frac{2}{x-3}',
    fn: (x: number) => (Math.abs(x - 3) < 1e-6 ? null : 2 / (x - 3)),
    defaultView: { xMin: -2, xMax: 8, yMin: -8, yMax: 8 },
  },
  'sqrt-x-minus-5': {
    id: 'sqrt-x-minus-5',
    tex: 'y=\\sqrt{x-5}',
    fn: (x: number) => (x < 5 ? null : Math.sqrt(x - 5)),
    defaultView: { xMin: 3, xMax: 14, yMin: -1, yMax: 4 },
    xDomain: [5, 14],
  },
  'x-squared-minus-4x-plus-3': {
    id: 'x-squared-minus-4x-plus-3',
    tex: 'y=x^2-4x+3',
    fn: (x: number) => x * x - 4 * x + 3,
    defaultView: { xMin: -1, xMax: 5, yMin: -2, yMax: 6 },
  },
  'x-squared-plus-1': {
    id: 'x-squared-plus-1',
    tex: 'y=x^2+1',
    fn: (x: number) => x * x + 1,
    defaultView: { xMin: -4, xMax: 4, yMin: -1, yMax: 10 },
  },
  'ax2-bx-c': {
    id: 'ax2-bx-c',
    tex: 'y=ax^2+bx+c',
    fn: (x: number) => x * x,
    defaultView: { xMin: -4, xMax: 4, yMin: -1, yMax: 10 },
  },
  'rational-x2-4-over-x-2': {
    id: 'rational-x2-4-over-x-2',
    tex: 'y=\\frac{x^2-4}{x-2}',
    fn: (x: number) => (Math.abs(x - 2) < 1e-6 ? null : (x * x - 4) / (x - 2)),
    defaultView: { xMin: -1, xMax: 5, yMin: -1, yMax: 8 },
  },
} as const satisfies Record<string, FunctionGraphPreset>

export type GraphPresetId = keyof typeof graphPresets
