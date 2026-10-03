# 古生物学プロンプト生成ガイドライン (PALEO_PROMPT_GUIDELINES.md)

本ガイドラインは、恐竜ウェブサイトにおける**「マイナー恐竜・古生物のイラストおよび骨格側面図」**を生成するにあたり、画像生成AIが持つメジャー恐竜へのバイアス（引きずられ・ハルシネーション）を完全に排除し、細部の解剖学的特徴を正確に再現するための学術的プロンプト設計原則を定めたものです。

---

## 1. なぜマイナー恐竜で破綻するのか？（問題の構造）

画像生成AIは、ティラノサウルス、トリケラトプス、ステゴサウルス、ブラキオサウルス、ヴェロキラプトル等の**「超有名恐竜（メジャー恐竜）」**の学習データに大きく偏重しています。
そのため、マイナー恐竜の名前だけを入力すると、以下のような深刻な描写エラー（バイアス引きずられ）が自動的に発生します：

1. **名前の語感・接尾辞による引きずられ**:
   - 例: 「〜ケラトプス」と聞くと、小型・原始的で角がない種（アルバロフォサウルス、インシシボサウルス等）であっても、勝手にトリケラトプスのような「巨大な首のフリル」や「目の上の長い角」を描いてしまう。
   - 例: 「〜サウルス」や肉食恐竜と聞くと、細身・軽量な小型獣脚類であっても、勝手にティラノサウルスのような「巨大で重厚な頭骨」「2本指の前肢」にしてしまう。
2. **ステレオタイプな姿勢の押し付け**:
   - 二足歩行恐竜を怪獣立ち（ゴジラ立ち / 尾を引きずり背筋が起立した古い復元）にしてしまう。現代の古生物学で標準の**「水平前傾姿勢（背骨と尾が地面と平行）」**が無視される。
3. **固有の細部形質（Autapomorphies）の欠落**:
   - オウムのような嘴、尾の上の剛毛、頬骨棘、独特な指の本数（1本指や4本指など）、特殊な羽毛構造などが描かれない。

---

## 2. 古生物学的リサーチ（必須ステップ）

エージェントは、画像生成プロンプトを作成する前に、必ず以下のチェックリストに沿って対象古生物の学術データを調査・分解（Dissection）しなければなりません。

### リサーチチェックリスト
- [ ] **正確な学名（Scientific Name） & 模式種**: 例: *Albalophosaurus yamaguchiorum*
- [ ] **系統分類群（Clade / Family）**: 例: 角竜類（Ceratopsia）原始的系統 / プシッタコサウルス近縁
- [ ] **生息年代と層群**: 例: 白亜紀前期（ベリアシアン〜バレミアン）、手取層群
- [ ] **発見化石の部位（Fossil Material）**: 頭骨下顎、歯、不完全骨格など
- [ ] **成体の推定サイズ**: 全長（Length）、体高（Height）、推定体重（Weight）
- [ ] **アスペクト比（全長 : 体高）**: 例: 2.4:1（全長1.5m / 体高0.6m）
- [ ] **姿勢と歩行様式**: 二足歩行（bipedal）、四足歩行（quadrupedal）、水平前傾姿勢（forward-leaning horizontal posture）
- [ ] **固有の解剖学的特徴（Distinctive Features）**:
  - 頭部・顎・嘴: オウムのような鋭い嘴、頬骨棘（jugal horn/spike）
  - 体表・外皮: 鱗、繊維状羽毛、尾の剛毛（quill-like bristles）
  - 前肢・後肢・指: 前肢の長さ比、指の本数
  - 尾: 長さ、剛毛の有無、骨塊・トゲの有無

---

## 3. バイアス排除プロンプト設計（Negative Bias Prevention）

プロンプト内には、**「対象が何であるか」**だけでなく、**「何であってはならないか（メジャー恐竜の特徴の明示的否定）」**を強力に組み込みます。

### 代表的な系統別バイアス排除パターン

#### A. 原始的・小型角竜類（アルバロフォサウルス、プシッタコサウルス、カオヤンゴサウルス等）
- **排除すべき誤り**: トリケラトプスのような巨大なフリル、角、重厚な四足歩行
- **記述キーワード**:
  > `bipedal stance, nimble two-legged posture, small parrot-like keratinous beak, prominent lateral cheek horns (jugal spikes), slender body, a distinct row of tall stiff quill-like bristles along the upper tail. NOT a Triceratops, NO giant neck frill, NO long brow horns, NO quadrupedal rhino-like body.`

#### B. 小型・スレンダーな獣脚類（トロオドン類、オルニトミモサウルス類、エラフロサウルス等）
- **排除すべき誤り**: ティラノサウルスの重厚な頭骨、2本指、ジュラシックパーク風の怪獣立ち
- **記述キーワード**:
  > `slender elongated body, dynamic horizontal running posture with spine and tail strictly parallel to the ground, small streamlined skull, three slender clawed fingers (NOT two fingers), avian plumage and primitive feather filaments. NOT a Tyrannosaurus rex, NOT a heavy bulky predator, NO upright Godzilla stance.`

#### C. 特殊な竜脚形類（短首型ディクラエオサウルス科、トゲ付きスピノフォロサウルス等）
- **排除すべき誤り**: ブラキオサウルスのような直立した超長首、スピノサウルスのような肉食背びれ
- **記述キーワード**:
  > `quadrupedal sauropod, uniquely short and low neck held horizontally, elongated whip-like tail, high bifurcated neural spines on neck, defensive spikes on tail tip. NOT a Spinosaurus (no carnivorous head, no predatory sail), NOT a tall Brachiosaurus.`

#### D. 特殊な鳥盤類・装甲竜（レソトサウルス、クリンダドロメウス、初期ノドサウルス類等）
- **排除すべき誤り**: アンキロサウルスの巨大尾ハンマー（原始的ノドサウルス類には無い）、羽毛の欠落
- **記述キーワード**:
  > `small agile bipedal ornithischian, covering of dense filamentous proto-feathers on torso, scaled tail and lower legs, small neat herbivorous head. NO tail club, NO giant predator features.`

---

## 4. プロンプト構成テンプレート

### 1. メインイラスト用プロンプト (Main Visual: `images/${id}.webp`)

```text
Scientific illustration of a [Scientific Name], a [Dinosaur Group / Clade] dinosaur.
Anatomical details: [Precise anatomical features: beak, cheek spikes, quill bristles, fingers, horizontal posture, realistic skin/feather texture].
Anti-bias negative details: [NOT a Major Dinosaur, NO specific erroneous features].
Habitat & Environment: Depicted in its authentic prehistoric [Era] habitat of [Region], surrounded by ancient [Flora: ferns, cycads, ginkgos, primitive conifers], under natural daylight with soft atmospheric perspective.
Art Style: 19th-century vintage naturalist encyclopedia illustration, high-quality watercolor and delicate ink wash, fine detailed outlines, realistic textures, scientifically accurate proportions.
Composition: Centered in a 1:1 square frame, full body clearly visible from head to tail, full bleed natural environment.
Constraints: No modern elements, no digital HUD, no glowing parts, no text, no borders, no labels.
```

### 2. サイバー骨格側面図用プロンプト (Cyber Specimen: `images/cyber/${id}.webp`)

```text
A sleek, futuristic cybernetic skeleton profile of a [Scientific Name].
Anatomical & Skeletal specification: [Exact skeletal details: skull shape, vertebrae, limb proportions, pose: strict horizontal forward-leaning posture, tail held straight horizontally].
Anti-bias negative details: [NOT a Major Dinosaur skeleton, NO erroneous crest/horns/teeth].
Proportions: Strict length-to-height aspect ratio of roughly [Ratio: e.g., 2.5:1 / 3.0:1], highly elongated and horizontally balanced.
Style: Pure side profile view (lateral profile, facing left). White holographic bone structure made of razor-sharp glowing white neon lines on a solid pure black background (#000000). Minimalist digital blueprint vector graphic.
Framing: Centered inside a 1:1 square frame, full body completely visible from snout to tail tip, generous transparent-safe margin on both left and right sides to prevent any clipping of head or tail.
Constraints: No grid lines, no UI interfaces, no text, no ground plane, no glowing fog/aura, razor-sharp clean edges.
```

---

## 5. 後処理と検証の自動連携

生成された画像は、必ず以下のスクリプトパイプラインを順に通して完成させます。

1. **メインイラスト処理**:
   ```bash
   node scripts/process_main_asset.cjs <input_image> <dino_id>
   ```
2. **サイバー骨格処理（透過・AIマーク削除・正方形化・接地走査）**:
   ```bash
   node scripts/process_cyber_asset.cjs <input_image> <dino_id>
   ```
3. **図鑑マークダウン作成**:
   ```bash
   node scripts/create_dino_entry.cjs <dino_data_json>
   ```
4. **ビルド検証**:
   ```bash
   npm run build
   ```
