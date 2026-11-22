const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dinos = [
  {
    id: 'tapuiasaurus',
    name: 'タプイアサウルス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/tapuiasaurus_main_1795356677049.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/tapuiasaurus_skeleton_1795356769771.jpg',
    realLength: 13.0,
    realHeight: 3.5,
    zoom: 1.15
  },
  {
    id: 'isisaurus',
    name: 'イシスサウルス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/isisaurus_main_1795356688171.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/isisaurus_skeleton_1795356779807.jpg',
    realLength: 18.0,
    realHeight: 4.5,
    zoom: 1.15
  },
  {
    id: 'notocolossus',
    name: 'ノトコロッスス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/notocolossus_main_1795356835059.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/notocolossus_skeleton_1795356790485.jpg',
    realLength: 28.0,
    realHeight: 8.5,
    zoom: 1.05
  },
  {
    id: 'epachthosaurus',
    name: 'エパクトサウルス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/epachthosaurus_main_1795356759764.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/epachthosaurus_skeleton_1795356800270.jpg',
    realLength: 18.0,
    realHeight: 4.8,
    zoom: 1.12
  },
  {
    id: 'mansourasaurus',
    name: 'マンスーラサウルス',
    mainInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/mansourasaurus_main_1795356722807.jpg',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/mansourasaurus_skeleton_1795356810994.jpg',
    realLength: 10.0,
    realHeight: 2.8,
    zoom: 1.18
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

fs.writeFileSync(path.join(__dirname, 'tier25_part2_scans.json'), JSON.stringify(results, null, 2));
console.log('\n=== All Tier 25 Part 2 Assets Processed Successfully! ===');
console.table(results);
