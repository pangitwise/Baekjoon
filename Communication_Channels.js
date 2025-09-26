var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var ans = '';
for (var i = 1; i < N+1; i++) {
    var [a, b] = input[i].trim().split(' ');
    if (a === b) {
        ans += 'OK\n';
    } else {
        ans += 'ERROR\n';
    }
}
console.log(ans);