export interface Badge {
  id: string;
  name: string;
  englishName: string;
  description: string;
  icon: string;         // ネオンHUDアイコン（例: "☤", "◈" など）
  themeColor: string;   // ネオンカラー（CSSカラーコード）
  checkUnlock: (observedIds: string[], dinosaurs: any[]) => boolean;
}

export const BADGES: Badge[] = [
  {
    id: "first_observation",
    name: "最初の一歩",
    englishName: "FIRST OBSERVE",
    description: "恐竜の観測データを初めて1体以上アーカイブに保存した証。",
    icon: "◉",
    themeColor: "#00f2ff", // Cyan
    checkUnlock: (observedIds) => observedIds.length >= 1
  },
  {
    id: "cretaceous_observer",
    name: "白亜紀の調査員",
    englishName: "CRETACEOUS OBSERVER",
    description: "白亜紀（前期・後期・中～後期など）に生息していた恐竜・古生物を5体以上観測した。",
    icon: "◈",
    themeColor: "#00ff66", // Green
    checkUnlock: (observedIds, dinosaurs) => {
      const count = observedIds.filter(id => {
        const d = dinosaurs.find(item => item.id === id);
        return d && d.era.includes("白亜紀");
      }).length;
      return count >= 5;
    }
  },
  {
    id: "jurassic_surveyor",
    name: "ジュラ紀の探究者",
    englishName: "JURASSIC SURVEYOR",
    description: "ジュラ紀に生息していた恐竜・古生物を3体以上観測した。",
    icon: "⌬",
    themeColor: "#ff005a", // Red/Pink
    checkUnlock: (observedIds, dinosaurs) => {
      const count = observedIds.filter(id => {
        const d = dinosaurs.find(item => item.id === id);
        return d && d.era.includes("ジュラ紀");
      }).length;
      return count >= 3;
    }
  },
  {
    id: "apex_hunter",
    name: "巨大ハンター",
    englishName: "APEX HUNTER",
    description: "代表的な大型肉食恐竜（ティラノ、アロ、スピノ、ギガノト、カルカロドント）を3体以上観測した。",
    icon: "▲",
    themeColor: "#ff9900", // Orange
    checkUnlock: (observedIds) => {
      const apexList = ["tyrannosaurus", "allosaurus", "spinosaurus", "giganotosaurus", "carcharodontosaurus"];
      const count = observedIds.filter(id => apexList.includes(id)).length;
      return count >= 3;
    }
  },
  {
    id: "heavy_weight",
    name: "超巨大級観測",
    englishName: "HEAVY WEIGHT",
    description: "推定体重が10トンを超える超巨大種（ブラキオ、アパト、アルゼンチノ、トリケラ等）を3体以上観測した。",
    icon: "☲",
    themeColor: "#b800ff", // Purple
    checkUnlock: (observedIds, dinosaurs) => {
      const count = observedIds.filter(id => {
        const d = dinosaurs.find(item => item.id === id);
        if (!d) return false;
        // 「8,000kg」などの表記をトンの数値に直す、あるいは「t」で判定する
        let weightTon = 0;
        if (d.weight.includes("t")) {
          weightTon = parseFloat(d.weight.replace(/[^\d\.]/g, ''));
        } else if (d.weight.includes("kg")) {
          const kg = parseFloat(d.weight.replace(/[^\d\.]/g, ''));
          weightTon = kg / 1000.0;
        }
        return weightTon >= 10.0;
      }).length;
      return count >= 3;
    }
  },
  {
    id: "japan_explorer",
    name: "日本支部エージェント",
    englishName: "JAPAN EXPEDITION",
    description: "日本国内で発掘された恐竜・古生物（フクイサウルス、フクイラプトル、ササヤマグノムス等）を2体以上観測した。",
    icon: "🇯🇵",
    themeColor: "#ffffff", // White
    checkUnlock: (observedIds, dinosaurs) => {
      const count = observedIds.filter(id => {
        const d = dinosaurs.find(item => item.id === id);
        return d && d.region.includes("日本");
      }).length;
      return count >= 2;
    }
  },
  {
    id: "water_sky",
    name: "空と海の開拓者",
    englishName: "FLYER & SWIMMER",
    description: "非恐竜の飛行・海生古生物（プテラノドン、ケツァルコアトルス、モササウルス、エラスモサウルス）を3体以上観測した。",
    icon: "≋",
    themeColor: "#00e5ff", // Turquoise
    checkUnlock: (observedIds) => {
      const list = ["pteranodon", "quetzalcoatlus", "mosasaurus", "elasmosaurus"];
      const count = observedIds.filter(id => list.includes(id)).length;
      return count >= 3;
    }
  },
  {
    id: "dino_scholar",
    name: "学術キュレーター",
    englishName: "DINO SCHOLAR",
    description: "学術参考文献（References）が登録されている恐竜を5体以上観測した証。",
    icon: "🎓",
    themeColor: "#ffea00", // Yellow
    checkUnlock: (observedIds, dinosaurs) => {
      const count = observedIds.filter(id => {
        const d = dinosaurs.find(item => item.id === id);
        return d && d.references && d.references.length > 0;
      }).length;
      return count >= 5;
    }
  },
  {
    id: "grand_master",
    name: "アーカイブの覇者",
    englishName: "ARCHIVE GRAND MASTER",
    description: "全恐竜アーカイブの30%以上（50体以上）の標本を観測・保存した。",
    icon: "♕",
    themeColor: "#ff00d0", // Magenta
    checkUnlock: (observedIds) => observedIds.length >= 50
  }
];
