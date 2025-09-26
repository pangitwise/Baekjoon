var S = require('fs').readFileSync(0).toString().trim();
var zero = 0;
var one = 0;
for (var i = 0; i < S.length; i++) {
    if (i === 0 || S[i] !== S[i-1]) {
        if (S[i] === '0') {
            zero++;
        } else {
            one++;
        }
    }
}
console.log(Math.min(zero, one));