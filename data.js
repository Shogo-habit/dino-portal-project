const DINOSAURS = [
  {
    id: "tyrannosaurus",
    name: "ティラノサウルス",
    kana: "てぃらのさうるす",
    scientificName: "Tyrannosaurus rex",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "肉食",
    length: "12.3m",
    weight: "8.4t",
    description: "史上最大級の肉食恐竜。その咬合力は全ての陸上生物の中で最強クラスと言われ、骨をも噛み砕くことができた。頂点捕食者として君臨していた。",
    bioTraits: [
      { trait: "咬合力", value: "驚異的", detail: "骨を砕くための特殊な歯の構造を持つ" },
      { trait: "感知能力", value: "極めて高い", detail: "優れた立体視を持つ" }
    ],
    image: "images/tyrannosaurus.webp"
  },
  {
    id: "triceratops",
    name: "トリケラトプス",
    kana: "とりけらとぷす",
    scientificName: "Triceratops horridus",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "9.0m",
    weight: "10.0t",
    description: "3本の角と巨大な襟飾りが特徴。強力な防御能力を持ち、大型肉食恐竜に対しても立ち向かった。",
    bioTraits: [
      { trait: "防御力", value: "鉄壁", detail: "厚い襟飾りが首元を保護する" },
      { trait: "攻撃手段", value: "突進", detail: "最大1メートルの角による突き" }
    ],
    image: "images/triceratops.webp"
  },
  {
    id: "spinosaurus",
    name: "スピノサウルス",
    kana: "すぴのさうるす",
    scientificName: "Spinosaurus aegyptiacus",
    era: "白亜紀中～後期",
    region: "アフリカ",
    diet: "肉食（魚食）",
    length: "15.0m",
    weight: "7.0t",
    description: "背中に帆を持つ水陸両生の肉食恐竜。ワニのような長い顎を持ち、水中での狩りに適応していた。",
    bioTraits: [
      { trait: "水中適応", value: "最高水準", detail: "パドルのような尾による遊泳" },
      { trait: "捕食特化", value: "魚食", detail: "長い顎で魚を捕らえる" }
    ],
    image: "images/spinosaurus.webp"
  },
  {
    id: "stegosaurus",
    name: "ステゴサウルス",
    kana: "すてごさうるす",
    scientificName: "Stegosaurus stenops",
    era: "ジュラ紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "9.0m",
    weight: "5.0t",
    description: "背中に並ぶ骨板と、尾の鋭いスパイクが特徴。脳は小さいが、尾による強力な防御策を持っていた。",
    bioTraits: [
      { trait: "防御武具", value: "スパイク", detail: "サゴマイザーと呼ばれる尾の武器" },
      { trait: "体温調節", value: "可能", detail: "背中の骨板による熱制御説" }
    ],
    image: "images/stegosaurus.webp"
  },
  {
    id: "ankylosaurus",
    name: "アンキロサウルス",
    kana: "あんきろさうるす",
    scientificName: "Ankylosaurus magniventris",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "7.0m",
    weight: "6.0t",
    description: "全身が装甲板で覆われ、尾の先端にはハンマーのような骨の塊がある。最も硬い恐竜の一つ。",
    bioTraits: [
      { trait: "装甲", value: "超硬質", detail: "皮膚に骨質の装飾が埋め込まれている" },
      { trait: "反撃能力", value: "ハンマー", detail: "尾で肉食恐竜の骨を砕く" }
    ],
    image: "images/ankylosaurus.webp"
  },
  {
    id: "velociraptor",
    name: "ヴェロキラプトル",
    kana: "ヴぇろきらぷとる",
    scientificName: "Velociraptor mongoliensis",
    era: "白亜紀後期",
    region: "アジア",
    diet: "肉食",
    length: "2.0m",
    weight: "15kg",
    description: "小型だが知能が高く、俊敏な捕食者。鉤爪を使い、獲物の急所を執拗に狙う狩りを得意としていた。",
    bioTraits: [
      { trait: "敏捷性", value: "最高速", detail: "軽量な骨格による高速移動" },
      { trait: "知能", value: "高い", detail: "集団での狩りが可能だったとされる" }
    ],
    image: "images/velociraptor.webp"
  },
  {
    id: "allosaurus",
    name: "アロサウルス",
    kana: "あろさうるす",
    scientificName: "Allosaurus fragilis",
    era: "ジュラ紀後期",
    region: "北アメリカ",
    diet: "肉食",
    length: "8.5m",
    weight: "2.3t",
    description: "ジュラ紀の頂点捕食者。鋭い歯と強力な前肢の爪を持ち、大型の草食恐竜を集団で狩った可能性がある。",
    bioTraits: [
      { trait: "攻撃特性", value: "噛みつき・爪", detail: "斧のように上顎を振り下ろす攻撃" },
      { trait: "機動力", value: "高い", detail: "同サイズの肉食恐竜より俊敏" }
    ],
    image: "images/allosaurus.webp"
  },
  {
    id: "brachiosaurus",
    name: "ブラキオサウルス",
    kana: "ぶらきおさうるす",
    scientificName: "Brachiosaurus altithorax",
    era: "ジュラ紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "25.0m",
    weight: "56.0t",
    description: "前肢が後肢よりも長い超大型恐竜。高い所の植物を食べることに特化し、圧倒的な巨体が防具となった。",
    bioTraits: [
      { trait: "リーチ", value: "超広範囲", detail: "地上13メートル以上の葉を摂取" },
      { trait: "防御", value: "巨大質量", detail: "捕食者に襲われるリスクはほぼ皆無" }
    ],
    image: "images/brachiosaurus.webp"
  },
  {
    id: "carnotaurus",
    name: "カルノタウルス",
    kana: "かるのたふるす",
    scientificName: "Carnotaurus sastrei",
    era: "白亜紀後期",
    region: "南アメリカ",
    diet: "肉食",
    length: "7.5m",
    weight: "1.35t",
    description: "「肉食の雄牛」を意味し、目の上にある2本の角が特徴。極端に短い前肢と、非常に発達した脚力を持つ。",
    bioTraits: [
      { trait: "走力", value: "最高クラス", detail: "直進加速能力が非常に高いとされる" },
      { trait: "感覚", value: "嗅覚", detail: "強力な嗅覚で獲物を追跡する" }
    ],
    image: "images/carnotaurus.webp"
  },
  {
    id: "diplodocus",
    name: "ディプロドクス",
    kana: "でぃぷろどくす",
    scientificName: "Diplodocus longus",
    era: "ジュラ紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "27.0m",
    weight: "12.0t",
    description: "非常に長い首と、鞭のように細長い尾を持つ大型の竜脚類。細長い体型を活かして広範囲の植物を摂取した。",
    bioTraits: [
      { trait: "防御手段", value: "鞭打ち", detail: "尾を音速で振り回し、音波や打撃で攻撃" },
      { trait: "採食効率", value: "高い", detail: "首を横に振るだけで広範囲の植物を食べられた" }
    ],
    image: "images/diplodocus.webp"
  },
  {
    id: "elasmosaurus",
    name: "エラスモサウルス",
    kana: "えらすもさうるす",
    scientificName: "Elasmosaurus platyurus",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "肉食（魚食）",
    length: "14.0m",
    weight: "2.0t",
    description: "全長の大半分を占める極端に長い首を持つ首長竜。その首は70個以上の骨からなり、柔軟に獲物を追跡できた。",
    bioTraits: [
      { trait: "水中機動", value: "高い", detail: "ヒレ状の四肢で滑らかに泳ぐ" },
      { trait: "奇襲性", value: "高い", detail: "水面下から頭だけを動かして魚を捕らえる" }
    ],
    image: "images/elasmosaurus.webp"
  },
  {
    id: "fukuisaurus",
    name: "フクイサウルス",
    kana: "ふくいさうるす",
    scientificName: "Fukuisaurus tetoriensis",
    era: "白亜紀前期",
    region: "日本",
    diet: "草食",
    length: "4.7m",
    weight: "1.0t",
    description: "福井県で発見されたイグアノドン類。日本を代表する恐竜の一つであり、四足歩行と二足歩行の両方が可能だった。",
    bioTraits: [
      { trait: "汎用性", value: "高い", detail: "二足と四足の両方で活動可能" },
      { trait: "咀嚼能力", value: "進化型", detail: "植物を効率よくすりつぶす歯の構造" }
    ],
    image: "images/fukuisaurus.webp"
  },
  {
    id: "mosasaurus",
    name: "モササウルス",
    kana: "もささうるす",
    scientificName: "Mosasaurus hoffmanni",
    era: "白亜紀後期",
    region: "海洋（全世界）",
    diet: "肉食",
    length: "17.0m",
    weight: "20.0t",
    description: "白亜紀の海に君臨した頂点捕食者。強力な顎と遊泳に適した流線型の体を持ち、多様な獲物を捕らえていた。",
    bioTraits: [
      { trait: "破壊力", value: "絶大", detail: "強力な咬合力でカメの甲羅も砕く" },
      { trait: "推進力", value: "高い", detail: "強力な尾びれによる突進" }
    ],
    image: "images/mosasaurus.webp"
  },
  {
    id: "giganotosaurus",
    name: "ギガノトサウルス",
    kana: "ぎがのとさうるす",
    scientificName: "Giganotosaurus carolini",
    era: "白亜紀後期",
    region: "南アメリカ",
    diet: "肉食",
    length: "13.0m",
    weight: "8.0t",
    description: "ティラノサウルスに匹敵、あるいはそれを上回る巨体を持つ巨大肉食恐竜。アルゼンチンで発見され、巨大な竜脚類を狩っていたと考えられている。",
    bioTraits: [
      { trait: "巨体", value: "最大級", detail: "地上最大級の獣脚類の一つ" },
      { trait: "咬合力", value: "高い", detail: "肉を切り裂くのに適した薄く鋭い歯" }
    ],
    image: "images/giganotosaurus.webp"
  },
  {
    id: "hadrosaurus",
    name: "ハドロサウルス",
    kana: "はどろさうるす",
    scientificName: "Hadrosaurus foulkii",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "8.0m",
    weight: "3.0t",
    description: "「カモノハシ竜」として知られる草食恐竜の代表格。北アメリカで初めてほぼ完全な骨格が発見された恐竜でもある。",
    bioTraits: [
      { trait: "咀嚼能力", value: "高度", detail: "数百本の歯が並ぶデンタルバッテリー構造" },
      { trait: "移動形式", value: "二足・四足", detail: "状況に応じて歩行スタイルを切り替えた" }
    ],
    image: "images/hadrosaurus.webp"
  },
  {
    id: "iguanodon",
    name: "イグアノドン",
    kana: "いぐあのどん",
    scientificName: "Iguanodon bernissartensis",
    era: "白亜紀前期",
    region: "ヨーロッパ・アジア",
    diet: "草食",
    length: "10.0m",
    weight: "4.0t",
    description: "「イグアナの歯」を意味する名前を持つ、世界で2番目に命名された恐竜。親指にある鋭いスパイクが特徴で、自衛に用いたとされる。",
    bioTraits: [
      { trait: "自衛武器", value: "親指のスパイク", detail: "捕食者に対する強力な武器" },
      { trait: "食性適応", value: "効率的", detail: "硬い植物をすりつぶす能力に長けていた" }
    ],
    image: "images/iguanodon.webp"
  },
  {
    id: "juravenator",
    name: "ジュラベナトル",
    kana: "じゅらべなとる",
    scientificName: "Juravenator starki",
    era: "ジュラ紀後期",
    region: "ヨーロッパ",
    diet: "肉食",
    length: "0.8m",
    weight: "2kg",
    description: "ドイツで発見された小型の肉食恐竜。皮膚の痕跡から、鱗と羽毛の両方を持っていた可能性が示唆されている。",
    bioTraits: [
      { trait: "皮膚構造", value: "ハイブリッド", detail: "鱗と羽毛の痕跡が同時に確認されている" },
      { trait: "敏捷性", value: "極めて高い", detail: "小型の獲物を捕らえるための俊敏な動き" }
    ],
    image: "images/juravenator.webp"
  },
  {
    id: "kentrosaurus",
    name: "ケントロサウルス",
    kana: "けんとろさうるす",
    scientificName: "Kentrosaurus aethiopicus",
    era: "ジュラ紀後期",
    region: "アフリカ",
    diet: "草食",
    length: "4.5m",
    weight: "1.0t",
    description: "ステゴサウルスの仲間だが、背中の後半から尾にかけて鋭いスパイクが並んでいるのが特徴。アフリカのタンザニアで多く発見された。",
    bioTraits: [
      { trait: "カウンター", value: "鋭いトゲ", detail: "尾を振り回して敵を攻撃する" },
      { trait: "防御態勢", value: "ハリネズミ状", detail: "全身のトゲで捕食者を威嚇" }
    ],
    image: "images/kentrosaurus.webp"
  },
  {
    id: "lambeosaurus",
    name: "ラムベオサウルス",
    kana: "らむべおさうるす",
    scientificName: "Lambeosaurus lambei",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "9.0m",
    weight: "4.0t",
    description: "頭部に斧のような形の大きなトサカを持つハドロサウルス類。トサカの内部は空洞で、音を鳴らして仲間と通信していた可能性がある。",
    bioTraits: [
      { trait: "音響装置", value: "トサカ", detail: "低周波の音を増幅させて通信に利用" },
      { trait: "社会性", value: "高い", detail: "群れで行動し、音声で警告を発し合った" }
    ],
    image: "images/lambeosaurus.webp"
  },
  {
    id: "nigersaurus",
    name: "ニゲルサウルス",
    kana: "にげるさうるす",
    scientificName: "Nigersaurus taqueti",
    era: "白亜紀前期",
    region: "アフリカ",
    diet: "草食",
    length: "9.0m",
    weight: "2.0t",
    description: "「掃除機のような口」を持つ不思議な外見の竜脚類。地面の草を効率よく食べるため、頭部が常に下を向くような骨格構造をしていた。",
    bioTraits: [
      { trait: "採食特化", value: "広幅の口", detail: "一度に大量の地表植物を摂取可能" },
      { trait: "軽量化", value: "極限の骨格", detail: "骨の多くが薄く、頭骨は透けて見えるほど" }
    ],
    image: "images/nigersaurus.webp"
  },
  {
    id: "oviraptor",
    name: "オヴィラプトル",
    kana: "おヴぃらぷとる",
    scientificName: "Oviraptor philoceratops",
    era: "白亜紀後期",
    region: "アジア",
    diet: "雑食",
    length: "2.0m",
    weight: "33kg",
    description: "「卵泥棒」を意味する名前だが、実際には自分の卵を抱いて守っていたことが判明した子煩悩な恐竜。歯がなく、強力なくちばしを持っていた。",
    bioTraits: [
      { trait: "育児本能", value: "極めて強い", detail: "卵を抱いたまま化石化した個体が発見" },
      { trait: "嘴の破壊力", value: "強力", detail: "硬い殻や木の実を砕くことができる" }
    ],
    image: "images/oviraptor.webp"
  },
  {
    id: "parasaurolophus",
    name: "パラサウロロフス",
    kana: "ぱらさうろろふす",
    scientificName: "Parasaurolophus walkeri",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "10.0m",
    weight: "3.0t",
    description: "後方に長く伸びたトサカが特徴的な恐竜。このトサカは管楽器のように音を響かせることができ、数キロ先まで声が届いたとされる。",
    bioTraits: [
      { trait: "遠距離通信", value: "最高水準", detail: "長いトサカで独自の音波を発生" },
      { trait: "感知能力", value: "高い", detail: "優れた視覚と聴覚で外敵を察知" }
    ],
    image: "images/parasaurolophus.webp"
  },
  {
    id: "pteranodon",
    name: "プテラノドン",
    kana: "ぷてらのどん",
    scientificName: "Pteranodon longiceps",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "肉食（魚食）",
    length: "翼開長7.0m",
    weight: "20kg",
    description: "最も有名な翼竜の一つ。歯のないくちばしと、頭部後方の長いトサカが特徴。海の上を飛び回り、魚を捕らえて食べていた。",
    bioTraits: [
      { trait: "飛行能力", value: "超長距離", detail: "上昇気流を利用したグライダー飛行" },
      { trait: "捕食技術", value: "魚食特化", detail: "水面の魚をダイビングして捕らえる" }
    ],
    image: "images/pteranodon.webp"
  },
  {
    id: "quetzalcoatlus",
    name: "ケツァルコアトルス",
    kana: "けつぁるこあとるす",
    scientificName: "Quetzalcoatlus northropi",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "肉食",
    length: "翼開長11.0m",
    weight: "200kg",
    description: "史上最大級の空飛ぶ生物。キリンに匹敵する高さがあり、巨大な翼で大陸間を移動した可能性もある。地上でも四肢を使って活発に動けた。",
    bioTraits: [
      { trait: "圧倒的サイズ", value: "空の王者", detail: "軽飛行機に匹敵する翼の広さ" },
      { trait: "地上移動", value: "意外に俊敏", detail: "四足歩行で地上を歩き獲物を探す" }
    ],
    image: "images/quetzalcoatlus.webp"
  },
  {
    id: "rugops",
    name: "ルゴプス",
    kana: "るごぷす",
    scientificName: "Rugops primus",
    era: "白亜紀後期",
    region: "アフリカ",
    diet: "肉食",
    length: "6.0m",
    weight: "750kg",
    description: "「しわのある顔」を意味する名前の通り、頭骨に多くの溝や穴がある肉食恐竜。死肉をあさるスカベンジャーだったという説もある。",
    bioTraits: [
      { trait: "頭部装飾", value: "特徴的", detail: "血管が通る多くの穴があり、ディスプレイ用か" },
      { trait: "食性", value: "スカベンジャー", detail: "死肉を効率よく食べるのに適した構造" }
    ],
    image: "images/rugops.webp"
  },
  {
    id: "utahraptor",
    name: "ユタラプトル",
    kana: "ゆたらぷとる",
    scientificName: "Utahraptor ostrommaysi",
    era: "白亜紀前期",
    region: "北アメリカ",
    diet: "肉食",
    length: "7.0m",
    weight: "500kg",
    description: "ラプトル類の中で最大最強の種。20cmを超える巨大な鉤爪を持ち、自分より大きな恐竜も執拗に攻撃して倒したと考えられている。",
    bioTraits: [
      { trait: "凶器", value: "巨大鉤爪", detail: "足にある20cm以上の鎌状の爪" },
      { trait: "筋力", value: "強靭", detail: "跳躍力と瞬発力に優れる" }
    ],
    image: "images/utahraptor.webp"
  },
  {
    id: "wuerhosaurus",
    name: "ウエルホサウルス",
    kana: "うえほさうるす",
    scientificName: "Wuerhosaurus homheni",
    era: "白亜紀前期",
    region: "アジア",
    diet: "草食",
    length: "7.0m",
    weight: "4.0t",
    description: "中国で発見された、白亜紀まで生き残った珍しい剣竜類。背中の板がステゴサウルスよりも低く、丸みを帯びているのが特徴。",
    bioTraits: [
      { trait: "骨板形状", value: "低重心", detail: "平らで低い板が背中を守る" },
      { trait: "生存戦略", value: "長期間", detail: "白亜紀という激戦の時代を生き抜いた剣竜" }
    ],
    image: "images/wuerhosaurus.webp"
  },
  {
    id: "xenoceratops",
    name: "クセノケラトプス",
    kana: "くせのけらとぷす",
    scientificName: "Xenoceratops foremostensis",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "6.0m",
    weight: "2.0t",
    description: "「異質な角を持つ顔」を意味する、初期の大型角竜類。襟飾りの縁にある巨大なスパイクが、後のトリケラトプスらへと繋がる進化の道筋を示している。",
    bioTraits: [
      { trait: "威嚇力", value: "絶大", detail: "派手で巨大なフリルと角" },
      { trait: "突進力", value: "高い", detail: "重量を活かした重戦車のような突進" }
    ],
    image: "images/xenoceratops.webp"
  },
  {
    id: "yutyrannus",
    name: "ユティラヌス",
    kana: "ゆてぃらぬす",
    scientificName: "Yutyrannus huali",
    era: "白亜紀前期",
    region: "アジア",
    diet: "肉食",
    length: "9.0m",
    weight: "1.4t",
    description: "全身が羽毛に覆われていたことが確認されている、ティラノサウルスの仲間。比較的寒冷な地域に住んでいたため、保温のために羽毛が発達したとされる。",
    bioTraits: [
      { trait: "耐寒性能", value: "羽毛装甲", detail: "全身を覆う長い羽毛で寒さに適応" },
      { trait: "集団狩猟", value: "可能性あり", detail: "複数の個体が同時に発見されることが多い" }
    ],
    image: "images/yutyrannus.webp"
  },
  {
    id: "zuniceratops",
    name: "ズニケラトプス",
    kana: "ずにけらとぷす",
    scientificName: "Zuniceratops christopheri",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "3.5m",
    weight: "150kg",
    description: "目の上に立派な角を持つ、最初期の角竜類の一つ。これより古い角竜には目の上の角がなく、角の進化を解き明かす重要な鍵を握る。",
    bioTraits: [
      { trait: "角の先駆者", value: "眉上の角", detail: "大型角竜に繋がる特徴をいち早く獲得" },
      { trait: "機動力", value: "中型犬並み", detail: "小回りのきく動きで外敵を回避" }
    ],
    image: "images/zuniceratops.webp"
  },
  {
    id: "pachycephalosaurus",
    name: "パキケファロサウルス",
    kana: "ぱきけふぁろさうるす",
    scientificName: "Pachycephalosaurus wyomingensis",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食（または雑食）",
    length: "4.5m",
    weight: "450kg",
    description: "厚さ25cmにも達する分厚い頭骨を持つ恐竜。頭突きで儀礼的な争いや防御を行っていたと考えられており、その独特な形状から非常に人気が高い。",
    bioTraits: [
      { trait: "打撃武器", value: "堅い頭頂部", detail: "衝撃を吸収する特殊な骨構造" },
      { trait: "防御装甲", value: "骨質ノブ", detail: "頭部の周囲に並ぶ刺状の突起" }
    ],
    image: "images/pachycephalosaurus.webp"
  },
  {
    id: "dilophosaurus",
    name: "ディロフォサウルス",
    kana: "でぃろふぉさうるす",
    scientificName: "Dilophosaurus wetherilli",
    era: "ジュラ紀前期",
    region: "北アメリカ",
    diet: "肉食",
    length: "7.0m",
    weight: "400kg",
    description: "頭部にある2本の高く丸いトサカが特徴的な獣脚類。映画等の影響で毒を吐くイメージがあるが、実際にはその証拠はなく、鋭い爪と牙で獲物を捕らえる俊敏なハンターだった。",
    bioTraits: [
      { trait: "ディスプレイ", value: "扇形トサカ", detail: "個体識別や求愛に使用された可能性" },
      { trait: "機動力", value: "高い", detail: "細身の体格を活かしたスピーディな狩り" }
    ],
    image: "images/dilophosaurus.webp"
  },
  {
    id: "apatosaurus",
    name: "アパトサウルス",
    kana: "あぱとさうるす",
    scientificName: "Apatosaurus ajax",
    era: "ジュラ紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "23.0m",
    weight: "20.0t",
    description: "「まどわすトカゲ」を意味する名を持つ超大型竜脚類。かつてはブロントサウルスとして知られていた最も有名な恐竜の一つで、巨大な体と長い鞭のような尾を持つ。",
    bioTraits: [
      { trait: "リーチ", value: "広範囲", detail: "長い首を動かし大量の植物を摂取" },
      { trait: "護身", value: "鞭の尾", detail: "尾を音速で振り回し天敵を威嚇" }
    ],
    image: "images/apatosaurus.webp"
  },
  {
    id: "therizinosaurus",
    name: "テリジノサウルス",
    kana: "てりじのさうるす",
    scientificName: "Therizinosaurus cheloniformis",
    era: "白亜紀後期",
    region: "アジア",
    diet: "草食",
    length: "10.0m",
    weight: "5.0t",
    description: "「大鎌のトカゲ」の名にふさわしい、長さ1メートルにも達する巨大な爪を持つ恐竜。その巨大な爪は攻撃ではなく、植物を引き寄せたり自衛のために使われたと考えられている。",
    bioTraits: [
      { trait: "リーチ", value: "巨大な鎌", detail: "史上最大級のハンドクローを保持" },
      { trait: "特異な外観", value: "羽毛と巨体", detail: "直立に近い姿勢で高い木の葉を食べる" }
    ],
    image: "images/therizinosaurus.webp"
  },
  {
    id: "deinocheirus",
    name: "デイノケイルス",
    kana: "でぃのけいるす",
    scientificName: "Deinocheirus mirificus",
    era: "白亜紀後期",
    region: "アジア",
    diet: "雑食",
    length: "11.0m",
    weight: "6.5t",
    description: "「恐ろしい手」という意味の通り、巨大な前肢のみが長年謎とされていた恐竜。近年全身が判明し、帆のような背中とアヒルのような口を持つ特異な姿だったことが明らかになった。",
    bioTraits: [
      { trait: "汎用性", value: "雑食適応", detail: "魚、植物、昆虫など多様な食事を摂取" },
      { trait: "構造", value: "帆と嘴", detail: "水辺での生活に適した特異な骨格構造" }
    ],
    image: "images/deinocheirus.webp"
  },
  {
    id: "baryonyx",
    name: "バリオニクス",
    kana: "ばりおにくす",
    scientificName: "Baryonyx walkeri",
    era: "白亜紀前期",
    region: "ヨーロッパ",
    diet: "肉食（魚食）",
    length: "9.5m",
    weight: "1.7t",
    description: "ワニのような長い口先と、親指にある30cmもの巨大な鉤爪が特徴。水辺で魚を主食としていたと考えられており、スピノサウルスの近縁種にあたる。",
    bioTraits: [
      { trait: "捕食特化", value: "魚獲りの爪", detail: "大型の魚を引っ掛けて捕らえる鉤爪" },
      { trait: "構造", value: "細長い顎", detail: "90本以上の歯を持つ魚食に適した口" }
    ],
    image: "images/baryonyx.webp"
  },
  {
    id: "argentinosaurus",
    name: "アルゼンチノサウルス",
    kana: "あるぜんちのさうるす",
    scientificName: "Argentinosaurus huinculensis",
    era: "白亜紀後期",
    region: "南アメリカ",
    diet: "草食",
    length: "35.0m",
    weight: "70.0t",
    description: "史上最大の陸生動物の一つとされる超巨大竜脚類。その一歩は地響きを立て、圧倒的な質量こそが最大の防御であった。あまりの巨大さゆえに天敵はほぼ存在しなかった。",
    bioTraits: [
      { trait: "質量", value: "地上最強", detail: "他の大型肉食恐竜を圧倒する巨体" },
      { trait: "構造", value: "強靭な四肢", detail: "数十トンの体重を支えるための柱のような脚" }
    ],
    image: "images/argentinosaurus.webp"
  },
  {
    id: "styracosaurus",
    name: "スティラコサウルス",
    kana: "すてぃらこさうるす",
    scientificName: "Styracosaurus albertensis",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "5.5m",
    weight: "2.5t",
    description: "鼻の上の巨大な角と、襟飾りに並ぶ6本以上の長いトゲが特徴。敵に対する威嚇と防御において、角竜類の中でも極めて派手で強力な装備を持っていた。",
    bioTraits: [
      { trait: "威嚇力", value: "刺々しいフリル", detail: "捕食者に襲われるリスクを軽減する装飾" },
      { trait: "攻撃", value: "長大な鼻角", detail: "一撃で相手を仕留める貫通力" }
    ],
    image: "images/styracosaurus.webp"
  },
  {
    id: "gallimimus",
    name: "ガリミムス",
    kana: "がりみむす",
    scientificName: "Gallimimus bullatus",
    era: "白亜紀後期",
    region: "アジア",
    diet: "雑食",
    length: "7.0m",
    weight: "250kg",
    description: "「鶏もどき」を意味する、ダチョウのような姿をした恐竜。中型バイク並みのスピードで走ることができたとされ、翼のような前肢と歯のない嘴を持つ。",
    bioTraits: [
      { trait: "速力", value: "最高クラス", detail: "時速50〜60kmでの高速移動が可能" },
      { trait: "感覚", value: "高度な視覚", detail: "広い視野で周囲の危険を素早く察知" }
    ],
    image: "images/gallimimus.webp"
  },
  {
    id: "archaeopteryx",
    name: "アーケオプテリクス",
    kana: "あーけおぷてりくす",
    scientificName: "Archaeopteryx lithographica",
    era: "ジュラ紀後期",
    region: "ヨーロッパ",
    diet: "肉食（昆虫食）",
    length: "0.5m",
    weight: "0.5kg",
    description: "「始祖鳥」として有名な、恐竜と鳥類の中間に位置する重要種。羽毛はあるが、鳥と異なり口には歯があり、翼には爪、そして長い骨質の尾を持っていた。",
    bioTraits: [
      { trait: "進化の繋ぎ目", value: "羽毛と爬虫類質", detail: "滑空と樹上生活への適応" },
      { trait: "構造", value: "翼の鉤爪", detail: "木を登るために発達した指先の爪" }
    ],
    image: "images/archaeopteryx.webp"
  },
  {
    id: "fukuiraptor",
    name: "フクイラプトル",
    kana: "ふくいらぷとる",
    scientificName: "Fukuiraptor kitadaniensis",
    era: "白亜紀前期",
    region: "日本（福井県）",
    diet: "肉食",
    length: "4.2m",
    weight: "300kg",
    description: "日本で初めて全身骨格が復元された肉食恐竜。アロサウルスに近い仲間と考えられており、鋭い鉤爪を武器に狩りをしていた。",
    bioTraits: [
      { trait: "機動力", value: "高い", detail: "中型獣脚類特有の軽快な動き" },
      { trait: "武器", value: "鋭い爪", detail: "前肢の発達した鉤爪で獲物を捕らえる" }
    ],
    image: "images/fukuiraptor.webp"
  },
  {
    id: "futabasaurus",
    name: "フタバサウルス",
    kana: "ふたばさうるす",
    scientificName: "Futabasaurus suzukii",
    era: "白亜紀後期",
    region: "日本（福島県）",
    diet: "肉食（魚食）",
    length: "7.0m",
    weight: "3.0t",
    description: "福島県で発見された有名な首長竜。長い首と4つのヒレを使い、太古の日本近海を泳いでいた。",
    bioTraits: [
      { trait: "潜水能力", value: "優秀", detail: "深い海での魚獲りに適した能力" },
      { trait: "柔軟性", value: "高い", detail: "長い首を自在に動かして獲物を追う" }
    ],
    image: "images/futabasaurus.webp"
  },
  {
    id: "kamuyasaurus",
    name: "カムイサウルス",
    kana: "かむいさうるす",
    scientificName: "Kamuyasaurus japonicus",
    era: "白亜紀後期",
    region: "日本（北海道）",
    diet: "草食",
    length: "8.0m",
    weight: "4.5t",
    description: "北海道むかわ町で発見された、通称「むかわ竜」。日本列島で発見された恐竜として最大級の全身骨格を誇るハドロサウルス類。",
    bioTraits: [
      { trait: "集団行動", value: "可能性あり", detail: "群れで行動し外敵から身を守る" },
      { trait: "適応力", value: "高い", detail: "沿岸部などの過酷な環境にも適応" }
    ],
    image: "images/kamuyasaurus.webp"
  },
  {
    id: "fukuititan",
    name: "フクイティタン",
    kana: "ふくいてぃたん",
    scientificName: "Fukuititan nipponensis",
    era: "白亜紀前期",
    region: "日本（福井県）",
    diet: "草食",
    length: "10.0m",
    weight: "10.0t",
    description: "福井県で発見された大型の竜脚類。日本で初めて学名がついた竜脚類であり、当時の日本の生態系を支える巨体であった。",
    bioTraits: [
      { trait: "巨大質量", value: "圧倒的", detail: "日本国内では最大級の体躯" },
      { trait: "採食範囲", value: "広い", detail: "長い首を利用して高い場所の植物を摂取" }
    ],
    image: "images/fukuititan.webp"
  },
  {
    id: "fukuivenator",
    name: "フクイベナトル",
    kana: "ふくいべなとる",
    scientificName: "Fukuivenator paradoxus",
    era: "白亜紀前期",
    region: "日本（福井県）",
    diet: "雑食",
    length: "2.5m",
    weight: "25kg",
    description: "「奇妙な福井のハンター」を意味する名を持つ。鳥への進化の過程を示す特異な骨格を持ち、食性も多岐にわたっていたと考えられている。",
    bioTraits: [
      { trait: "進化の鍵", value: "特異構造", detail: "鳥類に近い耳の構造などを持つ" },
      { trait: "汎用性", value: "高い", detail: "多様な環境で生き抜く雑食性" }
    ],
    image: "images/fukuivenator.webp"
  },
  {
    id: "koshisaurus",
    name: "コシサウルス",
    kana: "こしさうるす",
    scientificName: "Koshisaurus katsuyama",
    era: "白亜紀前期",
    region: "日本（福井県）",
    diet: "草食",
    length: "3.0m",
    weight: "500kg",
    description: "福井県勝山市で発見された小型のイグアノドン類。フクイサウルスよりも原始的な特徴を持ち、初期の鳥脚類の多様性を示している。",
    bioTraits: [
      { trait: "警戒心", value: "強い", detail: "小型ゆえに鋭い感覚で天敵を察知" },
      { trait: "機動性", value: "中程度", detail: "二足歩行での迅速な退避が可能" }
    ],
    image: "images/koshisaurus.webp"
  },
  {
    id: "tambatitan",
    name: "タンバティタニス",
    kana: "たんばてぃたにす",
    scientificName: "Tambatitanis amicitiae",
    era: "白亜紀前期",
    region: "日本（兵庫県）",
    diet: "草食",
    length: "15.0m",
    weight: "20.0t",
    description: "兵庫県丹波市で発見された「丹波竜」。独特な尾の骨の形状を持ち、国内発見の恐竜としては史上最大級のサイズを誇る。",
    bioTraits: [
      { trait: "地響き", value: "強烈", detail: "その巨体が一歩歩くごとに周囲が震えた" },
      { trait: "防御", value: "サイズ依存", detail: "大きさそのものが肉食恐竜への威嚇" }
    ],
    image: "images/tambatitan.webp"
  },
  {
    id: "yamatodraco",
    name: "ヤマトドラコ",
    kana: "やまとどらこ",
    scientificName: "Yamatodraco izanamii",
    era: "白亜紀後期",
    region: "日本（兵庫県・淡路島）",
    diet: "草食",
    length: "7.5m",
    weight: "3.0t",
    description: "淡路島で発見されたハドロサウルス類。白亜紀末期まで生き残った「生きた化石」のような存在だった可能性がある。",
    bioTraits: [
      { trait: "生存戦略", value: "長期間", detail: "原始的な特徴を残したまま進化し続けた" },
      { trait: "採食能力", value: "優秀", detail: "沿岸の多様な植物を効率よく摂取" }
    ],
    image: "images/yamatodraco.webp"
  },
  {
    id: "paralitherizinosaurus",
    name: "パラリテリジノサウルス",
    kana: "ぱらりてりじのさうるす",
    scientificName: "Paralitherizinosaurus japonicus",
    era: "白亜紀後期",
    region: "日本（北海道）",
    diet: "草食",
    length: "8.5m",
    weight: "4.0t",
    description: "北海道で発見されたテリジノサウルス類。非常に長い爪を持ち、護身や植物を引き寄せるために使っていたと考えられている。",
    bioTraits: [
      { trait: "巨大武器", value: "鎌状の爪", detail: "護身や採食に用いる長大な爪" },
      { trait: "威嚇", value: "効果的", detail: "その異様な姿で天敵を遠ざける" }
    ],
    image: "images/paralitherizinosaurus.webp"
  },
  {
    id: "nipponosaurus",
    name: "ニッポノサウルス",
    kana: "にっぽのさうるす",
    scientificName: "Nipponosaurus sachalinensis",
    era: "白亜紀後期",
    region: "日本（当時は樺太）",
    diet: "草食",
    length: "7.6m",
    weight: "2.5t",
    description: "日本人が初めて本格的に研究した恐竜。ハドロサウルス類の子供の化石として知られ、日本の恐竜研究の礎となった象徴的な種。",
    bioTraits: [
      { trait: "歴史的価値", value: "最高位", detail: "日本の恐竜研究をスタートさせた存在" },
      { trait: "成長段階", value: "発育中", detail: "発見されたのは亜成体とされている" }
    ],
    image: "images/nipponosaurus.webp"
  },
  {
    id: "wakinosaurus",
    name: "ワキノサウルス",
    kana: "わきのさうるす",
    scientificName: "Wakinosaurus satoheii",
    era: "白亜紀前期",
    region: "日本（福岡県）",
    diet: "肉食",
    length: "6.0m",
    weight: "1.0t",
    description: "福岡県で発見された大型の獣脚類。九州を闊歩していた捕食者で、当時の生態系の上位に位置していたと考えられる。",
    bioTraits: [
      { trait: "牙", value: "鋭利", detail: "肉を切り裂くのに適した鋸歯状の歯" },
      { trait: "追跡", value: "粘り強い", detail: "発達した脚力で獲物を追い詰める" }
    ],
    image: "images/wakinosaurus.webp"
  },
  {
    id: "sanchuryu",
    name: "サンチュウリュウ",
    kana: "さんちゅうりゅう",
    scientificName: "Sanchuryu (Unnamed Taxon)",
    era: "白亜紀前期",
    region: "日本（群馬県）",
    diet: "雑食",
    length: "2.5m",
    weight: "30kg",
    description: "群馬県で発見された、ダチョウに似た姿の恐竜。非常に素早く走ることができ、雑食性で多様な環境に適応していた。",
    bioTraits: [
       { trait: "速力", value: "最高クラス", detail: "二足歩行での極めて高い走破性" },
       { trait: "生存戦略", value: "雑食", detail: "昆虫から植物まで幅広く摂取" }
    ],
    image: "images/sanchuryu.webp"
  },
  {
    id: "deinonychus",
    name: "デイノニクス",
    kana: "でいのにくす",
    scientificName: "Deinonychus antirrhopus",
    era: "白亜紀前期",
    region: "北アメリカ",
    diet: "肉食",
    length: "3.4m",
    weight: "73kg",
    description: "「恐ろしい鉤爪」を意味する名を持つ。足にある巨大な鎌状の爪を使い、獲物を執拗に攻撃した。この恐竜の発見により、恐竜が活発な温血動物であったという説が広まった。",
    bioTraits: [
      { trait: "武器", value: "鎌状の鉤爪", detail: "足の第2指にある巨大な爪で致命傷を与える" },
      { trait: "機動性", value: "高い", detail: "群れで行動し、俊敏な動きで獲物を追い詰める" }
    ],
    image: "images/deinonychus.webp"
  },
  {
    id: "ceratosaurus",
    name: "ケラトサウルス",
    kana: "けらとさうるす",
    scientificName: "Ceratosaurus nasicornis",
    era: "ジュラ紀後期",
    region: "北アメリカ・ヨーロッパ",
    diet: "肉食",
    length: "6.0m",
    weight: "700kg",
    description: "鼻の上に大きな角を持つ独特な外見の獣脚類。アロサウルスと同時代に生きていたが、より水辺に近い環境を好んでいた可能性が示唆されている。",
    bioTraits: [
      { trait: "突進", value: "角による一撃", detail: "鼻上の角はディスプレイや儀礼的闘争に使われたか" },
      { trait: "捕食", value: "水辺のハンター", detail: "魚や水生生物も捕食していた可能性がある" }
    ],
    image: "images/ceratosaurus.webp"
  },
  {
    id: "tarbosaurus",
    name: "タルボサウルス",
    kana: "たるぼさうるす",
    scientificName: "Tarbosaurus bataar",
    era: "白亜紀後期",
    region: "アジア（モンゴル・中国）",
    diet: "肉食",
    length: "11.0m",
    weight: "5.0t",
    description: "「恐怖させるトカゲ」という意味のアジア最大級のティラノサウルス類。北米のティラノサウルスと極めて近縁だが、前肢はさらに小さく進化していた。",
    bioTraits: [
      { trait: "咬合力", value: "最強クラス", detail: "巨大な竜脚類をも倒す顎の力" },
      { trait: "感知", value: "高度な聴覚", detail: "獲物のわずかな動きを音で察知する" }
    ],
    image: "images/tarbosaurus.webp"
  },
  {
    id: "acrocanthosaurus",
    name: "アクロカントサウルス",
    kana: "あくろかんとさうるす",
    scientificName: "Acrocanthosaurus atokensis",
    era: "白亜紀前期",
    region: "北アメリカ",
    diet: "肉食",
    length: "11.5m",
    weight: "6.0t",
    description: "「高い棘を持つトカゲ」の名の通り、背中に沿って高く伸びた神経棘を持つ。当時の北米における最大級の捕食者であり、大型の竜脚類も襲った形跡がある。",
    bioTraits: [
      { trait: "筋力", value: "強靭な背筋", detail: "背中の突起は獲物を支える筋肉の付着部だったか" },
      { trait: "追跡", value: "持久力", detail: "大型の獲物を長時間追跡することが可能" }
    ],
    image: "images/acrocanthosaurus.webp"
  },
  {
    id: "majungasaurus",
    name: "マジュンガサウルス",
    kana: "まじゅんがさうるす",
    scientificName: "Majungasaurus crenatissimus",
    era: "白亜紀後期",
    region: "アフリカ（マダガスカル）",
    diet: "肉食",
    length: "7.0m",
    weight: "1.1t",
    description: "マダガスカルの島で独自に進化したアベリサウルス類。短い鼻面と分厚い頭骨、そして共食いの痕跡が発見されていることで知られる異色の捕食者。",
    bioTraits: [
      { trait: "防御", value: "強固な頭部", detail: "獲物への突進や仲間との争いに耐える頭骨" },
      { trait: "知能", value: "中程度", detail: "孤立した環境での生存に適した能力" }
    ],
    image: "images/majungasaurus.webp"
  },
  {
    id: "suchomimus",
    name: "スコミムス",
    kana: "すこみむす",
    scientificName: "Suchomimus tenerensis",
    era: "白亜紀前期",
    region: "アフリカ（ニジェール）",
    diet: "肉食（魚食）",
    length: "11.0m",
    weight: "3.5t",
    description: "「ワニもどき」を意味する、スピノサウルスに近い系統の恐竜。川辺で魚を主食としていたと考えられ、長い口と前肢の巨大な爪を持つ。",
    bioTraits: [
      { trait: "捕食", value: "魚獲りの天才", detail: "ワニのような長い顎と滑りにくい歯" },
      { trait: "武器", value: "親指の巨大爪", detail: "水中の獲物を引っ掛けて捕らえる" }
    ],
    image: "images/suchomimus.webp"
  },
  {
    id: "gigantoraptor",
    name: "ギガントラプトル",
    kana: "ぎがんとらぷとる",
    scientificName: "Gigantoraptor erlianensis",
    era: "白亜紀後期",
    region: "アジア（中国）",
    diet: "雑食",
    length: "8.0m",
    weight: "2.0t",
    description: "オヴィラプトルの仲間としては桁外れに巨大で、鳥のような嘴と羽毛を持っていた。その巨体にもかかわらず、敏捷な動きができたと考えられている。",
    bioTraits: [
      { trait: "存在感", value: "威圧的", detail: "鳥のような姿でありながら圧倒的な巨体" },
      { trait: "汎用", value: "高度な雑食性", detail: "様々な環境で食料を確保できる能力" }
    ],
    image: "images/gigantoraptor.webp"
  },
  {
    id: "monolophosaurus",
    name: "モノロフォサウルス",
    kana: "ものろふぉさうるす",
    scientificName: "Monolophosaurus jiangi",
    era: "ジュラ紀中期",
    region: "アジア（中国）",
    diet: "肉食",
    length: "5.0m",
    weight: "700kg",
    description: "鼻先から目の上にかけて一本の独特なトサカを持つ。「一つのトサカを持つトカゲ」という意味で、初期の堅頭竜に近い特徴も見られる謎多き恐竜。",
    bioTraits: [
      { trait: "威嚇", value: "ディスプレイ", detail: "トサカは視覚的なコミュニケーションに使われた" },
      { trait: "反射", value: "鋭い攻撃", detail: "中型獣脚類らしい迅速な狩り" }
    ],
    image: "images/monolophosaurus.webp"
  },
  {
    id: "abelisaurus",
    name: "アベリサウルス",
    kana: "あべりさうるす",
    scientificName: "Abelisaurus comahuensis",
    era: "白亜紀後期",
    region: "南アメリカ（アルゼンチン）",
    diet: "肉食",
    length: "7.5m",
    weight: "1.5t",
    description: "南米を代表する肉食恐竜の一つ。アベリサウルス科の模式標本であり、非常にがっしりとした頭骨を持つことが特徴。短いが強力な顎で獲物を屠る。",
    bioTraits: [
      { trait: "攻撃", value: "強力な顎", detail: "一噛みで獲物の肉を大きく削ぎ落とす" },
      { trait: "探索", value: "優れた感知", detail: "広い範囲をパトロールして獲物を探す" }
    ],
    image: "images/abelisaurus.webp"
  },
  {
    id: "compsognathus",
    name: "コンプソグナトゥス",
    kana: "こんぷそぐなとぅす",
    scientificName: "Compsognathus longipes",
    era: "ジュラ紀後期",
    region: "ヨーロッパ（ドイツ・フランス）",
    diet: "肉食",
    length: "1.0m",
    weight: "3kg",
    description: "小型恐竜の代表格。「かわいい顎」を意味するが、小型のトカゲや昆虫を素早く捕らえる鋭いハンターだった。始祖鳥と同じ環境に生息していた。",
    bioTraits: [
      { trait: "敏捷性", value: "最高クラス", detail: "小回りのきく動きで外敵から逃げ切る" },
      { trait: "連携", value: "集団", detail: "小柄ながら集団で行動し、効率的に狩る" }
    ],
    image: "images/compsognathus.webp"
  },
  {
    id: "guanlong",
    name: "グアンロン",
    kana: "ぐあんろん",
    scientificName: "Guanlong wucaii",
    era: "ジュラ紀後期",
    region: "アジア（中国）",
    diet: "肉食",
    length: "3.0m",
    weight: "75kg",
    description: "「五彩の冠を戴く竜」という意味。ティラノサウルスの遠い祖先であり、頭部に非常に薄く壊れやすいトサカを持っていたのが特徴。",
    bioTraits: [
      { trait: "進化", value: "祖先の資質", detail: "後のティラノサウルスに繋がる強力な脚部" },
      { trait: "特性", value: "トサカの誇示", detail: "派手なトサカで自らの存在をアピールしたか" }
    ],
    image: "images/guanlong.webp"
  },
  {
    id: "cryolophosaurus",
    name: "クリオロフォサウルス",
    kana: "くりおろふぉさうるす",
    scientificName: "Cryolophosaurus ellioti",
    era: "ジュラ紀前期",
    region: "南極大陸",
    diet: "肉食",
    length: "6.5m",
    weight: "465kg",
    description: "南極で発見された「氷のトサカを持つトカゲ」。当時は温暖だった南極の森に生息しており、エルビス・プレスリーのような髪型に見えるトサカが有名。",
    bioTraits: [
      { trait: "環境適応", value: "高い", detail: "季節変動のある高緯度地域で活動できた" },
      { trait: "武器", value: "斬撃", detail: "鋭い牙で獲物を素早く仕留める" }
    ],
    image: "images/cryolophosaurus.webp"
  },
  {
    id: "eoraptor",
    name: "エオラプトル",
    kana: "えおらぷとる",
    scientificName: "Eoraptor lunensis",
    era: "三畳紀後期",
    region: "南アメリカ（アルゼンチン）",
    diet: "雑食",
    length: "1.0m",
    weight: "10kg",
    description: "「夜明けの泥棒」を意味する、世界最古の恐竜の一つ。すべての恐竜の共通祖先に近い姿をしており、そのシンプルながら完成された体格が繁栄の鍵となった。",
    bioTraits: [
      { trait: "原初", value: "バランス型", detail: "あらゆる環境に順応できる身体能力" },
      { trait: "生存", value: "回避特化", detail: "大型の爬虫類から逃げ抜く俊敏さ" }
    ],
    image: "images/eoraptor.webp"
  },
  {
    id: "herrerasaurus",
    name: "ヘレラサウルス",
    kana: "へれらさうるす",
    scientificName: "Herrerasaurus ischigualastensis",
    era: "三畳紀後期",
    region: "南アメリカ（アルゼンチン）",
    diet: "肉食",
    length: "4.0m",
    weight: "210kg",
    description: "最初期にして最大級の肉食恐竜の一つ。未だ恐竜が世界の支配者ではなかった時代において、既に強力な捕食者としての圧倒的な資質を誇っていた。",
    bioTraits: [
      { trait: "打撃", value: "強力な四肢", detail: "大きな足爪を活かした力強い一撃" },
      { trait: "不屈", value: "闘争心", detail: "自分より大きな競合相手とも渡り合った" }
    ],
    image: "images/herrerasaurus.webp"
  },
  {
    id: "albertosaurus",
    name: "アルバートサウルス",
    kana: "あるばーとさうるす",
    scientificName: "Albertosaurus sarcophagus",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "肉食",
    length: "9.0m",
    weight: "2.5t",
    description: "ティラノサウルス科の中では細身で脚が長く、機動力に優れていたと考えられている。カナダのアルバータ州で多くの化石が発見されている。",
    bioTraits: [
      { trait: "機動力", value: "高い", detail: "ティラノサウルスより高速で走行可能だった" },
      { trait: "集団性", value: "可能性あり", detail: "多数の個体が一度に発見された例がある" }
    ],
    image: "images/albertosaurus.webp"
  },
  {
    id: "daspletosaurus",
    name: "ダスプレトサウルス",
    kana: "だすぷれとさうるす",
    scientificName: "Daspletosaurus torosus",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "肉食",
    length: "9.0m",
    weight: "3.0t",
    description: "「恐ろしいトカゲ」を意味する名を持ち、ティラノサウルス科の中でも非常に強力な顎と頑丈な体格を持っていた。",
    bioTraits: [
      { trait: "咬合力", value: "強力", detail: "骨を噛み砕くのに適した頑丈な頭骨" },
      { trait: "攻撃性", value: "高い", detail: "同地域に生息した角竜類などを捕食" }
    ],
    image: "images/daspletosaurus.webp"
  },
  {
    id: "gorgosaurus",
    name: "ゴルゴサウルス",
    kana: "ごるごさうるす",
    scientificName: "Gorgosaurus libratus",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "肉食",
    length: "8.5m",
    weight: "2.5t",
    description: "ダスプレトサウルスと同時期に生息していたが、より軽量で俊敏な捕食者だったと考えられている。当時の生態系で主要な役割を果たした。",
    bioTraits: [
      { trait: "狩りのスタイル", value: "追跡型", detail: "俊敏さを活かして獲物を追い詰める" },
      { trait: "成長速度", value: "急速", detail: "短期間で成体に達する成長戦略" }
    ],
    image: "images/gorgosaurus.webp"
  },
  {
    id: "coelophysis",
    name: "コエロフィシス",
    kana: "こえろふぃしす",
    scientificName: "Coelophysis bauri",
    era: "三畳紀後期",
    region: "北アメリカ",
    diet: "肉食",
    length: "3.0m",
    weight: "30kg",
    description: "初期の獣脚類の一つで、中空の骨を持つ軽量な体格が特徴。集団で行動し、小型の爬虫類や昆虫を捕らえていた。",
    bioTraits: [
      { trait: "骨格構造", value: "超軽量", detail: "中空の骨による優れた敏捷性" },
      { trait: "適応力", value: "高い", detail: "乾燥した三畳紀の環境に広く適応" }
    ],
    image: "images/coelophysis.webp"
  },
  {
    id: "microraptor",
    name: "ミクロラプトル",
    kana: "みくらぷとる",
    scientificName: "Microraptor zhaoianus",
    era: "白亜紀前期",
    region: "アジア",
    diet: "肉食（昆虫・小型脊椎動物）",
    length: "0.8m",
    weight: "1kg",
    description: "前肢と後肢の両方に長い羽毛を持ち、4枚の翼で滑空していたと考えられる。恐竜から鳥類への進化を解き明かす重要な種。",
    bioTraits: [
      { trait: "飛行能力", value: "滑空", detail: "木から木へと飛び移る能力" },
      { trait: "視覚", value: "夜行性？", detail: "大きな眼窩から夜間の活動も推測される" }
    ],
    image: "images/microraptor.webp"
  },
  {
    id: "concavenator",
    name: "コンカベナトル",
    kana: "こんかべなとる",
    scientificName: "Concavenator corcovatus",
    era: "白亜紀前期",
    region: "ヨーロッパ（スペイン）",
    diet: "肉食",
    length: "6.0m",
    weight: "400kg",
    description: "腰の近くにある2本の椎骨が突き出し、独特のコブを形成しているのが最大の特徴。前肢に羽毛の痕跡が見つかっている。",
    bioTraits: [
      { trait: "身体的特徴", value: "背中のコブ", detail: "体温調節やディスプレイの役割説がある" },
      { trait: "皮膚構造", value: "羽毛の萌芽", detail: "前肢に羽軸隆起の形跡がある" }
    ],
    image: "images/concavenator.webp"
  },
  {
    id: "megalosaurus",
    name: "メガロサウルス",
    kana: "めがろさうるす",
    scientificName: "Megalosaurus bucklandii",
    era: "ジュラ紀中期",
    region: "ヨーロッパ（イギリス）",
    diet: "肉食",
    length: "9.0m",
    weight: "1.0t",
    description: "世界で最初に名前が付けられた恐竜として有名。ジュラ紀中期における強力な捕食者で、当時のイギリス周辺の頂点に立っていた。",
    bioTraits: [
      { trait: "歴史的価値", value: "最初", detail: "1824年に恐竜として初めて正式に記載" },
      { trait: "牙の構造", value: "鋸歯状", detail: "肉を切り裂くのに適した鋭い歯" }
    ],
    image: "images/megalosaurus.webp"
  },
  {
    id: "mapusaurus",
    name: "マップサウルス",
    kana: "まっぷさうるす",
    scientificName: "Mapusaurus roseae",
    era: "白亜紀後期",
    region: "南アメリカ",
    diet: "肉食",
    length: "12.2m",
    weight: "5.0t",
    description: "ギガノトサウルスに近い巨大なカルカロドントサウルス科。多数の個体が一緒に発見され、集団で超大型竜脚類を狩っていた可能性がある。",
    bioTraits: [
      { trait: "狩猟戦略", value: "群れ", detail: "集団でアルゼンチノサウルスに対抗した説" },
      { trait: "攻撃力", value: "致命的", detail: "薄く鋭い歯による深い傷を与える攻撃" }
    ],
    image: "images/mapusaurus.webp"
  },
  {
    id: "amargasaurus",
    name: "アマルガサウルス",
    kana: "あまるがさうるす",
    scientificName: "Amargasaurus cazaui",
    era: "白亜紀前期",
    region: "南アメリカ",
    diet: "草食",
    length: "10.0m",
    weight: "2.6t",
    description: "首から背中にかけて2列の長い棘が伸びているのが特徴。竜脚類の中では比較的小型だが、その姿は非常に独特である。",
    bioTraits: [
      { trait: "防御武具", value: "首の棘", detail: "捕食者に対する防御や威嚇に使用した" },
      { trait: "帆の存在", value: "可能性", detail: "棘の間に皮膚の帆が張られていた説がある" }
    ],
    image: "images/amargasaurus.webp"
  },
  {
    id: "camarasaurus",
    name: "カマラサウルス",
    kana: "かまらさうるす",
    scientificName: "Camarasaurus supremus",
    era: "ジュラ紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "18.0m",
    weight: "20.0t",
    description: "北アメリカで最も一般的な竜脚類の一つ。頭骨に大きな空洞（室）があり、軽量化されていた。スプーン状の非常に頑丈な歯が特徴。",
    bioTraits: [
      { trait: "採食能力", value: "広範囲", detail: "頑丈な歯で硬い植物も食べることができた" },
      { trait: "群れの行動", value: "一般的", detail: "大規模な群れで移動していた証拠がある" }
    ],
    image: "images/camarasaurus.webp"
  },
  {
    id: "mamenchisaurus",
    name: "マメンチサウルス",
    kana: "まめんちさうるす",
    scientificName: "Mamenchisaurus hochuanensis",
    era: "ジュラ紀後期",
    region: "アジア（中国）",
    diet: "草食",
    length: "22.0m",
    weight: "27.0t",
    description: "体長の半分近くを占めるほど異常に長い首が最大の特徴。首の骨（頚椎）の数は最大19個に達し、あらゆる動物の中で最も多い部類に入る。",
    bioTraits: [
      { trait: "首の長さ", value: "驚異的", detail: "10メートルを超える驚異的なリーチ" },
      { trait: "構造", value: "軽量化", detail: "複雑な骨の構造により長い首を支えた" }
    ],
    image: "images/mamenchisaurus.webp"
  },
  {
    id: "saltasaurus",
    name: "サルタサウルス",
    kana: "さるたさうるす",
    scientificName: "Saltasaurus loricatus",
    era: "白亜紀後期",
    region: "南アメリカ",
    diet: "草食",
    length: "12.0m",
    weight: "7.0t",
    description: "竜脚類として初めて、背中に骨質の装甲板（オステオダーム）を持つことが確認された。これにより、巨大さに寄らない防御能力を証明した。",
    bioTraits: [
      { trait: "防御力", value: "装甲板", detail: "皮膚に埋め込まれた無数の骨質の塊" },
      { trait: "進化の特異点", value: "装甲化", detail: "竜脚類の新たな生存戦略を示した" }
    ],
    image: "images/saltasaurus.webp"
  },
  {
    id: "shunosaurus",
    name: "シュノサウルス",
    kana: "しゅのさうるす",
    scientificName: "Shunosaurus lii",
    era: "ジュラ紀中期",
    region: "アジア（中国）",
    diet: "草食",
    length: "10.0m",
    weight: "3.0t",
    description: "竜脚類としては珍しく、尾の先端に2対のスパイクを備えた重厚な骨の棍棒（クラブ）を持っていた。この武器で捕食者を撃退したとされる。",
    bioTraits: [
      { trait: "反撃兵器", value: "尾の棍棒", detail: "アンキロサウルスに似た防御用クラブ" },
      { trait: "歯の形状", value: "円筒状", detail: "植物をすりつぶすのに適した構造" }
    ],
    image: "images/shunosaurus.webp"
  },
  {
    id: "patagotitan",
    name: "パタゴティタン",
    kana: "ぱたごてぃたん",
    scientificName: "Patagotitan mayorum",
    era: "白亜紀中期",
    region: "南アメリカ（アルゼンチン）",
    diet: "草食",
    length: "37.0m",
    weight: "70.0t",
    description: "史上最大級の陸棲動物。パタゴニアで発見されたこの巨人は、その圧倒的な質量により、成体になれば天敵はほぼ存在しなかった。",
    bioTraits: [
      { trait: "巨大質量", value: "規格外", detail: "ジェット機に匹敵する圧倒的な重さ" },
      { trait: "心肺能力", value: "強靭", detail: "巨大な体を維持するための強力な循環システム" }
    ],
    image: "images/patagotitan.webp"
  },
  {
    id: "puertasaurus",
    name: "プエルタサウルス",
    kana: "ぷえるたさうるす",
    scientificName: "Puertasaurus reuili",
    era: "白亜紀後期",
    region: "南アメリカ",
    diet: "草食",
    length: "30.0m",
    weight: "50.0t",
    description: "アルゼンチノサウルスに匹敵する超巨大竜脚類。非常に広い胸郭を持っていたと考えられており、世界で最も幅の広い恐竜の一つとされる。",
    bioTraits: [
      { trait: "胸郭幅", value: "世界最大級", detail: "約5メートルに達する驚異的な胴体の幅" },
      { trait: "生存戦略", value: "超巨体", detail: "サイズそのものを最大の防御とした" }
    ],
    image: "images/puertasaurus.webp"
  },
  {
    id: "vulcanodon",
    name: "ウルカノドン",
    kana: "うるかのどん",
    scientificName: "Vulcanodon karibaensis",
    era: "ジュラ紀前期",
    region: "アフリカ",
    diet: "草食",
    length: "6.5m",
    weight: "3.5t",
    description: "初期の竜脚類の一種。まだ比較的小型だが、竜脚類特有の長い首と頑丈な四肢への進化の過渡期を示している貴重な種。",
    bioTraits: [
      { trait: "進化的位置", value: "過渡期", detail: "古竜脚類から真竜脚類への橋渡し" },
      { trait: "足の構造", value: "原始的", detail: "後の竜脚類とは異なる爪の構造" }
    ],
    image: "images/vulcanodon.webp"
  },
  {
    id: "giraffatitan",
    name: "ギラファティタン",
    kana: "ぎらふぁてぃたん",
    scientificName: "Giraffatitan brancai",
    era: "ジュラ紀後期",
    region: "アフリカ",
    diet: "草食",
    length: "25.0m",
    weight: "30.0t",
    description: "「キリンの巨人」を意味し、前肢が後肢より長く、首が垂直に近い角度まで高く伸びていた。高所の木の葉を食べるのに特化していた。",
    bioTraits: [
      { trait: "リーチ", value: "垂直上昇", detail: "地上10メートル以上の高さに到達可能" },
      { trait: "心臓", value: "超強力", detail: "頭部まで血液を押し上げるための巨大な心臓" }
    ],
    image: "images/giraffatitan.webp"
  },
  {
    id: "barosaurus",
    name: "バロサウルス",
    kana: "ばろさうるす",
    scientificName: "Barosaurus lentus",
    era: "ジュラ紀後期",
    region: "北アメリカ・アフリカ",
    diet: "草食",
    length: "26.0m",
    weight: "20.0t",
    description: "ディプロドクスに似ているが、首がさらに長く、尾は少し短い。最近の研究では、後肢だけで立ち上がり高い木の葉を食べたと言われる。",
    bioTraits: [
      { trait: "二足立ち", value: "可能性あり", detail: "後肢と強力な尾でバランスを取り直立" },
      { trait: "首の骨", value: "延長", detail: "個々の頸椎が非常に長く伸びている" }
    ],
    image: "images/barosaurus.webp"
  },
  {
    id: "jobaria",
    name: "ジョバリア",
    kana: "じょばりあ",
    scientificName: "Jobaria tiguidensis",
    era: "白亜紀前期",
    region: "アフリカ（ニジェール）",
    diet: "草食",
    length: "18.0m",
    weight: "16.0t",
    description: "竜脚類としては比較的原始的な特徴を多く残している。発見された骨格の保存状態が非常に良く、その生態の詳細が判明している。",
    bioTraits: [
      { trait: "原始的な特徴", value: "スプーン状の歯", detail: "進化した竜脚類とは異なる歯の形状" },
      { trait: "骨格の保存", value: "ほぼ全身", detail: "95%近くの骨格が揃った状態で発見された" }
    ],
    image: "images/jobaria.webp"
  },
  {
    id: "alamosaurus",
    name: "アラモサウルス",
    kana: "あらもさうるす",
    scientificName: "Alamosaurus sanjuanensis",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "30.0m",
    weight: "73.0t",
    description: "北アメリカで発見された数少ない竜脚類の一つ。ティラノサウルと同じ時代を生きた巨大な恐竜で、白亜紀末期の生態系における最大の草食恐竜の一つだった。",
    bioTraits: [
      { trait: "巨大なサイズ", value: "超大型", detail: "北米大陸における白亜紀後期の最大級の恐竜" },
      { trait: "分布の謎", value: "南から北へ", detail: "南米系の系統が北米へ進出したと考えられている" }
    ],
    image: "images/alamosaurus.webp"
  },
  {
    id: "ampelosaurus",
    name: "アンペロサウルス",
    kana: "あんぺろさうるす",
    scientificName: "Ampelosaurus atacis",
    era: "白亜紀後期",
    region: "ヨーロッパ（フランス）",
    diet: "草食",
    length: "15.0m",
    weight: "8.0t",
    description: "背中に骨質の装甲を持っていた竜脚類。ティタノサウルス類に属し、肉食恐竜から身を守るために皮膚に埋め込まれたトゲや板状の骨を発達させていた。",
    bioTraits: [
      { trait: "防御機構", value: "皮骨装甲", detail: "竜脚類としては珍しく高度に発達した装甲を持つ" },
      { trait: "系統的特徴", value: "ティタノサウルス類", detail: "進化した竜脚類のグループに属し、広範囲に分布した" }
    ],
    image: "images/ampelosaurus.webp"
  },
  {
    id: "brontosaurus",
    name: "ブロントサウルス",
    kana: "ぶろんとさうるす",
    scientificName: "Brontosaurus excelsus",
    era: "ジュラ紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "22.0m",
    weight: "15.0t",
    description: "かつてアパトサウルスと同じとされていたが、近年の研究により別属として復活した「雷竜」。強靭な首とムチのような尾を持ち、ジュラ紀の湿地帯に生息していた。",
    bioTraits: [
      { trait: "復活した学名", value: "学名の変遷", detail: "一度は抹消された名前が2015年の研究で復活" },
      { trait: "強力な尾", value: "ムチのような尾", detail: "尾の先端を音速で振り回し、威嚇や防御に使用した" }
    ],
    image: "images/brontosaurus.webp"
  },
  {
    id: "dreadnoughtus",
    name: "ドレッドノータス",
    kana: "どれっどのーたす",
    scientificName: "Dreadnoughtus schrani",
    era: "白亜紀後期",
    region: "南アメリカ（アルゼンチン）",
    diet: "草食",
    length: "26.0m",
    weight: "59.0t",
    description: "「何も恐れない」という意味の名前を持つ南米の巨人。骨格の保存状態が極めて良く、超大型竜脚類の正確な体格や筋肉の付き方を解明する重要な手がかりとなった。",
    bioTraits: [
      { trait: "骨格確実性", value: "高い", detail: "超大型竜脚類としては珍しく全身の7割近くが発見" },
      { trait: "成長力", value: "驚異的", detail: "発見された個体はまだ成長途上であった可能性がある" }
    ],
    image: "images/dreadnoughtus.webp"
  },
  {
    id: "plesiosaurus",
    name: "プレシオサウルス",
    kana: "ぷれしおさうるす",
    scientificName: "Plesiosaurus dolichodeirus",
    era: "ジュラ紀前期",
    region: "ヨーロッパ（イギリス）周辺の海",
    diet: "肉食（魚食・軟体動物）",
    length: "3.5m",
    weight: "450kg",
    description: "代表的な首長竜。4枚のヒレ（パドル）を使い、空を飛ぶように海中を泳いだ。長い首は、魚の群れを不意に襲うのに適していた。",
    bioTraits: [
      { trait: "遊泳法", value: "水中飛翔", detail: "4枚のパドルを上下に動かして泳ぐ" },
      { trait: "捕獲能力", value: "高い", detail: "針のような細い歯で逃げる魚を逃がさない" }
    ],
    image: "images/plesiosaurus.webp"
  },
  {
    id: "ichthyosaurus",
    name: "イチチオサウルス",
    kana: "いちちおさうるす",
    scientificName: "Ichthyosaurus communis",
    era: "ジュラ紀前期",
    region: "ヨーロッパ周辺の海",
    diet: "肉食（魚食・軟体動物）",
    length: "3.3m",
    weight: "150kg",
    description: "イルカのような流線型の体を持った魚竜。完全に水中に適応しており、卵ではなく赤ちゃんを直接産む「胎生」であったことがわかっている。",
    bioTraits: [
      { trait: "水中適応", value: "完璧", detail: "高速泳行に適した尾鰭と背鰭" },
      { trait: "視覚力", value: "極めて高い", detail: "深海や夜間でも獲物を見つける巨大な目" }
    ],
    image: "images/ichthyosaurus.webp"
  },
  {
    id: "liopleurodon",
    name: "リオプレウロドン",
    kana: "りおぷれうろどん",
    scientificName: "Liopleurodon ferox",
    era: "ジュラ紀後期",
    region: "ヨーロッパ周辺の海",
    diet: "肉食",
    length: "7.0m",
    weight: "3.5t",
    description: "ジュラ紀の海における恐ろしい捕食者。巨大な頭部と強力な顎を持ち、イカや大型の魚、他の海生爬虫類までも捕食していた。",
    bioTraits: [
      { trait: "探知能力", value: "嗅覚", detail: "水中の微かな匂いを立体的に嗅ぎ分ける" },
      { trait: "瞬発力", value: "爆発的", detail: "巨大なパドルによる一瞬の突進攻撃" }
    ],
    image: "images/liopleurodon.webp"
  },
  {
    id: "kronosaurus",
    name: "クロノサウルス",
    kana: "くろのさうるす",
    scientificName: "Kronosaurus queenslandicus",
    era: "白亜紀前期",
    region: "オーストラリア周辺の海",
    diet: "肉食",
    length: "11.0m",
    weight: "12.0t",
    description: "古代のギリシャ神話の神クロノスから名付けられた、史上最大級のプリオサウルス類。2メートルに近い頭部は海のあらゆる生物の脅威だった。",
    bioTraits: [
      { trait: "咬合力", value: "破壊的", detail: "T-Rexを凌ぐとされる圧倒的な噛む力" },
      { trait: "大型牙", value: "25cm以上", detail: "獲物の骨を粉砕する巨大な円錐形の歯" }
    ],
    image: "images/kronosaurus.webp"
  },
  {
    id: "shonisaurus",
    name: "ショニサウルス",
    kana: "しょにさうるす",
    scientificName: "Shonisaurus popularis",
    era: "三畳紀後期",
    region: "北アメリカ周辺の海",
    diet: "肉食（魚食・軟体動物）",
    length: "15.0m",
    weight: "30.0t",
    description: "史上最大級の魚竜の一つ。クジラのような巨体を持ち、胎生であった。三畳紀の広大な海で優占的な地位を占めていたと考えられている。",
    bioTraits: [
      { trait: "サイズ", value: "超弩級", detail: "魚竜としては異例の巨大な体躯" },
      { trait: "生存戦略", value: "長距離移動", detail: "エネルギー効率の良い巨大な体での外洋移動" }
    ],
    image: "images/shonisaurus.webp"
  },
  {
    id: "archelon",
    name: "アーケロン",
    kana: "あーけろん",
    scientificName: "Archelon ischyros",
    era: "白亜紀後期",
    region: "北アメリカ周辺の海",
    diet: "雑食（軟体動物・海藻）",
    length: "4.5m",
    weight: "2.2t",
    description: "史上最大のウミガメ。甲羅は硬い板ではなく、骨のフレームに厚い皮膚が張られた構造をしており、軽量化と潜水能力を両立させていた。",
    bioTraits: [
      { trait: "軽量甲羅", value: "特殊構造", detail: "皮膚張りの甲羅による水浮力調節" },
      { trait: "咬合部", value: "嘴状", detail: "硬いアンモナイトの殻を砕く強力な嘴" }
    ],
    image: "images/archelon.webp"
  },
  {
    id: "tanystropheus",
    name: "タニストロフェウス",
    kana: "たにすとろふぇうす",
    scientificName: "Tanystropheus longobardicus",
    era: "三畳紀中期",
    region: "ヨーロッパ・アジア周辺の海岸",
    diet: "肉食（魚食）",
    length: "6.0m",
    weight: "150kg",
    description: "全長の半分以上が首という、極めて奇妙な姿をした爬虫類。岸辺から長い首を釣り竿のように伸ばし、水中の魚を捕らえていたとされる。",
    bioTraits: [
      { trait: "首の構造", value: "棒状", detail: "頸椎1つ1つが極端に長く、柔軟性は低かった" },
      { trait: "狩りの手法", value: "待ち伏せ", detail: "水中への不意のリーチによる捕食" }
    ],
    image: "images/tanystropheus.webp"
  },
  {
    id: "tylosaurus",
    name: "ティロサウルス",
    kana: "てぃろさうるす",
    scientificName: "Tylosaurus proriger",
    era: "白亜紀後期",
    region: "北アメリカ周辺の海",
    diet: "肉食",
    length: "13.0m",
    weight: "8.0t",
    description: "最大級のモササウルス類。頑丈で長い骨質の吻（ふん）を持ち、獲物への体当たりや攻撃に使ったと考えられている。海の食物連鎖の頂点に君臨していた。",
    bioTraits: [
      { trait: "攻撃特性", value: "体当たり", detail: "硬い鼻先を武器として使用" },
      { trait: "捕食", value: "広範囲", detail: "サメや首長竜、さらには他のモササウルス類も捕食" }
    ],
    image: "images/tylosaurus.webp"
  },
  {
    id: "hainosaurus",
    name: "ハイノサウルス",
    kana: "はいのさうるす",
    scientificName: "Hainosaurus bernardi",
    era: "白亜紀後期",
    region: "ヨーロッパ周辺の海",
    diet: "肉食",
    length: "12.0m",
    weight: "7.0t",
    description: "ティロサウルスの近縁種で、かつては史上最大のモササウルス類と考えられていた。非常に長い体を持ち、尾を使ってパワフルに泳ぐことができた。",
    bioTraits: [
      { trait: "推進力", value: "強力な尾", detail: "巨大な体を高速で加速させる筋肉" },
      { trait: "骨格", value: "多椎骨", detail: "柔軟な動きを可能にする背骨の構造" }
    ],
    image: "images/hainosaurus.webp"
  },
  {
    id: "prognathodon",
    name: "プログナソドン",
    kana: "ぷろぐなそどん",
    scientificName: "Prognathodon solvayi",
    era: "白亜紀後期",
    region: "世界中の海",
    diet: "肉食",
    length: "10.0m",
    weight: "5.0t",
    description: "非常に頑丈な頭骨と強力な牙を持つモササウルス類。貝類やアンモナイト、硬い鱗を持つ魚などを噛み砕くのに適した顎を持っていた。",
    bioTraits: [
      { trait: "咬合力", value: "絶大", detail: "硬い獲物の殻を粉砕する特殊な歯" },
      { trait: "潜水", value: "深海対応", detail: "深海での活動を示唆する強固な耳の構造" }
    ],
    image: "images/prognathodon.webp"
  },
  {
    id: "nothosaurus",
    name: "ノトサウルス",
    kana: "のとさうるす",
    scientificName: "Nothosaurus mirabilis",
    era: "三畳紀中期",
    region: "ヨーロッパ・北アフリカ周辺の海",
    diet: "肉食（魚食）",
    length: "4.0m",
    weight: "300kg",
    description: "アザラシのように水陸両方で活動したとされる海生爬虫類。長い首と鋭い歯を持ち、待ち伏せや奇襲で魚を捕らえていた。",
    bioTraits: [
      { trait: "機動性", value: "水陸両用", detail: "ヒレ状の足で陸上も移動可能だった" },
      { trait: "捕食技術", value: "鋭い牙", detail: "魚を捕らえて逃がさない複雑な歯列" }
    ],
    image: "images/nothosaurus.webp"
  },
  {
    id: "placodus",
    name: "プラコドゥス",
    kana: "ぷらこどぅす",
    scientificName: "Placodus gigas",
    era: "三畳紀中期",
    region: "ヨーロッパ周辺の海",
    diet: "肉食（貝食）",
    length: "2.0m",
    weight: "150kg",
    description: "石畳のような平らな歯を持つ、貝を食べることに特化した爬虫類。海底をゆっくりと泳ぎながら、貝類や甲殻類を探して食べていた。",
    bioTraits: [
      { trait: "特殊歯", value: "石畳状の歯", detail: "硬い殻を押しつぶすための強力な歯" },
      { trait: "防御", value: "骨質ノブ", detail: "背中にある小さな骨の装甲" }
    ],
    image: "images/placodus.webp"
  },
  {
    id: "henodus",
    name: "ヘノドゥス",
    kana: "へのどぅす",
    scientificName: "Henodus chelyops",
    era: "三畳紀後期",
    region: "中東（ドイツ）周辺の汽水域",
    diet: "雑食（植物・小動物）",
    length: "1.0m",
    weight: "20kg",
    description: "カメに似た箱状の甲羅を持つが、カメとは全く別の系統。汽水域や湖に生息し、平らな口で水底の堆積物をこし取って食べていたとされる。",
    bioTraits: [
      { trait: "装甲", value: "箱状甲羅", detail: "1枚の大きな骨板で覆われた平らな体" },
      { trait: "採食", value: "フィルター", detail: "広くて平らな口による砂泥の濾過" }
    ],
    image: "images/henodus.webp"
  },
  {
    id: "cymbospondylus",
    name: "キンボスポンディルス",
    kana: "きんぼすぽんでぃるす",
    scientificName: "Cymbospondylus petrinus",
    era: "三畳紀中期",
    region: "北アメリカ・ヨーロッパ周辺의海",
    diet: "肉食",
    length: "10.0m",
    weight: "4.0t",
    description: "初期の魚竜としては異例の巨体を誇る。後の魚竜のような三日月型の尾鰭を持たず、ウナギのように体をくねらせて泳いでいた。",
    bioTraits: [
      { trait: "巨体", value: "三畳紀最大級", detail: "全長10メートルに達する細長い体" },
      { trait: "遊泳法", value: "蛇行", detail: "長い全身を使って力強く泳ぐ" }
    ],
    image: "images/cymbospondylus.webp"
  },
  {
    id: "leedsichthys",
    name: "リードシクティス",
    kana: "りーどしくてぃす",
    scientificName: "Leedsichthys problematicus",
    era: "ジュラ紀後期",
    region: "ヨーロッパ周辺の海",
    diet: "プランクトン食",
    length: "16.5m",
    weight: "21.0t",
    description: "史上最大の硬骨魚類の一つ。現生のジンベエザメのように、巨大な口で海水中のプランクトンを濾しとって食べていた平和な巨人。",
    bioTraits: [
      { trait: "濾過摂食", value: "高効率", detail: "数千の鰓耙（さいは）で微細な餌を捕集" },
      { trait: "巨体", value: "最大級の魚類", detail: "他の大型魚類や爬虫類を圧倒する質量" }
    ],
    image: "images/leedsichthys.webp"
  },
  {
    id: "dimorphodon",
    name: "ディモルフォドン",
    kana: "でぃもるふぉどん",
    scientificName: "Dimorphodon macronyx",
    era: "ジュラ紀前期",
    region: "ヨーロッパ",
    diet: "肉食（昆虫・小動物）",
    length: "翼開長1.0m",
    weight: "2kg",
    description: "「2種類の歯」を意味する名を持つ翼竜。大きな頭部と長い尾が特徴で、地上でも比較的活発に動けたと考えられている。",
    bioTraits: [
      { trait: "異形歯", value: "2種類", detail: "獲物を捕らえる長い前歯と噛み切る奥歯を持つ" },
      { trait: "構造", value: "長い尾", detail: "飛行時のバランスを保つための長い尾" }
    ],
    image: "images/dimorphodon.webp"
  },
  {
    id: "rhamphorhynchus",
    name: "ランフォリンクス",
    kana: "らんふぉりんくす",
    scientificName: "Rhamphorhynchus muensteri",
    era: "ジュラ紀後期",
    region: "ヨーロッパ",
    diet: "肉食（魚食）",
    length: "翼開長1.2m",
    weight: "2kg",
    description: "長い尾の先端に菱形のひれを持つ翼竜。嘴には前方に突き出した鋭い歯があり、水面の魚を捕らえるのに適していた。",
    bioTraits: [
      { trait: "舵取り装置", value: "菱形の尾", detail: "尾の先端のひれが飛行中の方向転換を助ける" },
      { trait: "捕食特化", value: "前向きの歯", detail: "滑りやすい魚を確実に捕らえる構造" }
    ],
    image: "images/rhamphorhynchus.webp"
  },
  {
    id: "pterodactylus",
    name: "プテロダクティルス",
    kana: "ぷてろだくてぃるす",
    scientificName: "Pterodactylus antiquus",
    era: "ジュラ紀後期",
    region: "ヨーロッパ",
    diet: "肉食（小動物・魚）",
    length: "翼開長1.0m",
    weight: "2kg",
    description: "世界で最初に発見された翼竜。コンパクトな体と短い尾を持ち、翼竜の中でも洗練された飛行能力を有していた。",
    bioTraits: [
      { trait: "機動力", value: "高い", detail: "短い尾により空中での旋回性能が向上" },
      { trait: "構造", value: "軽量化", detail: "極限まで薄い骨格による効率的な飛行" }
    ],
    image: "images/pterodactylus.webp"
  },
  {
    id: "tapejara",
    name: "タペヤラ",
    kana: "たぺやら",
    scientificName: "Tapejara wellnhoferi",
    era: "白亜紀前期",
    region: "南アメリカ",
    diet: "雑食（果実・魚）",
    length: "翼開長3.5m",
    weight: "10kg",
    description: "頭部にある巨大なトサカと、オウムのような短く鋭い嘴が特徴。トサカはディスプレイや飛行時のバランス調節に使われた可能性がある。",
    bioTraits: [
      { trait: "巨大トサカ", value: "帆状", detail: "骨質と帆のような膜からなる大きな装飾" },
      { trait: "食性適応", value: "嘴", detail: "種子や果実も食べられたとされる特殊な形状" }
    ],
    image: "images/tapejara.webp"
  },
  {
    id: "tupandactylus",
    name: "トゥパンダクティルス",
    kana: "とぅぱんだくてぃるす",
    scientificName: "Tupandactylus imperator",
    era: "白亜紀前期",
    region: "南アメリカ",
    diet: "雑食（果実・種子）",
    length: "翼開長5.0m",
    weight: "15kg",
    description: "タペヤラの近縁種で、さらに巨大で複雑な形状のトサカを持つ。そのトサカは非常に色彩豊かだったと考えられている。",
    bioTraits: [
      { trait: "極大トサカ", value: "驚異的サイズ", detail: "頭部の数倍の大きさになるディスプレイ用トサカ" },
      { trait: "社会性", value: "高い", detail: "トサカを用いた個体識別やコミュニケーション" }
    ],
    image: "images/tupandactylus.webp"
  },
  {
    id: "alanqa",
    name: "アランカ",
    kana: "あらんか",
    scientificName: "Alanqa saharica",
    era: "白亜紀後期",
    region: "アフリカ",
    diet: "肉食",
    length: "翼開長6.0m",
    weight: "40kg",
    description: "サハラ砂漠で発見された巨大な翼竜。地上に立つとキリンほどの高さがあり、強力な嘴で様々な獲物を捕食していた。",
    bioTraits: [
      { trait: "地上高", value: "キリン並み", detail: "四足歩行時には高い視点から地上を監視" },
      { trait: "構造", value: "堅牢な嘴", detail: "貝殻などの硬いものも砕けた可能性" }
    ],
    image: "images/alanqa.webp"
  },
  {
    id: "dsungaripterus",
    name: "ズンガリプテルス",
    kana: "ずんがりぷてるす",
    scientificName: "Dsungaripterus weii",
    era: "白亜紀前期",
    region: "アジア",
    diet: "肉食（貝食）",
    length: "翼開長3.0m",
    weight: "15kg",
    description: "先端がわずかに反り返った、ピンセットのような嘴を持つ。口の奥には貝などを砕くための平らな歯が並んでいた。",
    bioTraits: [
      { trait: "特殊嘴", value: "反り返り", detail: "岩の隙間から獲物を引き抜くのに適した形状" },
      { trait: "粉砕能力", value: "高い", detail: "硬い殻を噛み砕くための強靭な奥歯" }
    ],
    image: "images/dsungaripterus.webp"
  },
  {
    id: "tropeognathus",
    name: "トロペオグナトゥス",
    kana: "とろぺおぐなとぅす",
    scientificName: "Tropeognathus mesembrinus",
    era: "白亜紀前期",
    region: "南アメリカ",
    diet: "肉食（魚食）",
    length: "翼開長8.0m",
    weight: "50kg",
    description: "嘴の先端に半円形のトサカ（隆起）を持つ巨大な翼竜。この隆起は水面ギリギリを飛ぶ際の安定性を高めていたとされる。",
    bioTraits: [
      { trait: "キール構造", value: "嘴のトサカ", detail: "水中に嘴を入れて飛ぶ際の水の抵抗を軽減" },
      { trait: "巨翼", value: "白亜紀前期最大", detail: "上昇気流を捉えて数千キロを移動可能" }
    ],
    image: "images/tropeognathus.webp"
  },
  {
    id: "anhanguera",
    name: "アンハングエラ",
    kana: "あんはんぐえら",
    scientificName: "Anhanguera piscator",
    era: "白亜紀前期",
    region: "南アメリカ",
    diet: "肉食（魚食）",
    length: "翼開長4.5m",
    weight: "25kg",
    description: "「年老いた悪魔」を意味する名を持つ。交互に並ぶ長い獲物捕らえ用の歯が特徴で、魚食に特化した進化を遂げた。",
    bioTraits: [
      { trait: "捕食トラップ", value: "交差する歯", detail: "一度捕らえた魚を逃さないケージのような歯" },
      { trait: "センシング", value: "高い平衡感覚", detail: "低空飛行で正確に獲物を狙い撃つ" }
    ],
    image: "images/anhanguera.webp"
  },
  {
    id: "eudimorphodon",
    name: "エウディモルフォドン",
    kana: "えうでぃもるふぉどん",
    scientificName: "Eudimorphodon ranzii",
    era: "三畳紀後期",
    region: "ヨーロッパ",
    diet: "肉食（魚食・昆虫）",
    length: "翼開長1.0m",
    weight: "1kg",
    description: "既知で最古級の翼竜の一つ。初期の翼竜ながら、魚の鱗が胃の内容物から見つかるなど、高度な狩りを行っていた。",
    bioTraits: [
      { trait: "複雑な歯", value: "多咬頭歯", detail: "原始的だが複雑な形状の歯で多様な餌に対応" },
      { trait: "構造", value: "長い尾", detail: "ステアリングの役割を果たす硬い尾" }
    ],
    image: "images/eudimorphodon.webp"
  },
  {
    id: "sordes",
    name: "ソルデス",
    kana: "そるです",
    scientificName: "Sordes pilosus",
    era: "ジュラ紀後期",
    region: "アジア",
    diet: "肉食（昆虫食）",
    length: "翼開長0.5m",
    weight: "0.5kg",
    description: "「毛深い不浄なもの」という名を持つが、翼竜が羽毛（ピクノファイバー）を持っていたことを示す重要な証拠となった小型種。",
    bioTraits: [
      { trait: "外皮", value: "体毛状組織", detail: "全身を覆う毛のような組織による保温効果" },
      { trait: "適応", value: "昆虫食", detail: "夜間や寒冷地でも活動できた可能性" }
    ],
    image: "images/sordes.webp"
  },
  {
    id: "jeholopterus",
    name: "ジェホロプテルス",
    kana: "じぇほろぷてるす",
    scientificName: "Jeholopterus ningchengensis",
    era: "ジュラ紀中期",
    region: "アジア",
    diet: "肉食（昆虫食）",
    length: "翼開長0.9m",
    weight: "1kg",
    description: "丸みを帯びた頭部と、非常に広い口を持つ特殊な翼竜。現代のヨタカのような、夜間に空中。で虫を捕らえる生活をしていた可能性がある。",
    bioTraits: [
      { trait: "広角嘴", value: "夜間狩猟", detail: "大きく開く口で空中を飛ぶ昆虫を効率よく捕獲" },
      { trait: "鉤爪", value: "強靭", detail: "樹木にしっかりと掴まるための発達した爪" }
    ],
    image: "images/jeholopterus.webp"
  },
  {
    id: "protoceratops",
    name: "プロトケラトプス",
    kana: "ぷろとけらとぷす",
    scientificName: "Protoceratops andrewsi",
    era: "白亜紀後期",
    region: "アジア",
    diet: "草食",
    length: "1.8m",
    weight: "180kg",
    description: "「最初の角のある顔」を意味する名前だが、実際には角を持たず、発達した襟飾りのみを持つ初期の角竜。羊ほどの大きさで、砂漠地帯に生息していた。",
    bioTraits: [
      { trait: "襟飾り", value: "発達", detail: "個体識別や求愛、筋肉の付着点として機能" },
      { trait: "嘴", value: "強力", detail: "硬い砂漠の植物を切り取るための鋭いくちばし" }
    ],
    image: "images/protoceratops.webp"
  },
  {
    id: "pachyrhinosaurus",
    name: "パキリノサウルス",
    kana: "ぱきりのさうるす",
    scientificName: "Pachyrhinosaurus canadensis",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "8.0m",
    weight: "4.0t",
    description: "鼻の上の角の代わりに、分厚く平らな「骨のコブ」を持つ奇妙な角竜。襟飾りの縁には複雑な形状の角や飾りが並んでいた。",
    bioTraits: [
      { trait: "骨のコブ", value: "頑強", detail: "鼻の上の厚いコブは儀礼的な闘争に使われた可能性" },
      { trait: "群れ", value: "大規模", detail: "アラスカなどで大量の化石が発見され、大移動をしていたとされる" }
    ],
    image: "images/pachyrhinosaurus.webp"
  },
  {
    id: "chasmosaurus",
    name: "カスモサウルス",
    kana: "かすもさうるす",
    scientificName: "Chasmosaurus belli",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "5.0m",
    weight: "2.0t",
    description: "「穴の開いたトカゲ」という意味の名を持つ。非常に大きな襟飾りには巨大な穴が開いており、重量を軽く保ちつつ視覚的な威嚇効果を高めていた。",
    bioTraits: [
      { trait: "大型襟飾", value: "威嚇特化", detail: "面積が広く、捕食者を驚かせるのに十分な大きさ" },
      { trait: "角の構成", value: "短角", detail: "目の上と鼻に短い角を持つ" }
    ],
    image: "images/chasmosaurus.webp"
  },
  {
    id: "torosaurus",
    name: "トロサウルス",
    kana: "とろさうるす",
    scientificName: "Torosaurus latus",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "8.0m",
    weight: "6.0t",
    description: "陸生動物の中で最大級の頭骨を持つ恐竜。トリケラトプスに似ているが、襟飾りがさらに長く、大きな窓（穴）が開いているのが特徴。",
    bioTraits: [
      { trait: "巨大頭骨", value: "記録的サイズ", detail: "頭部だけで2.5メートル以上に達する個体も存在" },
      { trait: "装飾進化", value: "極限", detail: "より大きな襟飾りが選択された進化の結果" }
    ],
    image: "images/torosaurus.webp"
  },
  {
    id: "diabloceratops",
    name: "ディアブロケラトプス",
    kana: "でぃあぶろけらとぷす",
    scientificName: "Diabloceratops eatoni",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "5.5m",
    weight: "1.5t",
    description: "「悪魔の角を持つ顔」を意味する名を持つ。襟飾りの上部から左右に長く伸びた2本の角が、まるで悪魔の角のように見えることから命名された。",
    bioTraits: [
      { trait: "襟飾角", value: "左右一対", detail: "上方に大きく湾曲した特徴的な2本の角" },
      { trait: "進化段階", value: "原始的", detail: "セントロサウルス類の中でも古い時代の特徴を残す" }
    ],
    image: "images/diabloceratops.webp"
  },
  {
    id: "nasutoceratops",
    name: "ナスートケラトプス",
    kana: "なすーとけらとぷす",
    scientificName: "Nasutoceratops titani",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "4.5m",
    weight: "1.5t",
    description: "牛のような、前方に大きく湾曲した角を持つユニークな角竜。名前は「大きな鼻を持つ角竜」を意味し、特大の鼻の空間が特徴的。",
    bioTraits: [
      { trait: "牛状の角", value: "前方湾曲", detail: "他の角竜とは異なる、闘牛のように前に向いた角" },
      { trait: "巨大な鼻", value: "解剖学的特徴", detail: "嗅覚や発声に関わっていた可能性のある大きな鼻腔" }
    ],
    image: "images/nasutoceratops.webp"
  },
  {
    id: "centrosaurus",
    name: "セントロサウルス",
    kana: "せんとろさうるす",
    scientificName: "Centrosaurus apertus",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "6.0m",
    weight: "2.5t",
    description: "鼻の上に一本の長い角があり、襟飾りの縁には複雑な「フック状」の飾りが並んでいるのが特徴。代表的な角竜の一つ。",
    bioTraits: [
      { trait: "鼻角", value: "一本槍", detail: "前方に向けられた強力な一本の武器" },
      { trait: "襟飾フック", value: "内側湾曲", detail: "襟飾りの縁から内側に向かって伸びる不思議な突起" }
    ],
    image: "images/centrosaurus.webp"
  },
  {
    id: "einiosaurus",
    name: "エイニオサウルス",
    kana: "えいにおさうるす",
    scientificName: "Einiosaurus procurvicornis",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "4.5m",
    weight: "1.3t",
    description: "鼻の上の角が、栓抜きのように前方に強く曲がっているのが最大の特徴。襟飾りの上部には2本の鋭いスパイクが付いていた。",
    bioTraits: [
      { trait: "前曲角", value: "ボトルオープナー", detail: "下向きに大きく曲がった独特の鼻角" },
      { trait: "スパイク", value: "防御・威嚇", detail: "襟飾りの上部から外側へ向かう二本のトゲ" }
    ],
    image: "images/einiosaurus.webp"
  },
  {
    id: "leptoceratops",
    name: "レプトケラトプス",
    kana: "れぷとけらとぷす",
    scientificName: "Leptoceratops gracilis",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "2.5m",
    weight: "180kg",
    description: "白亜紀の最後にまで生き残った、小型で襟飾りのない角竜。二足歩行での逃走も可能だったと考えられ、原始的な特徴を最後まで維持していた。",
    bioTraits: [
      { trait: "無襟飾", value: "原始的", detail: "防御用の襟飾りがなく、身軽な体格を持つ" },
      { trait: "移動形式", value: "二足・四足行", detail: "通常は四足、緊急時には二足で走ることができた" }
    ],
    image: "images/leptoceratops.webp"
  },
  {
    id: "gastonia",
    name: "ガストニア",
    kana: "がすとにあ",
    scientificName: "Gastonia burgei",
    era: "白亜紀前期",
    region: "北アメリカ",
    diet: "草食",
    length: "5.0m",
    weight: "1.9t",
    description: "体表に鋭いトゲがびっしりと並んだ鎧竜の仲間（ノドサウルス科）。特に尾の側面にあるトゲは、尾を振ることで獲物を切り裂くハサミのように機能した。",
    bioTraits: [
      { trait: "トゲ装甲", value: "全身武装", detail: "体中から飛び出した大小様々な棘が接近を阻む" },
      { trait: "シザーズ・テイル", value: "攻撃手段", detail: "尾を左右に振るだけで肉食恐竜に深い傷を負わせる" }
    ],
    image: "images/gastonia.webp"
  },
  {
    id: "sauropelta",
    name: "サウロペルタ",
    kana: "さうろぺるた",
    scientificName: "Sauropelta edwardsorum",
    era: "白亜紀前期",
    region: "北アメリカ",
    diet: "草食",
    length: "5.0m",
    weight: "1.5t",
    description: "「トカゲの盾」の名を持つ鎧竜。肩から首にかけて巨大なスパイクが突き出しており、正面や側面からの攻撃に対して鉄壁の防御を誇った。",
    bioTraits: [
      { trait: "ショルダースパイク", value: "対空・対側面", detail: "肩にある最大級のトゲが首元を保護する" },
      { trait: "盾状装甲", value: "モザイク装甲", detail: "皮膚に埋め込まれた無数の骨質の板" }
    ],
    image: "images/sauropelta.webp"
  },
  {
    id: "edmontonia",
    name: "エドモントニア",
    kana: "えどもんとにあ",
    scientificName: "Edmontonia longiceps",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "6.0m",
    weight: "3.0t",
    description: "非常に重厚な装甲を持つノドサウルス科の鎧竜。肩に前方を向いた巨大なスパイクを持ち、肉食恐竜が突進してきても逆に串刺しにする能力があった。",
    bioTraits: [
      { trait: "正面迎撃", value: "突進防御", detail: "正面を向いた二対の巨大な肩のトゲ" },
      { trait: "装甲密度", value: "最高水準", detail: "頭部から尾まで隙間なく並んだ硬い骨板" }
    ],
    image: "images/edmontonia.webp"
  },
  {
    id: "polacanthus",
    name: "ポラカントゥス",
    kana: "ぽらかんとぅす",
    scientificName: "Polacanthus foxii",
    era: "白亜紀前期",
    region: "ヨーロッパ",
    diet: "草食",
    length: "5.0m",
    weight: "2.0t",
    description: "腰の部分に「サクラル・シールド」と呼ばれる一枚板のような巨大な装甲を持っていたのが特徴。背中にはトゲ、尾には板状の突起が並んでいた。",
    bioTraits: [
      { trait: "腰の盾", value: "サクラル・シールド", detail: "腰から臀部を覆う広大な単一の骨板" },
      { trait: "マルチ武装", value: "トゲと板", detail: "部位によってトゲと板状の装甲を使い分ける" }
    ],
    image: "images/polacanthus.webp"
  },
  {
    id: "euoplocephalus",
    name: "エウオプロケファルス",
    kana: "えうおぷろけふぁるす",
    scientificName: "Euoplocephalus tutus",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "6.0m",
    weight: "2.5t",
    description: "「立派な装甲の頭」という意味の通り、まぶたまで装甲化されていた徹底した防御型のアンキロサウルス類。尾の先端には巨大な骨のハンマーを持つ。",
    bioTraits: [
      { trait: "ハンマーテイル", value: "重量武器", detail: "数百キロの衝撃を与える骨の塊" },
      { trait: "装甲まぶた", value: "全身保護", detail: "目という弱点すら骨質の板で保護可能" }
    ],
    image: "images/euoplocephalus.webp"
  },
  {
    id: "saichania",
    name: "サイカニア",
    kana: "さいかにあ",
    scientificName: "Saichania chulsanensis",
    era: "白亜紀後期",
    region: "アジア（ゴビ砂漠）",
    diet: "草食",
    length: "6.0m",
    weight: "2.5t",
    description: "「美しいもの」を意味し、その保存状態の良い装甲の見事さから名付けられた。乾燥した砂漠環境に適応しており、頭骨の内部には熱を逃がすための複雑な構造があった。",
    bioTraits: [
      { trait: "砂漠適応", value: "熱交換システム", detail: "鼻腔内の複雑な構造で吸気を冷却" },
      { trait: "二段腹装甲", value: "特殊装甲", detail: "腹部側まで装甲が回り込んでいる珍しい構造" }
    ],
    image: "images/saichania.webp"
  },
  {
    id: "minmi",
    name: "ミンミ",
    kana: "みんみ",
    scientificName: "Minmi paravertebra",
    era: "白亜紀前期",
    region: "オーストラリア",
    diet: "草食",
    length: "3.0m",
    weight: "300kg",
    description: "オーストラリアで発見された小型の鎧竜。脊椎の横に「パラバーテブラ（副脊椎骨）」という特殊な骨があり、それが名前の由来。背中だけでなくお腹側も小さな骨で守られていた。",
    bioTraits: [
      { trait: "副脊椎骨", value: "背筋強化", detail: "素早く逃げたり激しい動きを支えるための特殊な骨" },
      { trait: "腹部守備", value: "鎖帷子", detail: "お腹側を保護する小さな骨の粒の集合体" }
    ],
    image: "images/minmi.webp"
  },
  {
    id: "scelidosaurus",
    name: "スケリドサウルス",
    kana: "すけりどさうるす",
    scientificName: "Scelidosaurus harrisonii",
    era: "ジュラ紀前期",
    region: "ヨーロッパ",
    diet: "草食",
    length: "4.0m",
    weight: "270kg",
    description: "ジュラ紀の初期に現れた、最も原始的な装甲恐竜の一つ。後のアンキロサウルス類やステゴサウルス類の共通の先祖に近いと考えられている。",
    bioTraits: [
      { trait: "原初装甲", value: "骨質ノブ", detail: "皮膚に規則正しく並んだ原始的な装具" },
      { trait: "進化の基点", value: "装盾亜目", detail: "すべての装甲系恐竜の進化の鍵を握る種" }
    ],
    image: "images/scelidosaurus.webp"
  },
  {
    id: "hylaeosaurus",
    name: "ヒラエオサウルス",
    kana: "ひらえおさうるす",
    scientificName: "Hylaeosaurus armatus",
    era: "白亜紀前期",
    region: "ヨーロッパ",
    diet: "草食",
    length: "5.0m",
    weight: "2.0t",
    description: "「森のトカゲ」を意味し、1842年にリチャード・オーウェンが「Dinosauria（恐竜）」という言葉を提唱した際に含まれていた最初の3頭の一つ。",
    bioTraits: [
      { trait: "歴史的重要種", value: "三大恐竜", detail: "「恐竜」誕生時に数えられた歴史的な種" },
      { trait: "背棘", value: "三列のトゲ", detail: "背中の中心線とその両脇に並ぶ鋭いトゲ" }
    ],
    image: "images/hylaeosaurus.webp"
  },
  {
    id: "tarchia",
    name: "タルキア",
    kana: "たるきあ",
    scientificName: "Tarchia gigantea",
    era: "白亜紀後期",
    region: "アジア（モンゴル）",
    diet: "草食",
    length: "8.0m",
    weight: "4.5t",
    description: "「知恵がある」という意味の名前を持つが、これは非常に大きな脳函を持っていたことから。アジア最大級のアンキロサウルス類で、タルボサウルスなどの大型肉食恐竜と共存していた。",
    bioTraits: [
      { trait: "最大重量級", value: "アジアの壁", detail: "極めて重厚な装甲と巨大な体躯" },
      { trait: "対捕食者", value: "ハンマー攻撃", detail: "巨大な尾のハンマーでタルボサウルスに対抗" }
    ],
    image: "images/tarchia.webp"
  },
  {
    id: "borealopelta",
    name: "ボレアロペルタ",
    kana: "ぼれあろぺるた",
    scientificName: "Borealopelta markmitchelli",
    era: "白亜紀前期",
    region: "北アメリカ（カナダ）",
    diet: "草食",
    length: "5.5m",
    weight: "1.3t",
    description: "奇跡的な保存状態で発見された「恐竜のミイラ」。皮膚や装甲、さらには最後の食事内容まで保存されており、生前は赤茶色の保護色をしていたことが判明している。",
    bioTraits: [
      { trait: "保護色", value: "赤茶色", detail: "カウンターシェーディングによる擬態の証拠" },
      { trait: "完全再現", value: "生きた姿", detail: "三次元的な装甲の配置が完全に判明している唯一の鎧竜" }
    ],
    image: "images/borealopelta.webp"
  },
  {
    id: "edmontosaurus",
    name: "エドモントサウルス",
    kana: "えどもんとさうるす",
    scientificName: "Edmontosaurus annectens",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "12.0m",
    weight: "3.5t",
    description: "アヒルのような嘴を持つ代表的なハドロサウルス類。トサカのない平坦な頭部が特徴で、非常に高い密度で群れを作り、渡りを行っていたことが知られている。",
    bioTraits: [
      { trait: "アヒル口", value: "特化型", detail: "数千本の歯が並ぶデンタルバッテリーで植物をすり潰す" },
      { trait: "群居性", value: "高い", detail: "数千頭規模の巨大な群れで移動していた証拠がある" }
    ],
    image: "images/edmontosaurus.webp"
  },
  {
    id: "corythosaurus",
    name: "コリトサウルス",
    kana: "こりとさうるす",
    scientificName: "Corythosaurus casuarius",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "9.0m",
    weight: "3.0t",
    description: "カシオワリ（ヒクイドリ）のような半円形の立派なトサカを持つ恐竜。トサカの内部は空洞になっており、共鳴させて大きな声を出して仲間とコミュニケーションをとっていた。",
    bioTraits: [
      { trait: "半円形トサカ", value: "共鳴器", detail: "声を増幅させ、数キロ先まで音を届けることが可能" },
      { trait: "視覚的装飾", value: "ディスプレイ", detail: "トサカは成長とともに大きくなり、雌雄の識別にも使われた" }
    ],
    image: "images/corythosaurus.webp"
  },
  {
    id: "maiasaura",
    name: "マイアサウラ",
    kana: "まいあさうら",
    scientificName: "Maiasaura peeblesorum",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "9.0m",
    weight: "2.5t",
    description: "「良い母親のトカゲ」を意味する名を持ち、恐竜が子育てをしていたことを初めて証明した重要な種。大規模な営巣地を作り、子供が成長するまで世話を焼いていた。",
    bioTraits: [
      { trait: "子育て", value: "高度な社会性", detail: "卵の孵化から幼体の成長まで群れ全体で保護する" },
      { trait: "営巣戦略", value: "コロニー形成", detail: "一定の間隔で巣を配置し、集団で捕食者から守る" }
    ],
    image: "images/maiasaura.webp"
  },
  {
    id: "muttaburrasaurus",
    name: "ムッタブラサウルス",
    kana: "むったぶらさうるす",
    scientificName: "Muttaburrasaurus langdoni",
    era: "白亜紀前期",
    region: "オーストラリア",
    diet: "草食",
    length: "8.0m",
    weight: "2.8t",
    description: "オーストラリアを代表する大型の鳥脚類。膨らんだ大きな鼻腔が特徴で、嗅覚が非常に鋭かった、あるいは大きな鳴き声を出すための共鳴器として機能していたと考えられている。",
    bioTraits: [
      { trait: "隆起した鼻", value: "特異形状", detail: "嗅覚の強化や音響調節に使用された可能性が高い" },
      { trait: "咬合力", value: "強力", detail: "硬い植物を切断するのに適した鋭い嘴と歯を持つ" }
    ],
    image: "images/muttaburrasaurus.webp"
  },
  {
    id: "shantungosaurus",
    name: "シャントゥンゴサウルス",
    kana: "しゃんとぅんごさうるす",
    scientificName: "Shantungosaurus giganteus",
    era: "白亜紀後期",
    region: "アジア（中国）",
    diet: "草食",
    length: "15.0m",
    weight: "16.0t",
    description: "史上最大のハドロサウルス類であり、最大の二足歩行動物の一つ。その巨体は一部の竜脚類にも匹敵し、白亜紀のアジアにおいて圧倒的な存在感を放っていた。",
    bioTraits: [
      { trait: "巨大化", value: "最大級", detail: "ハドロサウルス類としては異例の15メートル超えの体躯" },
      { trait: "骨格強度", value: "極めて高い", detail: "巨体を支えるための頑強な脊椎と後肢を持つ" }
    ],
    image: "images/shantungosaurus.webp"
  },
  {
    id: "tenontosaurus",
    name: "テノントサウルス",
    kana: "てのんとさうるす",
    scientificName: "Tenontosaurus tilletti",
    era: "白亜紀前期",
    region: "北アメリカ",
    diet: "草食",
    length: "7.0m",
    weight: "1.0t",
    description: "極端に長い尾を持つ鳥脚類。デイノニクスなどの小型肉食恐竜の主な獲物となっていたことが、化石の発見状況から強く示唆されている。",
    bioTraits: [
      { trait: "超長尾", value: "バランス調整", detail: "全長の半分以上を占める強靭な尾でバランスを取る" },
      { trait: "被食者", value: "生態系の中核", detail: "肉食恐竜との格闘の痕跡が複数の化石に残っている" }
    ],
    image: "images/tenontosaurus.webp"
  },
  {
    id: "camptosaurus",
    name: "カンプトサウルス",
    kana: "かんぷとさうるす",
    scientificName: "Camptosaurus dispar",
    era: "ジュラ紀後期〜白亜紀前期",
    region: "北アメリカ・ヨーロッパ",
    diet: "草食",
    length: "6.0m",
    weight: "0.8t",
    description: "イグアノドン類に近い原始的な鳥脚類。がっしりとした四肢を持ち、通常は四足、走る時は二足歩行を使い分けることができたと考えられている。",
    bioTraits: [
      { trait: "歩行柔軟性", value: "二足/四足併用", detail: "状況に応じて歩行スタイルを自在に切り替える" },
      { trait: "強靭な嘴", value: "植物切断", detail: "地表に近い植物を効率よく摘み取るための嘴" }
    ],
    image: "images/camptosaurus.webp"
  },
  {
    id: "ouranosaurus",
    name: "オウラノサウルス",
    kana: "おうらのさうるす",
    scientificName: "Ouranosaurus nigeriensis",
    era: "白亜紀前期",
    region: "アフリカ（ニジェール）",
    diet: "草食",
    length: "7.0m",
    weight: "2.2t",
    description: "背中に帆のような突起を持つユニークなイグアノドン類。この帆は体温調節や、仲間へのディスプレイ（自己アピール）に使われたと考えられている。",
    bioTraits: [
      { trait: "背中の帆", value: "体温調節", detail: "表面積を広げ、熱を放射または吸収する役割" },
      { trait: "親指スパイク", value: "防御武器", detail: "イグアノドン類特有の鋭い親指の爪で身を守る" }
    ],
    image: "images/ouranosaurus.webp"
  },
  {
    id: "olorotitan",
    name: "オロロティタン",
    kana: "おろろてぃたん",
    scientificName: "Olorotitan arharensis",
    era: "白亜紀後期",
    region: "アジア（ロシア）",
    diet: "草食",
    length: "12.0m",
    weight: "5.0t",
    description: "扇形の巨大なトサカを持つハドロサウルス類。ロシアの極東地域で発見され、白亜紀末期まで生き残っていた。",
    bioTraits: [
      { trait: "構造", value: "扇形トサカ", detail: "中空のトサカで音を鳴らし仲間と通信した" },
      { trait: "機動性", value: "中程度", detail: "二足・四足歩行の両方で移動可能" }
    ],
    image: "images/olorotitan.webp"
  },
  {
    id: "stegoceras",
    name: "ステゴケラス",
    kana: "すてごけらす",
    scientificName: "Stegoceras validum",
    era: "白亜紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "2.5m",
    weight: "40kg",
    description: "分厚いドーム状の頭骨を持つパキケファロサウルス類。比較的小型だが、頭突きによる儀礼的闘争を行っていたと考えられている。",
    bioTraits: [
      { trait: "武装", value: "頭骨ドーム", detail: "衝撃に強い強化された骨構造" },
      { trait: "感覚", value: "鋭敏な嗅覚", detail: "脳の嗅球が発達していた" }
    ],
    image: "images/stegoceras.webp"
  },
  {
    id: "homalocephale",
    name: "ホマロケファレ",
    kana: "ほまろけふぁれ",
    scientificName: "Homalocephale calathocercos",
    era: "白亜紀後期",
    region: "アジア（モンゴル）",
    diet: "草食",
    length: "1.8m",
    weight: "43kg",
    description: "ドーム状ではなく平らな頭頂部を持つパキケファロサウルス類。骨盤が広く、内臓を保護するのに適していた。",
    bioTraits: [
      { trait: "構造", value: "平坦な頭頂", detail: "頭突きよりも威嚇やディスプレイ用か" },
      { trait: "安定性", value: "広い骨盤", detail: "低重心で安定した歩行が可能" }
    ],
    image: "images/homalocephale.webp"
  },
  {
    id: "hyperodapedon",
    name: "ハイペロダペドン",
    kana: "はいぺろだぺどん",
    scientificName: "Hyperodapedon",
    era: "三畳紀後期",
    region: "全世界",
    diet: "草食",
    length: "1.3m",
    weight: "50kg",
    description: "三畳紀に繁栄したリンコサウルス類。嘴のような口と、植物をすりつぶすのに特化したプレート状の歯を持つ。",
    bioTraits: [
      { trait: "採食", value: "特殊な嘴", detail: "硬い種子や植物を砕くための強力な顎" },
      { trait: "生存戦略", value: "爆発的繁栄", detail: "三畳紀後期の主要な草食動物だった" }
    ],
    image: "images/hyperodapedon.webp"
  },
  {
    id: "dimetrodon",
    name: "ディメトロドン",
    kana: "でぃめとろどん",
    scientificName: "Dimetrodon",
    era: "ペルム紀前期",
    region: "北アメリカ・ヨーロッパ",
    diet: "肉食",
    length: "3.5m",
    weight: "250kg",
    description: "背中の巨大な帆が特徴的な単弓類。恐竜ではなく、爬虫類よりも哺乳類に近い系統（哺乳類型爬虫類）に属する。",
    bioTraits: [
      { trait: "構造", value: "熱調節の帆", detail: "背中の帆で太陽光を浴び体温を上げた" },
      { trait: "捕食武器", value: "二種類の歯", detail: "切り裂き用と保持用の異なる形状の歯" }
    ],
    image: "images/dimetrodon.webp"
  },
  {
    id: "inostrancevia",
    name: "イノストランケビア",
    kana: "いのすとらんけびあ",
    scientificName: "Inostrancevia",
    era: "ペルム紀後期",
    region: "アジア（ロシア）",
    diet: "肉食",
    length: "3.5m",
    weight: "300kg",
    description: "ペルム紀末の頂点捕食者であるゴルゴノプス類。巨大な犬歯を持ち、当時の大型草食動物を狩っていた。",
    bioTraits: [
      { trait: "攻撃", value: "サーベルタイガー状の牙", detail: "厚い皮を貫く巨大な牙" },
      { trait: "脚力", value: "高い", detail: "初期の単弓類としては直立に近い脚配置" }
    ],
    image: "images/inostrancevia.webp"
  },
  {
    id: "postosuchus",
    name: "ポストスクス",
    kana: "ぽすとすくす",
    scientificName: "Postosuchus",
    era: "三畳紀後期",
    region: "北アメリカ",
    diet: "肉食",
    length: "4.0m",
    weight: "300kg",
    description: "三畳紀の陸上に君臨した巨大な擬鰐類。ワニに近い系統だが、二足歩行も可能で、当時の初期の恐竜たちを圧倒していた。",
    bioTraits: [
      { trait: "武器", value: "強力な顎", detail: "ワニのような骨を砕く顎の力" },
      { trait: "機動力", value: "二足・四足", detail: "大型の体躯を支える強力な後肢" }
    ],
    image: "images/postosuchus.webp"
  },
  {
    id: "desmatosuchus",
    name: "デスマトスクス",
    kana: "ですまとすくす",
    scientificName: "Desmatosuchus",
    era: "三畳紀後期",
    region: "北アメリカ",
    diet: "草食",
    length: "4.5m",
    weight: "500kg",
    description: "全身を棘と装甲板で覆った草食の擬鰐類。肩に非常にながい棘があり、肉食動物からの防御に役立っていた。",
    bioTraits: [
      { trait: "防御", value: "ショルダー・スパイク", detail: "横からの攻撃を防ぐ巨大な棘" },
      { trait: "装甲", value: "骨質板", detail: "全身を覆うリベット状の鎧" }
    ],
    image: "images/desmatosuchus.webp"
  }
];

const NEWS = [
  {
    id: "news-005",
    date: "2026.04.10",
    category: "DB-UPDATE",
    title: "鳥脚類・ハドロサウルス類アーカイブを更新",
    summary: "エドモントサウルスやマイアサウラを含む、北米・豪州・アジアの代表的なハドロサウルス類・鳥脚類8種が完全統合されました。生態展示シミュレーターで比較可能です。",
    securityLevel: "LEVEL 2"
  },
  {
    id: "news-004",
    date: "2026.04.10",
    category: "DB-UPDATE",
    title: "アンキロサウルス類アセットの完全統合が完了",
    summary: "鎧竜・装甲恐竜グループの6種（サイカニア、ミンミ等）の高解像度復元画像がデータベースに反映されました。これにより総登録種数は134種に達しました。",
    securityLevel: "LEVEL 1"
  },
  {
    id: "news-001",
    date: "2026.03.15",
    category: "RESEARCH",
    title: "T-Rexの神経系スキャン解析が完了",
    summary: "最新の人工知能を用いたCTスキャンにより、ティラノサウルスの脳構造が再構築されました。結果、従来考えられていたよりも数倍複雑な社会性を持っていた可能性が浮上しています。",
    securityLevel: "LEVEL 3"
  },
  {
    id: "news-002",
    date: "2026.02.28",
    category: "DISCOVERY",
    title: "南極圏で未知の小型獣脚類を発見",
    summary: "氷床の下から保存状態の良い骨格が発掘。マイナス数十度の極寒でも活動可能だった可能性があり、内温性（温血性）の証拠として注目を浴びています。",
    securityLevel: "LEVEL 2"
  },
  {
    id: "news-003",
    date: "2026.01.10",
    category: "TECHNOLOGY",
    title: "軟組織保存プロトコルのアップデート",
    summary: "琥珀内部の微量な血液成分からDNA断片を抽出し、当時の生態系をデジタルシミュレートする「Nexus-Project」がフェーズ4に移行しました。",
    securityLevel: "LEVEL 5 (TOP SECRET)"
  }
];

export { DINOSAURS, NEWS };
