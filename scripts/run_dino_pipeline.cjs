const fs = require('fs');
const path = require('path');
const { processMainAsset } = require('./process_main_asset.cjs');
const { processCyberAsset } = require('./process_cyber_asset.cjs');
const { saveDinoEntry } = require('./create_dino_entry.cjs');

/**
 * 恐竜アセット一括処理＆登録パイプライン ランナー
 * 
 * メイン画像、サイバー骨格画像、メタデータを受け取り、
 * 1. メイン画像のWebP変換＆配置
 * 2. サイバー骨格の透過加工、AIマーク消去、1:1正方形化、接地走査、配置
 * 3. スキャン結果（contentHeightPx, bottomGap等）を統合したマークダウン生成
 * をワンストップで実行します。
 */

async function runDinoPipeline(options) {
  const {
    id,
    mainImagePath,
    cyberImagePath,
    cyberOptions = {},
    dinoData
  } = options;

  if (!id) {
    throw new Error('Dinosaur id is required.');
  }

  const projectDir = path.resolve(__dirname, '..');
  const targetMainWebp = path.join(projectDir, 'public', 'images', `${id}.webp`);
  const targetCyberWebp = path.join(projectDir, 'public', 'images', 'cyber', `${id}.webp`);

  console.log(`\n🦕 [Pipeline] Starting asset pipeline for: ${dinoData.name || id} (${id})`);

  // 1. メイン画像の処理
  if (mainImagePath && fs.existsSync(mainImagePath)) {
    console.log(`  -> Processing main illustration: ${mainImagePath}`);
    const mainResult = await processMainAsset(mainImagePath, targetMainWebp);
    console.log(`     Main image successfully saved to ${targetMainWebp} (${mainResult.dimensions})`);
  } else {
    console.warn(`  -> [Warning] mainImagePath not provided or does not exist: ${mainImagePath}`);
  }

  // 2. サイバー骨格画像の処理＆接地スキャン
  let scanResult = null;
  if (cyberImagePath && fs.existsSync(cyberImagePath)) {
    console.log(`  -> Processing cyber skeleton specimen: ${cyberImagePath}`);
    scanResult = await processCyberAsset(cyberImagePath, targetCyberWebp, cyberOptions);
    console.log(`     Cyber image successfully saved to ${targetCyberWebp}`);
    console.log(`     [Scan Results] contentHeightPx: ${scanResult.contentHeightPx}, bottomGap: ${scanResult.bottomGap}, sourceRes: ${scanResult.sourceRes}`);
  } else {
    console.warn(`  -> [Warning] cyberImagePath not provided or does not exist: ${cyberImagePath}`);
  }

  // 3. メタデータの統合＆マークダウン生成
  console.log(`  -> Generating markdown entry for ${id}...`);
  const finalData = { ...dinoData, id };

  if (!finalData.cyberMetadata) {
    finalData.cyberMetadata = {};
  }

  if (scanResult) {
    finalData.cyberMetadata.contentHeightPx = scanResult.contentHeightPx;
    finalData.cyberMetadata.bottomGap = scanResult.bottomGap;
    finalData.cyberMetadata.sourceRes = scanResult.sourceRes;
  }

  // デフォルト値の補完
  if (!finalData.cyberMetadata.realLength) {
    finalData.cyberMetadata.realLength = parseFloat(finalData.length) || 1.0;
  }
  if (!finalData.cyberMetadata.realHeight) {
    finalData.cyberMetadata.realHeight = parseFloat(finalData.length) * 0.35 || 0.5;
  }
  if (!finalData.cyberMetadata.zoom) {
    finalData.cyberMetadata.zoom = 1.8;
  }

  const mdPath = saveDinoEntry(finalData);

  console.log(`✨ [Pipeline] Completed successfully!`);
  return {
    status: 'success',
    id,
    mainWebp: targetMainWebp,
    cyberWebp: targetCyberWebp,
    markdown: mdPath,
    cyberMetadata: finalData.cyberMetadata
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node run_dino_pipeline.cjs <config_json_path>');
    process.exit(1);
  }

  const configPath = path.resolve(args[0]);
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  runDinoPipeline(config)
    .then(res => {
      console.log('\nResult Summary:');
      console.log(JSON.stringify(res, null, 2));
    })
    .catch(err => {
      console.error('\nPipeline Error:', err);
      process.exit(1);
    });
}

module.exports = { runDinoPipeline };
