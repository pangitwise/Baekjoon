var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var S = input[1].trim();
var cnt = 0;
for (var [i, j] = [0, N-1]; i < j; i++, j--) {
    if (S[i] !== S[j]) cnt++;
}
console.log(cnt);