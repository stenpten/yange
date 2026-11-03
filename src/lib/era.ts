const eras: Array<[number, number, string, string]> = [
  [-221, -207, "秦", "Qin"],
  [-202, 8, "西汉", "Western Han"],
  [25, 220, "东汉", "Eastern Han"],
  [220, 280, "三国", "Three Kingdoms"],
  [281, 419, "晋", "Jin"],
  [420, 589, "南北朝", "Northern and Southern dynasties"],
  [581, 618, "隋", "Sui"],
  [618, 907, "唐", "Tang"],
  [960, 1126, "北宋", "Northern Song"],
  [1127, 1279, "南宋", "Southern Song"],
  [1271, 1368, "元", "Yuan"],
  [1368, 1644, "明", "Ming"],
  [1644, 1911, "清", "Qing"],
  [1912, 1949, "民国", "Republican China"],
]

export function eraFor(year: number, lang: "zh" | "en"): string | null {
  const found = eras.find(([from, to]) => year >= from && year <= to)
  if (!found) return null
  return lang === "zh" ? found[2] : found[3]
}
