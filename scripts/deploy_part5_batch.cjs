const fs = require('fs');
const path = require('path');
const { runDinoPipeline } = require('./run_dino_pipeline.cjs');

async function main() {
  const part5Path = path.resolve(__dirname, 'priority_50_part5.json');
  const part5List = JSON.parse(fs.readFileSync(part5Path, 'utf8'));

  const targets = [
    { id: 'megaraptor', flop: false },
    { id: 'mononykus', flop: false },
    { id: 'qianzhousaurus', flop: true },
    { id: 'halszkaraptor', flop: false },
    { id: 'caudipteryx', flop: false },
    { id: 'rebbachisaurus', flop: false },
    { id: 'koreaceratops', flop: false },
    { id: 'ornithocheirus', flop: false },
    { id: 'ophthalmosaurus', flop: false },
    { id: 'temnodontosaurus', flop: false }
  ];

  const results = [];

  for (const target of targets) {
    const dinoData = part5List.find(d => d.id === target.id);
    if (!dinoData) {
      console.error(`Dino data not found for ${target.id}`);
      continue;
    }

    const mainImagePath = path.resolve(__dirname, '..', 'images_差し替え', 'main', `${target.id}.webp`);
    const cyberImagePath = path.resolve(__dirname, '..', 'images_差し替え', 'cyber', `${target.id}.webp`);

    if (!fs.existsSync(cyberImagePath)) {
      console.warn(`Cyber image not found yet for ${target.id}: ${cyberImagePath}`);
      continue;
    }

    const result = await runDinoPipeline({
      id: target.id,
      mainImagePath,
      cyberImagePath,
      cyberOptions: { flop: target.flop },
      dinoData
    });

    results.push(result);
  }

  console.log('\n================ Part 5 Batch Results ================');
  for (const r of results) {
    console.log(`ID: ${r.id}`);
    console.log(`  Cyber Metadata:`, JSON.stringify(r.cyberMetadata));
  }
}

main().catch(err => {
  console.error('Batch failed:', err);
  process.exit(1);
});
