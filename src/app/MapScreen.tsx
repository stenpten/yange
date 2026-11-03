import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Map } from "maplibre-gl"
import { chapters, events } from "../data/content"
import type { ChinaSpan } from "../lib/snapshot"
import { chinaFileFor, ratioToYear, snapshotFor, yearToRatio } from "../lib/snapshot"
import { snapshotYears } from "../data/snapshots"
import { colorFor } from "../lib/color"
import { centroidOf, contains } from "../lib/geo"
import { eraFor } from "../lib/era"
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
  if (lang === "zh") return zh || "未定译名"
  return en
}

type Lexicon = Record<string, { zh: string; en: string }>
type Dossier = { spanZh: string; spanEn: string; capitalZh: string; capitalEn: string; bodyZh: string; bodyEn: string }

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

function displayZh(name: string, year: number, lexicon: Lexicon) {
  const key = name.toLowerCase()
  if (key === "nan chao" || key === "nan-zhao") return year >= 938 ? "大理" : "南诏"
  if (key === "song empire" && year >= 1127) return "南宋"
  if (key === "song empire" && year >= 960) return "北宋"
  if (key === "korea" && year >= 1392) return "朝鲜"
  if (key === "korea" && year >= 918) return "高丽"
  if (key === "korea") return "新罗"
  return lexicon[key]?.zh ?? ""
}

function decorate(fc: AtlasFC, lexicon: Lexicon, lang: "zh" | "en", year: number): AtlasFC {
  return {
    type: "FeatureCollection",
    features: fc.features.map((feature) => {
      const source = String(feature.properties.name ?? "")
      const zh = displayZh(source, year, lexicon)
      const en = lexicon[source.toLowerCase()]?.en ?? source
      const label = lang === "zh" ? zh : en
      return {
        ...feature,
        properties: {
          ...feature.properties,
          color: colorFor(String(feature.properties.id)),
          name_zh: zh,
          name_en: en,
          ...(label ? { label } : {}),
          area: Math.round(geomArea(feature.geometry)),
        },
      }
    }),
  }
}

export function MapScreen() {
  const { lang, t } = useCopy()
  const [params, setParams] = useSearchParams()
  const [snapshots, setSnapshots] = useState<number[]>(snapshotYears)
  const [spans, setSpans] = useState<ChinaSpan[]>([])
  const [lexicon, setLexicon] = useState<Lexicon>({})
  const [dossiers, setDossiers] = useState<Record<string, Dossier>>({})
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<1 | 4 | 16>(1)
  const [status, setStatus] = useState<string>(t.loading)
  const [visible, setVisible] = useState(0)
  const [railOpen, setRailOpen] = useState(false)
  const [data, setData] = useState<{ world: AtlasFC; china: AtlasFC }>({ world: empty, china: empty })
  const mapNode = useRef<HTMLDivElement>(null)
  const dataRef = useRef(data)
  const setParamsRef = useRef(setParams)
  dataRef.current = data
  setParamsRef.current = setParams
  const mapRef = useRef<Map | null>(null)
  const ready = useRef(false)
  const year = num(params.get("year"), 750)
  const lng = num(params.get("lng"), 105)
  const lat = num(params.get("lat"), 35)
  const zoom = num(params.get("z"), 3)
  const polity = params.get("polity") ?? ""
  const view = params.get("view") === "globe" ? "globe" : "map"
  const min = snapshots[0] ?? -123000
  const max = 2010
  const clamped = Math.min(max, Math.max(min, year))
  const snap = snapshotFor(clamped, snapshots)
  const chinaFile = chinaFileFor(clamped, spans)

  function write(next: Record<string, string | undefined>) {
    const updated = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (!value) updated.delete(key)
      else updated.set(key, value)
    }
    setParams(updated, { replace: true })
  }

  useEffect(() => {
    void Promise.all([
      fetch(asset("history/manifest.json")).then((res) => res.json()),
      fetch(asset("history/china-spans.json")).then((res) => res.json()),
    ]).then(([manifest, loadedSpans]: [{ snapshots: number[] }, ChinaSpan[]]) => {
      setSnapshots(manifest.snapshots)
      setSpans(loadedSpans)
    })
    void fetch(asset("history/labels.json")).then((res) => res.json()).then((data: Lexicon) => setLexicon(data)).catch(() => setLexicon({}))
    void fetch(asset("history/dossiers.json")).then((res) => res.json()).then((data: Record<string, Dossier>) => setDossiers(data)).catch(() => setDossiers({}))
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
      map.addSource("world", { type: "geojson", data: empty })
      map.addLayer({ id: "world", type: "fill", source: "world", paint: { "fill-color": ["get", "color"], "fill-opacity": ["interpolate", ["linear"], ["zoom"], 0.5, 0.64, 3, 0.5, 5, 0.46] } })
      map.addLayer({ id: "world-line", type: "line", source: "world", paint: { "line-color": "#241c16", "line-width": ["interpolate", ["linear"], ["zoom"], 0.8, 0.85, 3, 1.2, 6, 1.8], "line-opacity": 0.72 } })
      map.addLayer({
        id: "world-label",
        type: "symbol",
        source: "world",
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
          "text-opacity": ["step", ["zoom"], ["case", [">=", ["get", "area"], 70], 1, 0], 2, ["case", [">=", ["get", "area"], 22], 1, 0], 3.4, ["case", [">=", ["get", "area"], 8], 1, 0], 4.8, 1],
        },
      })
      map.addSource("select", { type: "geojson", data: empty })
      map.addLayer({ id: "select", type: "line", source: "select", paint: { "line-color": "#c44536", "line-width": 2.5 } })
      map.resize()
      if (!explicitView) {
        const narrow = window.innerWidth <= 800
        map.fitBounds([[-168, -56], [168, 74]], {
          padding: narrow ? { top: 12, bottom: 128, left: 12, right: 12 } : { top: 18, bottom: 18, left: 18, right: 400 },
          animate: false,
        })
        map.setMinZoom(map.getZoom())
      }
    })
    map.on("click", (event) => {
      const hits = map.queryRenderedFeatures(event.point, { layers: ["world"] })
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
      const features = [...(map.getSource("china") ? [] : []), ...dataRef.current.world.features, ...dataRef.current.china.features]
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
    if (!map || !ready.current) return
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
    if (!snapshots.length) return
    let cancel = false
    setStatus(t.loading)
    void (async () => {
      try {
        const worldRes = await fetch(asset(`history/world/${snap}.geojson`))
        if (!worldRes.ok) throw new Error("world")
        const world = await worldRes.json() as AtlasFC
        if (cancel) return
        setData({ world, china: empty })
        setStatus("")
      } catch {
        if (!cancel) setStatus(t.failed)
      }
    })()
    return () => { cancel = true }
  }, [snap, snapshots.length, t.loading, t.failed])

  const shown = useMemo(() => decorate(data.world, lexicon, lang, clamped), [data.world, lexicon, lang, clamped])

  useEffect(() => {
    const map = mapRef.current
    const put = () => (map?.getSource("world") as { setData(data: unknown): void } | undefined)?.setData(shown)
    if (map?.isStyleLoaded()) put()
    else map?.once("load", put)
  }, [shown])

  useEffect(() => {
    const features = shown.features.filter((feature) => String(feature.properties.id) === polity)
    const selected: AtlasFC = { type: "FeatureCollection", features }
    const map = mapRef.current
    const put = () => (map?.getSource("select") as { setData(data: unknown): void } | undefined)?.setData(selected)
    if (map?.isStyleLoaded()) put()
    else map?.once("load", put)
  }, [shown, polity])

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setParams((current) => {
        const now = num(current.get("year"), 750)
        const next = new URLSearchParams(current)
        if (now >= 2010) { setPlaying(false); next.set("year", "2010"); return next }
        next.set("year", String(now + 1))
        return next
      }, { replace: true })
    }, 280 / speed)
    return () => window.clearInterval(timer)
  }, [playing, speed, setParams])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return
      if (event.key === " ") { event.preventDefault(); setPlaying((value) => !value) }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault()
        const step = (event.shiftKey ? 10 : 1) * (event.key === "ArrowLeft" ? -1 : 1)
        write({ year: String(Math.min(2010, Math.max(min, clamped + step))) })
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const selected = useMemo(() => shown.features.find((feature) => String(feature.properties.id) === polity), [shown, polity])
  const shownEvents = events
    .filter((event) => {
      const sameSnap = snapshots.length ? snapshotFor(event.year, snapshots) === snap : false
      const sameChina = chinaFile !== null && chinaFileFor(event.year, spans) === chinaFile
      return sameSnap || sameChina
    })
    .sort((a, b) => a.year - b.year)
  const chapter = chapters.find((item) => item.polityId && item.polityId === polity)
  const dossier = selected ? dossiers[String(selected.properties.name ?? "").toLowerCase()] : undefined
  const polityEvents = events.filter((event) => {
    if (!selected) return false
    const id = String(selected.properties.id)
    if (event.polityId && (event.polityId === id || id.startsWith(`${event.polityId}-`) || event.polityId.startsWith(`${id}-`))) return true
    return contains(selected.geometry, event.lng, event.lat)
  }).sort((a, b) => a.year - b.year)
  const era = eraFor(clamped, lang)
  const sourceText = lang === "zh" ? (snap < 0 ? `前${-snap}年` : `${snap}年`) : (snap < 0 ? `${-snap} BCE` : `${snap} CE`)

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
              <p className="eyebrow">{era ? `${era} · ${sourceText}` : sourceText}</p>
              <h2>{labelOf(selected, lang)}</h2>
              {lang === "en" ? <p className="alias">{String(selected.properties.name_zh || selected.properties.name || "")}</p> : null}
              {dossier ? (
                <dl className="meta">
                  <dt>{t.span}</dt><dd>{lang === "zh" ? dossier.spanZh : dossier.spanEn}</dd>
                  <dt>{t.capital}</dt><dd>{lang === "zh" ? dossier.capitalZh : dossier.capitalEn}</dd>
                </dl>
              ) : <p className="note">{t.scopeNote}</p>}
              {dossier ? <div className="dossier">{(lang === "zh" ? dossier.bodyZh : dossier.bodyEn).split("\n\n").map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}</div> : null}
              <h3>{t.related}</h3>
              {polityEvents.length === 0 ? <p className="muted">{t.noEvents}</p> : polityEvents.map((event) => (
                <div className="event" key={event.id}>
                  <button className="event-hit" type="button" onClick={() => write({ year: String(event.year), lng: String(event.lng), lat: String(event.lat), z: "4", polity: event.polityId })}>
                    <span className="num">{event.year}</span>
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
                    <span className="num">{event.year}</span>
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
                    <span className="num">{event.year}</span>
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
          <span className="year-num">{clamped}</span>
          {era ? <span>{era}</span> : null}
          {snap !== clamped ? <span className="faint">{t.source} {sourceText}</span> : null}
          <span className="faint">{t.visible} {visible}</span>
        </div>
        <input aria-label={t.source} type="range" min={0} max={1000} value={Math.round(yearToRatio(clamped, min, max) * 1000)} onChange={(event) => write({ year: String(ratioToYear(Number(event.target.value) / 1000, min, max)) })} />
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
