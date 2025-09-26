var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, M] = input[s++].split(' ').map(x => +x);
var a = [null, ...input[s++].split(' ').map(x => +x)];

var graph = Array.from({length:N+1}, _ => []);
var dp = Array(N+1).fill(0);
for (var i = 0; i < N-1; i++) {
    var [u, v] = input[s++].split(' ').map(x => +x);
    graph[u].push(v);
    graph[v].push(u);
}
dfs(M, undefined);

var ans = Array(N);
ans[M-1] = dp[M];
treeDp(M, undefined, 0);

console.log(ans.join('\n'));


function dfs(x, p) {
    dp[x] = a[x];
    for (var i of graph[x]) {
        if (i !== p) {
            dp[x] += dfs(i, x);
        }
    }
    return dp[x];
}


function treeDp(x, p, cur) {
    var lo = 0;
    var hi = 0;
    // M보다 작은 번호와 큰 번호 구분
    if (i !== p) {
        for (var i of graph[x]) {
            if (i < p) lo += dp[i];
            if (i > p) hi += dp[i]; 
        }
        // 값 지정
        ans[x-1] = getNeededHolyWater(lo, hi, cur);
    }
    // 재귀 탐색
    for (var i of graph[x]) {
        if (x === M) {
            treeDp(i, x, dp[M]-dp[i]);
        } else {
            if (i !== p) {
                var next = i < M ? getNeededHolyWater(lo-dp[i], hi, cur) : getNeededHolyWater(lo, hi-dp[i], cur);
                treeDp(i, x, next);
            }
        }
    }
}


function getNeededHolyWater(lo, hi, cur) {
    if (lo < hi) {
        if (lo+cur >= hi) {
            return lo+hi+cur;
        } else {
            return (lo+cur)*2;
        }
    } else if (lo === hi) {
        return  lo+hi+cur;
    } else if (lo > hi) {
        if (hi+cur >= lo) {
            return hi+lo+cur;
        } else {
            return (hi+cur)*2;
        }
    }
}