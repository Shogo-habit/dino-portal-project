const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const tier20 = [
  "probactrosaurus", "proganochelys", "rhabdodon", "rhoetosaurus", "riojasaurus",
  "rugops", "rutiodon", "savannasaurus", "scutellosaurus", "shringasaurus",
  "silesaurus", "sordes", "staurikosaurus", "stegocephalia", "tanystropheus",
  "thecodontosaurus", "timimus", "unaysaurus", "vectipelta", "vulcanodon"
];

// 右向きのため水平反転が必要な恐竜
const flopList = ["scutellosaurus", "proganochelys"];

async function processImages() {
  console.log("Starting Tier 20 image cleaning...");

  for (const id of tier20) {
    const inputPath = path.join(__dirname, '..', 'public', 'images', 'cyber', `${id}.webp`);
    if (!fs.existsSync(inputPath)) {
      console.error(`File not found: ${inputPath}`);
      continue;
    }

    let img = sharp(inputPath);
    if (flopList.includes(id)) {
      console.log(`Flipping ${id} horizontally (flop) to face left...`);
      img = img.flop();
    }

    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    const outBuf = Buffer.from(data);

    // AIマーク消去用バウンディングボックス（右下隅 10%エリア）
    const aiMarkXMin = Math.floor(width * 0.88);
    const aiMarkYMin = Math.floor(height * 0.88);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = outBuf[idx];
        const g = outBuf[idx + 1];
        const b = outBuf[idx + 2];
        const a = outBuf[idx + 3];

        // 1. 暗い背景・薄黒いノイズを完全透過化
        if (r + g + b < 70) {
          outBuf[idx + 3] = 0;
        }

        // 2. 右下AIマークを完全消去
        if (x >= aiMarkXMin && y >= aiMarkYMin) {
          outBuf[idx + 3] = 0;
        }
      }
    }

    // ロスレス透過WebPとして保存
    await sharp(outBuf, { raw: { width, height, channels } })
      .webp({ lossless: true, alphaQuality: 100 })
      .toFile(inputPath);

    console.log(`Cleaned: ${id}.webp (${width}x${height})`);
  }

  console.log("All Tier 20 images cleaned successfully!");
}

processImages().catch(err => {
  console.error("Error during image processing:", err);
  process.exit(1);
});
