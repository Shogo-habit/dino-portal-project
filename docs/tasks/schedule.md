# 恐竜ポータル 1ヶ月開発・コンテンツ追加スケジュール (schedule.md)

本ドキュメントは、2026年11月8日〜12月8日の1ヶ月間における**新規恐竜40頭追加（毎週月曜日10頭リリース）**および**サイト機能改修・SEO強化・特集記事制作**の全体ロードマップと進捗管理表です。
Googleカレンダー（`kosako20200405@gmail.com`）と完全に同期しています。

---

## 🎯 1ヶ月の全体目標（2026/11/08 〜 2026/12/08）

1. **新規恐竜の追加**: 毎週月曜日に10頭ずつ追加 ➔ 計40頭（No.336〜375）追加 ➔ **登録総数375頭達成**
2. **サイト回遊性・UI改善**:
   - 1-1: 関連恐竜選出ロジックの抜本改善（首長竜・海生爬虫類・近縁種優先化）
   - 1-2: 図鑑詳細ページの「Next / Prev（次へ / 前へ）」五十音順ナビゲーション実装
3. **SEO・ピラーページ新設**:
   - 11/18: 第1回定期SEO点検（Search Console順位・CTR・検索流入データ追跡）
   - 2-1: 「三畳紀の恐竜・古生物一覧（`/period/triassic/`）」の公開
   - 2-1: 「草食恐竜一覧（`/herbivores/`）」の公開
4. **高需要特集記事の制作**:
   - 2-2: 特集記事①（『映画「ジュラシック・ワールド」と本物の恐竜の違い徹底検証』等）
   - 2-2: 特集記事②（『全国恐竜博物館＆化石発掘体験おすすめスポット完全ガイド』等）

---

## 📅 週次ロードマップ ＆ 進捗チェックリスト

### 第1週（2026/11/08 〜 2026/11/15）: 回遊UI改修 ＆ Tier 23追加
- [x] **【即時改修 1-1】関連恐竜選出ロジックの抜本改修** (2026/11/08 完了)
  - 分類グループ（首長竜、翼竜、角竜等）および生態系ニッチ（海洋・陸上）を最優先（+25点）にし、異ニッチ混入防止（-25点）と加算スコアリングを導入。エラスモサウルスのページでスティクソサウルス、プレシオサウルス、ティロサウルス、クロノサウルス等の首長竜・モササウルス類・海洋爬虫類が確実に選出されるよう改善。
- [x] **【UI実装 1-2】図鑑詳細ページの前後恐竜「Next / Prev」ナビゲーション実装** (2026/11/08 完了)
  - 五十音順で前後の恐竜へスムーズに読み進められる大型HUDナビゲーションコンポーネント（`specimen-seq-nav`）および記事中段のクイックナビピル（`detail-quick-nav-bar`）を詳細ページに新設。
- [ ] **【恐竜追加 第1弾】Tier 23（No.336〜345）10種追加**（リリース日: 2026/11/09）
  - Googleカレンダー: [イベントリンク](https://www.google.com/calendar/event?eid=ZmpzZGNob2I5M2F2b25wb3ExaTIzNHFnbzAga29zYWtvMjAyMDA0MDVAbQ) (ID: `fjsdchob93avonpoq1i234qgo0`)
  - イラスト生成、透過WebP化、自動接地スキャン、学術解説執筆

### 第2週（2026/11/16 〜 2026/11/22）: Tier 24追加 ＆ SEO点検 ＆ 三畳紀ピラー公開
- [ ] **【恐竜追加 第2弾】Tier 24（No.346〜355）10種追加**（リリース日: 2026/11/16）
  - Googleカレンダー: [イベントリンク](https://www.google.com/calendar/event?eid=ZXJ2aDdtczE5MmxiMGxuajAxY2Z2a2p1a2cga29zYWtvMjAyMDA0MDVAbQ) (ID: `ervh7ms192lb0lnj01cfvkjukg`)
  - 累計355種到達
- [ ] **【SEO点検】お宝記事のSearch Consoleデータ追跡・CTR検証**（実施日: 2026/11/18）
  - Googleカレンダー: [イベントリンク](https://www.google.com/calendar/event?eid=dDc3Ymh2aDFzNzFqZHN2ZXJzbWlvMXJxNGMga29zYWtvMjAyMDA0MDVAbQ) (ID: `t77bhvh1s71jdsversmio1rq4c`)
  - `/topics/dinosaur-size-ranking/` のCTR（現状0.43% ➔ 目標3.0%以上）および穴場恐竜5種のインプレッション・順位推移を検証
- [ ] **【SEOピラー新設 2-1】三畳紀の恐竜・古生物一覧（`/period/triassic/`）公開**（公開日: 2026/11/20）
  - Googleカレンダー: [イベントリンク](https://www.google.com/calendar/event?eid=Y2ptNTRicmcwdmlranFkamRtbGo0aWk4bDQga29zYWtvMjAyMDA0MDVAbQ) (ID: `cjm54brg0vikjqdjdmlj4ii8l4`)
  - 三畳紀の全種フィルタリング一覧ページ新設、内部リンク最適化

### 第3週（2026/11/23 〜 2026/11/29）: Tier 25追加 ＆ 特集記事① ＆ 草食ピラー公開
- [ ] **【恐竜追加 第3弾】Tier 25（No.356〜365）10種追加**（リリース日: 2026/11/23）
  - Googleカレンダー: [イベントリンク](https://www.google.com/calendar/event?eid=ZjN1bHB0MTBoZDBmZDNtdmRsaWQyYnUxYjQga29zYWtvMjAyMDA0MDVAbQ) (ID: `f3ulpt10hd0fd3mvdlid2bu1b4`)
  - 累計365種到達
- [ ] **【特集記事公開 2-2】高需要トピック記事①公開**（公開日: 2026/11/26）
  - Googleカレンダー: [イベントリンク](https://www.google.com/calendar/event?eid=dHBxMGdmNGFoa3VsNnZ0aGtrcTlpdGF0cjQga29zYWtvMjAyMDA0MDVAbQ) (ID: `tpq0gf4ahkul6vthkkq9itatr4`)
  - 映画と最新学説の比較検証記事等の執筆・図鑑リンク網連携
- [ ] **【SEOピラー新設 2-1】草食恐竜一覧（`/herbivores/`）公開**
  - 草食恐竜特設ピラーページの公開、検索ボリューム獲得

### 第4週（2026/11/30 〜 2026/12/08）: Tier 26追加（40頭達成） ＆ 特集記事② ＆ 月間総括
- [ ] **【恐竜追加 第4弾】Tier 26（No.366〜375）10種追加 ＆ 月間40種達成！**（リリース日: 2026/11/30）
  - Googleカレンダー: [イベントリンク](https://www.google.com/calendar/event?eid=Z3I3bmRuNTZsMTVnMW9paThqdTBxcXJ0Y2cga29zYWtvMjAyMDA0MDVAbQ) (ID: `gr7ndn56l15g1oii8ju0qqrtcg`)
  - **累計375種達成！**
- [ ] **【特集記事公開 2-2】高需要トピック記事②公開**（公開日: 2026/12/04）
  - Googleカレンダー: [イベントリンク](https://www.google.com/calendar/event?eid=dnRjYmtobTg0cGRvYXJwMmRyOGhwZjlwcGMga29zYWtvMjAyMDA0MDVAbQ) (ID: `vtcbkhm84pdoarp2dr8hpf9ppc`)
  - 全国の恐竜博物館・化石発掘スポットまとめ記事等の執筆・公開
- [ ] **【月間総括点検】サイト内リンク・パフォーマンス・SEO進捗総点検**（実施日: 2026/12/08）
  - Googleカレンダー: [イベントリンク](https://www.google.com/calendar/event?eid=dXZ0dnVibzA3OWdtMWgzbmZlOGZhOG5hZzAga29zYWtvMjAyMDA0MDVAbQ) (ID: `uvtvubo079gm1h3nfe8fa8nag0`)
  - 1ヶ月間の成果総括、表示速度・Core Web Vitals・検索順位推移のレポート作成
