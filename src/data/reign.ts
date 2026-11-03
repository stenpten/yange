export type ReignView = {
  hide: boolean
  zh: string
  en: string
  dossier: string
  chapter?: string
}

function show(zh: string, en: string, dossier: string, chapter?: string): ReignView {
  return chapter ? { hide: false, zh, en, dossier, chapter } : { hide: false, zh, en, dossier }
}

function hide(): ReignView {
  return { hide: true, zh: "", en: "", dossier: "" }
}

function plain(name: string) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const qin = () => show("秦", "Qin", "qin", "qin")
const chuHan = () => show("楚汉", "Chu-Han contention", "chu han")
const westernHan = () => show("西汉", "Western Han", "han empire", "western-han")
const xin = () => show("新", "Xin", "xin", "western-han")
const easternHan = () => show("东汉", "Eastern Han", "han", "eastern-han")
const three = () => show("三国", "Three Kingdoms", "three kingdoms", "three-kingdoms")
const westernJin = () => show("西晋", "Western Jin", "western jin", "northern-southern")
const easternJin = () => show("东晋", "Eastern Jin", "eastern jin", "northern-southern")
const sui = () => show("隋", "Sui", "sui empire", "sui")
const tang = () => show("唐", "Tang", "tang empire", "tang")
const five = () => show("五代", "Five Dynasties", "five dynasties", "song-liao-xia-jin")
const northernSong = () => show("北宋", "Northern Song", "song empire", "song-liao-xia-jin")
const southernSong = () => show("南宋", "Southern Song", "song empire", "song-liao-xia-jin")
const mongol = () => show("蒙古", "Mongol Empire", "mongol empire", "mongol")
const yuan = () => show("元", "Yuan", "great khanate", "yuan")
const ming = () => show("明", "Ming", "ming", "ming")
const qing = () => show("清", "Qing", "qing empire", "qing")
const republic = () => show("中华民国", "Republic of China", "republic", "republic")
const prc = () => show("中国", "China", "china")
const liao = () => show("辽", "Liao", "liao", "song-liao-xia-jin")
const jurchen = () => show("金", "Jin", "jin", "song-liao-xia-jin")

function southCourt(year: number): ReignView {
  if (year <= 316) return westernJin()
  if (year <= 420) return easternJin()
  if (year <= 479) return show("刘宋", "Liu Song", "southern dynasties", "northern-southern")
  if (year <= 501) return show("南齐", "Southern Qi", "southern dynasties", "northern-southern")
  if (year <= 556) return show("梁", "Liang", "southern dynasties", "northern-southern")
  if (year <= 589) return show("陈", "Chen", "southern dynasties", "northern-southern")
  return sui()
}

function northCourt(year: number): ReignView {
  if (year <= 533) return show("北魏", "Northern Wei", "northern wei", "northern-southern")
  if (year <= 549) return show("东魏·西魏", "Eastern and Western Wei", "northern dynasties", "northern-southern")
  if (year <= 556) return show("北齐·西魏", "Northern Qi and Western Wei", "northern dynasties", "northern-southern")
  if (year <= 576) return show("北齐·北周", "Northern Qi and Northern Zhou", "northern dynasties", "northern-southern")
  if (year <= 580) return show("北周", "Northern Zhou", "northern dynasties", "northern-southern")
  return sui()
}

function tangOrAfter(year: number): ReignView {
  if (year <= 906) return tang()
  if (year <= 959) return five()
  if (year <= 1126) return northernSong()
  if (year <= 1279) return southernSong()
  if (year <= 1367) return yuan()
  if (year <= 1643) return ming()
  if (year <= 1911) return qing()
  if (year <= 1949) return republic()
  return prc()
}

function afterHan(year: number): ReignView {
  if (year <= 8) return westernHan()
  if (year <= 23) return xin()
  if (year <= 219) return easternHan()
  if (year <= 280) return three()
  if (year <= 316) return westernJin()
  if (year <= 420) return easternJin()
  if (year <= 580) return southCourt(year)
  if (year < 618) return sui()
  return tangOrAfter(year)
}

function afterLiao(year: number): ReignView {
  if (year <= 1125) return liao()
  if (year <= 1234) return jurchen()
  if (year < 1271) return mongol()
  if (year <= 1367) return yuan()
  if (year <= 1643) return ming()
  if (year <= 1911) return qing()
  if (year <= 1949) return republic()
  return prc()
}

function modernChina(year: number): ReignView {
  if (year <= 1911) return qing()
  if (year <= 1949) return republic()
  return prc()
}

function taiwanName(year: number): ReignView {
  if (year >= 1945) return prc()
  if (year >= 1895) return show("中国台湾（日本占据）", "Taiwan under Japanese occupation", "taiwan occupied")
  if (year >= 1684) return qing()
  if (year >= 1662) return show("明郑", "Zheng regime", "tungning", "qing")
  if (year >= 1368) return ming()
  if (year >= 1271) return yuan()
  if (year >= 960) return year >= 1127 ? southernSong() : northernSong()
  if (year >= 618) return tang()
  return show("中国", "China", "china")
}

function steppeTurks(year: number): ReignView {
  if (year <= 630) return show("突厥", "Turkic Khaganate", "gokturks")
  if (year < 682) return hide()
  if (year <= 744) return show("后突厥", "Second Turkic Khaganate", "gokturks")
  return hide()
}

function koreaName(year: number): ReignView {
  if (year >= 1392) return show("朝鲜", "Joseon", "korea")
  if (year >= 918) return show("高丽", "Goryeo", "korea")
  return show("新罗", "Silla", "silla")
}

function yunnan(year: number): ReignView {
  if (year < 738) return show("六诏", "Six Zhao", "nan chao")
  if (year <= 902) return show("南诏", "Nanzhao", "nan chao")
  if (year <= 936) return show("大长和", "Dachanghe", "nan chao")
  if (year <= 1253) return show("大理", "Dali", "dali")
  return hide()
}

export function presentPolity(raw: string, year: number): ReignView | null {
  switch (plain(raw)) {
    case "qin":
      if (year >= -221 && year <= -207) return qin()
      if (year > -207 && year < -202) return chuHan()
      if (year < -221) return qin()
      return hide()
    case "zhou states":
      if (year >= -221 && year <= -207) return qin()
      if (year > -207 && year < -202) return chuHan()
      if (year < -221) return show("战国诸国", "Warring States", "zhou")
      return null
    case "yue":
      if (year >= -222) return hide()
      return show("越", "Yue", "zhou")
    case "han empire":
    case "han":
      return afterHan(year)
    case "sui empire":
      return year < 618 ? sui() : tangOrAfter(year)
    case "tang empire":
      return tangOrAfter(year)
    case "song empire":
      if (year < 960) return tangOrAfter(year)
      if (year <= 1126) return northernSong()
      if (year <= 1279) return southernSong()
      return hide()
    case "great khanate":
      if (year < 1271) return mongol()
      if (year <= 1367) return yuan()
      if (year <= 1643) return ming()
      if (year <= 1911) return qing()
      if (year <= 1949) return republic()
      return prc()
    case "ming chinese empire":
      return year >= 1644 ? modernChina(year) : ming()
    case "qing empire":
    case "manchu empire":
      return modernChina(year)
    case "post-ming warlords":
      return year > 1681 ? qing() : show("南明与三藩", "Southern Ming and the Three Feudatories", "southern ming", "qing")
    case "chinese warlords":
      return republic()
    case "manchuria":
      if (year >= 1932 && year <= 1945) return show("满洲国", "Manchukuo", "manchukuo", "republic")
      if (year >= 1912) return year > 1945 ? prc() : republic()
      return show("满洲", "Manchuria", "qing empire", "qing")
    case "jin":
      return southCourt(year)
    case "jin empire":
      return year >= 1115 ? afterLiao(year) : southCourt(year)
    case "toba wei":
    case "northern wei":
      return northCourt(year)
    case "liao":
    case "khitans":
      if (year < 907) return show("契丹", "Khitan", "liao", "song-liao-xia-jin")
      return afterLiao(year)
    case "xixia":
    case "western xia":
      return year > 1227 ? hide() : show("西夏", "Western Xia", "xixia", "song-liao-xia-jin")
    case "nan chao":
    case "nan-zhao":
    case "nanzhao":
      return yunnan(year)
    case "tufan empire":
    case "tibetan empire":
    case "tibet":
      return year <= 842
        ? show("吐蕃", "Tibetan Empire", "tibet")
        : show("吐蕃诸部", "Tibetan successor polities", "tibet")
    case "koguryo":
      return year > 668 ? hide() : show("高句丽", "Goguryeo", "koguryo")
    case "paekche":
      return year > 663 ? hide() : show("百济", "Baekje", "paekche")
    case "gaya":
      return year > 562 ? hide() : show("伽倻", "Gaya", "gaya")
    case "silla":
    case "silia":
    case "goryeo":
    case "korea":
      return koreaName(year)
    case "parhae":
    case "balhae":
      return year < 698 || year > 926 ? hide() : show("渤海", "Balhae", "parhae")
    case "gokturks":
      return steppeTurks(year)
    case "western gokturk khaganate":
      return year > 657 ? hide() : show("西突厥", "Western Turkic Khaganate", "western gokturk")
    case "uyghurs":
    case "uyghur":
      return year < 744 || year > 840 ? hide() : show("回鹘", "Uyghur Khaganate", "uyghur khaganate")
    case "sasanian empire":
    case "sasanian dependencies":
      return year > 651 ? hide() : show(plain(raw) === "sasanian dependencies" ? "萨珊附庸" : "萨珊", plain(raw) === "sasanian dependencies" ? "Sasanian dependencies" : "Sasanian Empire", "sasanian empire")
    case "visigothic kingdom":
    case "visigoths":
      return year > 711 ? hide() : show("西哥特", "Visigothic Kingdom", "visigothic kingdom")
    case "umayyad caliphate":
      return year >= 750
        ? show("阿拔斯", "Abbasid Caliphate", "abbasid caliphate", "arab-empires")
        : show("倭马亚", "Umayyad Caliphate", "umayyad caliphate", "arab-empires")
    case "hainan":
      return year < -111 ? show("海南", "Hainan", "hainan") : afterHan(year)
    case "middag kingdom":
    case "taiwanese tribes":
      return taiwanName(year)
    case "hong kong":
      if (year < 1842) return year >= 1644 ? qing() : ming()
      if (year >= 1997) return prc()
      return show("英属香港", "British Hong Kong", "hong kong")
    case "ruanruan":
      return year > 555 ? hide() : show("柔然", "Rouran", "rouran")
    case "han zhao":
      return show("汉赵", "Han Zhao", "sixteen kingdoms", "northern-southern")
    case "sixteen kingdoms":
      return show("十六国", "Sixteen Kingdoms", "sixteen kingdoms", "northern-southern")
    case "northern liang":
      return year > 439 ? hide() : show("北凉", "Northern Liang", "sixteen kingdoms", "northern-southern")
    case "southern xiongnu":
      return show("南匈奴", "Southern Xiongnu", "xiongnu")
    case "xiongnu":
      return year > 155 ? hide() : show("匈奴", "Xiongnu", "xiongnu")
    case "nan-yue":
      return year > -111 ? hide() : show("南越", "Nanyue", "nanyue")
    case "min-yue":
      return year > -110 ? hide() : show("闽越", "Minyue", "nanyue")
    case "yamato":
    case "yayoi":
      return year >= 710 ? show("日本", "Japan", "japan") : show(year >= 250 ? "大和" : "倭", year >= 250 ? "Yamato" : "Wa", "yamato")
    case "japan":
    case "imperial japan":
    case "empire of japan":
    case "imperial japan (fujiwara)":
      return show("日本", "Japan", "japan")
    case "shogun japan (kamakura)":
      return show("镰仓幕府", "Kamakura shogunate", "japan")
    case "japan (warring states)":
      return show("日本战国", "Sengoku Japan", "japan")
    case "tokugawa shogunate":
      return show("江户幕府", "Tokugawa shogunate", "japan")
    default:
      return null
  }
}
