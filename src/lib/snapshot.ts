export function snapshotFor(year: number, snapshots: number[]): number {
  if (!snapshots.length) return year
  let chosen = snapshots[0]
  for (const snap of snapshots) {
    if (snap <= year) chosen = snap
    else break
  }
  return chosen
}

export type ChinaSpan = { file: string; from: number; to: number }

export function chinaFileFor(year: number, spans: ChinaSpan[]): string | null {
  const span = spans.find((item) => year >= item.from && year <= item.to)
  return span ? span.file : null
}

const pivot = -500

export function yearToRatio(year: number, min: number, max: number): number {
  if (max === min) return 0
  if (min >= pivot) return (year - min) / (max - min)
  if (year <= pivot) return ((year - min) / (pivot - min)) * 0.18
  return 0.18 + ((year - pivot) / (max - pivot)) * 0.82
}

export function ratioToYear(ratio: number, min: number, max: number): number {
  const clamped = Math.min(1, Math.max(0, ratio))
  if (max === min) return min
  if (min >= pivot) return Math.round(min + clamped * (max - min))
  if (clamped <= 0.18) return Math.round(min + (clamped / 0.18) * (pivot - min))
  return Math.round(pivot + ((clamped - 0.18) / 0.82) * (max - pivot))
}
