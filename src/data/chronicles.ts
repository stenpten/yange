export type Chronicle = {
  spanZh: string
  spanEn: string
  capitalZh: string
  capitalEn: string
  bodyZh: string
  bodyEn: string
  beats?: { year: number; zh: string; en: string }[]
}

function book(
  spanZh: string,
  spanEn: string,
  capitalZh: string,
  capitalEn: string,
  bodyZh: string,
  bodyEn: string,
  beats: { year: number; zh: string; en: string }[] = [],
): Chronicle {
  return { spanZh, spanEn, capitalZh, capitalEn, bodyZh, bodyEn, beats }
}

export const chronicles: Record<string, Chronicle> = {
  qin: book(
    "前221–前207",
    "221–207 BCE",
    "咸阳",
    "Xianyang",
    `秦的统一不是从空地起的。战国后期，秦据关中，东有函谷，南有巴蜀，又以郑国渠和商鞅以后的耕战制度把粮食和兵员绑在一起。前230年到前221年，秦先后灭韩、赵、魏、楚、燕、齐。前221年，秦王政改称始皇帝，不再分封诸侯，而把新得到的土地分成郡县，由朝廷任免官员。

统一以后的制度，是要把列国的差异压平：书写用同一种文字，车轨和度量尽量划一，驰道从咸阳通向外地，北方则把燕、赵、秦原有的边墙连成长城。这是一个以关中为中心的王朝，不是后来中国的全部。草原上仍是匈奴，岭南在设郡以前还有南越等势力。

秦的灭亡来得很快。前210年始皇死于沙丘，赵高、李斯改了遗诏，胡亥即位。前209年陈胜、吴广在大泽乡起兵，六国后裔和各地豪杰跟着反秦。前207年子婴杀掉赵高，在轵道向刘邦投降，咸阳的政权到此结束。次年项羽进入关中，焚烧宫室。秦只做了十几年的统一王朝，但它把郡县制成了后来王朝的底子。`,
    `Qin did not start from empty ground. In the late Warring States it held the Guanzhong plain, the Hangu Pass, and Shu, and tied grain to conscription. From 230 to 221 BCE it conquered Han, Zhao, Wei, Chu, Yan, and Qi. In 221 BCE King Zheng took the title First Emperor and divided the new lands into commanderies instead of hereditary kingdoms.

The point of the new order was to flatten the differences among the old states: one script, a common standard for carts and measures, post roads out of Xianyang, and a linked wall along the northern frontier. This was a dynasty centered on Guanzhong, not the whole of later China. The Xiongnu remained on the steppe.

It fell quickly. The First Emperor died at Shaqiu in 210 BCE, and Zhao Gao and Li Si altered the succession. In 209 BCE Chen Sheng and Wu Guang rebelled. In 207 BCE Ziying killed Zhao Gao and surrendered to Liu Bang. The next year Xiang Yu entered the passes and burned the palaces. The unified dynasty lasted only a short generation, but its commanderies became the pattern later courts inherited.`,
    [
      { year: -230, zh: "秦开始逐个消灭关东六国。", en: "Qin begins the conquest of the other six states." },
      { year: -221, zh: "秦王政称始皇帝，推行郡县。", en: "King Zheng becomes First Emperor and installs commanderies." },
      { year: -210, zh: "始皇死于沙丘，胡亥即位。", en: "The First Emperor dies at Shaqiu and Huhai takes the throne." },
      { year: -209, zh: "陈胜、吴广在大泽乡起兵。", en: "Chen Sheng and Wu Guang rebel at Dazexiang." },
      { year: -207, zh: "子婴出降，秦的统治结束。", en: "Ziying surrenders and Qin rule ends." },
    ],
  ),
  zhou: book(
    "战国，约前475–前221",
    "Warring States, about 475–221 BCE",
    "洛邑，周天子已无实权",
    "Luoyi; the Zhou king no longer ruled",
    `战国不是一个统一的国家。周天子还留着名号，实际的征伐、赋税和用人都在齐、楚、燕、韩、赵、魏、秦七国，以及宋、鲁、越这些较小的国。各国自己铸币、写法律、养常备兵，合纵连横只是暂时的结盟。

这一层底图把关东诸国涂成一块，是为了和秦的核心区分开，并不表示它们已经合成一国。前221年秦完成征服之后，这些国的名号取消，土地改成秦的郡县。`,
    `The Warring States were not one country. The Zhou king kept a title, while armies, taxes, and appointments belonged to Qi, Chu, Yan, Han, Zhao, Wei, Qin, and smaller states such as Song and Yue. Each coined money, wrote its own laws, and kept a standing army.

This sheet paints the eastern states as one shape so they can be told apart from the Qin heartland. It does not mean they had merged. After 221 BCE their titles were abolished and the land became Qin commanderies.`,
    [
      { year: -403, zh: "三家分晋，韩赵魏成为诸侯。", en: "Han, Zhao, and Wei are recognized after the partition of Jin." },
      { year: -359, zh: "商鞅在秦变法，秦的国力开始压过关东。", en: "Shang Yang's reforms start to tilt the balance toward Qin." },
      { year: -260, zh: "长平之战，赵军大败。", en: "Zhao's army is destroyed at Changping." },
      { year: -256, zh: "秦灭西周君，周的余脉更弱。", en: "Qin removes the last Zhou lord in the west." },
      { year: -221, zh: "六国灭，战国结束。", en: "The six states are gone and the Warring States end." },
    ],
  ),
  "chu han": book(
    "前206–前202",
    "206–202 BCE",
    "无统一都城",
    "No single capital",
    `秦降之后，天下并没有立刻归汉。项羽分封十八路诸侯，自立为西楚霸王，把刘邦封到巴蜀汉中。分封没有稳住局面。刘邦还定三秦，与项羽在荥阳、成皋之间反复争夺，又用韩信开辟北方战场。

前202年，项羽在垓下兵败，自刎于乌江。刘邦在定陶即皇帝位，楚汉之争结束，西汉开始。这几年不是一个王朝，而是秦和汉之间的内战。`,
    `Qin's surrender did not immediately produce a Han empire. Xiang Yu enfeoffed eighteen kings, made himself overlord of Western Chu, and sent Liu Bang to Hanzhong. The settlement did not hold. Liu Bang recovered the Three Qins and fought Xiang Yu between Xingyang and Chenggao, while Han Xin opened a northern front.

In 202 BCE Xiang Yu was defeated at Gaixia and died at the Wu River. Liu Bang took the imperial title at Dingtao. These years were a civil war between Qin and Han, not a dynasty of their own.`,
    [
      { year: -206, zh: "项羽分封诸侯，刘邦就国汉中。", en: "Xiang Yu distributes kingdoms and Liu Bang goes to Hanzhong." },
      { year: -205, zh: "刘邦还定三秦，楚汉正面开战。", en: "Liu Bang recovers the Three Qins and the war becomes direct." },
      { year: -203, zh: "双方以鸿沟为界，约定中分天下。", en: "The two sides agree to split the realm at the Hong Canal." },
      { year: -202, zh: "垓下之战，项羽败死，刘邦称帝。", en: "Xiang Yu falls at Gaixia and Liu Bang becomes emperor." },
    ],
  ),
  "han empire": book(
    "前202–公元8",
    "202 BCE–8 CE",
    "长安",
    "Chang'an",
    `前202年刘邦称皇帝，定都长安，史称西汉，也叫前汉。开国时不得不用功臣和子弟做诸侯王，朝廷直接控制的只有关中和一部分中原。前200年白登之围以后，对匈奴长期和亲。文景两代减轻田租，把内迁的诸侯国慢慢削小。

真正把汉变成一个大帝国的是武帝。推恩令使诸侯无法再集中封地。前119年卫青、霍去病打到漠北，随后设河西四郡。前111年灭南越，岭南设郡。张骞通西域之后，前60年设西域都护。汉武帝也耗尽了文景积蓄，晚年才停止穷兵。昭帝、宣帝把边境和内政稳住。

《汉书·地理志》所记元始二年的户口，大约一千二百余万户、五千九百余万人。这是登记人口，不是现代普查，但足以说明西汉末年已经是一个大帝国。公元8年，外戚王莽称帝，西汉结束。`,
    `In 202 BCE Liu Bang took the imperial title at Chang'an. This is Western Han. At first he had to leave large kingdoms to allies and kinsmen; the court directly held Guanzhong and only part of the center. After the siege of Baideng in 200 BCE, Han bought peace with the Xiongnu through marriage alliances. Emperors Wen and Jing cut the land tax and reduced the kingdoms.

Emperor Wu made Han a large empire. His inheritance law broke up the kingdoms. In 119 BCE Wei Qing and Huo Qubing campaigned north of the Gobi, and the Hexi commanderies followed. Nanyue fell in 111 BCE. After Zhang Qian's missions, the Protectorate of the Western Regions was set up in 60 BCE. The wars spent the earlier surplus. Zhaodi and Xuandi then stabilized the frontier.

The Hanshu geography treatise records about 12 million households and 59 million people for 2 CE. That is a registered population, not a modern census. In 8 CE the consort kinsman Wang Mang took the throne and Western Han ended.`,
    [
      { year: -202, zh: "刘邦称帝，都长安。", en: "Liu Bang becomes emperor at Chang'an." },
      { year: -154, zh: "七国之乱被周亚夫削平。", en: "Zhou Yafu suppresses the revolt of the seven kingdoms." },
      { year: -119, zh: "卫青、霍去病深入漠北。", en: "Wei Qing and Huo Qubing campaign north of the Gobi." },
      { year: -111, zh: "汉灭南越，在岭南设郡。", en: "Han conquers Nanyue and founds commanderies in Lingnan." },
      { year: -60, zh: "西域都护设立。", en: "The Protectorate of the Western Regions is established." },
      { year: 8, zh: "王莽称帝，西汉结束。", en: "Wang Mang takes the throne and Western Han ends." },
    ],
  ),
  xin: book(
    "9–23",
    "9–23",
    "长安",
    "Chang'an",
    `王莽是汉元帝皇后的侄子，以外戚和儒生的双重身份逐步掌握朝政。公元8年他废掉孺子婴，改国号为新。他按古书改官名、地名和货币，又宣布土地归王田、奴婢改称私属，想一次解决土地兼并。命令太急，地方无法执行，商人、农民和旧贵族同时受扰。

改币和天灾叠在一起。天凤、地皇年间，荆州的绿林和山东的赤眉相继起兵。公元23年，绿林拥立的刘玄与王莽军在昆阳决战，新军大败。同年长安城破，王莽被杀。新朝只存在十几年，随后刘秀重建的是汉，不是新。`,
    `Wang Mang, a nephew of Emperor Yuan's empress, gathered power as both a consort relative and a classical scholar. In 8 CE he deposed the child emperor and named his dynasty Xin. He renamed offices, places, and coins, and declared land to be royal fields and slaves to be private dependents, hoping to undo the concentration of land at one stroke. The orders were too sudden to enforce, and merchants, farmers, and old nobles were all disrupted.

Currency changes and famine came together. The Lulin rebels rose in Jingzhou and the Red Eyebrows in Shandong. In 23 CE the Han claimant Liu Xuan broke Wang Mang's army at Kunyang. Chang'an fell the same year and Wang Mang was killed. Xin lasted little more than a decade. The restoration that followed was Han, not Xin.`,
    [
      { year: 8, zh: "王莽称帝，国号新。", en: "Wang Mang becomes emperor and founds Xin." },
      { year: 17, zh: "绿林兵起于荆州。", en: "The Lulin rebels rise in Jingzhou." },
      { year: 18, zh: "赤眉兵起于山东。", en: "The Red Eyebrows rise in Shandong." },
      { year: 23, zh: "昆阳战败，长安城破，王莽被杀。", en: "Xin loses at Kunyang, Chang'an falls, and Wang Mang is killed." },
    ],
  ),
  han: book(
    "25–220",
    "25–220",
    "洛阳",
    "Luoyang",
    `公元25年，刘秀在鄗称帝，后来定都洛阳。他是西汉的宗室，所以国号仍是汉，史书称为东汉或后汉。光武帝用十几年削平赤眉和各地割据，然后释放奴婢、清查田亩，把朝廷从长安搬到更靠近东方产粮区的洛阳。

东汉重新经营西域。班超在西域活动了三十年，但北方的主要压力逐渐从匈奴转到鲜卑。和帝以后，外戚和宦官轮流把持朝政，党锢把士人排除出权力。公元184年张角领导黄巾起事。黄巾没有马上推翻朝廷，州郡为了自保却拥有了军队。

公元189年灵帝死，何进召董卓入洛，东汉的统一指挥从此不复存在。公元196年曹操把献帝迁到许县，汉的年号还在，政令已经出于曹氏。公元220年曹丕接受献帝禅让，东汉正式结束。`,
    `In 25 CE Liu Xiu took the imperial title and later settled the capital at Luoyang. He was a member of the Western Han house, so the dynasty was still called Han. Histories call it Eastern Han. Guangwu spent more than a decade breaking the Red Eyebrows and regional regimes, then freed slaves, checked the land registers, and ruled from a capital closer to the eastern grain lands.

Eastern Han returned to the Western Regions. Ban Chao spent thirty years there, while the main pressure on the northern frontier shifted from the Xiongnu to the Xianbei. After Emperor He, consort clans and eunuchs alternated in power, and the proscriptions shut scholars out. Zhang Jue's Yellow Turbans rose in 184. They did not immediately topple the court, but the provinces raised their own armies.

In 189 Emperor Ling died and He Jin called in Dong Zhuo. Unified command never returned. In 196 Cao Cao moved the emperor to Xu. The Han reign title survived, but orders came from the Cao family. In 220 Cao Pi accepted the abdication and Eastern Han ended.`,
    [
      { year: 25, zh: "刘秀称帝，后定都洛阳。", en: "Liu Xiu becomes emperor and later settles at Luoyang." },
      { year: 73, zh: "窦固、班超出兵西域。", en: "Dou Gu and Ban Chao campaign in the Western Regions." },
      { year: 184, zh: "黄巾起事，州郡开始拥兵。", en: "The Yellow Turbans rise and the provinces keep armies." },
      { year: 189, zh: "董卓入洛，朝廷失去统一指挥。", en: "Dong Zhuo enters Luoyang and the court loses command." },
      { year: 208, zh: "赤壁之战，曹操未能跨过长江。", en: "At Red Cliffs, Cao Cao fails to cross the Yangzi." },
      { year: 220, zh: "曹丕代汉，东汉结束。", en: "Cao Pi replaces Han and Eastern Han ends." },
    ],
  ),
  "three kingdoms": book(
    "220–280",
    "220–280",
    "魏洛阳，蜀成都，吴建业",
    "Luoyang, Chengdu, and Jianye",
    `三国是东汉解体以后的三个政权，不是一个皇帝下面的三个省。公元220年曹丕在洛阳称帝，国号魏。221年刘备在成都称帝，继承汉的名号，史称蜀汉。229年孙权在建业称帝，国号吴。三家的分界，在208年赤壁之战以后就已经大致形成：曹操没有跨过长江，孙权保住江东，刘备随后取得益州。

魏占有中原和关中，户口和兵力最强。蜀以益州为根本，靠汉中和祁山对魏进攻，诸葛亮死于五丈原之后，蜀再无力大举北伐。吴拥有长江和海上交通，也多次与蜀失和，夷陵之战就是一次。

灭亡的顺序很清楚。263年魏将邓艾偷渡阴平，攻入成都，蜀汉投降。265年司马炎代魏，建立西晋。280年晋军从长江顺流而下，孙皓出降，吴亡。分裂告一段落，但西晋的统一也没有维持多久。`,
    `The Three Kingdoms were three states after Eastern Han, not three provinces under one emperor. Cao Pi founded Wei at Luoyang in 220. Liu Bei took the Han title at Chengdu in 221, later called Shu Han. Sun Quan founded Wu at Jianye in 229. The split had already been set at Red Cliffs in 208: Cao Cao did not cross the Yangzi, Sun Quan held the lower river, and Liu Bei went on to take Yi Province.

Wei held the center and Guanzhong and had the most people and soldiers. Shu depended on Yi Province and attacked through Hanzhong; after Zhuge Liang died at Wuzhang it could no longer mount a great northern campaign. Wu held the Yangzi and the sea, and it also fought Shu, notably at Yiling.

The ending was sequential. In 263 Deng Ai crossed the Yinping tracks and Chengdu surrendered. In 265 Sima Yan replaced Wei and founded Jin. In 280 a Jin fleet came down the Yangzi, Sun Hao surrendered, and Wu ended. The split was over, but Jin's unity did not last long.`,
    [
      { year: 220, zh: "曹丕称帝，魏建国。", en: "Cao Pi founds Wei." },
      { year: 221, zh: "刘备在成都称帝。", en: "Liu Bei takes the imperial title at Chengdu." },
      { year: 229, zh: "孙权称帝，吴建国。", en: "Sun Quan founds Wu." },
      { year: 263, zh: "邓艾入成都，蜀汉亡。", en: "Deng Ai enters Chengdu and Shu Han falls." },
      { year: 280, zh: "西晋灭吴，三国结束。", en: "Jin conquers Wu and the Three Kingdoms end." },
    ],
  ),
  "western jin": book(
    "265–316",
    "265–316",
    "洛阳，后迁长安",
    "Luoyang, later Chang'an",
    `司马炎于265年接受魏帝禅让，国号晋，都洛阳。280年攻下建业，孙吴灭亡，东汉末年以来的分裂暂时结束。晋用宗室做诸侯王，本意是防止权臣再篡位，结果宗室各自掌握军队。290年武帝死，贾后干政，291年起八王相继起兵，洛阳和长安都成了战场。

内乱把边防抽空。匈奴、羯、氐、羌、鲜卑等已经内迁的部族首领乘机建国，史称五胡十六国的开端。311年永嘉之乱，匈奴汉赵攻陷洛阳，俘虏晋怀帝。晋室西迁长安。316年长安失守，愍帝出降，西晋灭亡。

次年，司马睿在建康即位，晋的名号转移到江南，那是东晋，不是西晋的继续经营北方。`,
    `Sima Yan accepted the Wei abdication in 265, founded Jin, and ruled from Luoyang. In 280 Jin took Jianye and Wu fell, so the split since the end of Eastern Han was briefly closed. Jin gave armies to imperial princes to stop another usurping minister. After Emperor Wu died in 290, Empress Jia intervened and from 291 the princes fought one another. Luoyang and Chang'an became battlefields.

The civil war emptied the frontier. Xiongnu, Jie, Di, Qiang, and Xianbei leaders who had already been settled inside the empire founded states of their own. This is the start of the Sixteen Kingdoms. In 311, during the Yongjia disaster, Han Zhao took Luoyang and captured Emperor Huai. The court moved to Chang'an. In 316 Chang'an fell and Emperor Min surrendered. Western Jin was over.

The next year Sima Rui took the throne at Jiankang. The Jin title moved south. That was Eastern Jin, not a continued northern government.`,
    [
      { year: 265, zh: "司马炎代魏，西晋建立。", en: "Sima Yan replaces Wei and founds Western Jin." },
      { year: 280, zh: "晋灭吴，短暂统一。", en: "Jin conquers Wu and briefly reunifies the realm." },
      { year: 291, zh: "八王之乱开始。", en: "The War of the Eight Princes begins." },
      { year: 311, zh: "永嘉之乱，洛阳陷落。", en: "Luoyang falls in the Yongjia disaster." },
      { year: 316, zh: "长安失守，西晋灭亡。", en: "Chang'an falls and Western Jin ends." },
    ],
  ),
  "eastern jin": book(
    "317–420",
    "317–420",
    "建康",
    "Jiankang",
    `317年司马睿在建康即位，晋的朝廷迁到江南，史称东晋。北方落入十六国。江南的大族王、谢、桓、庾与司马氏共治，所谓王与马共天下，说的就是皇权并不完整。流民组成的北府兵后来成为朝廷还能打仗的一支力量。

东晋几次北伐。祖逖收复过黄河以南的一部分，桓温打到过长安附近，都没能站住。383年苻坚的前秦南下，在淝水被谢玄的北府兵击败，前秦随即解体，北方再次分裂。东晋自己也没有因此恢复中原。

内部的篡夺比北伐更决定结局。桓玄一度称帝，刘裕起兵推翻他，又平定卢循，北伐灭南燕、后秦。420年刘裕废晋帝，自己称帝，国号宋。东晋结束，南朝开始。`,
    `In 317 Sima Rui took the throne at Jiankang and the Jin court moved south. The north passed to the Sixteen Kingdoms. The Wang, Xie, Huan, and Yu families shared power with the Sima house; the saying that the Wangs and the horse, the Sima, ruled together means the emperor did not rule alone. Armies of refugees, later the Northern Headquarters troops, became the force the court could still fight with.

Eastern Jin launched several northern campaigns. Zu Ti recovered part of the land south of the Yellow River, and Huan Wen reached near Chang'an, but neither held what he took. In 383 Fu Jian's Former Qin came south and was broken at the Fei River by Xie Xuan. Former Qin then collapsed and the north split again. Jin still did not recover the center.

Usurpation decided the end more than the northern wars. Huan Xuan briefly made himself emperor. Liu Yu overthrew him, defeated Lu Xun, and conquered Southern Yan and Later Qin. In 420 he deposed the Jin emperor and founded Song. Eastern Jin ended and the Southern dynasties began.`,
    [
      { year: 317, zh: "司马睿在建康即位。", en: "Sima Rui takes the throne at Jiankang." },
      { year: 383, zh: "淝水之战，前秦南征失败。", en: "Former Qin is defeated at the Fei River." },
      { year: 399, zh: "孙恩起兵，北府将领逐渐掌权。", en: "Sun En rebels and Northern Headquarters officers gain power." },
      { year: 417, zh: "刘裕攻入长安，后秦灭亡。", en: "Liu Yu enters Chang'an and Later Qin falls." },
      { year: 420, zh: "刘裕代晋，东晋灭亡。", en: "Liu Yu replaces Jin and Eastern Jin ends." },
    ],
  ),
  "southern dynasties": book(
    "420–589",
    "420–589",
    "建康",
    "Jiankang",
    `南朝是东晋以后依次更替的四个江南政权：宋、齐、梁、陈，都城都在建康。420年刘裕代晋，史称刘宋。479年萧道成代宋，建立南齐。502年萧衍代齐，建立梁。557年陈霸先代梁，建立陈。四个朝代的核心都在长江流域，淮河一带是与北朝反复争夺的边境。

刘宋初年曾有过较强的北伐，元嘉以后皇族自相残杀，国力下降。南齐年限短，宗室争位同样激烈。梁武帝萧衍在位近五十年，江南一度富庶，但548年侯景叛乱，建康陷落，梁的宗室在地方各自称帝，江南的秩序被撕开。陈霸先平定侯景余部后建国，陈的疆域是南朝四代里最小的，基本上限于长江以南。

589年，隋军渡过长江，攻入建康，陈后主出降。南朝结束。南北重新归一个朝廷，那是隋，不是陈的延续。`,
    `The Southern dynasties were four successive regimes after Eastern Jin: Song, Qi, Liang, and Chen, all based at Jiankang. Liu Yu founded Liu Song in 420. Xiao Daocheng founded Southern Qi in 479. Xiao Yan founded Liang in 502. Chen Baxian founded Chen in 557. Their core was the Yangzi valley, and the Huai frontier was contested with the north.

Early Liu Song could still campaign north. After the Yuanjia era the imperial clan fought itself. Southern Qi was short and just as violent at court. Emperor Wu of Liang ruled for nearly fifty years and the south was prosperous, but in 548 Hou Jing rebelled, Jiankang fell, and Liang princes set themselves up in the provinces. Chen Baxian founded a dynasty after clearing Hou Jing's remnants. Chen was the smallest of the four and stayed mostly south of the Yangzi.

In 589 a Sui army crossed the river, entered Jiankang, and the last Chen emperor surrendered. The Southern dynasties ended. North and south answered to one court again, and that court was Sui.`,
    [
      { year: 420, zh: "刘裕建宋，南朝开始。", en: "Liu Yu founds Song and the Southern dynasties begin." },
      { year: 479, zh: "萧道成建南齐。", en: "Xiao Daocheng founds Southern Qi." },
      { year: 502, zh: "萧衍建梁。", en: "Xiao Yan founds Liang." },
      { year: 548, zh: "侯景叛乱，建康陷落。", en: "Hou Jing rebels and Jiankang falls." },
      { year: 557, zh: "陈霸先建陈。", en: "Chen Baxian founds Chen." },
      { year: 589, zh: "隋军攻入建康，陈亡。", en: "Sui enters Jiankang and Chen falls." },
    ],
  ),
  "northern wei": book(
    "386–534",
    "386–534",
    "平城，494年后为洛阳",
    "Pingcheng, Luoyang after 494",
    `北魏是鲜卑拓跋部建立的王朝。386年拓跋珪复国称代王，随即改称魏王，后来称帝。439年太武帝拓跋焘灭北凉，北方结束十六国的长期分裂，统一在北魏之下。早期都平城，靠部族军队和府兵式的镇戍控制草原边缘与河北。

孝文帝迁都是北魏的转折。494年他把都城从平城迁到洛阳，禁穿胡服、改说汉语、改鲜卑姓为汉姓，皇族拓跋改姓元。他想把一个征服王朝变成中原式的朝廷。六镇军人觉得自己被洛阳的新贵族抛下。523年六镇起兵，北边的军事根基反了。

534年北魏分裂。高欢控制的东边以邺为政治中心，是东魏；宇文泰控制的关中是西魏。一个北魏到此结束。后来东魏变成北齐，西魏变成北周。`,
    `Northern Wei was founded by the Tuoba branch of the Xianbei. In 386 Tuoba Gui restored the state, first as Dai and then as Wei, and later took the imperial title. In 439 Emperor Taiwu conquered Northern Liang and ended the long split of the Sixteen Kingdoms. The early capital was Pingcheng, and the frontier was held by garrison towns.

Emperor Xiaowen's move south was the turning point. In 494 he shifted the capital from Pingcheng to Luoyang, banned Xianbei dress, required Chinese at court, and changed Xianbei surnames, the imperial clan becoming Yuan. He wanted a conquest dynasty to look like a Chinese court. The Six Garrisons felt abandoned by the new Luoyang nobility. They rebelled in 523, and the military base of the north turned against the court.

In 534 Northern Wei split. Gao Huan's east, centered on Ye, became Eastern Wei. Yuwen Tai's Guanzhong became Western Wei. One Northern Wei was over. Eastern Wei later became Northern Qi, and Western Wei became Northern Zhou.`,
    [
      { year: 386, zh: "拓跋珪复国，北魏兴起。", en: "Tuoba Gui restores the state that becomes Northern Wei." },
      { year: 439, zh: "太武帝统一北方。", en: "Emperor Taiwu unifies the north." },
      { year: 494, zh: "孝文帝迁都洛阳。", en: "Emperor Xiaowen moves the capital to Luoyang." },
      { year: 523, zh: "六镇起兵。", en: "The Six Garrisons rebel." },
      { year: 534, zh: "北魏分裂为东魏和西魏。", en: "Northern Wei splits into Eastern and Western Wei." },
    ],
  ),
  "northern dynasties": book(
    "534–581",
    "534–581",
    "邺与长安",
    "Ye and Chang'an",
    `534年北魏分裂以后，北方同时有两个朝廷。东边高欢父子掌握东魏，550年高洋废东魏皇帝，建立北齐，都邺。西边宇文泰掌握西魏，557年宇文觉称帝，建立北周，都长安。西魏、北周的府兵把乡兵和鲜卑军制捏在一起，后来成为隋唐兵制的一个来源。

北齐占有山东、河北，户口更密，但皇室内乱不断。北周占有关中和陇右，兵员较少，组织更紧。577年周武帝宇文邕攻灭北齐，北方再次统一。他禁佛、释放一部分寺户，想把人口从寺院里收归编户，第二年就死了。

581年，北周外戚杨坚废掉周静帝，自己称帝，国号隋。北周灭亡。隋随后在589年渡过长江，灭掉南方的陈。`,
    `After Northern Wei split in 534, the north had two courts. In the east the Gao family controlled Eastern Wei until Gao Yang deposed its emperor in 550 and founded Northern Qi at Ye. In the west Yuwen Tai controlled Western Wei until Yuwen Jue took the imperial title in 557 and founded Northern Zhou at Chang'an. The Western Wei and Northern Zhou militia system, mixing local troops with Xianbei organization, later fed into Sui and Tang military institutions.

Northern Qi held Shandong and Hebei and had more people, but its imperial house kept turning on itself. Northern Zhou held Guanzhong and Longyou, with fewer men and tighter organization. In 577 Emperor Wu of Zhou conquered Northern Qi and the north was one realm again. He restricted Buddhism and tried to return monastic dependents to the tax registers, then died the next year.

In 581 Yang Jian, a consort relative of the Zhou house, deposed the last Zhou emperor and founded Sui. Northern Zhou ended. In 589 Sui crossed the Yangzi and conquered Chen.`,
    [
      { year: 534, zh: "东魏、西魏并立。", en: "Eastern and Western Wei stand side by side." },
      { year: 550, zh: "高洋建北齐。", en: "Gao Yang founds Northern Qi." },
      { year: 557, zh: "宇文觉建北周。", en: "Yuwen Jue founds Northern Zhou." },
      { year: 577, zh: "北周灭北齐。", en: "Northern Zhou conquers Northern Qi." },
      { year: 581, zh: "杨坚代周，北周灭亡。", en: "Yang Jian replaces Zhou and Northern Zhou ends." },
    ],
  ),
  "sixteen kingdoms": book(
    "304–439",
    "304–439",
    "各国不同",
    "A different capital for each state",
    `十六国不是一个国家，而是西晋崩溃后在北方先后出现的一串政权。旧史常举匈奴、羯、氐、羌、鲜卑五族和汉族首领所建的成汉、前赵、后赵、前凉、前秦等，数目其实超过十六。它们有的占关中，有的占河北，有的只保河西的一块绿洲。

其中前秦在苻坚时几乎统一北方，383年淝水战败后立刻解体。439年北魏太武帝灭北凉，通常被当作十六国时期的结束。在这以前，没有一个朝廷能长期同时管住黄河和长江。`,
    `The Sixteen Kingdoms were not one state. They were the string of regimes that appeared in the north after Western Jin collapsed. Histories list more than sixteen, founded by Xiongnu, Jie, Di, Qiang, Xianbei, and Han leaders, among them Cheng Han, Former Zhao, Later Zhao, Former Liang, and Former Qin. Some held Guanzhong, some Hebei, and some only an oasis in the Hexi corridor.

Former Qin under Fu Jian nearly unified the north, then broke apart after the Fei River in 383. In 439 Northern Wei conquered Northern Liang, the usual end of the period. Before that, no court held both the Yellow River and the Yangzi for long.`,
    [
      { year: 304, zh: "匈奴刘渊称王，十六国的战乱开始。", en: "Liu Yuan of the Xiongnu takes a royal title and the wars begin." },
      { year: 319, zh: "石勒建后赵。", en: "Shi Le founds Later Zhao." },
      { year: 351, zh: "苻健建前秦。", en: "Fu Jian the elder founds Former Qin." },
      { year: 383, zh: "淝水战败，前秦解体。", en: "Former Qin collapses after the Fei River." },
      { year: 439, zh: "北魏灭北凉，北方重新统一。", en: "Northern Wei takes Northern Liang and the north is unified again." },
    ],
  ),
  "sui empire": book(
    "581–618",
    "581–618",
    "大兴，东都洛阳",
    "Daxing, with Luoyang as the eastern capital",
    `581年，北周外戚杨坚废静帝，建立隋，后来把都城设在长安附近的大兴城。他在位时编成《开皇律》，用科举的雏形从地方选人，并继续府兵。589年，隋的水军和陆军渡过长江，攻入建康，陈灭亡。东汉末年以来的南北分裂到此结束。

隋炀帝把政治重心往东移。他营东都洛阳，开通济渠，把黄河、淮河和长江连成一条可以运粮的水道，又三次亲征高句丽。运河后来成为唐朝转运的基础，当时却和高句丽战争、东征的徭役叠在一起。612年到614年的三次出兵都没有打下平壤，国内已经在反抗。

618年，炀帝在江都被宇文化及等人杀死。同一年，李渊在长安称帝，建立唐朝。隋的统一只维持了一代人。它把南北重新接到一个朝廷之下，也把这个朝廷的民力用尽了。`,
    `In 581 Yang Jian, a consort relative of the Northern Zhou house, deposed its last emperor and founded Sui. He built the capital at Daxing, beside Chang'an. His reign produced the Kaihuang code, an early form of examination recruitment, and a continued garrison militia. In 589 Sui fleets and armies crossed the Yangzi, entered Jiankang, and Chen fell. The north-south split that began at the end of Eastern Han was over.

Emperor Yang shifted the weight of the court east. He built an eastern capital at Luoyang, opened the Tongji Canal to carry grain between the Yellow River, the Huai, and the Yangzi, and led three campaigns against Goguryeo. The canal later fed the Tang transport system. At the time it arrived together with the levies for the eastern wars. The campaigns of 612 to 614 never took Pyongyang, and the country was already in revolt.

In 618 Yuwen Huaji and others killed Emperor Yang at Jiangdu. The same year Li Yuan took the imperial title at Chang'an and founded Tang. Sui unity lasted one generation. It joined north and south under one court, and it exhausted that court's people doing it.`,
    [
      { year: 581, zh: "杨坚称帝，隋建立。", en: "Yang Jian becomes emperor and Sui is founded." },
      { year: 589, zh: "隋灭陈，南北重新统一。", en: "Sui conquers Chen and north and south are reunited." },
      { year: 605, zh: "开通济渠，营东都洛阳。", en: "The Tongji Canal is opened and Luoyang is built as an eastern capital." },
      { year: 612, zh: "第一次征高句丽，无功而返。", en: "The first Goguryeo campaign returns without a decision." },
      { year: 618, zh: "炀帝在江都被杀，隋亡。", en: "Emperor Yang is killed at Jiangdu and Sui falls." },
    ],
  ),
  "tang empire": book(
    "618–907",
    "618–907",
    "长安",
    "Chang'an",
    `618年李渊在长安称帝，唐朝开始。他的儿子李世民在626年的玄武门之变后即位，年号贞观。贞观年间打败东突厥，在西域设安西都护，又把律令格式定成一套可以照着执行的制度。高宗时灭西突厥，668年与新罗联军攻下平壤，高句丽灭亡。690年到705年武则天改国号为周，但朝廷仍在原唐朝的版图和官僚上运转，史书通常把这十几年算在唐的历史里面。

开元、天宝是唐的盛期，也是转折。都城仍是长安，东南的粮食靠运河北运。750年是玄宗天宝九载：鲜于仲通在西洱河被南诏打败，次年高仙芝的军队在怛罗斯败于大食。唐在西域的优势开始动摇，但安史之乱还没有发生。安禄山755年在范阳起兵，攻入洛阳和长安。763年叛军被平，河西、陇右的大片土地却在混乱中落入吐蕃。此后藩镇世袭，河北更是半独立。

唐的灭亡是一层层失去控制，不是一天之间换了国号。875年黄巢起兵，880年攻入长安。朱温以平乱的名义掌握朝廷，907年废掉唐哀帝，建立后梁。唐朝结束，五代开始。图上750年前后的色块仍是700年那张底图的轮廓，国号按纪年写成唐。`,
    `Li Yuan took the imperial title at Chang'an in 618. His son Li Shimin became emperor after the Xuanwu Gate coup in 626. The Zhenguan era defeated the Eastern Turks, set up the Anxi protectorate, and fixed a law code officials could actually apply. Under Gaozong the Western Turks were destroyed, and in 668 a Tang and Silla army took Pyongyang. Goguryeo ended. From 690 to 705 Wu Zhao renamed the dynasty Zhou, but the court still ran on Tang territory and Tang offices. Histories usually keep those years inside the Tang story.

Kaiyuan and Tianbao were both the height and the turn. The capital was still Chang'an, and grain from the southeast came up the canal. The year 750 is the ninth of Tianbao: Nanzhao defeated Xianyu Zhongtong at the Xi'er River, and the next year Gao Xianzhi lost to the Arabs at Talas. Tang's advantage in the Western Regions was slipping, but the An Lushan rebellion had not yet begun. An Lushan rose at Fanyang in 755 and took Luoyang and Chang'an. The rebellion was broken by 763, but in the confusion Tibet took much of Hexi and Longyou. After that the military provinces became hereditary, and Hebei was half independent.

Tang did not fall by changing its name overnight. Huang Chao rose in 875 and entered Chang'an in 880. Zhu Wen took the court in the name of restoring order and in 907 deposed Emperor Ai to found Later Liang. Tang ended and the Five Dynasties began. The shape you see around 750 is still the year-700 sheet. The name is Tang because that is the year.`,
    [
      { year: 618, zh: "李渊称帝，都长安。", en: "Li Yuan becomes emperor at Chang'an." },
      { year: 626, zh: "玄武门之变，李世民即位。", en: "The Xuanwu Gate coup brings Li Shimin to the throne." },
      { year: 630, zh: "唐灭东突厥。", en: "Tang destroys the Eastern Turkic Khaganate." },
      { year: 668, zh: "唐与新罗灭高句丽。", en: "Tang and Silla destroy Goguryeo." },
      { year: 690, zh: "武则天改国号为周。", en: "Wu Zhao renames the dynasty Zhou." },
      { year: 755, zh: "安禄山起兵，长安此后不再稳固。", en: "An Lushan rebels and Chang'an is never secure in the same way again." },
      { year: 907, zh: "朱温废唐，五代开始。", en: "Zhu Wen deposes Tang and the Five Dynasties begin." },
    ],
  ),
  "five dynasties": book(
    "907–960",
    "907–960",
    "洛阳与开封轮换",
    "Luoyang and Kaifeng, in turn",
    `907年朱温废唐称帝，国号梁，史称后梁。此后中原五个短命王朝接连更替：后梁、后唐、后晋、后汉、后周，合称五代。南方和山西则有吴、南唐、吴越、闽、南汉、楚、前蜀、后蜀、荆南和北汉，合称十国。十国不一定同时存在，但中原的皇帝已经管不到江南。

五代的更替常常是军将夺位。后唐李存勖923年灭后梁。后晋石敬瑭为了契丹的援军，把燕云十六州割了出去，华北的北边门户从此不在中原朝廷手里。后周柴荣在位虽短，却打过南唐、攻过后汉的残余，也整顿过禁军。

960年，后周殿前都点检赵匡胤在陈桥兵变中黄袍加身，回到开封，废掉周恭帝。五代结束，北宋开始。北汉还要到979年才被灭，所以960年并不是所有分裂都已收拾干净。`,
    `In 907 Zhu Wen deposed the Tang emperor and founded Liang, called Later Liang. Five short dynasties then followed in the center: Later Liang, Later Tang, Later Jin, Later Han, and Later Zhou. In the south and in Shanxi were Wu, Southern Tang, Wuyue, Min, Southern Han, Chu, Former Shu, Later Shu, Jingnan, and Northern Han, the Ten Kingdoms. They did not all exist at once, but the emperor in the center no longer governed the Yangzi valley.

The throne usually changed by a general's coup. Li Cunxu of Later Tang destroyed Later Liang in 923. Shi Jingtang of Later Jin ceded the Sixteen Prefectures of Yan and Yun to the Khitans in exchange for an army, and the northern gate of the plain left the central court's hands. Chai Rong of Later Zhou had a short reign but fought Southern Tang, attacked what remained of Northern Han, and reorganized the imperial army.

In 960 Zhao Kuangyin, inspector of the palace army, was draped in a yellow robe at Chenqiao and returned to Kaifeng to depose the last Zhou emperor. The Five Dynasties ended and Northern Song began. Northern Han was not conquered until 979, so 960 did not close every split.`,
    [
      { year: 907, zh: "朱温建后梁，唐亡。", en: "Zhu Wen founds Later Liang and Tang ends." },
      { year: 923, zh: "后唐灭后梁。", en: "Later Tang destroys Later Liang." },
      { year: 936, zh: "石敬瑭割让燕云十六州。", en: "Shi Jingtang cedes the Sixteen Prefectures." },
      { year: 951, zh: "郭威建后周。", en: "Guo Wei founds Later Zhou." },
      { year: 960, zh: "陈桥兵变，赵匡胤建宋。", en: "The Chenqiao mutiny brings Zhao Kuangyin to the throne of Song." },
    ],
  ),
"song empire": book(
    "960–1279",
    "960–1279",
    "开封；1127年后为临安",
    "Kaifeng; Lin'an after 1127",
    `960年赵匡胤在陈桥兵变后建立宋，都开封。他用杯酒释兵权把将领的兵权收归中央，又派文官管地方财政。979年灭北汉，十国的局面基本结束。宋的户口和商业超过唐朝，但燕云十六州在后晋时已经割给契丹，宋多次北伐都没有收回。1005年澶渊之盟以后，宋每年给辽岁币，换来几十年的边境和平。1069年王安石变法，想用青苗、募役等法增加朝廷收入，朝中因此分成新旧两党。

1125年金灭辽，随即南下。1127年开封陷落，徽宗、钦宗被掳走，史称靖康之变，北宋灭亡。赵构在应天府即位，是为高宗，朝廷后来把行在定在临安，这就是南宋。1141年绍兴和议规定宋向金称臣、割让淮河以北，岳飞也被杀死。南宋靠东南的农田和海外贸易维持，军力集中在江淮和四川。

1234年宋与蒙古联合灭金，但蒙古随即把兵锋转向宋。1276年临安投降。1279年崖山海战，陆秀夫背着幼帝跳海，南宋灭亡。宋从开国就没有汉唐那样的北方门户，它的结束则是在海上，而不是在开封。`,
    `Zhao Kuangyin founded Song at Kaifeng after the Chenqiao mutiny in 960. He took military commands back to the center and sent civil officials to handle local revenue. Northern Han fell in 979 and the Ten Kingdoms were mostly gone. Song registered more households and trade than Tang, but the Sixteen Prefectures had already been ceded to the Khitans. Song's northern campaigns did not recover them. After the Chanyuan treaty of 1005, Song paid Liao an annual subsidy for decades of peace on the border. Wang Anshi's reforms from 1069 tried to raise revenue through farming loans and a service tax, and the court split into factions.

In 1125 Jin destroyed Liao and turned south. Kaifeng fell in 1127. Emperors Huizong and Qinzong were taken north. This is the Jingkang disaster, and Northern Song ended. Zhao Gou took the throne at Yingtian as Gaozong. The court later made Lin'an its temporary capital. That was Southern Song. The Shaoxing peace of 1141 made Song a vassal of Jin, ceded the land north of the Huai, and Yue Fei was killed. Southern Song lived on southeastern grain and sea trade, with its armies on the Huai and in Sichuan.

In 1234 Song and the Mongols destroyed Jin together, and the Mongols then turned on Song. Lin'an surrendered in 1276. At the sea battle of Yashan in 1279, Lu Xiufu jumped into the sea with the child emperor. Southern Song ended. Song never held the northern gates that Han and Tang had held. It ended at sea, not in Kaifeng.`,
    [
      { year: 960, zh: "赵匡胤建宋，都开封。", en: "Zhao Kuangyin founds Song at Kaifeng." },
      { year: 1005, zh: "澶渊之盟，宋辽约为兄弟之国。", en: "The Chanyuan treaty sets peace between Song and Liao." },
      { year: 1127, zh: "靖康之变，北宋灭亡，高宗南渡。", en: "The Jingkang disaster ends Northern Song and Gaozong moves south." },
      { year: 1141, zh: "绍兴和议，宋金以淮河为界。", en: "The Shaoxing peace sets the Huai as the Song-Jin border." },
      { year: 1276, zh: "元军进入临安。", en: "The Yuan army enters Lin'an." },
      { year: 1279, zh: "崖山战败，南宋灭亡。", en: "The defeat at Yashan ends Southern Song." },
    ],
  ),
  liao: book(
    "907–1125",
    "907–1125",
    "上京临潢",
    "Shangjing Linhuang",
    `辽是契丹人建立的王朝。907年耶律阿保机成为契丹可汗，916年称皇帝，后来几度把国号定为辽。都城上京临潢在今天的内蒙古巴林左旗一带。辽用南北面官：北面官按契丹部落的办法管理游牧地区，南面官用唐制管理燕云的州县。一个国家里同时有草原和农耕两套制度。

938年，后晋石敬瑭把燕云十六州割给契丹，辽因此得到长城内侧的一座门户。1005年与宋订立澶渊之盟，宋输岁币，双方维持了大约一百年的边境。辽的中期并不只是北方的边族，它是华北政治的一方。

1115年女真完颜阿骨打起兵。1125年金俘虏天祚帝，辽的本土灭亡。耶律大石率部西迁，在西域建立西辽，又延续了大约九十年，1218年亡于蒙古。若时间停在1125年以后，东北不应当再写成辽。`,
    `Liao was the Khitan dynasty. Yelü Abaoji became khan in 907 and emperor in 916. The state name later settled on Liao. The supreme capital, Shangjing Linhuang, lay in what is now Bairin Left Banner in Inner Mongolia. Liao used two administrations: the northern one governed the pastoral tribes in Khitan fashion, and the southern one governed the prefectures of Yan and Yun in Tang fashion. One state ran both steppe and farmland.

In 938 Shi Jingtang ceded the Sixteen Prefectures, so Liao held a gate inside the old wall line. The Chanyuan treaty of 1005 brought Song's annual payments and about a century of border peace. Middle Liao was not only a frontier people. It was one of the powers of north China.

In 1115 Aguda of the Jurchen Wanyan clan rose. In 1125 Jin captured the Tianzuo emperor and Liao's home territory ended. Yelü Dashi led a migration west and founded Western Liao, which lasted about ninety years and fell to the Mongols in 1218. After 1125 the northeast should not still be labeled Liao.`,
    [
      { year: 907, zh: "耶律阿保机成为契丹可汗。", en: "Yelü Abaoji becomes khan of the Khitans." },
      { year: 916, zh: "阿保机称皇帝。", en: "Abaoji takes the imperial title." },
      { year: 938, zh: "取得燕云十六州。", en: "Liao receives the Sixteen Prefectures." },
      { year: 1005, zh: "与宋订立澶渊之盟。", en: "Liao makes the Chanyuan treaty with Song." },
      { year: 1125, zh: "金灭辽，天祚帝被俘。", en: "Jin destroys Liao and captures the Tianzuo emperor." },
    ],
  ),
  jin: book(
    "1115–1234",
    "1115–1234",
    "会宁，后为中都、开封",
    "Huining, later Zhongdu and Kaifeng",
    `这里的金是女真完颜部建立的王朝，不是三四世纪的晋。1115年阿骨打在会宁称帝，国号金。金先在1125年灭辽，又在1127年攻下开封，俘虏宋的徽钦二帝，占有淮河以北。1153年海陵王把都城迁到燕京，称中都。金的鼎盛是一个占有华北、与南宋和西夏并立的朝廷。

金把猛安谋克的女真户迁到华北，又用汉制收税。南迁的女真人和华北农户的关系一直紧张。1211年以后，蒙古连续攻入华北。1214年宣宗把朝廷迁到开封，中都第二年失守。河北、山东大片土地不再由金直接治理。

1232年，蒙古在三峰山打败金的主力。1233年开封出降。末帝逃到蔡州。1234年，蒙古和南宋合兵攻破蔡州，金哀宗自杀，金亡。金从起兵到灭亡不到一百二十年。它灭了辽和北宋，自己又亡于蒙古。`,
    `This Jin is the Jurchen dynasty of the Wanyan clan, not the Jin of the third and fourth centuries. Aguda took the imperial title at Huining in 1115. Jin destroyed Liao in 1125 and took Kaifeng in 1127, capturing the Song emperors and holding the land north of the Huai. In 1153 Prince Hailing moved the capital to Yanjing and called it Zhongdu. At its height Jin was the court of north China, beside Southern Song and Western Xia.

Jin settled Jurchen households organized in meng'an and mouke on the plain and taxed the rest in Chinese fashion. The relation between those settlers and the local farmers stayed tense. After 1211 the Mongols broke into north China again and again. In 1214 Emperor Xuanzong moved the court to Kaifeng, and Zhongdu fell the next year. Much of Hebei and Shandong was no longer governed directly.

In 1232 the Mongols destroyed Jin's main army at Sanfeng. Kaifeng surrendered in 1233. The last emperor fled to Caizhou. In 1234 Mongol and Song troops took the city, Emperor Aizong killed himself, and Jin ended. From the rising to the fall was less than 120 years. Jin destroyed Liao and Northern Song, and then fell to the Mongols.`,
    [
      { year: 1115, zh: "阿骨打称帝，金建立。", en: "Aguda becomes emperor and Jin is founded." },
      { year: 1125, zh: "金灭辽。", en: "Jin destroys Liao." },
      { year: 1127, zh: "金攻下开封，北宋灭亡。", en: "Jin takes Kaifeng and Northern Song ends." },
      { year: 1153, zh: "海陵王迁都中都。", en: "Prince Hailing moves the capital to Zhongdu." },
      { year: 1214, zh: "金宣宗迁都开封。", en: "Emperor Xuanzong moves the court to Kaifeng." },
      { year: 1234, zh: "蔡州城破，金亡。", en: "Caizhou falls and Jin ends." },
    ],
  ),
  xixia: book(
    "1038–1227",
    "1038–1227",
    "兴庆",
    "Xingqing",
    `西夏是党项拓跋氏在河西建立的王朝。党项在唐末已经据有夏、绥一带，宋初李继迁、李德明继续扩张。1038年李元昊称帝，定都兴庆，就是今天的银川，国号大夏。它控制河套以西的绿洲和通往西域的道路，同时与宋、辽、后来的金时战时和。

元昊创制西夏文，用来翻译佛经和颁布命令。国家的收入靠绿洲农业、畜牧和转手贸易，也靠宋朝在和议里支付的岁赐。1044年以后的庆历和议让宋夏之间有过一段稳定，但边境城堡的争夺没有停止。

1226年蒙古大举进攻。1227年中兴府出降，西夏灭亡。同一年成吉思汗病死。西夏立国近两百年，最后没有留下一个能继续称帝的朝廷。`,
    `Western Xia was the dynasty of the Tangut Tuoba in the Hexi corridor. The Tanguts already held Xia and Sui at the end of Tang. Li Jiqian and Li Deming expanded further under the early Song. In 1038 Li Yuanhao took the imperial title, set his capital at Xingqing, today's Yinchuan, and called the state Xia. It controlled the oases west of the Ordos and the road toward the Western Regions, and it alternated war and peace with Song, Liao, and later Jin.

Yuanhao created the Tangut script for sutras and orders. The state lived on oasis farming, herds, transit trade, and the annual gifts Song paid after a peace. The Qingli settlement after 1044 brought a calmer stretch, but the border forts were still fought over.

The Mongols invaded in force in 1226. Zhongxing surrendered in 1227 and Western Xia ended. Chinggis Khan died the same year. The dynasty had lasted nearly two hundred years and left no court that could keep the imperial title.`,
    [
      { year: 1038, zh: "李元昊称帝，定都兴庆。", en: "Li Yuanhao becomes emperor at Xingqing." },
      { year: 1044, zh: "宋夏庆历和议。", en: "Song and Xia make the Qingli peace." },
      { year: 1226, zh: "蒙古大举攻夏。", en: "The Mongols invade Xia in force." },
      { year: 1227, zh: "西夏灭亡。", en: "Western Xia falls." },
    ],
  ),
  "mongol empire": book(
    "1206–1271",
    "1206–1271",
    "哈拉和林",
    "Karakorum",
    `1206年，铁木真在斡难河源被推举为成吉思汗，大蒙古国建立。他先统一草原，然后依次压服西夏、金和花剌子模。蒙古的军队按千户编制，又用驿站把辽阔的地面连起来。1227年西夏灭亡，同年成吉思汗死。1229年窝阔台即位，1234年与宋合兵灭金。

西征把蒙古的势力带到伏尔加河和两河流域。拔都经营钦察汗国，旭烈兀后来建立伊利汗国。1259年蒙哥死在四川合州钓鱼城下，忽必烈和阿里不哥争位。1260年忽必烈在开平即位，把统治中心从草原移向华北。

1271年忽必烈改国号为大元。大蒙古国作为一个还没有采用中原国号的政权，到这里告一段落。此后的中原王朝是元，西北和波斯的汗国则逐渐各自为政。`,
    `In 1206 Temüjin was acclaimed Chinggis Khan on the Onon and the Mongol state was founded. He first unified the steppe, then pressed Western Xia, Jin, and Khwarazm in turn. The army was organized in thousands, and post roads tied a very large territory together. Western Xia fell in 1227, and Chinggis died the same year. Ögedei succeeded in 1229, and in 1234 the Mongols and Song destroyed Jin.

The western campaigns carried Mongol power to the Volga and the Tigris. Batu built the Kipchak khanate, and Hülegü later founded the Ilkhanate. Möngke died below Diaoyu Fortress in Sichuan in 1259, and Khubilai contested the succession with Ariq Böke. In 1260 Khubilai took the throne at Kaiping and moved the center of rule from the steppe toward north China.

In 1271 Khubilai adopted the name Great Yuan. The Mongol state, as a regime that had not yet taken a Chinese dynastic name, ends there. After that the dynasty in China was Yuan, while the khanates in the northwest and in Persia increasingly went their own way.`,
    [
      { year: 1206, zh: "铁木真称成吉思汗。", en: "Temüjin is acclaimed Chinggis Khan." },
      { year: 1227, zh: "蒙古灭西夏。", en: "The Mongols destroy Western Xia." },
      { year: 1234, zh: "蒙古与宋灭金。", en: "The Mongols and Song destroy Jin." },
      { year: 1260, zh: "忽必烈在开平即位。", en: "Khubilai takes the throne at Kaiping." },
      { year: 1271, zh: "改国号为大元。", en: "The dynastic name becomes Great Yuan." },
    ],
  ),
  "great khanate": book(
    "1271–1368",
    "1271–1368",
    "大都",
    "Dadu",
    `1271年忽必烈定国号为大元，1272年以大都为都。元是蒙古人建立的中原王朝，不再只是草原上的大汗之国。1276年元军进入临安，1279年崖山一战结束南宋。元朝用行省管理地方，行省的范围后来影响了明清的区划。大都是政治中心，杭州和泉州则是商业和海外贸易的口岸。

元代户籍把人分成蒙古、色目、汉人、南人四等，这是征服王朝的等级，不是今天所说的民族分类。科举一度中断，后来恢复，但入仕的道路仍偏向蒙古和色目。黄河多次决口，加上钞法混乱，到了十四世纪中叶，朝廷已经很难同时应付饥荒和起义。

1351年红巾军起。1368年朱元璋的军队攻入大都，元惠宗逃往上都。中原的元朝到此结束。留在草原上的汗廷史称北元，不再治理华北和江南。这张底图在1500年以前常常仍用元朝的大轮廓，1368年以后中原的国号应按明来读，草原并没有因此变成明朝的稳定郡县。`,
    `In 1271 Khubilai named the dynasty Great Yuan, and in 1272 Dadu became the capital. Yuan was a Chinese dynasty founded by Mongols, not only a khanate on the steppe. The Yuan army entered Lin'an in 1276, and the battle of Yashan in 1279 ended Southern Song. Yuan governed through branch secretariats, whose territories later influenced Ming and Qing provinces. Dadu was the political center. Hangzhou and Quanzhou were the commercial and overseas ports.

Yuan household registers ranked people as Mongols, semu, Han, and southerners. That was a conquest ranking, not a modern ethnic classification. The examinations were suspended and later restored, but office still favored Mongols and semu. The Yellow River broke its banks repeatedly, the paper currency lost trust, and by the middle of the fourteenth century the court could not handle famine and rebellion at once.

The Red Turbans rose in 1351. In 1368 Zhu Yuanzhang's army entered Dadu and Emperor Huizong fled to Shangdu. Yuan rule in China ended there. The court that remained on the steppe is called Northern Yuan. It no longer governed the north China plain or the Yangzi valley. Before 1500 this base map often still uses the Yuan outline. After 1368 the name in China proper should be read as Ming. The steppe did not thereby become a stable Ming province.`,
    [
      { year: 1271, zh: "忽必烈定国号为大元。", en: "Khubilai adopts the name Great Yuan." },
      { year: 1276, zh: "元军进入临安。", en: "The Yuan army enters Lin'an." },
      { year: 1279, zh: "崖山之战，南宋灭亡。", en: "Yashan ends Southern Song." },
      { year: 1351, zh: "红巾军起事。", en: "The Red Turbans rise." },
      { year: 1368, zh: "明军进入大都，元廷北迁。", en: "The Ming army enters Dadu and the Yuan court flees north." },
    ],
  ),
ming: book(
    "1368–1644",
    "1368–1644",
    "南京，1421年后为北京",
    "Nanjing, Beijing after 1421",
    `1368年朱元璋在应天称帝，国号明，然后派兵攻入大都。明朝先都南京。永乐帝朱棣夺取皇位后，1421年把都城迁到北京，用运河把南方的粮食运到北方边防的门口。郑和从1405年到1433年七次下西洋，船队到达印度洋沿岸，这是朝贡和展示实力，不是海外殖民。

明朝的北边始终是问题。草原上的北元及其后继汗国没有消失。1449年土木堡一战，英宗被瓦剌俘虏，北京靠于谦守住。明朝后来修长城、设九边，用军镇而不是郡县去面对蒙古。张居正在万历初年推行一条鞭法，把役折成银，但万历后期的战争和矿税又把地方压得很紧。

1644年李自成的军队攻入北京，崇祯帝在煤山自缢，明朝在北京的朝廷结束。驻山海关的吴三桂向关外的清军求援，多尔衮入关，清迁都北京。南方还有弘光、隆武、永历等南明政权，永历帝1662年在昆明被杀。台湾的郑氏则到1683年才被清军攻灭。1368年以后若底图仍是元朝的大轮廓，中原的名字应是明，那块颜色没有把北元的草原单独切开。`,
    `In 1368 Zhu Yuanzhang took the imperial title at Yingtian, named the dynasty Ming, and sent an army into Dadu. Ming first ruled from Nanjing. After the Yongle emperor seized the throne, he moved the capital to Beijing in 1421 and used the canal to carry southern grain to the northern frontier. Zheng He's seven voyages from 1405 to 1433 reached the shores of the Indian Ocean. They were tribute and display, not overseas colonies.

The northern steppe remained a problem. Northern Yuan and the later khans did not vanish. In 1449 the Tumu crisis left Emperor Yingzong a captive of the Oirats, and Beijing held because of Yu Qian. Ming later rebuilt the wall and staffed nine border commands, facing the Mongols with garrisons rather than ordinary counties. Zhang Juzheng's Single Whip reform in the early Wanli reign commuted labor service into silver, but the wars and mine taxes of the late Wanli years pressed the provinces hard.

In 1644 Li Zicheng's army entered Beijing and the Chongzhen emperor hanged himself on Coal Hill. Ming's court in Beijing ended. Wu Sangui at Shanhai Pass asked the Qing army outside the wall for help. Dorgon entered the pass and Qing moved its capital to Beijing. Hongguang, Longwu, and Yongli regimes continued in the south. The Yongli emperor was killed at Kunming in 1662. The Zheng regime on Taiwan lasted until the Qing attack of 1683. If the sheet after 1368 is still the big Yuan outline, the name in China proper is Ming. That color does not cut the Northern Yuan steppe out as its own shape.`,
    [
      { year: 1368, zh: "朱元璋称帝，明军进入大都。", en: "Zhu Yuanzhang becomes emperor and the Ming army enters Dadu." },
      { year: 1421, zh: "永乐迁都北京。", en: "The Yongle emperor moves the capital to Beijing." },
      { year: 1449, zh: "土木堡，英宗被俘。", en: "Emperor Yingzong is captured at Tumu." },
      { year: 1644, zh: "李自成入北京，崇祯死，清军入关。", en: "Li Zicheng enters Beijing, Chongzhen dies, and the Qing army comes through the pass." },
      { year: 1662, zh: "永历帝死，南明在大陆结束。", en: "The Yongli emperor dies and Southern Ming on the mainland ends." },
    ],
  ),
  "qing empire": book(
    "1636–1912",
    "1636–1912",
    "盛京，1644年后为北京",
    "Shengjing, Beijing after 1644",
    `清是满洲爱新觉罗氏建立的王朝。1616年努尔哈赤在赫图阿拉建立后金。1636年皇太极改国号为清，族名满洲。1644年李自成攻入北京、崇祯自缢之后，清军在吴三桂的接应下入关，迁都北京。入关不是清朝的开始，而是它从关外朝廷变成中原王朝的一年。

清用了四十年才真正压平南方。1662年永历帝死。1681年康熙平定三藩。1683年施琅攻灭台湾的明郑，1684年设台湾府，隶福建省。台湾从这一年起是清朝的府县，不是清朝之外的另一国。乾隆中叶又用战争把准噶尔和天山南路纳入版图，设伊犁将军。清朝中叶的人口估计达到三亿以上，里面既有垦荒，也有统计口径和前代不同。

清朝的结束是一连串失败叠上去的。1840年的战争以后，条约口岸和割地陆续出现。1895年马关条约把台湾割给日本，那是疆域被削去，不是台湾变成了另一个历史中国。1911年武昌起义，1912年2月12日溥仪退位。清朝结束。`,
    `Qing was the dynasty of the Aisin Gioro. In 1616 Nurhaci founded the Later Jin at Hetu Ala. In 1636 Hong Taiji renamed it Qing and the people Manchu. In 1644, after Li Zicheng entered Beijing and the Chongzhen emperor died, the Qing army came through Shanhai Pass with Wu Sangui's help and moved the capital to Beijing. Entering the pass was not the beginning of Qing. It was the year a court outside the wall became the dynasty of China.

It took forty years to settle the south. The Yongli emperor died in 1662. The Kangxi emperor suppressed the Three Feudatories in 1681. In 1683 Shi Lang destroyed the Zheng regime on Taiwan, and in 1684 a Taiwan prefecture was created under Fujian. From that year Taiwan was a Qing prefecture, not a country outside Qing. In the middle of the Qianlong reign, war brought the Dzungars and the southern road of the Tianshan into the realm, under the Ili general. Mid-Qing population estimates pass 300 million, from new fields and also from a different way of counting.

The end was a stack of defeats. After the war of 1840, treaty ports and cessions followed. The Treaty of Shimonoseki in 1895 ceded Taiwan to Japan. That cut territory away. It did not make Taiwan another historical China. The Wuchang uprising came in 1911, and Puyi abdicated on 12 February 1912. Qing ended.`,
    [
      { year: 1616, zh: "努尔哈赤建后金。", en: "Nurhaci founds the Later Jin." },
      { year: 1636, zh: "皇太极改国号为清。", en: "Hong Taiji renames the dynasty Qing." },
      { year: 1644, zh: "清军入关，迁都北京。", en: "The Qing army enters the pass and moves the capital to Beijing." },
      { year: 1684, zh: "设台湾府，隶福建。", en: "Taiwan prefecture is created under Fujian." },
      { year: 1759, zh: "天山南北路纳入清朝版图。", en: "The lands north and south of the Tianshan are brought into Qing." },
      { year: 1912, zh: "溥仪退位，清朝结束。", en: "Puyi abdicates and Qing ends." },
    ],
  ),
  republic: book(
    "1912–1949",
    "1912–1949",
    "北京，1927年后为南京",
    "Beijing, Nanjing after 1927",
    `1912年1月1日，中华民国在南京成立，孙中山任临时大总统。2月清帝退位，袁世凯在北京接任。此后十几年是北洋政府时期，北京仍是首都，实权常常在军人手里。1926年到1928年北伐，国民政府把首都定在南京。

1931年九一八事变以后，东北被日本占领。1932年日本扶植溥仪建立满洲国，那是占领当局制造的政权，不是清朝复辟，也不是另一个中国。1937年卢沟桥事变以后，战争扩大到全国。1945年日本投降，台湾回归中国。

1949年10月1日中华人民共和国成立，定都北京。中华民国在大陆的统治到此结束。地图上1920年代写成军阀或藩镇的色块，按纪年应是中华民国，只是中央政府还不能指挥所有省份。`,
    `On 1 January 1912 the Republic of China was founded at Nanjing, with Sun Yat-sen as provisional president. The Qing emperor abdicated in February and Yuan Shikai took office in Beijing. The next decade and a half was the Beiyang period: Beijing remained the capital, and real power often sat with generals. The Northern Expedition of 1926 to 1928 settled the National Government at Nanjing.

After the Mukden incident of 1931, Japan occupied the northeast. In 1932 it installed Puyi as the head of Manchukuo. That was a regime made by the occupation, not a Qing restoration and not another China. After the Marco Polo Bridge in 1937 the war spread. Japan surrendered in 1945 and Taiwan returned to China.

The People's Republic of China was founded on 1 October 1949, with its capital at Beijing. Republican rule on the mainland ended. Shapes labeled warlords or garrisons in the 1920s should be read, for the year, as the Republic. The central government simply could not command every province.`,
    [
      { year: 1912, zh: "中华民国成立，清帝退位。", en: "The Republic is founded and the Qing emperor abdicates." },
      { year: 1928, zh: "北伐完成，首都在南京。", en: "The Northern Expedition ends and the capital is Nanjing." },
      { year: 1931, zh: "九一八事变，东北被占领。", en: "The Mukden incident begins the occupation of the northeast." },
      { year: 1937, zh: "全面抗战开始。", en: "The war of resistance becomes nationwide." },
      { year: 1945, zh: "日本投降，台湾回归。", en: "Japan surrenders and Taiwan returns." },
      { year: 1949, zh: "中华人民共和国成立。", en: "The People's Republic of China is founded." },
    ],
  ),
  china: book(
    "1949年以后",
    "After 1949",
    "北京",
    "Beijing",
    `1949年10月1日，中华人民共和国成立，定都北京。这一层里的中国包含台湾。台湾在1684年以后由清朝设府治理，1895年至1945年被日本占据，1945年回归。地图不把台湾画成中国之外的另一个国家。

2010年前后的国界已经接近今天的国家边界，但仍有争议地区。这一层用来读现代国家，不再用王朝的颜色覆盖。`,
    `The People's Republic of China was founded on 1 October 1949, with its capital at Beijing. China on this layer includes Taiwan. Taiwan was a Qing prefecture after 1684, was held by Japan from 1895 to 1945, and returned in 1945. The map does not draw Taiwan as a country outside China.

The borders around 2010 are close to today's states, but disputed places remain. This layer is for reading modern countries. It is not painted with dynasty colors.`,
    [
      { year: 1949, zh: "中华人民共和国成立，定都北京。", en: "The People's Republic is founded at Beijing." },
      { year: 1945, zh: "台湾在日本投降后回归中国。", en: "Taiwan returns to China after the Japanese surrender." },
      { year: 1971, zh: "中华人民共和国恢复在联合国的席位。", en: "The People's Republic takes the China seat at the United Nations." },
    ],
  ),
  "southern ming": book(
    "1644–1683",
    "1644–1683",
    "南京、福州、肇庆、昆明，后为台湾",
    "Nanjing, Fuzhou, Zhaoqing, Kunming, later Taiwan",
    `北京的明朝在1644年结束以后，明朝的宗室还在南方称帝。弘光在南京，不到一年就被清军攻破。隆武在福州，永历从肇庆转战到云南。1662年永历帝在昆明被吴三桂杀死，南明在大陆的朝廷结束。

郑成功1661年渡海，第二年攻下荷兰人占据的热兰遮城，在台湾继续用明朝的年号。1683年清军攻灭明郑，1684年设台湾府。三藩是平西、平南、靖南三王在云南、广东、福建的半独立势力，1673年吴三桂起兵，1681年被康熙压平。这些都是清朝统一过程里的中国政权，不是外国。`,
    `After Ming's Beijing court ended in 1644, Ming princes still took the imperial title in the south. Hongguang at Nanjing fell to the Qing army within a year. Longwu was at Fuzhou, and Yongli moved from Zhaoqing to Yunnan. In 1662 Wu Sangui killed the Yongli emperor at Kunming. The Southern Ming court on the mainland ended.

In 1661 Zheng Chenggong crossed to Taiwan and the next year took Fort Zeelandia from the Dutch, keeping a Ming reign title. The Qing destroyed the Zheng regime in 1683 and created Taiwan prefecture in 1684. The Three Feudatories were the semi-independent commands in Yunnan, Guangdong, and Fujian. Wu Sangui rebelled in 1673 and the Kangxi emperor suppressed them by 1681. These were Chinese regimes inside the Qing conquest, not foreign states.`,
    [
      { year: 1644, zh: "弘光在南京即位。", en: "The Hongguang emperor takes the throne at Nanjing." },
      { year: 1662, zh: "永历帝死，郑氏入台。", en: "The Yongli emperor dies and the Zheng regime holds Taiwan." },
      { year: 1673, zh: "三藩之乱开始。", en: "The revolt of the Three Feudatories begins." },
      { year: 1683, zh: "清军攻灭明郑。", en: "The Qing army destroys the Zheng regime." },
    ],
  ),
  manchukuo: book(
    "1932–1945",
    "1932–1945",
    "长春",
    "Changchun",
    `1931年九一八事变后，日本关东军占领中国东北。1932年扶植清朝废帝溥仪，成立满洲国，后来改称满洲帝国，以长春为首都。这个政权的军队、铁路和外交都由日本控制。它不是清朝的复辟，也不是从中华民国里合法分出的国家。

1945年8月日本投降，满洲国同时解体，溥仪被俘。东北回到中国。`,
    `After the Mukden incident of 1931, the Japanese Kwantung Army occupied China's northeast. In 1932 it installed the deposed Qing emperor Puyi as head of Manchukuo, later called the Empire of Manchuria, with its capital at Changchun. The army, railways, and foreign relations were controlled by Japan. It was not a Qing restoration and not a state lawfully separated from the Republic.

When Japan surrendered in August 1945, Manchukuo collapsed and Puyi was captured. The northeast returned to China.`,
    [
      { year: 1931, zh: "九一八事变，东北被日本占领。", en: "The Mukden incident begins the Japanese occupation." },
      { year: 1932, zh: "溥仪出任满洲国执政。", en: "Puyi is installed as head of Manchukuo." },
      { year: 1945, zh: "日本投降，满洲国解体。", en: "Japan surrenders and Manchukuo collapses." },
    ],
  ),
  tungning: book(
    "1661–1683",
    "1661–1683",
    "安平",
    "Anping",
    `1661年郑成功从金门、厦门渡海，进攻荷兰东印度公司占据的台湾西南部。1662年荷兰人交出热兰遮城。郑氏在岛上继续奉明朝正朔，史称明郑或郑氏政权。郑成功不久病死，儿子郑经、孙子郑克塽相继执政。

1683年清水师提督施琅在澎湖打败郑军，郑克塽投降。1684年清朝设台湾府，归福建省。明郑是明朝的残余，不是一个与中国无关的国家。`,
    `In 1661 Zheng Chenggong crossed from Kinmen and Xiamen and attacked the Dutch East India Company's hold on southwestern Taiwan. In 1662 the Dutch surrendered Fort Zeelandia. The Zheng regime kept a Ming reign title. Histories call it the Zheng regime or Ming-Zheng. Zheng Chenggong soon died. His son Zheng Jing and grandson Zheng Keshuang followed.

In 1683 the Qing admiral Shi Lang defeated the Zheng fleet at Penghu and Zheng Keshuang surrendered. In 1684 Qing created Taiwan prefecture under Fujian. The Zheng regime was a remnant of Ming, not a country unrelated to China.`,
    [
      { year: 1662, zh: "荷兰人交出热兰遮城。", en: "The Dutch surrender Fort Zeelandia." },
      { year: 1683, zh: "施琅平台，郑克塽投降。", en: "Shi Lang takes Taiwan and Zheng Keshuang surrenders." },
      { year: 1684, zh: "清朝设台湾府。", en: "Qing creates Taiwan prefecture." },
    ],
  ),
  "taiwan occupied": book(
    "1895–1945",
    "1895–1945",
    "台北",
    "Taipei",
    `1895年《马关条约》把台湾和澎湖割给日本。日本在台北设总督府，直到1945年。这五十年是日本占据中国领土，不是台湾成为一个与中国无关的国家。

1945年日本投降，台湾回归中国。`,
    `The Treaty of Shimonoseki in 1895 ceded Taiwan and the Penghu Islands to Japan. Japan governed from a governor-general in Taipei until 1945. Those fifty years were a Japanese occupation of Chinese territory, not the creation of a country unrelated to China.

Taiwan returned to China when Japan surrendered in 1945.`,
    [
      { year: 1895, zh: "马关条约割让台湾。", en: "Shimonoseki cedes Taiwan." },
      { year: 1945, zh: "日本投降，台湾回归。", en: "Japan surrenders and Taiwan returns." },
    ],
  ),
koguryo: book(
    "约前1世纪–668",
    "about the 1st century BCE–668",
    "国内城，后迁平壤",
    "Gungnae, later Pyongyang",
    `高句丽兴起于西汉末年的浑江、鸭绿江一带。后世史书把它的建国追溯到公元前37年，可靠的活动在东汉已经清楚。它先都国内城，再迁丸都，427年长寿王把都城迁到平壤。鼎盛时北抵辽东，南与百济、新罗相接，是半岛北部领土最广的政权。

它长期处在中原王朝的东北边缘。隋炀帝612年到614年三次出兵都没有打下平壤。645年唐太宗亲征，在安市受阻后撤回。真正的灭亡在668年：唐将李勣与新罗联军攻破平壤，宝藏王被俘，高句丽作为国家解体。平壤以南渐入新罗，辽东由安东都护府管领，后来渤海又在它的东北故地立国。

750年地图上不应当再画高句丽。要看它，得把年份退到668年以前。`,
    `Goguryeo rose along the Hun and Yalu rivers at the end of Western Han. Later histories date its founding to 37 BCE. Its activity is clear by Eastern Han. It ruled first from Gungnae, then from Hwando, and in 427 King Jangsu moved the capital to Pyongyang. At its height it reached the Liaodong and met Baekje and Silla to the south. It was the largest state in the northern peninsula.

It sat on the northeastern edge of the Chinese dynasties. Emperor Yang's three campaigns from 612 to 614 never took Pyongyang. Emperor Taizong campaigned in person in 645 and withdrew after being stopped at Ansi. The real end came in 668. The Tang general Li Ji and a Silla army took Pyongyang, King Bojang was captured, and Goguryeo as a state broke up. The land south of Pyongyang passed toward Silla, Liaodong was put under the Andong protectorate, and Balhae later rose in the northeastern part of the old territory.

Goguryeo should not be painted in 750. To see it, move the year back before 668.`,
    [
      { year: -37, zh: "后世把高句丽的建国记在这一年。", en: "Later histories date Goguryeo's founding to this year." },
      { year: 427, zh: "长寿王迁都平壤。", en: "King Jangsu moves the capital to Pyongyang." },
      { year: 612, zh: "隋炀帝第一次大举征高句丽。", en: "Emperor Yang's first great campaign begins." },
      { year: 645, zh: "唐太宗亲征，未能攻下安市。", en: "Emperor Taizong campaigns in person and does not take Ansi." },
      { year: 668, zh: "唐与新罗攻破平壤，高句丽亡。", en: "Tang and Silla take Pyongyang and Goguryeo falls." },
    ],
  ),
  paekche: book(
    "约前18–663",
    "about 18 BCE–663",
    "慰礼，后为泗沘",
    "Wirye, later Sabi",
    `百济在朝鲜半岛西南部。后世把它的建国记在公元前18年，早期都慰礼城，538年圣王迁都泗沘。它与高句丽、新罗并立，又跨海与南朝和日本列岛的政权往来。

七世纪中叶，新罗转向与唐结盟。660年唐将苏定方攻破泗沘，百济义慈王投降。百济王室和旧将在周留城继续抵抗，并请来倭国的援军。663年白江口一战，唐与新罗的水军打败倭军，百济复国失败。百济作为国家结束。`,
    `Baekje lay in the southwest of the Korean peninsula. Later histories date it to 18 BCE. Its early capital was Wirye, and in 538 King Seong moved to Sabi. It stood beside Goguryeo and Silla and kept contacts across the sea with the Southern dynasties and with states in the Japanese islands.

In the mid-seventh century Silla allied with Tang. In 660 the Tang general Su Dingfang took Sabi and King Uija surrendered. Baekje princes and officers held out at Juryu and called in a Wa fleet. In 663, at the battle of Baekgang, the Tang and Silla fleet defeated that force. The restoration failed. Baekje as a state ended.`,
    [
      { year: 538, zh: "圣王迁都泗沘。", en: "King Seong moves the capital to Sabi." },
      { year: 660, zh: "唐与新罗攻破泗沘。", en: "Tang and Silla take Sabi." },
      { year: 663, zh: "白江口战败，百济复国失败。", en: "The defeat at Baekgang ends the attempt to restore Baekje." },
    ],
  ),
  silla: book(
    "约前57–935",
    "about 57 BCE–935",
    "金城",
    "Gyeongju",
    `新罗在半岛东南部，都金城，就是后来的庆州。它早期只是辰韩诸部中的一个，六世纪以后用战争和制度把疆域向汉江推进。七世纪它选择与唐结盟，660年灭百济，668年与唐合灭高句丽。唐设安东都护府以后，新罗又与唐争夺半岛，最终把大同江以南大体收入自己的统治，史称统一新罗。

八到九世纪，真骨贵族垄断官位，地方豪族拥有军队。935年，敬顺王把国家让给高丽的王建。新罗结束。高丽从918年已经在开城立国，到935年才接收新罗的残余。`,
    `Silla was in the southeast of the peninsula, with its capital at Gyeongju. It began as one of the Jinhan groups. From the sixth century it pushed toward the Han River by war and administration. In the seventh it allied with Tang, destroyed Baekje in 660, and joined Tang to destroy Goguryeo in 668. After Tang set up the Andong protectorate, Silla fought Tang for the peninsula and ended holding most of the land south of the Taedong. Histories call this Unified Silla.

In the eighth and ninth centuries the true-bone aristocracy monopolized office and local magnates kept armies. In 935 King Gyeongsun yielded the state to Wang Geon of Goryeo. Silla ended. Goryeo had already been founded at Gaeseong in 918. It received what remained of Silla in 935.`,
    [
      { year: 660, zh: "新罗与唐灭百济。", en: "Silla and Tang destroy Baekje." },
      { year: 668, zh: "新罗与唐灭高句丽。", en: "Silla and Tang destroy Goguryeo." },
      { year: 935, zh: "敬顺王降于高丽，新罗亡。", en: "King Gyeongsun yields to Goryeo and Silla ends." },
    ],
  ),
  gaya: book(
    "约42–562",
    "about 42–562",
    "金官等",
    "Gimhae and other towns",
    `伽倻是洛东江下游的一群小国，不是一个统一的王国。金官伽倻最著名，与倭和百济都有贸易。六世纪新罗向南扩张。562年，大伽倻被新罗灭掉，伽倻诸国的历史结束。`,
    `Gaya was a cluster of small states on the lower Nakdong, not one unified kingdom. Geumgwan Gaya is the best known, and it traded with Wa and Baekje. In the sixth century Silla pushed south. In 562 Silla destroyed Daegaya, and the Gaya states ended.`,
    [
      { year: 562, zh: "新罗灭大伽倻。", en: "Silla destroys Daegaya." },
    ],
  ),
  parhae: book(
    "698–926",
    "698–926",
    "上京龙泉府",
    "Sanggyeong",
    `渤海是高句丽灭亡以后在东北兴起的国家。698年大祚荣在东牟山建国，后来受唐册封，称渤海郡王，都城最后定在上京龙泉府。它占有松花江、牡丹江一带，南与新罗以泥河一带为界，西与唐的营州、契丹相邻。唐和日本都把它当作海东的一国。

926年，契丹耶律阿保机攻破上京，末王被俘，渤海灭亡。契丹在它的故地设东丹国，不久迁走渤海遗民。渤海不是高句丽的简单改名，而是高句丽旧地和粟末靺鞨共同形成的新国家。`,
    `Balhae rose in the northeast after Goguryeo fell. In 698 Dae Joyeong founded a state at Dongmo Mountain. Tang later invested him as prince of Balhae. The capital settled at Sanggyeong. The state held the Sungari and Mudan valleys, met Silla near the Ni River, and bordered Tang's Yingzhou and the Khitans. Tang and Japan both treated it as a state across the sea to the east.

In 926 Yelü Abaoji took Sanggyeong, the last king was captured, and Balhae fell. The Khitans set up Dongdan on its land and soon moved the Balhae population. Balhae was not Goguryeo under a new name. It was a new state formed on old Goguryeo ground together with the Sumo Mohe.`,
    [
      { year: 698, zh: "大祚荣建国。", en: "Dae Joyeong founds the state." },
      { year: 926, zh: "契丹攻破上京，渤海亡。", en: "The Khitans take Sanggyeong and Balhae falls." },
    ],
  ),
  tibet: book(
    "约7世纪–9世纪为帝国",
    "an empire in the 7th–9th centuries",
    "逻些",
    "Lhasa",
    `吐蕃在七世纪由松赞干布统一，都逻些。他与唐朝和亲，文成公主入藏在641年。吐蕃用赞普为君号，用告身和部落军制管理高原。八世纪后半，赤松德赞在位时，吐蕃与唐反复争夺青海、河西和西域的城池。安史之乱以后，唐的西北边军内调，763年吐蕃一度攻入长安，随后长期占有河西、陇右。

842年赞普朗达玛被杀，王室分裂，统一的吐蕃帝国解体。此后卫藏、安多、康区不再由一个赞普号令。底图若在九世纪以后仍把整个高原涂成一块，那是综合画法，不是一个还在运转的帝国。`,
    `The Tibetan empire was unified in the seventh century by Songtsen Gampo, with its capital at Lhasa. He made a marriage alliance with Tang, and Princess Wencheng entered Tibet in 641. The ruler's title was tsenpo, and the plateau was governed through ranks and tribal armies. In the later eighth century, under Trisong Detsen, Tibet and Tang fought over the towns of Qinghai, Hexi, and the Western Regions. After the An Lushan rebellion, Tang's northwestern garrisons were called inward. In 763 Tibet briefly entered Chang'an and then held Hexi and Longyou for a long time.

In 842 the tsenpo Langdarma was killed, the royal house split, and the unified empire broke up. Ü-Tsang, Amdo, and Kham were no longer ordered by one tsenpo. If a later sheet still paints the whole plateau one color, that is a general outline, not an empire still in operation.`,
    [
      { year: 641, zh: "文成公主入藏。", en: "Princess Wencheng enters Tibet." },
      { year: 763, zh: "吐蕃攻入长安，并占有河陇。", en: "Tibet enters Chang'an and holds the Hexi and Longyou region." },
      { year: 842, zh: "朗达玛被杀，帝国分裂。", en: "Langdarma is killed and the empire splits." },
    ],
  ),
  "nan chao": book(
    "738–902",
    "738–902",
    "太和城、阳苴咩城",
    "Taihe, then Yangjumie",
    `南诏是洱海地区六诏中的蒙舍诏统一邻部以后建立的政权。738年皮逻阁受唐册封为云南王，迁居太和城。南诏位于唐和吐蕃之间，两边都曾向它拉拢。750年南诏攻杀云南太守，与唐决裂，次年又在西洱河打败鲜于仲通。它随后向东扩展到云南东部。

南诏的王室后来内乱。902年郑买嗣杀掉蒙氏末代国主，建立大长和。南诏结束。大长和、大天兴、大义宁只维持了三十几年。937年段思平建立大理。`,
    `Nanzhao was founded when the Mengshe zhao, one of six zhao around Erhai, unified its neighbors. In 738 Piluoge was invested by Tang as prince of Yunnan and moved to Taihe. Nanzhao sat between Tang and Tibet, and both tried to pull it in. In 750 it killed the Tang governor of Yunnan and broke with Tang. The next year it defeated Xianyu Zhongtong at the Xi'er River. It then expanded into eastern Yunnan.

The royal house later fell into internal violence. In 902 Zheng Maisi killed the last Meng ruler and founded Dachanghe. Nanzhao ended. Dachanghe and its two short successors lasted only a few decades. In 937 Duan Siping founded Dali.`,
    [
      { year: 738, zh: "皮逻阁受封云南王。", en: "Piluoge is invested as prince of Yunnan." },
      { year: 750, zh: "南诏与唐决裂。", en: "Nanzhao breaks with Tang." },
      { year: 902, zh: "郑买嗣建大长和，南诏亡。", en: "Zheng Maisi founds Dachanghe and Nanzhao ends." },
    ],
  ),
  dali: book(
    "937–1253",
    "937–1253",
    "阳苴咩城",
    "Yangjumie",
    `937年段思平灭大义宁，建立大理，仍以阳苴咩城为都，就是今天大理一带。大理继承了南诏的地盘，但更依靠段氏和高氏的共同统治，对宋大多保持朝贡和贸易，不再像南诏那样频繁攻入四川。宋朝也没有把云南收为郡县。

1253年忽必烈率蒙古军穿过川西，攻下大理城，段氏后来被留为世袭总管。大理作为独立王国结束。它的灭亡比南宋更早，是蒙古迂回南宋西南的一步。`,
    `In 937 Duan Siping destroyed Dayining and founded Dali, still at Yangjumie, near modern Dali. Dali inherited Nanzhao's territory, but it rested on a shared rule of the Duan and Gao families. Toward Song it mostly kept tribute and trade, and it did not raid Sichuan the way Nanzhao had. Song never made Yunnan into ordinary prefectures.

In 1253 Khubilai led a Mongol army across western Sichuan and took Dali. The Duan family was later kept as hereditary governors. Dali as an independent kingdom ended. It fell before Southern Song. The campaign was the Mongol move around Song's southwestern side.`,
    [
      { year: 937, zh: "段思平建立大理。", en: "Duan Siping founds Dali." },
      { year: 1253, zh: "蒙古攻下大理。", en: "The Mongols take Dali." },
    ],
  ),
  gokturks: book(
    "552–630；682–744",
    "552–630 and 682–744",
    "於都斤山一带",
    "the Ötüken region",
    `突厥在552年由土门打败柔然之后建立汗国，很快分成东、西两部。东突厥控有漠北，西突厥伸向西域。583年以后两边已经不能合成一个朝廷。630年唐俘获颉利可汗，东突厥前汗国灭亡，许多部众归唐。

682年骨咄禄在漠北复国，史称后突厥。默啜、毗伽可汗时期一度很强，仍与唐时战时和。744年回纥骨力裴罗与葛逻禄、拔悉蜜联合，攻杀白眉可汗。后突厥灭亡，漠北转入回鹘。750年不应当再画突厥。`,
    `The Turks founded a khaganate in 552 after Bumin defeated the Rouran. It soon split into eastern and western halves. The east held the Mongolian plateau and the west reached into the Western Regions. After 583 they were no longer one court. In 630 Tang captured the Illig Qaghan and the first eastern khaganate ended. Many of its people submitted to Tang.

In 682 Qutlugh restored a state on the plateau, the second khaganate. Under Qapaghan and Bilge it was strong again and still alternated war and peace with Tang. In 744 the Uyghur Qutlugh Boyla, with the Karluks and Basmyls, killed the last qaghan. The second khaganate ended and the plateau passed to the Uyghurs. The Turks should not be painted in 750.`,
    [
      { year: 552, zh: "土门破柔然，突厥汗国建立。", en: "Bumin defeats the Rouran and the khaganate is founded." },
      { year: 630, zh: "唐灭东突厥。", en: "Tang destroys the Eastern Turks." },
      { year: 682, zh: "骨咄禄复国，后突厥开始。", en: "Qutlugh restores the khaganate." },
      { year: 744, zh: "回纥攻灭后突厥。", en: "The Uyghurs destroy the second khaganate." },
    ],
  ),
  "western gokturk": book(
    "583–657",
    "583–657",
    "碎叶一带",
    "the Suyab region",
    `西突厥在六世纪后期与东突厥分开，控制西域到咸海方向的绿洲和部落。唐高宗时，苏定方在657年攻破西突厥，俘获沙钵罗可汗。唐随后在西域设羁縻州和安西都护府。西突厥作为汗国结束。750年的地图上不应当再留着它。`,
    `The Western Turks separated from the east in the later sixth century and held oases and tribes from the Western Regions toward the Aral. In 657, under Emperor Gaozong, Su Dingfang broke them and captured the Ashina Helu qaghan. Tang then set up loose-rein prefectures and the Anxi protectorate. The Western Turkic khaganate ended. It should not remain on a map of 750.`,
    [
      { year: 657, zh: "唐灭西突厥。", en: "Tang destroys the Western Turks." },
    ],
  ),
  "uyghur khaganate": book(
    "744–840",
    "744–840",
    "斡耳朵八里",
    "Ordu-Baliq",
    `744年回纥骨力裴罗称汗，取代后突厥，后来改称回鹘。回鹘在漠北建城，并在安史之乱中两次出兵帮助唐朝收复两京，因此得到绢马贸易和公主和亲。汗国信摩尼教，可汗的权力比突厥时期更依赖城市和商路。

840年黠戛斯攻破回鹘城，汗国解体。部众西迁：一支到河西，后来成为甘州回鹘；一支到天山东部，后来建立高昌回鹘。漠北不再有一个统一的回鹘汗国。`,
    `In 744 the Uyghur Qutlugh Boyla took the qaghanate from the second Turkic khaganate. The people were later called Uyghur. They built a city on the Mongolian plateau and twice sent troops to help Tang recover the two capitals during the An Lushan rebellion, receiving the silk-for-horses trade and marriage alliances. The khaganate adopted Manichaeism, and the qaghan's power depended more on the city and the trade road than the earlier Turkic form had.

In 840 the Kyrgyz took the Uyghur city and the khaganate broke up. One group moved to Hexi and became the Ganzhou Uyghurs. Another moved to the eastern Tianshan and later founded the Qocho Uyghur state. There was no longer one Uyghur khaganate on the plateau.`,
    [
      { year: 744, zh: "回纥取代后突厥。", en: "The Uyghurs replace the second Turkic khaganate." },
      { year: 840, zh: "黠戛斯攻破回鹘，汗国解体。", en: "The Kyrgyz take the city and the khaganate breaks up." },
    ],
  ),
xiongnu: book(
    "约前3世纪–1世纪",
    "about the 3rd century BCE–1st century CE",
    "单于庭，随季节迁移",
    "the chanyu's camp, moving with the season",
    `匈奴在战国后期已经是草原上的大联盟。冒顿单于在前209年杀掉父亲自立，东破东胡，西逐月氏，南下与秦、汉争夺河南地。前200年刘邦在白登被围，西汉因此长期和亲。武帝时卫青、霍去病把匈奴赶到漠北，但没有消灭它。

公元48年前后，匈奴分裂为南、北。南匈奴附汉，入居塞内。北匈奴在89年到91年被窦宪打败，一部分西迁。匈奴作为统一的草原帝国结束。后来的柔然、突厥是新的联盟，不是匈奴的改名。`,
    `By the late Warring States the Xiongnu were the great confederation of the steppe. In 209 BCE Modu killed his father, broke the Donghu to the east, drove the Yuezhi west, and fought Qin and Han for the Ordos. In 200 BCE Liu Bang was trapped at Baideng, and Western Han relied on marriage alliances for a long time. Under Emperor Wu, Wei Qing and Huo Qubing pushed the Xiongnu north of the Gobi. They did not destroy them.

Around 48 CE the Xiongnu split into southern and northern halves. The south submitted to Han and settled inside the frontier. Dou Xian defeated the north from 89 to 91, and part of it moved west. The Xiongnu ended as one steppe empire. The later Rouran and Turks were new confederations, not the Xiongnu under another name.`,
    [
      { year: -209, zh: "冒顿自立为单于。", en: "Modu makes himself chanyu." },
      { year: -200, zh: "白登之围。", en: "Liu Bang is besieged at Baideng." },
      { year: -119, zh: "汉军深入漠北。", en: "Han armies campaign north of the Gobi." },
      { year: 48, zh: "匈奴分为南北。", en: "The Xiongnu split into southern and northern halves." },
      { year: 91, zh: "北匈奴战败西迁。", en: "The Northern Xiongnu are defeated and move west." },
    ],
  ),
  nanyue: book(
    "约前204–前111",
    "about 204–111 BCE",
    "番禺",
    "Panyu",
    `南越是秦末南海尉赵佗建立的政权，都番禺。秦亡以后，赵佗占据岭南三郡，自称南越武王，后来又称帝，又在汉的压力下取消帝号。南越用中原的郡县名字，也联合当地的越人首领。它是独立于汉的岭南王国，不是汉的一个普通的郡。

前111年，汉武帝出兵，南越内乱，番禺被攻破，南越灭亡。汉在岭南设置儋耳、珠崖、南海、苍梧、郁林、合浦、交趾、九真、日南等郡。闽越也在差不多同一年被废。此后岭南归汉的郡县，不再是南越。`,
    `Nanyue was founded at the end of Qin by Zhao Tuo, the commander of Nanhai, with its capital at Panyu. After Qin fell he held the three Lingnan commanderies, called himself king of Nanyue, briefly took an imperial title, and then dropped it under Han pressure. Nanyue used Chinese commandery names and also worked with local Yue leaders. It was a Lingnan kingdom outside Han, not an ordinary Han commandery.

In 111 BCE Emperor Wu sent an army. Nanyue was already divided, Panyu fell, and the kingdom ended. Han created commanderies across Lingnan, including Nanhai, Cangwu, Yulin, Hepu, Jiaozhi, Jiuzhen, and Rinan. Minyue was abolished at about the same time. After that Lingnan was Han commanderies, not Nanyue.`,
    [
      { year: -204, zh: "赵佗建立南越。", en: "Zhao Tuo founds Nanyue." },
      { year: -196, zh: "汉遣陆贾，赵佗接受汉的王号。", en: "Lu Jia is sent and Zhao Tuo accepts a Han royal title." },
      { year: -111, zh: "汉灭南越，在岭南设郡。", en: "Han destroys Nanyue and founds commanderies in Lingnan." },
    ],
  ),
  japan: book(
    "710年以后的日本",
    "Japan after 710",
    "平城京、平安京、镰仓、江户，随时代而变",
    "Nara, Heian, Kamakura, or Edo, by period",
    `710年日本迁都平城京，进入奈良时代。794年迁到平安京，天皇的朝廷在京都维持了很长时间，实权后来落到藤原氏和外戚手里。1185年以后，源赖朝在镰仓建立幕府，天皇仍在，征夷大将军才是军政的中心。1333年镰仓幕府灭亡。1467年应仁之乱以后，列岛进入战国，各地大名自守。

1603年德川家康在江户建立幕府。1615年大阪之阵以后，德川的支配稳定下来，直到1867年大政奉还。这几百年里，底图会把日本写成大和、藤原、镰仓或江户。那是同一个列岛上的不同政府，不是几个外国。`,
    `In 710 the court moved to Nara. In 794 it moved to Heian. The emperor's court stayed at Kyoto for a long time, while real power passed to the Fujiwara and other consort houses. After 1185 Minamoto no Yoritomo built the Kamakura shogunate. The emperor remained, but the shogun was the center of military government. Kamakura fell in 1333. After the Onin war of 1467 the islands entered the Sengoku period and daimyo held their own lands.

In 1603 Tokugawa Ieyasu founded the shogunate at Edo. After the Osaka campaigns of 1615 its rule settled, until the return of authority in 1867. The base map may label these centuries Yamato, Fujiwara, Kamakura, or Edo. Those are different governments in the same islands, not several foreign countries.`,
    [
      { year: 710, zh: "迁都平城京。", en: "The capital moves to Nara." },
      { year: 794, zh: "迁都平安京。", en: "The capital moves to Heian." },
      { year: 1185, zh: "镰仓幕府建立。", en: "The Kamakura shogunate is founded." },
      { year: 1603, zh: "德川幕府建立于江户。", en: "The Tokugawa shogunate is founded at Edo." },
      { year: 1867, zh: "德川幕府结束。", en: "The Tokugawa shogunate ends." },
    ],
  ),
  yamato: book(
    "约3–7世纪",
    "about the 3rd–7th centuries",
    "大和",
    "Yamato",
    `大和是日本列岛上逐渐形成的王权，核心在奈良盆地。三世纪以后，邪马台和后来的大和政权把近畿的豪族编成一个联盟。五世纪的倭王多次向南朝遣使，接受安东将军一类的称号。

645年大化改新以后，大和政权模仿唐朝的律令，建年号、编户籍。710年迁都平城京，通常把这一年当作奈良时代的开始，大和也不再只是一个盆地里的王权。`,
    `Yamato was the kingship that formed in the Japanese islands, centered on the Nara basin. From the third century, Yamatai and then Yamato bound the magnates of the Kinai into a confederation. In the fifth century Wa kings sent missions to the Southern dynasties and accepted titles such as General Pacifying the East.

After the Taika reform of 645, the Yamato court copied Tang codes, adopted reign titles, and compiled household registers. The move to Nara in 710 is the usual start of the Nara period. Yamato was no longer only a kingship in one basin.`,
    [
      { year: 645, zh: "大化改新。", en: "The Taika reform begins." },
      { year: 710, zh: "迁都平城京。", en: "The capital moves to Nara." },
    ],
  ),
  korea: book(
    "918–1910年间的高丽与朝鲜",
    "Goryeo and Joseon, 918–1910",
    "开城，1394年后为汉阳",
    "Gaeseong, Hanyang after 1394",
    `918年王建在开城建立高丽。935年新罗来降，936年高丽灭后百济，半岛重新统一在一个朝廷之下。高丽用科举和佛教寺院，也长期面对辽、金和蒙古。1259年以后高丽成为蒙古的附庸，国王要娶蒙古公主。1392年李成桂废掉高丽国王，次年把国号定为朝鲜。

朝鲜都汉阳，就是今天的首尔。它用儒家官僚治理两班社会，对明朝、后来对清朝朝贡。1592年丰臣秀吉入侵，壬辰战争打了七年。1636年清军攻入汉阳，朝鲜转而向清朝贡。1897年高宗改称大韩帝国。1910年日本吞并朝鲜，王朝结束。

地图上的 Korea 会随年份写成高丽或朝鲜。1910年以后的半岛政治不再是这两个王朝。`,
    `In 918 Wang Geon founded Goryeo at Gaeseong. Silla submitted in 935, and in 936 Goryeo destroyed Later Baekje. The peninsula was again under one court. Goryeo used examinations and Buddhist monasteries, and it spent a long time facing Liao, Jin, and the Mongols. After 1259 it was a Mongol client, and its kings married Mongol princesses. In 1392 Yi Seong-gye deposed the Goryeo king, and the next year the name became Joseon.

Joseon ruled from Hanyang, today's Seoul. It governed a yangban society with a Confucian bureaucracy and sent tribute to Ming, later to Qing. Toyotomi Hideyoshi invaded in 1592, and the Imjin war lasted seven years. In 1636 a Qing army entered Hanyang and Joseon shifted its tribute to Qing. In 1897 Gojong proclaimed the Korean Empire. In 1910 Japan annexed Korea and the dynasty ended.

The label Korea on the map is written Goryeo or Joseon according to the year. Peninsula politics after 1910 were no longer those two dynasties.`,
    [
      { year: 918, zh: "王建建立高丽。", en: "Wang Geon founds Goryeo." },
      { year: 936, zh: "高丽统一半岛。", en: "Goryeo unifies the peninsula." },
      { year: 1392, zh: "李成桂建立朝鲜。", en: "Yi Seong-gye founds Joseon." },
      { year: 1592, zh: "壬辰战争开始。", en: "The Imjin war begins." },
      { year: 1636, zh: "清军攻入汉阳。", en: "A Qing army enters Hanyang." },
      { year: 1910, zh: "日本吞并朝鲜。", en: "Japan annexes Korea." },
    ],
  ),
  "abbasid caliphate": book(
    "750–1258",
    "750–1258",
    "巴格达",
    "Baghdad",
    `750年阿拔斯家族在扎布河打败倭马亚的军队，屠杀倭马亚王族，建立新的哈里发国家。倭马亚有一支逃到伊比利亚，在科尔多瓦继续称埃米尔，后来称哈里发，所以750年并不是所有倭马亚都消失了。东方的中心则转到阿拔斯。762年曼苏尔建巴格达，哈里发国家的重心从叙利亚移到两河流域。

九世纪以后，突厥军人控制宫廷，地方王朝各自收税。945年白益人进入巴格达，哈里发还在，军政已经不在他手里。1055年塞尔柱人取代白益。1258年旭烈兀的蒙古军攻破巴格达，末代哈里发被杀。阿拔斯在巴格达的统治结束。`,
    `In 750 the Abbasid family defeated the Umayyad army on the Great Zab, killed most of the Umayyad house, and founded a new caliphate. One Umayyad escaped to Iberia and continued as emir, later caliph, of Cordoba, so 750 did not erase every Umayyad. The center in the east passed to the Abbasids. In 762 al-Mansur founded Baghdad and the weight of the caliphate moved from Syria to Mesopotamia.

From the ninth century Turkic soldiers controlled the palace, and local dynasties collected their own taxes. In 945 the Buyids entered Baghdad. The caliph remained, but military government was no longer his. In 1055 the Seljuks replaced the Buyids. In 1258 Hülegü's Mongol army took Baghdad and the last caliph there was killed. Abbasid rule in Baghdad ended.`,
    [
      { year: 750, zh: "阿拔斯在扎布河打败倭马亚。", en: "The Abbasids defeat the Umayyads on the Zab." },
      { year: 762, zh: "巴格达建成。", en: "Baghdad is founded." },
      { year: 945, zh: "白益人进入巴格达。", en: "The Buyids enter Baghdad." },
      { year: 1258, zh: "蒙古攻破巴格达。", en: "The Mongols take Baghdad." },
    ],
  ),
  "umayyad caliphate": book(
    "661–750",
    "661–750",
    "大马士革",
    "Damascus",
    `661年穆阿维叶在大马士革建立倭马亚王朝，哈里发第一次变成一个家族世袭的职位。倭马亚向西打到伊比利亚，向东打到中亚和印度河。阿拉伯语和征税的制度把这些地区连在一起，但本地的语言和信仰并没有因此消失。

750年阿拔斯在扎布河击败末代哈里发马尔万二世。大马士革的倭马亚王朝结束。阿卜杜勒·拉赫曼逃到安达卢斯，756年在科尔多瓦建国。所以750年以后，东方的大帝国应写成阿拔斯；西班牙的倭马亚是另一支，底图往往还来不及把它们切开。`,
    `In 661 Muawiya founded the Umayyad dynasty at Damascus, and the caliphate became hereditary in one family for the first time. The Umayyads fought west to Iberia and east to Central Asia and the Indus. Arabic and the tax system tied these regions together. Local languages and beliefs did not disappear.

In 750 the Abbasids defeated the last caliph, Marwan II, on the Zab. The Damascus Umayyads ended. Abd al-Rahman escaped to al-Andalus and in 756 founded a state at Cordoba. After 750 the great empire in the east should be read as Abbasid. The Spanish Umayyads were another line, and the base map often has not yet separated them.`,
    [
      { year: 661, zh: "穆阿维叶在大马士革建国。", en: "Muawiya founds the dynasty at Damascus." },
      { year: 711, zh: "阿拉伯军队进入伊比利亚。", en: "An Arab army enters Iberia." },
      { year: 750, zh: "阿拔斯推翻大马士革的倭马亚。", en: "The Abbasids overthrow the Damascus Umayyads." },
    ],
  ),
  "sasanian empire": book(
    "224–651",
    "224–651",
    "泰西封",
    "Ctesiphon",
    `萨珊是224年阿尔达希尔推翻安息以后建立的波斯帝国，都泰西封。它与罗马、后来的拜占庭长期争夺两河流域和亚美尼亚。国教是琐罗亚斯德教，国王称王中之王。

七世纪，萨珊先在与拜占庭的长期战争里耗尽力量。637年卡迪西亚战役以后，阿拉伯军队攻入两河流域。651年末代国王伊嗣俟三世在木鹿被杀。萨珊作为帝国结束。波斯的语言和行政后来被阿拉伯帝国吸收，并没有随着王室一起消失。`,
    `The Sasanians were the Persian empire Ardashir founded in 224 after overthrowing the Parthians, with its capital at Ctesiphon. They fought Rome and then Byzantium for Mesopotamia and Armenia over a long time. The state religion was Zoroastrian, and the king was called king of kings.

In the seventh century the long war with Byzantium exhausted them. After the battle of al-Qadisiyyah in 637, an Arab army entered Mesopotamia. In 651 the last king, Yazdegerd III, was killed at Merv. The Sasanian empire ended. Persian language and administration were later absorbed by the Arab empire. They did not vanish with the royal house.`,
    [
      { year: 224, zh: "阿尔达希尔建立萨珊。", en: "Ardashir founds the Sasanian empire." },
      { year: 637, zh: "卡迪西亚战役，阿拉伯军队进入两河流域。", en: "Al-Qadisiyyah opens Mesopotamia to the Arab army." },
      { year: 651, zh: "伊嗣俟三世被杀，萨珊亡。", en: "Yazdegerd III is killed and the Sasanians end." },
    ],
  ),
  "visigothic kingdom": book(
    "418–711",
    "418–711",
    "图卢兹，后为托莱多",
    "Toulouse, later Toledo",
    `西哥特是进入西罗马帝国境内的日耳曼人政权。五世纪先以图卢兹为中心，507年在武耶被法兰克人打败后，重心移到伊比利亚，都城后来定在托莱多。589年国王雷卡雷德改宗大公教会，西哥特贵族和罗马旧居民慢慢合成一个王国。

711年，阿拉伯和柏柏尔军队渡过直布罗陀。国王罗德里克在瓜达莱特战死，托莱多陷落。西哥特王国结束。伊比利亚转入倭马亚的统治，北部山区后来才形成新的基督教王国。`,
    `The Visigoths were a Germanic kingdom inside the western Roman world. In the fifth century they centered on Toulouse. After the Franks defeated them at Vouillé in 507, their weight moved to Iberia, and the capital later settled at Toledo. In 589 King Reccared converted to the catholic creed, and the Gothic nobility and the older Roman population slowly became one kingdom.

In 711 an Arab and Berber army crossed Gibraltar. King Roderic was killed at the Guadalete and Toledo fell. The Visigothic kingdom ended. Iberia passed under Umayyad rule. New Christian kingdoms formed later in the northern mountains.`,
    [
      { year: 507, zh: "武耶战败，重心转入伊比利亚。", en: "After Vouillé the center moves to Iberia." },
      { year: 589, zh: "雷卡雷德改宗。", en: "Reccared converts." },
      { year: 711, zh: "瓜达莱特战败，西哥特王国灭亡。", en: "The defeat at the Guadalete ends the kingdom." },
    ],
  ),
  rouran: book(
    "约4世纪末–555",
    "about the late 4th century–555",
    "弱洛水一带",
    "the Ruo River region",
    `柔然是北魏北边的草原联盟，四世纪末由社仑可汗整合。它控制漠北，多次南下抄掠北魏的边境。北魏太武帝几次亲征，都没有把它彻底消灭。

552年突厥土门打败柔然。555年，柔然余部被北齐击溃，可汗被杀。柔然汗国结束，草原的主导权转到突厥。`,
    `The Rouran were the steppe confederation north of Northern Wei, pulled together by the qaghan Shelun at the end of the fourth century. They held the Mongolian plateau and repeatedly raided the Wei frontier. Emperor Taiwu of Wei campaigned against them in person more than once and never destroyed them completely.

In 552 the Turk Bumin defeated the Rouran. In 555 Northern Qi broke the remnant and the qaghan was killed. The Rouran khaganate ended, and the lead on the steppe passed to the Turks.`,
    [
      { year: 402, zh: "社仑称可汗。", en: "Shelun takes the title qaghan." },
      { year: 552, zh: "突厥打败柔然。", en: "The Turks defeat the Rouran." },
      { year: 555, zh: "柔然余部灭亡。", en: "The Rouran remnant is destroyed." },
    ],
  ),
  hainan: book(
    "汉以后的海南岛",
    "Hainan after the Han commanderies",
    "随大陆王朝的州郡而变",
    "the prefecture of the dynasty on the mainland",
    `海南岛不是一个与大陆王朝并列的国家。前111年前后，汉在岛上设珠崖、儋耳两郡，后来时设时废。唐朝设琼州。宋、元、明、清都把岛屿放在自己的州府里。岛上的黎人有自己的村峒，那是王朝州县里面的部族，不是另一个王朝。

底图若把海南单独涂色，只是岸线被拆成一块。名字应按当时的大陆王朝来读。`,
    `Hainan was not a state beside the mainland dynasties. Around 111 BCE Han founded the Zhuya and Dan'er commanderies on the island, and later abolished and restored them. Tang set up Qiongzhou. Song, Yuan, Ming, and Qing all kept the island inside their own prefectures. The Li had their own villages. Those were peoples inside the dynasty's counties, not another dynasty.

If the base map paints Hainan as its own shape, that is only the coastline cut into a separate piece. The name should be read as the mainland dynasty of that year.`,
    [
      { year: -111, zh: "汉设珠崖、儋耳。", en: "Han founds Zhuya and Dan'er." },
      { year: 631, zh: "唐设琼州。", en: "Tang sets up Qiongzhou." },
    ],
  ),
  "hong kong": book(
    "1842–1997",
    "1842–1997",
    "维多利亚城",
    "Victoria",
    `1842年以前，香港岛和九龙都在清朝的广州府境内，不是一个独立国家。1842年《南京条约》把香港岛割给英国，1860年割九龙，1898年新界租借九十九年。英国在岛上设总督。

1997年7月1日，香港回归中国，成为中华人民共和国的特别行政区。1842年以前的底图若单独画出香港，应按清朝来读。`,
    `Before 1842 Hong Kong Island and Kowloon were inside Guangzhou prefecture of the Qing. They were not an independent country. The Treaty of Nanjing in 1842 ceded the island to Britain, Kowloon was ceded in 1860, and the New Territories were leased for ninety-nine years in 1898. Britain governed through a governor.

On 1 July 1997 Hong Kong returned to China as a special administrative region. If a sheet before 1842 draws Hong Kong separately, it should be read as Qing.`,
    [
      { year: 1842, zh: "南京条约割让香港岛。", en: "Nanjing cedes Hong Kong Island." },
      { year: 1898, zh: "新界租借。", en: "The New Territories are leased." },
      { year: 1997, zh: "香港回归。", en: "Hong Kong returns." },
    ],
  ),
"roman republic": book(
    "前509–前27",
    "509–27 BCE",
    "罗马",
    "Rome",
    `罗马共和国从王政结束以后，由执政官、元老院和公民大会共同执政。它先统一意大利，再在前264年到前146年的布匿战争里灭掉迦太基，把地中海西部变成自己的行省。东部则接过马其顿和塞琉古留下的地盘。

共和国的结束不是一次外敌入侵。前1世纪，马略、苏拉、庞培和恺撒用私人军队打内战。前44年恺撒被刺。前31年屋大维在亚克兴打败安东尼。前27年元老院授给他奥古斯都的称号，共和国的外壳还在，权力已经归一个人。`,
    `The Republic was governed by consuls, the Senate, and the assemblies after the kings were expelled. It unified Italy, destroyed Carthage in the Punic wars of 264 to 146 BCE, and then took over the lands left by Macedon and the Seleucids.

It did not fall to a foreign invader. In the last century BCE Marius, Sulla, Pompey, and Caesar fought with private armies. Caesar was killed in 44 BCE. In 31 BCE Octavian defeated Antony at Actium. In 27 BCE the Senate gave him the name Augustus. The republican offices remained. Power belonged to one man.`,
    [
      { year: -264, zh: "第一次布匿战争开始。", en: "The First Punic War begins." },
      { year: -146, zh: "迦太基被毁，科林斯也被攻破。", en: "Carthage is destroyed and Corinth falls." },
      { year: -49, zh: "恺撒渡过卢比孔。", en: "Caesar crosses the Rubicon." },
      { year: -27, zh: "屋大维称奥古斯都，帝制开始。", en: "Octavian becomes Augustus and the principate begins." },
    ],
  ),
  "roman empire": book(
    "前27–476为统一帝国与西罗马；东罗马另计",
    "27 BCE–476 in the west; the east continued",
    "罗马，后亦为君士坦丁堡",
    "Rome, later also Constantinople",
    `前27年以后的罗马帝国用皇帝、行省和军团维持地中海周围的土地。公元117年图拉真死时，版图从不列颠伸到两河流域，这是面积最大的时候，不是每一年都守得住的边界。三世纪军队拥立皇帝，边境同时受到日耳曼人和萨珊的压力。

285年戴克里先把统治分成东西，330年君士坦丁把东都定在君士坦丁堡。395年狄奥多西死后，东西两个朝廷正式分开。西罗马在476年结束：日耳曼将领奥多亚克废掉罗慕路斯·奥古斯都。东罗马还在，后来称为拜占庭。西边的行省变成了日耳曼人的王国。`,
    `From 27 BCE the empire was held by an emperor, provinces, and legions around the Mediterranean. At Trajan's death in 117 it reached from Britain to Mesopotamia. That was its greatest extent, not a border it kept every year. In the third century armies made emperors, while Germanic groups and the Sasanians pressed the frontier.

In 285 Diocletian split the rule. In 330 Constantine fixed an eastern capital at Constantinople. After Theodosius died in 395 the eastern and western courts were separate. The west ended in 476, when the Germanic commander Odoacer deposed Romulus Augustulus. The east continued. It is later called Byzantium. The western provinces became Germanic kingdoms.`,
    [
      { year: -27, zh: "奥古斯都建立元首制。", en: "Augustus establishes the principate." },
      { year: 117, zh: "图拉真死时帝国面积最大。", en: "The empire is at its greatest extent when Trajan dies." },
      { year: 330, zh: "君士坦丁堡成为东都。", en: "Constantinople becomes the eastern capital." },
      { year: 395, zh: "帝国分成东西两个朝廷。", en: "The empire divides into eastern and western courts." },
      { year: 476, zh: "西罗马末帝被废。", en: "The last western emperor is deposed." },
    ],
  ),
  "byzantine empire": book(
    "330–1453",
    "330–1453",
    "君士坦丁堡",
    "Constantinople",
    `拜占庭就是东罗马帝国，国号仍是罗马，语言后来以希腊语为主。查士丁尼在527年到565年编成《民法大全》，又一度收回意大利和北非，但瘟疫和与萨珊的战争把这些成果耗掉了。七世纪阿拉伯军队夺走叙利亚、埃及和北非，帝国收缩到安纳托利亚、希腊和部分意大利。

1204年第四次十字军攻陷君士坦丁堡，拉丁人在城里建了一个朝廷，拜占庭残余退到尼西亚，1261年才收回首都。这时它已经是一个小国。1453年奥斯曼苏丹穆罕默德二世攻破君士坦丁堡，末代皇帝君士坦丁十一世死于城破。东罗马的朝廷到此结束。`,
    `Byzantium was the eastern Roman empire. It still called itself Roman. Greek later became its main language. From 527 to 565 Justinian issued the law code and briefly recovered Italy and North Africa. Plague and the Persian wars spent those gains. In the seventh century Arab armies took Syria, Egypt, and North Africa. The empire contracted to Anatolia, Greece, and part of Italy.

In 1204 the Fourth Crusade took Constantinople and Latin rulers held the city. The Byzantine remnant withdrew to Nicaea and recovered the capital only in 1261. By then it was a small state. In 1453 the Ottoman sultan Mehmed II took Constantinople. The last emperor, Constantine XI, died in the fall. The eastern Roman court ended.`,
    [
      { year: 532, zh: "查士丁尼开始编订罗马法。", en: "Justinian begins the codification of Roman law." },
      { year: 636, zh: "雅穆克战役后，叙利亚不再属于帝国。", en: "After Yarmouk, Syria is no longer imperial." },
      { year: 1071, zh: "曼齐刻尔特战败，安纳托利亚大门打开。", en: "Manzikert opens Anatolia." },
      { year: 1204, zh: "十字军攻占君士坦丁堡。", en: "The Crusaders take Constantinople." },
      { year: 1453, zh: "奥斯曼攻破君士坦丁堡，拜占庭灭亡。", en: "The Ottomans take Constantinople and Byzantium ends." },
    ],
  ),
  franks: book(
    "约5世纪–843",
    "about the 5th century–843",
    "巴黎、亚琛",
    "Paris, later Aachen",
    `法兰克人在五世纪进入罗马的高卢。克洛维在481年以后消灭其他法兰克首领，改宗基督教，建立起墨洛温王朝。王权后来落到宫相手里。751年矮子丕平废掉墨洛温末王，建立加洛林王朝。

768年查理即位，800年在罗马由教皇加冕为皇帝。他的帝国从比利牛斯伸到易北河和意大利中部，用伯爵和巡按把地方连到宫廷。843年凡尔登条约把帝国分成西法兰克、中法兰克和东法兰克。西法兰克后来变成法国，东法兰克变成德意志的核心。一个法兰克王国到此结束。`,
    `The Franks entered Roman Gaul in the fifth century. After 481 Clovis removed the other Frankish leaders, converted to Christianity, and founded the Merovingian dynasty. Power later passed to the mayors of the palace. In 751 Pepin the Short deposed the last Merovingian and founded the Carolingian dynasty.

Charles became king in 768 and in 800 the pope crowned him emperor in Rome. His empire ran from the Pyrenees to the Elbe and central Italy, tied together by counts and inspectors. In 843 the Treaty of Verdun split it into West, Middle, and East Francia. West Francia became France. East Francia became the core of Germany. One Frankish kingdom ended there.`,
    [
      { year: 481, zh: "克洛维统一法兰克。", en: "Clovis unifies the Franks." },
      { year: 751, zh: "丕平建立加洛林王朝。", en: "Pepin founds the Carolingian dynasty." },
      { year: 800, zh: "查理在罗马加冕。", en: "Charles is crowned in Rome." },
      { year: 843, zh: "凡尔登条约把帝国一分为三。", en: "Verdun divides the empire into three." },
    ],
  ),
  france: book(
    "843年以后的西法兰克与法国",
    "West Francia and France after 843",
    "巴黎",
    "Paris",
    `843年西法兰克归秃头查理。987年于格·卡佩被诸侯拥立，卡佩王朝开始，王室领地起初只有巴黎周围。腓力二世、路易九世和腓力四世把王权扩展到诺曼底、朗格多克和教会税上。1337年到1453年的百年战争最后把英格兰王室赶出大陆，只留下加来。

1589年波旁王朝开始。路易十四把宫廷定在凡尔赛，对外长期战争。1789年革命推翻旧制度，1792年成立共和国，1793年路易十六被处死。1804年拿破仑称帝，1815年战败。此后法国在君主制和共和制之间来回，1870年第二帝国在普法战争中垮台，第三共和国建立。法国的边界在每一次战争后都改过，不是一张固定的六边形。`,
    `In 843 West Francia went to Charles the Bald. In 987 the magnates raised Hugh Capet. The royal domain at first was only the country around Paris. Philip II, Louis IX, and Philip IV extended royal power into Normandy, Languedoc, and church taxation. The Hundred Years' War, from 1337 to 1453, ended with the English kings driven off the continent except for Calais.

The Bourbons began in 1589. Louis XIV settled the court at Versailles and fought long wars. The revolution of 1789 brought down the old order. A republic was declared in 1792, and Louis XVI was executed in 1793. Napoleon became emperor in 1804 and was defeated in 1815. France then moved between monarchy and republic. In 1870 the Second Empire fell in the war with Prussia and the Third Republic began. The border changed after each war. It was not a fixed hexagon.`,
    [
      { year: 987, zh: "于格·卡佩即位。", en: "Hugh Capet becomes king." },
      { year: 1453, zh: "百年战争结束。", en: "The Hundred Years' War ends." },
      { year: 1789, zh: "法国革命开始。", en: "The French Revolution begins." },
      { year: 1804, zh: "拿破仑称帝。", en: "Napoleon becomes emperor." },
      { year: 1870, zh: "第二帝国在色当战败后垮台。", en: "The Second Empire collapses after Sedan." },
    ],
  ),
  "holy roman empire": book(
    "962–1806",
    "962–1806",
    "无固定首都，后期常在维也纳",
    "No fixed capital; later often Vienna",
    `962年奥托一世在罗马加冕，东法兰克的国王同时成为皇帝。这个帝国后来被称作神圣罗马帝国。它不是一个中央集权的国家，而是皇帝、诸侯、主教和城市组成的复合体。1356年黄金诏书规定七个选帝侯选举皇帝。皇帝的实权取决于他自己的家族领地，长期是哈布斯堡。

宗教改革以后，帝国在1555年奥格斯堡和约里承认诸侯可以选择路德宗或天主教。1618年到1648年的三十年战争把德意志打空，威斯特伐利亚和约确认诸侯的对外权利。1806年拿破仑逼弗朗茨二世放下皇帝称号。神圣罗马帝国结束，没有一个继承它全部领地的单一国家。`,
    `In 962 Otto I was crowned in Rome. The king of East Francia was also emperor. The realm later called itself the Holy Roman Empire. It was not a centralized state. It was a composite of emperor, princes, bishops, and cities. The Golden Bull of 1356 gave seven electors the right to choose the emperor. The emperor's real power depended on his own family lands, for a long time those of the Habsburgs.

After the Reformation, the Peace of Augsburg in 1555 let princes choose Lutheranism or Catholicism. The Thirty Years' War, from 1618 to 1648, emptied Germany. The Peace of Westphalia confirmed the princes' right to conduct foreign affairs. In 1806 Napoleon forced Francis II to lay down the imperial title. The Holy Roman Empire ended. No single state inherited all of its lands.`,
    [
      { year: 962, zh: "奥托一世加冕皇帝。", en: "Otto I is crowned emperor." },
      { year: 1356, zh: "黄金诏书规定选帝侯。", en: "The Golden Bull fixes the electors." },
      { year: 1648, zh: "威斯特伐利亚和约。", en: "The Peace of Westphalia." },
      { year: 1806, zh: "帝国在拿破仑的压力下解散。", en: "The empire is dissolved under Napoleon's pressure." },
    ],
  ),
  "ottoman empire": book(
    "约1299–1922",
    "about 1299–1922",
    "布尔萨，后为埃迪尔内、伊斯坦布尔",
    "Bursa, then Edirne and Istanbul",
    `奥斯曼人在十三世纪末从安纳托利亚西北的一个小侯国扩张。1453年穆罕默德二世攻下君士坦丁堡，把它变成首都。塞利姆一世在1516年到1517年夺取叙利亚和埃及，麦加和麦地那的宗主权也转了过来。苏莱曼时期，帝国同时在匈牙利、地中海和波斯边境作战。

1683年维也纳围城失败以后，欧洲边界开始后退。十九世纪巴尔干的民族国家一个个分出去。1908年青年土耳其党人政变。第一次世界大战里帝国站在德国一边，战败后被占领和分割。1922年苏丹制废除，1923年土耳其共和国成立，首都后来迁到安卡拉。奥斯曼作为帝国结束，土耳其是它在安纳托利亚的继承国家，不是同一张边界。`,
    `The Ottomans expanded from a small principality in northwestern Anatolia at the end of the thirteenth century. In 1453 Mehmed II took Constantinople and made it the capital. From 1516 to 1517 Selim I seized Syria and Egypt, and the claim over Mecca and Medina passed with them. Under Suleiman the empire fought at once in Hungary, the Mediterranean, and on the Persian frontier.

After the failed siege of Vienna in 1683 the European border receded. In the nineteenth century Balkan nation-states broke away one after another. The Young Turks seized power in 1908. In the First World War the empire sided with Germany, and after defeat it was occupied and partitioned. The sultanate was abolished in 1922. The Republic of Turkey was founded in 1923, later with its capital at Ankara. The Ottoman empire ended. Turkey is its successor in Anatolia, not the same map.`,
    [
      { year: 1453, zh: "攻下君士坦丁堡。", en: "Constantinople is taken." },
      { year: 1517, zh: "夺取埃及，马穆鲁克灭亡。", en: "Egypt is taken and the Mamluks end." },
      { year: 1683, zh: "维也纳围城失败。", en: "The siege of Vienna fails." },
      { year: 1922, zh: "苏丹制废除。", en: "The sultanate is abolished." },
      { year: 1923, zh: "土耳其共和国成立。", en: "The Republic of Turkey is founded." },
    ],
  ),
  persia: book(
    "波斯诸王朝",
    "The Persian dynasties",
    "波斯波利斯、泰西封、伊斯法罕、德黑兰",
    "Persepolis, Ctesiphon, Isfahan, Tehran",
    `波斯不是一个连续不断的同一王朝。阿契美尼德在前550年由居鲁士建立，前330年亡于亚历山大。塞琉古和帕提亚之后，224年萨珊重新用波斯的王号统治，651年亡于阿拉伯军队。此后波斯语和地方王朝还在，最高权力长期属于哈里发、塞尔柱、蒙古伊利汗和帖木儿。

1501年萨法维王朝把什叶派定为国教，都伊斯法罕。1736年纳迪尔沙推翻萨法维末流。1794年以后恺加王朝以德黑兰为都。1925年巴列维王朝取代恺加，1935年国号在对外文件里改称伊朗。1979年巴列维王朝被推翻。地图上写着波斯的那一块，要按年份判断是萨珊、恺加还是更早的帝国。`,
    `Persia was not one uninterrupted dynasty. Cyrus founded the Achaemenid empire in 550 BCE, and Alexander ended it in 330 BCE. After the Seleucids and the Parthians, the Sasanians restored a Persian royal title in 224 and fell to the Arab armies in 651. Persian remained, and local dynasties remained, but supreme power long belonged to caliphs, Seljuks, the Mongol Ilkhans, and Timur.

In 1501 the Safavids made Shi'ism the state religion and ruled from Isfahan. Nader Shah pushed aside the last Safavid line in 1736. After 1794 the Qajars ruled from Tehran. The Pahlavi dynasty replaced them in 1925, and in 1935 the foreign name became Iran. The Pahlavi dynasty was overthrown in 1979. A shape labeled Persia has to be read by the year: Sasanian, Qajar, or an earlier empire.`,
    [
      { year: -550, zh: "居鲁士建立阿契美尼德帝国。", en: "Cyrus founds the Achaemenid empire." },
      { year: -330, zh: "亚历山大攻入波斯。", en: "Alexander enters Persia." },
      { year: 224, zh: "萨珊王朝建立。", en: "The Sasanian dynasty is founded." },
      { year: 1501, zh: "萨法维王朝建立。", en: "The Safavid dynasty is founded." },
      { year: 1925, zh: "巴列维王朝取代恺加。", en: "The Pahlavis replace the Qajars." },
    ],
  ),
  "parthian empire": book(
    "前247–224",
    "247 BCE–224 CE",
    "尼萨、泰西封",
    "Nisa, later Ctesiphon",
    `帕提亚由伊朗东北的安息人建立。前247年阿尔撒息斯称王，后来把泰西封建成与罗马对峙的都城。帕提亚不是整齐的行省帝国，国王依靠大贵族和边境王国。它与罗马反复争夺亚美尼亚和两河流域，前53年克拉苏死于卡雷。

224年，波斯人阿尔达希尔在霍尔木兹德甘打败帕提亚末王阿尔达班四世。帕提亚灭亡，萨珊取而代之。如果一张300年的底图还写着帕提亚，国号应按萨珊来读。`,
    `Parthia was founded by the Arsacid Iranians of the northeast. Arsaces took the royal title in 247 BCE. Ctesiphon later became the capital facing Rome. Parthia was not a neat provincial empire. The king depended on great nobles and border kingdoms. It fought Rome repeatedly over Armenia and Mesopotamia. Crassus died at Carrhae in 53 BCE.

In 224 the Persian Ardashir defeated the last Parthian king, Artabanus IV, at Hormozdgan. Parthia ended and the Sasanians replaced it. If a sheet for the year 300 still says Parthia, the name should be read as Sasanian.`,
    [
      { year: -247, zh: "阿尔撒息斯建国。", en: "Arsaces founds the kingdom." },
      { year: -53, zh: "卡雷战役，克拉苏战死。", en: "Crassus is killed at Carrhae." },
      { year: 224, zh: "阿尔达希尔灭帕提亚，建立萨珊。", en: "Ardashir destroys Parthia and founds the Sasanians." },
    ],
  ),
  "achaemenid empire": book(
    "前550–前330",
    "550–330 BCE",
    "波斯波利斯、苏萨、巴比伦",
    "Persepolis, Susa, and Babylon",
    `前550年居鲁士推翻米底，建立阿契美尼德帝国。他随后夺取吕底亚和巴比伦。冈比西斯征服埃及。大流士一世把帝国分成行省，修御道，铸统一的金币，并在前490年兵败于马拉松。薛西斯前480年的希腊远征也没有把希腊城邦并进来。

帝国的核心在伊朗和两河流域，行省从埃及伸到印度河。前330年亚历山大追击大流士三世，大流士被自己的部下杀死，波斯波利斯被焚。阿契美尼德王朝结束。`,
    `In 550 BCE Cyrus overthrew the Medes and founded the Achaemenid empire. He then took Lydia and Babylon. Cambyses conquered Egypt. Darius I divided the empire into satrapies, built the royal road, coined a standard gold piece, and lost at Marathon in 490 BCE. Xerxes' invasion of Greece in 480 BCE did not annex the Greek cities.

The core was Iran and Mesopotamia. The satrapies ran from Egypt to the Indus. In 330 BCE Alexander pursued Darius III. Darius was killed by his own officers, and Persepolis was burned. The Achaemenid dynasty ended.`,
    [
      { year: -550, zh: "居鲁士建国。", en: "Cyrus founds the empire." },
      { year: -490, zh: "马拉松战役。", en: "The battle of Marathon." },
      { year: -330, zh: "亚历山大灭亡阿契美尼德。", en: "Alexander ends the Achaemenids." },
    ],
  ),
  "mauryan empire": book(
    "前322–前185",
    "322–185 BCE",
    "华氏城",
    "Pataliputra",
    `前322年旃陀罗笈多夺取难陀王朝的华氏城，建立孔雀王朝。他挡住了塞琉古东进的势头，换得印度河以西的一部分土地。阿育王在前273年即位，前261年血洗羯陵伽之后转向护法，把诏令刻在石柱上，派使者到希腊化王国和斯里兰卡。

阿育王后继者控制不住各省。前185年将军普士亚密多罗杀掉末帝，建立巽伽王朝。孔雀帝国结束。它是印度次大陆上第一个把恒河与印度河连在一个朝廷之下的大帝国。`,
    `In 322 BCE Chandragupta took Pataliputra from the Nanda dynasty and founded the Maurya. He stopped the Seleucid advance and received land west of the Indus. Ashoka came to the throne in 273 BCE. After the slaughter in Kalinga in 261 BCE he turned to protecting dharma, cut edicts on pillars, and sent missions to the Hellenistic kingdoms and Sri Lanka.

Ashoka's successors could not hold the provinces. In 185 BCE the general Pushyamitra killed the last emperor and founded the Shunga dynasty. The Mauryan empire ended. It was the first empire on the subcontinent to join the Ganges and the Indus under one court.`,
    [
      { year: -322, zh: "旃陀罗笈多建立孔雀王朝。", en: "Chandragupta founds the Maurya." },
      { year: -261, zh: "羯陵伽战争后阿育王转向护法。", en: "After Kalinga, Ashoka turns to dharma." },
      { year: -185, zh: "孔雀王朝被巽伽取代。", en: "The Shungas replace the Maurya." },
    ],
  ),
  "gupta empire": book(
    "约320–550",
    "about 320–550",
    "华氏城",
    "Pataliputra",
    `笈多王朝约在320年由旃陀罗笈多一世建立，都城仍在华氏城。沙摩陀罗笈多和旃陀罗笈多二世把统治从恒河扩展到马尔瓦和印度西部的港口。朝廷用梵语、土地赠予和藩属国王来维持一个比孔雀松散的帝国。

五世纪中叶嚈哒人从西北反复攻入。佛陀笈多以后中央已经守不住西部。一般把六世纪中叶当作笈多帝国的结束。北印度重新分成小国，直到后来的戒日王短暂再统一。`,
    `The Gupta dynasty was founded around 320 by Chandragupta I, again at Pataliputra. Samudragupta and Chandragupta II extended rule from the Ganges to Malwa and the western ports. The court held a looser empire than the Maurya, through Sanskrit, land grants, and subordinate kings.

From the mid-fifth century the Hephthalites raided from the northwest. After Budhagupta the center could not hold the west. The middle of the sixth century is the usual end of the Gupta empire. North India split into smaller kingdoms until Harsha briefly pulled it together again.`,
    [
      { year: 320, zh: "旃陀罗笈多一世称王。", en: "Chandragupta I takes the royal title." },
      { year: 380, zh: "旃陀罗笈多二世在位，帝国达到盛期。", en: "Under Chandragupta II the empire is at its height." },
      { year: 550, zh: "笈多的中央统治解体。", en: "Gupta central rule breaks up." },
    ],
  ),
"ghana empire": book(
    "约300–1200",
    "about 300–1200",
    "昆比萨利赫",
    "Koumbi Saleh",
    `加纳王国在尼日尔河和塞内加尔河上游之间，控制跨撒哈拉的黄金和盐。阿拉伯地理书写到它的国王向穆斯林商人收税，自己的都城分成两个居住区。它的盛期大约在九到十一世纪。名字加纳是国王的称号，不是今天西非沿海的加纳共和国。两国不在同一块土地上。

十一世纪以后，王国受到穆拉比特势力和内部属国的压力。约1200年前后索索人占领都城，加纳王国结束。马里帝国随后在更南边兴起。二十世纪地图上的黄金海岸，是英国在几内亚湾的殖民地，1957年独立时才借用加纳这个古名。`,
    `The Ghana kingdom lay between the upper Niger and the Senegal. It taxed the gold and salt of the trans-Saharan trade. Arabic geographers described a king whose capital had two towns. Its height was about the ninth to eleventh centuries. Ghana was the king's title. It is not the modern Republic of Ghana on the coast. The two are not the same land.

After the eleventh century the kingdom was pressed by the Almoravids and by its own vassals. Around 1200 the Sosso took the capital and the kingdom ended. The Mali empire then rose farther south. The Gold Coast on a twentieth-century map was a British colony on the Gulf of Guinea. It borrowed the old name Ghana only when it became independent in 1957.`,
    [
      { year: 800, zh: "加纳王国处于跨撒哈拉贸易的盛期。", en: "Ghana is at the height of the Saharan trade." },
      { year: 1076, zh: "穆拉比特军队攻入加纳的核心地带。", en: "An Almoravid army enters the Ghanaian heartland." },
      { year: 1200, zh: "索索人占领都城，王国结束。", en: "The Sosso take the capital and the kingdom ends." },
      { year: 1957, zh: "黄金海岸独立，国名定为加纳。", en: "The Gold Coast becomes independent as Ghana." },
    ],
  ),
  mali: book(
    "约1235–1670为帝国",
    "an empire about 1235–1670",
    "尼亚尼",
    "Niani",
    `马里帝国由凯塔家族的松迪亚塔在约1235年建立。他打败索索人，把尼日尔河上游的产金地连成一个国家。曼萨穆萨在1324年去麦加朝觐，带去大量黄金，开罗的金价因此下跌。廷巴克图和杰内成为伊斯兰学术和商路的城市。

十五世纪桑海在东部崛起，马里退回西边。十七世纪帝国解体。今天的马里共和国在1960年脱离法属苏丹独立，领土以尼日尔河中游为主，并不等于曼萨穆萨的帝国。`,
    `The Mali empire was founded about 1235 by Sundiata of the Keita. He defeated the Sosso and joined the gold country of the upper Niger into one state. Mansa Musa went to Mecca in 1324 with so much gold that prices in Cairo fell. Timbuktu and Jenne became cities of Islamic learning and of the trade road.

In the fifteenth century Songhai rose in the east and Mali fell back to the west. The empire broke up in the seventeenth century. The Republic of Mali left French Sudan in 1960. Its territory is mainly the middle Niger. It is not Mansa Musa's empire.`,
    [
      { year: 1235, zh: "松迪亚塔建立马里帝国。", en: "Sundiata founds the Mali empire." },
      { year: 1324, zh: "曼萨穆萨朝觐麦加。", en: "Mansa Musa travels to Mecca." },
      { year: 1468, zh: "桑海占领廷巴克图，马里失去东部。", en: "Songhai takes Timbuktu and Mali loses the east." },
      { year: 1960, zh: "马里共和国独立。", en: "The Republic of Mali becomes independent." },
    ],
  ),
  songhai: book(
    "约1464–1591",
    "about 1464–1591",
    "加奥",
    "Gao",
    `桑海原来是尼日尔河弯的一个王国，都加奥。1464年索尼·阿里上台以后连年出征，占领廷巴克图和杰内，把马里的东部变成桑海的核心。1493年穆罕默德·图雷推翻索尼王朝，称阿斯基亚，用伊斯兰法和行省重整国家。阿斯基亚穆罕默德也曾去麦加。

1591年摩洛哥苏丹艾哈迈德·曼苏尔派朱达尔帕夏率火枪兵穿越撒哈拉。汤迪比一战，桑海的军队溃败，帝国崩溃。王室退到南方的登迪，不再统治廷巴克图。此后西苏丹的霸权转到摩洛哥驻军和地方帕夏手里，很快也分裂了。`,
    `Songhai began as a kingdom on the bend of the Niger, with its capital at Gao. After Sonni Ali took power in 1464 he campaigned every year, took Timbuktu and Jenne, and made the east of Mali the Songhai core. In 1493 Muhammad Ture overthrew the Sonni and took the title Askia. He reorganized the state with Islamic law and provinces. Askia Muhammad also went to Mecca.

In 1591 the Moroccan sultan Ahmad al-Mansur sent Judar Pasha across the Sahara with musketeers. At Tondibi the Songhai army broke and the empire collapsed. The royal house withdrew south to Dendi and no longer ruled Timbuktu. Power in the western Sudan passed to the Moroccan garrison and local pashas, and that too soon split.`,
    [
      { year: 1464, zh: "索尼·阿里开始大规模扩张。", en: "Sonni Ali begins the great expansion." },
      { year: 1493, zh: "阿斯基亚王朝建立。", en: "The Askia dynasty is founded." },
      { year: 1591, zh: "汤迪比战败，桑海帝国灭亡。", en: "Tondibi destroys the Songhai empire." },
    ],
  ),
  egypt: book(
    "法老时代至现代埃及",
    "From the pharaohs to modern Egypt",
    "孟菲斯、底比斯、亚历山大、开罗",
    "Memphis, Thebes, Alexandria, Cairo",
    `埃及在前3100年前后由上下埃及统一，法老以孟菲斯或底比斯为都。古王国修建金字塔，新王国把统治伸到努比亚和黎凡特。前525年波斯征服埃及，前332年亚历山大进入，前30年托勒密王朝的末代女王克娄巴特拉死后，埃及成为罗马的行省。

641年阿拉伯军队进入。969年法蒂玛王朝建开罗。1171年萨拉丁结束法蒂玛，埃及成为阿尤布和后来马穆鲁克的中心。1517年奥斯曼夺取开罗。1805年穆罕默德·阿里建立实际上自主的王朝。1922年英国承认埃及独立，1952年自由军官推翻王室。尼罗河河谷一直是这块土地的核心，统治它的王朝换过许多次。`,
    `Egypt was unified around 3100 BCE. Pharaohs ruled from Memphis or Thebes. The Old Kingdom built the pyramids. The New Kingdom reached into Nubia and the Levant. Persia conquered Egypt in 525 BCE. Alexander entered in 332 BCE. In 30 BCE, after Cleopatra, Egypt became a Roman province.

An Arab army entered in 641. The Fatimids founded Cairo in 969. In 1171 Saladin ended the Fatimids, and Egypt became the center of the Ayyubids and then the Mamluks. The Ottomans took Cairo in 1517. In 1805 Muhammad Ali founded a dynasty that was effectively autonomous. Britain recognized Egyptian independence in 1922. The Free Officers overthrew the monarchy in 1952. The Nile valley remained the core. The dynasties that ruled it changed many times.`,
    [
      { year: -3100, zh: "上下埃及统一。", en: "Upper and Lower Egypt are unified." },
      { year: -332, zh: "亚历山大进入埃及。", en: "Alexander enters Egypt." },
      { year: -30, zh: "埃及成为罗马行省。", en: "Egypt becomes a Roman province." },
      { year: 969, zh: "法蒂玛王朝建立开罗。", en: "The Fatimids found Cairo." },
      { year: 1517, zh: "奥斯曼夺取埃及。", en: "The Ottomans take Egypt." },
      { year: 1952, zh: "埃及王室被推翻。", en: "The Egyptian monarchy is overthrown." },
    ],
  ),
  "khmer empire": book(
    "802–1431",
    "802–1431",
    "吴哥",
    "Angkor",
    `802年阇耶跋摩二世在荔枝山宣布独立，真腊从此不再依附爪哇。后来的国王在洞里萨湖北边建造吴哥城和吴哥窟。十二世纪苏利耶跋摩二世和阇耶跋摩七世在位时，灌溉系统和道路把洞里萨湖与湄公河连在一起，势力北到今天的老挝，西与蒲甘、南与占城争城。

十四世纪灌溉失修，泰人的阿瑜陀耶从西边兴起。1431年阿瑜陀耶攻破吴哥，宫廷南迁金边一带。吴哥作为帝国首都结束。柬埔寨王国还在，但已经不是那个从吴哥号令四方的真腊。`,
    `In 802 Jayavarman II proclaimed independence at Mahendraparvata. Chenla was no longer subject to Java. Later kings built the city of Angkor and Angkor Wat north of the Tonle Sap. Under Suryavarman II and Jayavarman VII in the twelfth century, canals and roads tied the lake to the Mekong. The empire reached north into what is now Laos and fought Pagan to the west and Champa to the south.

In the fourteenth century the water system failed, and the Thai kingdom of Ayutthaya rose in the west. In 1431 Ayutthaya took Angkor and the court moved south toward Phnom Penh. Angkor ended as an imperial capital. A Cambodian kingdom continued. It was no longer the Chenla that had given orders from Angkor.`,
    [
      { year: 802, zh: "阇耶跋摩二世建国。", en: "Jayavarman II founds the kingdom." },
      { year: 1150, zh: "吴哥窟约在这一时期建成。", en: "Angkor Wat is completed around this time." },
      { year: 1431, zh: "阿瑜陀耶攻破吴哥。", en: "Ayutthaya takes Angkor." },
    ],
  ),
  champa: book(
    "约192–1832",
    "about 192–1832",
    "因陀罗补罗、毗阇耶",
    "Indrapura, later Vijaya",
    `占城在今天越南中南部的沿海，由几个以印度教神庙为中心的小国合成。它与北方的大越、西边的真腊长期战争，也靠港口贸易。1145年真腊一度占领毗阇耶，占城后来复国。

1471年后黎的军队攻破毗阇耶，占城失去北部。残余王公退到更南的宾童龙。1697年南方的占城王室降于阮氏，1832年明命帝废除最后的占城封国。占城作为政权结束，占语人群还在。`,
    `Champa lay on the coast of what is now central and southern Vietnam. It was several small states centered on Hindu temples. It fought Dai Viet to the north and the Khmer to the west, and it lived by port trade. In 1145 the Khmer briefly took Vijaya. Champa later recovered.

In 1471 the Later Le army took Vijaya and Champa lost the north. The remaining princes withdrew to Panduranga farther south. In 1697 the southern Cham court submitted to the Nguyen. In 1832 the Minh Mang emperor abolished the last Cham principality. Champa as a state ended. Cham-speaking people remained.`,
    [
      { year: 192, zh: "占城诸国开始见于汉文记载。", en: "Cham states begin to appear in Chinese records." },
      { year: 1471, zh: "大越攻破毗阇耶。", en: "Dai Viet takes Vijaya." },
      { year: 1832, zh: "末代占城封国被废。", en: "The last Cham principality is abolished." },
    ],
  ),
  "srivijaya empire": book(
    "约7世纪–14世纪",
    "about the 7th–14th centuries",
    "巨港",
    "Palembang",
    `三佛齐以苏门答腊的巨港为中心，控制马六甲海峡和巽他海峡的港口。中国僧人义净在七世纪曾在那里停留。它向唐朝和宋朝朝贡，同时向过往商船收税，势力伸到马来半岛和爪哇的一部分。

1025年注辇的海军袭击三佛齐的港口，霸权开始动摇。十三世纪以后室利佛逝的名字在记录里变少。1377年满者伯夷传统上被认为攻占了巨港。三佛齐作为海峡上的帝国结束，马六甲在十五世纪接过了贸易中心的位置。`,
    `Srivijaya was centered on Palembang in Sumatra and controlled the ports of the Malacca and Sunda straits. The Chinese monk Yijing stayed there in the seventh century. It sent tribute to Tang and Song and taxed passing ships. Its influence reached the Malay peninsula and part of Java.

In 1025 a Chola fleet attacked its ports and the hegemony began to slip. After the thirteenth century the name appears less often. In 1377 Majapahit is traditionally said to have taken Palembang. Srivijaya ended as the empire of the straits. In the fifteenth century Melaka took its place as the trading center.`,
    [
      { year: 671, zh: "义净途经三佛齐。", en: "Yijing passes through Srivijaya." },
      { year: 1025, zh: "注辇海军袭击巨港等港口。", en: "A Chola fleet attacks Palembang and the other ports." },
      { year: 1377, zh: "巨港不再是三佛齐的都城。", en: "Palembang ceases to be the Srivijaya capital." },
    ],
  ),
  delhi: book(
    "1206–1526",
    "1206–1526",
    "德里",
    "Delhi",
    `1206年古尔王朝的总督库特布丁·艾巴克在德里自立，德里苏丹国开始。此后奴隶王朝、哈尔吉、图格鲁克、赛义德和洛迪五个王朝先后统治。阿拉丁·哈尔吉和穆罕默德·图格鲁克把兵力推向德干，但德干的巴赫曼尼王朝在1347年独立，北方的苏丹再也没有稳定地统治整个次大陆。

1398年帖木儿洗劫德里。苏丹国恢复后只是北印度的一个强国。1526年帕尼帕特战役，巴布尔打败洛迪王朝的末代苏丹。德里苏丹国结束，莫卧儿帝国开始。`,
    `In 1206 Qutb al-Din Aibak, a Ghurid governor, made himself ruler at Delhi. The Delhi sultanate began. Five dynasties followed: the Mamluks, the Khaljis, the Tughlaqs, the Sayyids, and the Lodis. Alauddin Khalji and Muhammad bin Tughlaq pushed armies into the Deccan, but the Bahmani sultanate became independent there in 1347. The northern sultans never again held the whole subcontinent for long.

In 1398 Timur sacked Delhi. The restored sultanate was one power in north India, not more. At Panipat in 1526 Babur defeated the last Lodi sultan. The Delhi sultanate ended and the Mughal empire began.`,
    [
      { year: 1206, zh: "德里苏丹国建立。", en: "The Delhi sultanate is founded." },
      { year: 1347, zh: "德干的巴赫曼尼王朝独立。", en: "The Bahmani sultanate becomes independent in the Deccan." },
      { year: 1398, zh: "帖木儿洗劫德里。", en: "Timur sacks Delhi." },
      { year: 1526, zh: "巴布尔在帕尼帕特取胜，苏丹国灭亡。", en: "Babur wins at Panipat and the sultanate ends." },
    ],
  ),
  "mughal empire": book(
    "1526–1857",
    "1526–1857",
    "阿格拉、德里",
    "Agra and Delhi",
    `1526年巴布尔在帕尼帕特打败洛迪苏丹，建立莫卧儿帝国。阿克巴把都城经营成一个同时容纳穆斯林和印度教贵族的朝廷，用曼萨卜制给官阶。沙贾汗修建泰姬陵。奥朗则布把帝国推到最大，也把德干的战争变成了长期消耗。

1707年奥朗则布死后，地方总督和马拉塔人把帝国切成许多实际独立的政权。1857年印度兵变以后，英国废除末代皇帝巴哈杜尔沙二世，莫卧儿的名号结束。英国直接统治印度。`,
    `In 1526 Babur defeated the Lodi sultan at Panipat and founded the Mughal empire. Akbar built a court that included both Muslim and Hindu nobles, and ranked officials in the mansab system. Shah Jahan built the Taj Mahal. Aurangzeb pushed the empire to its greatest extent and turned the Deccan wars into a permanent drain.

After Aurangzeb died in 1707, provincial governors and the Marathas cut the empire into regimes that were independent in practice. After the Indian rebellion of 1857 the British deposed the last emperor, Bahadur Shah II. The Mughal title ended. Britain ruled India directly.`,
    [
      { year: 1526, zh: "巴布尔建立莫卧儿帝国。", en: "Babur founds the Mughal empire." },
      { year: 1605, zh: "阿克巴死，帝国制度已经成形。", en: "Akbar dies with the imperial system in place." },
      { year: 1707, zh: "奥朗则布死，地方开始各自为政。", en: "Aurangzeb dies and the provinces go their own way." },
      { year: 1857, zh: "末代皇帝被废。", en: "The last emperor is deposed." },
    ],
  ),
  "aztec empire": book(
    "1428–1521",
    "1428–1521",
    "特诺奇蒂特兰",
    "Tenochtitlan",
    `阿兹特克通常指墨西哥谷地的墨西卡人及其同盟。1428年特诺奇蒂特兰、特斯科科和特拉科潘组成三方同盟，向周围城邦收取贡赋，并不把每一座城都变成直接治理的行省。首都建在湖中的岛上，有堤道和市场。

1519年科尔特斯带领西班牙人从海岸进入内陆，利用对墨西卡纳贡的城邦。1521年同盟的首都在围城和疫病之后陷落，末代首领库奥赫特莫克被俘。阿兹特克帝国结束。西班牙在它的废墟上建墨西哥城。`,
    `Aztec usually means the Mexica of the Valley of Mexico and their allies. In 1428 Tenochtitlan, Texcoco, and Tlacopan formed a triple alliance. They took tribute from surrounding cities. They did not turn every city into a directly governed province. The capital stood on an island in the lake, with causeways and a market.

In 1519 Cortes led Spaniards inland from the coast and used the cities that had been paying tribute. In 1521 the allied capital fell after a siege and an epidemic. The last ruler, Cuauhtemoc, was captured. The Aztec empire ended. The Spanish built Mexico City on its ruins.`,
    [
      { year: 1428, zh: "三方同盟建立。", en: "The triple alliance is formed." },
      { year: 1519, zh: "西班牙人进入墨西哥谷地。", en: "Spaniards enter the Valley of Mexico." },
      { year: 1521, zh: "特诺奇蒂特兰陷落。", en: "Tenochtitlan falls." },
    ],
  ),
  "inca empire": book(
    "1438–1533",
    "1438–1533",
    "库斯科",
    "Cusco",
    `印加在库斯科兴起。1438年帕查库特克抵抗昌卡人之后，帝国迅速沿安第斯山扩张，用道路、仓库和克丘亚语把从今天的厄瓜多尔到智利中部的河谷连起来。地方精英被迁到新的地方，太阳神庙和王室木乃伊是权力的象征。

1527年兄弟争位，瓦斯卡和阿塔瓦尔帕打内战。1532年皮萨罗在卡哈马卡捉住阿塔瓦尔帕。1533年他被处死，西班牙人进入库斯科。印加的残部在比尔卡班巴坚持到1572年。帝国作为从库斯科发号施令的国家，在1533年已经结束。`,
    `The Inca rose at Cusco. After Pachacuti resisted the Chanka in 1438, the empire expanded quickly along the Andes. Roads, storehouses, and Quechua tied together valleys from what is now Ecuador to central Chile. Local elites were moved, and the sun temple and the royal mummies were the signs of power.

In 1527 a succession war broke out between Huascar and Atahualpa. In 1532 Pizarro captured Atahualpa at Cajamarca. He was killed in 1533 and the Spanish entered Cusco. An Inca remnant held out at Vilcabamba until 1572. As a state giving orders from Cusco, the empire ended in 1533.`,
    [
      { year: 1438, zh: "帕查库特克开始扩张。", en: "Pachacuti begins the expansion." },
      { year: 1532, zh: "阿塔瓦尔帕在卡哈马卡被俘。", en: "Atahualpa is captured at Cajamarca." },
      { year: 1533, zh: "库斯科被西班牙人占领。", en: "The Spanish occupy Cusco." },
      { year: 1572, zh: "比尔卡班巴的残部灭亡。", en: "The Vilcabamba remnant is destroyed." },
    ],
  ),
  teotihuacan: book(
    "约前100–550",
    "about 100 BCE–550 CE",
    "特奥蒂瓦坎",
    "Teotihuacan",
    `特奥蒂瓦坎在墨西哥谷地东北，公元一世纪已经是一座有网格街道的大城。太阳金字塔和月亮金字塔沿中轴线排列。它的影响通过黑曜石、陶器和图案到达玛雅城市，但没有证据表明它像后来的阿兹特克那样建立了一个收贡的帝国。

六世纪中叶城市被焚毁，居民离开。特奥蒂瓦坎作为权力中心结束。阿兹特克人几百年后把这座空城当作神迹，那已经是另一段历史。`,
    `Teotihuacan, northeast of the Valley of Mexico, was already a great city with a street grid in the first century CE. The Pyramids of the Sun and the Moon stood on its axis. Its influence reached Maya cities through obsidian, pottery, and motifs. There is no evidence that it ran a tribute empire of the later Aztec kind.

In the middle of the sixth century the city was burned and the people left. Teotihuacan ended as a center of power. Centuries later the Aztecs treated the empty city as a place of the gods. That is a different history.`,
    [
      { year: 100, zh: "城市进入鼎盛。", en: "The city enters its height." },
      { year: 550, zh: "城市被焚，居民离散。", en: "The city is burned and the people leave." },
    ],
  ),
  axum: book(
    "约100–960",
    "about 100–960",
    "阿克苏姆",
    "Aksum",
    `阿克苏姆在今天的厄立特里亚和埃塞俄比亚北部。它靠红海港口阿杜利斯把象牙、黄金和奴隶运往罗马和印度。四世纪埃扎纳国王改宗基督教，并出兵攻打尼罗河下游的麦罗埃。阿克苏姆的铸币同时有希腊文和盖埃兹文。

七世纪阿拉伯人控制红海以后，阿杜利斯衰落，王国失去海路。十世纪王室传统中断，权力转到更南的扎格维王朝。阿克苏姆城不再是王国的首都。后来的埃塞俄比亚还使用它的基督教和盖埃兹传统，但那是新的王朝。`,
    `Aksum lay in what is now Eritrea and northern Ethiopia. Through the Red Sea port of Adulis it sent ivory, gold, and slaves toward Rome and India. In the fourth century King Ezana converted to Christianity and campaigned against Meroe on the lower Nile. Aksumite coins carried both Greek and Ge'ez.

After Arabs controlled the Red Sea in the seventh century, Adulis declined and the kingdom lost the sea road. In the tenth century the royal line broke off in tradition, and power moved south to the Zagwe. The city of Aksum was no longer a royal capital. Later Ethiopia kept its Christianity and Ge'ez. Those were new dynasties.`,
    [
      { year: 330, zh: "埃扎纳改宗基督教。", en: "Ezana converts to Christianity." },
      { year: 350, zh: "阿克苏姆攻打麦罗埃。", en: "Aksum campaigns against Meroe." },
      { year: 960, zh: "阿克苏姆王统中断。", en: "The Aksumite royal line breaks off." },
    ],
  ),
england: book(
    "927–1707的英格兰王国",
    "the kingdom of England, 927–1707",
    "温彻斯特，后为伦敦",
    "Winchester, later London",
    `927年埃塞尔斯坦成为全英格兰的国王。1066年诺曼底公爵威廉征服英格兰。1215年大宪章约束国王征税。1453年英格兰几乎失去在法国的领地。1534年亨利八世与罗马断绝，1588年英国舰队打散西班牙无敌舰队。1707年英格兰与苏格兰合成大不列颠王国。以后的帝国和议会政治属于联合王国，不再是单独的英格兰。`,
    `In 927 Athelstan became king of all England. In 1066 William of Normandy conquered it. Magna Carta in 1215 constrained royal taxation. By 1453 England had lost almost all of its French lands. Henry VIII broke with Rome in 1534, and English ships scattered the Armada in 1588. In 1707 England and Scotland formed Great Britain. The later empire belongs to the United Kingdom, not to England alone.`,
    [
      { year: 1066, zh: "诺曼征服。", en: "The Norman conquest." },
      { year: 1215, zh: "大宪章。", en: "Magna Carta." },
      { year: 1588, zh: "无敌舰队战败。", en: "The Armada is defeated." },
      { year: 1707, zh: "英格兰与苏格兰合并。", en: "England and Scotland unite." },
    ],
  ),
  spain: book(
    "1479年以后的西班牙",
    "Spain after 1479",
    "托莱多，后为马德里",
    "Toledo, later Madrid",
    `1479年卡斯蒂利亚和阿拉贡的王冠联在一起。1492年格拉纳达投降，哥伦布到达加勒比。西班牙在美洲设新西班牙和秘鲁两个总督辖区，白银经塞维利亚流入欧洲。1580年到1640年它还兼有葡萄牙。1588年无敌舰队失败，1648年尼德兰脱离。1898年失去古巴、波多黎各和菲律宾。海外帝国是港口、矿区和航线，不能涂成一整块大陆。`,
    `In 1479 the crowns of Castile and Aragon were joined. Granada fell in 1492 and Columbus reached the Caribbean. Spain created the viceroyalties of New Spain and Peru, and silver flowed through Seville. From 1580 to 1640 it also held Portugal. The Armada failed in 1588 and the Netherlands left in 1648. In 1898 Spain lost Cuba, Puerto Rico, and the Philippines. The overseas empire was ports, mines, and routes, not one painted continent.`,
    [
      { year: 1492, zh: "格拉纳达投降，哥伦布西航。", en: "Granada falls and Columbus sails west." },
      { year: 1588, zh: "无敌舰队失败。", en: "The Armada fails." },
      { year: 1898, zh: "失去古巴、波多黎各和菲律宾。", en: "Cuba, Puerto Rico, and the Philippines are lost." },
    ],
  ),
  portugal: book(
    "1143年以后的葡萄牙",
    "Portugal after 1143",
    "里斯本",
    "Lisbon",
    `1143年葡萄牙从莱昂独立。1415年占领休达以后沿非洲海岸南下，1498年达伽马到达印度。帝国是一串商站：果阿、马六甲、澳门、巴西。1580年王位落入西班牙，1640年复国。1822年巴西独立。1975年非洲殖民地独立。葡萄牙的力量在海上，不在连成一片的陆地。`,
    `Portugal separated from Leon in 1143. After Ceuta in 1415 it sailed down Africa, and Vasco da Gama reached India in 1498. The empire was a chain of posts: Goa, Melaka, Macau, and Brazil. The crown passed to Spain in 1580 and was restored in 1640. Brazil became independent in 1822. The African colonies followed in 1975. Portuguese power was at sea, not in a continuous land mass.`,
    [
      { year: 1143, zh: "葡萄牙王国成立。", en: "The kingdom of Portugal is founded." },
      { year: 1498, zh: "达伽马到达印度。", en: "Vasco da Gama reaches India." },
      { year: 1822, zh: "巴西独立。", en: "Brazil becomes independent." },
    ],
  ),
  russia: book(
    "莫斯科公国、沙皇俄国与俄罗斯",
    "Muscovy, the tsardom, and Russia",
    "莫斯科，1712年后为圣彼得堡",
    "Moscow, Saint Petersburg after 1712",
    `莫斯科在十四世纪成为金帐汗国下最强的公国，1480年停止纳贡。1547年伊凡四世称沙皇，1552年攻下喀山，随后向西伯利亚扩张。1721年彼得一世称皇帝，都城迁到圣彼得堡。帝国向西瓜分波兰，向南打奥斯曼。1917年沙皇制度结束，1922年苏联成立，1991年解体。俄罗斯联邦是苏联的主要继承国。西伯利亚是它扩大最快的方向。`,
    `In the fourteenth century Moscow became the strongest principality under the Golden Horde and stopped paying tribute in 1480. Ivan IV took the title tsar in 1547, took Kazan in 1552, and then expanded into Siberia. Peter I became emperor in 1721 and moved the capital to Saint Petersburg. The empire partitioned Poland and fought the Ottomans. Tsardom ended in 1917. The Soviet Union lasted from 1922 to 1991. The Russian Federation is its main successor. Siberia was the fastest direction of growth.`,
    [
      { year: 1480, zh: "莫斯科结束对金帐汗国纳贡。", en: "Moscow ends tribute to the Golden Horde." },
      { year: 1552, zh: "攻下喀山。", en: "Kazan is taken." },
      { year: 1721, zh: "彼得一世称皇帝。", en: "Peter I becomes emperor." },
      { year: 1917, zh: "沙皇制度结束。", en: "Tsardom ends." },
      { year: 1991, zh: "苏联解体。", en: "The Soviet Union dissolves." },
    ],
  ),
  "kanem-bornu": book(
    "约700–1893",
    "about 700–1893",
    "恩吉米，后为恩加扎尔加穆",
    "Njimi, later Ngazargamu",
    `加涅姆在乍得湖东北兴起，约十一世纪国王改宗伊斯兰教，控制撒哈拉商路的东支。十四世纪末王室迁到湖西，国号转为博尔努。十六世纪末伊德里斯·阿劳马用火器巩固国家。1893年拉比赫推翻旧王朝。王国结束，土地后来被英、法、德的殖民边界切开。`,
    `Kanem rose northeast of Lake Chad. Around the eleventh century its kings converted to Islam and held the eastern Saharan trade. At the end of the fourteenth century the court moved west of the lake and the state became Bornu. Idris Alooma strengthened it with firearms in the late sixteenth century. In 1893 Rabih overthrew the old dynasty. The kingdom ended, and colonial borders later cut the land among Britain, France, and Germany.`,
    [
      { year: 1100, zh: "加涅姆国王已经是穆斯林。", en: "The kings of Kanem are Muslim." },
      { year: 1380, zh: "中心迁到乍得湖以西。", en: "The center moves west of Lake Chad." },
      { year: 1893, zh: "旧王朝被推翻。", en: "The old dynasty is overthrown." },
    ],
  ),
  ayutthaya: book(
    "1351–1767",
    "1351–1767",
    "阿瑜陀耶",
    "Ayutthaya",
    `1351年乌通王在昭披耶河中游建立阿瑜陀耶，后来吞并素可泰。它靠稻米和王室贸易，与缅甸、真腊反复战争。1767年缅甸贡榜王朝攻毁都城，王朝结束。郑信在吞武里复国，1782年却克里王朝把都城迁到曼谷。阿瑜陀耶是泰人国家的主要一章，不是今天泰国的全部前身。`,
    `In 1351 King Uthong founded Ayutthaya on the middle Chao Phraya. It later absorbed Sukhothai. It lived on rice and royal trade and fought Burma and the Khmer. In 1767 the Konbaung army destroyed the capital and the dynasty ended. Taksin restored a Thai kingdom at Thonburi, and in 1782 the Chakri dynasty moved to Bangkok. Ayutthaya is a main chapter of Thai history, not the whole ancestry of modern Thailand.`,
    [
      { year: 1351, zh: "阿瑜陀耶建国。", en: "Ayutthaya is founded." },
      { year: 1438, zh: "素可泰并入。", en: "Sukhothai is absorbed." },
      { year: 1767, zh: "都城被缅甸攻毁。", en: "Burma destroys the capital." },
      { year: 1782, zh: "都城迁到曼谷。", en: "The capital moves to Bangkok." },
    ],
  ),
  pagan: book(
    "849–1287",
    "849–1287",
    "蒲甘",
    "Pagan",
    `849年缅人在伊洛瓦底江边建蒲甘。阿奴律陀在1044年以后征服孟人的直通，把上下缅甸连在一个朝廷之下。1287年元朝军队攻入，帝国解体，缅甸分成阿瓦、勃固等几个政权，直到十六世纪东吁王朝再次统一。`,
    `In 849 the Burmans founded Pagan on the Irrawaddy. After 1044 Anawrahta conquered the Mon city of Thaton and joined upper and lower Burma. In 1287 a Yuan army entered and the empire broke up into Ava, Pegu, and other regimes until the Toungoo dynasty unified Burma again in the sixteenth century.`,
    [
      { year: 1044, zh: "阿奴律陀开始统一。", en: "Anawrahta begins the unification." },
      { year: 1287, zh: "蒲甘解体。", en: "Pagan breaks up." },
    ],
  ),
  venice: book(
    "约697–1797",
    "about 697–1797",
    "威尼斯",
    "Venice",
    `威尼斯在泻湖里由总督统治，靠船和契约。1204年它参与攻占君士坦丁堡，分到克里特和爱琴海港口。1797年拿破仑把共和国交给奥地利，总督制度结束。它没有死于奥斯曼的围城，而死于法国的战争。`,
    `Venice was ruled by a doge in the lagoon and lived by ships and contracts. In 1204 it joined the capture of Constantinople and took Crete and Aegean ports. In 1797 Napoleon handed the republic to Austria and the doges ended. It did not die in an Ottoman siege. It died in a French war.`,
    [
      { year: 1204, zh: "分得拜占庭的海港。", en: "Venice takes Byzantine ports." },
      { year: 1797, zh: "共和国被取消。", en: "The republic is abolished." },
    ],
  ),
ethiopia: book(
    "阿克苏姆之后的埃塞俄比亚",
    "Ethiopia after Aksum",
    "拉利贝拉、贡德尔、亚的斯亚贝巴",
    "Lalibela, Gondar, Addis Ababa",
    `扎格维王朝之后，1270年所罗门王朝声称恢复阿克苏姆王统。十六世纪阿达尔的艾哈迈德·格拉尼几乎推翻基督教王国。1636年定都贡德尔。1896年孟尼利克二世在阿杜瓦打败意大利。1936年至1941年被意大利占领。埃塞俄比亚是非洲少数长期保持独立的王国，今天的边界仍是十九世纪末打出来的。`,
    `After the Zagwe, the Solomonic dynasty of 1270 claimed the Aksumite line. In the sixteenth century Ahmad Gragn of Adal nearly overthrew the Christian kingdom. The capital settled at Gondar in 1636. Menelik II defeated Italy at Adwa in 1896. Italy occupied the country from 1936 to 1941. Ethiopia is one of the few African kingdoms that stayed independent for a long time. Its present borders were still made by war at the end of the nineteenth century.`,
    [
      { year: 1270, zh: "所罗门王朝建立。", en: "The Solomonic dynasty is founded." },
      { year: 1896, zh: "阿杜瓦战役。", en: "The battle of Adwa." },
      { year: 1974, zh: "海尔·塞拉西被废。", en: "Haile Selassie is deposed." },
    ],
  ),
  vietnam: book(
    "939年以后的大越与越南",
    "Dai Viet and Vietnam after 939",
    "升龙，后为顺化、河内",
    "Thang Long, later Hue and Hanoi",
    `939年吴权在白藤江打败南汉，越南北部脱离南汉。1054年李朝定国号大越，都升龙。陈朝两次挡住元朝。1427年黎利赶走明朝的驻军。1802年阮朝统一南北，国号越南，都顺化。十九世纪末法国分成交趾支那、安南和东京三部分统治。1945年宣布独立，1976年统一，定都河内。`,
    `In 939 Ngo Quyen defeated Southern Han on the Bach Dang. In 1054 the Ly named the state Dai Viet, at Thang Long. The Tran stopped the Yuan twice. In 1427 Le Loi drove out the Ming garrisons. In 1802 the Nguyen unified north and south as Vietnam, at Hue. At the end of the nineteenth century France ruled it as Cochinchina, Annam, and Tonkin. Independence was declared in 1945 and the country was reunified in 1976 at Hanoi.`,
    [
      { year: 939, zh: "吴权独立。", en: "Ngo Quyen wins independence." },
      { year: 1054, zh: "国号大越。", en: "The name becomes Dai Viet." },
      { year: 1427, zh: "黎利赶走明军。", en: "Le Loi drives out the Ming." },
      { year: 1802, zh: "阮朝建立，国号越南。", en: "The Nguyen dynasty names the country Vietnam." },
      { year: 1976, zh: "越南统一。", en: "Vietnam is reunified." },
    ],
  ),
  "golden horde": book(
    "1242–1502",
    "1242–1502",
    "萨莱",
    "Sarai",
    `拔都西征之后在伏尔加河下游建萨莱，罗斯王公要到汗庭领受册封。这就是钦察汗国，也叫金帐汗国。1380年莫斯科在库利科沃打败马迈，但纳贡又继续了几十年。1480年莫斯科停止纳贡。1502年克里米亚汗攻灭大帐。喀山、阿斯特拉罕和克里米亚等汗国还各自存在。`,
    `After the western campaign Batu built Sarai on the lower Volga. Rus princes received their patents at his court. This was the Kipchak khanate, the Golden Horde. Moscow defeated Mamai at Kulikovo in 1380, but tribute continued for decades. Moscow stopped it in 1480. In 1502 the Crimean khan destroyed the Great Horde. Kazan, Astrakhan, and Crimea continued as separate khanates.`,
    [
      { year: 1242, zh: "拔都在伏尔加河下游建国。", en: "Batu founds the state on the lower Volga." },
      { year: 1480, zh: "莫斯科结束纳贡。", en: "Moscow stops the tribute." },
      { year: 1502, zh: "大帐灭亡。", en: "The Great Horde is destroyed." },
    ],
  ),
  "kievan rus": book(
    "约882–1240",
    "about 882–1240",
    "基辅",
    "Kyiv",
    `约882年奥列格把中心迁到基辅。基辅罗斯是东斯拉夫与瓦良格商人沿第聂伯河通往拜占庭的公国联盟。988年弗拉基米尔接受基督教。1132年以后诸子分领城市，联盟松散。1240年蒙古攻破基辅。罗斯变成几个向汗国领受册封的公国，莫斯科后来从中兴起。`,
    `Around 882 Oleg moved the center to Kyiv. Kievan Rus was a league of East Slavic and Varangian principalities on the Dnieper route to Byzantium. Vladimir accepted Christianity in 988. After 1132 sons held separate cities and the league loosened. The Mongols took Kyiv in 1240. Rus became principalities that received patents from the khan. Moscow later rose among them.`,
    [
      { year: 882, zh: "奥列格定都基辅。", en: "Oleg settles at Kyiv." },
      { year: 988, zh: "接受基督教。", en: "Christianity is accepted." },
      { year: 1240, zh: "蒙古攻破基辅。", en: "The Mongols take Kyiv." },
    ],
  ),
  germany: book(
    "1871年以后的德国",
    "Germany after 1871",
    "柏林",
    "Berlin",
    `1806年以前德意志是神圣罗马帝国里的许多邦，不是一个王国。1871年德意志帝国成立，皇帝由普鲁士国王兼任，奥地利留在外面。1918年变成共和国。1933年纳粹掌权，1945年战败后被分区占领。1949年分成联邦德国和民主德国，1990年统一。不能把1871年以前的德意志涂成一个国家。`,
    `Before 1806 Germany was the many states of the Holy Roman Empire, not one kingdom. The German empire of 1871 made the king of Prussia its emperor and left Austria outside. It became a republic in 1918. The Nazis took power in 1933. After 1945 Germany was occupied in zones, split in 1949, and reunited in 1990. Germany before 1871 cannot be painted as one state.`,
    [
      { year: 1871, zh: "德意志帝国成立。", en: "The German empire is founded." },
      { year: 1918, zh: "帝国结束。", en: "The empire ends." },
      { year: 1949, zh: "分成东西两国。", en: "Germany splits in two." },
      { year: 1990, zh: "两德统一。", en: "The two states unite." },
    ],
  ),
  italy: book(
    "1861年以后的意大利",
    "Italy after 1861",
    "都灵，后为罗马",
    "Turin, later Rome",
    `1861年以前意大利半岛是教宗国、两西西里、撒丁和若干外国王朝的领地。撒丁王国在加富尔和加里波第的战争里合并了大部分地区，1861年成立意大利王国，1870年进入罗马。1946年废除君主制。罗马城、中世纪城邦和1861年的王国不是同一个国家。`,
    `Before 1861 the peninsula was the Papal States, the Two Sicilies, Sardinia, and lands of foreign dynasties. Sardinia absorbed most of it through the wars of Cavour and Garibaldi. The kingdom of Italy was founded in 1861 and entered Rome in 1870. The monarchy ended in 1946. The city of Rome, the medieval communes, and the kingdom of 1861 are not the same state.`,
    [
      { year: 1861, zh: "意大利王国成立。", en: "The kingdom of Italy is founded." },
      { year: 1870, zh: "罗马并入意大利。", en: "Rome joins Italy." },
      { year: 1946, zh: "君主制结束。", en: "The monarchy ends." },
    ],
  ),
  greece: book(
    "1830年以后的希腊王国",
    "Greece after 1830",
    "纳夫普利翁，后为雅典",
    "Nafplio, later Athens",
    `古代希腊是许多城邦。马其顿、罗马和拜占庭先后统治，1453年以后大部分属于奥斯曼。1830年列强承认一个小希腊王国，最初只有伯罗奔尼撒和大陆南部。古代城邦、拜占庭行省和1830年的王国是三件不同的事。`,
    `Ancient Greece was many cities. Macedon, Rome, and Byzantium ruled it in turn, and after 1453 most of it belonged to the Ottomans. In 1830 the powers recognized a small Greek kingdom, at first only the Peloponnese and the southern mainland. The ancient cities, the Byzantine provinces, and the kingdom of 1830 are three different things.`,
    [
      { year: 1830, zh: "希腊王国得到承认。", en: "The kingdom of Greece is recognized." },
      { year: 1944, zh: "轴心国占领结束。", en: "The Axis occupation ends." },
    ],
  ),
  chola: book(
    "约850–1279",
    "about 850–1279",
    "坦贾武尔",
    "Thanjavur",
    `注辇在九世纪复兴于泰米尔地区。罗茶罗乍一世和拉金德拉一世把水师派过孟加拉湾，1025年袭击三佛齐的港口。1279年潘地亚打败末代注辇国王。注辇是印度洋上少有的以海军伸张势力的南亚王朝。`,
    `The Cholas revived in the Tamil country in the ninth century. Rajaraja I and Rajendra I sent a fleet across the Bay of Bengal and attacked Srivijaya's ports in 1025. In 1279 the Pandyas defeated the last Chola king. The Cholas were one of the few South Asian dynasties to project power by sea.`,
    [
      { year: 985, zh: "罗茶罗乍一世即位。", en: "Rajaraja I comes to the throne." },
      { year: 1025, zh: "水师袭击三佛齐。", en: "The fleet attacks Srivijaya." },
      { year: 1279, zh: "注辇灭亡。", en: "The Cholas fall." },
    ],
  ),
  mamluk: book(
    "1250–1517",
    "1250–1517",
    "开罗",
    "Cairo",
    `1250年埃及的马穆鲁克军人取代阿尤布王朝。1260年他们在艾因贾鲁挡住蒙古，叙利亚没有落入伊利汗国。苏丹由军人推举。1517年奥斯曼进入开罗，苏丹国结束。埃及变成奥斯曼行省，本地贝伊还延续到十九世纪。`,
    `In 1250 Mamluk soldiers replaced the Ayyubids in Egypt. In 1260 they stopped the Mongols at Ayn Jalut, and Syria did not fall to the Ilkhanate. Sultans were chosen by the soldiers. In 1517 the Ottomans entered Cairo and the sultanate ended. Egypt became an Ottoman province. Local beys continued into the nineteenth century.`,
    [
      { year: 1250, zh: "马穆鲁克在开罗掌权。", en: "The Mamluks take Cairo." },
      { year: 1260, zh: "艾因贾鲁挡住蒙古。", en: "Ayn Jalut stops the Mongols." },
      { year: 1517, zh: "奥斯曼夺取开罗。", en: "The Ottomans take Cairo." },
    ],
  ),
  ayyubid: book(
    "1171–1250",
    "1171–1250",
    "开罗",
    "Cairo",
    `1171年萨拉丁结束法蒂玛王朝。1187年他在哈丁打败十字军并收回耶路撒冷。他死后领地分给子弟。1250年马穆鲁克军人杀掉末代苏丹，阿尤布王朝在埃及结束。`,
    `In 1171 Saladin ended the Fatimids. In 1187 he defeated the crusaders at Hattin and recovered Jerusalem. After his death the lands were split among his kinsmen. In 1250 Mamluk soldiers killed the last sultan and the Ayyubids ended in Egypt.`,
    [
      { year: 1171, zh: "萨拉丁结束法蒂玛。", en: "Saladin ends the Fatimids." },
      { year: 1187, zh: "收回耶路撒冷。", en: "Jerusalem is recovered." },
      { year: 1250, zh: "马穆鲁克取代阿尤布。", en: "The Mamluks replace the Ayyubids." },
    ],
  ),
  ilkhanate: book(
    "1256–1335",
    "1256–1335",
    "大不里士",
    "Tabriz",
    `1256年旭烈兀在波斯建立伊利汗国，1258年攻破巴格达。合赞汗1295年改宗伊斯兰教。1335年不赛因死后没有继承人，汗国分成几个地方王朝。帖木儿后来又征服了其中大部分土地。`,
    `In 1256 Hulegu founded the Ilkhanate in Persia and took Baghdad in 1258. Ghazan converted to Islam in 1295. After Abu Said died without an heir in 1335 the khanate split into local dynasties. Timur later conquered most of the same land.`,
    [
      { year: 1258, zh: "攻破巴格达。", en: "Baghdad is taken." },
      { year: 1295, zh: "合赞汗改宗伊斯兰教。", en: "Ghazan converts to Islam." },
      { year: 1335, zh: "汗国分裂。", en: "The khanate splits." },
    ],
  ),
  "timurid empire": book(
    "1370–1507",
    "1370–1507",
    "撒马尔罕，后为赫拉特",
    "Samarkand, later Herat",
    `1370年帖木儿在撒马尔罕称霸，军队洗劫德里、巴格达和阿勒颇，中心仍在河中。1405年他死在东征路上，帝国按子孙分裂。1507年乌兹别克攻入赫拉特。巴布尔是帖木儿后裔，他在印度建立的莫卧儿不是这个帝国的延续。`,
    `In 1370 Timur became master at Samarkand. His armies sacked Delhi, Baghdad, and Aleppo, but the center stayed in Transoxiana. He died in 1405 on an eastern campaign and the empire split. The Uzbeks entered Herat in 1507. Babur, Timur's descendant, later founded the Mughal empire in India. That was not a continuation of Timur's state.`,
    [
      { year: 1370, zh: "帖木儿称霸撒马尔罕。", en: "Timur masters Samarkand." },
      { year: 1405, zh: "帖木儿死于东征途中。", en: "Timur dies on the eastern campaign." },
      { year: 1507, zh: "赫拉特陷落。", en: "Herat falls." },
    ],
  ),
  "safavid empire": book(
    "1501–1736",
    "1501–1736",
    "大不里士，后为伊斯法罕",
    "Tabriz, later Isfahan",
    `1501年伊斯玛仪把十二伊玛目派定为波斯国教。阿拔斯一世定都伊斯法罕，收回被奥斯曼占去的西部。1722年阿富汗人攻破伊斯法罕。1736年纳迪尔沙废掉萨法维傀儡。王朝结束，波斯还在。`,
    `In 1501 Ismail made Twelver Shi'ism the state religion of Persia. Abbas I settled the capital at Isfahan and recovered the west from the Ottomans. Afghans took Isfahan in 1722. In 1736 Nader Shah deposed the Safavid puppet. The dynasty ended. Persia remained.`,
    [
      { year: 1501, zh: "伊斯玛仪称王。", en: "Ismail takes the royal title." },
      { year: 1598, zh: "定都伊斯法罕。", en: "The capital moves to Isfahan." },
      { year: 1736, zh: "萨法维王朝结束。", en: "The Safavid dynasty ends." },
    ],
  ),
  "seljuk empire": book(
    "1037–1194",
    "1037–1194",
    "尼沙布尔、伊斯法罕",
    "Nishapur and Isfahan",
    `塞尔柱人是乌古斯突厥的一支。1055年图格里勒进入巴格达，哈里发承认他为苏丹。1071年曼齐刻尔特以后，突厥人大量进入安纳托利亚。1092年马立克沙死后帝国分裂，安纳托利亚一支成为罗姆苏丹国。1194年花剌子模打败末代大塞尔柱苏丹。`,
    `The Seljuks were a branch of the Oghuz. In 1055 Tughril entered Baghdad and the caliph recognized him as sultan. After Manzikert in 1071 Turks moved into Anatolia. The empire split after Malik Shah died in 1092, and the Anatolian branch became the Sultanate of Rum. Khwarazm defeated the last Great Seljuk sultan in 1194.`,
    [
      { year: 1055, zh: "进入巴格达。", en: "Baghdad is entered." },
      { year: 1071, zh: "曼齐刻尔特战役。", en: "Manzikert." },
      { year: 1194, zh: "大塞尔柱灭亡。", en: "The Great Seljuks end." },
    ],
  ),
almohad: book("1121–1269", "1121–1269", "马拉喀什", "Marrakesh", `穆瓦希德由伊本·图马尔特在摩洛哥发起，1147年攻占马拉喀什，取代穆拉比特，并把统治伸到安达卢斯。1212年纳瓦斯·德托洛萨战败后，西班牙的领地迅速丢失。1269年马林王朝攻入马拉喀什，穆瓦希德结束。`, `The Almohads began with Ibn Tumart in Morocco, took Marrakesh in 1147, replaced the Almoravids, and extended into al-Andalus. After Las Navas de Tolosa in 1212 the Spanish lands fell away quickly. The Marinids entered Marrakesh in 1269 and the Almohads ended.`, [{ year: 1147, zh: "攻占马拉喀什。", en: "Marrakesh is taken." }, { year: 1212, zh: "纳瓦斯·德托洛萨战败。", en: "Las Navas de Tolosa." }, { year: 1269, zh: "王朝结束。", en: "The dynasty ends." }]),
  almoravid: book("约1040–1147", "about 1040–1147", "马拉喀什", "Marrakesh", `穆拉比特是撒哈拉柏柏尔人建立的王朝，1062年建马拉喀什，1086年进入安达卢斯，挡住了卡斯蒂利亚的南进。1147年被穆瓦希德攻灭。`, `The Almoravids were Saharan Berbers. They founded Marrakesh in 1062 and entered al-Andalus in 1086, stopping Castile's advance. The Almohads destroyed them in 1147.`, [{ year: 1062, zh: "建立马拉喀什。", en: "Marrakesh is founded." }, { year: 1086, zh: "进入安达卢斯。", en: "They enter al-Andalus." }, { year: 1147, zh: "被穆瓦希德攻灭。", en: "The Almohads destroy them." }]),
  austria: book("哈布斯堡与奥地利", "The Habsburgs and Austria", "维也纳", "Vienna", `哈布斯堡从十三世纪以后多次当选神圣罗马皇帝，根基是奥地利。1526年他们获得波希米亚和匈牙利。1804年另建奥地利帝国，1806年神圣罗马帝国结束。1867年与匈牙利组成二元帝国，1918年解体。今天的奥地利只是阿尔卑斯山间的共和国，不是哈布斯堡的全部领地。`, `From the thirteenth century the Habsburgs were often Holy Roman emperors. Their base was Austria. In 1526 they gained Bohemia and Hungary. An Austrian empire was created in 1804, and the Holy Roman Empire ended in 1806. The dual monarchy with Hungary lasted from 1867 to 1918. Austria today is an Alpine republic, not the whole Habsburg realm.`, [{ year: 1526, zh: "获得波希米亚和匈牙利。", en: "Bohemia and Hungary are gained." }, { year: 1806, zh: "神圣罗马帝国结束。", en: "The Holy Roman Empire ends." }, { year: 1918, zh: "奥匈帝国解体。", en: "Austria-Hungary dissolves." }]),
  buyid: book("934–1055", "934–1055", "设拉子、巴格达", "Shiraz and Baghdad", `白益人是里海以南的戴拉姆军人。945年他们进入巴格达，哈里发还在，军政归白益埃米尔。1055年塞尔柱的图格里勒进入巴格达，白益政权结束。`, `The Buyids were Daylamite soldiers from south of the Caspian. In 945 they entered Baghdad. The caliph remained, but military government belonged to the Buyid emir. In 1055 the Seljuk Tughril entered Baghdad and Buyid rule ended.`, [{ year: 945, zh: "进入巴格达。", en: "Baghdad is entered." }, { year: 1055, zh: "塞尔柱取代白益。", en: "The Seljuks replace the Buyids." }]),
  carthage: book("约前814–前146", "about 814–146 BCE", "迦太基", "Carthage", `迦太基由推罗人建立，靠航海控制西地中海，与罗马打了三次布匿战争。汉尼拔翻越阿尔卑斯，但没有攻下罗马。前146年罗马毁城，设阿非利加行省。迦太基作为国家结束。`, `Tyrians founded Carthage. It held the western Mediterranean by sea and fought Rome in three Punic wars. Hannibal crossed the Alps and did not take Rome. In 146 BCE Rome destroyed the city and created the province of Africa. Carthage ended as a state.`, [{ year: -218, zh: "汉尼拔进入意大利。", en: "Hannibal enters Italy." }, { year: -146, zh: "罗马毁灭迦太基。", en: "Rome destroys Carthage." }]),
  denmark: book("丹麦", "Denmark", "哥本哈根", "Copenhagen", `1397年卡尔马联合把丹麦、挪威和瑞典放在一个君主之下。1523年瑞典退出。挪威由丹麦国王统治到1814年。丹麦此后是波罗的海入口上的小王国，1864年失去石勒苏益格和荷尔斯泰因。`, `The Kalmar Union of 1397 put Denmark, Norway, and Sweden under one monarch. Sweden left in 1523. The Danish king ruled Norway until 1814. Denmark was then a small kingdom at the entrance to the Baltic. It lost Schleswig and Holstein in 1864.`, [{ year: 1397, zh: "卡尔马联合。", en: "The Kalmar Union." }, { year: 1523, zh: "瑞典退出。", en: "Sweden leaves." }, { year: 1814, zh: "挪威转归瑞典。", en: "Norway passes to Sweden." }]),
  "fatimid caliphate": book("909–1171", "909–1171", "马赫迪耶，后为开罗", "Mahdia, later Cairo", `法蒂玛王朝自称阿里和法蒂玛的后裔，909年在北非建国，969年建开罗。它与巴格达的阿拔斯并列，都称哈里发。1171年萨拉丁结束法蒂玛，埃及转入阿尤布王朝。`, `The Fatimids claimed descent from Ali and Fatima. They founded a state in North Africa in 909 and Cairo in 969. They and the Abbasids of Baghdad both claimed the caliphate. In 1171 Saladin ended the Fatimids and Egypt passed to the Ayyubids.`, [{ year: 969, zh: "建立开罗。", en: "Cairo is founded." }, { year: 1171, zh: "萨拉丁结束法蒂玛。", en: "Saladin ends the Fatimids." }]),
  ghaznavid: book("977–1186", "977–1186", "加兹尼", "Ghazni", `伽色尼由萨曼王朝的突厥军人塞布克特勤建立。马哈茂德多次攻入印度北部，都城在加兹尼。十二世纪古尔人崛起，1186年攻灭伽色尼在呼罗珊以东的统治。`, `The Ghaznavids were founded by Sebuktigin, a Turkic soldier of the Samanids. Mahmud raided northern India many times. The capital was Ghazni. The Ghurids rose in the twelfth century and in 1186 ended Ghaznavid rule east of Khorasan.`, [{ year: 998, zh: "马哈茂德即位。", en: "Mahmud comes to the throne." }, { year: 1186, zh: "伽色尼灭亡。", en: "The Ghaznavids end." }]),
  hafsid: book("1229–1574", "1229–1574", "突尼斯", "Tunis", `哈夫斯王朝是穆瓦希德在伊弗里基叶的总督自立而成，都突尼斯。它在西地中海贸易里保持独立，直到1574年奥斯曼攻占突尼斯。`, `The Hafsids began when a local Almohad governor made himself independent in Ifriqiya, at Tunis. The dynasty stayed independent in western Mediterranean trade until the Ottomans took Tunis in 1574.`, [{ year: 1229, zh: "哈夫斯王朝建立。", en: "The Hafsid dynasty is founded." }, { year: 1574, zh: "奥斯曼攻占突尼斯。", en: "The Ottomans take Tunis." }]),
  hungary: book("1000–1918年间的匈牙利王国", "the kingdom of Hungary, 1000–1918", "布达", "Buda", `1000年伊什特万加冕。1526年摩哈奇战役后王国分裂为奥斯曼中部、哈布斯堡西部和特兰西瓦尼亚。1699年奥斯曼退出大部分土地。1867年与奥地利组成二元帝国，1918年解体。中世纪匈牙利比今天的国境大得多。`, `Stephen was crowned in 1000. After Mohacs in 1526 the kingdom split into an Ottoman center, a Habsburg west, and Transylvania. The Ottomans left most of the land in 1699. The dual monarchy with Austria lasted from 1867 to 1918. Medieval Hungary was much larger than the present state.`, [{ year: 1000, zh: "伊什特万加冕。", en: "Stephen is crowned." }, { year: 1526, zh: "摩哈奇战役。", en: "Mohacs." }, { year: 1918, zh: "二元帝国解体。", en: "The dual monarchy dissolves." }]),
  khwarazm: book("约1077–1231", "about 1077–1231", "玉龙杰赤", "Gurganj", `花剌子模在咸海以南兴起，十二世纪末摩诃末把塞尔柱的残余和呼罗珊并入自己的苏丹国。1219年他处死蒙古商队，成吉思汗西征。1220年都城陷落，1221年以后苏丹国崩溃。`, `Khwarazm rose south of the Aral Sea. At the end of the twelfth century Muhammad annexed what remained of the Seljuks and Khorasan. In 1219 he killed a Mongol caravan and Chinggis Khan marched west. The capital fell in 1220 and the sultanate collapsed after 1221.`, [{ year: 1219, zh: "成吉思汗开始西征。", en: "Chinggis Khan marches west." }, { year: 1221, zh: "花剌子模苏丹国崩溃。", en: "The sultanate collapses." }]),
  kush: book("约前8世纪–350", "about the 8th century BCE–350 CE", "纳帕塔，后为麦罗埃", "Napata, later Meroe", `库施在尼罗河中上游。前8世纪它的国王一度统治埃及。后来中心迁到麦罗埃，有自己的文字和炼铁。约350年阿克苏姆攻打麦罗埃，库施王国结束。`, `Kush lay on the middle Nile. In the eighth century BCE its kings briefly ruled Egypt. The center later moved to Meroe, with its own script and iron. Around 350 Aksum campaigned against Meroe and the kingdom of Kush ended.`, [{ year: -730, zh: "库施国王统治埃及。", en: "Kushite kings rule Egypt." }, { year: 350, zh: "阿克苏姆攻打麦罗埃。", en: "Aksum campaigns against Meroe." }]),
  macedon: book("前4世纪的马其顿", "Macedon in the 4th century BCE", "佩拉", "Pella", `腓力二世在前338年喀罗尼亚打败希腊城邦。亚历山大前334年东征，前330年灭亡阿契美尼德，前323年死于巴比伦，部将分裂帝国。马其顿本土前148年成为罗马行省。亚历山大的远征不是一个长期稳定的世界帝国。`, `Philip II defeated the Greek cities at Chaeronea in 338 BCE. Alexander marched east in 334, destroyed the Achaemenids in 330, and died at Babylon in 323. His generals split the empire. Macedon itself became a Roman province in 148 BCE. Alexander's campaign was not a stable world empire.`, [{ year: -338, zh: "喀罗尼亚战役。", en: "Chaeronea." }, { year: -323, zh: "亚历山大死于巴比伦。", en: "Alexander dies at Babylon." }, { year: -148, zh: "马其顿成为罗马行省。", en: "Macedon becomes a Roman province." }]),
  olmec: book("约前1500–前400", "about 1500–400 BCE", "圣洛伦索、拉文塔", "San Lorenzo and La Venta", `奥尔梅克是墨西哥湾沿岸的早期城市文化，以巨石头像闻名。它影响后来的玛雅，但没有留下可以读成王朝的文字史。前400年前后主要中心被放弃。不能把它画成边界清楚的帝国。`, `The Olmec were an early urban culture on the Gulf of Mexico, known for colossal heads. They influenced the later Maya but left no dynastic history that can be read as a king list. The main centers were abandoned around 400 BCE. They should not be drawn as an empire with a clear border.`, [{ year: -1200, zh: "圣洛伦索处于盛期。", en: "San Lorenzo is at its height." }, { year: -400, zh: "主要中心被放弃。", en: "The main centers are abandoned." }]),
  poland: book("966年以后的波兰", "Poland after 966", "克拉科夫，后为华沙", "Krakow, later Warsaw", `966年梅什科一世受洗。1569年与立陶宛组成联邦，国王由贵族选举。1772年到1795年被普鲁士、奥地利和俄国三次瓜分，国家消失。1918年复国，1945年以后边界西移。波兰的历史是一再被瓜分又一再复国。`, `Mieszko I was baptized in 966. In 1569 Poland and Lithuania formed a commonwealth with an elected king. From 1772 to 1795 Prussia, Austria, and Russia partitioned it out of existence. It returned in 1918, and after 1945 the border moved west. Polish history is a state repeatedly erased and restored.`, [{ year: 966, zh: "梅什科一世受洗。", en: "Mieszko I is baptized." }, { year: 1569, zh: "与立陶宛组成联邦。", en: "The union with Lithuania." }, { year: 1795, zh: "第三次瓜分。", en: "The third partition." }, { year: 1918, zh: "波兰复国。", en: "Poland is restored." }]),
  prussia: book("1701–1871", "1701–1871", "柏林", "Berlin", `1701年勃兰登堡选帝侯称普鲁士国王。腓特烈二世在1740年夺取西里西亚。1871年普鲁士国王成为德意志皇帝。普鲁士没有消失，但不再单独面对欧洲。1947年这个邦名被废除。`, `In 1701 the elector of Brandenburg became king in Prussia. Frederick II seized Silesia in 1740. In 1871 the king of Prussia became German emperor. Prussia did not vanish, but it no longer faced Europe alone. The name of the state was abolished in 1947.`, [{ year: 1701, zh: "普鲁士王国成立。", en: "The kingdom is founded." }, { year: 1871, zh: "普鲁士国王成为德意志皇帝。", en: "The king becomes German emperor." }, { year: 1947, zh: "普鲁士邦被废除。", en: "The state of Prussia is abolished." }]),
  "ptolemaic kingdom": book("前305–前30", "305–30 BCE", "亚历山大", "Alexandria", `托勒密是亚历山大的部将，前305年在埃及称王。王朝用希腊语治理，同时以法老身份面对埃及神庙。前30年克娄巴特拉死后，埃及成为罗马行省。`, `Ptolemy, one of Alexander's generals, took the royal title in Egypt in 305 BCE. The dynasty governed in Greek and faced the temples as pharaohs. After Cleopatra died in 30 BCE, Egypt became a Roman province.`, [{ year: -305, zh: "托勒密称王。", en: "Ptolemy becomes king." }, { year: -30, zh: "埃及并入罗马。", en: "Egypt joins Rome." }]),
  samanid: book("819–999", "819–999", "布哈拉", "Bukhara", `萨曼王朝在河中和呼罗珊用波斯语复兴宫廷文化，都布哈拉。999年喀喇汗王朝攻入布哈拉，萨曼王朝结束。`, `The Samanids revived a Persian court culture in Transoxiana and Khorasan, at Bukhara. In 999 the Kara-Khanids entered Bukhara and the Samanid dynasty ended.`, [{ year: 892, zh: "伊斯玛仪把都城定为布哈拉。", en: "Ismail settles the capital at Bukhara." }, { year: 999, zh: "萨曼王朝灭亡。", en: "The Samanids end." }]),
  "seleucid kingdom": book("前312–前63", "312–63 BCE", "安条克", "Antioch", `塞琉古前312年回到巴比伦，王国一度从叙利亚伸到伊朗。巴克特里亚和帕提亚脱离以后，它缩成叙利亚。前63年庞培把它变成罗马行省。`, `Seleucus returned to Babylon in 312 BCE. The kingdom once reached from Syria to Iran. After Bactria and Parthia broke away it shrank to Syria. Pompey made it a Roman province in 63 BCE.`, [{ year: -312, zh: "塞琉古回到巴比伦。", en: "Seleucus returns to Babylon." }, { year: -63, zh: "罗马吞并叙利亚。", en: "Rome annexes Syria." }]),
  sweden: book("瑞典", "Sweden", "斯德哥尔摩", "Stockholm", `1523年古斯塔夫·瓦萨使瑞典脱离卡尔马联合。十七世纪它是波罗的海的强国。1709年波尔塔瓦战败后霸权转到俄国。1809年失去芬兰，1814年获得挪威，1905年挪威和平脱离。瑞典的大国时期是十七世纪。`, `In 1523 Gustav Vasa took Sweden out of the Kalmar Union. In the seventeenth century it was a Baltic power. After Poltava in 1709 that hegemony passed to Russia. Sweden lost Finland in 1809, gained Norway in 1814, and Norway left peacefully in 1905. Sweden's great-power period was the seventeenth century.`, [{ year: 1523, zh: "脱离卡尔马联合。", en: "Sweden leaves the Kalmar Union." }, { year: 1709, zh: "波尔塔瓦战败。", en: "The defeat at Poltava." }, { year: 1905, zh: "挪威脱离。", en: "Norway leaves." }]),
"cao wei": book("220–266", "220–266", "洛阳", "Luoyang", `220年曹丕代汉，都洛阳。魏占有中原、关陇和辽东，是三国里户口最多的一方。263年灭蜀。266年司马炎代魏，魏的国号结束，土地转入西晋。`, `In 220 Cao Pi replaced Han and ruled from Luoyang. Wei held the center, the northwest, and Liaodong, and had the most households of the three states. It conquered Shu in 263. In 266 Sima Yan replaced Wei. The land passed to Western Jin.`, [{ year: 220, zh: "曹丕称帝。", en: "Cao Pi becomes emperor." }, { year: 263, zh: "灭蜀。", en: "Shu is conquered." }, { year: 266, zh: "司马炎代魏。", en: "Sima Yan replaces Wei." }]),
  "shu han": book("221–263", "221–263", "成都", "Chengdu", `221年刘备在成都称帝，继承汉的名号。蜀以益州为根本，诸葛亮从汉中北伐，未能越过秦岭。263年邓艾偷渡阴平，攻入成都，刘禅出降。蜀汉灭亡，土地归魏。`, `In 221 Liu Bei took the imperial title at Chengdu and kept the Han name. Shu depended on Yi Province. Zhuge Liang's northern campaigns never crossed the Qinling for good. In 263 Deng Ai entered Chengdu and Liu Shan surrendered. Shu Han ended and the land passed to Wei.`, [{ year: 221, zh: "刘备在成都称帝。", en: "Liu Bei becomes emperor at Chengdu." }, { year: 263, zh: "邓艾入成都，蜀亡。", en: "Deng Ai enters Chengdu and Shu falls." }]),
  "eastern wu": book("229–280", "229–280", "建业", "Jianye", `229年孙权在建业称帝。吴拥有长江中下游、岭南和海上交通。夷陵之战后与蜀重新结盟。280年西晋水军沿江而下，孙皓出降。吴亡，三国结束。`, `In 229 Sun Quan became emperor at Jianye. Wu held the middle and lower Yangzi, Lingnan, and the sea routes. After Yiling it allied with Shu again. In 280 a Jin fleet came down the river and Sun Hao surrendered. Wu fell and the Three Kingdoms ended.`, [{ year: 229, zh: "孙权称帝。", en: "Sun Quan becomes emperor." }, { year: 280, zh: "西晋灭吴。", en: "Jin conquers Wu." }]),
  "later liang": book("907–923", "907–923", "开封", "Kaifeng", `907年朱温废唐称帝，国号梁，都开封。它占有中原，但河东的李克用、李存勖一直不服从。923年李存勖攻入开封，后梁灭亡。`, `In 907 Zhu Wen deposed the Tang emperor and founded Liang at Kaifeng. He held the central plains, but Li Keyong and Li Cunxu in Hedong never submitted. In 923 Li Cunxu entered Kaifeng and Later Liang ended.`, [{ year: 907, zh: "朱温建后梁。", en: "Zhu Wen founds Later Liang." }, { year: 923, zh: "后唐攻入开封。", en: "Later Tang enters Kaifeng." }]),
  "later tang": book("923–936", "923–936", "洛阳", "Luoyang", `李存勖923年灭后梁，国号仍称唐，都洛阳。925年又灭前蜀。后唐是沙陀军人建立的朝廷，不是李唐的宗室。936年石敬瑭借契丹兵攻入洛阳，后唐灭亡。`, `Li Cunxu destroyed Later Liang in 923, kept the name Tang, and ruled from Luoyang. He conquered Former Shu in 925. Later Tang was a Shatuo military court, not the old Tang house. In 936 Shi Jingtang took Luoyang with Khitan help and Later Tang ended.`, [{ year: 923, zh: "李存勖称帝。", en: "Li Cunxu becomes emperor." }, { year: 925, zh: "灭前蜀。", en: "Former Shu is conquered." }, { year: 936, zh: "后唐灭亡。", en: "Later Tang ends." }]),
  "later jin": book("936–947", "936–947", "开封", "Kaifeng", `936年石敬瑭称帝，把燕云十六州割给契丹。后晋都开封。946年契丹攻入开封，947年出帝被俘，后晋灭亡。契丹不久退出中原，河东的刘知远称帝。`, `In 936 Shi Jingtang became emperor and ceded the Sixteen Prefectures to the Khitans. Later Jin ruled from Kaifeng. In 946 a Khitan army entered Kaifeng and the next year the emperor was captured. The Khitans soon left the center, and Liu Zhiyuan took the throne in Hedong.`, [{ year: 936, zh: "割让燕云十六州。", en: "The Sixteen Prefectures are ceded." }, { year: 947, zh: "契丹攻入开封，后晋亡。", en: "The Khitans enter Kaifeng and Later Jin ends." }]),
  "later han": book("947–951", "947–951", "开封", "Kaifeng", `947年刘知远在太原称帝，随后进入开封，国号汉。这是一个短命的沙陀朝廷。951年郭威兵变，后汉灭亡。刘知远的弟弟刘崇在太原称帝，是为北汉。`, `In 947 Liu Zhiyuan took the imperial title at Taiyuan and then entered Kaifeng. The dynasty was called Han. It was a short Shatuo court. In 951 Guo Wei mutinied and Later Han ended. Liu Chong, a brother of the house, became emperor at Taiyuan. That was Northern Han.`, [{ year: 947, zh: "刘知远称帝。", en: "Liu Zhiyuan becomes emperor." }, { year: 951, zh: "郭威代汉，北汉在太原继续。", en: "Guo Wei replaces Han, and Northern Han continues at Taiyuan." }]),
  "later zhou": book("951–960", "951–960", "开封", "Kaifeng", `951年郭威建后周。柴荣在位时攻南唐、收江北，又整顿禁军。959年柴荣死，幼子即位。960年赵匡胤在陈桥兵变中称帝，后周结束，北宋开始。北汉和几个南方王国还没有被灭。`, `Guo Wei founded Later Zhou in 951. During Chai Rong's reign the court attacked Southern Tang, recovered the land north of the Yangzi, and reorganized the army. Chai Rong died in 959. In 960 Zhao Kuangyin became emperor at Chenqiao. Later Zhou ended and Northern Song began. Northern Han and several southern kingdoms were still independent.`, [{ year: 951, zh: "郭威建后周。", en: "Guo Wei founds Later Zhou." }, { year: 960, zh: "陈桥兵变，后周结束。", en: "The Chenqiao mutiny ends Later Zhou." }]),
  "northern han": book("951–979", "951–979", "太原", "Taiyuan", `951年后汉灭亡，刘崇在太原称帝，依附契丹，史称北汉。它只占河东一块。979年宋太宗亲征，北汉出降。十国里最后一个被灭掉。`, `When Later Han fell in 951, Liu Chong became emperor at Taiyuan under Khitan protection. This is Northern Han. It held only Hedong. In 979 Emperor Taizong of Song campaigned in person and Northern Han surrendered. It was the last of the Ten Kingdoms.`, [{ year: 951, zh: "刘崇在太原称帝。", en: "Liu Chong becomes emperor at Taiyuan." }, { year: 979, zh: "宋灭北汉。", en: "Song conquers Northern Han." }]),
  "former shu": book("907–925", "907–925", "成都", "Chengdu", `907年王建在成都称帝，占有剑南。前蜀靠蜀地的险要自成一国。925年后唐出兵，王衍出降，前蜀灭亡。`, `In 907 Wang Jian became emperor at Chengdu and held Jiannan. Former Shu stood on the mountain passes of Sichuan. In 925 Later Tang sent an army and Wang Yan surrendered. Former Shu ended.`, [{ year: 907, zh: "王建称帝。", en: "Wang Jian becomes emperor." }, { year: 925, zh: "后唐灭前蜀。", en: "Later Tang conquers Former Shu." }]),
  "later shu": book("934–965", "934–965", "成都", "Chengdu", `934年孟知祥在成都称帝，重建蜀国。后蜀占有剑南，与中原隔着秦岭。965年宋军攻入成都，孟昶出降。`, `In 934 Meng Zhixiang became emperor at Chengdu and rebuilt a Shu kingdom. Later Shu held Jiannan, with the Qinling between it and the center. In 965 a Song army entered Chengdu and Meng Chang surrendered.`, [{ year: 934, zh: "孟知祥称帝。", en: "Meng Zhixiang becomes emperor." }, { year: 965, zh: "宋灭后蜀。", en: "Song conquers Later Shu." }]),
  jingnan: book("924–963", "924–963", "江陵", "Jiangling", `荆南又称南平，高季兴于924年受封为南平王，只占江陵一带，是十国里最小的一个。它靠向周围称臣维持。963年宋军借道灭后蜀时顺手收取江陵。`, `Jingnan, also called Nanping, began when Gao Jixing was made prince of Nanping in 924. It held only the Jiangling area and was the smallest of the Ten Kingdoms. It survived by submitting to its neighbors. In 963 a Song army took Jiangling on the way to Later Shu.`, [{ year: 924, zh: "高季兴据江陵。", en: "Gao Jixing holds Jiangling." }, { year: 963, zh: "宋收取荆南。", en: "Song takes Jingnan." }]),
  "chu kingdom": book("907–951", "907–951", "长沙", "Changsha", "907年马殷占据湖南，受后梁封为楚王。楚控有洞庭湖以南。951年南唐趁其内乱出兵，楚灭亡。", "In 907 Ma Yin held Hunan and was made prince of Chu by Later Liang. Chu controlled the land south of Dongting. In 951 Southern Tang used its internal fighting as a chance to invade, and Chu ended.", [{ year: 907, zh: "马殷据湖南。", en: "Ma Yin holds Hunan." }, { year: 951, zh: "南唐灭楚。", en: "Southern Tang conquers Chu." }]),
  "wu kingdom": book("902–937", "902–937", "扬州", "Yangzhou", "杨行密在唐末占据淮南，902年受封吴王，都扬州。吴占有江淮。937年徐知诰代杨氏称帝，国号唐，史称南唐。吴亡。", "Yang Xingmi held Huainan at the end of Tang. In 902 he was made prince of Wu, at Yangzhou. Wu held the Huai and the lower Yangzi. In 937 Xu Zhigao replaced the Yang house and called his dynasty Tang, later known as Southern Tang. Wu ended.", [{ year: 902, zh: "杨行密封吴王。", en: "Yang Xingmi is made prince of Wu." }, { year: 937, zh: "徐知诰建南唐。", en: "Xu Zhigao founds Southern Tang." }]),
  "southern tang": book("937–975", "937–975", "金陵", "Jinling", "937年徐知诰在金陵称帝。南唐后来灭闽、灭楚，是南方最强的王国。958年被后周打败，把江北割让出去。975年宋军攻入金陵，李煜出降。", "In 937 Xu Zhigao became emperor at Jinling. Southern Tang later conquered Min and Chu and was the strongest southern kingdom. In 958 Later Zhou defeated it and took the land north of the Yangzi. In 975 a Song army entered Jinling and Li Yu surrendered.", [{ year: 937, zh: "南唐建立。", en: "Southern Tang is founded." }, { year: 958, zh: "失去江北。", en: "The land north of the Yangzi is lost." }, { year: 975, zh: "宋灭南唐。", en: "Song conquers Southern Tang." }]),
  wuyue: book("907–978", "907–978", "杭州", "Hangzhou", "907年钱镠受封吴越王，都杭州，占有两浙。吴越向中原朝廷称臣，自己保境。978年钱俶向宋纳土。吴越是十国里最后一个主动投降的。", "In 907 Qian Liu was made prince of Wuyue, at Hangzhou, and held the two Zhe circuits. Wuyue submitted to the central courts and guarded its own borders. In 978 Qian Chu surrendered his land to Song. Wuyue was the last of the Ten Kingdoms to give itself up.", [{ year: 907, zh: "钱镠封吴越王。", en: "Qian Liu is made prince of Wuyue." }, { year: 978, zh: "钱俶纳土于宋。", en: "Qian Chu surrenders the land to Song." }]),
  "min kingdom": book("909–945", "909–945", "长乐", "Changle", "909年王审知的后继者在福州称闽王，后来称帝。闽占有福建。945年南唐出兵，闽的国都陷落。残余又被吴越接收。", "In 909 the successors of Wang Shenzhi took the title prince of Min at Fuzhou, and later emperor. Min held Fujian. In 945 Southern Tang took the capital. What remained passed to Wuyue.", [{ year: 909, zh: "闽建国。", en: "Min is founded." }, { year: 945, zh: "南唐灭闽。", en: "Southern Tang conquers Min." }]),
  "southern han": book("917–971", "917–971", "兴王府", "Xingwang", "917年刘䶮在广州称帝，国号汉，史称南汉。它占有岭南。971年宋军攻下广州，南汉灭亡。", "In 917 Liu Yan became emperor at Guangzhou. The dynasty was called Han, later Southern Han. It held Lingnan. In 971 a Song army took Guangzhou and Southern Han ended.", [{ year: 917, zh: "刘䶮在广州称帝。", en: "Liu Yan becomes emperor at Guangzhou." }, { year: 971, zh: "宋灭南汉。", en: "Song conquers Southern Han." }]),
  turgesh: book("699–766", "699–766", "碎叶", "Suyab", "突骑施是西突厥灭亡以后在碎叶一带兴起的部落联盟。它与唐朝时战时和，也挡住大食东进。766年葛逻禄攻占碎叶，突骑施汗国结束。", "The Turgesh were a tribal confederation that rose around Suyab after the Western Turks fell. They alternated war and peace with Tang and also blocked the Arab advance. In 766 the Karluks took Suyab and the Turgesh khaganate ended.", [{ year: 699, zh: "突骑施兴起。", en: "The Turgesh rise." }, { year: 766, zh: "葛逻禄攻占碎叶。", en: "The Karluks take Suyab." }]),
  karluks: book("葛逻禄", "Karluks", "碎叶一带", "the Suyab region", "葛逻禄原是金山、北庭一带的部落。744年他们参与攻灭后突厥，后来西迁。766年占领碎叶，成为西突厥故地的主要力量。九世纪以后与回鹘余部一起形成喀喇汗王朝的来源。", "The Karluks began as tribes around the Altai and Beiting. In 744 they joined the destruction of the second Turkic khaganate and later moved west. In 766 they took Suyab and became the main power in the old Western Turk lands. After the ninth century they and Uyghur remnants formed the basis of the Kara-Khanids.", [{ year: 744, zh: "参与攻灭后突厥。", en: "They join the defeat of the second khaganate." }, { year: 766, zh: "占领碎叶。", en: "They take Suyab." }]),
  kyrgyz: book("840–924前后的黠戛斯", "the Yenisei Kyrgyz after 840", "漠北", "the Mongolian plateau", "840年黠戛斯攻破回鹘汗庭，回鹘西迁。黠戛斯在漠北维持了几十年，没有建成一个像回鹘那样的定居汗国。十世纪契丹兴起后，漠北的主导权转走。", "In 840 the Yenisei Kyrgyz broke the Uyghur court and the Uyghurs moved west. The Kyrgyz held the Mongolian plateau for several decades without building a settled khaganate of the Uyghur kind. After the Khitans rose in the tenth century, the lead on the plateau passed on.", [{ year: 840, zh: "攻破回鹘汗庭。", en: "The Uyghur court is broken." }]),
  "kara khanid": book("约840–1212", "about 840–1212", "巴拉沙衮、喀什噶尔", "Balasagun and Kashgar", "喀喇汗王朝由葛逻禄和回鹘余部在西域建立，十世纪中叶改宗伊斯兰教。它与于阗、萨曼王朝争城。1212年被花剌子模吞并。", "The Kara-Khanids were founded in the Western Regions by Karluks and Uyghur remnants. In the middle of the tenth century they converted to Islam. They fought Khotan and the Samanids. Khwarazm annexed them in 1212.", [{ year: 960, zh: "汗族改宗伊斯兰教。", en: "The khanal house converts to Islam." }, { year: 1212, zh: "被花剌子模吞并。", en: "Khwarazm annexes the khanate." }]),
}
