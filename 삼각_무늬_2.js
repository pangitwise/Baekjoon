var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var ans = '';
for (var i = 1; i < T+1; i++) {
    var [A, B] = input[i].split(' ').map(x => +x);
    ans += ((A/B)**2)+'\n';
}
console.log(ans);