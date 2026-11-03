export type Text = { zh: string; en: string }
export type Chapter = {
  slug: string
  group: "china" | "world"
  title: Text
  years: [number, number]
  year: number
  center: [number, number]
  zoom: number
  polityId?: string
  body: Text
}
export type HistEvent = {
  id: string
  year: number
  title: Text
  summary: Text
  chapterSlug: string
  polityId?: string
  lng: number
  lat: number
}
export type Regime = { id: string; zh: string; en: string; year: number; lng: number; lat: number }
