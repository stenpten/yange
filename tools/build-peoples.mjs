import { execFileSync } from "node:child_process"
import { mkdirSync, writeFileSync } from "node:fs"

const root = "D:/code/codex/history-atlas"
const outDir = root + "/public/history/peoples"
mkdirSync(outDir, { recursive: true })

const files = execFileSync("git", ["ls-tree", "-r", "--name-only", "befaf24", "public/history/world"], { cwd: root, encoding: "utf8" })
  .trim()
  .split(/\r?\n/)

function yearOf(path) {
  const base = path.split("/").pop().replace(".geojson", "")
  return Number(base)
}

function centroid(geometry) {
  const ring = geometry?.type === "Polygon" ? geometry.coordinates?.[0] : geometry?.coordinates?.[0]?.[0]
  if (!ring?.length) return null
  let x = 0
  let y = 0
  for (const p of ring) { x += p[0]; y += p[1] }
  return [x / ring.length, y / ring.length]
}

function keep(name, lng, lat) {
  const n = name.toLowerCase()
  if (lng < -28) return true
  if (lat < 22 && lng > -20 && lng < 55) return true
  if (lat < -8 && lng > 110) return true
  if (/hunter|gatherer|khoisan|aboriginal|ainu|tasmanian|polynesian|maori|papuan|melanes|micronesian|bantu|saharan|cereal farmer|shellfish|forag|paleo-siberian|samoyed|saami|finno-ugric|tungus|pampas|patagon|amazon|andean|arctic|subarctic/.test(n)) return true
  return false
}

function slug(name) {
  return name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "unnamed"
}

const sheets = files.map((path) => ({ path, year: yearOf(path) })).sort((a, b) => a.year - b.year)
const names = new Set()
let bytes = 0
for (let i = 0; i < sheets.length; i++) {
  const sheet = sheets[i]
  const next = sheets[i + 1]?.year ?? 2025
  const text = execFileSync("git", ["show", `befaf24:${sheet.path}`], { cwd: root, encoding: "utf8", maxBuffer: 20_000_000 })
  const fc = JSON.parse(text)
  const features = []
  for (const feature of fc.features) {
    const name = String(feature.properties?.name || "")
    const center = centroid(feature.geometry)
    if (!name || !center) continue
    if (!keep(name, center[0], center[1])) continue
    names.add(name)
    features.push({
      type: "Feature",
      properties: { id: slug(name), name, precise: 1, from: sheet.year, to: next - 1, kind: "people" },
      geometry: feature.geometry,
    })
  }
  const body = JSON.stringify({ type: "FeatureCollection", features })
  bytes += body.length
  writeFileSync(`${outDir}/${sheet.year}.geojson`, body)
  console.log(sheet.year, features.length)
}
writeFileSync(outDir + "/index.json", JSON.stringify({ snapshots: sheets.map((sheet) => sheet.year) }))
console.log("names", names.size, "kb", Math.round(bytes / 1024))
console.log([...names].sort().join("\n"))
