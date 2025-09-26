var input = require('fs').readFileSync(0).toString().trim().split('\n');
var t = 0;
var ans = '';
while (1) {
    var n = +input[t++];
    if (n === 0) break;
    var s = input[t++].split(' ').map(x => +x);

}
console.log(ans);


function knapsack(n) {
    var dp = Array.from({length:n+1}, _ => _ => Array(30000).fill(undefined));
    dp[0][0] = 0;
    for (var i = 0; i < n; i++) {
        for (var j = -30000; j <= 30000; j++) {
            if (dp[i][j] !== undefined) {
                for (var k = -500; k <= 500; k += 2) {
                    
                }
            }
        }
    }
}
