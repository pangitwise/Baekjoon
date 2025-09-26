var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
for (var i = 1; i < N+1; i++) {
    console.log(parseInt(input[i].trim(), 2))
}