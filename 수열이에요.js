var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, L, R] = input[0].split(' ').map(x => +x);
var A = input[1].split(' ').map(x => +x);
var newA = A.slice(0, L-1).concat(A.slice(L-1, R).sort((a,b) => a-b), A.slice(R));
var bol = true;
for (var i = 1; i < N; i++) {
    if (newA[i] < newA[i-1]) bol = false;
}
bol ? console.log(1) : console.log(0);