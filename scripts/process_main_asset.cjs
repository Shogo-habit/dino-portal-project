const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * メインイラストアセットの後処理スクリプト
 * 
 * 1. 入力画像 (PNG/JPG等) を読み込み
 * 2. 1:1 正方形の検証 (正方形でない場合は中央クロップまたはパディング)
 * 3. 高品質WebP (quality 92, smartSubsample) に変換
 * 4. public/images/${dino_id}.webp に配置
 */

async function processMainAsset(inputPath, destPath) {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  if (path.resolve(inputPath) === path.resolve(destPath)) {
    const meta = await sharp(destPath).metadata();
    return {
      inputPath,
      outputPath: destPath,
      dimensions: `${meta.width}x${meta.height}`,
      format: meta.format,
      skipped: true
    };
  }

  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;

  let sharpInstance = sharp(inputPath);

  // もし縦横比が正方形でない場合、中央クロップで1:1に整形
  if (width !== height) {
    const size = Math.min(width, height);
    sharpInstance = sharpInstance.resize(size, size, {
      fit: 'cover',
      position: 'center'
    });
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  await sharpInstance
    .webp({ quality: 92, smartSubsample: true })
    .toFile(destPath);

  const result = {
    inputPath,
    outputPath: destPath,
    dimensions: `${Math.min(width, height)}x${Math.min(width, height)}`,
    format: 'webp'
  };

  return result;
}

// CLI実行サポート
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node process_main_asset.cjs <input_image_path> [dino_id_or_output_path]');
    process.exit(1);
  }

  const inputPath = path.resolve(args[0]);
  let destPath;

  if (args[1]) {
    if (args[1].endsWith('.webp') || args[1].includes('/') || args[1].includes('\\')) {
      destPath = path.resolve(args[1]);
    } else {
      // dino_id 指定とみなす
      destPath = path.resolve(__dirname, '..', 'public', 'images', `${args[1]}.webp`);
    }
  } else {
    const baseName = path.basename(inputPath, path.extname(inputPath));
    destPath = path.resolve(__dirname, '..', 'public', 'images', `${baseName}.webp`);
  }

  processMainAsset(inputPath, destPath)
    .then(result => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.error('Processing failed:', err);
      process.exit(1);
    });
}

module.exports = { processMainAsset };
