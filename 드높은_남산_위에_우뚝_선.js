var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var A = input[1].split(' ').map(x => +x);
var down = false;
var bol = true;
for (var i = 0; i < N; i++) {
    if (A[i-1] > A[i] && !down) {
        down = true;
    } else if (A[i-1] < A[i] && down) {
        bol = false;
        break;
    } else if (A[i-1] === A[i]) {
        bol = false;
        break;
    }
}
var ans = bol ? 'YES' : 'NO';
console.log(ans);