var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var [E, N] = input[s++].split(' ').map(x => +x);
    var cnt = 0;
    for (var i = 0; i < N; i++) {
        var k = +input[s++];
        if (k > E) cnt++;
    }
    ans += cnt+'\n';
}
console.log(ans);