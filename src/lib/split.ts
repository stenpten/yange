import type { Geom } from "./clip-types"
import { intersectGeom, subtractGeom, unionGeom } from "./clip"
import { UMBRELLA, pieceLabel, type PieceLabel } from "../data/periods"

type AtlasFeature = { type: "Feature"; properties: Record<string, string | number>; geometry: Geom }
type AtlasFC = { type: "FeatureCollection"; features: AtlasFeature[] }

const LAST: Record<string, string> = { "200": "wu", "910": "zhongyuan" }

function combine(a: Geom | null, b: Geom | null): Geom | null {
  if (!a) return b
  if (!b) return a
  return unionGeom(a, b) || a
}

function emit(id: string, geometry: Geom, label: PieceLabel): AtlasFeature {
  return {
    type: "Feature",
    properties: {
      id,
      name: label.en,
      name_zh: label.zh,
      name_en: label.en,
      dossier: label.dossier,
      lock: 1,
      ...(label.chapter ? { chapter: label.chapter } : {}),
    },
    geometry,
  }
}

export function splitChina(world: AtlasFC, china: AtlasFC, file: string, year: number): AtlasFC {
  if (!LAST[file] || !china.features.length) return world
  const umbrellas = world.features.filter((feature) => UMBRELLA.has(String(feature.properties.name || "").toLowerCase()))
  if (!umbrellas.length) return world
  let remaining = umbrellas.reduce<Geom | null>((all, feature) => combine(all, feature.geometry), null)
  if (!remaining) return world
  const taken = new Map<string, Geom>()
  for (const mask of china.features) {
    const id = String(mask.properties.id || "")
    if (!id || id === LAST[file]) continue
    const piece = intersectGeom(remaining, mask.geometry)
    if (!piece || !remaining) continue
    taken.set(id, piece)
    const next = subtractGeom(remaining, mask.geometry)
    if (!next) { remaining = null; break }
    remaining = next
  }
  const restId = LAST[file]
  if (remaining) taken.set(restId, combine(taken.get(restId) || null, remaining) || remaining)
  if (file === "200" && year >= 264 && taken.has("shu") && taken.has("wei")) {
    const merged = combine(taken.get("wei") || null, taken.get("shu") || null)
    if (merged) taken.set("wei", merged)
    taken.delete("shu")
  }
  if (file === "200" && year >= 280 && taken.has("wu") && taken.has("wei")) {
    const merged = combine(taken.get("wei") || null, taken.get("wu") || null)
    if (merged) taken.set("wei", merged)
    taken.delete("wu")
  }
  const pieces: AtlasFeature[] = []
  for (const [id, geometry] of taken) {
    const label = pieceLabel(file, id, year)
    if (!label) continue
    pieces.push(emit(id, geometry, label))
  }
  if (!pieces.length) return world
  const others = world.features.filter((feature) => !UMBRELLA.has(String(feature.properties.name || "").toLowerCase()))
  return { type: "FeatureCollection", features: [...others, ...pieces] }
}
