var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var ans = '';
var dx = [-1, 1, 0, 0];
var dy = [0, 0, -1, 1];
while (true) {
    var [N, M] = input[s++].split(' ').map(x => +x);
    if (!N && !M) break;
    var K = +input[s++];
    var graph = Array.from({length:N*M}, _ => []);
    var pond = Array(N*M).fill(false);
    for (i = 0; i < K; i++) {
        var [X, Y] = input[s++].split(' ').map(x => +x);
        var num = (X-1)*M+(Y-1);
        pond[num] = true;
    }
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++) {
            var num = i*M+j;
            if (pond[num]) continue;
            if ((!(i&1) && !(j&1)) || (i&1 && j&1)) {
                for (var k = 0; k < 4; k++) {
                    var nx = i+dx[k];
                    var ny = j+dy[k];
                    if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                        var nextNum = nx*M+ny;
                        if (!pond[nextNum]) {
                            graph[num].push(nextNum);
                        }
                    }
                }
            }
        }
    }
    var assignedNum = Array(N*M).fill(-1);
    var assignedIdx = Array(N*M).fill(0);
    var visited = Array(N*M);
    var cnt = 0;
    for (var i = 0; i < N*M; i++) {
        visited.fill(false);
        if (bipartiteMatching(i, 0, graph)) cnt++;
    }
    ans += cnt+'\n';
}
console.log(ans);


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