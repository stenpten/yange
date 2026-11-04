const eras: Array<[number, number, string, string]> = [
  [-221, -207, "秦", "Qin"],
  [-206, -202, "楚汉", "Chu-Han"],
  [-202, 8, "西汉", "Western Han"],
  [9, 23, "新", "Xin"],
  [25, 219, "东汉", "Eastern Han"],
  [220, 280, "三国", "Three Kingdoms"],
  [266, 316, "西晋", "Western Jin"],
  [317, 420, "东晋", "Eastern Jin"],
  [420, 589, "南北朝", "Northern and Southern dynasties"],
  [581, 618, "隋", "Sui"],
  [618, 906, "唐", "Tang"],
  [907, 959, "五代", "Five Dynasties"],
  [960, 1126, "北宋", "Northern Song"],
  [1127, 1279, "南宋", "Southern Song"],
  [1271, 1367, "元", "Yuan"],
  [1368, 1644, "明", "Ming"],
  [1644, 1911, "清", "Qing"],
  [1912, 1949, "中华民国", "Republican China"],
  [1949, 2024, "中华人民共和国", "People's Republic of China"],
]

export function eraFor(year: number, lang: "zh" | "en"): string | null {
  const found = eras.filter(([from, to]) => year >= from && year <= to)
  if (!found.length) return null
  return found.map((item) => item[lang === "zh" ? 2 : 3]).join(" · ")
}

export function yearText(year: number, lang: "zh" | "en"): string {
  if (year < 0) return lang === "zh" ? `前${-year}` : `${-year} BCE`
  return String(year)
}
