var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var N = +input[s++];
var graph = Array.from({length:N+1}, (v, k) => []);
var cap = Array.from({length:N+1}, (v, k) => Array(N+1).fill(0));
var flow = Array.from({length:N+1}, (v, k) => Array(N+1).fill(0));
var level = Array(N+1).fill(-1);
level[1] = 0;
var work = Array(N+1).fill(0);
for (var i = 1; i < N; i++) {
    var [num, ...connect] = input[i].split(' ').map(x => +x);
    var start = i;
    for (var end of connect) {
        if (cap[start][end] === 0) {
            graph[start].push(end);
        }
        if (start === 1 || end === N) {
            cap[start][end] = 1;
        } else {
            cap[start][end] = Infinity;
        }
    }
}
for (var i = 1; i < N+1; i++) {
    for (var j = 0; j < graph[i].length; j++) {
        var node = graph[i][j];
        if (cap[node][i] === 0) graph[node].push(i);
    }
}

var total = 0;
while (bfs()) {
    work = Array(N+1).fill(0);
    while (true) {
        var f = dfs(1, N, Infinity);
        if (f === 0) break;
        total += f;
    }
}
console.log(total);


function bfs() {
    level = level.fill(-1);
    level[1] = 0;
    lev = 1;
    list = [1];
    while (list.length) {
        var queue = [];
        for (var i of list) {
            for (var j of graph[i]) {
                if (level[j] === -1 && cap[i][j]-flow[i][j] > 0) {
                    level[j] = lev;
                    queue.push(j);
                }
            }
        }
        list = queue;
        lev++;
    }
    if (level[N] === -1) {
        return false;
    } else {
        return true;
    }
}

function dfs(cur, goal, stream) {
    if (cur === goal) return stream;
    for (var i = work[cur]; i < graph[cur].length; i++) {
        var next = graph[cur][i];
        if (level[next] === level[cur]+1 && cap[cur][next]-flow[cur][next] > 0) {
            stream = Math.min(stream, cap[cur][next]-flow[cur][next]);
            var tmp = dfs(next, goal, stream);
            if (tmp > 0) {
                flow[cur][next] += tmp;
                flow[next][cur] -= tmp;
                return tmp;
            }
        }
        work[cur]++;
    }
    return 0;
}