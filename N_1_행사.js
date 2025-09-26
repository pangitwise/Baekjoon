var input = require('fs').readFileSync(0).toString().trim().split('\n');
var M = +input[0];
var n = input[1].split(' ').map(x => +x);
var a = input[2].split(' ').map(x => +x);
var ans = [];
for (var i = 0; i < M; i++) {
    ans.push(binarySearch(n[i], a[i]));
}
console.log(ans.join(' '));


function binarySearch(n, a) {
    if (a === 0) return 0;
    if (n === 1) return 1;
    var start = -1;
    var end = 10**9+1;
    var min = Infinity;
    while (start+1 < end) {
        var mid = Math.floor((start+end)/2);
        var v = buy(n, mid, a);
        if (v >= a) {
            min = Math.min(min, mid);
        }
        if (v >= a) end = mid;
        if (v < a) start = mid;
    }
    return min;
}

function buy(n, x, a) {
    var total = x;
    while (x >= n && total < a) {
        var q = Math.floor(x/n);
        var r = x%n;
        total += q;
        x = q+r;
    }
    return total;
}