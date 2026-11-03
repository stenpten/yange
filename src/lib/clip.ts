import polygonClipping from "polygon-clipping"
import type { Geom } from "./clip-types"

type Ring = number[][]
type Poly = Ring[]
type Multi = Poly[]

function toMulti(geometry: Geom): Multi {
  if (geometry.type === "Polygon") return [geometry.coordinates as Poly]
  return geometry.coordinates as Multi
}

function fromMulti(multi: Multi): Geom | null {
  const polys = multi.filter((poly) => poly[0] && poly[0].length >= 4)
  if (!polys.length) return null
  if (polys.length === 1) return { type: "Polygon", coordinates: polys[0] }
  return { type: "MultiPolygon", coordinates: polys }
}

export function intersectGeom(a: Geom, b: Geom): Geom | null {
  try {
    return fromMulti(polygonClipping.intersection(toMulti(a) as never, toMulti(b) as never))
  } catch {
    return null
  }
}

export function subtractGeom(a: Geom, b: Geom): Geom | null {
  try {
    return fromMulti(polygonClipping.difference(toMulti(a) as never, toMulti(b) as never))
  } catch {
    return null
  }
}

export function unionGeom(a: Geom, b: Geom): Geom | null {
  try {
    return fromMulti(polygonClipping.union(toMulti(a) as never, toMulti(b) as never))
  } catch {
    return null
  }
}
