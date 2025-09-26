var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, M] = input[0].split(' ').map(x => +x);
var cnt = Array(N+1).fill(0);
for (var i = 1; i < M+1; i++) {
    var [a, b] = input[i].split(' ').map(x => +x).sort((a,b) => a-b);
    cnt[b]++;
}
var bol = true;
var ans = [];
for (var i = 2; i <= N; i++) {
    if (cnt[i] === 0) {
        ans.push('N');
    } else if (cnt[i] === i-1) {
        ans.push('E');
    } else {
        bol = false;
        break;
    }
}
!bol ? console.log(-1) : console.log(ans.join(''));