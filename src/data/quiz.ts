export interface QuizSpecimen {
    id: string;
    name: string;
    zoom: number;
    originX: string;
    originY: string;
    featureName: string; // クイズでフォーカスする特徴的な部位の名称
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
}

export const QUIZ_SPECIMENS: QuizSpecimen[] = [
    {
        id: "tyrannosaurus",
        name: "ティラノサウルス",
        zoom: 3.5,
        originX: "18%",
        originY: "48%",
        featureName: "骨を噛み砕くための強大な顎と鋭い牙",
        difficulty: "beginner"
    },
    {
        id: "triceratops",
        name: "トリケラトプス",
        zoom: 3.5,
        originX: "15%",
        originY: "50%",
        featureName: "敵を威嚇し自衛するための強靭な角と襟飾り（フリル）",
        difficulty: "beginner"
    },
    {
        id: "spinosaurus",
        name: "スピノサウルス",
        zoom: 3.8,
        originX: "50%",
        originY: "45%",
        featureName: "背中にそびえる大きな帆（神経棘）",
        difficulty: "beginner"
    },
    {
        id: "stegosaurus",
        name: "ステゴサウルス",
        zoom: 3.8,
        originX: "52%",
        originY: "40%",
        featureName: "背中に対になって並ぶ独特な骨板",
        difficulty: "beginner"
    },
    {
        id: "ankylosaurus",
        name: "アンキロサウルス",
        zoom: 3.8,
        originX: "90%",
        originY: "50%",
        featureName: "骨を砕く破壊力を持つ尾の先端のハンマー",
        difficulty: "beginner"
    },
    {
        id: "velociraptor",
        name: "ヴェロキラプトル",
        zoom: 4.0,
        originX: "45%",
        originY: "60%",
        featureName: "獲物の急所を執拗に狙うための後肢の巨大な鉤爪",
        difficulty: "beginner"
    },
    {
        id: "allosaurus",
        name: "アロサウルス",
        zoom: 3.5,
        originX: "20%",
        originY: "45%",
        featureName: "目の上にある小さな角状のコブと捕食用の頭部",
        difficulty: "beginner"
    },
    {
        id: "brachiosaurus",
        name: "ブラキオサウルス",
        zoom: 3.8,
        originX: "18%",
        originY: "20%",
        featureName: "高所の植物を食べるための極めて長い首と小さな頭部",
        difficulty: "beginner"
    },
    {
        id: "mosasaurus",
        name: "モササウルス",
        zoom: 3.5,
        originX: "20%",
        originY: "52%",
        featureName: "カメの甲羅をも砕く強力な咬合力を持つ頭部",
        difficulty: "beginner"
    },
    {
        id: "iguanodon",
        name: "イグアノドン",
        zoom: 3.8,
        originX: "30%",
        originY: "58%",
        featureName: "自衛武器として使われた親指の鋭いスパイク",
        difficulty: "beginner"
    },
    {
        id: "parasaurolophus",
        name: "パラサウロロフス",
        zoom: 3.8,
        originX: "22%",
        originY: "42%",
        featureName: "音を響かせて仲間と通信するための後方に伸びるトサカ",
        difficulty: "beginner"
    },
    {
        id: "pteranodon",
        name: "プテラノドン",
        zoom: 3.5,
        originX: "35%",
        originY: "45%",
        featureName: "飛行時の舵やディスプレイの役割を持った頭部後方のトサカ",
        difficulty: "beginner"
    },
    {
        id: "quetzalcoatlus",
        name: "ケツァルコアトルス",
        zoom: 3.5,
        originX: "25%",
        originY: "40%",
        featureName: "地上で獲物を捕らえるための非常に長いクチバシ",
        difficulty: "beginner"
    },
    {
        id: "therizinosaurus",
        name: "テリジノサウルス",
        zoom: 3.8,
        originX: "28%",
        originY: "52%",
        featureName: "長さ1メートルに達する史上最大級の大鎌のような前肢の爪",
        difficulty: "beginner"
    },
    {
        id: "pachycephalosaurus",
        name: "パキケファロサウルス",
        zoom: 3.8,
        originX: "18%",
        originY: "42%",
        featureName: "頭突きやディスプレイに使われた厚さ25cmに達する分厚い頭骨",
        difficulty: "beginner"
    },
    {
        id: "carnotaurus",
        name: "カルノタウルス",
        zoom: 3.8,
        originX: "25%",
        originY: "40%",
        featureName: "目の上にある2本の鋭い角",
        difficulty: "intermediate"
    },
    {
        id: "elasmosaurus",
        name: "エラスモサウルス",
        zoom: 3.5,
        originX: "25%",
        originY: "35%",
        featureName: "70個以上の骨からなる極めて長い首",
        difficulty: "intermediate"
    },
    {
        id: "fukuisaurus",
        name: "フクイサウルス",
        zoom: 3.8,
        originX: "22%",
        originY: "48%",
        featureName: "植物を効率よくすりつぶすための頑丈な上顎と歯",
        difficulty: "intermediate"
    },
    {
        id: "giganotosaurus",
        name: "ギガノトサウルス",
        zoom: 3.5,
        originX: "22%",
        originY: "45%",
        featureName: "肉を切り裂くのに適した薄く鋭い歯が並ぶ巨大な頭部",
        difficulty: "intermediate"
    },
    {
        id: "oviraptor",
        name: "オヴィラプトル",
        zoom: 3.8,
        originX: "25%",
        originY: "40%",
        featureName: "卵や木の実を砕くための歯のない強力なくちばし",
        difficulty: "intermediate"
    },
    {
        id: "dilophosaurus",
        name: "ディロフォサウルス",
        zoom: 3.8,
        originX: "22%",
        originY: "38%",
        featureName: "頭部にある一対（2本）の高く丸いトサカ",
        difficulty: "intermediate"
    },
    {
        id: "baryonyx",
        name: "バリオニクス",
        zoom: 3.8,
        originX: "32%",
        originY: "55%",
        featureName: "親指にある長さ30cmに達する巨大な鉤爪",
        difficulty: "intermediate"
    },
    {
        id: "deinocheirus",
        name: "デイノケイルス",
        zoom: 3.8,
        originX: "15%",
        originY: "48%",
        featureName: "魚などを捕らえるための平らなアヒルのようなくちばし",
        difficulty: "intermediate"
    },
    {
        id: "apatosaurus",
        name: "アパトサウルス",
        zoom: 3.8,
        originX: "85%",
        originY: "45%",
        featureName: "天敵の威嚇や攻撃に使われた鞭のような長い尾",
        difficulty: "intermediate"
    },
    {
        id: "kentrosaurus",
        name: "ケントロサウルス",
        zoom: 3.8,
        originX: "60%",
        originY: "40%",
        featureName: "背中から尾にかけて並ぶ鋭く長いトゲ（スパイク）",
        difficulty: "intermediate"
    },
    {
        id: "acrocanthosaurus",
        name: "アクロカントサウルス",
        zoom: 3.8,
        originX: "50%",
        originY: "38%",
        featureName: "背中に沿って走る特徴的な低い帆状の突起",
        difficulty: "intermediate"
    },
    {
        id: "amargasaurus",
        name: "アマルガサウルス",
        zoom: 3.8,
        originX: "30%",
        originY: "40%",
        featureName: "首から背中にかけて並ぶ2列の長い棘（きょく）",
        difficulty: "intermediate"
    },
    {
        id: "archaeopteryx",
        name: "アーケオプテリクス",
        zoom: 3.8,
        originX: "40%",
        originY: "45%",
        featureName: "鳥類への進化の過程を示す美しい羽毛",
        difficulty: "intermediate"
    },
    {
        id: "archelon",
        name: "アルケロン",
        zoom: 3.5,
        originX: "50%",
        originY: "48%",
        featureName: "現生のカメとは異なり、甲羅が皮膚で覆われていた肋骨のフレーム",
        difficulty: "intermediate"
    },
    {
        id: "dimetrodon",
        name: "ディメトロドン",
        zoom: 3.8,
        originX: "50%",
        originY: "35%",
        featureName: "体温調節やディスプレイに使われた背中の巨大な帆",
        difficulty: "intermediate"
    },
    {
        id: "diplodocus",
        name: "ディプロドクス",
        zoom: 3.8,
        originX: "82%",
        originY: "48%",
        featureName: "敵を威嚇し音速で振り回された鞭のように細長い尾の先端",
        difficulty: "advanced"
    },
    {
        id: "hadrosaurus",
        name: "ハドロサウルス",
        zoom: 3.8,
        originX: "18%",
        originY: "45%",
        featureName: "何百本もの小さな歯が隙間なく並ぶデンタルバッテリー構造の口",
        difficulty: "advanced"
    },
    {
        id: "juravenator",
        name: "ジュラベナトル",
        zoom: 3.8,
        originX: "55%",
        originY: "50%",
        featureName: "鱗と羽毛の両方の痕跡が発見された尾の付け根付近の皮膚",
        difficulty: "advanced"
    },
    {
        id: "lambeosaurus",
        name: "ランベオサウルス",
        zoom: 3.8,
        originX: "22%",
        originY: "38%",
        featureName: "音を響かせて通信したとされる特徴的な斧（コブ）状のトサカ",
        difficulty: "advanced"
    },
    {
        id: "nigersaurus",
        name: "ニジェールサウルス",
        zoom: 3.8,
        originX: "18%",
        originY: "52%",
        featureName: "地表の植物を効率よく刈り取るための横に広い掃除機のような口",
        difficulty: "advanced"
    },
    {
        id: "bajadasaurus",
        name: "バジャダサウルス",
        zoom: 3.8,
        originX: "25%",
        originY: "38%",
        featureName: "首から前向きに長く伸びる独特で巨大な棘（神経棘）",
        difficulty: "advanced"
    },
    {
        id: "psittacosaurus",
        name: "プシッタコサウルス",
        zoom: 3.8,
        originX: "18%",
        originY: "42%",
        featureName: "木の実を砕くための頑丈なオウム状の嘴（くちばし）",
        difficulty: "advanced"
    },
    {
        id: "carcharodontosaurus",
        name: "カルカロドントサウルス",
        zoom: 3.8,
        originX: "22%",
        originY: "45%",
        featureName: "獲物の肉を切り裂くのに適した薄くギザギザなサメのような歯",
        difficulty: "advanced"
    },
    {
        id: "gigantspinosaurus",
        name: "ギガントスピノサウルス",
        zoom: 3.8,
        originX: "42%",
        originY: "45%",
        featureName: "肩から後方に向かって長く突き出した巨大な一対の棘（肩甲棘）",
        difficulty: "advanced"
    },
    {
        id: "utahraptor",
        name: "ユタラプトル",
        zoom: 3.8,
        originX: "45%",
        originY: "62%",
        featureName: "獲物の急所を狙い突き刺すための後肢にある20cm以上の巨大な鉤爪",
        difficulty: "advanced"
    },
    {
        id: "wuerhosaurus",
        name: "ウエルホサウルス",
        zoom: 3.8,
        originX: "48%",
        originY: "42%",
        featureName: "ステゴサウルス類に比べて低く丸みを帯びた形状の骨板",
        difficulty: "advanced"
    },
    {
        id: "xenoceratops",
        name: "クセノケラトプス",
        zoom: 3.8,
        originX: "20%",
        originY: "45%",
        featureName: "襟飾り（フリル）の端から突き出る巨大なスパイク状の角",
        difficulty: "advanced"
    },
    {
        id: "yutyrannus",
        name: "ユティラヌス",
        zoom: 3.5,
        originX: "45%",
        originY: "48%",
        featureName: "寒冷な気候から身を守るために発達した全身を覆う羽毛の痕跡",
        difficulty: "advanced"
    },
    {
        id: "zuniceratops",
        name: "ズニケラトプス",
        zoom: 3.8,
        originX: "22%",
        originY: "45%",
        featureName: "角竜類の進化の鍵を握る、目の上（眉上）に発達した一対の角",
        difficulty: "advanced"
    },
    {
        id: "argentinosaurus",
        name: "アルゼンチノサウルス",
        zoom: 3.5,
        originX: "28%",
        originY: "55%",
        featureName: "超巨大な質量を支えるために発達した太い柱のような前肢",
        difficulty: "advanced"
    },
    {
        id: "sasayamagnomus",
        name: "ササヤマグノームス",
        zoom: 3.8,
        originX: "18%",
        originY: "48%",
        featureName: "角竜類の進化を示す小さな吻部と原始的なオウム状のクチバシ",
        difficulty: "master"
    },
    {
        id: "fukuivenator",
        name: "フクイベナトル",
        zoom: 3.5,
        originX: "22%",
        originY: "45%",
        featureName: "鳥類に似た二股に分かれた鎖骨や、肉食・草食両方の特徴を持つ頭部",
        difficulty: "master"
    },
    {
        id: "borealopelta",
        name: "ボレアロペルタ",
        zoom: 3.8,
        originX: "20%",
        originY: "45%",
        featureName: "ほぼ生前の立体的な形状を保ったまま化石化した、頭部から肩にかけての頑丈なスパイクと装甲",
        difficulty: "master"
    },
    {
        id: "dunkleosteus",
        name: "ダンクレオステウス",
        zoom: 3.5,
        originX: "25%",
        originY: "50%",
        featureName: "歯の代わりにナイフのように機能した、強力な頭甲の一部である鋭い骨質の顎板",
        difficulty: "master"
    },
    {
        id: "sarcosuchus",
        name: "サルコスクス",
        zoom: 3.5,
        originX: "15%",
        originY: "52%",
        featureName: "獲物を捕食するために肥大化した、スコップ状の吻部（口先）の先端部分",
        difficulty: "master"
    },
    {
        id: "tanystropheus",
        name: "タニストロフェウス",
        zoom: 3.2,
        originX: "30%",
        originY: "40%",
        featureName: "全長の半分以上を占め、頸椎自体が一つずつ非常に長く伸びた極端な首",
        difficulty: "master"
    },
    {
        id: "leedsichthys",
        name: "リードシクティス",
        zoom: 3.2,
        originX: "25%",
        originY: "48%",
        featureName: "海水中のプランクトンを効率よく濾過するための、頭部にある巨大なエラ（鰓）の構造",
        difficulty: "master"
    },
    {
        id: "tapejara",
        name: "タペヤラ",
        zoom: 3.5,
        originX: "28%",
        originY: "40%",
        featureName: "頭頂部にそびえ立つ、骨質と皮膚の膜からなる巨大な帆状のトサカ",
        difficulty: "master"
    },
    {
        id: "mamenchisaurus",
        name: "マメンチサウルス",
        zoom: 3.2,
        originX: "20%",
        originY: "30%",
        featureName: "長い首の竜脚類の中でも群を抜いて長く、体長の約半分にも達する驚異的な首",
        difficulty: "master"
    },
    {
        id: "concavenator",
        name: "コンカベナトル",
        zoom: 3.8,
        originX: "58%",
        originY: "40%",
        featureName: "背中（腰の上部）にラクダのコブのようにそびえ立つ、三角形の奇妙な骨の隆起",
        difficulty: "master"
    },
    {
        id: "fukuiraptor",
        name: "フクイラプトル",
        zoom: 3.8,
        originX: "40%",
        originY: "58%",
        featureName: "獲物を捕らえるために非常に大きく発達した、強力な前肢の鋭い鉤爪",
        difficulty: "master"
    },
    {
        id: "futabasaurus",
        name: "フタバサウルス",
        zoom: 3.5,
        originX: "45%",
        originY: "65%",
        featureName: "日本で発見された代表的な首長竜の、水中を羽ばたくように泳ぐための巨大な四肢のヒレ",
        difficulty: "master"
    },
    {
        id: "kamuysaurus",
        name: "カムイサウルス",
        zoom: 3.5,
        originX: "20%",
        originY: "45%",
        featureName: "日本国内でほぼ全身の骨格が発見された、ハドロサウルス科に見られる特徴的な頭部構造",
        difficulty: "master"
    },
    {
        id: "deinosuchus",
        name: "デイノスクス",
        zoom: 3.5,
        originX: "20%",
        originY: "50%",
        featureName: "中生代の恐竜をも水中に引きずり込んで捕食したと推測される、分厚く強大な頭骨",
        difficulty: "master"
    },
    {
        id: "titanoboa",
        name: "ティタノボア",
        zoom: 3.0,
        originX: "50%",
        originY: "50%",
        featureName: "全長13メートルを超え、獲物を締め殺すのに十分な太さを持つ史上最大のヘビの強靭な胴体",
        difficulty: "master"
    }
];
