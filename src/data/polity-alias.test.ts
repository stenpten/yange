import assert from "node:assert/strict"
import { test } from "node:test"
import { aliasFor } from "./polity-alias.ts"

test("750 names the regimes that actually exist then", () => {
  assert.equal(aliasFor("Tang Dynasty", 750)?.zh, "唐")
  assert.equal(aliasFor("Uyghur Khaganate", 750)?.zh, "回鹘")
  assert.equal(aliasFor("Abbasid Caliphate", 750)?.zh, "阿拔斯")
  assert.equal(aliasFor("Goguryeo", 600)?.zh, "高句丽")
})

test("Wei, Shu and Wu stay separate from the Warring States", () => {
  assert.equal(aliasFor("Cao Wei", 250)?.zh, "魏")
  assert.equal(aliasFor("Shu Han", 250)?.zh, "蜀")
  assert.equal(aliasFor("Eastern Wu", 250)?.zh, "吴")
  assert.equal(aliasFor("Wei", -300)?.zh, "魏")
  assert.equal(aliasFor("Wei", -300)?.dossier, "zhou")
})

test("Jin the state is not Jurchen Jin, and Great Jin is", () => {
  assert.equal(aliasFor("Jin", -600)?.zh, "晋")
  assert.notEqual(aliasFor("Jin", -600)?.dossier, "jin")
  assert.equal(aliasFor("Great Jin", 1200)?.zh, "金")
  assert.equal(aliasFor("Great Jin", 1200)?.dossier, "jin")
  assert.equal(aliasFor("Later Jin", 940)?.zh, "后晋")
})

test("Five Dynasties and Ten Kingdoms use their own names", () => {
  assert.equal(aliasFor("Later Liang Dynasty", 920)?.zh, "后梁")
  assert.equal(aliasFor("Former Shu", 920)?.zh, "前蜀")
  assert.equal(aliasFor("Wuyue", 950)?.zh, "吴越")
  assert.equal(aliasFor("Later Zhou", 960)?.zh, "后周")
  assert.equal(aliasFor("Later Zhou", -400)?.zh, "周")
})

test("Taiwan and the mainland read as China, not as a foreign state", () => {
  assert.equal(aliasFor("Chinese Taiwan", 1895)?.zh, "中国")
  assert.equal(aliasFor("Republic of China", 1937)?.zh, "中华民国")
  assert.equal(aliasFor("Republic of China", 2020)?.zh, "中国")
  assert.equal(aliasFor("People's Republic of China", 2020)?.zh, "中国")
  assert.equal(aliasFor("People's Republic of China", 2020)?.dossier, "china")
})
