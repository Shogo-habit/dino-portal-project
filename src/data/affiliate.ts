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
        id: "default_battle_book",
        title: "恐竜最強王図鑑　（最強王図鑑シリーズ）",
        subtitle: "恐竜たちがトーナメント戦で最強の座を争うバトルシミュレーション図鑑",
        type: "book",
        badgeText: "ARCHIVAL BOOK",
        imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/5714/9784052045714.jpg?_ex=300x300",
        affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4052045716"),
        priceText: "PRICE: ¥968 (税込)",
        details: ["バトルシミュレーション形式", "トーナメント対決構成", "小学生に大人気の読書入門書"],
        rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F14546615%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F18265139%2F",
        impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
    },
    {
        id: "default_book",
        title: "小学館の図鑑NEO [新版] 恐竜 DVD付き",
        subtitle: "最新の学説に基づいた決定版恐竜図鑑、映像コンテンツ同梱",
        type: "book",
        badgeText: "ARCHIVAL BOOK",
        imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/3118/9784092173118_1_24.jpg?_ex=300x300",
        affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4092173111"),
        priceText: "PRICE: ¥2,200 (税込)",
        details: ["最新恐竜データ400種以上", "ドラえもんコラボDVD付き", "教育的学習アーカイブに最適"],
        rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F12781560%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F16942437%2F",
        impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
    },
    {
        id: "default_goods",
        title: "アニア 恐竜バトルキングダム",
        subtitle: "白熱のバトルを楽しめる、アニアシリーズ最大の恐竜プレイセット",
        type: "goods",
        badgeText: "INTERACTIVE TOY",
        imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/edion/cabinet/goods/ll/img_184/4904810399995_ll.jpg?_ex=300x300",
        affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B07BL2B9SM"),
        priceText: "PRICE: ¥6,380 (税込)",
        details: ["タカラトミー公式", "バトルギミック搭載マップ", "ティラノサウルス(ワイルドVer.)付属"],
        rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fedion%2F4904810399995%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fedion%2Fi%2F10484925%2F",
        impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
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
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/morushop/cabinet/r_2025010236/20250102085147_88_1.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B00C74YAXC"),
            priceText: "PRICE: ¥1,100 (税込)",
            details: ["タカラトミー公式", "角と首・後脚が可動", "ラージサイズ定番モデル"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fmorushop%2F20250102085147_88%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fmorushop%2Fi%2F10049421%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        },
        {
            id: "triceratops_book",
            title: "小学館の図鑑NEO [新版] 恐竜 DVD付き",
            subtitle: "最新の学説に基づいた決定版恐竜図鑑、映像コンテンツ同梱",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/3118/9784092173118_1_24.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4092173111"),
            priceText: "PRICE: ¥2,200 (税込)",
            details: ["最新恐竜データ400種以上", "ドラえもんコラボDVD付き", "教育的学習アーカイブに最適"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F12781560%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F16942437%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        }
    ],
    "spinosaurus": [
        {
            id: "spinosaurus_figure",
            title: "アニア ジュラシック・ワールド 海のモササウルス DXセット",
            subtitle: "モササウルス・スピノサウルス(B)・アクイロプスの豪華3体セット",
            type: "figure",
            badgeText: "PRECISION MODEL",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/yousay-do/cabinet/20250523y/4904810954842.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/s?k=4904810954842"),
            priceText: "PRICE: ¥2,970 (税込)",
            details: ["タカラトミー公式", "豪華恐竜3体セット", "モササウルス・スピノサウルス(B)・アクイロプスが入ったDXセット", "口・脚・尾などの可動ギミック搭載"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fyousay-do%2F4904810954842%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fyousay-do%2Fi%2F10099193%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        },
        {
            id: "spinosaurus_book",
            title: "恐竜トリケラトプスとスピノサウルス",
            subtitle: "あかちゃん恐竜をまもる巻 （たたかう恐竜たち） [ 黒川光広 ]",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/3131/9784338173131.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/s?k=9784338173131"),
            priceText: "PRICE: ¥1,430 (税込)",
            details: ["黒川光広・作絵", "たたかう恐竜たちシリーズ", "あかちゃん恐竜をまもるトリケラトプスの大冒険", "子どもたちに大人気の定番恐竜絵本"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F6519963%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F13700451%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        }
    ],
    "stegosaurus": [
        {
            id: "stegosaurus_figure",
            title: "アニア AL-03 ステゴサウルス",
            subtitle: "背中に立ち並ぶ骨板と、尾の鋭いスパイク（サゴマイザー）をリアルに再現",
            type: "figure",
            badgeText: "PRECISION MODEL",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/edion/cabinet/goods/ll/img_131/4904810496281_ll.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B085MS8V7M"),
            priceText: "PRICE: ¥1,100 (税込)",
            details: ["タカラトミー公式", "ラージサイズアニア", "首とスパイク付き尾が可動"],
            rakutenAffiliateUrl: buildRakutenAffiliateUrl("アニア AL-03 ステゴサウルス"),
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
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
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/3118/9784092173118_1_24.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4092173111"),
            priceText: "PRICE: ¥2,200 (税込)",
            details: ["掲載種数：約400種", "特典：ドラえもんDVD（約70分）", "実物化石写真が豊富"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F12781560%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F16942437%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        },
        {
            id: "book_move",
            title: "講談社の動く図鑑MOVE 恐竜 [新訂二版] DVD付き",
            subtitle: "躍動感あふれるイラストと、戦う恐竜たちのダイナミックな姿",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9678/9784065369678.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4065369676"),
            priceText: "PRICE: ¥2,200 (税込)",
            details: ["掲載種数：約320種", "特典：NHKスペシャルDVD（約60分）", "大迫力の戦闘イラスト"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F17998141%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F21381007%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        },
        {
            id: "book_live",
            title: "学研の図鑑LIVE 恐竜 新版 DVD付き",
            subtitle: "スマホをかざすと3D恐竜が飛び出す、最先端のAR体験図鑑",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/1845/9784052051845_1_2.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4052051848"),
            priceText: "PRICE: ¥2,420 (税込)",
            details: ["掲載種数：約350種", "特典：BBCドキュメンタリーDVD（約50分）", "スマホ連動のAR機能搭載"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F17125134%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F20648276%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        }
    ],
    "dinosaur-eras-guide": [
        {
            id: "dinosaur_eras_get",
            title: "角川の集める図鑑GET！ 恐竜",
            subtitle: "「どっちが強い!?」のキャラクターと旅する、生息年代・地域別の新型ビジュアル図鑑",
            type: "book",
            badgeText: "AGE & REGION GUIDE",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0572/9784041090572.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4041090577"),
            priceText: "PRICE: ¥2,200 (税込)",
            details: ["小林快次先生監修", "生息年代と地域ごとに紹介", "考える力を育むナゾトキ図鑑"],
            rakutenAffiliateUrl: buildRakutenAffiliateUrl("角川の集める図鑑GET！ 恐竜"),
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        },
        {
            id: "dinosaur_eras_island",
            title: "アニア 合体！巨大！大乱闘！恐竜探検島",
            subtitle: "火山・闘技場・崖が一体となった巨大プレイマップ＆合体ギミックトイ",
            type: "goods",
            badgeText: "DYNAMIC PLAYSET",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/edion/cabinet/goods/ll/img_203/4904810155218_ll.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/B085MTFTQ4"),
            priceText: "PRICE: ¥7,480 (税込)",
            details: ["幅1m超の巨大探検マップ", "巨大ティラノサウルス合体機構", "アニア恐竜シリーズ最大級"],
            rakutenAffiliateUrl: buildRakutenAffiliateUrl("アニア 合体！恐竜探検島"),
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        },
        {
            id: "dinosaur_eras_book_neo",
            title: "小学館の図鑑NEO [新版] 恐竜 DVD付き",
            subtitle: "最新の学説に基づいた決定版恐竜図鑑、映像コンテンツ同梱",
            type: "book",
            badgeText: "ARCHIVAL BOOK",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/3118/9784092173118_1_24.jpg?_ex=300x300",
            affiliateUrl: buildAffiliateUrl("https://www.amazon.co.jp/dp/4092173111"),
            priceText: "PRICE: ¥2,200 (税込)",
            details: ["最新恐竜データ400種以上", "ドラえもんコラボDVD付き", "教育的学習アーカイブに最適"],
            rakutenAffiliateUrl: "https://af.moshimo.com/af/c/click?a_id=5603988&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F12781560%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F16942437%2F",
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        }
    ],
    "dinosaur-size-ranking": [
        {
            id: "ania_brachiosaurus",
            title: "アニア AL-04 ブラキオサウルス",
            subtitle: "首と長いしっぽが動く！ラージサイズのアニア定番巨大恐竜フィギュア",
            type: "figure",
            badgeText: "PRECISION MODEL",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/yamada-denki/cabinet/a07000135/7597417013.jpg?_ex=300x300",
            affiliateUrl: buildRakutenAffiliateUrl("アニア AL-04 ブラキオサウルス"),
            priceText: "PRICE: ¥1,100 (税込)",
            details: ["タカラトミー公式", "首・尻尾が連動可動", "ラージサイズ定番モデル"],
            rakutenAffiliateUrl: buildRakutenAffiliateUrl("アニア AL-04 ブラキオサウルス"),
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        },
        {
            id: "favorite_brachiosaurus_vinyl",
            title: "フェバリット｜Favorite 恐竜 ブラキオサウルス ビニールモデル",
            subtitle: "全長約49cm！軽くて丈夫なソフビ製で、圧倒的迫力と安全性を両立した巨大モデル",
            type: "figure",
            badgeText: "SOFT VINYL MODEL",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/biccamera/cabinet/product/2975/00000002388316_a01.jpg?_ex=300x300",
            affiliateUrl: buildRakutenAffiliateUrl("フェバリット ブラキオサウルス"),
            priceText: "PRICE: ¥1,760 (税込)",
            details: ["古生物造形家・荒木一成氏監修", "全長約49cmのビッグサイズ", "柔らかいソフビ素材で安全・頑丈"],
            rakutenAffiliateUrl: buildRakutenAffiliateUrl("フェバリット ブラキオサウルス"),
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        }
    ],
    "mosasaurus": [
        {
            id: "mattel_mosasaurus",
            title: "マテル ジュラシック・ワールド スーパービッグ! モササウルス",
            subtitle: "全長約99cmの超巨大スケール！口を開けて別売りのミニフィギュアを飲み込める大迫力フィギュア",
            type: "figure",
            badgeText: "SUPER BIG FIGURE",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0620/0194735270620.jpg?_ex=300x300",
            affiliateUrl: buildRakutenAffiliateUrl("マテル ジュラシックワールド モササウルス"),
            priceText: "PRICE: オープン価格",
            details: ["全長約99cmの大迫力サイズ", "ミニフィギュアを飲み込むギミック搭載", "お腹を開けると飲み込んだフィギュアが出てくる構造"],
            rakutenAffiliateUrl: buildRakutenAffiliateUrl("マテル ジュラシックワールド モササウルス"),
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        },
        {
            id: "lego_mosasaurus",
            title: "レゴ(LEGO) ジュラシック・ワールド モササウルス 76974",
            subtitle: "レゴ ジュラシック・ワールドシリーズ！可動関節付きのモササウルスを組み立てられるブロックセット",
            type: "goods",
            badgeText: "LEGO TOY",
            imageUrl: "https://thumbnail.image.rakuten.co.jp/@0_mall/benelic-lcs/cabinet/jurassicworld/76974_01.jpg?_ex=300x300",
            affiliateUrl: buildRakutenAffiliateUrl("レゴ モササウルス"),
            priceText: "PRICE: オープン価格",
            details: ["組み立て式のリアルなモササウルスフィギュア", "関節可動で様々な遊泳ポーズを再現可能", "レゴ公式ジュラシック・ワールドセット"],
            rakutenAffiliateUrl: buildRakutenAffiliateUrl("レゴ モササウルス"),
            impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5603988&p_id=54&pc_id=54&pl_id=616"
        }
    ]
};
