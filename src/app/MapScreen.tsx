import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Map } from "maplibre-gl"
import { chapters, events, nameDict } from "../data/content"
import type { ChinaSpan } from "../lib/snapshot"
import { chinaFileFor, ratioToYear, snapshotFor, yearToRatio } from "../lib/snapshot"
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
  if (feature.properties.name_zh) return lang === "zh" ? String(feature.properties.name_zh) : String(feature.properties.name_en)
  const source = String(feature.properties.name ?? "")
  const dict = nameDict[source.toLowerCase()]
  return dict ? dict[lang] : source
}

function paint(fc: AtlasFC): AtlasFC {
  return {
    type: "FeatureCollection",
    features: fc.features.map((feature) => ({
      ...feature,
      properties: { ...feature.properties, color: colorFor(String(feature.properties.id)) },
    })),
  }
}

function hideCovered(world: AtlasFC, china: AtlasFC): AtlasFC {
  if (!china.features.length) return world
  return {
    type: "FeatureCollection",
    features: world.features.filter((feature) => {
      const [lng, lat] = centroidOf(feature.geometry)
      return !china.features.some((item) => contains(item.geometry, lng, lat))
    }),
  }
}

export function MapScreen() {
  const { lang, t } = useCopy()
  const [params, setParams] = useSearchParams()
  const [snapshots, setSnapshots] = useState<number[]>([])
  const [spans, setSpans] = useState<ChinaSpan[]>([])
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
  }, [])

  useEffect(() => {
    if (!mapNode.current || mapRef.current) return
    const map = new Map({
      container: mapNode.current,
      style: { version: 8, sources: {}, layers: [{ id: "bg", type: "background", paint: { "background-color": "#071828" } }] },
      center: [lng, lat],
      zoom,
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
      map.addSource("china", { type: "geojson", data: empty })
      map.addLayer({ id: "china", type: "fill", source: "china", paint: { "fill-color": ["get", "color"], "fill-opacity": ["interpolate", ["linear"], ["zoom"], 0.5, 0.7, 3, 0.58, 5, 0.52] } })
      map.addLayer({ id: "world-line", type: "line", source: "world", paint: { "line-color": ["get", "color"], "line-width": ["interpolate", ["linear"], ["zoom"], 0.5, 0.35, 3, 0.8, 5, 1.15], "line-opacity": 0.9 } })
      map.addLayer({ id: "china-line", type: "line", source: "china", paint: { "line-color": ["get", "color"], "line-width": ["interpolate", ["linear"], ["zoom"], 0.5, 0.45, 3, 1, 5, 1.35], "line-opacity": 0.95 } })
      map.addSource("select", { type: "geojson", data: empty })
      map.addLayer({ id: "select", type: "line", source: "select", paint: { "line-color": "#c44536", "line-width": 2.5 } })
      map.resize()
    })
    map.on("click", (event) => {
      const hits = map.queryRenderedFeatures(event.point, { layers: ["china", "world"] })
      const hit = hits.find((item) => item.layer.id === "china") ?? hits[0]
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
        const world = paint(await worldRes.json() as AtlasFC)
        let china = empty
        if (chinaFile) {
          const chinaRes = await fetch(asset(`history/china/${chinaFile}.geojson`))
          if (chinaRes.ok) china = paint(await chinaRes.json() as AtlasFC)
        }
        const visibleWorld = hideCovered(world, china)
        if (cancel) return
        setData({ world: visibleWorld, china })
        setStatus("")
        const map = mapRef.current
        const put = () => {
          ;(map?.getSource("world") as { setData(data: unknown): void } | undefined)?.setData(visibleWorld)
          ;(map?.getSource("china") as { setData(data: unknown): void } | undefined)?.setData(china)
        }
        if (map?.isStyleLoaded()) put()
        else map?.once("load", put)
      } catch {
        if (!cancel) setStatus(t.failed)
      }
    })()
    return () => { cancel = true }
  }, [snap, chinaFile, snapshots.length, t.loading, t.failed])

  useEffect(() => {
    const features = [...data.china.features, ...data.world.features].filter((feature) => String(feature.properties.id) === polity)
    const selected: AtlasFC = { type: "FeatureCollection", features }
    const map = mapRef.current
    const put = () => (map?.getSource("select") as { setData(data: unknown): void } | undefined)?.setData(selected)
    if (map?.isStyleLoaded()) put()
    else map?.once("load", put)
  }, [data, polity])

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

  const selected = useMemo(() => [...data.china.features, ...data.world.features].find((feature) => String(feature.properties.id) === polity), [data, polity])
  const shownEvents = events
    .filter((event) => {
      const sameSnap = snapshots.length ? snapshotFor(event.year, snapshots) === snap : false
      const sameChina = chinaFile !== null && chinaFileFor(event.year, spans) === chinaFile
      return sameSnap || sameChina
    })
    .sort((a, b) => Math.abs(a.year - clamped) - Math.abs(b.year - clamped))
    .slice(0, 6)
  const chapter = chapters.find((item) => item.polityId && item.polityId === polity)
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
              <p className="alias">{selected.properties.name_zh ? (lang === "zh" ? selected.properties.name_en : selected.properties.name_zh) : selected.properties.name}</p>
              {selected.properties.note_zh ? <p className="note">{lang === "zh" ? selected.properties.note_zh : selected.properties.note_en}</p> : null}
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
              <p><Link to={`/${lang}/chapters?filter=events`}>{t.allEvents}</Link></p>
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
