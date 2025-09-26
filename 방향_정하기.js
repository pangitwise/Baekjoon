var n = +require('fs').readFileSync(0).toString().trim();
var ans = 1n;
for (var i = 2n; i <= n; i++) {
    ans *= i;
    ans %= 10_0000_0007n;
}
console.log(String(ans));