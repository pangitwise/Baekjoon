var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, M] = input[s++].split(' ').map(x => +x);
var graph = Array.from({length:N+1}, _ => []);
for (var i = 0; i < N; i++) {
    var [a, b] = input[s++].split(' ').map(x => +x);
    graph[a].push([b, i]);
    graph[b].push([a, i]);
}
var cycle = [];
var cycleEnd = undefined;
var visited = Array(N+1).fill(false);
var cycleEdge = Array(N).fill(false);
// dfs를 이용해 사이클을 찾고 그래프를 트리로 만들기기
getCycle(1, undefined, false);

visited.fill(false);
var depth = Array(N+1).fill(0);
var inDegree = Array(N+1).fill(0);
var cyclePrefix = Array(N+1).fill(0);
var parentInfo = Array.from({length:N+1}, _ => [undefined, undefined]);
var queue = [];
// [+, -]
var dp = Array.from({length:N+1}, _ => [0, 0])
var sparse = Array.from({length:18}, _ => Array(N+1));
dfs(1, 0, 0);
makeSparseTable(sparse);

// S와 E를 잇는 경로 중 하나라도 사이클 내의 경로를 지나면,
// 사이클 내의 모든 도로를 방문하게 되는 것과 같다
var cycleTraffic = 0;
for (var i = 0; i < M; i++) {
    var [S, E, W] = input[s++].split(' ').map(x => +x);
    var lca = LCA(S, E);
    var cycleRoad1 = cyclePrefix[S]-cyclePrefix[lca];
    var cycleRoad2 = cyclePrefix[E]-cyclePrefix[lca];
    if (cycleRoad1+cycleRoad2 > 0) cycleTraffic += W;
    if (S !== lca) {
        dp[S][0] += W;
        dp[lca][1] += W;
    }
    if (E !== lca) {
        dp[E][0] += W;
        dp[lca][1] += W;
    }
}

// 사이클 외 도로의 통행량은 트리 DP로 해결 가능
var totalTraffic = Array(N).fill(0);
visited.fill(false);
while (queue.length > 0) {
    var tmp = [];
    for (var i of queue) {
        if (i === 1) break;
        visited[i] = true;
        dp[i][0] -= dp[i][1];
        var [next, num] = parentInfo[i];
        if (!cycleEdge[num]) {
            totalTraffic[num] += dp[i][0];
        }
        dp[next][0] += dp[i][0];
        inDegree[next]--;
        if (inDegree[next] === 0) {
            tmp.push(next);
        }
    }
    queue = tmp;
}

for (var i = 0; i < N; i++) {
    if (cycleEdge[i]) totalTraffic[i] = cycleTraffic;
}

console.log(totalTraffic.join('\n'));


function getCycle(x, par, isCycle) {
    visited[x] = true;
    for (var j = 0; j < graph[x].length; j++) {
        var [i, num] = graph[x][j];
        if (i !== par && visited[i]) {
            isCycle = true;
            if (!cycleEnd) cycleEnd = i;
            cycleEdge[num] = true;
            cycleFirstEdge = num;
            graph[x].splice(j, 1);
        } else if (!visited[i]) {
            var bol = getCycle(i, x, false);
            isCycle |= bol;
            if (bol) cycleEdge[num] = true;
        }
    }
    if (isCycle) {
        cycle.push(x);
        if (x === cycleEnd) isCycle = false;
    }
    return isCycle;
}

function dfs(x, dep, cycleEdgeCnt) {
    visited[x] = true;
    depth[x] = dep;
    cyclePrefix[x] = cycleEdgeCnt;
    var isLeaf = true;
    for (var edge of graph[x]) {
        var [i, num] = edge;
        if (!visited[i]) {
            sparse[0][i] = x;
            parentInfo[i] = [x, num];
            var nextCnt = cycleEdge[num] ? cycleEdgeCnt+1 : cycleEdgeCnt;
            inDegree[x]++;
            dfs(i, dep+1, nextCnt);
            isLeaf = false;
        }
    }
    if (isLeaf) queue.push(x);
}

function makeSparseTable(sparse) {
    for (var i = 1; i <= 17; i++) {
        for (var j = 1; j < N+1; j++) {
            var next = sparse[i-1][j];
            sparse[i][j] = sparse[i-1][next];
        }
    }
}

function LCA(a, b) {
    var gap = depth[a]-depth[b];
    if (gap < 0) b = adjustDepth(b, -gap);
    if (gap > 0) a = adjustDepth(a, gap);
    if (a === b) {
        return a;
    } else {
        for (var i = 17; i >= 0; i--) {
            if (sparse[i][a] !== sparse[i][b]) {
                a = sparse[i][a];
                b = sparse[i][b];
            }
        }
        var lca = sparse[0][a];
        return lca;
    }
}

function adjustDepth(x, gap) {
    for (var i = 17; i >= 0; i--) {
        if ((gap|1<<i) === gap) {
            x = sparse[i][x];
        }
    }
    return x;
}