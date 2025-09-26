var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var pref = Array(1000001).fill(0);
for (var i = 0; i <= 1000000; i++) {
    var n = String(i);
    for (var j of n) {
        if (j === '0') {
            pref[i]++;
        }
    }
}
for (var i = 1; i <= 1000000; i++) pref[i] += pref[i-1];
var ans = '';
for (var i = 1; i < T+1; i++) {
    var [N, M] = input[i].split(' ').map(x => +x);
    ans += pref[M]-(pref[N-1] || 0);
    ans += '\n';
}
console.log(ans);
