var [n, m] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);
var s = Array.from({length:n+1}, _ => Array(m+1).fill(0n));
s[0][0] = 1n;
s[1][1] = 1n;
//제 1종 스털링 수
for (var i = 0; i <= n; i++) {
    for (var j = 0; j <= m; j++) {
        if (!i || !j ) continue;
        s[i][j] = s[i-1][j-1]+BigInt(i-1)*s[i-1][j];
    }
}
var fact = 1n;
for (var i = 1n; i <= n; i++) {
    fact *= i;
}
var numer = s[n].reduce((pre, cur) => pre+cur);
var GCD = gcd(numer, fact);
numer /= GCD;
var denom = fact/GCD;
console.log(numer+'/'+denom); 


function gcd(a, b) {
    var r = a%b;
    if (r === 0n) return b;
    return gcd(b, r);
}