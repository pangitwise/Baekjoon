var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var N = +input[s++];
    var sum = input[s++].trim().split(' ').map(x => +x).reduce((pre, cur) => pre+cur);
    if (sum > 0) {
        ans += 'Right\n';
    } else if (sum === 0) {
        ans += 'Equilibrium\n';
    } else if (sum < 0) {
        ans += 'Left\n';
    }
}
console.log(ans);