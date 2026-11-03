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

    case "rome":
    case "roman republic":
      return year >= -27 ? show("罗马帝国", "Roman Empire", "roman empire", "rome") : show("罗马共和国", "Roman Republic", "roman republic", "rome")
    case "roman empire":
      return show("罗马帝国", "Roman Empire", "roman empire", "rome")
    case "western roman empire":
      return year > 476 ? hide() : show("西罗马帝国", "Western Roman Empire", "roman empire", "rome")
    case "eastern roman empire":
    case "byzantine empire":
      return year > 1453 ? hide() : show("拜占庭", "Byzantine Empire", "byzantine empire", "rome")
    case "franks":
    case "frankish kingdom":
      return show("法兰克", "Franks", "franks")
    case "kingdom of france":
    case "france":
      if (year >= 1804 && year <= 1814) return show("法兰西帝国", "French Empire", "france", "napoleon")
      if (year >= 1792 && year < 1804) return show("法兰西共和国", "French Republic", "france")
      if (year < 1792) return show("法兰西", "France", "france")
      return show("法国", "France", "france")
    case "holy roman empire":
      return year > 1806 ? hide() : show("神圣罗马帝国", "Holy Roman Empire", "holy roman empire")
    case "ottoman empire":
    case "ottoman sultanate":
      if (year >= 1923) return show("土耳其", "Turkey", "ottoman empire", "ottoman")
      return show("奥斯曼", "Ottoman Empire", "ottoman empire", "ottoman")
    case "persia":
      if (year >= 224 && year <= 651) return show("萨珊", "Sasanian Empire", "sasanian empire")
      if (year > 1925) return show("伊朗", "Iran", "persia")
      return show("波斯", "Persia", "persia")
    case "parthian empire":
    case "parthia":
      return year > 224 ? show("萨珊", "Sasanian Empire", "sasanian empire") : show("帕提亚", "Parthian Empire", "parthian empire")
    case "achaemenid empire":
      return year > -330 ? hide() : show("阿契美尼德", "Achaemenid Empire", "achaemenid empire", "achaemenid")
    case "seleucid kingdom":
      return year > -63 ? hide() : show("塞琉古", "Seleucid Kingdom", "seleucid kingdom", "hellenistic")
    case "ptolemaic kingdom":
      return year > -30 ? hide() : show("托勒密", "Ptolemaic Kingdom", "ptolemaic kingdom", "hellenistic")
    case "empire of alexander":
    case "macedon and hellenic league":
      return show("马其顿", "Macedon", "macedon", "hellenistic")
    case "mauryan empire":
      return year > -185 ? hide() : show("孔雀王朝", "Mauryan Empire", "mauryan empire", "maurya")
    case "gupta empire":
      return year > 550 ? hide() : show("笈多", "Gupta Empire", "gupta empire")
    case "chola empire":
    case "chola":
      return year > 1279 ? hide() : show("注辇", "Chola", "chola")
    case "empire of ghana":
      return year > 1240 ? hide() : show("加纳王国", "Ghana Empire", "ghana empire")
    case "ghana":
      if (year <= 1240) return show("加纳王国", "Ghana Empire", "ghana empire")
      if (year < 1957) return show("黄金海岸", "Gold Coast", "ghana empire")
      return show("加纳", "Ghana", "ghana empire")
    case "mali":
      if (year < 1235) return show("马里王国", "Kingdom of Mali", "mali")
      if (year <= 1670) return show("马里帝国", "Mali Empire", "mali")
      if (year < 1890) return show("马里", "Mali", "mali")
      if (year < 1960) return show("法属苏丹", "French Sudan", "mali")
      return show("马里", "Mali", "mali")
    case "songhai":
      if (year <= 1591) return show(year >= 1464 ? "桑海帝国" : "桑海", year >= 1464 ? "Songhai Empire" : "Songhai", "songhai")
      if (year <= 1900) return show("登迪", "Dendi", "songhai")
      return hide()
    case "khmer empire":
      return year > 1431 ? show("柬埔寨", "Cambodia", "khmer empire") : show("真腊", "Khmer Empire", "khmer empire")
    case "champa":
    case "champa city states":
      return year > 1832 ? hide() : show("占城", "Champa", "champa")
    case "srivijaya empire":
      return year > 1377 ? hide() : show("三佛齐", "Srivijaya", "srivijaya empire")
    case "sultanate of delhi":
      return year > 1526 ? hide() : show("德里苏丹国", "Delhi Sultanate", "delhi")
    case "mughal empire":
      return year > 1857 ? hide() : show("莫卧儿", "Mughal Empire", "mughal empire")
    case "aztec empire":
      return year > 1521 ? hide() : show("阿兹特克", "Aztec Empire", "aztec empire")
    case "inca empire":
      if (year > 1572) return hide()
      if (year > 1533) return show("印加残部", "Inca remnant", "inca empire")
      return show("印加", "Inca Empire", "inca empire")
    case "teotihuacan":
      return year > 550 ? hide() : show("特奥蒂瓦坎", "Teotihuacan", "teotihuacan")
    case "axum":
      return year > 960 ? hide() : show("阿克苏姆", "Aksum", "axum")
    case "england":
    case "england and ireland":
      return show("英格兰", "England", "england", "britain")
    case "spain":
      return show("西班牙", "Spain", "spain", "iberian")
    case "portugal":
      return show("葡萄牙", "Portugal", "portugal", "iberian")
    case "tsardom of muscovy":
      return show("沙皇俄国", "Tsardom of Russia", "russia", "russia")
    case "russian empire":
      if (year >= 1922) return show("苏联", "Soviet Union", "russia", "russia")
      if (year >= 1917) return show("苏俄", "Soviet Russia", "russia", "russia")
      return show("俄罗斯帝国", "Russian Empire", "russia", "russia")
    case "russia":
      if (year >= 1922 && year <= 1991) return show("苏联", "Soviet Union", "russia", "russia")
      return show("俄罗斯", "Russia", "russia", "russia")
    case "kanem":
    case "kanem-bornu":
      return show("加涅姆-博尔努", "Kanem-Bornu", "kanem-bornu")
    case "ayutthaya":
      if (year <= 1767) return show("阿瑜陀耶", "Ayutthaya", "ayutthaya")
      if (year <= 1782) return show("吞武里", "Thonburi", "ayutthaya")
      return show("曼谷王朝", "Bangkok kingdom", "ayutthaya")
    case "sukhothai":
      return year > 1438 ? hide() : show("素可泰", "Sukhothai", "ayutthaya")
    case "pagan":
    case "kingdom of pagan":
      return year > 1287 ? hide() : show("蒲甘", "Pagan", "pagan")
    case "venice":
      return year > 1797 ? hide() : show("威尼斯", "Venice", "venice")
    case "fatimid caliphate":
      if (year > 1250) return show("马穆鲁克", "Mamluk Sultanate", "mamluk")
      if (year > 1171) return show("阿尤布", "Ayyubid Sultanate", "ayyubid", "arab-empires")
      return show("法蒂玛", "Fatimid Caliphate", "fatimid caliphate", "arab-empires")
    case "mamluke sultanate":
    case "mamluk sultanate":
      return year > 1517 ? hide() : show("马穆鲁克", "Mamluk Sultanate", "mamluk")
    case "ilkhanate":
      return year > 1335 ? hide() : show("伊利汗国", "Ilkhanate", "ilkhanate", "mongol")
    case "timurid empire":
    case "timurid emirates":
      return year > 1507 ? hide() : show("帖木儿", "Timurid Empire", "timurid empire", "mongol")
    case "safavid empire":
      return year > 1736 ? show("波斯", "Persia", "persia") : show("萨法维", "Safavid Empire", "safavid empire")
    case "carthage":
      return year > -146 ? hide() : show("迦太基", "Carthage", "carthage")
    case "kush":
      return year > 350 ? hide() : show("库施", "Kush", "kush")
    case "olmec":
      return year > -400 ? hide() : show("奥尔梅克", "Olmec", "olmec")
    case "kievan rus":
      if (year > 1240) return hide()
      if (year > 1132) return show("罗斯诸公国", "Rus principalities", "kievan rus")
      return show("基辅罗斯", "Kievan Rus", "kievan rus")
    case "seljuk empire":
      return year > 1194 ? hide() : show("塞尔柱", "Seljuk Empire", "seljuk empire")
    case "seljuk caliphate":
      return year > 1308 ? hide() : show("罗姆苏丹国", "Sultanate of Rum", "seljuk empire")
    case "abbasid caliphate":
      return year > 1258 ? hide() : show("阿拔斯", "Abbasid Caliphate", "abbasid caliphate", "arab-empires")
    case "almoravid dynasty":
      return year > 1147 ? hide() : show("穆拉比特", "Almoravid dynasty", "almoravid")
    case "almohad caliphate":
      return year > 1269 ? hide() : show("穆瓦希德", "Almohad Caliphate", "almohad")
    case "buwayhid emirates":
    case "buyid dynasty":
    case "buyid emirate":
      return year > 1055 ? hide() : show("白益", "Buyid dynasty", "buyid")
    case "ghaznavid emirate":
      return year > 1186 ? hide() : show("伽色尼", "Ghaznavid dynasty", "ghaznavid")
    case "khwarazmian dynasty":
      return year > 1231 ? hide() : show("花剌子模", "Khwarazm", "khwarazm")
    case "samanid empire":
      return year > 999 ? hide() : show("萨曼", "Samanid Empire", "samanid")
    case "hafsid caliphate":
      return year > 1574 ? hide() : show("哈夫斯", "Hafsid dynasty", "hafsid")
    case "golden horde":
    case "khanate of the golden horde":
      return year > 1502 ? hide() : show("钦察汗国", "Golden Horde", "golden horde", "mongol")
    case "egypt":
      if (year <= -332) return show("埃及", "Egypt", "egypt")
      if (year <= -30) return show("托勒密埃及", "Ptolemaic Egypt", "egypt", "hellenistic")
      if (year <= 641) return show("罗马埃及", "Roman Egypt", "egypt", "rome")
      if (year <= 1171) return show("法蒂玛埃及", "Fatimid Egypt", "egypt", "arab-empires")
      if (year <= 1250) return show("阿尤布埃及", "Ayyubid Egypt", "egypt")
      if (year <= 1517) return show("马穆鲁克埃及", "Mamluk Egypt", "egypt")
      return show("埃及", "Egypt", "egypt")
    case "đai viet":
    case "dai viet":
    case "đại việt":
      if (year >= 1802) return show("越南", "Vietnam", "vietnam")
      if (year >= 939) return show("大越", "Dai Viet", "vietnam")
      return show("交趾", "Jiaozhi", "vietnam")
    case "annam":
      if (year >= 1802) return show("越南", "Vietnam", "vietnam")
      if (year >= 939) return show("大越", "Dai Viet", "vietnam")
      return show("安南", "Annam", "vietnam")
    case "vietnam":
      return show("越南", "Vietnam", "vietnam")
    case "poland":
    case "poland-lithuania":
      return year >= 1569 && year <= 1795 ? show("波兰立陶宛", "Poland-Lithuania", "poland") : show("波兰", "Poland", "poland")
    case "hungary":
    case "kingdom of hungary":
    case "imperial hungary":
      return show("匈牙利", "Hungary", "hungary")
    case "prussia":
      return show("普鲁士", "Prussia", "prussia")
    case "austrian empire":
    case "austria hungary":
    case "austria":
      if (year >= 1867 && year <= 1918) return show("奥匈帝国", "Austria-Hungary", "austria")
      if (year >= 1804 && year < 1867) return show("奥地利帝国", "Austrian Empire", "austria")
      return show("奥地利", "Austria", "austria")
    case "denmark":
    case "denmark-norway":
      return year >= 1536 && year <= 1814 ? show("丹麦-挪威", "Denmark-Norway", "denmark") : show("丹麦", "Denmark", "denmark")
    case "sweden":
      return show("瑞典", "Sweden", "sweden")
    case "italy":
      return year >= 1861 ? show("意大利", "Italy", "italy") : show("意大利诸邦", "Italian states", "italy")
    case "germany":
      if (year >= 1949 && year < 1990) return show("德国", "Germany", "germany")
      if (year >= 1871) return show("德国", "Germany", "germany")
      return show("德意志", "Germany", "germany")
    case "greece":
      return year >= 1830 ? show("希腊", "Greece", "greece") : show("希腊", "Greece", "greece")
    case "ethiopia":
    case "abyssinia":
      return show("埃塞俄比亚", "Ethiopia", "ethiopia")
    default:
      return null
  }
}
