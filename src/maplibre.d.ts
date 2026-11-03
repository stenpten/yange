export class Map {
  constructor(options: unknown)
  on(type: string, handler: (event: { point: unknown }) => void): void
  once(type: string, handler: () => void): void
  addSource(id: string, source: unknown): void
  addLayer(layer: unknown): void
  getSource(id: string): { setData(data: unknown): void } | undefined
  getCenter(): { lng: number; lat: number }
  getZoom(): number
  getBounds(): { getWest(): number; getEast(): number; getSouth(): number; getNorth(): number }
  jumpTo(options: unknown): void
  setProjection(projection: unknown): void
  dragRotate: { enable(): void; disable(): void }
  queryRenderedFeatures(point: unknown, options: unknown): Array<{ layer: { id: string }; properties?: Record<string, unknown> }>
  resize(): void
  remove(): void
  isStyleLoaded(): boolean
}
declare const maplibregl: { Map: typeof Map }
export default maplibregl
