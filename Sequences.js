var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
for (var i = 0; i < input.length; i++) {
    var [first, diff, target] = input[i].split(' ').map(x => +x);
    if (!first && !diff && !target) break;
    var ord = (target-first)/diff+1;
    ans += Number.isInteger(ord) && ord > 0 ? ord : 'X'
    ans += '\n';
}
console.log(ans);