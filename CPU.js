var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var N = +input[s++];
var M = +input[s++];
var pairs = Array(M);
for (var i = 0; i < M; i++) {
    pairs[i] = input[s++].split(' ').map(x => +x).sort((a,b) => a-b);
}
var valid = [];
var ans = 0;
for (var i = 0; i < M; i++) {
    var [p, q] = pairs[i];
    if (isValid(p, q)) {
        valid.push([p, q]);
        ans++;
    }
}
console.log(ans);


function isValid(p, q) {
    for (var i = 0; i < valid.length; i++) {
        var [a, b] = valid[i];
        if ((p <= a && a <= q && q <= b) || (a <= p && p <= b && b <= q)) return false;
    }
    return true;
}