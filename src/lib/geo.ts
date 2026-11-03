export function insideRing(lng: number, lat: number, ring: number[][]): boolean {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

export function centroidOf(geometry: { type: string; coordinates: number[][][] | number[][][][] }): [number, number] {
  const polys = geometry.type === "Polygon" ? [geometry.coordinates as number[][][]] : (geometry.coordinates as number[][][][])
  let x = 0
  let y = 0
  let n = 0
  for (const poly of polys) {
    for (const point of poly[0]) {
      x += point[0]
      y += point[1]
      n += 1
    }
  }
  return n ? [x / n, y / n] : [0, 0]
}

export function contains(geometry: { type: string; coordinates: number[][][] | number[][][][] }, lng: number, lat: number): boolean {
  const polys = geometry.type === "Polygon" ? [geometry.coordinates as number[][][]] : (geometry.coordinates as number[][][][])
  return polys.some((poly) => insideRing(lng, lat, poly[0]))
}
