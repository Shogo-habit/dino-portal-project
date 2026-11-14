import fs from 'node:fs';
import sharp from '/Users/kosako/kaihatsu/dinosaurs website/node_modules/sharp/dist/index.cjs';

const sizeComp = fs.readFileSync('src/pages/size-comparison.astro', 'utf8');

// Extract BATTLE_ASSETS from size-comparison.astro
const battleMatch = sizeComp.match(/const BATTLE_ASSETS:\s*Record<string,\s*\{[\s\S]*?\}\s*>\s*=\s*(\{[\s\S]*?\n\s*\};)/);
let battleAssets = {};
if (battleMatch) {
    eval('battleAssets = ' + battleMatch[1]);
}

async function analyze() {
    const dinos = [
        'tyrannosaurus', 'triceratops', 'velociraptor', 'protoceratops',
        'allosaurus', 'stegosaurus', 'spinosaurus', 'giganotosaurus',
        'brachiosaurus', 'ankylosaurus', 'mosasaurus', 'pteranodon',
        'pachycephalosaurus', 'parasaurolophus', 'quetzalcoatlus',
        'elasmosaurus', 'styracosaurus', 'argentinosaurus', 'iguanodon'
    ];

    console.log('ID | Bone Length (m) | Battle Length (m) | Len Diff % | Bone Height (m) | Battle Height (m) | Height Diff %');
    console.log('---|---|---|---|---|---|---');

    for (const id of dinos) {
        const mdPath = 'src/content/dinosaurs/' + id + '.md';
        if (!fs.existsSync(mdPath)) continue;
        const content = fs.readFileSync(mdPath, 'utf8');
        const realHMatch = content.match(/realHeight:\s*([0-9.]+)/);
        const realLMatch = content.match(/realLength:\s*([0-9.]+)/);
        const contentHMatch = content.match(/contentHeightPx:\s*([0-9.]+)/);
        const realH = realHMatch ? parseFloat(realHMatch[1]) : 2.0;
        const realL = realLMatch ? parseFloat(realLMatch[1]) : 6.0;
        const boneContentH = contentHMatch ? parseFloat(contentHMatch[1]) : 400;

        const boneImgPath = 'public/images/cyber/' + id + '.webp';
        const battleImgPath = 'public/images/cyber/' + id + '_battle.webp';

        const getDims = async (p) => {
            const { data } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
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
            return { w: maxX - minX + 1, h: maxY - minY + 1 };
        };

        const boneDims = await getDims(boneImgPath);
        const battleDims = await getDims(battleImgPath);
        const battleCfg = battleAssets[id];
        if (!battleCfg) continue;

        const boneScale = realH / boneContentH;
        const boneRenderW = boneDims.w * boneScale;
        const boneRenderH = boneDims.h * boneScale;

        const battleScale = realH / battleCfg.contentHeightPx;
        const battleRenderW = battleDims.w * battleScale;
        const battleRenderH = battleDims.h * battleScale;

        const lenDiff = (((battleRenderW - boneRenderW) / boneRenderW) * 100).toFixed(1);
        const hDiff = (((battleRenderH - boneRenderH) / boneRenderH) * 100).toFixed(1);

        console.log(`${id} | ${boneRenderW.toFixed(2)}m | ${battleRenderW.toFixed(2)}m | ${lenDiff}% | ${boneRenderH.toFixed(2)}m | ${battleRenderH.toFixed(2)}m | ${hDiff}%`);
    }
}

analyze();
