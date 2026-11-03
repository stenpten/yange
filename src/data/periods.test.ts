import assert from "node:assert/strict"
import { test } from "node:test"
import { fiveLabel, threeLabel } from "./periods.ts"

test("three kingdoms are named separately and then change", () => {
  assert.equal(threeLabel("wei", 250)?.zh, "魏")
  assert.equal(threeLabel("shu", 250)?.zh, "蜀")
  assert.equal(threeLabel("wu", 250)?.zh, "吴")
  assert.equal(threeLabel("shu", 265), null)
  assert.equal(threeLabel("wei", 270)?.zh, "西晋")
  assert.equal(threeLabel("wu", 270)?.zh, "吴")
})

test("five dynasties and ten kingdoms are named by year", () => {
  assert.equal(fiveLabel("zhongyuan", 910)?.zh, "后梁")
  assert.equal(fiveLabel("hedong", 910)?.zh, "晋")
  assert.equal(fiveLabel("shu", 910)?.zh, "前蜀")
  assert.equal(fiveLabel("jiangnan", 910)?.zh, "吴")
  assert.equal(fiveLabel("wuyue", 950)?.zh, "吴越")
  assert.equal(fiveLabel("jiangnan", 950)?.zh, "南唐")
  assert.equal(fiveLabel("nanhai", 950)?.zh, "南汉")
  assert.equal(fiveLabel("hedong", 960)?.zh, "北汉")
  assert.equal(fiveLabel("zhongyuan", 970)?.zh, "北宋")
  assert.equal(fiveLabel("wuyue", 970)?.zh, "吴越")
})
