var input = require('fs').readFileSync(0).toString().trim().split('\n');
var S = +input[0];
var ans = '';
var dp = Array.from({length:41}, _ => Array(2).fill(0));
dp[0][0] = 1;
for (var i = 1; i <= 40; i++) {
    dp[i][0] = dp[i-1][0]+dp[i-1][1];
    dp[i][1] = dp[i-1][0];
}
for (var i = 1; i < S+1; i++) {
    var n = +input[i];
    ans += 'Scenario '+i+':\n'
    ans += (dp[n][0]+dp[n][1])+'\n\n';
}
console.log(ans.trim());