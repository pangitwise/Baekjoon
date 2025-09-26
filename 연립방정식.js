var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var p = 10_0000_0007n;
var a = input[1].split(' ').map(x => BigInt(x));
var ans = '';
for (var i = 0; i < n; i++) {
    var res = 1n;
    for (var j = 0; j < n; j++) {
        if (i === j) continue;
        res *= a[i]-a[j];
        res %= p;
    }
    res = (res%p+p)%p;
    ans += res+' ';
}
console.log(ans);