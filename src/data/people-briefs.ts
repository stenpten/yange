export function peopleOverview(name: string, from: number, to: number, lang: "zh" | "en", label: string): string {
  if (!Number.isFinite(from)) from = Number.isFinite(to) ? to : 0
  if (!Number.isFinite(to)) to = from
  const key = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const found = briefs[key]
  if (found) return lang === "zh" ? found.zh : found.en
  const span = lang === "zh"
    ? `${from < 0 ? `前${-from}年` : `${from}年`}至${to < 0 ? `前${-to}年` : `${to}年`}`
    : `${from < 0 ? `${-from} BCE` : from} to ${to < 0 ? `${-to} BCE` : to}`
  const title = label || name
  if (lang === "zh") return `${title}。历史地图在${span}把这块土地标给这一人群或政权。这是当时的一种画法，用来补上还没有王国边界的大陆，不是逐年勘测的国境。`
  return `${title}. Historical maps assign this land to that people or realm for ${span}. It fills a continent where no kingdom border is recorded, and it is not a surveyed frontier.`
}

const briefs: Record<string, { zh: string; en: string }> = {
  "amazon hunter-gatherers": {
    zh: "亚马孙狩猎采集诸部。在欧洲人到来之前，亚马孙河流域生活着许多不立国的人群，靠河流、森林和农耕斑块维生。这片颜色表示他们的大致分布，不是某一个王国的国境。",
    en: "Amazonian hunter-gatherers. Before Europeans arrived, many peoples lived along the Amazon by river, forest, and small garden plots. The color is their broad range, not one kingdom's frontier.",
  },
  "andean hunter-gatherers": {
    zh: "安第斯狩猎采集诸部。在查文、蒂亚瓦纳科和印加之前，安第斯高地和海岸已有长期的人群活动。这片颜色标的是早期分布，不是后来的帝国。",
    en: "Andean hunter-gatherers. People were already living in the highlands and on the coast long before Chavin, Tiwanaku, and the Inca. This is an early range, not a later empire.",
  },
  "west african cereal farmers": {
    zh: "西非谷农诸部。撒哈拉以南的西非在加纳、马里、桑海这些王国出现前后，有大片以谷物农耕为主的社会。王国只占其中的一部分，周围仍是这些农耕人群。",
    en: "West African cereal farmers. Around the kingdoms of Ghana, Mali, and Songhai, much of western Africa was farmed by societies that were not those kingdoms. The kingdoms covered only part of this range.",
  },
  khoisan: {
    zh: "科伊桑诸部。非洲南部长期生活着使用咔嗒语音的狩猎采集和游牧人群，后来被班图农耕社会向南挤压。这片颜色是他们在该时段的大致范围。",
    en: "Khoisan peoples. Click-language hunter-gatherers and herders lived across southern Africa for a very long time, and were later pressed south by Bantu farming societies.",
  },
  "saharan nomadic tribes": {
    zh: "撒哈拉游牧诸部。沙漠绿洲和商路之间活动的是游牧人群，不是一块连成一片的国家。跨撒哈拉贸易把他们和西非王国、北非政权连在一起。",
    en: "Saharan nomads. People moved between oases and trade routes. They were not one continuous state. Trans-Saharan trade tied them to the West African kingdoms and to North Africa.",
  },
  "eastern north american hunter-gatherers": {
    zh: "北美东部狩猎采集诸部。密西西比河以东在土丘社会和大部落联盟形成之前，分布着许多狩猎采集人群。这片颜色只表示大致范围。",
    en: "Eastern North American hunter-gatherers. East of the Mississippi, many foraging peoples lived here before the mound societies and later confederacies. The color is only a broad range.",
  },
  "plain bison hunters": {
    zh: "平原野牛猎手。北美大平原上的人群随野牛群活动。马传入之后，这种生活又变过一次。图上是该时段的大致范围。",
    en: "Plains bison hunters. Peoples of the North American plains followed the herds. That way of life changed again after horses arrived. The map shows the broad range for this span.",
  },
  "caribbean hunter-gatherers": {
    zh: "加勒比狩猎采集诸部。岛屿上较早的人群后来与泰诺等农耕社会相遇。这片颜色标的是早期岛民的大致分布。",
    en: "Caribbean hunter-gatherers. Earlier island peoples later met farming societies such as the Taino. The color is the earlier island range.",
  },
  "australian aboriginal hunter-gatherers": {
    zh: "澳大利亚原住民诸部。人类到达澳大利亚的时间很早，各地有自己的语言和地盘。这片颜色把许多群体画在一起，只表示大陆上的原住民分布，不是一个国家。",
    en: "Australian Aboriginal peoples. People reached Australia very early, with many languages and countries of their own. This color groups those ranges. It is not one state.",
  },
  "tasmanian hunter-gatherers": {
    zh: "塔斯马尼亚原住民。海平面上升后，塔斯马尼亚与大陆分开，岛上社会独立发展了很长一段时间。",
    en: "Tasmanian Aboriginal peoples. After the sea rose, Tasmania was cut off from the mainland, and its societies developed on their own for a very long time.",
  },
  "paleo-siberian hunter-gatherers": {
    zh: "古西伯利亚狩猎采集诸部。北亚森林和苔原上的人群以渔猎为生，后来突厥、蒙古等草原政权从南面兴起，并没有把这片地方全部变成农耕国家。",
    en: "Paleo-Siberian hunter-gatherers. Peoples of the northern forests and tundra lived by hunting and fishing. Later steppe empires did not turn this whole region into farmland.",
  },
  "arctic marine mammal hunters": {
    zh: "北极海兽狩猎诸部。环北极的人群靠海豹、鲸和驯鹿生活。这片颜色顺着海岸展开，不是一个王国。",
    en: "Arctic sea-mammal hunters. Peoples around the Arctic lived on seals, whales, and caribou. The color follows the coast. It is not a kingdom.",
  },
  "subarctic forest hunter-gatherers": {
    zh: "亚北极森林狩猎采集诸部。加拿大地盾和阿拉斯加内陆的森林里，人群以驯鹿、鱼类和毛皮动物为生。",
    en: "Subarctic forest hunter-gatherers. In the boreal forests of the Canadian Shield and inland Alaska, people lived on caribou, fish, and fur animals.",
  },
  "finno-ugric taiga hunter-gatherers": {
    zh: "芬兰-乌戈尔泰加林狩猎采集诸部。波罗的海以东的泰加林里生活着后来与芬兰、萨米、乌戈尔语相关的人群。农耕和斯拉夫聚落是后来才向北推进的。",
    en: "Finno-Ugric taiga hunter-gatherers. East of the Baltic, taiga peoples related to later Finnic, Sami, and Ugric languages lived here before farming and Slavic settlement pushed north.",
  },
  saami: {
    zh: "萨米人。斯堪的纳维亚半岛北部的萨米人以驯鹿、渔猎为生，后来北欧王国向北征税，但没有把这片土地变成和南方一样的农耕郡。",
    en: "The Sami. In the north of Scandinavia the Sami lived with reindeer, fishing, and hunting. Nordic kingdoms later taxed the north without turning it into farmland like the south.",
  },
  ainu: {
    zh: "阿伊努。北海道及附近岛屿的阿伊努人以渔猎为生。日本政权很晚才把行政伸到这里。图上把他们标在本州诸政权之外。",
    en: "The Ainu. The Ainu of Hokkaido and nearby islands lived by fishing and hunting. Japanese administration reached them late. The map keeps them outside the realms on Honshu.",
  },
  "ethiopian highland peoples": {
    zh: "埃塞俄比亚高原诸部。高原上在阿克苏姆之后仍有多个基督教和地方社会。后来的埃塞俄比亚帝国是从这些高原政权里长出来的。",
    en: "Ethiopian highland peoples. After Aksum, several Christian and local societies remained on the plateau. The later Ethiopian empire grew out of those highland realms.",
  },
  kushites: {
    zh: "库施。尼罗河上游的库施以纳帕塔、麦罗埃为中心，和埃及长期往来，有自己的国王和铁器。它不是埃及的一个省。",
    en: "Kush. Upstream on the Nile, Kush was centered on Napata and Meroe. It dealt with Egypt for centuries and had its own kings and iron. It was not an Egyptian province.",
  },
  axum: {
    zh: "阿克苏姆。红海边上的阿克苏姆从公元前后兴起，铸币、立碑，并在四世纪接受基督教。它控制高原和海岸的贸易，七世纪以后逐渐失去红海优势。",
    en: "Aksum. On the Red Sea, Aksum rose around the start of the common era, minted coins, raised stelae, and became Christian in the fourth century. It held the trade between plateau and coast, and lost the Red Sea advantage after the seventh century.",
  },
  "empire of ghana": {
    zh: "加纳王国。西非的加纳王国控制尼日尔河上游和撒哈拉商路上的黄金与盐，和1957年以后的加纳共和国不是同一个国家。十一世纪末阿尔莫拉维德南下后，王国衰落。",
    en: "The Ghana empire. This West African kingdom taxed gold and salt on the upper Niger and the Saharan roads. It is not the republic founded in 1957. The kingdom faded after the Almoravid advance at the end of the eleventh century.",
  },
  "maya states": {
    zh: "玛雅诸邦。古典期玛雅是许多城邦，不是一个帝国。蒂卡尔、卡拉克穆尔等城彼此战争，九世纪以后南部低地的许多城被放弃。",
    en: "Maya states. Classic Maya politics were many cities, not one empire. Tikal, Calakmul, and others fought each other. In the ninth century many southern lowland cities were abandoned.",
  },
  teotihuacan: {
    zh: "特奥蒂瓦坎。墨西哥高原上的这座城市在古典期影响很远，大约在六到七世纪遭到破坏。它比阿兹特克早将近一千年。",
    en: "Teotihuacan. This city on the Mexican plateau reached far in the Classic period and was wrecked around the sixth or seventh century. It was nearly a thousand years earlier than the Aztecs.",
  },
  "huari empire": {
    zh: "瓦里。安第斯中部的瓦里在六到十世纪把高原上的若干谷地连成一个网络，比印加早几百年。",
    en: "Wari. In the central Andes, Wari linked highland valleys from about the sixth to the tenth century, several centuries before the Inca.",
  },
  "tiahuanaco empire": {
    zh: "蒂亚瓦纳科。的的喀喀湖边的蒂亚瓦纳科是安第斯南部的早期中心，和北方的瓦里大致同时，后来都在十世纪前后收缩。",
    en: "Tiwanaku. By Lake Titicaca, Tiwanaku was an early center of the southern Andes, roughly contemporary with Wari. Both contracted around the tenth century.",
  },
  moche: {
    zh: "莫切。秘鲁北海岸的莫切以灌溉谷地和大型土坯庙闻名，大约在八世纪前后让位给后来的海岸社会。",
    en: "Moche. On the north coast of Peru, Moche is known for irrigated valleys and great adobe temples. Later coastal societies replaced it around the eighth century.",
  },
  "monte alban": {
    zh: "阿尔班山。瓦哈卡谷地的阿尔班山是萨波特克人的中心，古典期以后影响力下降。",
    en: "Monte Alban. In the Valley of Oaxaca, Monte Alban was a Zapotec center. Its reach declined after the Classic period.",
  },
  "veracruz civilization": {
    zh: "韦拉克鲁斯诸文化。墨西哥湾海岸有自己的城市和仪式传统，和高原上的特奥蒂瓦坎并立，不是它的边郡。",
    en: "Veracruz cultures. The Gulf coast had its own cities and ritual traditions beside Teotihuacan. It was not a highland province.",
  },
  "caloosahatchee culture": {
    zh: "卡卢萨。佛罗里达西南的卡卢萨靠河口和贝丘生活，和北方的农耕社会不同，西班牙人到达时仍然在。",
    en: "Calusa. In southwest Florida the Calusa lived on estuaries and shell mounds, unlike the farming societies farther north. They were still there when the Spanish arrived.",
  },
  bantu: {
    zh: "班图诸部。班图语人群从西非中部向东、向南扩展，把农耕和铁器带到非洲中南部。这片颜色是扩张中的大致范围，不是一个王国。",
    en: "Bantu peoples. Bantu-speaking communities spread east and south from central-west Africa, bringing farming and iron. The color is that broad spread, not one kingdom.",
  },
  "bantu peoples": {
    zh: "班图诸部。班图语人群从西非中部向东、向南扩展，把农耕和铁器带到非洲中南部。这片颜色是扩张中的大致范围，不是一个王国。",
    en: "Bantu peoples. Bantu-speaking communities spread east and south from central-west Africa, bringing farming and iron. The color is that broad spread, not one kingdom.",
  },
  vazimba: {
    zh: "瓦津巴。马达加斯加早期居民之一，后来的马尔加什社会由非洲和南岛两路移民合成。图上的范围是早期分布的一种画法。",
    en: "Vazimba. One name for early inhabitants of Madagascar. Later Malagasy society formed from African and Austronesian arrivals. The range is one way of drawing that early presence.",
  },
  alwa: {
    zh: "阿勒瓦。努比亚基督教诸国之一，在尼罗河上游，首都索巴。阿拉伯旅行者记录过它，十四世纪以后逐渐消失。",
    en: "Alwa. One of the Christian kingdoms of Nubia, on the upper Nile, with its capital at Soba. Arab travelers described it. It faded after the fourteenth century.",
  },
  makkura: {
    zh: "穆古拉。努比亚北部的基督教王国，首都栋古拉，长期处在埃及和南方努比亚之间。",
    en: "Makuria. The Christian kingdom of northern Nubia, capital at Dongola, set between Egypt and the Nubian kingdoms farther south.",
  },
  bega: {
    zh: "贝贾。红海山地的贝贾人游牧、护商，处在阿克苏姆和后来的阿拉伯海岸政权之间。",
    en: "Beja. The Beja of the Red Sea hills herded and watched the roads, between Aksum and the later Arab ports.",
  },
  tungus: {
    zh: "通古斯诸部。东西伯利亚森林里的通古斯语人群以渔猎、驯鹿为生。女真和后来的满洲起源与这一带有关，但图上这片不是金或清的国境。",
    en: "Tungusic peoples. In the forests of eastern Siberia, Tungusic speakers lived by fishing, hunting, and reindeer. Jurchen and later Manchu origins are tied to this broader world, but this color is not the Jin or Qing frontier.",
  },
}
