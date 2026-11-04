import { readFileSync, writeFileSync } from "node:fs"
import { execFile } from "node:child_process"

const raw = JSON.parse(readFileSync("data-src/cliopatria_polities_only_v021.geojson", "utf8"))
const labels = JSON.parse(readFileSync("public/history/labels.json", "utf8"))
const cache = JSON.parse(readFileSync("data-src/wikidata-zh.json", "utf8"))

function plain(name) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const wanted = new Map()
for (const feature of raw.features) {
  const name = String(feature.properties?.Name || "")
  const qid = String(feature.properties?.Wikidata || "")
  if (!name || !/^Q\d+$/.test(qid)) continue
  const key = plain(name)
  if (!wanted.has(qid)) wanted.set(qid, { keys: new Set(), en: name })
  wanted.get(qid).keys.add(key)
}

function curl(url) {
  return new Promise((resolve, reject) => {
    execFile("curl.exe", ["-sS", "--max-time", "40", "-A", "yange-atlas/1.0", url], {
      maxBuffer: 8_000_000,
      env: { ...process.env, HTTPS_PROXY: "http://127.0.0.1:7897", HTTP_PROXY: "http://127.0.0.1:7897" },
    }, (err, stdout) => err ? reject(err) : resolve(stdout))
  })
}

const missing = [...wanted.keys()].filter((qid) => !cache[qid])
console.log("missing", missing.length)
for (let i = 0; i < missing.length; i += 40) {
  const batch = missing.slice(i, i + 40)
  const url = "https://www.wikidata.org/w/api.php?action=wbgetentities&props=labels&languages=zh-cn|zh-hans|zh&format=json&ids=" + batch.join("|")
  process.stdout.write(i + "\n")
  let data
  try {
    data = JSON.parse(await curl(url))
  } catch (error) {
    console.log("fail", error.message)
    continue
  }
  for (const [qid, entity] of Object.entries(data.entities || {})) {
    const bag = entity.labels || {}
    cache[qid] = bag["zh-cn"]?.value || bag["zh-hans"]?.value || bag.zh?.value || ""
  }
  writeFileSync("data-src/wikidata-zh.json", JSON.stringify(cache))
}

let added = 0
for (const [qid, info] of wanted) {
  const zh = cache[qid]
  if (!zh) continue
  for (const key of info.keys) {
    if (labels[key]?.zh) continue
    labels[key] = { zh, en: info.en }
    added++
  }
}
writeFileSync("public/history/labels.json", JSON.stringify(labels))
console.log("added", added, "cache", Object.keys(cache).length)
