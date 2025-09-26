var input = require('fs').readFileSync(0).toString().trim().split('\n');
var Q = +input[0];
var ans = '';
for (var i = 1; i < Q+1; i++) {
    var [a, M] = input[i].split(' ').map(x => +x);
    ans += Math.trunc(a*M*1056/600000)+'\n';
}
console.log(ans);