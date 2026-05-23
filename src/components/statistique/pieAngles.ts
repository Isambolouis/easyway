/** Angles en degrés pour un diagramme circulaire : (nᵢ / N) × 360° */
export function pieSliceAngles(items: { name: string; value: number }[]) {
  const N = items.reduce((s, i) => s + i.value, 0)
  if (N === 0) return []
  return items.map((item) => ({
    name: item.name,
    effectif: item.value,
    part: item.value / N,
    angleDeg: (item.value / N) * 360,
  }))
}
