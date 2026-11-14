import sharp from '/Users/kosako/kaihatsu/dinosaurs website/node_modules/sharp/dist/index.cjs';
import fs from 'node:fs';

const ASSETS = [
    {
        id: 'human',
        name: '人間',
        inputPath: '/Users/kosako/.gemini/antigravity/brain/99a6726f-dfe3-453d-b686-3443fce048eb/human_reference_1794638039066.jpg',
        outputPath: '/Users/kosako/kaihatsu/dinosaurs website/public/images/cyber/human_real.webp',
        fitMode: 'height',
        fitTarget: 936
    },
    {
        id: 'car',
        name: '乗用車',
        inputPath: '/Users/kosako/.gemini/antigravity/brain/99a6726f-dfe3-453d-b686-3443fce048eb/car_reference_black_1794638093459.jpg',
        outputPath: '/Users/kosako/kaihatsu/dinosaurs website/public/images/cyber/car_real.webp',
        fitMode: 'width',
        fitTarget: 980
    },
    {
        id: 'elephant',
        name: 'アフリカゾウ',
        inputPath: '/Users/kosako/.gemini/antigravity/brain/99a6726f-dfe3-453d-b686-3443fce048eb/african_elephant_sideview_1794638044588.jpg',
        outputPath: '/Users/kosako/kaihatsu/dinosaurs website/public/images/cyber/elephant_real.webp',
        fitMode: 'width',
        fitTarget: 900
    },
    {
        id: 'whale',
        name: 'シロナガスクジラ',
        inputPath: '/Users/kosako/.gemini/antigravity/brain/99a6726f-dfe3-453d-b686-3443fce048eb/blue_whale_black_background_1794638080975.jpg',
        outputPath: '/Users/kosako/kaihatsu/dinosaurs website/public/images/cyber/whale_real.webp',
        fitMode: 'width',
        fitTarget: 980
    },
    {
        id: 'airplane',
        name: '大型ジェット旅客機',
        inputPath: '/Users/kosako/.gemini/antigravity/brain/99a6726f-dfe3-453d-b686-3443fce048eb/commercial_jet_airliner_sideview_1794638101304.jpg',
        outputPath: '/Users/kosako/kaihatsu/dinosaurs website/public/images/cyber/airplane_real.webp',
        fitMode: 'width',
        fitTarget: 980
    }
];

async function processAsset(cfg) {
    console.log(`\n=================== Processing ${cfg.name} (${cfg.id}) ===================`);
    const image = sharp(cfg.inputPath);
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const width = info.width;
    const height = info.height;

    // 1. BFS Flood Fill from outer edges
    const visited = new Uint8Array(width * height);
    const queue = [];
    const getIdx = (x, y) => (y * width + x) * 4;

    const isBlackBg = (x, y) => {
        const idx = getIdx(x, y);
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        return Math.max(r, g, b) <= 24;
    };

    for (let x = 0; x < width; x++) {
        if (isBlackBg(x, 0)) { visited[x] = 1; queue.push(x, 0); }
        if (isBlackBg(x, height - 1)) { visited[(height - 1) * width + x] = 1; queue.push(x, height - 1); }
    }
    for (let y = 0; y < height; y++) {
        if (!visited[y * width] && isBlackBg(0, y)) { visited[y * width] = 1; queue.push(0, y); }
        if (!visited[y * width + (width - 1)] && isBlackBg(width - 1, y)) { visited[y * width + (width - 1)] = 1; queue.push(width - 1, y); }
    }

    let head = 0;
    const dx4 = [1, -1, 0, 0];
    const dy4 = [0, 0, 1, -1];
    while (head < queue.length) {
        const cx = queue[head++];
        const cy = queue[head++];

        for (let i = 0; i < 4; i++) {
            const nx = cx + dx4[i];
            const ny = cy + dy4[i];
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nPos = ny * width + nx;
                if (!visited[nPos] && isBlackBg(nx, ny)) {
                    visited[nPos] = 1;
                    queue.push(nx, ny);
                }
            }
        }
    }

    const outData = Buffer.from(data);
    for (let i = 0; i < width * height; i++) {
        if (visited[i]) {
            outData[i * 4 + 3] = 0;
        }
    }

    // 2. Soft anti-aliasing / defringing on boundaries
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            if (outData[idx + 3] === 0) continue;

            const r = outData[idx];
            const g = outData[idx + 1];
            const b = outData[idx + 2];
            const maxVal = Math.max(r, g, b);

            let hasTransNeighbor = false;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        if (outData[(ny * width + nx) * 4 + 3] === 0) {
                            hasTransNeighbor = true;
                            break;
                        }
                    }
                }
                if (hasTransNeighbor) break;
            }

            if (hasTransNeighbor) {
                if (maxVal <= 26) {
                    outData[idx + 3] = 0;
                } else if (maxVal < 65) {
                    const alphaRatio = (maxVal - 26) / (65 - 26);
                    outData[idx + 3] = Math.round(alphaRatio * 255);
                }
            }
        }
    }

    // 3. Find bounding box
    let minX = width, maxX = 0, minY = height, maxY = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const a = outData[(y * width + x) * 4 + 3];
            if (a > 15) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    console.log(`Bounding box: ${cropW}x${cropH} at (${minX}, ${minY})`);

    const croppedBuffer = await sharp(outData, { raw: { width, height, channels: 4 } })
        .extract({ left: minX, top: minY, width: cropW, height: cropH })
        .png()
        .toBuffer();

    let targetW, targetH;
    if (cfg.fitMode === 'height') {
        targetH = cfg.fitTarget;
        targetW = Math.round((cropW / cropH) * targetH);
    } else {
        targetW = cfg.fitTarget;
        targetH = Math.round((cropH / cropW) * targetW);
    }
    console.log(`Resizing to: ${targetW}x${targetH}`);

    const resizedBuffer = await sharp(croppedBuffer)
        .resize(targetW, targetH, { fit: 'fill' })
        .png()
        .toBuffer();

    const padTop = Math.floor((1024 - targetH) / 2);
    const padBottom = 1024 - targetH - padTop;
    const padLeft = Math.floor((1024 - targetW) / 2);
    const padRight = 1024 - targetW - padLeft;

    await sharp(resizedBuffer)
        .extend({
            top: padTop,
            bottom: padBottom,
            left: padLeft,
            right: padRight,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ lossless: true, quality: 100 })
        .toFile(cfg.outputPath);

    console.log(`Saved lossless WebP to: ${cfg.outputPath}`);

    // Scan final
    const finalImage = sharp(cfg.outputPath);
    const { data: finalData } = await finalImage.raw().toBuffer({ resolveWithObject: true });

    let finalMinY = 1024, finalMaxY = 0, finalMinX = 1024, finalMaxX = 0;
    for (let y = 0; y < 1024; y++) {
        for (let x = 0; x < 1024; x++) {
            const a = finalData[(y * 1024 + x) * 4 + 3];
            if (a > 20) {
                if (y < finalMinY) finalMinY = y;
                if (y > finalMaxY) finalMaxY = y;
                if (x < finalMinX) finalMinX = x;
                if (x > finalMaxX) finalMaxX = x;
            }
        }
    }

    const contentHeightPx = finalMaxY - finalMinY + 1;
    const bottomGap = 1024 - 1 - finalMaxY;
    const leftPad = finalMinX;
    const rightPad = 1024 - 1 - finalMaxX;

    return {
        id: cfg.id,
        name: cfg.name,
        image: `/images/cyber/${cfg.id}_real.webp`,
        contentHeightPx,
        bottomGap,
        leftPad,
        rightPad
    };
}

async function main() {
    const results = [];
    for (const asset of ASSETS) {
        const res = await processAsset(asset);
        results.push(res);
    }
    console.log('\n=================== FINAL SUMMARY ===================');
    console.log(JSON.stringify(results, null, 2));
}

main();
