import { useMemo, useState } from "react"
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom"
import { chapters, events } from "../data/content"
import { useCopy } from "./chrome"

export function ChapterList() {
  const { lang, t } = useCopy()
  const [params] = useSearchParams()
  const initial = params.get("filter") === "events" ? "events" : params.get("filter") === "world" ? "world" : "china"
  const [filter, setFilter] = useState<"china" | "world" | "events">(initial)
  const chinaCount = chapters.filter((chapter) => chapter.group === "china").length
  const worldCount = chapters.filter((chapter) => chapter.group === "world").length
  const rows = useMemo(() => {
    if (filter === "events") return events
    return chapters.filter((chapter) => chapter.group === filter)
  }, [filter])

  return (
    <main className="reading">
      <div className="column">
        <h1>{t.chapters}</h1>
        <div className="filters">
          <button className={filter === "china" ? "filter on" : "filter"} type="button" onClick={() => setFilter("china")}><span>{t.china}</span><strong>{chinaCount}</strong></button>
          <button className={filter === "world" ? "filter on" : "filter"} type="button" onClick={() => setFilter("world")}><span>{t.world}</span><strong>{worldCount}</strong></button>
          <button className={filter === "events" ? "filter on" : "filter"} type="button" onClick={() => setFilter("events")}><span>{t.events}</span><strong>{events.length}</strong></button>
        </div>
        <div className="list">
          {filter === "events"
            ? events.map((event) => (
              <Link className="row" key={event.id} to={`/${lang}?year=${event.year}&lng=${event.lng}&lat=${event.lat}&z=4${event.polityId ? `&polity=${event.polityId}` : ""}`}>
                <b>{event.title[lang]}</b>
                <span className="num">{event.year}</span>
              </Link>
            ))
            : rows.map((chapter) => {
              const item = chapter as (typeof chapters)[number]
              return (
                <Link className="row" key={item.slug} to={`/${lang}/chapters/${item.slug}`}>
                  <b>{item.title[lang]}</b>
                  <span className="num">{item.years[0]} – {item.years[1]}</span>
                </Link>
              )
            })}
        </div>
      </div>
    </main>
  )
}

export function ChapterPage() {
  const { lang, t } = useCopy()
  const { slug } = useParams()
  const chapter = chapters.find((item) => item.slug === slug)
  if (!chapter) return <Navigate to={`/${lang}/chapters`} replace />
  const related = events.filter((event) => event.chapterSlug === chapter.slug)
  const params = new URLSearchParams({ year: String(chapter.year), lng: String(chapter.center[0]), lat: String(chapter.center[1]), z: String(chapter.zoom) })
  if (chapter.polityId) params.set("polity", chapter.polityId)
  return (
    <main className="reading">
      <div className="column">
        <h1>{chapter.title[lang]}</h1>
        <p className="muted">{chapter.years[0]} – {chapter.years[1]}</p>
        <Link className="openmap" to={`/${lang}?${params}`}>{t.openMap}</Link>
        <div className="prose">
          {chapter.body[lang].split("\n").filter(Boolean).map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
        </div>
        <h2>{t.events}</h2>
        {related.map((event) => (
          <div className="event" key={event.id}>
            <Link to={`/${lang}?year=${event.year}&lng=${event.lng}&lat=${event.lat}&z=4${event.polityId ? `&polity=${event.polityId}` : ""}`}><b>{event.title[lang]}</b> <span className="num">{event.year}</span></Link>
            <p className="muted">{event.summary[lang]}</p>
          </div>
        ))}
        <p className="faint">{t.credit}</p>
      </div>
    </main>
  )
}
