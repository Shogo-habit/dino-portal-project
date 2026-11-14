import sharp from '/Users/kosako/kaihatsu/dinosaurs website/node_modules/sharp/dist/index.cjs';
import fs from 'node:fs';

async function processProtoceratops() {
    const inputPath = '/Users/kosako/.gemini/antigravity/brain/99a6726f-dfe3-453d-b686-3443fce048eb/protoceratops_battle_asset_1794637831898.jpg';
    const outputPath = '/Users/kosako/kaihatsu/dinosaurs website/public/images/cyber/protoceratops_battle.webp';

    console.log('Reading raw image...');
    const image = sharp(inputPath);
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const width = info.width;
    const height = info.height;

    // 1. BFS Flood Fill from edges to detect pure black background
    const visited = new Uint8Array(width * height);
    const queue = [];
    const getIdx = (x, y) => (y * width + x) * 4;

    const isBlackBg = (x, y) => {
        const idx = getIdx(x, y);
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const maxVal = Math.max(r, g, b);
        return maxVal <= 24;
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

    // 2. Soft anti-aliasing on transition edges
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
                if (maxVal <= 28) {
                    outData[idx + 3] = 0;
                } else if (maxVal < 65) {
                    const alphaRatio = (maxVal - 28) / (65 - 28);
                    outData[idx + 3] = Math.round(alphaRatio * 255);
                }
            }
        }
    }

    // 3. Find precise creature bounding box
    let minX = width, maxX = 0, minY = height, maxY = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const a = outData[(y * width + x) * 4 + 3];
            if (a > 10) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    console.log(`Cropped bounding box: ${cropW}x${cropH} at (${minX}, ${minY})`);

    // Extract cropped creature
    const croppedBuffer = await sharp(outData, { raw: { width, height, channels: 4 } })
        .extract({ left: minX, top: minY, width: cropW, height: cropH })
        .png()
        .toBuffer();

    // Resize so width is 980px (standard horizontal dino fit in 1024)
    const targetW = 980;
    const targetH = Math.round((cropH / cropW) * targetW);
    console.log(`Resizing to: ${targetW}x${targetH}`);

    const resizedBuffer = await sharp(croppedBuffer)
        .resize(targetW, targetH, { fit: 'fill' })
        .png()
        .toBuffer();

    // Extend to 1024x1024 square with Alpha = 0
    const padTop = Math.floor((1024 - targetH) / 2);
    const padBottom = 1024 - targetH - padTop;
    const padLeft = Math.floor((1024 - targetW) / 2);
    const padRight = 1024 - targetW - padLeft;

    console.log(`Padding: top=${padTop}, bottom=${padBottom}, left=${padLeft}, right=${padRight}`);

    await sharp(resizedBuffer)
        .extend({
            top: padTop,
            bottom: padBottom,
            left: padLeft,
            right: padRight,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ lossless: true, quality: 100 })
        .toFile(outputPath);

    console.log(`Saved lossless WebP to: ${outputPath}`);

    // Scan the final 1024x1024 WebP to get exact contentHeightPx and bottomGap
    const finalImage = sharp(outputPath);
    const { data: finalData, info: finalInfo } = await finalImage.raw().toBuffer({ resolveWithObject: true });

    let finalMinY = 1024, finalMaxY = 0;
    for (let y = 0; y < 1024; y++) {
        for (let x = 0; x < 1024; x++) {
            const a = finalData[(y * 1024 + x) * 4 + 3];
            if (a > 20) {
                if (y < finalMinY) finalMinY = y;
                if (y > finalMaxY) finalMaxY = y;
            }
        }
    }

    const contentHeightPx = finalMaxY - finalMinY + 1;
    const bottomGap = 1024 - 1 - finalMaxY;
    console.log(`=== SCAN RESULT ===`);
    console.log(`contentHeightPx: ${contentHeightPx}`);
    console.log(`bottomGap: ${bottomGap}`);
}

processProtoceratops();
