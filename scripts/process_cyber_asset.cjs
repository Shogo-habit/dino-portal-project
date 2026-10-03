const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * サイバー骨格側面図アセットの後処理＆ピクセル走査スクリプト
 * 
 * 1. AIマークの物理的完全消去 (右下エリアを Alpha = 0 に強制)
 * 2. 背景黒および薄黒ノイズの完全透過化 (Alpha = 0)
 * 3. 1:1 正方形化 (恐竜の頭や尾を削らずに、上下/左右に透明パディングを追加)
 * 4. 無劣化ロスレス透過WebP出力
 * 5. ピクセル自動走査による contentHeightPx (実体高さ) と bottomGap (下部余白) の精密検出
 */

async function processCyberAsset(inputPath, destPath) {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;

  // 1. Force sharp to output 4 channels (RGBA)
  const { data } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = 4;
  const logoStartX = Math.floor(width * 0.82);
  const logoStartY = Math.floor(height * 0.78);
  const bgThreshold = 400; // RGB合計値のしきい値（黒・暗色ノイズ判定）

  // ピクセル走査: AIマーク消去 & 背景完全透過
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      
      // AIロゴ領域（右下）
      if (x >= logoStartX && y >= logoStartY) {
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 0;
        data[idx + 3] = 0;
        continue;
      }

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = r + g + b;

      if (brightness < bgThreshold) {
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 0;
        data[idx + 3] = 0;
      } else {
        data[idx + 3] = 255;
      }
    }
  }

  // 2. 1:1 正方形化パディング
  let sharpInstance = sharp(data, { raw: { width, height, channels } });
  let finalRes = Math.max(width, height);

  if (width > height) {
    const extendVal = Math.floor((width - height) / 2);
    sharpInstance = sharpInstance.extend({
      top: extendVal,
      bottom: (width - height) - extendVal,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    });
  } else if (height > width) {
    const extendVal = Math.floor((height - width) / 2);
    sharpInstance = sharpInstance.extend({
      left: extendVal,
      right: (height - width) - extendVal,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    });
  }

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  // 3. ロスレスWebPとして保存
  await sharpInstance.webp({ lossless: true }).toFile(destPath);

  // 4. 保存した透過正方形画像のピクセル走査（実体高さ & 下部余白）
  const processed = await sharp(destPath).raw().toBuffer({ resolveWithObject: true });
  const pWidth = processed.info.width;
  const pHeight = processed.info.height;
  const pData = processed.data;

  let minY = pHeight;
  let maxY = 0;
  let minX = pWidth;
  let maxX = 0;
  let nonTransparentPixels = 0;

  for (let y = 0; y < pHeight; y++) {
    for (let x = 0; x < pWidth; x++) {
      const idx = (y * pWidth + x) * 4;
      const alpha = pData[idx + 3];
      if (alpha > 40) {
        nonTransparentPixels++;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }

  if (nonTransparentPixels === 0) {
    throw new Error('Processed image is completely transparent! Please check the input image.');
  }

  const contentHeightPx = maxY - minY + 1;
  const contentWidthPx = maxX - minX + 1;
  const bottomGap = pHeight - 1 - maxY;
  const leftGap = minX;

  const result = {
    sourceRes: pWidth,
    contentHeightPx,
    contentWidthPx,
    bottomGap,
    leftGap,
    outputPath: destPath
  };

  return result;
}

// CLI実行サポート
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node process_cyber_asset.cjs <input_image_path> [dino_id_or_output_path]');
    process.exit(1);
  }

  const inputPath = path.resolve(args[0]);
  let destPath;

  if (args[1]) {
    if (args[1].endsWith('.webp') || args[1].includes('/') || args[1].includes('\\')) {
      destPath = path.resolve(args[1]);
    } else {
      // dino_id 指定とみなす
      destPath = path.resolve(__dirname, '..', 'public', 'images', 'cyber', `${args[1]}.webp`);
    }
  } else {
    const baseName = path.basename(inputPath, path.extname(inputPath)).replace(/_cyber$/, '');
    destPath = path.resolve(__dirname, '..', 'public', 'images', 'cyber', `${baseName}.webp`);
  }

  processCyberAsset(inputPath, destPath)
    .then(result => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.error('Processing failed:', err);
      process.exit(1);
    });
}

module.exports = { processCyberAsset };
