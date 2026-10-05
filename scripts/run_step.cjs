const fs = require('fs');
const path = require('path');
const { runDinoPipeline } = require('./run_dino_pipeline.cjs');

async function main() {
  const [,, id, mainImg, cyberImg] = process.argv;
  if (!id) {
    console.error('Usage: node run_step.cjs <id> <mainImg> <cyberImg>');
    process.exit(1);
  }

  const jsonPath = path.resolve(__dirname, 'priority_50_part3.json');
  const list = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const dinoData = list.find(d => d.id === id);

  if (!dinoData) {
    console.error(`Dinosaur ${id} not found in part3 json.`);
    process.exit(1);
  }

  const result = await runDinoPipeline({
    id,
    mainImagePath: mainImg,
    cyberImagePath: cyberImg,
    dinoData
  });

  console.log('Result:', JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
