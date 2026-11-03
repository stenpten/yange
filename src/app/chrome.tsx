import { useEffect, useMemo, useState } from "react"
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { chapters, events, nameDict, regimes } from "../data/content"
import { ui, type Lang } from "../data/i18n"

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

type NameEntry = { name: string; id: string; years: number[]; lng: number; lat: number }
type Hit = { id: string; label: string; detail: string; year: number; lng: number; lat: number; zoom: number; polity?: string; path?: string }

function useLang(): Lang {
  const { lang } = useParams()
  return lang === "en" ? "en" : "zh"
}

export function useCopy() {
  const lang = useLang()
  return { lang, t: ui[lang] }
}

function closest(years: number[], target: number) {
  return years.reduce((best, year) => (Math.abs(year - target) < Math.abs(best - target) ? year : best))
}

export function TopBar() {
  const { lang, t } = useCopy()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [names, setNames] = useState<NameEntry[]>([])
  const [active, setActive] = useState(0)
  const onMap = location.pathname === `/${lang}`

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en"
    localStorage.setItem("yange-lang", lang)
  }, [lang])

  useEffect(() => {
    void fetch(asset("history/names.json"))
      .then((res) => res.json())
      .then((data: NameEntry[]) => setNames(data))
      .catch(() => setNames([]))
  }, [])

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const found: Hit[] = []
    for (const regime of regimes) {
      const label = lang === "zh" ? regime.zh : regime.en
      if (`${regime.zh} ${regime.en}`.toLowerCase().includes(q)) {
        found.push({ id: `r-${regime.id}`, label, detail: String(regime.year), year: regime.year, lng: regime.lng, lat: regime.lat, zoom: 3.4, polity: regime.id })
      }
    }
    for (const chapter of chapters) {
      const label = chapter.title[lang]
      if (`${chapter.title.zh} ${chapter.title.en}`.toLowerCase().includes(q)) {
        found.push({ id: `c-${chapter.slug}`, label, detail: t.chapters, year: chapter.year, lng: chapter.center[0], lat: chapter.center[1], zoom: chapter.zoom, polity: chapter.polityId, path: `/${lang}/chapters/${chapter.slug}` })
      }
    }
    for (const event of events) {
      const label = event.title[lang]
      if (`${event.title.zh} ${event.title.en}`.toLowerCase().includes(q)) {
        found.push({ id: `e-${event.id}`, label, detail: String(event.year), year: event.year, lng: event.lng, lat: event.lat, zoom: 4, polity: event.polityId })
      }
    }
    for (const entry of names) {
      const dict = nameDict[entry.name.toLowerCase()]
      const label = dict ? dict[lang] : entry.name
      const hay = `${entry.name} ${dict?.zh ?? ""} ${dict?.en ?? ""}`.toLowerCase()
      if (hay.includes(q)) {
        found.push({ id: `n-${entry.id}-${entry.name}`, label, detail: entry.name, year: closest(entry.years, 750), lng: entry.lng, lat: entry.lat, zoom: 3.2, polity: entry.id })
      }
    }
    return found.slice(0, 8)
  }, [query, names, lang, t.chapters])

  function goLang(next: Lang) {
    const path = location.pathname.replace(`/${lang}`, `/${next}`)
    navigate(`${path}${location.search}`)
    setOpen(false)
  }

  function choose(hit: Hit) {
    if (hit.path) navigate(hit.path)
    else {
      const params = new URLSearchParams({ year: String(hit.year), lng: String(hit.lng), lat: String(hit.lat), z: String(hit.zoom) })
      if (hit.polity) params.set("polity", hit.polity)
      navigate(`/${lang}?${params}`)
    }
    setQuery("")
    setOpen(false)
  }

  const mapCurrent = onMap ? "page" : undefined
  const chapterCurrent = location.pathname.includes("/chapters") ? "page" : undefined

  return (
    <header className={open ? "topbar menu-open" : "topbar"}>
      <a className="brand" href={`${import.meta.env.BASE_URL}${lang}`}>沿革</a>
      <button className="menu" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{t.menu}</button>
      <nav className="nav">
        <NavLink to={`/${lang}${location.search}`} aria-current={mapCurrent}>{t.map}</NavLink>
        <NavLink to={`/${lang}/chapters`} aria-current={chapterCurrent}>{t.chapters}</NavLink>
      </nav>
      <form className="search" role="search" onSubmit={(event) => { event.preventDefault(); if (hits[active]) choose(hits[active]) }}>
        <input aria-label={t.search} placeholder={t.search} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0) }} onKeyDown={(event) => {
          if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(hits.length - 1, value + 1)) }
          if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(0, value - 1)) }
          if (event.key === "Escape") setQuery("")
        }} />
        {query && (
          <div className="results">
            {hits.length === 0 ? <p className="faint" style={{ padding: 12 }}>{t.noResults}</p> : hits.map((hit, index) => (
              <button key={hit.id} type="button" aria-selected={index === active} onMouseDown={(event) => { event.preventDefault(); choose(hit) }}>{hit.label}<span className="faint"> {hit.detail}</span></button>
            ))}
          </div>
        )}
      </form>
      <div className="lang">
        <button type="button" aria-pressed={lang === "zh"} onClick={() => goLang("zh")}>中文</button>
        <button type="button" aria-pressed={lang === "en"} onClick={() => goLang("en")}>English</button>
      </div>
    </header>
  )
}
