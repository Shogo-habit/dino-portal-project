const fs = require('fs');
const path = require('path');

function validateDino(id) {
  const filePath = path.join(__dirname, '..', 'src', 'content', 'dinosaurs', `${id}.md`);
  if (!fs.existsSync(filePath)) {
    return { id, pass: false, errors: [`File not found: ${filePath}`] };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const parts = content.split('---');
  if (parts.length < 3) {
    return { id, pass: false, errors: ['Invalid markdown frontmatter structure'] };
  }

  const frontmatter = parts[1];
  const body = parts.slice(2).join('---').trim();
  const errors = [];

  // 1. cyberMetadata チェック
  const realHeightMatch = frontmatter.match(/realHeight:\s*([0-9.]+)/);
  const realLengthMatch = frontmatter.match(/realLength:\s*([0-9.]+)/);
  const bottomGapMatch = frontmatter.match(/bottomGap:\s*(\d+)/);
  const contentHeightPxMatch = frontmatter.match(/contentHeightPx:\s*(\d+)/);
  const sourceResMatch = frontmatter.match(/sourceRes:\s*(\d+)/);
  const zoomMatch = frontmatter.match(/zoom:\s*([0-9.]+)/);

  if (!realHeightMatch) errors.push('Missing cyberMetadata.realHeight');
  if (!realLengthMatch) errors.push('Missing cyberMetadata.realLength');
  if (!bottomGapMatch) errors.push('Missing cyberMetadata.bottomGap');
  if (!contentHeightPxMatch) errors.push('Missing cyberMetadata.contentHeightPx');
  if (!sourceResMatch) errors.push('Missing cyberMetadata.sourceRes');
  if (!zoomMatch) errors.push('Missing cyberMetadata.zoom');

  const realHeight = realHeightMatch ? parseFloat(realHeightMatch[1]) : null;

  // 2. 見出し構成チェック (h3 が正確に4つ)
  const h3Matches = body.match(/^###\s+(.+)$/gm) || [];
  if (h3Matches.length !== 4) {
    errors.push(`H3 heading count must be 4, found: ${h3Matches.length}`);
  }

  // 3. 第2見出しキーワードチェック (サイズ | 実寸 | スケール)
  if (h3Matches.length >= 2) {
    const secondH3 = h3Matches[1];
    if (!/(サイズ|実寸|スケール)/.test(secondH3)) {
      errors.push(`Second H3 heading must contain "サイズ", "実寸", or "スケール": "${secondH3}"`);
    }
  }

  // 4. 実寸数値の完全一致チェック
  if (realHeight !== null) {
    // 例: 全高約2.5メートル または 全高約2.5m (1.0 と 1 の両対応)
    const formatted = Number.isInteger(realHeight) ? `(?:${realHeight}|${realHeight}\\.0)` : `${realHeight}`;
    const heightRegex = new RegExp(`全高約${formatted}(?:メートル|m)`);
    if (!heightRegex.test(body)) {
      errors.push(`Body text does not contain "全高約${realHeight}メートル" matching realHeight (${realHeight})`);
    }
  }

  // 5. 禁止用語チェック
  if (body.includes('エイペックス')) {
    errors.push('Contains forbidden term: "エイペックス" (Use "頂点捕食者" instead)');
  }
  // 単独スカベンジャー禁止（"腐肉食動物（スカベンジャー）" や "腐肉食者（スカベンジャー）" はOK）
  const scavengerMatches = body.match(/スカベンジャー/g) || [];
  const allowedScavenger = body.match(/(?:腐肉食(?:動物|者)?(?:（|\())スカベンジャー(?:）|\))/g) || [];
  if (scavengerMatches.length > allowedScavenger.length) {
    errors.push('Contains standalone "スカベンジャー" without "腐肉食動物（スカベンジャー）" notation');
  }

  // 6. 文字数チェック (おおむね 1900〜2400文字)
  const bodyLen = body.length;
  if (bodyLen < 1850 || bodyLen > 2450) {
    errors.push(`Body length (${bodyLen} chars) out of ideal range (1900-2400 chars)`);
  }

  // 7. 画像ファイルの存在チェック
  const cyberImgPath = path.join(__dirname, '..', 'public', 'images', 'cyber', `${id}.webp`);
  if (!fs.existsSync(cyberImgPath)) {
    errors.push(`Cyber image file not found: ${cyberImgPath}`);
  }

  return {
    id,
    pass: errors.length === 0,
    errors,
    bodyLen,
    realHeight,
    h3Headings: h3Matches
  };
}

// CLI実行
if (require.main === module) {
  const ids = process.argv.slice(2);
  if (ids.length === 0) {
    console.error('Usage: node validate_tier.cjs <id1> <id2> ...');
    process.exit(1);
  }

  let allPass = true;
  for (const id of ids) {
    const res = validateDino(id);
    if (res.pass) {
      console.log(`✅ [PASS] ${id} (${res.bodyLen} chars, realHeight: ${res.realHeight}m)`);
    } else {
      allPass = false;
      console.error(`❌ [FAIL] ${id}:`);
      res.errors.forEach(e => console.error(`   - ${e}`));
    }
  }

  process.exit(allPass ? 0 : 1);
}

module.exports = { validateDino };
