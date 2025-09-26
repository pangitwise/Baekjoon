var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var max = 0;
var recent = 1;
for (var i = 1; i < N+1; i++) {
    recent *= +input[i];
    max = Math.max(max, recent);
    if (recent < 1) recent = 1;
}
console.log(Number((Math.round(max*1000)/1000)).toFixed(3));