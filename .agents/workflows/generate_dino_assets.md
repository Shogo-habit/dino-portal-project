---
description: 恐竜名を指定するだけでメインイラスト＆骨格側面図を生成・後処理・登録するワークフロー
---

# 恐竜アセット完全自動生成＆登録ワークフロー (generate_dino_assets.md)

ユーザーから「恐竜の名前（和名または学名）」を受け取った際に、マイナー恐竜のバイアス引きずられを防止しながら、メインイラストおよび比較HUD用骨格側面図を生成・加工・登録する標準手順です。

---

## 1. 入力受領
ユーザーから恐竜名（例: 「アルバロフォサウルス」「クリンダドロメウス」等）を受け取る。

---

## 2. 古生物学ディープリサーチ＆バイアス分析
以下の項目を調査し、メモをまとめます。
参照ガイドライン: [PALEO_PROMPT_GUIDELINES.md](file:///Users/kosako/kaihatsu/dinosaurs%20website/.agents/resources/PALEO_PROMPT_GUIDELINES.md)

1. **学名（Scientific Name） & 系統分類（Group / Family）**
2. **生息年代（Era） & 発見地（Region）**
3. **推定サイズ（全長 Length, 全高 Height, 体重 Weight）**
4. **固有の解剖学的特徴（Autapomorphies）**:
   - 頭部・顎・嘴（オウム状、犬歯状、平頭など）
   - 外皮・装甲（羽毛、剛毛、皮骨板など）
   - 四肢・指（前肢の長さ、指の本数、シックルクローなど）
   - 歩行様式（二足歩行 vs 四足歩行、水平前傾姿勢）
5. **【最重要】メジャー恐竜との決定的差異（Negative Bias Check）**:
   - 混同されやすいメジャー恐竜（T-rex、トリケラトプス、ラプトル等）の特徴を特定し、排除キーワード（`NOT a Triceratops, NO giant neck frill...`）を準備。

---

## 3. プロンプトの生成

### A. メインイラストプロンプト
```text
Scientific illustration of a [Scientific Name], a [Group] dinosaur.
Anatomical details: [固有の解剖学的特徴], bipedal/quadrupedal horizontal stance, realistic skin/feather textures.
Negative bias prevention: [NOT a ..., NO ...].
Habitat: In its authentic prehistoric [Era] habitat of [Region], surrounded by ancient ferns and conifers, soft natural lighting.
Art Style: 19th-century vintage naturalist book illustration, high-quality watercolor and ink wash style, fine detailed outlines.
Composition: 1:1 square frame, full body centered and visible from snout to tail tip, full bleed background.
Constraints: No modern elements, no digital overlays, no text, no borders.
```

### B. サイバー骨格側面図プロンプト
```text
A sleek, futuristic cybernetic skeleton profile of a [Scientific Name].
Anatomical & Skeletal specification: [骨格の解剖学的詳細], strict horizontal forward-leaning posture, tail parallel to ground.
Negative bias prevention: [NOT a ... skeleton, NO ...].
Proportions: Strict length-to-height aspect ratio of roughly [Ratio: e.g. 2.5:1], horizontally balanced.
Style: Pure side profile view, facing left. White holographic bone structure made of glowing white lines on a solid pure black background (#000000). Minimalist tech vector graphic, digital blueprint style.
Framing: Centered inside a 1:1 square frame, full body visible from head to tail, generous left/right margins to prevent clipping.
Constraints: No grid lines, no UI interfaces, no text, no ground plane, no glowing aura, razor-sharp outlines.
```

---

## 4. 画像生成の実行
`generate_image` ツールを用いて、2つの画像を順次生成します。

1. **メインイラスト**:
   - Prompt: メインイラストプロンプト
   - ImageName: `${id}_main`
   - AspectRatio: `1:1`
2. **サイバー骨格側面図**:
   - Prompt: サイバー骨格プロンプト
   - ImageName: `${id}_cyber`
   - AspectRatio: `1:1`

※ 生成された画像パスを取得します（例: `<appDataDir>/brain/.../artifacts/${id}_main.png`）。

---

## 5. 後処理＆自動スキャンパイプラインの実行
統合スクリプトを実行して、画像加工とマークダウン登録を一括実行します。

```bash
node -e "
const { runDinoPipeline } = require('./scripts/run_dino_pipeline.cjs');

runDinoPipeline({
  id: '${id}',
  mainImagePath: '${mainImagePath}',
  cyberImagePath: '${cyberImagePath}',
  dinoData: {
    name: '${name}',
    kana: '${kana}',
    scientificName: '${scientificName}',
    era: '${era}',
    region: '${region}',
    diet: '${diet}',
    length: '${length}',
    weight: '${weight}',
    group: '${group}',
    description: '${description}',
    bioTraits: ${JSON.stringify(bioTraits)},
    cyberMetadata: {
      realLength: ${realLength},
      realHeight: ${realHeight},
      zoom: ${zoom}
    },
    content: '${content}'
  }
}).then(res => console.log(res));
"
```

これにより以下が完全自動で行われます：
- メイン画像の高品質WebP化（`public/images/${id}.webp`）
- 骨格画像のAIマーク物理消去、背景完全透過（Alpha=0）、1:1正方形化、接地走査、透過WebP保存（`public/images/cyber/${id}.webp`）
- スキャン値（`contentHeightPx`, `bottomGap`, `sourceRes`）を反映した `src/content/dinosaurs/${id}.md` の作成

---

## 6. ビルド検証
```bash
npm run build
```
ビルドがエラーなく完了することを確認し、登録完了をユーザーに報告します。
