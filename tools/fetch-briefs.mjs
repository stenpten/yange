import { execFile } from "node:child_process"
import { readFileSync, writeFileSync, existsSync } from "node:fs"

const raw = JSON.parse(readFileSync("data-src/cliopatria_polities_only_v021.geojson", "utf8"))
const table = new Map()
for (const line of readFileSync("data-src/STCharacters.txt", "utf8").split(/\r?\n/)) {
  if (!line || line.startsWith("#")) continue
  const [simp, rest] = line.split("\t")
  if (!simp || !rest) continue
  for (const trad of rest.split(" ")) if (trad && trad !== simp) table.set(trad, simp)
}
function simp(text) {
  let out = ""
  for (const ch of text) out += table.get(ch) || ch
  return out
}
function plain(name) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
const byQ = new Map()
for (const feature of raw.features) {
  const name = String(feature.properties?.Name || "")
  const qid = String(feature.properties?.Wikidata || "")
  if (!name || !/^Q\d+$/.test(qid) || name.startsWith("(")) continue
  const key = plain(name)
  if (!byQ.has(qid)) byQ.set(qid, new Set())
  byQ.get(qid).add(key)
}
const cachePath = "data-src/wikidata-desc.json"
const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {}
function curl(url) {
  return new Promise((resolve, reject) => {
    execFile("curl.exe", ["-sS", "--max-time", "40", "-A", "yange-atlas/1.0", url], {
      maxBuffer: 12_000_000,
      env: { ...process.env, HTTPS_PROXY: "http://127.0.0.1:7897", HTTP_PROXY: "http://127.0.0.1:7897" },
    }, (err, stdout) => err ? reject(err) : resolve(stdout))
  })
}
const missing = [...byQ.keys()].filter((qid) => !cache[qid])
console.log("desc missing", missing.length)
for (let i = 0; i < missing.length; i += 40) {
  const batch = missing.slice(i, i + 40)
  const url = "https://www.wikidata.org/w/api.php?action=wbgetentities&props=descriptions&languages=zh-cn|zh-hans|zh|en&format=json&ids=" + batch.join("|")
  process.stdout.write(i + "\n")
  try {
    const data = JSON.parse(await curl(url))
    for (const [qid, entity] of Object.entries(data.entities || {})) {
      const bag = entity.descriptions || {}
      const zh = bag["zh-cn"]?.value || bag["zh-hans"]?.value || bag.zh?.value || ""
      const en = bag.en?.value || ""
      cache[qid] = { zh: zh ? simp(zh) : "", en }
    }
  } catch (error) {
    console.log("fail", error.message)
  }
  writeFileSync(cachePath, JSON.stringify(cache))
}
const labels = JSON.parse(readFileSync("public/history/labels.json", "utf8"))
const briefs = {}
for (const [qid, keys] of byQ) {
  const item = cache[qid]
  if (!item) continue
  for (const key of keys) {
    const zh = item.zh || ""
    const en = item.en || ""
    if (zh.length < 4 && en.length < 8) continue
    const name = labels[key]?.zh || ""
    briefs[key] = {
      zh: zh ? (name && !zh.includes(name) ? `${name}。${zh}` : zh) : "",
      en,
    }
  }
}
writeFileSync("public/history/briefs.json", JSON.stringify(briefs))
console.log("briefs", Object.keys(briefs).length, "cache", Object.keys(cache).length)
