const fs = require('fs');
let code = fs.readFileSync('data.js', 'utf-8');
code += '\nmodule.exports = { DINOSAURS };\n';
fs.writeFileSync('scratch/temp_data.js', code);
const { DINOSAURS } = require('./temp_data.js');

const implemented = [
    'tyrannosaurus', 'triceratops', 'stegosaurus', 'spinosaurus',
    'ankylosaurus', 'velociraptor', 'brachiosaurus', 'mosasaurus',
    'pachycephalosaurus', 'parasaurolophus', 'carnotaurus', 'pteranodon',
    'diplodocus', 'dilophosaurus', 'therizinosaurus', 'allosaurus', 'human'
];

const unimplemented = DINOSAURS.filter(d => !implemented.includes(d.id));

console.log("Unimplemented list:");
unimplemented.forEach(d => console.log(`${d.id}: ${d.name} - ${d.length}`));
