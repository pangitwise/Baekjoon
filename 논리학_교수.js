var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var S = input[1].split(' ').map(x => +x);
var cnt = Array(51).fill(0);
for (var i of S) {
    cnt[i]++;
}
var ans = 0;
for (var i = 1; i <= 50; i++) {
    if (cnt[i] === i) ans = i;
}
if (ans === 0 && S.includes(0)) {
    console.log(-1);
} else {
    console.log(ans);
}