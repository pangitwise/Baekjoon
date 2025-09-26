var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var graph = Array.from({length:N+1}, _ => []);
for (var i = 1; i < N; i++) {
    var [A, B, C] = input[i].split(' ').map(x => +x);
    graph[A].push([B, C]);
    graph[B].push([A, C]);
}
console.log(dfs(1, 0, 0));


function dfs(recent, parent, sum) {
    var max = sum;
    for (var i of graph[recent]) {
        var [next, w] = i;
        if (next === parent) continue;
        max = Math.max(max, dfs(next, recent, sum+w));
    }
    return max;
}