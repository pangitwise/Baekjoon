var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, M, K] = input[0].split(' ').map(x => +x);
var fruits = [null];
for (var i = 1; i < K+1; i++) {
    fruits.push(input[i].split(' ').map(x => +x));
}
var dp = Array.from({length:M+1}, _ => Array(K+1).fill(-1));
dp[0][0] = 0;
var max = 0;
for (var i = 0; i < M; i++) {
    for (var j = 0; j < K+1; j++) {
        if (dp[i][j] === -1) continue;
        for (var k = 1; k < K+1; k++) {
            var [A, B, C] = fruits[k];
            if (j === k) {
                if (i+B <= M) {
                    dp[i+B][k] = Math.max(dp[i+B][k], dp[i][j]+C);
                    max = Math.max(max, dp[i+B][k]);
                }
            }
            if (i+A <= M) {
                dp[i+A][k] = Math.max(dp[i+A][k], dp[i][j]+C);
                max = Math.max(max, dp[i+A][k]);
            }
        }
    }
}
console.log(max*N);