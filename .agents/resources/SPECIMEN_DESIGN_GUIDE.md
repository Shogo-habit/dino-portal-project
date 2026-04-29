# デジタル標本デザイン定義ガイド (SPECIMEN_DESIGN_GUIDE.md)

本ドキュメントは、比較図セクションで使用する「デジタル標本（Digital Specimen）」の視覚的一貫性を維持するための定義です。アセット生成時は常にこの基準を参照してください。

## 1. コア・コンセプト
- **目的**: 比較図において恐竜の構造とサイズを直感的に伝える。
- **スタイル**: 科学的ブループリント（設計図）スタイル。
- **視認性**: 複雑な背景を排除し、骨格のラインのみに集中させる。

## 2. 視覚的仕様
- **描画対象**: 骨格（Skeletal Structure）。
- **色彩**: 黒背景（#000000）に浮かび上がる白い発光ライン。
- **アングル**: 厳密な真横（Lateral Profile）。全長比較の精度を保つため、斜め視点は禁止。
- **デコレーション**: テキスト、ラベル、地面、環境要素を一切含めない。

## 3. 生成用プロンプト構成（共通基盤）
アセット生成時は以下のプロンプトコンポーネントを組み合わせて使用します。

> "A professional scientific blueprint illustration of a [Dinosaur Name], side view profile, white glowing lines on a solid black background, minimalist digital specimen style, no text, no labels, no environment, no ground, no background elements, razor sharp detail, 4k."

## 4. 技術的要件
比較画面での「完璧な接地（Grounding）」を実現するため、以下の処理を必須とします。

- **画像のクロッピング**: 生成された正方形画像の上下左右の黒余白を完全に取り除き、恐竜の「足の裏（または体の最下点）」が画像ファイルの最下端に接するように加工する。
- **透過処理**: 実装時は `mix-blend-mode: screen` を使用し、黒背景を透過させる。
- **メタデータ管理**: `app.js` または `cyber_assets.js` において、`yOffset` を用いてベースラインとの 1px 単位の微調整を行う。

## 5. 運用ルール
- 全 150 種に対して、順次この定義に基づくアセットを生成する。
- 専用アセットが未作成の種については、同カテゴリー（獣脚類、竜脚類等）の汎用シルエットを表示する。
