const fs = require("fs");
const path = require("path");

const adjustments = [
  {
    id: "aetosaurus",
    update(fm) {
      return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "15%"');
    }
  },
  {
    id: "anomalocaris",
    update(fm) {
      return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "15%"');
    }
  },
  {
    id: "chaoyangsaurus",
    update(fm) {
      return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "15%"');
    }
  },
  {
    id: "chialingosaurus",
    update(fm) {
      return fm.replace(/refRight:\s*"[^"]*"/, 'refRight: "7%"');
    }
  },
  {
    id: "chungkingosaurus",
    update(fm) {
      let res = fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "1%"');
      res = res.replace(/refRight:\s*"[^"]*"/, 'refRight: "7%"');
      if (!res.includes("dinoTagOffsetX:")) {
        res = res.replace(/refRight:\s*"7%"/, 'refRight: "7%"\n  dinoTagOffsetX: -70');
      } else {
        res = res.replace(/dinoTagOffsetX:\s*[^ \n]+/, 'dinoTagOffsetX: -70');
      }
      return res;
    }
  },
  {
    id: "diamantinasaurus",
    update(fm) {
      return fm.replace(/zoom:\s*([0-9.]+)/, 'zoom: 1.44');
    }
  },
  {
    id: "eudimorphodon",
    update(fm) {
      return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "15%"');
    }
  },
  {
    id: "euparkeria",
    update(fm) {
      return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "15%"');
    }
  },
  {
    id: "eustreptospondylus",
    update(fm) {
      let res = fm.replace(/zoom:\s*([0-9.]+)/, 'zoom: 1.08');
      res = res.replace(/refRight:\s*"[^"]*"/, 'refRight: "8%"');
      return res;
    }
  },
  {
    id: "fruitadens",
    update(fm) {
      return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "16%"');
    }
  },
  {
    id: "gargoyleosaurus",
    update(fm) {
      return fm.replace(/refRight:\s*"[^"]*"/, 'refRight: "8%"');
    }
  },
  {
    id: "hainosaurus",
    update(fm) {
      let res = fm.replace(/zoom:\s*([0-9.]+)/, 'zoom: 1.62');
      res = res.replace(/refRight:\s*"[^"]*"/, 'refRight: "10%"');
      return res;
    }
  },
  {
    id: "hallucigenia",
    update(fm) {
      return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "26%"');
    }
  },
  {
    id: "henodus",
    update(fm) {
      return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "15%"');
    }
  },
  {
    id: "hyperodapedon",
    update(fm) {
      return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "11%"');
    }
  }
];

for (const adj of adjustments) {
  const filePath = path.join("src/content/dinosaurs", `${adj.id}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`Not found: ${filePath}`);
    continue;
  }
  const fileContent = fs.readFileSync(filePath, "utf8");
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    console.error(`Invalid format: ${adj.id}`);
    continue;
  }
  const oldFm = match[1];
  const body = match[2];
  const newFm = adj.update(oldFm);
  const newContent = `---\n${newFm}\n---\n${body}`;
  fs.writeFileSync(filePath, newContent, "utf8");
  console.log(`Updated: ${adj.id}`);
}
