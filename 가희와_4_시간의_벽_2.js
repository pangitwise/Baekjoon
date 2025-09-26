var input = require('fs').readFileSync(0).toString().trim().split('\n');
var S = +input[0];
var [Ma, F, Mb] = input[1].split(' ').map(x => +x);
if (S <= Ma+F+Mb || S <= 240) {
    console.log('high speed rail');
} else {
    console.log('flight');
}