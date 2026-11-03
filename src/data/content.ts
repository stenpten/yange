import { chinaA } from "./china-a"
import { chinaB } from "./china-b"
import { eventsA } from "./events-a"
import { eventsB } from "./events-b"
import { nameDict, regimes } from "./names"
import { worldA } from "./world-a"
import { worldB } from "./world-b"
export type { Chapter, HistEvent, Regime, Text } from "./types"
export { nameDict, regimes }
export const chapters = [...chinaA, ...chinaB, ...worldA, ...worldB]
export const events = [...eventsA, ...eventsB]
