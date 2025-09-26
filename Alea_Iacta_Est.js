var input = require('fs').readFileSync(0).toString().trim().split('\n');
var order = 0;
var [A, B] = input[0].split(' ').map(x => +x);
var [C, D] = input[1].split(' ').map(x => +x);
for (var i = 0; i < A+B-1; i++) {
    order++
    order %= 4;
}
for (var j = 0; j < C+D-1; j++) {
    order++;
    order %= 4;
}
console.log(order+1);