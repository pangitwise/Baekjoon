var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var info = [];
for (var i = 1; i < N+1; i++) {
    info.push(input[i].split(' ').map(x => +x));
}
info.sort((a,b) => b[2]-a[2]);
var nation = Array(N+1).fill(0);
var ans = '';
var cnt = 0;
for (var i = 0; i < N; i++) {
    var [nat, num, score] = info[i];
    if (nation[nat] < 2) {
        ans += nat+' '+num+'\n';
        nation[nat]++;
        cnt++
        if (cnt === 3) break;
    }
}
console.log(ans);