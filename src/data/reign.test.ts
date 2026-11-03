import assert from "node:assert/strict"
import { test } from "node:test"
import { eraFor } from "../lib/era.ts"
import { presentPolity } from "./reign.ts"

test("750 is Tang on the year bar and on the Sui snapshot", () => {
  assert.equal(eraFor(750, "zh"), "唐")
  const view = presentPolity("Sui Empire", 750)
  assert.equal(view?.hide, false)
  assert.equal(view?.zh, "唐")
  assert.equal(view?.en, "Tang")
  assert.equal(view?.dossier, "tang empire")
  assert.equal(view?.chapter, "tang")
})

test("Sui remains Sui before 618", () => {
  const view = presentPolity("Sui Empire", 600)
  assert.equal(view?.zh, "隋")
  assert.equal(view?.dossier, "sui empire")
})

test("Jin on the medieval snapshots is the Chinese Jin, not Jurchen Jin", () => {
  assert.equal(presentPolity("Jin", 300)?.zh, "西晋")
  assert.equal(presentPolity("Jin", 350)?.zh, "东晋")
  assert.notEqual(presentPolity("Jin", 350)?.dossier, "jin")
  assert.equal(presentPolity("Jin Empire", 520)?.zh, "梁")
  assert.equal(presentPolity("Toba Wei", 500)?.zh, "北魏")
  assert.equal(presentPolity("Toba Wei", 590)?.zh, "隋")
})

test("polities that had already fallen are hidden at 750", () => {
  for (const name of ["Koguryo", "Paekche", "Sasanian Empire", "Visigothic Kingdom"]) {
    assert.equal(presentPolity(name, 750)?.hide, true, name)
  }
  assert.equal(presentPolity("Koguryo", 600)?.zh, "高句丽")
  assert.equal(presentPolity("Göktürks", 620)?.zh, "突厥")
  assert.equal(presentPolity("Göktürks", 750)?.zh, "回鹘")
  assert.equal(presentPolity("Western Gokturk Khaganate", 750)?.zh, "突骑施")
  assert.equal(presentPolity("Uyghurs", 750)?.zh, "回鹘")
  assert.equal(presentPolity("Umayyad Caliphate", 750)?.zh, "阿拔斯")
  assert.equal(presentPolity("Umayyad Caliphate", 750)?.dossier, "abbasid caliphate")
})

test("later Chinese dynasties follow the selected year", () => {
  assert.equal(presentPolity("Han", 15)?.zh, "新")
  assert.equal(presentPolity("Han", 100)?.zh, "东汉")
  assert.equal(presentPolity("Han", 250)?.zh, "三国")
  assert.equal(presentPolity("Tang Empire", 920)?.zh, "五代")
  assert.equal(presentPolity("Song Empire", 1000)?.zh, "北宋")
  assert.equal(presentPolity("Song Empire", 1150)?.zh, "南宋")
  assert.equal(presentPolity("Liao", 1000)?.zh, "辽")
  assert.equal(presentPolity("Liao", 1200)?.zh, "金")
  assert.equal(presentPolity("Xixia", 1230)?.hide, true)
  assert.equal(presentPolity("Great Khanate", 1300)?.zh, "元")
  assert.equal(presentPolity("Great Khanate", 1400)?.zh, "明")
  assert.equal(presentPolity("Nan Chao", 1200)?.zh, "大理")
  assert.equal(presentPolity("Middag Kingdom", 1700)?.zh, "清")
  assert.equal(presentPolity("Manchu Empire", 1914)?.zh, "中华民国")
})

test("world realms follow the year, not the stale sheet", () => {
  assert.equal(presentPolity("Eastern Roman Empire", 750)?.zh, "拜占庭")
  assert.equal(presentPolity("Western Roman Empire", 450)?.zh, "西罗马帝国")
  assert.equal(presentPolity("Western Roman Empire", 480)?.hide, true)
  assert.equal(presentPolity("Parthian Empire", 300)?.zh, "萨珊")
  assert.equal(presentPolity("Parthian Empire", 300)?.dossier, "sasanian empire")
  assert.equal(presentPolity("Teotihuacan", 600)?.hide, true)
  assert.equal(presentPolity("Byzantine Empire", 1400)?.zh, "拜占庭")
  assert.equal(presentPolity("Byzantine Empire", 1460)?.hide, true)
  assert.equal(presentPolity("Fatimid Caliphate", 1000)?.zh, "法蒂玛")
  assert.equal(presentPolity("Fatimid Caliphate", 1200)?.zh, "阿尤布")
  assert.equal(presentPolity("Aztec Empire", 1519)?.zh, "阿兹特克")
  assert.equal(presentPolity("Aztec Empire", 1522)?.hide, true)
  assert.equal(presentPolity("Inca Empire", 1550)?.zh, "印加残部")
  assert.equal(presentPolity("Inca Empire", 1600)?.hide, true)
  assert.equal(presentPolity("Ghana", 1100)?.zh, "加纳王国")
  assert.equal(presentPolity("Ghana", 1960)?.zh, "加纳")
  assert.equal(presentPolity("Songhai", 1550)?.zh, "桑海帝国")
  assert.equal(presentPolity("Songhai", 1700)?.zh, "登迪")
  assert.equal(presentPolity("Mauryan Empire", -100)?.hide, true)
  assert.equal(presentPolity("Spain", 1600)?.zh, "西班牙")
  assert.equal(presentPolity("Spain", 1600)?.dossier, "spain")
  assert.equal(presentPolity("Carthage", -140)?.hide, true)
})

test("the year bar names the dynasty instead of leaving gaps or the wrong overlap", () => {
  assert.equal(eraFor(10, "zh"), "新")
  assert.equal(eraFor(585, "zh"), "南北朝 · 隋")
  assert.equal(eraFor(750, "zh"), "唐")
  assert.equal(eraFor(920, "zh"), "五代")
  assert.equal(eraFor(1275, "zh"), "南宋 · 元")
  assert.equal(eraFor(1400, "zh"), "明")
  assert.equal(eraFor(1644, "zh"), "明 · 清")
})
