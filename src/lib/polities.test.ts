import assert from "node:assert/strict"
import { test } from "node:test"
import { activeFeatures, bucketFor } from "./polities.ts"

test("century buckets follow the displayed year", () => {
  assert.equal(bucketFor(750), 7)
  assert.equal(bucketFor(700), 7)
  assert.equal(bucketFor(-1), -1)
  assert.equal(bucketFor(-100), -1)
  assert.equal(bucketFor(-101), -2)
  assert.equal(bucketFor(2024), 20)
})

test("a year uses only the slice that contains it", () => {
  const features = [
    { properties: { from: 224, to: 262, name: "Shu Han" } },
    { properties: { from: 263, to: 264, name: "Cao Wei" } },
    { properties: { from: 750, to: 754, name: "Tang Dynasty" } },
    { properties: { from: 700, to: 749, name: "Tang Dynasty" } },
  ]
  assert.deepEqual(activeFeatures(features, 250).map((feature) => feature.properties.name), ["Shu Han"])
  assert.deepEqual(activeFeatures(features, 750).map((feature) => feature.properties.name), ["Tang Dynasty"])
  assert.equal(activeFeatures(features, 755).length, 0)
})
