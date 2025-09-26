var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var M = +input[1];
var mod = M%3;
var q = Math.floor(M/3);
var series = [];
if (q >= 1) series.push(0, 2, 0);
for (var i = 0; i < q-1; i++) {
    series.push(2, 0);
}
if (mod === 1) {
    series.push(2);
    if (q === 0) series.push(0);
}
if (mod === 2) {
    series.push(0, 0);
    if (q === 0) series.push(2);
}
while (series.length < N) {
    series.push(4);
}
console.log(series.join(' '));
