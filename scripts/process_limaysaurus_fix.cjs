const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function processLimaysaurus(mainInput, cyberInput) {
  console.log(`\n=== Processing Fixed Limaysaurus Assets ===`);
  
  // 1. Process Main Asset
  const mainOut = path.join(__dirname, '../public/images/limaysaurus.webp');
  console.log(`Processing main asset: ${mainInput} -> ${mainOut}`);
  execSync(`node "${path.join(__dirname, 'process_main_asset.cjs')}" "${mainInput}" "limaysaurus"`, { stdio: 'inherit' });
  
  // 2. Process Cyber Asset
  const cyberOut = path.join(__dirname, '../public/images/cyber/limaysaurus.webp');
  console.log(`Processing cyber asset: ${cyberInput} -> ${cyberOut}`);
  const scanOutput = execSync(`node "${path.join(__dirname, 'process_cyber_asset.cjs')}" "${cyberInput}" "${cyberOut}"`).toString();
  console.log(scanOutput);

  const match = scanOutput.match(/\{[\s\S]*"contentHeightPx":[\s\S]*\}/);
  if (match) {
    const meta = JSON.parse(match[0]);
    const width = meta.contentWidthPx || meta.contentWidth;
    const realLength = 15.0;
    const realHeight = 3.8;
    const calibratedHeight = Math.round(realHeight * width / realLength);
    const finalEffectiveLength = (realHeight * (width / calibratedHeight)).toFixed(2);
    
    const result = {
      id: 'limaysaurus',
      realLength,
      realHeight,
      rawContentHeightPx: meta.contentHeightPx,
      contentHeightPx: calibratedHeight,
      bottomGap: meta.bottomGap,
      contentWidthPx: width,
      aspectRatio: (width / meta.contentHeightPx).toFixed(2),
      calibratedEffectiveLength: finalEffectiveLength
    };
    console.log('Result:', result);
    return result;
  }
  throw new Error('Failed to parse scan output');
}

module.exports = { processLimaysaurus };
