var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var [a, b, c] = input[1].split(' ').map(x => +x);
var GCD = gcd(a, b);
if (c) GCD = gcd(GCD, c);
var ans = '';
for (var i = 1; i <= GCD; i++) {
    if (!(GCD%i)) ans += i+'\n';
}
console.log(ans);


function gcd(a, b) {
    var r = a%b;
    if (r === 0) return b;
    return gcd(b, r);
}