var input = require('fs').readFileSync(0).toString().trim().split('\n');
var Q = +input[0];
var ans = '';
for (var i = 1; i < Q+1; i++) {
    var [a, b] = input[i].split(' ').map(x => +x);
    var inner = ((b-a)+43)%43;
    var outer = ((a-b)+43)%43;
    if (inner < outer) {
        ans += 'Inner circle line\n';
    } else if (inner === outer) {
        ans += 'Same\n';
    } else {
        ans += 'Outer circle line\n';
    }
}
console.log(ans);