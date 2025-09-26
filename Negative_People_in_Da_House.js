var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var N = +input[s++];
    var cur = 0;
    var min = 0;
    for (var i = 0; i < N; i++) {
        var [a, b] = input[s++].split(' ').map(x => +x);
        cur += a;
        cur -= b;
        min = Math.min(min, cur);
    }
    ans += (min >= 0 ? 0 : -min)+'\n';
}
console.log(ans);