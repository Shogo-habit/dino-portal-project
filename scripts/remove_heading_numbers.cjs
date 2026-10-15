const fs = require('fs');
const path = require('path');

const dinoDir = path.join(__dirname, '..', 'src', 'content', 'dinosaurs');
const files = fs.readdirSync(dinoDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(dinoDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // ### 1. や ### 1: などの見出し番号を置換して削除
  const newContent = content.replace(/^###\s+[0-9]+[\.、:：\s]\s*/gm, '### ');

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    updatedCount++;
    console.log(`Updated headings in: ${file}`);
  }
}

console.log(`\nSuccessfully removed heading numbers from ${updatedCount} files.`);
