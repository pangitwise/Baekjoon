var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
for (var i = 0; i < input.length; i++) {
    var [A, B] = input[i].split(' ').map(x => +x);
    if (A === 0 && B === 0) break;
    ans += (2*A-B)+'\n';
}
console.log(ans);

// (A+B+C)/3 = A
// A+B+C = 3A
// C = 2A-B