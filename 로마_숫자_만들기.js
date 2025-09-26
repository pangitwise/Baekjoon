var N = +require('fs').readFileSync(0).toString().trim();
var dp = Array.from({length:N+1}, _ => Array(1001).fill(0));
var roman = [1, 5, 10, 50];
dp[0][0] = 1;

for (var i = 0; i < N; i++) {
    for (var j = 0; j <= 1000; j++) {
        if (dp[i][j]) {
            for (var k = 0; k < roman.length; k++) {
                var num = roman[k];
                dp[i+1][j+num] = 1;
            }
        }
    }
}
var ans = 0;
for (var i = 0; i <= 1000; i++) {
    if (dp[N][i]) ans++;
}
console.log(ans);