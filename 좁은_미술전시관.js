var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, k] = input[0].split(' ').map(x => +x);
var gallery = [];
for (var i = 1; i < N+1; i++) {
    gallery.push(input[i].split(' ').map(x => +x));
}
// 0: 모두 열림
// 1: 왼쪽 열림
// 2: 오른쪽 열림
var dp1 = Array.from({length:k+1}, _ => Array(3).fill(-1));
dp1[0][0] = 0;
var dp2 = Array.from({length:k+1}, _ => Array(3).fill(-1));
for (var i = 0; i < N; i++) {
    var [l, r] = gallery[i];
    if (i&1) {
        update(dp2, dp1, l, r);
    } else {
        update(dp1, dp2, l, r);
    }
}
var max = i&1 ? Math.max(...dp2[k]) : Math.max(...dp1[k]);
console.log(max);


function update(dp, tmp, l, r) {
    for (var i = 0; i <= k; i++) {
        var lm = Math.max(...dp[i]);
        if (lm >= 0) tmp[i][0] = lm+l+r;
        if (i > 0) {
            var lm1 = Math.max(dp[i-1][0], dp[i-1][1]);
            var lm2 = Math.max(dp[i-1][0], dp[i-1][2]);
            if (lm1 >= 0) tmp[i][1] = lm1+l;
            if (lm2 >= 0) tmp[i][2] = lm2+r;
        }
    }
    for (var i = 0; i <= k; i++) {
        for (var j = 0; j < 3; j++) {
            dp[i][j] = -1;
        }
    }
}
