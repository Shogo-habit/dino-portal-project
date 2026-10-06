const fs = require('fs');
const path = require('path');
const { runDinoPipeline } = require('./run_dino_pipeline.cjs');

async function main() {
  const [,, id, mainImg, cyberImg] = process.argv;
  if (!id) {
    console.error('Usage: node run_step.cjs <id> <mainImg> <cyberImg>');
    process.exit(1);
  }

  const part3Path = path.resolve(__dirname, 'priority_50_part3.json');
  const part4Path = path.resolve(__dirname, 'priority_50_part4.json');
  let list = [];
  if (fs.existsSync(part3Path)) list = list.concat(JSON.parse(fs.readFileSync(part3Path, 'utf8')));
  if (fs.existsSync(part4Path)) list = list.concat(JSON.parse(fs.readFileSync(part4Path, 'utf8')));

  const dinoData = list.find(d => d.id === id);

  if (!dinoData) {
    console.error(`Dinosaur ${id} not found in part3 or part4 json.`);
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
