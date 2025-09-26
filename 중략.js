var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var S = input[1].trim();
if (N <= 25) {
    console.log(S);
} else {
    var bol = true;
    for (var i = 11; i < N-11; i++) {
        if (S[i] === '.' && i !== N-12) {
            bol = false;
            break;
        }
    }
    bol ? console.log(S.slice(0, 11)+'...'+S.slice(N-11)) : console.log(S.slice(0, 9)+'......'+S.slice(N-10));
}