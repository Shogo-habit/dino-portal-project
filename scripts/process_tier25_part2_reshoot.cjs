const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dinos = [
  {
    id: 'isisaurus',
    name: 'イシスサウルス',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/isisaurus_colberti_skeleton_v2_1795703672408.jpg',
    realLength: 18.0,
    realHeight: 4.5,
    zoom: 1.15
  },
  {
    id: 'notocolossus',
    name: 'ノトコロッスス',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/notocolossus_gonzalezparejasi_skeleton_v2_1795703680599.jpg',
    realLength: 28.0,
    realHeight: 8.5,
    zoom: 1.05
  },
  {
    id: 'epachthosaurus',
    name: 'エパクトサウルス',
    cyberInput: '/Users/kosako/.gemini/antigravity/brain/2b78c5e9-057f-425c-8a05-60c809c987c8/epachthosaurus_sciuttoi_skeleton_1795703650023.jpg',
    realLength: 18.0,
    realHeight: 4.8,
    zoom: 1.12
  }
];

const results = [];

for (const dino of dinos) {
  console.log(`\n=== Processing ${dino.name} (${dino.id}) ===`);
  const cyberOut = path.join(__dirname, `../public/images/cyber/${dino.id}.webp`);
  console.log(`Processing cyber asset: ${dino.cyberInput} -> ${cyberOut}`);
  
  const scanOutput = execSync(`node "${path.join(__dirname, 'process_cyber_asset.cjs')}" "${dino.cyberInput}" "${cyberOut}"`).toString();
  console.log(scanOutput);

  const match = scanOutput.match(/\{[\s\S]*"contentHeightPx":[\s\S]*\}/);
  if (match) {
    const meta = JSON.parse(match[0]);
    const width = meta.contentWidthPx || meta.contentWidth;
    const rawHeight = meta.contentHeightPx;
    
    // 描画全長 realHeight * (contentWidthPx / contentHeightPx) が realLength と 1:1 完全同期するための contentHeightPx
    const calibratedHeight = Math.round(dino.realHeight * width / dino.realLength);
    const finalEffectiveLength = (dino.realHeight * (width / calibratedHeight)).toFixed(2);
    
    results.push({
      id: dino.id,
      name: dino.name,
      realLength: dino.realLength,
      realHeight: dino.realHeight,
      rawContentHeightPx: rawHeight,
      contentHeightPx: calibratedHeight,
      bottomGap: meta.bottomGap,
      contentWidthPx: width,
      zoom: dino.zoom,
      aspectRatio: (width / rawHeight).toFixed(2),
      calibratedEffectiveLength: finalEffectiveLength
    });

    // Update markdown file cyberMetadata
    const mdPath = path.join(__dirname, `../src/content/dinosaurs/${dino.id}.md`);
    let content = fs.readFileSync(mdPath, 'utf-8');
    content = content.replace(/bottomGap:\s*\d+/, `bottomGap: ${meta.bottomGap}`);
    content = content.replace(/contentHeightPx:\s*\d+/, `contentHeightPx: ${calibratedHeight}`);
    fs.writeFileSync(mdPath, content, 'utf-8');
    console.log(`Updated ${mdPath} with bottomGap: ${meta.bottomGap}, contentHeightPx: ${calibratedHeight}`);
  } else {
    console.error(`Failed to parse scan output for ${dino.id}`);
  }
}

fs.writeFileSync(path.join(__dirname, 'tier25_part2_reshoot_scans.json'), JSON.stringify(results, null, 2));
console.log('\n=== All 3 Reshot Assets Processed Successfully! ===');
console.table(results);
