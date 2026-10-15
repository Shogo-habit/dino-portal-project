const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const tier19Ids = [
  "incisivosaurus", "inostrancevia", "jakapil", "jeholopterus", "juravenator",
  "kryptops", "kunbarrasaurus", "lesothosaurus", "liliensternus", "longisquama",
  "massospondylus", "metriacanthosaurus", "micropachycephalosaurus", "minmi", "mixosaurus",
  "odontochelys", "opabinia", "pisanosaurus", "placerias", "placodus"
];

async function cleanAll() {
  for (const id of tier19Ids) {
    const file = path.join("public/images/cyber", `${id}.webp`);
    if (!fs.existsSync(file)) {
      console.error(`Not found: ${file}`);
      continue;
    }

    const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    let modified = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const a = channels === 4 ? data[idx + 3] : 255;
        if (a === 0) continue;

        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // 1. Clear dark noise pixels (brightness sum < 70)
        if (r + g + b < 70) {
          data[idx] = 0;
          data[idx + 1] = 0;
          data[idx + 2] = 0;
          if (channels === 4) data[idx + 3] = 0;
          modified++;
          continue;
        }

        // 2. Clear AI watermark area at bottom-right corner (except opabinia which was hand-cleaned, and jeholopterus pedestal)
        if (id !== "jeholopterus" && id !== "opabinia") {
          if (x > width * 0.88 && y > height * 0.88) {
            data[idx] = 0;
            data[idx + 1] = 0;
            data[idx + 2] = 0;
            if (channels === 4) data[idx + 3] = 0;
            modified++;
          }
        }
      }
    }

    await sharp(data, { raw: { width, height, channels: 4 } })
      .webp({ lossless: true })
      .toFile(file);
    console.log(`Cleaned ${id}: ${modified} pixels adjusted`);
  }
}

cleanAll();
