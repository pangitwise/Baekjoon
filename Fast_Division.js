var n = +require('fs').readFileSync(0).toString().trim();
console.log((n === 0 ? 1 : n === 1 ? 2 : n === 2 ? 1 : 0));