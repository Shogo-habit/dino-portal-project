const fs = require('fs');
const path = require('path');

const adjustments = [
  {
    id: "incisivosaurus",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "20%"');
      } else {
        return fm + '\n  dinoLeft: "20%"';
      }
    }
  },
  {
    id: "inostrancevia",
    update(fm) {
      if (fm.includes("refRight:")) {
        return fm.replace(/refRight:\s*"[^"]*"/, 'refRight: "9%"');
      } else {
        return fm + '\n  refRight: "9%"';
      }
    }
  },
  {
    id: "jakapil",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "16%"');
      } else {
        return fm + '\n  dinoLeft: "16%"';
      }
    }
  },
  {
    id: "jeholopterus",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "20%"');
      } else {
        return fm + '\n  dinoLeft: "20%"';
      }
    }
  },
  {
    id: "juravenator",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "20%"');
      } else {
        return fm + '\n  dinoLeft: "20%"';
      }
    }
  },
  {
    id: "kryptops",
    update(fm) {
      let res = fm.replace(/zoom:\s*([0-9.]+)/, 'zoom: 1.22');
      if (res.includes("dinoTagOffsetX:")) {
        res = res.replace(/dinoTagOffsetX:\s*[^ \n]+/, 'dinoTagOffsetX: -70');
      } else {
        res = res + '\n  dinoTagOffsetX: -70';
      }
      return res;
    }
  },
  {
    id: "longisquama",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "23%"');
      } else {
        return fm + '\n  dinoLeft: "23%"';
      }
    }
  },
  {
    id: "odontochelys",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "23%"');
      } else {
        return fm + '\n  dinoLeft: "23%"';
      }
    }
  },
  {
    id: "opabinia",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "25%"');
      } else {
        return fm + '\n  dinoLeft: "25%"';
      }
    }
  },
  {
    id: "pisanosaurus",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "20%"');
      } else {
        return fm + '\n  dinoLeft: "20%"';
      }
    }
  },
  {
    id: "placerias",
    update(fm) {
      if (fm.includes("dinoLeft:")) {
        return fm.replace(/dinoLeft:\s*"[^"]*"/, 'dinoLeft: "5%"');
      } else {
        return fm + '\n  dinoLeft: "5%"';
      }
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
