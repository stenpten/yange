const palette = [
  "#6e7f5a",
  "#4f6d7a",
  "#a6844a",
  "#7a5b6e",
  "#5c6b4a",
  "#8d5a4a",
  "#3f6f6a",
  "#9a7044",
  "#6a5878",
  "#4e5e4a",
  "#7d4e3a",
  "#5a6a7a",
]

export function colorFor(id: string): string {
  let hash = 0
  for (const char of id) hash = (Math.imul(hash, 31) + char.charCodeAt(0)) >>> 0
  return palette[hash % palette.length]
}
