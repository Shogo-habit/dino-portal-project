# 新規恐竜アセットインポート & 調整ワークフロー

新規の恐竜アセット（WebP形式）を追加する際は、以下のコマンドライン手順を順に実行し、品質基準を満たした上でリリースすること。

---

## 1. アセットの配置
ユーザーによって `images_png/cyber_webp/` または `images_png/main_webp/` に配置された新規アセットを、プロジェクト公開ディレクトリにコピーする。

```bash
# 例: cyber用の新規WebP画像をコピー
cp images_png/cyber_webp/*.webp public/images/cyber/
```

---

## 2. 背景透過 ＆ 1:1正方形加工の実行
画像生成AIの黒背景を完全に透過させ、AIマークを消去し、アスペクト比を保ったまま1:1正方形にするスクリプト `process_cyber_assets.cjs` を実行する。

*   **事前準備**:
    `scratch/process_cyber_assets.cjs` 内の `targetIds` 配列に、新規追加した恐竜のIDを追加する。
*   **実行コマンド**:
    ```bash
    node scratch/process_cyber_assets.cjs
    ```
    *(※ 既に正方形加工済みの既存画像は自動的にスキップされます。)*

---

## 3. 実体寸法の自動検出（ピクセル走査）
透過処理された画像から、接地に不可欠な「実体高さピクセル」および「下部余白ピクセル」を正確に割り出し、中間データファイル `pending_dinos_data.json` に同期させる。

```bash
node scratch/analyze_images.cjs
```
実行が成功すると、`pending_dinos_data.json` の該当データの `cyberMetadata` 部分（`contentHeightPx`, `bottomGap` 等）が自動的に最新のスキャン値に更新される。

---

## 4. 手動サイズ調整（比率決定）
もし特定の恐竜について、シミュレータ上または詳細ページ上でのサイズ拡大・縮小が必要な場合、`pending_dinos_data.json` 内の該当データを手動で書き換える。

*   **シミュレータ上で恐竜のみをサイズ調整（拡大・縮小）したい場合**:
    `contentHeightPx` の値を比率計算で変更する。
    *   **1.15倍に大きくしたい時**: `contentHeightPx = (スキャン直後の値) / 1.15`
    *   **0.8倍に小さくしたい時**: `contentHeightPx = (スキャン直後の値) / 0.8`
*   **詳細ページで人間もセットで拡大・縮小したい場合**:
    `zoom` の値を変更する。
    *   **1.3倍に大きくしたい時**: `zoom` の値を現状値の 1.3倍に変更する。

---

## 5. コンテンツコレクション（マークダウン）の再生成
上記で確定した正確な寸法と調整値を含んだマークダウンファイルを `src/content/dinosaurs/` ディレクトリにインポート再出力する。

```bash
node scratch/import_pending_dinos.js
```

---

## 6. 開発キャッシュのクリア ＆ 動作確認
Astroが以前のマークダウンデータをキャッシュしているため、**開発サーバーを一度停止してキャッシュを破棄し、再起動**する。

```bash
# 1. 現在走っている Astro dev プロセスを停止 (manage_task 等を使用)
# 2. 開発サーバーのキャッシュストアを完全クリアして再起動
npm run dev
```

---

## 7. ビルド検証
最後にビルドが正常に通るかチェックする。

```bash
npm run build
```
正常にビルドが成功（Complete）することを確認したら、確認用URLを提示して完了とする。
