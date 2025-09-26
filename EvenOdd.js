var [L, R] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => BigInt(x));
var ans = 0n;
var j = 1n;
var i = L === 1n ? 2n : L;
for (var i = L; i <= R;) {
    while ((j<<1n) < i) j <<= 1n;
    var l = i;
    var k = 1n
    while ((l+(k<<1n)-1n) <= R && (k<<1n) <= j) {
        k <<= 1n;
    }
    var r = l+k-1n;
    ans += div_and_conq(l, r, k);
    i = r+1n;
}
ans %= 10_0000_0007n;
console.log(String(ans));


function div_and_conq(L, R, dep) {
    var nl = L&1n ? L+1n : L;
    var nr = R&1n ? R-1n : R;
    var cnt = R-L > 0n ? div_and_conq(nl>>1n, nr>>1n, dep>>1n)*2n+(dep>>1n)*3n : f(L);
    if (R-L > 0n) {
        if (!(L&1n)) cnt -= f(L-1n);
        if (R&1n) cnt += f(R);
    }
    return cnt;
}

function f(x) {
    var iter = 0n;
    while (x !== 1n) {
        if (x&1n) {
            x++;
        } else {
            x >>= 1n;
        }
        iter++;
    }
    return iter;
}