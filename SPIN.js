var input = require('fs').readFileSync(0).toString().trim().split('\n');
var spin = input[0].split('').map(x => +x);
for (var i = 1; i < input.length; i++) {
    var next = input[i].split('').map(x => +x);
    for (var j = 0; j < next.length; j++) {
        spin[j] += next[j];
    }
}
for (var i = 0; i < spin.length; i++) spin[i] %= 10;
console.log(spin.join(''));