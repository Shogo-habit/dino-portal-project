const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const tier20Meta = {
  probactrosaurus: { realHeight: 2.0, realLength: 6.0, zoom: 1.4 },
  proganochelys: { realHeight: 0.4, realLength: 1.0, zoom: 1.8 },
  rhabdodon: { realHeight: 1.5, realLength: 4.0, zoom: 1.5 },
  rhoetosaurus: { realHeight: 4.0, realLength: 15.0, zoom: 1.55 },
  riojasaurus: { realHeight: 3.0, realLength: 10.0, zoom: 1.3 },
  rugops: { realHeight: 2.0, realLength: 6.0, zoom: 1.35 },
  rutiodon: { realHeight: 0.6, realLength: 3.0, zoom: 1.6 },
  savannasaurus: { realHeight: 3.5, realLength: 15.0, zoom: 1.4 },
  scutellosaurus: { realHeight: 0.4, realLength: 1.2, zoom: 2.0 },
  shringasaurus: { realHeight: 1.2, realLength: 3.0, zoom: 1.4 },
  silesaurus: { realHeight: 0.7, realLength: 2.3, zoom: 1.8 },
  sordes: { realHeight: 0.25, realLength: 0.35, zoom: 2.5 },
  staurikosaurus: { realHeight: 0.8, realLength: 2.1, zoom: 1.6 },
  stegocephalia: { realHeight: 0.35, realLength: 1.5, zoom: 2.0 },
  tanystropheus: { realHeight: 1.8, realLength: 6.0, zoom: 1.35 },
  thecodontosaurus: { realHeight: 0.8, realLength: 2.5, zoom: 1.7 },
  timimus: { realHeight: 1.0, realLength: 3.0, zoom: 1.5 },
  unaysaurus: { realHeight: 0.8, realLength: 2.5, zoom: 1.7 },
  vectipelta: { realHeight: 1.3, realLength: 4.0, zoom: 1.4 },
  vulcanodon: { realHeight: 3.0, realLength: 6.5, zoom: 1.35 }
};

async function scanTier20() {
  const results = {};

  for (const [id, meta] of Object.entries(tier20Meta)) {
    const imgPath = path.join(__dirname, '..', 'public', 'images', 'cyber', `${id}.webp`);
    if (!fs.existsSync(imgPath)) {
      console.error(`Not found: ${imgPath}`);
      continue;
    }

    const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    let minY = height;
    let maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const a = data[idx + 3];
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // 不透明かつ有意な輝度ピクセル
        if (a > 30 && (r + g + b) > 70) {
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const contentHeightPx = maxY - minY + 1;
    const bottomGap = height - 1 - maxY;

    results[id] = {
      sourceRes: width,
      contentHeightPx,
      bottomGap,
      realHeight: meta.realHeight,
      realLength: meta.realLength,
      zoom: meta.zoom
    };

    console.log(`${id.padEnd(20)}: res=${width}, contentH=${contentHeightPx}, bGap=${bottomGap}, realH=${meta.realHeight}, realL=${meta.realLength}, zoom=${meta.zoom}`);
  }

  const outPath = path.join(__dirname, 'tier20_scans.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nScan results saved to: ${outPath}`);
}

scanTier20().catch(err => {
  console.error("Scan error:", err);
  process.exit(1);
});
