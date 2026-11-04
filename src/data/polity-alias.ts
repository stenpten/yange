export type PolityAlias = { zh: string; en?: string; dossier?: string; chapter?: string }

function plain(name: string) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const fixed: Record<string, PolityAlias> = {
  "han dynasty": { zh: "汉", en: "Han", dossier: "han empire", chapter: "western-han" },
  "cao wei": { zh: "魏", en: "Cao Wei", dossier: "cao wei", chapter: "three-kingdoms" },
  "shu han": { zh: "蜀", en: "Shu Han", dossier: "shu han", chapter: "three-kingdoms" },
  "eastern wu": { zh: "吴", en: "Eastern Wu", dossier: "eastern wu", chapter: "three-kingdoms" },
  "western jin": { zh: "西晋", en: "Western Jin", dossier: "western jin", chapter: "northern-southern" },
  "eastern jin": { zh: "东晋", en: "Eastern Jin", dossier: "eastern jin", chapter: "northern-southern" },
  "northern wei": { zh: "北魏", en: "Northern Wei", dossier: "northern wei", chapter: "northern-southern" },
  "eastern wei": { zh: "东魏", en: "Eastern Wei", dossier: "northern dynasties", chapter: "northern-southern" },
  "western wei": { zh: "西魏", en: "Western Wei", dossier: "northern dynasties", chapter: "northern-southern" },
  "northern qi": { zh: "北齐", en: "Northern Qi", dossier: "northern dynasties", chapter: "northern-southern" },
  "northern zhou": { zh: "北周", en: "Northern Zhou", dossier: "northern dynasties", chapter: "northern-southern" },
  "liu song dynasty": { zh: "刘宋", en: "Liu Song", dossier: "southern dynasties", chapter: "northern-southern" },
  "sui dynasty": { zh: "隋", en: "Sui", dossier: "sui empire", chapter: "sui" },
  "tang dynasty": { zh: "唐", en: "Tang", dossier: "tang empire", chapter: "tang" },
  "later liang dynasty": { zh: "后梁", en: "Later Liang", dossier: "later liang", chapter: "song-liao-xia-jin" },
  "later tang": { zh: "后唐", en: "Later Tang", dossier: "later tang", chapter: "song-liao-xia-jin" },
  "later jin": { zh: "后晋", en: "Later Jin", dossier: "later jin", chapter: "song-liao-xia-jin" },
  "later han": { zh: "后汉", en: "Later Han", dossier: "later han", chapter: "song-liao-xia-jin" },
  "northern han": { zh: "北汉", en: "Northern Han", dossier: "northern han", chapter: "song-liao-xia-jin" },
  "former shu": { zh: "前蜀", en: "Former Shu", dossier: "former shu", chapter: "song-liao-xia-jin" },
  "later shu": { zh: "后蜀", en: "Later Shu", dossier: "later shu", chapter: "song-liao-xia-jin" },
  "southern tang": { zh: "南唐", en: "Southern Tang", dossier: "southern tang", chapter: "song-liao-xia-jin" },
  "southern han": { zh: "南汉", en: "Southern Han", dossier: "southern han", chapter: "song-liao-xia-jin" },
  "southern chu": { zh: "楚", en: "Chu", dossier: "chu kingdom", chapter: "song-liao-xia-jin" },
  "southern wu": { zh: "吴", en: "Wu", dossier: "wu kingdom", chapter: "song-liao-xia-jin" },
  wuyue: { zh: "吴越", en: "Wuyue", dossier: "wuyue", chapter: "song-liao-xia-jin" },
  jingnan: { zh: "荆南", en: "Jingnan", dossier: "jingnan", chapter: "song-liao-xia-jin" },
  min: { zh: "闽", en: "Min", dossier: "min kingdom", chapter: "song-liao-xia-jin" },
  "northern song": { zh: "北宋", en: "Northern Song", dossier: "song empire", chapter: "song-liao-xia-jin" },
  "southern song": { zh: "南宋", en: "Southern Song", dossier: "song empire", chapter: "song-liao-xia-jin" },
  "liao dynasty": { zh: "辽", en: "Liao", dossier: "liao", chapter: "song-liao-xia-jin" },
  "great jin": { zh: "金", en: "Jin", dossier: "jin", chapter: "song-liao-xia-jin" },
  "western xia": { zh: "西夏", en: "Western Xia", dossier: "xixia", chapter: "song-liao-xia-jin" },
  "ming dynasty": { zh: "明", en: "Ming", dossier: "ming", chapter: "ming" },
  "qing dynasty": { zh: "清", en: "Qing", dossier: "qing empire", chapter: "qing" },
  "northern yuan": { zh: "北元", en: "Northern Yuan", dossier: "great khanate", chapter: "ming" },
  "yuan dynasty": { zh: "元", en: "Yuan", dossier: "great khanate", chapter: "yuan" },
  "great yuan": { zh: "元", en: "Yuan", dossier: "great khanate", chapter: "yuan" },
  "people's republic of china": { zh: "中国", en: "China", dossier: "china" },
  "chinese taiwan": { zh: "中国", en: "China", dossier: "china" },
  goguryeo: { zh: "高句丽", en: "Goguryeo", dossier: "koguryo" },
  baekje: { zh: "百济", en: "Baekje", dossier: "paekche" },
  silla: { zh: "新罗", en: "Silla", dossier: "silla" },
  "unified silla": { zh: "统一新罗", en: "Unified Silla", dossier: "silla" },
  goryeo: { zh: "高丽", en: "Goryeo", dossier: "korea" },
  balhae: { zh: "渤海", en: "Balhae", dossier: "parhae" },
  nanzhao: { zh: "南诏", en: "Nanzhao", dossier: "nan chao" },
  "tibetan empire": { zh: "吐蕃", en: "Tibetan Empire", dossier: "tibet" },
  tibetans: { zh: "吐蕃诸部", en: "Tibetan tribes", dossier: "tibet" },
  tibet: { zh: "西藏", en: "Tibet", dossier: "tibet" },
  "uyghur khaganate": { zh: "回鹘", en: "Uyghur Khaganate", dossier: "uyghur khaganate" },
  turgesh: { zh: "突骑施", en: "Turgesh", dossier: "turgesh" },
  "gokturk khaganate": { zh: "突厥", en: "Gokturk Khaganate", dossier: "gokturks" },
  "eastern gokturks": { zh: "东突厥", en: "Eastern Gokturks", dossier: "gokturks" },
  "western gokturks": { zh: "西突厥", en: "Western Gokturks", dossier: "western gokturk" },
  "rouran khaganate": { zh: "柔然", en: "Rouran", dossier: "rouran" },
  "abbasid caliphate": { zh: "阿拔斯", en: "Abbasid Caliphate", dossier: "abbasid caliphate", chapter: "arab-empires" },
  "umayyad caliphate": { zh: "倭马亚", en: "Umayyad Caliphate", dossier: "umayyad caliphate", chapter: "arab-empires" },
  "sasanian empire": { zh: "萨珊", en: "Sasanian Empire", dossier: "sasanian empire" },
  "roman empire": { zh: "罗马帝国", en: "Roman Empire", dossier: "roman empire", chapter: "rome" },
  "roman republic": { zh: "罗马共和国", en: "Roman Republic", dossier: "roman republic", chapter: "rome" },
  "western roman empire": { zh: "西罗马帝国", en: "Western Roman Empire", dossier: "roman empire", chapter: "rome" },
  "eastern roman empire": { zh: "东罗马", en: "Eastern Roman Empire", dossier: "byzantine empire", chapter: "rome" },
  "byzantine empire": { zh: "拜占庭", en: "Byzantine Empire", dossier: "byzantine empire", chapter: "rome" },
  "kingdom of the franks": { zh: "法兰克", en: "Franks", dossier: "franks" },
  "holy roman empire": { zh: "神圣罗马帝国", en: "Holy Roman Empire", dossier: "holy roman empire" },
  "ottoman empire": { zh: "奥斯曼", en: "Ottoman Empire", dossier: "ottoman empire", chapter: "ottoman" },
  "mongol empire": { zh: "蒙古", en: "Mongol Empire", dossier: "mongol empire", chapter: "mongol" },
  "great mongol state": { zh: "大蒙古国", en: "Great Mongol State", dossier: "mongol empire", chapter: "mongol" },
  "ghana empire": { zh: "加纳王国", en: "Ghana Empire", dossier: "ghana empire" },
  "mali empire": { zh: "马里帝国", en: "Mali Empire", dossier: "mali" },
  "songhai empire": { zh: "桑海帝国", en: "Songhai Empire", dossier: "songhai" },
  "maurya empire": { zh: "孔雀王朝", en: "Maurya Empire", dossier: "mauryan empire", chapter: "maurya" },
  "gupta empire": { zh: "笈多王朝", en: "Gupta Empire", dossier: "gupta empire" },
  "chola empire": { zh: "注辇", en: "Chola Empire", dossier: "chola" },
  "aztec triple alliance": { zh: "阿兹特克", en: "Aztec Empire", dossier: "aztec empire" },
  "inca empire": { zh: "印加", en: "Inca Empire", dossier: "inca empire" },
  "delhi sultanate": { zh: "德里苏丹国", en: "Delhi Sultanate", dossier: "delhi" },
  "mughal empire": { zh: "莫卧儿", en: "Mughal Empire", dossier: "mughal empire" },
  "fatimid caliphate": { zh: "法蒂玛", en: "Fatimid Caliphate", dossier: "fatimid caliphate" },
  "almohad caliphate": { zh: "穆瓦希德", en: "Almohad Caliphate", dossier: "almohad" },
  "seljuk empire": { zh: "塞尔柱", en: "Seljuk Empire", dossier: "seljuk empire" },
  "khwarazmian empire": { zh: "花剌子模", en: "Khwarazm", dossier: "khwarazm" },
  "golden horde": { zh: "钦察汗国", en: "Golden Horde", dossier: "golden horde" },
  ilkhanate: { zh: "伊利汗国", en: "Ilkhanate", dossier: "ilkhanate" },
  "chagatai khanate": { zh: "察合台汗国", en: "Chagatai Khanate" },
  "kievan rus": { zh: "基辅罗斯", en: "Kievan Rus", dossier: "kievan rus" },
  "republic of venice": { zh: "威尼斯", en: "Venice", dossier: "venice" },
  "achaemenid empire": { zh: "阿契美尼德", en: "Achaemenid Empire", dossier: "achaemenid empire", chapter: "achaemenid" },
  "parthian empire": { zh: "帕提亚", en: "Parthian Empire", dossier: "parthian empire" },
  "ptolemaic kingdom": { zh: "托勒密", en: "Ptolemaic Kingdom", dossier: "ptolemaic kingdom", chapter: "hellenistic" },
  "seleucid empire": { zh: "塞琉古", en: "Seleucid Empire", dossier: "seleucid kingdom", chapter: "hellenistic" },
  "kushan empire": { zh: "贵霜", en: "Kushan Empire" },
  "kara-khanids": { zh: "喀喇汗", en: "Kara-Khanid Khanate", dossier: "kara khanid" },
  "kara-khitans": { zh: "西辽", en: "Qara Khitai", dossier: "liao" },
  "nara japan": { zh: "奈良日本", en: "Nara Japan", dossier: "japan" },
  "heian japan": { zh: "平安日本", en: "Heian Japan", dossier: "japan" },
  "asuka japan": { zh: "飞鸟日本", en: "Asuka Japan", dossier: "yamato" },
  "empire of japan": { zh: "日本", en: "Japan", dossier: "japan" },
  japan: { zh: "日本", en: "Japan", dossier: "japan" },
  "warring states japan": { zh: "日本战国", en: "Sengoku Japan", dossier: "japan" },
  chu: { zh: "楚", en: "Chu", dossier: "zhou" },
  wu: { zh: "吴", en: "Wu", dossier: "zhou" },
  yue: { zh: "越", en: "Yue", dossier: "zhou" },
  qi: { zh: "齐", en: "Qi", dossier: "zhou" },
  qin: { zh: "秦", en: "Qin", dossier: "qin", chapter: "qin" },
  zhao: { zh: "赵", en: "Zhao", dossier: "zhou" },
  yan: { zh: "燕", en: "Yan", dossier: "zhou" },
  wei: { zh: "魏", en: "Wei", dossier: "zhou" },
  jin: { zh: "晋", en: "Jin", dossier: "zhou" },
  "xiongnu empire": { zh: "匈奴", en: "Xiongnu", dossier: "xiongnu" },
  xiongnu: { zh: "匈奴", en: "Xiongnu", dossier: "xiongnu" },
}

export function aliasFor(name: string, year: number): PolityAlias | null {
  const key = plain(name)
  if (key === "republic of china") {
    return year >= 1950
      ? { zh: "中国", en: "China", dossier: "china" }
      : { zh: "中华民国", en: "Republic of China", dossier: "republic", chapter: "republic" }
  }
  if (key === "communist party of china") return { zh: "中共控制区", en: "Communist base areas", dossier: "republic", chapter: "republic" }
  if (key === "later zhou") {
    return year >= 951
      ? { zh: "后周", en: "Later Zhou", dossier: "later zhou", chapter: "song-liao-xia-jin" }
      : { zh: "周", en: "Zhou", dossier: "zhou" }
  }
  if (key === "later liang" && year < 500) return { zh: "后凉", en: "Later Liang", dossier: "sixteen kingdoms", chapter: "northern-southern" }
  if ((key === "great yuan" || key === "yuan dynasty") && (year < 1206 || year > 1388)) return null
  if (key === "han dynasty") {
    if (year <= 8) return { zh: "西汉", en: "Western Han", dossier: "han empire", chapter: "western-han" }
    if (year <= 23) return { zh: "新", en: "Xin", dossier: "xin", chapter: "western-han" }
    if (year <= 220) return { zh: "东汉", en: "Eastern Han", dossier: "han", chapter: "eastern-han" }
    return { zh: "汉", en: "Han", dossier: "han", chapter: "eastern-han" }
  }
  if (key === "tibet" && year <= 842) return { zh: "吐蕃", en: "Tibetan Empire", dossier: "tibet" }
  return fixed[key] ?? null
}
