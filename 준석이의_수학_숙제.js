var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var K = input[1].split(' ').map(x => +x);
var ans = '';
for (var i = 0; i < T; i++) {
    var N = K[i];
    var q3 = Math.floor(N/3);
    var q7 = Math.floor(N/7);
    var q21 = Math.floor(N/21);
    var total = (3+q3*3)/2*q3+(7+q7*7)/2*q7;
    if (N >= 21) total -= (21+q21*21)/2*q21;
    ans += total+'\n';
}
console.log(ans);