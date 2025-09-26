var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var graph = Array.from({length:N+1}, _ => []);
for (var i = 1; i < N; i++) {
    var [a, b] = input[i].split(' ').map(x => +x);
    graph[a].push(b);
    graph[b].push(a);
}
var visited = Array(N+1).fill(false);
var cnt0 = 0;
var cnt1 = 0;
var bi = Array(N+1);
dfs(1, 0);
if (cnt0 === 1 || cnt1 === 1) {
    console.log(N-1);
} else {
    console.log(N);
}

function dfs(x, k) {
    visited[x] = true;
    bi[x] = k;
    if (k === 0) cnt0++;
    if (k === 1) cnt1++;
    for (var i of graph[x]) {
        if (!visited[i]) dfs(i, k^1);
    }
}
//  1
// 2  4
//3 5

// 1
// 2
// 3 4