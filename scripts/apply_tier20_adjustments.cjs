const fs = require('fs');
const path = require('path');

const adjustments = [
  {
    id: "rhabdodon",
    update(fm) {
      let res = fm.replace(/zoom:\s*([0-9.]+)/, 'zoom: 1.35');
      if (res.includes("dinoTagOffsetX:")) {
        res = res.replace(/dinoTagOffsetX:\s*[^ \n]+/, 'dinoTagOffsetX: -70');
      } else {
        res = res + '\n  dinoTagOffsetX: -70';
      }
      return res;
    }
  },
  {
    id: "rhoetosaurus",
    update(fm) {
      return fm.replace(/zoom:\s*([0-9.]+)/, 'zoom: 1.86');
    }
  },
  {
    id: "savannasaurus",
    update(fm) {
      return fm.replace(/zoom:\s*([0-9.]+)/, 'zoom: 1.26');
    }
  },
  {
    id: "sordes",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "25%"');
      } else {
        return fm + '\n  dinoLeft: "25%"';
      }
    }
  },
  {
    id: "thecodontosaurus",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "20%"');
      } else {
        return fm + '\n  dinoLeft: "20%"';
      }
    }
  },
  {
    id: "vectipelta",
    update(fm) {
      let res = fm.replace(/zoom:\s*([0-9.]+)/, 'zoom: 1.12');
      if (res.includes("dinoTagOffsetX:")) {
        res = res.replace(/dinoTagOffsetX:\s*[^ \n]+/, 'dinoTagOffsetX: -70');
      } else {
        res = res + '\n  dinoTagOffsetX: -70';
      }
      return res;
    }
  },
  {
    id: "vulcanodon",
    update(fm) {
      return fm.replace(/zoom:\s*([0-9.]+)/, 'zoom: 1.08');
    }
  }
];

for (const adj of adjustments) {
  const filePath = path.join(__dirname, '..', 'src', 'content', 'dinosaurs', `${adj.id}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`Not found: ${filePath}`);
    continue;
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    console.error(`Invalid format: ${adj.id}`);
    continue;
  }
  const oldFm = match[1];
  const body = match[2];
  const newFm = adj.update(oldFm);
  const newContent = `---\n${newFm}\n---\n${body}`;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated: ${adj.id}`);
}
