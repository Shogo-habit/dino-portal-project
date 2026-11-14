import fs from 'node:fs';
import path from 'node:path';
import sharp from '/Users/kosako/kaihatsu/dinosaurs website/node_modules/sharp/dist/index.cjs';

async function measureAsset(filePath) {
    const { data } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
    let minX = 1024, maxX = 0, minY = 1024, maxY = 0;
    for (let y = 0; y < 1024; y++) {
        for (let x = 0; x < 1024; x++) {
            if (data[(y * 1024 + x) * 4 + 3] > 20) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }
    return {
        w: maxX - minX + 1,
        h: maxY - minY + 1,
        minX,
        maxX,
        minY,
        maxY,
        bottomGap: 1024 - 1 - maxY
    };
}

async function runCalibration() {
    const dinos = [
        'tyrannosaurus', 'triceratops', 'velociraptor', 'protoceratops',
        'allosaurus', 'stegosaurus', 'spinosaurus', 'giganotosaurus',
        'brachiosaurus', 'ankylosaurus', 'mosasaurus', 'pteranodon',
        'pachycephalosaurus', 'parasaurolophus', 'quetzalcoatlus',
        'elasmosaurus', 'styracosaurus', 'argentinosaurus', 'iguanodon'
    ];

    console.log('--- CALIBRATION CALCULATION ---');
    const boneCalibrations = {};
    const battleCalibrations = {};

    for (const id of dinos) {
        const mdPath = path.join('src/content/dinosaurs', `${id}.md`);
        const content = fs.readFileSync(mdPath, 'utf8');

        const realHMatch = content.match(/realHeight:\s*([0-9.]+)/);
        const realLMatch = content.match(/realLength:\s*([0-9.]+)/);
        const lengthStrMatch = content.match(/length:\s*"([^"]+)"/);

        const realH = realHMatch ? parseFloat(realHMatch[1]) : 2.0;
        let realL = realLMatch ? parseFloat(realLMatch[1]) : 0;
        if (!realL && lengthStrMatch) {
            realL = parseFloat(lengthStrMatch[1].replace('m', ''));
        }

        const bonePath = path.join('public/images/cyber', `${id}.webp`);
        const battlePath = path.join('public/images/cyber', `${id}_battle.webp`);

        const boneDims = await measureAsset(bonePath);
        const battleDims = await measureAsset(battlePath);

        // Special handling for upright species: Pteranodon and Quetzalcoatlus standing on ground
        const isUpright = (id === 'pteranodon' || id === 'quetzalcoatlus');

        let boneContentH, battleContentH;

        if (isUpright) {
            // Calibrate to exact standing height
            boneContentH = boneDims.h;
            battleContentH = battleDims.h;
        } else {
            // Target length is realL
            // renderedLength = w * (realH / contentH) = realL
            // => contentH = Math.round(w * realH / realL)
            boneContentH = Math.round((boneDims.w * realH) / realL);
            battleContentH = Math.round((battleDims.w * realH) / realL);
        }

        const boneScale = realH / boneContentH;
        const boneRenderW = boneDims.w * boneScale;
        const boneRenderH = boneDims.h * boneScale;

        const battleScale = realH / battleContentH;
        const battleRenderW = battleDims.w * battleScale;
        const battleRenderH = battleDims.h * battleScale;

        const diffW = Math.abs(battleRenderW - boneRenderW);
        const diffPercent = ((diffW / realL) * 100).toFixed(2);

        console.log(`${id}: Target ${realL}m | Bone ${boneRenderW.toFixed(2)}m (contentH: ${boneContentH}) | Battle ${battleRenderW.toFixed(2)}m (contentH: ${battleContentH}) | Diff: ${diffPercent}%`);

        boneCalibrations[id] = {
            contentHeightPx: boneContentH,
            bottomGap: boneDims.bottomGap
        };

        battleCalibrations[id] = {
            contentHeightPx: battleContentH,
            bottomGap: battleDims.bottomGap
        };
    }

    console.log('\n--- BONE CALIBRATIONS JSON ---');
    console.log(JSON.stringify(boneCalibrations, null, 2));

    console.log('\n--- BATTLE CALIBRATIONS JSON ---');
    console.log(JSON.stringify(battleCalibrations, null, 2));
}

runCalibration();
