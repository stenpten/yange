export function bucketFor(year: number): number {
  return Math.floor(year / 100)
}

export type Ranged = { properties: { from?: string | number; to?: string | number } }

export function activeFeatures<T extends Ranged>(features: T[], year: number): T[] {
  return features.filter((feature) => {
    const from = Number(feature.properties.from)
    const to = Number(feature.properties.to)
    return Number.isFinite(from) && Number.isFinite(to) && from <= year && year <= to
  })
}
