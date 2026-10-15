const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dinoDir = path.join(__dirname, '..', 'src', 'content', 'dinosaurs');
const cyberDir = path.join(__dirname, '..', 'public', 'images', 'cyber');
const publicDir = path.join(__dirname, '..', 'public');

const files = fs.readdirSync(dinoDir).filter(f => f.endsWith('.md')).sort();

console.log(`Auditing ${files.length} dinosaur files...\n`);

const results = [];

for (const file of files) {
  const id = file.replace(/\.md$/, '');
  const filePath = path.join(dinoDir, file);
  const rawContent = fs.readFileSync(filePath, 'utf8');

  const fileIssues = [];

  // 1. 分割
  const parts = rawContent.split('---');
  if (parts.length < 3) {
    results.push({
      id,
      critical: ['Frontmatter split failed (less than 3 parts)']
    });
    continue;
  }

  const fmMatterRaw = parts[1];
  const body = parts.slice(2).join('---').trim();

  let data = {};
  try {
    data = yaml.load(fmMatterRaw);
  } catch (e) {
    fileIssues.push({ type: 'YAML_PARSE_ERROR', message: e.message });
  }

  // フロントマター必須項目チェック
  const requiredFields = ['id', 'name', 'kana', 'scientificName', 'era', 'region', 'diet', 'length', 'weight', 'group', 'description', 'cyberMetadata'];
  for (const f of requiredFields) {
    if (!data[f]) {
      fileIssues.push({ type: 'MISSING_FIELD', field: f, message: `Missing field: ${f}` });
    }
  }

  // cyberMetadata チェック
  const cyber = data.cyberMetadata || {};
  const cyberFields = ['realHeight', 'realLength', 'contentHeightPx', 'bottomGap', 'sourceRes', 'zoom'];
  for (const cf of cyberFields) {
    if (cyber[cf] === undefined || cyber[cf] === null) {
      fileIssues.push({ type: 'MISSING_CYBER_FIELD', field: cf, message: `Missing cyberMetadata.${cf}` });
    }
  }

  // Cyber画像存在チェック
  const cyberPath = path.join(cyberDir, `${id}.webp`);
  if (!fs.existsSync(cyberPath)) {
    fileIssues.push({ type: 'MISSING_CYBER_IMAGE', path: `public/images/cyber/${id}.webp` });
  }

  // 見出しチェック (H3)
  const h3Lines = body.split('\n').filter(line => line.startsWith('### '));
  const h3Headings = h3Lines.map(line => line.replace(/^###\s+/, '').trim());

  if (h3Headings.length !== 4) {
    fileIssues.push({
      type: 'INVALID_H3_COUNT',
      count: h3Headings.length,
      message: `H3 heading count is ${h3Headings.length} (expected exactly 4)`
    });
  }

  // 見出し番号残存チェック
  const numberRegex = /^[0-9０-９]+[\.、:：\s]|^第[0-9０-９一二三四]+章|^[①②③④ⅠⅡⅢⅣ]/;
  h3Headings.forEach((h, idx) => {
    if (numberRegex.test(h)) {
      fileIssues.push({
        type: 'HEADING_NUMBER_FOUND',
        headingIndex: idx + 1,
        heading: h,
        message: `Heading ${idx + 1} contains numbers/chapter prefix: "${h}"`
      });
    }
  });

  // 第2章キーワードチェック
  if (h3Headings.length >= 2) {
    const secondH3 = h3Headings[1];
    if (!/(サイズ|実寸|スケール)/.test(secondH3)) {
      fileIssues.push({
        type: 'MISSING_SIZE_KEYWORD_IN_H3_2',
        heading: secondH3,
        message: `Second H3 heading must contain (サイズ|実寸|スケール): "${secondH3}"`
      });
    }
  }

  // 禁止語チェック
  if (body.includes('エイペックス')) {
    fileIssues.push({
      type: 'FORBIDDEN_WORD',
      word: 'エイペックス',
      message: 'Contains forbidden term "エイペックス"'
    });
  }

  // スカベンジャー単独使用チェック
  const allScavengers = (body.match(/スカベンジャー/g) || []).length;
  const allowedScavengers = (body.match(/(?:腐肉食(?:動物|者)?(?:（|\())スカベンジャー(?:）|\))/g) || []).length;
  if (allScavengers > allowedScavengers) {
    fileIssues.push({
      type: 'UNPAIRED_SCAVENGER',
      count: allScavengers - allowedScavengers,
      message: `Contains standalone "スカベンジャー" (${allScavengers - allowedScavengers} un-paired instances)`
    });
  }

  // 文字数カウント
  const charCountWithoutWhitespace = body.replace(/\s+/g, '').length;
  const rawCharCount = body.length;

  if (charCountWithoutWhitespace < 1800) {
    fileIssues.push({
      type: 'BODY_LENGTH_LOW',
      chars: charCountWithoutWhitespace,
      message: `Body text is too short: ${charCountWithoutWhitespace} chars (without whitespace)`
    });
  } else if (charCountWithoutWhitespace > 3200) {
    fileIssues.push({
      type: 'BODY_LENGTH_HIGH',
      chars: charCountWithoutWhitespace,
      message: `Body text is very long: ${charCountWithoutWhitespace} chars (without whitespace)`
    });
  }

  // セクション分割チェック (4つのH3で分割)
  const sections = body.split(/^###\s+/m).slice(1);
  const sectionLens = sections.map(s => s.replace(/\s+/g, '').length);

  // 数値完全整合性チェック
  const realHeight = cyber.realHeight !== undefined ? parseFloat(cyber.realHeight) : null;
  const realLength = cyber.realLength !== undefined ? parseFloat(cyber.realLength) : null;
  const fmLengStr = (data.length || '').toString().trim();
  const fmWeightStr = (data.weight || '').toString().trim();

  // 1) length文字列から数値抽出 (例: "7.5m" -> 7.5, "5.0cm" -> 0.05)
  const lengthNumMatch = fmLengStr.match(/([0-9.]+)/);
  let lengthNum = lengthNumMatch ? parseFloat(lengthNumMatch[1]) : null;
  if (lengthNum !== null && fmLengStr.includes('cm')) {
    lengthNum = lengthNum / 100;
  }

  // cyberMetadata.realLength と length の一致確認
  if (realLength !== null && lengthNum !== null) {
    if (Math.abs(realLength - lengthNum) > 0.01) {
      fileIssues.push({
        type: 'LENGTH_MISMATCH_FM',
        length: fmLengStr,
        realLength: realLength,
        message: `Frontmatter length "${fmLengStr}" does not match cyberMetadata.realLength (${realLength})`
      });
    }
  }

  // 2) 第2章のテキスト抽出 (sections[1] が第2章)
  const section2Text = sections[1] || '';

  // realHeight が第2章（または本文）に含まれているかチェック
  if (realHeight !== null) {
    // 全高約X.Xメートル / 全高約X.Xm / 体高約... などのパターン
    const formattedHeight = Number.isInteger(realHeight) ? `(?:${realHeight}|${realHeight}\\.0)` : `${realHeight}`;
    // 柔軟な一致パターン
    const heightRegex = new RegExp(`(?:全高|体高|全高約|体高約|高さ約|高さ)\\s*(?:約)?\\s*${formattedHeight}\\s*(?:メートル|m)`);
    if (!heightRegex.test(section2Text)) {
      // 本文全体でも検索してみる
      const heightInBody = heightRegex.test(body);
      fileIssues.push({
        type: 'REAL_HEIGHT_NOT_IN_TEXT',
        realHeight: realHeight,
        inBody: heightInBody,
        message: `realHeight (${realHeight}) not found matching "全高約${realHeight}メートル" in Section 2 (found in body: ${heightInBody})`
      });
    }
  }

  // realLength が第2章（または本文）に含まれているかチェック
  if (realLength !== null) {
    const formattedLength = Number.isInteger(realLength) ? `(?:${realLength}|${realLength}\\.0)` : `${realLength}`;
    const lengthRegex = new RegExp(`(?:全長|体長|全長約|体長約)\\s*(?:約)?(?:[0-9.]+\\s*[〜~～-]\s*)?${formattedLength}\\s*(?:メートル|m)`);
    // 逆向きの範囲 (例: 8.5〜9.0m)
    const lengthRegex2 = new RegExp(`(?:全長|体長|全長約|体長約)\\s*(?:約)?\\s*${formattedLength}`);
    if (!lengthRegex.test(section2Text) && !lengthRegex2.test(section2Text)) {
      const lenInBody = lengthRegex.test(body) || lengthRegex2.test(body);
      fileIssues.push({
        type: 'REAL_LENGTH_NOT_IN_TEXT',
        realLength: realLength,
        inBody: lenInBody,
        message: `realLength (${realLength}) not clearly found matching "全長約...${realLength}メートル" in Section 2 (found in body: ${lenInBody})`
      });
    }
  }

  // weight の数値が第2章に含まれているかチェック
  if (fmWeightStr) {
    const weightNumMatch = fmWeightStr.match(/([0-9.]+)/);
    if (weightNumMatch) {
      const weightNum = parseFloat(weightNumMatch[1]);
      const formattedWeight = Number.isInteger(weightNum) ? `(?:${weightNum}|${weightNum}\\.0)` : `${weightNum}`;
      const isTon = fmWeightStr.includes('t') || fmWeightStr.includes('トン');
      const isKg = fmWeightStr.includes('kg') || fmWeightStr.includes('キロ');
      const unit = isTon ? '(?:トン|t)' : isKg ? '(?:キログラム|kg)' : '';
      const weightRegex = new RegExp(`(?:体重|重さ)(?:約)?.*${formattedWeight}\\s*${unit}`);
      const simpleWeightRegex = new RegExp(`${formattedWeight}\\s*${unit}`);
      if (!weightRegex.test(section2Text) && !simpleWeightRegex.test(section2Text)) {
        fileIssues.push({
          type: 'WEIGHT_NOT_IN_SECTION2',
          weight: fmWeightStr,
          weightNum: weightNum,
          message: `Weight "${fmWeightStr}" number (${weightNum}) not clearly found in Section 2`
        });
      }
    }
  }

  results.push({
    id,
    name: data.name || id,
    scientificName: data.scientificName || '',
    group: data.group || 'Unknown',
    diet: data.diet || 'Unknown',
    era: data.era || 'Unknown',
    realHeight,
    realLength,
    length: fmLengStr,
    weight: fmWeightStr,
    charCount: charCountWithoutWhitespace,
    rawCharCount,
    h3Count: h3Headings.length,
    h3Headings,
    issues: fileIssues
  });
}

// サマリー集計
const totalFiles = results.length;
const filesWithIssues = results.filter(r => r.issues.length > 0);
const issueTypeCounts = {};

results.forEach(r => {
  r.issues.forEach(iss => {
    issueTypeCounts[iss.type] = (issueTypeCounts[iss.type] || 0) + 1;
  });
});

console.log('================ AUDIT SUMMARY ================');
console.log(`Total files inspected: ${totalFiles}`);
console.log(`Files with at least 1 issue: ${filesWithIssues.length}`);
console.log(`Files 100% clean: ${totalFiles - filesWithIssues.length}`);
console.log('\nIssue Breakdown by Type:');
for (const [t, cnt] of Object.entries(issueTypeCounts)) {
  console.log(`  - ${t}: ${cnt}`);
}

// 結果をJSONファイルに出力
const outputPath = path.join(__dirname, 'audit_results.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
console.log(`\nDetailed results saved to ${outputPath}`);
