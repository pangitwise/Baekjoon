var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var X = input[1].split(' ').map(x => +x);
var vote = Array(N+1).fill(0);
for (var i of X) {
    if (i) vote[i]++;
}
var max = Math.max(...vote);
var list = [];
for (var i = 1; i <= N; i++) {
    if (vote[i] === max) list.push(i);
}
if (list.length > 1) {
    console.log('skipped');
} else {
    console.log(...list);
}