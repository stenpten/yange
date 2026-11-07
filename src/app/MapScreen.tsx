import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Map } from "maplibre-gl"
import { chapters, events } from "../data/content"
import { ratioToYear, snapshotFor, yearToRatio } from "../lib/snapshot"
import { activeFeatures, bucketFor } from "../lib/polities"
import { colorFor } from "../lib/color"
import { centroidOf, contains } from "../lib/geo"
import { eraFor, yearText } from "../lib/era"
import { presentPolity } from "../data/reign"
import { gazetteer } from "../data/gazetteer"
import { aliasFor } from "../data/polity-alias"
import { peopleOverview } from "../data/people-briefs"
import { chronicles } from "../data/chronicles"
import { asset, useCopy } from "./chrome"

type Geom = { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] | number[][][][] }
type AtlasFeature = { type: "Feature"; properties: Record<string, string | number>; geometry: Geom }
type AtlasFC = { type: "FeatureCollection"; features: AtlasFeature[] }
const empty: AtlasFC = { type: "FeatureCollection", features: [] }

function num(value: string | null, fallback: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function labelOf(feature: AtlasFeature, lang: "zh" | "en") {
  const zh = String(feature.properties.name_zh ?? "")
  const en = String(feature.properties.name_en || feature.properties.name || "")
  if (lang === "zh") return zh || en || "未定译名"
  return en
}

type Lexicon = Record<string, { zh: string; en: string }>
type Dossier = { spanZh: string; spanEn: string; capitalZh: string; capitalEn: string; bodyZh: string; bodyEn: string; beats?: { year: number; zh: string; en: string }[] }

function ringArea(ring: number[][]) {
  let area = 0
  for (let i = 0; i < ring.length - 1; i++) area += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]
  return Math.abs(area / 2)
}

function geomArea(geometry: Geom) {
  const polys = geometry.type === "Polygon" ? [geometry.coordinates as number[][][]] : geometry.coordinates as number[][][][]
  let sum = 0
  for (const poly of polys) if (poly[0]) sum += ringArea(poly[0])
  return sum
}

function decorate(fc: AtlasFC, lexicon: Lexicon, lang: "zh" | "en", year: number): AtlasFC {
  const decorated = fc.features.flatMap((feature) => {
    const source = String(feature.properties.name ?? "")
    const precise = Number(feature.properties.precise) === 1
    const view = precise ? null : presentPolity(source, year)
    if (view?.hide) return []
    const alias = precise ? aliasFor(source, year) : null
    if (precise && (source === "Great Yuan" || source === "Yuan Dynasty") && (year < 1206 || year > 1388)) return []
    const key = source.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const named = gazetteer[key]
    const zh = alias?.zh || view?.zh || lexicon[key]?.zh || named?.zh || ""
    const en = alias?.en || view?.en || lexicon[key]?.en || named?.en || source
    const label = lang === "zh" ? (zh || en) : en
    const dossier = (alias?.dossier || view?.dossier || named?.dossier || key).toLowerCase()
    const chapter = alias?.chapter || view?.chapter || named?.chapter
    return [{
      ...feature,
      properties: {
        ...feature.properties,
        color: colorFor(dossier),
        name_zh: zh,
        name_en: en,
        dossier,
        ...(chapter ? { chapter } : {}),
        ...(label ? { label } : {}),
        area: Number(feature.properties.drawArea) || Number(feature.properties.area) || Math.round(geomArea(feature.geometry)),
      },
    }]
  })
  const seenLabels = new Set<string>()
  const minArea = 0.02
  const features = decorated
    .sort((a, b) => Number(b.properties.area) - Number(a.properties.area))
    .filter((feature) => {
      const label = String(feature.properties.label || "")
      if (!label || Number(feature.properties.area) < minArea) return true
      if (seenLabels.has(label)) {
        feature.properties.label = ""
        return true
      }
      seenLabels.add(label)
      return true
    })
  return { type: "FeatureCollection", features }
}



type LabelFC = { type: "FeatureCollection"; features: Array<{ type: "Feature"; properties: Record<string, string | number>; geometry: { type: "Point"; coordinates: [number, number] } }> }

function largestCentroid(geometry: Geom): [number, number] {
  const polys = geometry.type === "Polygon" ? [geometry.coordinates as number[][][]] : geometry.coordinates as number[][][][]
  let best: number[][] | null = null
  let bestArea = -1
  for (const poly of polys) {
    const ring = poly?.[0]
    if (!ring || ring.length < 3) continue
    const area = ringArea(ring)
    if (area > bestArea) {
      bestArea = area
      best = ring
    }
  }
  if (!best) return centroidOf(geometry)
  const closed = best[0][0] === best[best.length - 1][0] && best[0][1] === best[best.length - 1][1]
  const count = closed ? best.length - 1 : best.length
  let x = 0
  let y = 0
  for (let i = 0; i < count; i++) {
    x += best[i][0]
    y += best[i][1]
  }
  return count ? [x / count, y / count] : centroidOf(geometry)
}

function labelPoints(fc: AtlasFC, used?: Set<string>): LabelFC {
  const best = new globalThis.Map<string, AtlasFeature>()
  for (const feature of fc.features) {
    const label = String(feature.properties.label || "")
    if (!label || used?.has(label)) continue
    const area = Number(feature.properties.area) || 0
    const prev = best.get(label)
    if (!prev || area > Number(prev.properties.area)) best.set(label, feature)
  }
  return {
    type: "FeatureCollection",
    features: [...best.values()].map((feature) => ({
      type: "Feature" as const,
      properties: feature.properties,
      geometry: { type: "Point" as const, coordinates: largestCentroid(feature.geometry) },
    })),
  }
}

const LABEL_BREAKS = [8, 24, 220, 500, 842, 951, 1206, 1389, 1950]

function labelEpoch(year: number) {
  let epoch = 0
  for (const cut of LABEL_BREAKS) if (year >= cut) epoch++
  return epoch
}

const bucketCache = new globalThis.Map<number, AtlasFC>()
const bucketFlight = new globalThis.Map<number, Promise<AtlasFC>>()
const peopleCache = new globalThis.Map<number, AtlasFC>()

function stampArea(feature: AtlasFeature) {
  if (Number(feature.properties.drawArea) > 0 && Number.isFinite(Number(feature.properties.minX))) return
  feature.properties.drawArea = Math.round(geomArea(feature.geometry))
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  const polys = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates as number[][][]] : feature.geometry.coordinates as number[][][][]
  for (const poly of polys) for (const point of poly[0] || []) {
    if (point[0] < minX) minX = point[0]
    if (point[1] < minY) minY = point[1]
    if (point[0] > maxX) maxX = point[0]
    if (point[1] > maxY) maxY = point[1]
  }
  feature.properties.minX = minX
  feature.properties.minY = minY
  feature.properties.maxX = maxX
  feature.properties.maxY = maxY
}

function loadBucket(id: number, url: string) {
  const hit = bucketCache.get(id)
  if (hit) return Promise.resolve(hit)
  const pending = bucketFlight.get(id)
  if (pending) return pending
  const task = new Promise<AtlasFC>((resolve, reject) => {
    const worker = new Worker(new URL("../lib/parse-worker.ts", import.meta.url), { type: "module" })
    worker.onmessage = (event: MessageEvent<{ ok: boolean; empty?: boolean; data?: AtlasFC }>) => {
      worker.terminate()
      if (!event.data.ok) {
        bucketFlight.delete(id)
        reject(new Error("polities"))
        return
      }
      const data = event.data.empty || !event.data.data ? { type: "FeatureCollection" as const, features: [] } : event.data.data
      for (const feature of data.features) stampArea(feature)
      bucketCache.set(id, data)
      bucketFlight.delete(id)
      resolve(data)
    }
    worker.onerror = () => {
      worker.terminate()
      bucketFlight.delete(id)
      reject(new Error("polities"))
    }
    worker.postMessage({ id, bucket: id, url })
  })
  bucketFlight.set(id, task)
  return task
}

function activeSignature(features: AtlasFeature[], year: number, lang: string, names: number) {
  let sig = labelEpoch(year) + ":" + lang + ":" + names
  for (const feature of features) {
    const from = Number(feature.properties.from)
    const to = Number(feature.properties.to)
    if (from <= year && year <= to) sig += "|" + feature.properties.id + "@" + from + "-" + to
  }
  return sig
}

export function MapScreen() {
  const { lang, t } = useCopy()
  const [params, setParams] = useSearchParams()
  const [span, setSpan] = useState<{ min: number; max: number }>({ min: -123000, max: 2024 })
  const [lexicon, setLexicon] = useState<Lexicon>({})
  const [dossiers, setDossiers] = useState<Record<string, Dossier>>(chronicles)
  const [population, setPopulation] = useState<Record<string, number[][]>>({})
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<1 | 4 | 16>(1)
  const [status, setStatus] = useState<string>(t.loading)
  const [visible, setVisible] = useState(0)
  const [railOpen, setRailOpen] = useState(false)
  const [bucket, setBucket] = useState<AtlasFC>(empty)
  const [peopleYears, setPeopleYears] = useState<number[]>([])
  const [peoples, setPeoples] = useState<AtlasFC>(empty)
  const [briefs, setBriefs] = useState<Record<string, { zh: string; en: string }>>({})
  const mapNode = useRef<HTMLDivElement>(null)
  const shownRef = useRef(empty)
  const setParamsRef = useRef(setParams)
  setParamsRef.current = setParams
  const mapRef = useRef<Map | null>(null)
  const ready = useRef(false)
  const year = num(params.get("year"), 750)
  const lng = num(params.get("lng"), 105)
  const lat = num(params.get("lat"), 35)
  const zoom = num(params.get("z"), 3)
  const polity = params.get("polity") ?? ""
  const view = params.get("view") === "globe" ? "globe" : "map"
  const min = span.min
  const max = span.max
  const clamped = Math.min(max, Math.max(min, year))
  const [liveYear, setLiveYear] = useState(clamped)
  const liveRef = useRef(clamped)
  const dragging = useRef(false)
  const playingRef = useRef(false)
  const paintSig = useRef("")
  const labelTimer = useRef(0)
  playingRef.current = playing
  const viewYear = Math.min(max, Math.max(min, liveYear))
  const bucketId = bucketFor(viewYear)
  const peopleSnap = peopleYears.length ? snapshotFor(viewYear, peopleYears) : null
  const [yearField, setYearField] = useState(String(viewYear))
  const yearFocused = useRef(false)
  useEffect(() => { if (!yearFocused.current) setYearField(String(viewYear)) }, [viewYear])
  useEffect(() => {
    if (dragging.current || playingRef.current) return
    if (liveRef.current === clamped) return
    liveRef.current = clamped
    setLiveYear(clamped)
  }, [clamped])
  function publishYear(nextYear: number) {
    const next = Math.min(max, Math.max(min, Math.round(nextYear)))
    liveRef.current = next
    setLiveYear(next)
    setParams((current) => {
      if (current.get("year") === String(next)) return current
      const updated = new URLSearchParams(current)
      updated.set("year", String(next))
      return updated
    }, { replace: true })
  }
  const worldLabelOpacity = ["step", ["zoom"], ["case", [">=", ["get", "area"], 12], 1, 0], 2.2, ["case", [">=", ["get", "area"], 6], 1, 0], 3.5, 1]
  const peopleLabelOpacity = ["step", ["zoom"], ["case", [">=", ["get", "area"], 20], 1, 0], 2.4, ["case", [">=", ["get", "area"], 8], 1, 0], 3.8, 1]
  const playLabelOpacity = ["step", ["zoom"], ["case", [">=", ["get", "area"], 2], 1, 0], 2.4, 1]
  function showLabels(duringPlay = false) {
    const map = mapRef.current
    if (!map) return
    for (const id of ["world-label", "peoples-label"]) {
      if (!map.getLayer(id)) continue
      map.setLayoutProperty(id, "visibility", "visible")
      map.setLayoutProperty(id, "text-padding", duringPlay ? 6 : 2)
      map.setPaintProperty(id, "text-opacity", duringPlay ? playLabelOpacity : (id === "world-label" ? worldLabelOpacity : peopleLabelOpacity))
    }
  }
  function revealLabelsSoon() {
    window.clearTimeout(labelTimer.current)
    labelTimer.current = window.setTimeout(() => {
      if (dragging.current || playingRef.current) return
      showLabels(false)
    }, 160)
  }
  function quietLabels() {
    const map = mapRef.current
    for (const id of ["world-label", "peoples-label"]) if (map?.getLayer(id)) map.setLayoutProperty(id, "visibility", "none")
    revealLabelsSoon()
  }
  function endDrag() {
    if (!dragging.current) return
    dragging.current = false
    publishYear(liveRef.current)
    revealLabelsSoon()
  }
  function commitYear(raw: string) {
    const next = Number(raw)
    if (!Number.isFinite(next)) { setYearField(String(viewYear)); return }
    publishYear(next)
  }

  function write(next: Record<string, string | undefined>) {
    const updated = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (!value) updated.delete(key)
      else updated.set(key, value)
    }
    setParams(updated, { replace: true })
  }

  useEffect(() => {
    void fetch(asset("history/polities/index.json")).then((res) => res.json()).then((data: { min: number; max: number }) => {
      if (Number.isFinite(data.min) && Number.isFinite(data.max)) setSpan((current) => ({ min: current.min, max: data.max }))
    }).catch(() => setSpan({ min: -3400, max: 2024 }))
    void fetch(asset("history/labels.json")).then((res) => res.json()).then((data: Lexicon) => setLexicon(data)).catch(() => setLexicon({}))
    void fetch(asset("history/dossiers.json")).then((res) => res.json()).then((data: Record<string, Dossier>) => setDossiers({ ...data, ...chronicles })).catch(() => setDossiers(chronicles))
    void fetch(asset("history/population.json")).then((res) => res.json()).then((data: Record<string, number[][]>) => setPopulation(data)).catch(() => setPopulation({}))
    void fetch(asset("history/peoples/index.json")).then((res) => res.json()).then((data: { snapshots: number[] }) => { setPeopleYears(data.snapshots || []); if (data.snapshots?.[0] !== undefined) setSpan((current) => ({ ...current, min: data.snapshots[0] })) }).catch(() => undefined)
    void fetch(asset("history/briefs.json")).then((res) => res.ok ? res.json() : {}).then((data: Record<string, { zh: string; en: string }>) => setBriefs(data || {})).catch(() => undefined)
  }, [])

  const explicitView = useRef(params.has("z")).current

  useEffect(() => {
    if (!mapNode.current || mapRef.current) return
    const map = new Map({
      container: mapNode.current,
      style: {
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: {},
        layers: [{ id: "bg", type: "background", paint: { "background-color": "#071828" } }],
      },
      center: explicitView ? [lng, lat] : [10, 18],
      zoom: explicitView ? zoom : 1.4,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
      renderWorldCopies: false,
      localIdeographFontFamily: '"Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif',
      attributionControl: false,
      fadeDuration: 0,
      dragRotate: false,
    })
    mapRef.current = map
    map.on("load", () => {
      ready.current = true
      map.addSource("dem", {
        type: "raster-dem",
        tiles: ["https://tiles.mapterhorn.com/{z}/{x}/{y}.webp"],
        encoding: "terrarium",
        tileSize: 512,
        maxzoom: 3,
        attribution: "Mapterhorn",
      })
      map.addLayer({
        id: "relief",
        type: "color-relief",
        source: "dem",
        paint: {
          "color-relief-color": [
            "interpolate", ["linear"], ["elevation"],
            -8000, "#071828",
            -1500, "#14344e",
            -80, "#2a6d86",
            20, "#4f7344",
            650, "#b89a62",
            1800, "#8d6848",
            4200, "#e4e0d6",
          ],
        },
      })
      map.addLayer({
        id: "shade",
        type: "hillshade",
        source: "dem",
        paint: {
          "hillshade-method": "multidirectional",
          "hillshade-exaggeration": ["interpolate", ["linear"], ["zoom"], 0.5, 0.42, 4, 0.28],
          "hillshade-illumination-anchor": "map",
          "hillshade-illumination-direction": 335,
          "hillshade-shadow-color": "#24180f",
          "hillshade-highlight-color": "#fff6e8",
          "hillshade-accent-color": "#5c4a38",
        },
      })

      map.addSource("peoples", { type: "geojson", data: empty })
      map.addSource("peoples-labels", { type: "geojson", data: empty })
      map.addLayer({ id: "peoples", type: "fill", source: "peoples", paint: { "fill-color": ["get", "color"], "fill-opacity": 0.4 } })
      map.addLayer({ id: "peoples-line", type: "line", source: "peoples", paint: { "line-color": "#1c1612", "line-width": 0.8, "line-opacity": 0.6 } })
      map.addLayer({
        id: "peoples-label",
        type: "symbol",
        source: "peoples-labels",
        filter: ["has", "label"],
        layout: {
          "text-field": ["get", "label"],
          "text-font": ["Open Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 1, 11, 4, 13],
          "text-max-width": 8,
          "text-padding": 2,
          "text-allow-overlap": false,
          "text-optional": true,
          "symbol-sort-key": ["*", ["get", "area"], -1],
        },
        paint: {
          "text-color": "#f6f3ec",
          "text-halo-color": "#14110e",
          "text-halo-width": 1.15,
          "text-opacity": ["step", ["zoom"], ["case", [">=", ["get", "area"], 20], 1, 0], 2.4, ["case", [">=", ["get", "area"], 8], 1, 0], 3.8, 1],
        },
      })
      map.addSource("world", { type: "geojson", data: empty })
      map.addSource("world-labels", { type: "geojson", data: empty })
      map.addLayer({ id: "world", type: "fill", source: "world", paint: { "fill-color": ["get", "color"], "fill-opacity": ["interpolate", ["linear"], ["zoom"], 0.5, 0.64, 3, 0.5, 5, 0.46] } })
      map.addLayer({ id: "world-line", type: "line", source: "world", paint: { "line-color": "#241c16", "line-width": ["interpolate", ["linear"], ["zoom"], 0.8, 0.85, 3, 1.2, 6, 1.8], "line-opacity": 0.72 } })
      map.addLayer({
        id: "world-label",
        type: "symbol",
        source: "world-labels",
        filter: ["has", "label"],
        layout: {
          "text-field": ["get", "label"],
          "text-font": ["Open Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 1, 11, 4, 14],
          "text-max-width": 7,
          "text-padding": 2,
          "text-allow-overlap": false,
          "text-optional": true,
          "symbol-sort-key": ["*", ["get", "area"], -1],
        },
        paint: {
          "text-color": "#f6f3ec",
          "text-halo-color": "#14110e",
          "text-halo-width": 1.15,
          "text-opacity": ["step", ["zoom"], ["case", [">=", ["get", "area"], 12], 1, 0], 2.2, ["case", [">=", ["get", "area"], 6], 1, 0], 3.5, 1],
        },
      })
      map.addSource("select", { type: "geojson", data: empty })
      map.addLayer({ id: "select", type: "line", source: "select", paint: { "line-color": "#c44536", "line-width": 2.5 } })
      map.resize()
      const earth = map.cameraForBounds([[-180, -58], [180, 72]], { padding: 8 })
      if (earth) {
        map.setMinZoom(Math.max(0, earth.zoom - 0.05))
        if (!explicitView || zoom < 1.5) map.jumpTo({ center: [earth.center.lng, earth.center.lat], zoom: earth.zoom })
      }
    })
    map.on("click", (event) => {
      const hits = map.queryRenderedFeatures(event.point, { layers: ["world", "peoples"] })
      const hit = hits[0]
      const id = hit ? String(hit.properties?.id ?? "") : ""
      setParamsRef.current((current) => {
        const next = new URLSearchParams(current)
        if (id) next.set("polity", id)
        else next.delete("polity")
        return next
      }, { replace: true })
      setRailOpen(true)
    })
    map.on("moveend", () => {
      const center = map.getCenter()
      setParamsRef.current((current) => {
        const next = new URLSearchParams(current)
        next.set("lng", center.lng.toFixed(2))
        next.set("lat", center.lat.toFixed(2))
        next.set("z", map.getZoom().toFixed(2))
        if (!next.get("year")) next.set("year", "750")
        return next
      }, { replace: true })
      const bounds = map.getBounds()
      const features = shownRef.current.features
      const ids = new Set<string>()
      for (const feature of features) {
        const [x, y] = centroidOf(feature.geometry)
        if (x >= bounds.getWest() && x <= bounds.getEast() && y >= bounds.getSouth() && y <= bounds.getNorth()) ids.add(String(feature.properties.id))
      }
      setVisible(ids.size)
    })
    return () => { map.remove(); mapRef.current = null; ready.current = false }
    // The map is created once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !ready.current || !params.has("z") || zoom < 1.5) return
    const center = map.getCenter()
    if (Math.abs(center.lng - lng) > 0.5 || Math.abs(center.lat - lat) > 0.5 || Math.abs(map.getZoom() - zoom) > 0.25) {
      map.jumpTo({ center: [lng, lat], zoom })
    }
  }, [lng, lat, zoom])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const apply = () => {
      if (view === "globe") {
        map.setProjection({ type: "globe" })
        map.dragRotate.enable()
      } else {
        map.setProjection({ type: "mercator" })
        map.dragRotate.disable()
      }
    }
    if (map.isStyleLoaded()) apply()
    else map.once("load", apply)
  }, [view])

  useEffect(() => {
    let cancel = false
    const known = bucketCache.get(bucketId)
    if (known) setBucket(known)
    const slow = window.setTimeout(() => {
      if (!cancel && !bucketCache.get(bucketId)) setStatus(t.loading)
    }, 240)
    void loadBucket(bucketId, asset(`history/polities/${bucketId}.geojson`)).then((loaded) => {
      if (cancel) return
      setBucket(loaded)
      setStatus("")
      window.setTimeout(() => {
        for (const id of [bucketId - 1, bucketId + 1]) void loadBucket(id, asset(`history/polities/${id}.geojson`)).catch(() => undefined)
      }, 40)
    }).catch(() => { if (!cancel) setStatus(t.failed) })
    return () => { cancel = true; window.clearTimeout(slow) }
  }, [bucketId, t.loading, t.failed])


  useEffect(() => {
    if (peopleSnap === null) return
    const cached = peopleCache.get(peopleSnap)
    if (cached) setPeoples(cached)
    let cancel = false
    void fetch(asset(`history/peoples/${peopleSnap}.geojson`)).then((res) => res.ok ? res.json() : empty).then((data: AtlasFC) => {
      if (cancel) return
      for (const feature of data.features || []) stampArea(feature)
      peopleCache.set(peopleSnap, data)
      setPeoples(data)
    }).catch(() => { if (!cancel) setPeoples(empty) })
    return () => { cancel = true }
  }, [peopleSnap])

  const shown = useMemo(() => {
    const sig = activeSignature(bucket.features, viewYear, lang, Object.keys(lexicon).length)
    if (sig === paintSig.current && shownRef.current.features.length) return shownRef.current
    const next = decorate({ type: "FeatureCollection", features: activeFeatures(bucket.features, viewYear) }, lexicon, lang, viewYear)
    paintSig.current = sig
    return next
  }, [bucket, viewYear, lexicon, lang])
  shownRef.current = shown

  const peoplesShown = useMemo(() => {
    const open = peoples.features.filter((feature) => {
      const [x, y] = centroidOf(feature.geometry)
      return !shown.features.some((other) => {
        const west = Number(other.properties.minX)
        if (Number.isFinite(west) && (x < west || x > Number(other.properties.maxX) || y < Number(other.properties.minY) || y > Number(other.properties.maxY))) return false
        return contains(other.geometry, x, y)
      })
    })
    return decorate({ type: "FeatureCollection", features: open }, lexicon, lang, viewYear)
  }, [peoples, shown, lexicon, lang, viewYear])


  const worldLabels = useMemo(() => labelPoints(shown), [shown])
  const peopleLabels = useMemo(() => labelPoints(peoplesShown, new Set(worldLabels.features.map((feature) => String(feature.properties.label || "")))), [peoplesShown, worldLabels])
  useEffect(() => {
    const map = mapRef.current
    const put = () => (map?.getSource("world") as { setData(data: unknown): void } | undefined)?.setData(shown)
    if (map?.isStyleLoaded()) put()
    else map?.once("load", put)
  }, [shown])

  useEffect(() => {
    const map = mapRef.current
    const put = () => (map?.getSource("world-labels") as { setData(data: unknown): void } | undefined)?.setData(worldLabels)
    if (map?.isStyleLoaded()) put()
    else map?.once("load", put)
  }, [worldLabels])

  useEffect(() => {
    const map = mapRef.current
    const put = () => (map?.getSource("peoples") as { setData(data: unknown): void } | undefined)?.setData(peoplesShown)
    if (map?.isStyleLoaded()) put()
    else map?.once("load", put)
  }, [peoplesShown])

  useEffect(() => {
    const map = mapRef.current
    const put = () => (map?.getSource("peoples-labels") as { setData(data: unknown): void } | undefined)?.setData(peopleLabels)
    if (map?.isStyleLoaded()) put()
    else map?.once("load", put)
  }, [peopleLabels])

  useEffect(() => {
    const features = [...shown.features, ...peoplesShown.features].filter((feature) => String(feature.properties.id) === polity)
    const selected: AtlasFC = { type: "FeatureCollection", features }
    const map = mapRef.current
    const put = () => (map?.getSource("select") as { setData(data: unknown): void } | undefined)?.setData(selected)
    if (map?.isStyleLoaded()) put()
    else map?.once("load", put)
  }, [shown, peoplesShown, polity])

  useEffect(() => {
    if (!playing) return
    showLabels(true)
    const timer = window.setInterval(() => {
      const next = Math.min(max, liveRef.current + 1)
      liveRef.current = next
      setLiveYear(next)
      if (next >= max) setPlaying(false)
    }, Math.max(16, 280 / speed))
    return () => {
      window.clearInterval(timer)
      if (!playingRef.current) showLabels(false)
    }
  }, [playing, speed, max])

  useEffect(() => {
    if (playing) return
    const next = String(liveRef.current)
    setParams((current) => {
      if (current.get("year") === next) return current
      const updated = new URLSearchParams(current)
      updated.set("year", next)
      return updated
    }, { replace: true })
    revealLabelsSoon()
  }, [playing, setParams])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return
      if (event.key === " ") { event.preventDefault(); setPlaying((value) => !value) }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault()
        const step = (event.shiftKey ? 10 : 1) * (event.key === "ArrowLeft" ? -1 : 1)
        publishYear(viewYear + step)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const selected = useMemo(() => shown.features.find((feature) => String(feature.properties.id) === polity) ?? peoplesShown.features.find((feature) => String(feature.properties.id) === polity), [shown, peoplesShown, polity])
  const shownEvents = events
    .filter((event) => Math.abs(event.year - viewYear) <= 35)
    .sort((a, b) => a.year - b.year)
  const dossierKey = String(selected?.properties.dossier ?? selected?.properties.name ?? "").toLowerCase()
  const chapterSlug = String(selected?.properties.chapter ?? "")
  const chapter = chapters.find((item) => chapterSlug && item.slug === chapterSlug) ?? chapters.find((item) => item.polityId && item.polityId === polity)
  const dossier = selected ? dossiers[dossierKey] : undefined
  const series = (population[dossierKey] ?? population[String(selected?.properties.name ?? "").toLowerCase()] ?? []).slice().sort((a, b) => a[0] - b[0])
  const popMin = series[0]?.[0] ?? 0
  const popMax = series[series.length - 1]?.[0] ?? 1
  const popPeak = Math.max(1, ...series.map((point) => point[1]))
  const popX = (year: number) => 8 + ((year - popMin) / (popMax - popMin || 1)) * 304
  const popY = (value: number) => 88 - (value / (popPeak * 1.15)) * 76
  const polityEvents = events.filter((event) => {
    if (!selected) return false
    const id = String(selected.properties.id)
    if (event.polityId && (event.polityId === id || id.startsWith(`${event.polityId}-`) || event.polityId.startsWith(`${id}-`))) return true
    return contains(selected.geometry, event.lng, event.lat)
  }).sort((a, b) => a.year - b.year)
  const era = eraFor(viewYear, lang)
  const borderFrom = Number(selected?.properties.from)
  const borderTo = Number(selected?.properties.to)

  const plainName = String(selected?.properties.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const wiki = briefs[plainName]
  const wikiText = lang === "zh" ? (wiki?.zh || "") : (wiki?.en || wiki?.zh || "")
  const overview = !selected || dossier ? "" : (
    selected.properties.kind === "people" || !wikiText
      ? peopleOverview(String(selected.properties.name || ""), borderFrom, borderTo, lang, labelOf(selected, lang))
      : wikiText
  )
  const borderText = Number.isFinite(borderFrom) && Number.isFinite(borderTo) ? `${yearText(borderFrom, lang)}–${yearText(borderTo, lang)}` : ""

  return (
    <div className="stage">
      <div className="mapwrap">
        <div className="map" ref={mapNode} />
        <aside className={railOpen ? "rail open" : "rail"}>
          <button className="expand textbtn" type="button" onClick={() => setRailOpen((value) => !value)}>{railOpen ? t.close : t.thisYear}</button>
          {status ? <p>{status}</p> : null}
          {selected ? (
            <article className="polity">
              <div className="polity-rule" style={{ background: String(selected.properties.color) }} />
              <p className="eyebrow">{era || t.world}</p>
              <h2>{labelOf(selected, lang)}</h2>
              {lang === "en" ? <p className="alias">{String(selected.properties.name_zh || selected.properties.name || "")}</p> : null}
              <dl className="meta">
                {borderText ? <><dt>{t.border}</dt><dd>{borderText}</dd></> : null}
                {dossier ? <><dt>{t.span}</dt><dd>{lang === "zh" ? dossier.spanZh : dossier.spanEn}</dd><dt>{t.capital}</dt><dd>{lang === "zh" ? dossier.capitalZh : dossier.capitalEn}</dd></> : null}
              </dl>
              {overview ? <><h3>{t.brief}</h3><p>{overview}</p></> : null}
              {dossier || overview ? null : <p className="note">{t.scopeNote}</p>}
              {dossier ? <h3>{t.chronicle}</h3> : null}
              {dossier ? <div className="dossier">{(lang === "zh" ? dossier.bodyZh : dossier.bodyEn).split("\n\n").map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}</div> : null}
              {dossier?.beats?.length ? (
                <>
                  <h3>{t.history}</h3>
                  <ol className="beats">
                    {dossier.beats.map((beat) => (
                      <li key={beat.year}>
                        <span className="num">{yearText(beat.year, lang)}</span>
                        <span>{lang === "zh" ? beat.zh : beat.en}</span>
                      </li>
                    ))}
                  </ol>
                </>
              ) : null}
              {series.length > 1 ? (
                <>
                  <h3>{t.population}</h3>
                  <div className="pop">
                    <svg viewBox="0 0 320 96" role="img" aria-label={t.population}>
                      <path d={series.map((point, index) => `${index ? "L" : "M"}${popX(point[0]).toFixed(1)},${popY(point[1]).toFixed(1)}`).join(" ")} fill="none" stroke="#f4f1ea" strokeWidth="1.5" />
                      {series.map((point) => <circle key={point[0]} cx={popX(point[0])} cy={popY(point[1])} r="2.5" fill="#f4f1ea" />)}
                      {viewYear >= series[0][0] && viewYear <= series[series.length - 1][0] ? <line x1={popX(viewYear)} x2={popX(viewYear)} y1="8" y2="88" stroke="#c44536" strokeWidth="1" /> : null}
                    </svg>
                    <div className="pop-scale faint"><span>{series[0][0]}</span><span>{series[series.length - 1][1]} {lang === "zh" ? "百万" : "million"}</span><span>{series[series.length - 1][0]}</span></div>
                  </div>
                  <p className="faint">{t.estimate}</p>
                </>
              ) : null}
              <h3>{t.related}</h3>
              {polityEvents.length === 0 ? <p className="muted">{t.noEvents}</p> : polityEvents.map((event) => (
                <div className="event" key={event.id}>
                  <button className="event-hit" type="button" onClick={() => write({ year: String(event.year), lng: String(event.lng), lat: String(event.lat), z: "4", polity: event.polityId })}>
                    <span className="num">{yearText(event.year, lang)}</span>
                    <span>
                      <b>{event.title[lang]}</b>
                      <span className="muted">{event.summary[lang]}</span>
                    </span>
                  </button>
                </div>
              ))}
              <div className="polity-actions">
                {chapter ? <Link className="chapter" to={`/${lang}/chapters/${chapter.slug}`}>{t.openChapter}</Link> : null}
                <button className="textbtn" type="button" onClick={() => write({ polity: undefined })}>{t.close}</button>
              </div>
            </article>
          ) : (
            <>
              <h2>{t.thisYear}</h2>
              {shownEvents.length === 0 ? <p className="muted">{t.noEvents}</p> : shownEvents.map((event) => (
                <div className="event" key={event.id}>
                  <button className="event-hit" type="button" onClick={() => write({ year: String(event.year), lng: String(event.lng), lat: String(event.lat), z: "4", polity: event.polityId })}>
                    <span className="num">{yearText(event.year, lang)}</span>
                    <span>
                      <b>{event.title[lang]}</b>
                      <span className="muted">{event.summary[lang]}</span>
                    </span>
                  </button>
                </div>
              ))}
              <h3>{t.allEvents}</h3>
              {[...events].sort((a, b) => a.year - b.year).map((event) => (
                <div className="event" key={`all-${event.id}`}>
                  <button className="event-hit" type="button" onClick={() => write({ year: String(event.year), lng: String(event.lng), lat: String(event.lat), z: "4", polity: event.polityId })}>
                    <span className="num">{yearText(event.year, lang)}</span>
                    <span>
                      <b>{event.title[lang]}</b>
                      <span className="muted">{event.summary[lang]}</span>
                    </span>
                  </button>
                </div>
              ))}
            </>
          )}
        </aside>
      </div>
      <div className="yearbar">
        <div className="chronicle">
          <input className="year-num year-input" aria-label={t.year} inputMode="numeric" value={yearField} onFocus={() => { yearFocused.current = true }} onBlur={() => { yearFocused.current = false; commitYear(yearField) }} onChange={(event) => setYearField(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") event.currentTarget.blur() }} />
          {era ? <span>{era}</span> : null}
          {borderText ? <span className="faint">{t.border} {borderText}</span> : null}
          <span className="faint">{t.visible} {visible}</span>
        </div>
        <input aria-label={t.source} type="range" min={0} max={1000} value={Math.round(yearToRatio(viewYear, min, max) * 1000)} onPointerDown={() => { dragging.current = true; quietLabels() }} onPointerUp={() => endDrag()} onPointerCancel={() => endDrag()} onBlur={() => endDrag()} onChange={(event) => { const next = Math.min(max, Math.max(min, ratioToYear(Number(event.target.value) / 1000, min, max))); liveRef.current = next; setLiveYear(next); if (dragging.current) quietLabels(); else publishYear(next) }} />
        <div className="year-controls">
          <button className="play" type="button" onClick={() => setPlaying((value) => !value)}>{playing ? t.pause : t.play}</button>
          <div className="speeds" aria-label={t.speeds}>
            {([1, 4, 16] as const).map((item) => <button key={item} type="button" aria-pressed={speed === item} onClick={() => setSpeed(item)}>{item}×</button>)}
          </div>
          <div className="viewtoggle">
            <button type="button" aria-pressed={view === "map"} onClick={() => write({ view: undefined })}>{t.flat}</button>
            <button type="button" aria-pressed={view === "globe"} onClick={() => write({ view: "globe" })}>{t.globe}</button>
          </div>
          <p className="faint credit">{t.credit} <a href="https://mapterhorn.com/attribution">{t.terrain}</a></p>
        </div>
      </div>
    </div>
  )
}
