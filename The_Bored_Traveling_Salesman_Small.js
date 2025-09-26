var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 1; c <= T; c++) {
    var [N, M] = input[s++].split(' ').map(x => +x);
    var zipCodes = [undefined];
    var minZip = Infinity;
    var idx;
    for (var i = 0; i < N; i++) {
        var num = +input[s++].trim();
        if (num < minZip) {
            minZip = num;
            idx = i+1;
        }
        zipCodes.push(num);
    }
    var graph = Array.from({length:N+1}, _ => []);
    for (var i = 0; i < M; i++) {
        var [X, Y] = input[s++].split(' ').map(x => +x);
        graph[X].push(Y);
        graph[Y].push(X);
    }
    var tickets = Array.from({length:N+1}, _ => Array(N+1).fill(false));
    var visited = Array(N+1).fill(false);
    visited[idx] = true;
    var min = backTracking(idx, 1, zipCodes[idx]);
    ans += `Case #${c}: ${min}\n`;
}
console.log(ans);


function backTracking(rec, dep, conc) {
    if (dep === N) {
        return BigInt(conc);
    }
    var min = Infinity;
    for (var nxt of graph[rec]) {
        // 사용되지 않은 티켓인가?
        if (!tickets[rec][nxt]) {
            // 왕복 티켓인가?
            if (tickets[nxt][rec]) {
                tickets[rec][nxt] = true;
                var res = backTracking(nxt, dep, conc);
                if (res < min) min = res;
                tickets[rec][nxt] = false;
            } else {
                // 편도 티켓인 경우
                // 첫 방문 도시인가? (해당 도시를 종점으로 하는 편도선이 없는가?)
                if (!visited[nxt]) {
                    visited[nxt] = true;
                    tickets[rec][nxt] = true;
                    var res = backTracking(nxt, dep+1, conc+String(zipCodes[nxt]));
                    if (res < min) min = res;
                    visited[nxt] = false;
                    tickets[rec][nxt] = false;
                }
            }
        }
    }
    return min;
}