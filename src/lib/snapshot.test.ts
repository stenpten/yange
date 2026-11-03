import assert from "node:assert/strict"
import { test } from "node:test"
import { chinaFileFor, ratioToYear, snapshotFor, yearToRatio } from "./snapshot.ts"

const snaps = [-123000, -300, 700, 800, 2010]

test("uses the latest snapshot at or before the year", () => {
  assert.equal(snapshotFor(750, snaps), 700)
  assert.equal(snapshotFor(800, snaps), 800)
  assert.equal(snapshotFor(700, snaps), 700)
})

test("years before the first snapshot stay on that snapshot", () => {
  assert.equal(snapshotFor(-130000, snaps), -123000)
})

test("china overlays follow display year, not the world snapshot", () => {
  const spans = [
    { file: "700", from: 618, to: 755 },
    { file: "800", from: 756, to: 907 },
  ]
  assert.equal(chinaFileFor(750, spans), "700")
  assert.equal(chinaFileFor(500, spans), null)
  assert.equal(chinaFileFor(1912, spans), null)
})

test("the year control keeps 750 away from the prehistoric end", () => {
  const ratio = yearToRatio(750, -123000, 2010)
  assert.ok(ratio > 0.5 && ratio < 0.7)
  assert.equal(ratioToYear(ratio, -123000, 2010), 750)
})
