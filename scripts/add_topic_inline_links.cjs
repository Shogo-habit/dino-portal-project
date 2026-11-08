const fs = require('fs');
const path = require('path');

// 1. 全恐竜マスターの読み込み
const dinoDir = path.join(__dirname, '..', 'src', 'content', 'dinosaurs');
const dinoFiles = fs.readdirSync(dinoDir).filter(f => f.endsWith('.md'));

const dinos = [];
for (const file of dinoFiles) {
  const content = fs.readFileSync(path.join(dinoDir, file), 'utf8');
  const nameMatch = content.match(/^name:\s*[\"']?([^\"'\r\n]+)[\"']?/m);
  const idMatch = content.match(/^id:\s*[\"']?([^\"'\r\n]+)[\"']?/m) || [null, file.replace('.md', '')];
  if (nameMatch) {
    const name = nameMatch[1].trim();
    const id = idMatch[1].trim();
    // 誤爆リスクのある極小文字数（3文字未満: イー、メイ等）は除外
    if (name.length >= 3 && name !== 'メイ' && name !== 'イー') {
      dinos.push({ id, name });
    }
  }
}

// 最長一致のため文字数の降順でソート
dinos.sort((a, b) => b.name.length - a.name.length);

console.log(`Loaded ${dinos.length} valid dinosaur terms for inline linking.`);

// 2. トピック記事の走査
const topicsDir = path.join(__dirname, '..', 'src', 'content', 'topics');
const topicFiles = fs.readdirSync(topicsDir).filter(f => f.endsWith('.md') && !f.startsWith('_'));

function processArticle(filePath, isDryRun = true) {
  const fileName = path.basename(filePath);
  const rawContent = fs.readFileSync(filePath, 'utf8');

  // frontmatterと本文を分離
  const fmMatch = rawContent.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---([\s\S]*)$/);
  if (!fmMatch) {
    console.warn(`[Skip] No valid frontmatter: ${fileName}`);
    return;
  }

  const frontmatter = fmMatch[1];
  let body = fmMatch[2];

  // 記事自身の主役恐竜（ファイル名やidから推測）
  const topicId = fileName.replace('.md', '');

  // 記事内ですでに使われているリンクや、すでに初出リンクを付与した恐竜を追跡
  const linkedDinoIds = new Set();
  const addedLinks = [];

  // 本文中で既存の /dictionary/{id}/ リンクがあれば記録
  const existingLinkRegex = /\/dictionary\/([a-z0-9-]+)\//g;
  let match;
  while ((match = existingLinkRegex.exec(body)) !== null) {
    linkedDinoIds.add(match[1]);
  }

  // 本文の段落ごとに処理
  // 保護すべき領域（<a ...>...</a>, <img ...>, <code>...</code>, [text](url)）をプレースホルダー化
  const placeholders = [];
  function protect(str) {
    return str
      // HTMLタグ全体（<a ...>...</a>含む）
      .replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (m) => {
        placeholders.push(m);
        return `___PROTECTED_HTML_LINK_${placeholders.length - 1}___`;
      })
      .replace(/<[^>]+>/g, (m) => {
        placeholders.push(m);
        return `___PROTECTED_TAG_${placeholders.length - 1}___`;
      })
      // Markdownリンク [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m) => {
        placeholders.push(m);
        return `___PROTECTED_MD_LINK_${placeholders.length - 1}___`;
      })
      // コードブロック
      .replace(/`[^`]+`/g, (m) => {
        placeholders.push(m);
        return `___PROTECTED_CODE_${placeholders.length - 1}___`;
      });
  }

  function restore(str) {
    return str.replace(/___(PROTECTED_[A-Z_]+)_(\d+)___/g, (_, type, idx) => {
      return placeholders[parseInt(idx, 10)];
    });
  }

  let protectedBody = protect(body);

  // 恐竜ごとに初出の1箇所のみを置換
  for (const dino of dinos) {
    // 記事の主役恐竜自身（ファイル名にdino.idが含まれる場合）、またはすでにリンクされている恐竜はスキップ（初出リンクの原則）
    if (linkedDinoIds.has(dino.id) || fileName.toLowerCase().includes(dino.id)) {
      continue;
    }

    // 恐竜名がカタカナの単語境界（前後に別のカタカナ文字が続かない）で出現するかチェック
    // JavaScriptの正規表現でカタカナ境界を表現: (?<![\u30A0-\u30FF])恐竜名(?![\u30A0-\u30FF])
    const pattern = new RegExp(`(?<![\\u30A0-\\u30FF])${dino.name}(?![\\u30A0-\\u30FF])`, 'm');

    if (pattern.test(protectedBody)) {
      // 初出の1箇所のみ置換
      protectedBody = protectedBody.replace(pattern, `[${dino.name}](/dictionary/${dino.id}/)`);
      linkedDinoIds.add(dino.id);
      addedLinks.push(`${dino.name} (-> /dictionary/${dino.id}/)`);
    }
  }

  const finalBody = restore(protectedBody);

  console.log(`\n📄 [${fileName}] Links added: ${addedLinks.length}`);
  if (addedLinks.length > 0) {
    console.log(`   Added: ${addedLinks.slice(0, 10).join(', ')}${addedLinks.length > 10 ? ' ...' : ''}`);
  }

  if (!isDryRun && addedLinks.length > 0) {
    const newContent = `---\n${frontmatter}\n---${finalBody}`;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`   -> Successfully written to ${fileName}`);
  }
}

// 実行モード確認
const isDryRun = process.argv.includes('--dry-run') || !process.argv.includes('--apply');
console.log(`Mode: ${isDryRun ? 'DRY-RUN (Simulating without modifying files)' : 'APPLY (Writing changes to files)'}`);

for (const file of topicFiles) {
  processArticle(path.join(topicsDir, file), isDryRun);
}
