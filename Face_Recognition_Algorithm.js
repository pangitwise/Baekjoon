var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, m] = input[0].split(' ').map(x => +x)
var ans = m === 3+(n-3)*3 ? 'YES' : 'NO';
console.log(ans);