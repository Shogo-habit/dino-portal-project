const CYBER_ASSETS = {
    tyrannosaurus: 'images/cyber/tyrannosaurus.png',
    triceratops: 'images/cyber/triceratops.png',
    stegosaurus: 'images/cyber/stegosaurus.png',
    spinosaurus: 'images/cyber/spinosaurus.png',
    ankylosaurus: 'images/cyber/ankylosaurus.png',
    velociraptor: 'images/cyber/velociraptor.png',
    brachiosaurus: 'images/cyber/brachiosaurus.png',
    mosasaurus: 'images/cyber/mosasaurus.png',
    pachycephalosaurus: 'images/cyber/pachycephalosaurus.png',
    parasaurolophus: 'images/cyber/parasaurolophus.png',
    carnotaurus: 'images/cyber/carnotaurus.png',
    pteranodon: 'images/cyber/pteranodon.png',
    diplodocus: 'images/cyber/diplodocus.png',
    dilophosaurus: 'images/cyber/dilophosaurus.png',
    therizinosaurus: 'images/cyber/therizinosaurus.png',
    allosaurus: 'images/cyber/allosaurus.png',
    argentinosaurus: 'images/cyber/argentinosaurus.png',
    quetzalcoatlus: 'images/cyber/quetzalcoatlus.png',
    megalodon: 'images/cyber/megalodon.png',
    deinosuchus: 'images/cyber/deinosuchus.png',
    giganotosaurus: 'images/cyber/giganotosaurus.png',
    archaeopteryx: 'images/cyber/archaeopteryx.png',
    kamuyasaurus: 'images/cyber/kamuyasaurus.png',
    apatosaurus: 'images/cyber/apatosaurus.png',
    utahraptor: 'images/cyber/utahraptor.png',
    dimetrodon: 'images/cyber/dimetrodon.png',
    iguanodon: 'images/cyber/iguanodon.png',
    plesiosaurus: 'images/cyber/plesiosaurus.png',
    human: 'images/cyber/human_front.png',
};

const SPECIMEN_METADATA = {
    giganotosaurus: { 
        bottomGap: 240, 
        realHeight: 7.48, 
        realLength: 13.0,
        contentHeightPx: 555, 
        sourceRes: 1024,
        dinoLeft: '5%',
        refRight: '20%',
        zoom: 1.0
    },
    archaeopteryx: { 
        bottomGap: 180, 
        realHeight: 0.5, 
        realLength: 0.5,
        contentHeightPx: 695, 
        sourceRes: 1024,
        dinoLeft: '30%',
        refRight: '20%',
        zoom: 0.35
    },
    kamuyasaurus: { 
        bottomGap: 317, 
        realHeight: 4.5, 
        realLength: 8.0,
        contentHeightPx: 450, 
        sourceRes: 1024,
        dinoLeft: '0%',
        refRight: '20%',
        zoom: 0.9
    },
    apatosaurus: { 
        bottomGap: 175, 
        realHeight: 8.0, 
        realLength: 23.0,
        contentHeightPx: 694, 
        sourceRes: 1024,
        dinoLeft: '10%',
        refRight: '30%',
        zoom: 1.14
    },
    utahraptor: { 
        bottomGap: 317, 
        realHeight: 2.6, 
        realLength: 7.0,
        contentHeightPx: 371, 
        sourceRes: 1024,
        dinoLeft: '3%',
        refRight: '17%',
        zoom: 1.0
    },
    dimetrodon: { 
        bottomGap: 295, 
        realHeight: 1.9, 
        realLength: 3.5,
        contentHeightPx: 523, 
        sourceRes: 1024,
        dinoLeft: '5%',
        refRight: '6%',
        zoom: 1.0
    },
    iguanodon: { 
        bottomGap: 340, 
        realHeight: 3.7, 
        realLength: 10.0,
        contentHeightPx: 359, 
        sourceRes: 1024,
        dinoLeft: '0%',
        refRight: '15%',
        zoom: 1.0
    },
    plesiosaurus: { 
        bottomGap: 279, 
        realHeight: 1.7, 
        realLength: 3.5,
        contentHeightPx: 445, 
        sourceRes: 1024,
        dinoLeft: '0%',
        refRight: '5%',
        zoom: 0.85
    },
    tyrannosaurus: { 
        bottomGap: 274, 
        realHeight: 4.5, 
        realLength: 12.3,
        contentHeightPx: 405, 
        sourceRes: 1024,
        dinoLeft: '0',
        refRight: '20%'
    },
    triceratops: { 
        bottomGap: 358, 
        realHeight: 3.0, 
        realLength: 9.0,
        contentHeightPx: 325, 
        sourceRes: 1024,
        dinoLeft: '0',
        refRight: '15%'
    },
    stegosaurus: { 
        bottomGap: 258, 
        realHeight: 4.0, 
        realLength: 9.0,
        contentHeightPx: 512, 
        sourceRes: 1024,
        dinoLeft: '0',
        refRight: '25%'
    },
    spinosaurus: { 
        bottomGap: 315, 
        realHeight: 5.0, 
        realLength: 15.0,
        contentHeightPx: 417, 
        zoom: 1.3,
        sourceRes: 1024,
        dinoLeft: '0%',
        refRight: '20%'
    },
    human: { 
        bottomGap: 75, 
        realHeight: 1.7, 
        realLength: 0.6,
        contentHeightPx: 984, 
        sourceRes: 1024 
    },
    ankylosaurus: { 
        bottomGap: 389, 
        realHeight: 1.7, 
        realLength: 7.0,
        contentHeightPx: 246, 
        sourceRes: 1024,
        dinoLeft: '0',
        refRight: '25%'
    },
    velociraptor: { 
        bottomGap: 355, 
        realHeight: 0.6, 
        realLength: 2.0,
        contentHeightPx: 300, 
        sourceRes: 1024,
        dinoLeft: '12%',
        refRight: '12%'
    },
    brachiosaurus: { 
        bottomGap: 100, 
        realHeight: 13.0, 
        realLength: 25.0,
        contentHeightPx: 940, 
        sourceRes: 1024,
        dinoLeft: '20%',
        refRight: '20%'
    },
    mosasaurus: { 
        bottomGap: 400, 
        realHeight: 3.5, 
        realLength: 17.0,
        contentHeightPx: 210, 
        sourceRes: 1024,
        dinoLeft: '2%',
        refRight: '15%'
    },
    pachycephalosaurus: { 
        bottomGap: 260, 
        realHeight: 1.8, 
        realLength: 4.5,
        contentHeightPx: 480, 
        sourceRes: 1024,
        dinoLeft: '10%',
        refRight: '10%'
    },
    parasaurolophus: { 
        bottomGap: 240, 
        realHeight: 4.0, 
        realLength: 9.5,
        contentHeightPx: 500, 
        sourceRes: 1024,
        dinoLeft: '10%',
        refRight: '15%'
    },
    carnotaurus: { 
        bottomGap: 300, 
        realHeight: 2.8, 
        realLength: 8.0,
        contentHeightPx: 450, 
        sourceRes: 1024,
        dinoLeft: '10%',
        refRight: '15%'
    },
    pteranodon: { 
        bottomGap: 200, 
        realHeight: 3.0, 
        realLength: 3.5,
        contentHeightPx: 780, 
        sourceRes: 1024,
        dinoLeft: '5%',
        refRight: '15%'
    },
    diplodocus: { 
        bottomGap: 395, 
        realHeight: 4.5, 
        realLength: 27.0,
        contentHeightPx: 160, 
        sourceRes: 1024,
        dinoLeft: '0',
        refRight: '25%'
    },
    dilophosaurus: { 
        bottomGap: 240, 
        realHeight: 2.2, 
        realLength: 6.0,
        contentHeightPx: 480, 
        sourceRes: 1024,
        dinoLeft: '10%',
        refRight: '15%'
    },
    therizinosaurus: { 
        bottomGap: 240, 
        realHeight: 5.0, 
        realLength: 10.0,
        contentHeightPx: 680, 
        sourceRes: 1024,
        dinoLeft: '10%',
        refRight: '15%'
    },
    allosaurus: { 
        bottomGap: 320, 
        realHeight: 3.5, 
        realLength: 12.0,
        contentHeightPx: 400, 
        sourceRes: 1024,
        dinoLeft: '5%',
        refRight: '15%'
    },
    argentinosaurus: { 
        bottomGap: 366, 
        realHeight: 9.0, 
        realLength: 35.0,
        contentHeightPx: 339, 
        sourceRes: 1024,
        dinoLeft: '0',
        refRight: '20%',
        zoom: 1.38
    },
    quetzalcoatlus: { 
        bottomGap: 50, 
        realHeight: 5.0, 
        realLength: 11.0,
        contentHeightPx: 950, 
        sourceRes: 1024,
        dinoLeft: '15%',
        refRight: '20%',
        zoom: 1.0
    },
    megalodon: { 
        bottomGap: 254, 
        realHeight: 10.16, 
        realLength: 18.0,
        contentHeightPx: 531, 
        sourceRes: 1024,
        dinoLeft: '5%',
        refRight: '20%',
        zoom: 1.0
    },
    deinosuchus: { 
        bottomGap: 405, 
        realHeight: 1.5, 
        realLength: 10.6,
        contentHeightPx: 221, 
        sourceRes: 1024,
        dinoLeft: '10%',
        refRight: '20%',
        zoom: 1.3
    },
}

function getCyberAsset(dino) {
    if (CYBER_ASSETS[dino.id]) return CYBER_ASSETS[dino.id];
    return CYBER_ASSETS.category_theropod_v3;
}

const REFERENCE_ASSETS = {
    HUMAN: {
        id: 'human',
        icon: 'images/cyber/human_front.png',
        label: "人間",
        realHeight: 1.7,
        bottomGap: 75,
        contentHeightPx: 984,
        sourceRes: 1024
    }
};
