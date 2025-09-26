var input = require('fs').readFileSync(0).toString().trim().split('\n');
var S = +input[0];
var F = +input[1];
if (S > F) {
    console.log('flight')
} else {
    console.log('high speed rail');
}