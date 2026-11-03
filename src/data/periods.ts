export type PieceLabel = { zh: string; en: string; dossier: string; chapter?: string }

export function threeLabel(id: string, year: number): PieceLabel | null {
  if (id === "shu") {
    if (year >= 264) return null
    return { zh: "蜀", en: "Shu Han", dossier: "shu han", chapter: "three-kingdoms" }
  }
  if (id === "wu") {
    if (year >= 280) return null
    return { zh: "吴", en: "Eastern Wu", dossier: "eastern wu", chapter: "three-kingdoms" }
  }
  if (id === "wei") {
    if (year >= 266) return { zh: "西晋", en: "Western Jin", dossier: "western jin", chapter: "northern-southern" }
    return { zh: "魏", en: "Cao Wei", dossier: "cao wei", chapter: "three-kingdoms" }
  }
  return null
}

export function fiveLabel(id: string, year: number): PieceLabel | null {
  if (year < 907 || year > 979) return null
  if (id === "hedong") {
    if (year < 923) return { zh: "晋", en: "Jin of Hedong", dossier: "later tang" }
    if (year < 936) return { zh: "后唐", en: "Later Tang", dossier: "later tang" }
    if (year < 947) return { zh: "后晋", en: "Later Jin", dossier: "later jin" }
    if (year < 951) return { zh: "后汉", en: "Later Han", dossier: "later han" }
    return { zh: "北汉", en: "Northern Han", dossier: "northern han" }
  }
  if (id === "zhongyuan" || id === "guanzhong") {
    if (year < 923) return { zh: "后梁", en: "Later Liang", dossier: "later liang" }
    if (year < 936) return { zh: "后唐", en: "Later Tang", dossier: "later tang" }
    if (year < 947) return { zh: "后晋", en: "Later Jin", dossier: "later jin" }
    if (year < 951) return { zh: "后汉", en: "Later Han", dossier: "later han" }
    if (year < 960) return { zh: "后周", en: "Later Zhou", dossier: "later zhou" }
    return { zh: "北宋", en: "Northern Song", dossier: "song empire", chapter: "song-liao-xia-jin" }
  }
  if (id === "shu") {
    if (year < 925) return { zh: "前蜀", en: "Former Shu", dossier: "former shu" }
    if (year < 934) return { zh: "后唐", en: "Later Tang", dossier: "later tang" }
    if (year < 965) return { zh: "后蜀", en: "Later Shu", dossier: "later shu" }
    return { zh: "北宋", en: "Northern Song", dossier: "song empire", chapter: "song-liao-xia-jin" }
  }
  if (id === "jingnan") {
    if (year < 963) return { zh: "荆南", en: "Jingnan", dossier: "jingnan" }
    return { zh: "北宋", en: "Northern Song", dossier: "song empire", chapter: "song-liao-xia-jin" }
  }
  if (id === "chu") {
    if (year < 951) return { zh: "楚", en: "Chu", dossier: "chu kingdom" }
    if (year < 963) return { zh: "南唐", en: "Southern Tang", dossier: "southern tang" }
    return { zh: "北宋", en: "Northern Song", dossier: "song empire", chapter: "song-liao-xia-jin" }
  }
  if (id === "jiangnan") {
    if (year < 937) return { zh: "吴", en: "Wu", dossier: "wu kingdom" }
    if (year < 975) return { zh: "南唐", en: "Southern Tang", dossier: "southern tang" }
    return { zh: "北宋", en: "Northern Song", dossier: "song empire", chapter: "song-liao-xia-jin" }
  }
  if (id === "wuyue") {
    if (year < 978) return { zh: "吴越", en: "Wuyue", dossier: "wuyue" }
    return { zh: "北宋", en: "Northern Song", dossier: "song empire", chapter: "song-liao-xia-jin" }
  }
  if (id === "min") {
    if (year < 945) return { zh: "闽", en: "Min", dossier: "min kingdom" }
    if (year < 975) return { zh: "南唐", en: "Southern Tang", dossier: "southern tang" }
    return { zh: "北宋", en: "Northern Song", dossier: "song empire", chapter: "song-liao-xia-jin" }
  }
  if (id === "nanhai") {
    if (year < 971) return { zh: "南汉", en: "Southern Han", dossier: "southern han" }
    return { zh: "北宋", en: "Northern Song", dossier: "song empire", chapter: "song-liao-xia-jin" }
  }
  return null
}

export function pieceLabel(file: string, id: string, year: number): PieceLabel | null {
  if (file === "200") return threeLabel(id, year)
  if (file === "910") return fiveLabel(id, year)
  return null
}

export const UMBRELLA = new Set([
  "han",
  "han empire",
  "sui empire",
  "tang empire",
  "song empire",
  "qin",
])
