export type ClassDefinition = {
  lower: number
  upper: number
  label?: string
}

export type GroupedClassRow = {
  label: string
  lower: number
  upper: number
  effectif: number
  amplitude: number
  centre: number
  frequence: number
  frequenceCumulee: number
  densite: number
}

/** Compte les valeurs dans [lower, upper[ (borne supérieure exclue). */
export function countInClass(values: number[], lower: number, upper: number): number {
  return values.filter((v) => v >= lower && v < upper).length
}

export function buildGroupedSeries(values: number[], classDefs: ClassDefinition[]): GroupedClassRow[] {
  const N = values.length
  if (N === 0) return []

  let cum = 0
  return classDefs.map((def) => {
    const effectif = countInClass(values, def.lower, def.upper)
    const amplitude = def.upper - def.lower
    const centre = (def.lower + def.upper) / 2
    const frequence = effectif / N
    cum += frequence
    const label = def.label ?? `${def.lower} – ${def.upper - 1}`
    return {
      label,
      lower: def.lower,
      upper: def.upper,
      effectif,
      amplitude,
      centre,
      frequence,
      frequenceCumulee: cum,
      densite: amplitude > 0 ? effectif / amplitude : 0,
    }
  })
}

export function meanFromGrouped(rows: GroupedClassRow[]): number {
  const N = rows.reduce((s, r) => s + r.effectif, 0)
  if (N === 0) return 0
  return rows.reduce((s, r) => s + r.centre * r.effectif, 0) / N
}
