const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const brainDir = '/Users/kosako/.gemini/antigravity/brain/3056c08b-abf0-420e-ae97-66b00e581a2d';

const dinos = [
  {
    id: 'andesaurus',
    name: 'アンデサウルス',
    mainInput: path.join(brainDir, 'andesaurus_delgadoi_1795170024133.jpg'),
    cyberInput: path.join(brainDir, 'andesaurus_cyber_bone_1795170033100.jpg'),
    realLength: 15.0,
    realHeight: 3.8
  },
  {
    id: 'malawisaurus',
    name: 'マラウイサウルス',
    mainInput: path.join(brainDir, 'malawisaurus_dixeyi_1795170036106.jpg'),
    cyberInput: path.join(brainDir, 'malawisaurus_cyber_bone_1795170044464.jpg'),
    realLength: 16.0,
    realHeight: 4.2
  },
  {
    id: 'maxakalisaurus',
    name: 'マシャカリサウルス',
    mainInput: path.join(brainDir, 'maxakalisaurus_topai_1795170049444.jpg'),
    cyberInput: path.join(brainDir, 'maxakalisaurus_cyber_bone_1795170056432.jpg'),
    realLength: 13.0,
    realHeight: 3.5
  },
  {
    id: 'gondwanatitan',
    name: 'ゴンドワナティタン',
    mainInput: path.join(brainDir, 'gondwanatitan_faustoi_1795170060650.jpg'),
    cyberInput: path.join(brainDir, 'gondwanatitan_cyber_bone_1795170073287.jpg'),
    realLength: 7.0,
    realHeight: 2.0
  },
  {
    id: 'magyarosaurus',
    name: 'マジャーロサウルス',
    mainInput: path.join(brainDir, 'magyarosaurus_dacus_1795170074649.jpg'),
    // マジャーロサウルスはクォータ上限により一時的に同系統の小型ティタノサウルス類（ゴンドワナティタン）の骨格をベースに生成
    cyberInput: path.join(brainDir, 'gondwanatitan_cyber_bone_1795170073287.jpg'),
    realLength: 6.0,
    realHeight: 1.8,
    isTemporaryCyber: true
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
    results.push({
      id: dino.id,
      name: dino.name,
      realLength: dino.realLength,
      realHeight: dino.realHeight,
      contentHeightPx: meta.contentHeightPx,
      bottomGap: meta.bottomGap,
      contentWidth: meta.contentWidth,
      aspectRatio: (meta.contentWidth / meta.contentHeightPx).toFixed(2),
      effectiveRenderedLength: (dino.realHeight * (meta.contentWidth / meta.contentHeightPx)).toFixed(2),
      isTemporaryCyber: !!dino.isTemporaryCyber
    });
  } else {
    console.error(`Failed to parse scan output for ${dino.id}`);
  }
}

fs.writeFileSync(path.join(__dirname, 'tier25_part1_scans.json'), JSON.stringify(results, null, 2));
console.log('\n=== All Assets Processed Successfully! ===');
console.table(results);
