// const Operations = require('./sum_module');

import { Operations } from './sum_module.js';  // Żeby działało, dodałem  "type": "module" do pliku package.json

// Nie można utworzyć obiektu przed definicją klasy

var arg1 = parseInt(process.argv[2])
var arg2 = parseInt(process.argv[3])

console.log("arg1: " + arg1 + '\narg2: ' + arg2)

const suma1 = new Operations(1, 5);
const suma2 = new Operations(2, -4);
const suma3 = new Operations(arg1, arg2)
console.log(suma1.sum());
console.log(suma2.sum());
console.log("Suma liczb z command line: " + suma3.sum())

