const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dinos = [
  {
    id: 'ichthyovenator',
    name: 'イクチオヴェナトル',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/ichthyovenator_main_1795839156247.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/ichthyovenator_cyber_1795839160430.jpg',
    realLength: 8.5,
    realHeight: 2.5,
    zoom: 1.15
  },
  {
    id: 'austroposeidon',
    name: 'オーストロポセイドン',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/austroposeidon_main_1795839167386.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/austroposeidon_cyber_1795839170536.jpg',
    realLength: 25.0,
    realHeight: 5.8,
    zoom: 0.95
  },
  {
    id: 'saurolophus',
    name: 'サウロロフス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/saurolophus_main_1795839178588.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/saurolophus_cyber_1795839179356.jpg',
    realLength: 10.0,
    realHeight: 3.8,
    zoom: 1.1
  },
  {
    id: 'heterodontosaurus',
    name: 'ヘテロドントサウルス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/heterodontosaurus_main_1795839188582.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/heterodontosaurus_cyber_1795839724603.jpg',
    realLength: 1.0,
    realHeight: 0.35,
    zoom: 1.2
  },
  {
    id: 'natovenator',
    name: 'ナトヴェナトル',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/natovenator_main_1795839726197.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/3096181c-fca8-4879-b223-0d6f6e79ed1e/natovenator_cyber_1795839770316.jpg',
    realLength: 0.45,
    realHeight: 0.18,
    zoom: 1.3
  }
];

const results = [];

for (const dino of dinos) {
  console.log(`\n=== Processing ${dino.name} (${dino.id}) ===`);
  
  // 1. Process Main Asset
  if (dino.mainInput && fs.existsSync(dino.mainInput)) {
    const mainOut = path.join(__dirname, `../public/images/${dino.id}.webp`);
    console.log(`Processing main asset: ${dino.mainInput} -> ${mainOut}`);
    execSync(`node "${path.join(__dirname, 'process_main_asset.cjs')}" "${dino.mainInput}" "${dino.id}"`, { stdio: 'inherit' });
  }
  
  // 2. Process Cyber Asset
  if (dino.cyberInput && fs.existsSync(dino.cyberInput)) {
    const cyberOut = path.join(__dirname, `../public/images/cyber/${dino.id}.webp`);
    console.log(`Processing cyber asset: ${dino.cyberInput} -> ${cyberOut}`);
    const scanOutput = execSync(`node "${path.join(__dirname, 'process_cyber_asset.cjs')}" "${dino.cyberInput}" "${cyberOut}"`).toString();
    console.log(scanOutput);

    // Scan output から JSON 部分をパース
    const match = scanOutput.match(/\{[\s\S]*"contentHeightPx":[\s\S]*\}/);
    if (match) {
      const meta = JSON.parse(match[0]);
      const width = meta.contentWidthPx || meta.contentWidth;
      // 描画全長 realHeight * (contentWidthPx / contentHeightPx) が realLength と 1:1 完全同期するための contentHeightPx
      const calibratedHeight = Math.round(dino.realHeight * width / dino.realLength);
      const finalEffectiveLength = (dino.realHeight * (width / calibratedHeight)).toFixed(2);
      
      results.push({
        id: dino.id,
        name: dino.name,
        realLength: dino.realLength,
        realHeight: dino.realHeight,
        rawContentHeightPx: meta.contentHeightPx,
        contentHeightPx: calibratedHeight,
        bottomGap: meta.bottomGap,
        contentWidthPx: width,
        zoom: dino.zoom,
        aspectRatio: (width / meta.contentHeightPx).toFixed(2),
        rawEffectiveLength: (dino.realHeight * (width / meta.contentHeightPx)).toFixed(2),
        calibratedEffectiveLength: finalEffectiveLength
      });
    } else {
      console.error(`Failed to parse scan output for ${dino.id}`);
    }
  }
}

fs.writeFileSync(path.join(__dirname, 'tier26_part2_scans.json'), JSON.stringify(results, null, 2));
console.log('\n=== All Tier 26 Part 2 Assets Processed Successfully! ===');
console.table(results);
