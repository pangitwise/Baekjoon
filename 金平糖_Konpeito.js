var [A, B, C] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);
var max = Math.max(A, B, C);
console.log(max*3-A-B-C);