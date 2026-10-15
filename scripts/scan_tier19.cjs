const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const tier19List = [
  { id: "incisivosaurus", realH: 0.4, realL: 1.0, zoom: 1.8 },
  { id: "inostrancevia", realH: 1.4, realL: 3.5, zoom: 1.2 },
  { id: "jakapil", realH: 0.5, realL: 1.5, zoom: 2.0 },
  { id: "jeholopterus", realH: 0.35, realL: 0.4, zoom: 2.2 },
  { id: "juravenator", realH: 0.35, realL: 0.8, zoom: 2.2 },
  { id: "kryptops", realH: 2.0, realL: 6.0, zoom: 1.35 },
  { id: "kunbarrasaurus", realH: 0.8, realL: 2.5, zoom: 1.4 },
  { id: "lesothosaurus", realH: 0.7, realL: 2.0, zoom: 1.7 },
  { id: "liliensternus", realH: 1.5, realL: 5.1, zoom: 1.35 },
  { id: "longisquama", realH: 0.15, realL: 0.15, zoom: 3.0 },
  { id: "massospondylus", realH: 1.5, realL: 4.0, zoom: 1.35 },
  { id: "metriacanthosaurus", realH: 2.5, realL: 8.0, zoom: 1.15 },
  { id: "micropachycephalosaurus", realH: 0.4, realL: 1.0, zoom: 2.0 },
  { id: "minmi", realH: 0.9, realL: 3.0, zoom: 1.4 },
  { id: "mixosaurus", realH: 0.3, realL: 1.0, zoom: 1.8 },
  { id: "odontochelys", realH: 0.15, realL: 0.4, zoom: 2.5 },
  { id: "opabinia", realH: 0.03, realL: 0.07, zoom: 3.5 },
  { id: "pisanosaurus", realH: 0.35, realL: 1.0, zoom: 2.0 },
  { id: "placerias", realH: 1.6, realL: 3.0, zoom: 1.35 },
  { id: "placodus", realH: 0.5, realL: 2.0, zoom: 1.5 }
];

async function scanAll() {
  const results = {};

  for (const item of tier19List) {
    const file = path.join("public/images/cyber", `${item.id}.webp`);
    if (!fs.existsSync(file)) {
      console.error(`Not found: ${file}`);
      continue;
    }

    const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    let minY = height, maxY = 0, minX = width, maxX = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const a = channels === 4 ? data[idx + 3] : 255;
        if (a === 0) continue;

        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        if (r + g + b >= 70) {
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }

    const contentHeightPx = maxY >= minY ? (maxY - minY + 1) : height;
    const bottomGap = maxY >= minY ? (height - 1 - maxY) : 0;

    results[item.id] = {
      sourceRes: width,
      contentHeightPx,
      bottomGap,
      realHeight: item.realH,
      realLength: item.realL,
      zoom: item.zoom
    };

    console.log(`${item.id}: res=${width}, contentH=${contentHeightPx}, bGap=${bottomGap}, realH=${item.realH}, realL=${item.realL}, zoom=${item.zoom}`);
  }

  fs.writeFileSync("scripts/tier19_scans.json", JSON.stringify(results, null, 2), "utf8");
  console.log("Saved results to scripts/tier19_scans.json");
}

scanAll();
