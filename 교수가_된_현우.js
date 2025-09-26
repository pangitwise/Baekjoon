var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var ans = '';
for (var i = 1; i < T+1; i++) {
    var N = +input[i];
    var cnt = 0;
    var j = 0;
    var div = 5;
    while (div <= N) {
        if (j&1) {
            cnt += Math.floor(N/div);
        } else {
            cnt += Math.floor(N/div);
        }
        j++;
        div *= 5;
    }
    ans += cnt+'\n';
}
console.log(ans);