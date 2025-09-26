var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, K] = input[0].split(' ').map(x => +x);
var matrix = [];
for (var i = 1; i < N+1; i++) {
    matrix.push(input[i].split(' ').map(x => +x));
}
for (var i = 0; i < N; i++) {
    for (var j = i+1; j < N; j++) {
        matrix[i][j] = 0;
    }
}
for (var i = 0; i < N; i++) {
    for (var j = 0; j <= i; j++) {
        matrix[i][j] += (matrix[i][j-1] || 0);
        if (i > 0) matrix[i][j] += matrix[i-1][j];
        if (i > 0 && j > 0 && j < i) matrix[i][j] -= matrix[i-1][j-1];
    }
}

var dp1 = Array.from({length:N}, (v, k) => matrix[k][k]);
var dp2 = Array(N).fill(Infinity);
for (var i = 1; i < K; i++) {
    if (i&1) {
        dnc(dp1, dp2, i, N-1, i-1, N-1);
        dp1.fill(Infinity);
    } else {
        dnc(dp2, dp1, i, N-1, i-1, N-1);
        dp2.fill(Infinity);   
    }
}
i&1 ? console.log(dp1.at(-1)) : console.log(dp2.at(-1));

function dnc(dp, tmp, l, r, start, end) {
    var mid = (l+r)>>1;
    var next;
    for (var i = start; i < mid; i++) {
        var v = dp[i]+matrix[mid][mid]-matrix[mid][i];
        if (v <= tmp[mid]) {
            tmp[mid] = v;
            next = i;
        }
    }
    if (l < mid) dnc(dp, tmp, l, mid-1, start, next);
    if (mid < r) dnc(dp, tmp, mid+1, r, next, end);
}