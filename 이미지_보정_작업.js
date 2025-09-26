var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, M, K, X] = input[0].split(' ').map(x => BigInt(x));
N = Number(N);
M = Number(M);
var image = [];
for (var i = 1; i < N+1; i++) {
    image.push(input[i].split(' ').map(x => BigInt(x)));
}
var visited = Array.from({length:N}, _ => Array(M).fill(false));

var dx = [-1, 1, 0, 0];
var dy = [0, 0, -1, 1];

console.log(String(binarySearch(K)));


function binarySearch(K) {
    var start = -1n;
    var end = X+1n;
    var min = Infinity;
    while (start+1n < end) {
        var mid = (start+end)/2n;
        if (istoGetClarity(K, mid)) {
            min = min < mid ? min : mid;
            end = mid;
        } else {
            start =  mid;
        }
    }
    return min;
}

function clearVisited() {
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++) {
            visited[i][j] = false;
        }
    }
}

function istoGetClarity(K, limit) {
    clearVisited();
    var cnt = 0;
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++) {
            if (visited[i][j]) continue;
            cnt += dfs(i, j, limit);
            if (cnt > K) return false;
        }
    }
    return true;
}

function dfs(x, y, limit) {
    var total = 0;
    var v = image[x][y];
    var bol = true;
    for (var i = 0; i < 4; i++) {
        var nx = x+dx[i];
        var ny = y+dy[i];
        if (0 <= nx && nx < N && 0 <= ny && ny < M) {
            var d = (visited[nx][ny] === 2 ? X : image[nx][ny])-v;
            if (d > limit) {
                bol = false;
            }
        }
    }
    if (!bol) {
        visited[x][y] = 2;
        total++;
        for (var i = 0; i < 4; i++) {
            var nx = x+dx[i];
            var ny = y+dy[i];
            if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                var d = X-image[nx][ny];
                if (d < 0) d *= -1n;
                if (!visited[nx][ny] || (visited[nx][ny] === 1 && d > limit)) {
                    total += dfs(nx, ny, limit);
                }
            }
        }
    } else {
        visited[x][y] = 1;
    }
    return total;
}