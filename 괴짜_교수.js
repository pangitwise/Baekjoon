var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var ans = '';
for (var i = 1; i < N+1; i++) {
    var [d, n, s, p] = input[i].trim().split(' ').map(x => +x);
    var a = d+n*p;
    var b = n*s;
    if (a < b) {
        ans += 'parallelize\n';
    } else if (a === b) {
        ans += 'does not matter\n';
    } else if (a > b) {
        ans += 'do not parallelize\n';
    }
}
console.log(ans);