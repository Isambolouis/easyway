export type DistributionRow = {
  value: number
  effectif: number
  frequence: number
  frequenceCumulee: number
}

/** Tableau effectifs / fréquences / fréquences cumulées (valeurs triées). */
export function buildDistribution(values: number[]): DistributionRow[] {
  if (values.length === 0) return []
  const counts = new Map<number, number>()
  values.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1))
  const N = values.length
  let cum = 0
  return [...counts.entries()]
    .sort(([a], [b]) => a - b)
    .map(([value, effectif]) => {
      const frequence = effectif / N
      cum += frequence
      return { value, effectif, frequence, frequenceCumulee: cum }
    })
}

export function distributionTotalEffectif(rows: DistributionRow[]): number {
  return rows.reduce((s, r) => s + r.effectif, 0)
}

export function frequencySum(rows: DistributionRow[]): number {
  return rows.reduce((s, r) => s + r.frequence, 0)
}
