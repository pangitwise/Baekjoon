var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [n, m] = input[s++].trim().split(' ').map(x => +x);
var maxMatching = Array(n);
var classes = Array(n);
for (var i = 0; i < n; i++) {
    var a = +input[s++].trim();
    classes[i] = a;
    if (i === n-1) break;
    var graph = Array.from({length:a}, _ => []);
    for (var j = 0; j < a; j++) {
        var arr = input[s++].trim().split(' ').map(x => +x);
        for (var k = 1; k < arr.length; k++) {
            graph[j].push(arr[k]);
        }
    }
    var assignedNum = Array(101).fill(-1);
    var assignedIdx = Array(101).fill(0);
    var cnt = 0;
    for (var j = 0; j < a; j++) {
        var visited = Array(a).fill(false);
        if (bipartiteMatching(j, 0, graph)) cnt++;
    }
    maxMatching[i] = cnt;
}

var dp = Array.from({length:n+1}, _ => Array(m+1).fill(-1));
dp[0][0] = 0;
for (var i = 0; i < n; i++) {
    for (var j = 0; j <= m; j++) {
        if (dp[i][j] === -1) continue;
        // 현재 학년을 생략하는 경우
        dp[i+1][j] = Math.max(dp[i+1][j], dp[i][j]);
        if (j+1 <= m) {
            // 반 하나에 한 학년만 넣는 경우
            dp[i+1][j+1] = Math.max(dp[i+1][j+1], dp[i][j]+classes[i]) 
        }
        if (j+1 <= m && i+2 <= n) {
            // 반 하나에 두 학년을 넣는 경우
            dp[i+2][j+1] = Math.max(dp[i+2][j+1], dp[i][j]+classes[i]+classes[i+1]-maxMatching[i]);
        }
    }
}
var max = 0;
for (var i = 0; i <= n; i++) {
    for (var j = 0; j <= m; j++) {
        max = Math.max(max, dp[i][j]);
    }
}
console.log(max);


function bipartiteMatching(x, idx, bipartiteGraph) {
    // x가 매칭된 적이 없으면 탐색 중단
    if (x === -1) return true;
    idx %= bipartiteGraph[x].length;
    var bol = false;
    var c = 0;
    for (var i = idx; c < bipartiteGraph[x].length; i++, c++) {
        i %= bipartiteGraph[x].length;
        var j = bipartiteGraph[x][i];
        // 해당 정점에 방문한 적이 있으면 넘기기
        if (visited[j]) continue;
        // 없을 경우, 해당 정점에 매칭되었던 기존 정점을 다른 정점에 매칭시킬 수 있는지 탐색 
        visited[j] = true;
        var originNum = assignedNum[j];
        var idx = assignedIdx[j];
        var valid = bipartiteMatching(originNum, idx+1, bipartiteGraph);
        // 가능하다면, 현재 정점에 해당 정점을 매칭
        // 불가하다면, 다음 정점 탐색
        if (valid) break;
    }
    if (c < bipartiteGraph[x].length) {
        bol = true;
        assignedNum[j] = x;
        assignedIdx[j] = i;
    } else {
        bol = false;
    }
    return bol;
}