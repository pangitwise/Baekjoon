var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var max = 3;
    var N = +input[s++];
    var graph = Array.from({length:N+1}, _ => []);
    graph[1] = [2, 3];
    graph[2] = [1, 3];
    graph[3] = [1, 2];
    for (var i = 0; i < N-3; i++) {
        var [a, b] = input[s++].split(' ').map(x => +x);
        graph[a].push(i+4);
        graph[b].push(i+4);
        graph[i+4].push(a, b);
    }
    var visited = Array(N+1).fill(false);
    var max = 3;
    for (var i = 1; i < graph.length; i++) {
        visited[i] = true;
        var st = i;
        backtracking(i, 1);
        visited.fill(false);
    }
    ans += `Case #${c+1}: ${max}\n`;
}
console.log(ans);


function backtracking(rec, cnt) {
    for (var i = 0; i < graph[rec].length; i++) {
        var nxt = graph[rec][i];
        if (nxt === st) {
            max = Math.max(max, cnt);
        } else {
            if (!visited[nxt]) {
                visited[nxt] = true;
                backtracking(nxt, cnt+1);
                visited[nxt] = false;
            }
        }
    }
}