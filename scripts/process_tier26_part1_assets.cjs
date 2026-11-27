const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dinos = [
  {
    id: 'agustinia',
    name: 'アグスティニア',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/agustinia_encyclopedia_1795772838486.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/agustinia_cyber_skeleton_1795772831068.jpg',
    realLength: 15.0,
    realHeight: 3.5,
    zoom: 1.15
  },
  {
    id: 'quaesitosaurus',
    name: 'クアエトサウルス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/quaesitosaurus_encyclopedia_1795772847694.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/quaesitosaurus_cyber_skeleton_1795772841226.jpg',
    realLength: 14.0,
    realHeight: 3.2,
    zoom: 1.15
  },
  {
    id: 'lusotitan',
    name: 'ルソティタン',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/lusotitan_encyclopedia_1795772857231.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/lusotitan_cyber_skeleton_1795772850270.jpg',
    realLength: 25.0,
    realHeight: 11.0,
    zoom: 0.95
  },
  {
    id: 'chuanjiesaurus',
    name: 'チュアンジエサウルス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/chuanjiesaurus_encyclopedia_v2_1795772900193.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/chuanjiesaurus_cyber_skeleton_1795772859325.jpg',
    realLength: 27.0,
    realHeight: 6.5,
    zoom: 1.05
  },
  {
    id: 'limaysaurus',
    name: 'リマイサウルス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/limaysaurus_encyclopedia_1795772876879.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/limaysaurus_cyber_skeleton_1795772868629.jpg',
    realLength: 15.0,
    realHeight: 3.8,
    zoom: 1.15
  }
];

const results = [];

for (const dino of dinos) {
  console.log(`\n=== Processing ${dino.name} (${dino.id}) ===`);
  
  // 1. Process Main Asset
  const mainOut = path.join(__dirname, `../public/images/${dino.id}.webp`);
  console.log(`Processing main asset: ${dino.mainInput} -> ${mainOut}`);
  execSync(`node "${path.join(__dirname, 'process_main_asset.cjs')}" "${dino.mainInput}" "${dino.id}"`, { stdio: 'inherit' });
  
  // 2. Process Cyber Asset
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

fs.writeFileSync(path.join(__dirname, 'tier26_part1_scans.json'), JSON.stringify(results, null, 2));
console.log('\n=== All Tier 26 Part 1 Assets Processed Successfully! ===');
console.table(results);
