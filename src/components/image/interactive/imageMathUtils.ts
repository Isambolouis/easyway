export function euclideanDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

export function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

export function chessboardDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2))
}

export function discreteGradient(
  grid: number[][],
  m: number,
  n: number,
): { gx: number; gy: number; mag: number; theta: number } {
  const h = grid.length
  const w = grid[0]?.length ?? 0
  const left = n > 0 ? grid[m][n - 1] : grid[m][n]
  const right = n < w - 1 ? grid[m][n + 1] : grid[m][n]
  const up = m > 0 ? grid[m - 1][n] : grid[m][n]
  const down = m < h - 1 ? grid[m + 1][n] : grid[m][n]
  const gx = right - left
  const gy = down - up
  const mag = Math.sqrt(gx * gx + gy * gy)
  const theta = Math.atan2(gy, gx) * (180 / Math.PI)
  return { gx, gy, mag, theta }
}
