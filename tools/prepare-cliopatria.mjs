import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const root = "D:/code/codex/history-atlas"
const src = join(root, "data-src/cliopatria_polities_only_v021.geojson")
const outDir = join(root, "public/history/polities")
mkdirSync(outDir, { recursive: true })

const raw = JSON.parse(readFileSync(src, "utf8"))

function dist(p, a, b) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1])
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))
}

function simplifyOpen(points, tol) {
  if (points.length <= 2) return points.slice()
  const keep = new Uint8Array(points.length)
  keep[0] = 1
  keep[points.length - 1] = 1
  const stack = [[0, points.length - 1]]
  while (stack.length) {
    const [start, end] = stack.pop()
    let max = 0
    let idx = -1
    for (let i = start + 1; i < end; i++) {
      const d = dist(points[i], points[start], points[end])
      if (d > max) { max = d; idx = i }
    }
    if (idx !== -1 && max > tol) {
      keep[idx] = 1
      stack.push([start, idx], [idx, end])
    }
  }
  const out = []
  for (let i = 0; i < points.length; i++) if (keep[i]) out.push(points[i])
  return out
}

function ringArea(ring) {
  let a = 0
  for (let i = 0; i < ring.length - 1; i++) a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]
  return Math.abs(a / 2)
}

function simplifyRing(ring, tol) {
  if (!ring || ring.length < 4) return null
  const same = (p, q) => p[0] === q[0] && p[1] === q[1]
  const closed = same(ring[0], ring[ring.length - 1])
  const open = (closed ? ring.slice(0, -1) : ring.slice()).map((p) => [p[0], p[1]])
  if (open.length < 3) return null
  const simplified = simplifyOpen(open, tol)
  const rounded = []
  for (const [x, y] of simplified) {
    const p = [Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000]
    const prev = rounded[rounded.length - 1]
    if (!prev || prev[0] !== p[0] || prev[1] !== p[1]) rounded.push(p)
  }
  if (rounded.length < 3) return null
  rounded.push(rounded[0])
  if (rounded.length < 4 || ringArea(rounded) < 0.004) return null
  return rounded
}

function tolerance(area) {
  if (area > 5000000) return 0.08
  if (area > 1500000) return 0.045
  if (area > 300000) return 0.025
  if (area > 50000) return 0.015
  return 0.008
}

function simplifyGeom(geometry, tol) {
  if (!geometry) return null
  if (geometry.type === "Polygon") {
    const rings = geometry.coordinates.map((ring) => simplifyRing(ring, tol)).filter(Boolean)
    if (!rings.length) return null
    return { type: "Polygon", coordinates: rings }
  }
  if (geometry.type === "MultiPolygon") {
    const polys = []
    for (const poly of geometry.coordinates) {
      const rings = poly.map((ring) => simplifyRing(ring, tol)).filter(Boolean)
      if (rings.length) polys.push(rings)
    }
    if (!polys.length) return null
    if (polys.length === 1) return { type: "Polygon", coordinates: polys[0] }
    return { type: "MultiPolygon", coordinates: polys }
  }
  return null
}

function slug(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "unnamed"
}

function centroid(ring) {
  let x = 0
  let y = 0
  let n = 0
  const last = ring.length - 1
  const end = ring[0][0] === ring[last][0] && ring[0][1] === ring[last][1] ? last : ring.length
  for (let i = 0; i < end; i++) { x += ring[i][0]; y += ring[i][1]; n++ }
  return n ? [x / n, y / n] : [0, 0]
}

function inTaiwan(lng, lat) {
  if (lng >= 119.95 && lng <= 122.08 && lat >= 21.88 && lat <= 25.38) return true
  if (lng >= 119.25 && lng <= 119.75 && lat >= 23.15 && lat <= 23.85) return true
  return false
}

function polygonsOf(geometry) {
  if (geometry.type === "Polygon") return [geometry.coordinates]
  return geometry.coordinates
}

function geomFrom(polys) {
  if (!polys.length) return null
  if (polys.length === 1) return { type: "Polygon", coordinates: polys[0] }
  return { type: "MultiPolygon", coordinates: polys }
}

function splitTaiwan(feature) {
  const polys = polygonsOf(feature.geometry)
  const home = []
  const island = []
  for (const poly of polys) {
    const [lng, lat] = centroid(poly[0])
    if (inTaiwan(lng, lat)) island.push(poly)
    else home.push(poly)
  }
  const out = []
  const homeGeom = geomFrom(home)
  if (homeGeom) out.push({ ...feature, geometry: homeGeom })
  const islandGeom = geomFrom(island)
  if (islandGeom) {
    out.push({
      ...feature,
      properties: { ...feature.properties, id: "china-taiwan", name: "Chinese Taiwan" },
      geometry: islandGeom,
    })
  }
  return out
}

function keepName(name, type) {
  if (type === "RELATION") return false
  if (name.startsWith("(")) return false
  return true
}

const kept = []
let dropped = 0
for (const feature of raw.features) {
  const p = feature.properties || {}
  const name = String(p.Name || "")
  if (!keepName(name, p.Type)) { dropped++; continue }
  let from = Number(p.FromYear)
  let to = Number(p.ToYear)
  if (!Number.isFinite(from) || !Number.isFinite(to) || to < from) { dropped++; continue }
  if (name === "Great Yuan" || name === "Yuan Dynasty") {
    from = Math.max(from, 1206)
    to = Math.min(to, 1388)
    if (to < from) { dropped++; continue }
  }
  const area = Number(p.Area) || 0
  const geometry = simplifyGeom(feature.geometry, tolerance(area))
  if (!geometry) { dropped++; continue }
  const base = {
    type: "Feature",
    properties: {
      id: slug(name),
      name,
      from,
      to,
      precise: 1,
      area: Math.round(area),
    },
    geometry,
  }
  for (const piece of splitTaiwan(base)) kept.push(piece)
}

const buckets = new Map()
for (const feature of kept) {
  const start = Math.floor(feature.properties.from / 100)
  const end = Math.floor(feature.properties.to / 100)
  for (let bucket = start; bucket <= end; bucket++) {
    if (!buckets.has(bucket)) buckets.set(bucket, [])
    buckets.get(bucket).push(feature)
  }
}

let bytes = 0
const ids = [...buckets.keys()].sort((a, b) => a - b)
for (const id of ids) {
  const text = JSON.stringify({ type: "FeatureCollection", features: buckets.get(id) })
  bytes += text.length
  writeFileSync(join(outDir, `${id}.geojson`), text)
}
const years = kept.flatMap((feature) => [feature.properties.from, feature.properties.to])
const index = {
  min: Math.min(...years),
  max: Math.max(...years),
  source: "Seshat Cliopatria v0.2.1",
  license: "CC BY 4.0",
  buckets: ids,
}
writeFileSync(join(outDir, "index.json"), JSON.stringify(index))

function namesAt(year) {
  return kept.filter((feature) => feature.properties.from <= year && year <= feature.properties.to).map((feature) => feature.properties.name)
}
for (const year of [221, 250, 280, 750, 910, 950, 1150, 1644, 1940, 2020]) {
  const names = namesAt(year)
  console.log(year, names.length, names.filter((name) => /wei|shu|wu|tang|liang|jin|song|liao|goguryeo|uyghur|abbasid|roman|ming|qing|china|taiwan/i.test(name)).slice(0, 24).join(", "))
}
console.log({ kept: kept.length, dropped, files: ids.length, megabytes: (bytes / 1048576).toFixed(1), min: index.min, max: index.max })

console.log("labels: tools/fetch-zh.mjs")
