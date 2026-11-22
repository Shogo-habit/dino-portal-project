const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CYBER_DIR = path.join(__dirname, '..', 'public', 'images', 'cyber');
const SIZE_COMP_PATH = path.join(__dirname, '..', 'src', 'pages', 'size-comparison.astro');
const BOUNDS_PATH = path.join(__dirname, '..', 'src', 'data', 'cyberDrawnBounds.json');

async function getPixelBounds(filePath) {
    const { data, info } = await sharp(filePath)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const channels = info.channels;

    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * channels;
            const alpha = data[idx + 3];
            if (alpha > 15) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    if (maxX < minX || maxY < minY) {
        return { drawnHeight: height, drawnWidth: width, bottomGap: 0, topGap: 0 };
    }

    return {
        drawnHeight: (maxY - minY) + 1,
        drawnWidth: (maxX - minX) + 1,
        bottomGap: height - 1 - maxY,
        topGap: minY
    };
}

async function verify() {
    console.log('🔍 Checking drawn height calibrations for battle & cyber assets...');

    // 1. Scan all battle and real files in CYBER_DIR
    const files = fs.readdirSync(CYBER_DIR).filter(f => f.endsWith('_battle.webp') || f.endsWith('_real.webp'));
    const bounds = fs.existsSync(BOUNDS_PATH) ? JSON.parse(fs.readFileSync(BOUNDS_PATH, 'utf8')) : {};
    let updatedBounds = false;

    // 2. Read size-comparison.astro and isolate BATTLE_ASSETS block
    const astroContent = fs.readFileSync(SIZE_COMP_PATH, 'utf8');
    const battleAssetsMatch = astroContent.match(/const BATTLE_ASSETS:[^=]*=\s*\{([\s\S]*?)\n\s*\};/);
    if (!battleAssetsMatch) {
        console.error('Could not find BATTLE_ASSETS in size-comparison.astro');
        process.exit(1);
    }
    const battleAssetsBlock = battleAssetsMatch[1];

    let errors = 0;
    let warnings = 0;

    for (const file of files) {
        const key = file.replace('.webp', '');
        const baseId = key.replace('_battle', '').replace('_real', '');
        const filePath = path.join(CYBER_DIR, file);

        const actual = await getPixelBounds(filePath);

        // Update bounds dictionary if missing or changed
        if (!bounds[key] || Math.abs(bounds[key].drawnHeight - actual.drawnHeight) > 2) {
            bounds[key] = actual;
            updatedBounds = true;
        }

        // Check if defined in BATTLE_ASSETS block
        const regex = new RegExp(`(?:^|\\n)\\s*${baseId}:\\s*\\{([^}]+)\\}`, 'm');
        const match = battleAssetsBlock.match(regex);

        if (match) {
            const block = match[1];
            const contentHeightMatch = block.match(/contentHeightPx:\s*(\d+)/);
            const drawnHeightMatch = block.match(/drawnHeightPx:\s*(\d+)/);

            const contentH = contentHeightMatch ? parseInt(contentHeightMatch[1], 10) : null;
            const drawnH = drawnHeightMatch ? parseInt(drawnHeightMatch[1], 10) : null;

            if (!drawnH) {
                // If contentHeight differs significantly from actual drawn height, missing drawnHeightPx causes clipping!
                if (contentH && Math.abs(actual.drawnHeight - contentH) / contentH > 0.05) {
                    console.error(`❌ [MISMATCH] ${baseId}: Missing drawnHeightPx! contentHeightPx is ${contentH}, but actual drawnHeight is ${actual.drawnHeight} (ratio ${(actual.drawnHeight / contentH).toFixed(2)}x). THIS WILL CAUSE STAGE CLIPPING.`);
                    errors++;
                } else {
                    console.warn(`⚠️ [WARNING] ${baseId}: No explicit drawnHeightPx specified. Actual is ${actual.drawnHeight}.`);
                    warnings++;
                }
            } else {
                const diff = Math.abs(drawnH - actual.drawnHeight);
                if (diff > 5) {
                    console.warn(`⚠️ [NOTICE] ${baseId}: drawnHeightPx (${drawnH}) differs from scanned (${actual.drawnHeight}) by ${diff}px.`);
                    warnings++;
                } else {
                    console.log(`✅ [OK] ${baseId}: calibrated contentH=${contentH}, drawnH=${drawnH} (actual=${actual.drawnHeight})`);
                }
            }
        }
    }

    if (updatedBounds || process.argv.includes('--update')) {
        fs.writeFileSync(BOUNDS_PATH, JSON.stringify(bounds, null, 2), 'utf8');
        console.log(`💾 Updated ${BOUNDS_PATH}`);
    }

    console.log(`\nVerification completed: ${errors} errors, ${warnings} warnings.`);
    if (errors > 0) {
        process.exit(1);
    }
}

verify().catch(err => {
    console.error(err);
    process.exit(1);
});
