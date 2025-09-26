var [A, B, N] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);
var q = Math.floor(A/B);
A -= B*q;
A *= 10;
for (var i = 0; i < N; i++) {
    var q = Math.floor(A/B);
    A -= B*q;
    A *= 10;
}
console.log(q);