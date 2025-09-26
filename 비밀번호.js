var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, m] = input[0].split(' ').map(x => +x);
if (m === 0) {
    var num = [];
} else {
    var num = input[1].split(' ').map(x => +x);
}
var cnt = 0;
backTracking([], 0);
console.log(cnt);

function backTracking(arr, dep) {
    if (dep === n) {
        for (var i of num) {
            if (!arr.includes(i)) return;
        }
        return cnt++;
    }
    for (var i = 0; i <= 9; i++) {
        arr.push(i);
        backTracking(arr, dep+1);
        arr.pop();
    }
}