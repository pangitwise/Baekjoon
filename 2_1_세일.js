var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var N = +input[s++];
var ans = 0;
var milks = [];
for (var i = 0; i < N; i++) {
    milks.push(+input[s++]);
}
milks.sort((a,b) => b-a);
var cnt = 0;
for (var i = 0; i < N; i++) {
    if (cnt !== 2) ans += milks[i];
    cnt++;
    cnt %= 3;
}
console.log(ans);