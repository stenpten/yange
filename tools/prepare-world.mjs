import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

const root = "D:/code/codex/history-atlas"
const srcDir = join(root, "data-src")
const worldDir = join(root, "public/history/world")
mkdirSync(srcDir, { recursive: true })
mkdirSync(worldDir, { recursive: true })

const list = await fetch("https://api.github.com/repos/aourednik/historical-basemaps/contents/geojson?ref=master", {
  headers: { "User-Agent": "yange-atlas", Accept: "application/vnd.github+json" },
}).then((r) => r.json())

const files = list.filter((item) => /^world_.*\.geojson$/.test(item.name))

async function download(url, dest) {
  if (existsSync(dest) && statSync(dest).size > 1000) return
  const res = await fetch(url, { headers: { "User-Agent": "yange-atlas" } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
}

async function pool(items, limit, worker) {
  const queue = items.slice()
  const runners = Array.from({ length: limit }, async () => {
    while (queue.length) await worker(queue.shift())
  })
  await Promise.all(runners)
}

await pool(files, 4, async (item) => {
  process.stdout.write(`get ${item.name}\n`)
  await download(item.download_url, join(srcDir, item.name))
})

const landUrl = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson"
const landDest = join(srcDir, "ne_110m_land.geojson")
process.stdout.write("get land\n")
await download(landUrl, landDest)

function yearOf(name) {
  const bc = name.match(/world_bc(\d+)\.geojson/)
  if (bc) return -Number(bc[1])
  const ce = name.match(/world_(\d+)\.geojson/)
  return Number(ce[1])
}

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
      if (d > max) {
        max = d
        idx = i
      }
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

function simplifyRing(ring, tol) {
  if (!ring || ring.length < 4) return null
  const closed = ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]
  const open = closed ? ring.slice(0, -1) : ring.slice()
  if (open.length < 3) return null
  const simplified = simplifyOpen(open, tol)
  const rounded = []
  for (const [x, y] of simplified) {
    const p = [Math.round(x * 100) / 100, Math.round(y * 100) / 100]
    const prev = rounded[rounded.length - 1]
    if (!prev || prev[0] !== p[0] || prev[1] !== p[1]) rounded.push(p)
  }
  if (rounded.length < 3) return null
  rounded.push(rounded[0])
  if (rounded.length < 4) return null
  return rounded
}

function ringArea(ring) {
  let a = 0
  for (let i = 0; i < ring.length - 1; i++) a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]
  return Math.abs(a / 2)
}

function slug(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "unnamed"
}

function centroidOf(geometry) {
  const polys = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates
  let x = 0
  let y = 0
  let n = 0
  for (const poly of polys) {
    for (const p of poly[0]) {
      x += p[0]
      y += p[1]
      n++
    }
  }
  return n ? [x / n, y / n] : [0, 0]
}

function simplifyGeometry(geometry, tol) {
  if (geometry.type === "Polygon") {
    const rings = geometry.coordinates.map((ring) => simplifyRing(ring, tol)).filter(Boolean)
    if (!rings.length || ringArea(rings[0]) < 0.04) return null
    return { type: "Polygon", coordinates: rings }
  }
  if (geometry.type === "MultiPolygon") {
    const polys = []
    for (const poly of geometry.coordinates) {
      const rings = poly.map((ring) => simplifyRing(ring, tol)).filter(Boolean)
      if (rings.length && ringArea(rings[0]) >= 0.04) polys.push(rings)
    }
    if (!polys.length) return null
    return { type: "MultiPolygon", coordinates: polys }
  }
  return null
}

function build(raw, tol) {
  const features = []
  for (const feature of raw.features) {
    const name = feature.properties?.NAME
    if (!name || !feature.geometry) continue
    const geometry = simplifyGeometry(feature.geometry, tol)
    if (!geometry) continue
    features.push({
      type: "Feature",
      properties: { id: slug(name), name },
      geometry,
    })
  }
  return { type: "FeatureCollection", features }
}

function fit(raw) {
  const tolerances = [0.12, 0.2, 0.35, 0.55, 0.8, 1.2, 1.8]
  let best = null
  for (const tol of tolerances) {
    let fc = build(raw, tol)
    let text = JSON.stringify(fc)
    if (text.length > 500000) {
      const ranked = fc.features
        .map((feature) => ({ feature, area: feature.geometry.type === "Polygon" ? ringArea(feature.geometry.coordinates[0]) : feature.geometry.coordinates.reduce((sum, poly) => sum + ringArea(poly[0]), 0) }))
        .sort((a, b) => b.area - a.area)
      while (ranked.length > 1 && JSON.stringify({ type: "FeatureCollection", features: ranked.map((item) => item.feature) }).length > 500000) ranked.pop()
      fc = { type: "FeatureCollection", features: ranked.map((item) => item.feature) }
      text = JSON.stringify(fc)
    }
    best = { fc, text, tol }
    if (text.length <= 500000) break
  }
  return best
}

const names = new Map()
const snapshots = []
for (const item of files) {
  const year = yearOf(item.name)
  const raw = JSON.parse(readFileSync(join(srcDir, item.name), "utf8"))
  const { fc, text, tol } = fit(raw)
  writeFileSync(join(worldDir, `${year}.geojson`), text)
  snapshots.push(year)
  for (const feature of fc.features) {
    const [lng, lat] = centroidOf(feature.geometry)
    const key = feature.properties.name
    const found = names.get(key)
    if (!found) names.set(key, { name: key, id: feature.properties.id, years: [year], lng: Math.round(lng * 10) / 10, lat: Math.round(lat * 10) / 10 })
    else found.years.push(year)
  }
  process.stdout.write(`${year} ${fc.features.length} ${text.length} tol ${tol}\n`)
}
snapshots.sort((a, b) => a - b)
for (const entry of names.values()) entry.years.sort((a, b) => a - b)
writeFileSync(join(root, "public/history/manifest.json"), JSON.stringify({ snapshots, max: 2010 }))
writeFileSync(join(root, "public/history/names.json"), JSON.stringify([...names.values()].sort((a, b) => a.name.localeCompare(b.name))))

const landRaw = JSON.parse(readFileSync(landDest, "utf8"))
const land = { type: "FeatureCollection", features: [] }
for (const feature of landRaw.features) {
  const geometry = simplifyGeometry(feature.geometry, 0.15)
  if (geometry) land.features.push({ type: "Feature", properties: {}, geometry })
}
writeFileSync(join(root, "public/history/land.geojson"), JSON.stringify(land))
process.stdout.write(`land ${JSON.stringify(land).length}\n`)
process.stdout.write(`snapshots ${snapshots.join(",")}\n`)
