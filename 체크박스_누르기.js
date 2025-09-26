var [N, M] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);
if (N >= M) {
    var ans = M;
} else {
    var GCD = gcd(N, M);
    N /= GCD;
    M /= GCD;
    var maxClick = M/N;
    var cri_pnt = M-Math.floor(maxClick)*N;
    var ans = Math.floor(maxClick)&1 ? N-cri_pnt : cri_pnt;
    ans *= GCD;
}
console.log(ans);

function gcd(a, b) {
    var r = a%b;
    if (r === 0) return b;
    return gcd(b, r);
}