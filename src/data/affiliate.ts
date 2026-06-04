export interface AffiliateProduct {
    id: string;             // 商品識別ID
    title: string;          // 表示商品名
    subtitle: string;       // サブタイトル (仕様・解説など)
    type: 'figure' | 'book' | 'goods';
    badgeText: string;      // HUDバッジ (例: "PRECISION MODEL")
    imageUrl: string;       // アフィリエイト画像URL
    affiliateUrl: string;   // 紹介アフィリエイトURL
    priceText: string;      // 価格目安テキスト (例: "PRICE: ¥1,200")
    details: string[];      // 特徴スペックリスト (例: ["1/10 スケール", "関節可動式"])
    rakutenAffiliateUrl?: string; // 楽天市場用の個別アフィリエイトURL (任意)
    impressionUrl?: string;       // インプレッション計測用URL (任意)
}

// もしもアフィリエイトの広告ID。Amazonおよび楽天の提携承認後に、取得したID（7桁前後の数値。例: "1234567"）を設定します。
// ※同じ「もしもアフィリエイト」のアカウントであれば、Amazonも楽天も基本的に共通のアカウントIDになります。
export const MOSHIMO_AMAZON_ID = "";
export const MOSHIMO_RAKUTEN_ID = "5603988";

// Amazon用アフィリエイトリンク生成（旧互換名）
export function buildAffiliateUrl(amazonUrl: string): string {
    if (!MOSHIMO_AMAZON_ID) {
        return amazonUrl; // IDが未設定の場合は通常のAmazonURLを返す
    }
    const encodedUrl = encodeURIComponent(amazonUrl);
    return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_AMAZON_ID}&p_id=170&pc_id=185&pl_id=4062&url=${encodedUrl}`;
}

// 楽天市場用アフィリエイトリンク生成（検索キーワードから自動生成）
export function buildRakutenAffiliateUrl(searchQuery: string): string {
    const cleanedQuery = searchQuery.replace(/[\(\)\[\]]/g, ' ').trim(); // 記号を除去して検索精度を高める
    const defaultRakutenUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(cleanedQuery)}/`;
    if (!MOSHIMO_RAKUTEN_ID) {
        return defaultRakutenUrl; // IDが未設定の場合は通常の楽天市場の検索結果URLを返す
    }
    const encodedUrl = encodeURIComponent(defaultRakutenUrl);
    // もしもアフィリエイト楽天市場プロモーションID (p_id=54, pc_id=54, pl_id=616)
    return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_RAKUTEN_ID}&p_id=54&pc_id=54&pl_id=616&url=${encodedUrl}`;
}

// 共通フォールバック用の商品データ (個別設定がない恐竜で表示)
export const DEFAULT_AFFILIATE_PRODUCTS: AffiliateProduct[] = [
    {
        id: "default_figure",
        title: "フェバリット 恐竜 ビニールモデル プレミアムセット",
        subtitle: "迫力のやわらか恐竜フィギュア、豪華5体パック",
        type: "figure",
        badgeText: "PRECISION MODEL",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81q2vR0vMHL._AC_SL1500_.jpg",
        affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B00N1Y8682"),
        priceText: "PRICE: ¥6,600 (税込)",
        details: ["安全なソフト素材", "ティラノ/トリケラ等5体セット", "迫力のプレミアムサイズ"]
    },
    {
        id: "default_book",
        title: "小学館の図鑑NEO [新版] 恐竜 DVD付き",
        subtitle: "最新の学説に基づいた決定版恐竜図鑑、映像コンテンツ同梱",
        type: "book",
        badgeText: "ARCHIVAL BOOK",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81A1-24NACL._AC_SL1500_.jpg",
        affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4092173111"),
        priceText: "PRICE: ¥2,200 (税込)",
        details: ["最新恐竜データ400種以上", "ドラえもんコラボDVD付き", "教育的学習アーカイブに最適"]
    },
    {
        id: "default_goods",
        title: "アニア 恐竜バトルキングダム",
        subtitle: "白熱のバトルを楽しめる、アニアシリーズ最大の恐竜プレイセット",
        type: "goods",
        badgeText: "INTERACTIVE TOY",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81P-4xRjIeL._AC_SL1500_.jpg",
        affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B07BL2B9SM"),
        priceText: "PRICE: ¥6,380 (税込)",
        details: ["タカラトミー公式", "バトルギミック搭載マップ", "ティラノサウルス(ワイルドVer.)付属"]
    }
];

// 特定の主要恐竜に対する個別のアフィリエイト商品マップ
export const DINO_AFFILIATE_MAP: Record<string, AffiliateProduct[]> = {
    "tyrannosaurus": [
        {
            id: "t_rex_figure",
            title: "アニア AL-01 ティラノサウルス",
            subtitle: "口・脚・尾が可動する、ラージサイズ仕様の精密ギミックフィギュア",
            type: "figure",
            badgeText: "PRECISION MODEL",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/morushop/cabinet/r_2025010236/20250102085551_88_1.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B00C74Y9E8"),
            priceText: "PRICE: ¥1,100 (税込)",
            details: ["タカラトミー公式", "口・脚・尾がリアル可動", "ラージサイズ定番モデル"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fmorushop%2F20250102085551_88%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fmorushop%2Fi%2F10049452%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        },
        {
            id: "t_rex_book",
            title: "学研の図鑑LIVE エクストリーム ティラノサウルス",
            subtitle: "最新研究に基づき、ティラノサウルスを骨・筋肉から生態まで徹底深掘り",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/1073/9784052061073_1_2.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/405206107X"),
            priceText: "PRICE: ¥2,420 (税込)",
            details: ["1冊丸ごとティラノサウルス特化", "最新の古生物学知見を網羅", "上科約30種を完全収録"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F18330036%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F21693053%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        }
    ],
    "triceratops": [
        {
            id: "triceratops_figure",
            title: "アニア AL-02 トリケラトプス",
            subtitle: "3本の角と特徴的なフリル、首・尾が連動可動する精密フィギュア",
            type: "figure",
            badgeText: "PRECISION MODEL",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81B43c9YqyL._AC_SL1500_.jpg",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B00C74YAXC"),
            priceText: "PRICE: ¥1,100 (税込)",
            details: ["タカラトミー公式", "角と首・後脚が可動", "ラージサイズ定番モデル"]
        },
        {
            id: "triceratops_book",
            title: "どっちが強い!? トリケラトプス vs カブトムシ",
            subtitle: "盾角竜と甲虫王者の異種格闘技戦！強靭な武器の秘密を探る",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81ZtQzG%2BkeL._AC_SL1500_.jpg",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4041071417"),
            priceText: "PRICE: ¥1,078 (税込)",
            details: ["角川まんが科学シリーズ", "角の進化プロセス特集", "角竜類の生態データベース"]
        }
    ],
    "spinosaurus": [
        {
            id: "spinosaurus_figure",
            title: "アニア AL-15 スピノサウルス",
            subtitle: "背中に巨大な帆を持つ水棲恐竜。口・尾がダイナミックに可動",
            type: "figure",
            badgeText: "PRECISION MODEL",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71uVvEw67BL._AC_SL1500_.jpg",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B085MT8Q9C"),
            priceText: "PRICE: ¥1,430 (税込)",
            details: ["タカラトミー公式", "ラージサイズアニア", "口の開閉・尾の左右可動"]
        },
        {
            id: "spinosaurus_book",
            title: "恐竜の対決：スピノサウルス (学研の科学)",
            subtitle: "最新の学説から解き明かされる謎多き巨大水棲恐竜のすべて",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81A1-24NACL._AC_SL1500_.jpg", // 代替
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4092173111"),
            priceText: "PRICE: ¥2,200 (税込)",
            details: ["スピノサウルスの骨格再現", "二足歩行と四足歩行 of 論争", "最新復元図アート収録"]
        }
    ],
    "stegosaurus": [
        {
            id: "stegosaurus_figure",
            title: "アニア AL-16 ステゴサウルス",
            subtitle: "背中に対称に並ぶ骨板と、尾の鋭いスパイクをリアルに再現",
            type: "figure",
            badgeText: "PRECISION MODEL",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61r5P4rJ8AL._AC_SL1500_.jpg",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B085MS8V7M"),
            priceText: "PRICE: ¥1,430 (税込)",
            details: ["タカラトミー公式", "ラージサイズアニア", "首とスパイク付き尾が可動"]
        }
    ],
    "ankylosaurus": [
        {
            id: "ankylosaurus_figure",
            title: "アニア AL-05 アンキロサウルス",
            subtitle: "全身を覆う鎧装装甲と、ハンマー状の堅牢な尾を完全再現",
            type: "figure",
            badgeText: "PRECISION MODEL",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61B6-d6W2PL._AC_SL1500_.jpg",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B07BL1ZBLG"),
            priceText: "PRICE: ¥1,430 (税込)",
            details: ["タカラトミー公式", "ラージサイズアニア", "首とハンマー付き尾の可動"]
        }
    ],
    "dinosaur-books-selection": [
        {
            id: "book_neo",
            title: "小学館の図鑑NEO [新版] 恐竜 DVD付き",
            subtitle: "実物化石写真の多さと圧倒的な学術的信頼度を誇る決定版",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81A1-24NACL._AC_SL1500_.jpg",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4092173111"),
            priceText: "PRICE: ¥2,200 (税込)",
            details: ["掲載種数：約400種", "特典：ドラえもんDVD（約70分）", "実物化石写真が豊富"]
        },
        {
            id: "book_move",
            title: "講談社の動く図鑑MOVE 恐竜 [新訂版] DVD付き",
            subtitle: "躍動感あふれるイラストと、戦う恐竜たちのダイナミックな姿",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81+X34-tE1L._AC_SL1500_.jpg",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4065299104"),
            priceText: "PRICE: ¥2,200 (税込)",
            details: ["掲載種数：約320種", "特典：NHKスペシャルDVD（約60分）", "大迫力の戦闘イラスト"]
        },
        {
            id: "book_live",
            title: "学研の図鑑LIVE 恐竜 新版 DVD付き",
            subtitle: "スマホをかざすと3D恐竜が飛び出す、最先端のAR体験図鑑",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81F-S4j3LPL._AC_SL1500_.jpg",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4052051619"),
            priceText: "PRICE: ¥2,420 (税込)",
            details: ["掲載種数：約350種", "特典：BBCドキュメンタリーDVD（約50分）", "スマホ連動のAR機能搭載"]
        }
    ]
};
