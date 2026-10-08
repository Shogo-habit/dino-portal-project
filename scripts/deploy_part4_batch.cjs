const fs = require('fs');
const path = require('path');
const { runDinoPipeline } = require('./run_dino_pipeline.cjs');

async function main() {
  const part4Path = path.resolve(__dirname, 'priority_50_part4.json');
  const part4List = JSON.parse(fs.readFileSync(part4Path, 'utf8'));

  const targets = [
    { id: 'darwinopterus', flop: true },
    { id: 'sinopterus', flop: false },
    { id: 'rhomaleosaurus', flop: false },
    { id: 'pliosaurus', flop: false },
    { id: 'cryptoclidus', flop: false }
  ];

  const results = [];

  for (const target of targets) {
    const dinoData = part4List.find(d => d.id === target.id);
    if (!dinoData) {
      console.error(`Dino data not found for ${target.id}`);
      continue;
    }

    const mainImagePath = path.resolve(__dirname, '..', 'images_差し替え', 'main', `${target.id}.webp`);
    const cyberImagePath = path.resolve(__dirname, '..', 'images_差し替え', 'cyber', `${target.id}.webp`);

    const result = await runDinoPipeline({
      id: target.id,
      mainImagePath,
      cyberImagePath,
      cyberOptions: { flop: target.flop },
      dinoData
    });

    results.push(result);
  }

  console.log('\n================ Batch Results ================');
  for (const r of results) {
    console.log(`ID: ${r.id}`);
    console.log(`  Cyber Metadata:`, JSON.stringify(r.cyberMetadata));
  }
}

main().catch(err => {
  console.error('Batch failed:', err);
  process.exit(1);
});
