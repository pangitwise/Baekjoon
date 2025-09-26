var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var idx = Array(7).fill(undefined);
var cnt = Array(7).fill(0);
var a = input[1].split(' ').map(x => +x);
for (var i = 0; i < n; i++) {
    var num = a[i];
    idx[num] = i+1;
    cnt[num]++;
}
var ans = 'none';
for (var i = 6; i >= 1; i--) {
    if (cnt[i] === 1) {
        ans = idx[i];
        break;
    }
}
console.log(ans);