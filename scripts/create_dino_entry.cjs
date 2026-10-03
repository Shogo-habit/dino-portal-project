const fs = require('fs');
const path = require('path');

/**
 * 恐竜詳細マークダウン作成・更新スクリプト
 * 
 * content.config.ts のスキーマに厳密に準拠した YAML Frontmatter と本文を持つ
 * src/content/dinosaurs/${id}.md を生成します。
 */

function generateMarkdownContent(data) {
  const {
    id,
    name,
    kana,
    scientificName,
    era,
    region,
    diet,
    length,
    weight,
    image = `images/${id}.webp`,
    group,
    description,
    bioTraits = [],
    cyberMetadata,
    content = ''
  } = data;

  if (!id || !name || !scientificName) {
    throw new Error('id, name, scientificName are required fields.');
  }

  let yaml = `---
id: "${id}"
name: "${name}"
kana: "${kana || ''}"
scientificName: "${scientificName}"
era: "${era || ''}"
region: "${region || ''}"
diet: "${diet || ''}"
length: "${length || ''}"
weight: "${weight || ''}"
image: "${image}"
group: "${group || ''}"
description: "${description ? description.replace(/"/g, '\\"') : ''}"
`;

  if (bioTraits && bioTraits.length > 0) {
    yaml += `bioTraits:\n`;
    for (const bt of bioTraits) {
      yaml += `  - trait: "${bt.trait}"\n`;
      yaml += `    value: "${bt.value.replace(/"/g, '\\"')}"\n`;
      yaml += `    detail: "${bt.detail.replace(/"/g, '\\"')}"\n`;
    }
  }

  if (cyberMetadata) {
    yaml += `cyberMetadata:\n`;
    yaml += `  bottomGap: ${Math.round(cyberMetadata.bottomGap || 0)}\n`;
    yaml += `  realHeight: ${Number((cyberMetadata.realHeight || 0).toFixed(2))}\n`;
    yaml += `  realLength: ${Number((cyberMetadata.realLength || 0).toFixed(2))}\n`;
    yaml += `  contentHeightPx: ${Math.round(cyberMetadata.contentHeightPx || 0)}\n`;
    yaml += `  sourceRes: ${Math.round(cyberMetadata.sourceRes || 1024)}\n`;
    yaml += `  zoom: ${Number((cyberMetadata.zoom || 1.8).toFixed(1))}\n`;
    if (cyberMetadata.dinoLeft) {
      yaml += `  dinoLeft: "${cyberMetadata.dinoLeft}"\n`;
    }
    if (cyberMetadata.refRight) {
      yaml += `  refRight: "${cyberMetadata.refRight}"\n`;
    }
  }

  yaml += `---\n\n`;
  yaml += content.trim() ? content.trim() + '\n' : `${name}（学名: ${scientificName}）の詳細データ。\n`;

  return yaml;
}

function saveDinoEntry(data) {
  const projectDir = path.resolve(__dirname, '..');
  const targetPath = path.join(projectDir, 'src', 'content', 'dinosaurs', `${data.id}.md`);
  const content = generateMarkdownContent(data);

  fs.writeFileSync(targetPath, content, 'utf-8');
  console.log(`Successfully generated dinosaur markdown: ${targetPath}`);
  return targetPath;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node create_dino_entry.cjs <data_json_path_or_json_string>');
    process.exit(1);
  }

  let data;
  try {
    if (fs.existsSync(args[0])) {
      data = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
    } else {
      data = JSON.parse(args[0]);
    }
  } catch (err) {
    console.error('Failed to parse JSON input:', err.message);
    process.exit(1);
  }

  try {
    const savedPath = saveDinoEntry(data);
    console.log(JSON.stringify({ status: 'success', path: savedPath }));
  } catch (err) {
    console.error('Failed to save dinosaur entry:', err);
    process.exit(1);
  }
}

module.exports = { generateMarkdownContent, saveDinoEntry };
