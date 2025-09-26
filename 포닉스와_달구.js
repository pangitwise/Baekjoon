var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, K] = input[0].split(' ').map(x => +x);
var grid = [];
for (var i = 1; i < N+1; i++) {
    grid.push(input[i].split(' ').map(x => +x));
}

var forward = Array.from({length:N}, _ => Array(N).fill(-1));
var reverse = Array.from({length:N}, _ => Array(N).fill(-1));

var dx1 = [1, 0];
var dy1 = [0, 1];
var dx2 = [-1, 0];
var dy2 = [0, -1];

bfs([0, 0], forward, dx1, dy1);
bfs([N-1, N-1], reverse, dx2, dy2);

var max_value = Array(N*N);
for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
        var idx = i*N+j;
        max_value[idx] = forward[i][j]+reverse[i][j]-grid[i][j];
    }
}

// 대각선 훑기
var min = Infinity;
for (var i = 1; i <= N-K; i++) {
    var [Kx, Ky] = [i, 0];
    var [Tx, Ty] = [Kx+K-1, Ky+K-1];
    if (Tx === N-1 && Ty === N-1) continue;
    var [Hx, Hy] = [Kx+K-1, 0];
    var left = [];
    for (var j = 0; Hx-j >= 0 && Hy+j < N; j++) {
        var num = (Hx-j)*N+(Hy+j);
        left.length === 0 ? left.push(max_value[num]) : left.push(Math.max(max_value[num], left[j-1]));
    }
    var right = [];
    j--;
    for (var k = 0; Hx-j < N && Hy+j >= 0; j--, k++) {
        var num = (Hx-j)*N+(Hy+j);
        right.length === 0 ? right.push(max_value[num]) : right.push(Math.max(max_value[num], right[k-1]));
    }
    // 투 포인터로 Max값 찾기
    var k = -1;
    var l = right.length-1-K;
    while (Kx >= 0 && Ty < N) {
        var lm = k >= 0 ? left[k] : -1;
        var rm = l >= 0 ? right[l] : -1;
        min = Math.min(min, Math.max(lm, rm));
        Kx--;
        Ty++;
        k++;
        l--;
    }
}

for (var i = 1; i+K-1 < N-1; i++) {
    var [Kx, Ky] = [N-K, i];
    var [Tx, Ty] = [Kx+K-1, Ky+K-1];
    if (Tx === N-1 && Ty === N-1) continue;
    var [Hx, Hy] = [Kx+K-1, i];
    var left = [];
    for (var j = 0; Hx-j >= 0 && Hy+j < N; j++) {
        var num = (Hx-j)*N+(Hy+j);
        left.length === 0 ? left.push(max_value[num]) : left.push(Math.max(max_value[num], left[j-1]));
    }
    var right = [];
    j--;
    for (var k = 0; Hx-j < N && Hy+j >= 0; j--, k++) {
        var num = (Hx-j)*N+(Hy+j);
        right.length === 0 ? right.push(max_value[num]) : right.push(Math.max(max_value[num], right[k-1]));
    }
    // 투 포인터로 Max값 찾기
    var k = -1;
    var l = right.length-1-K;
    while (Kx >= 0 && Ty < N) {
        var lm = k >= 0 ? left[k] : -1;
        var rm = l >= 0 ? right[l] : -1;
        min = Math.min(min, Math.max(lm, rm));
        Kx--;
        Ty++;
        k++;
        l--;
    }
}
console.log(min);


function bfs(start, arr, dx, dy) {
    var [sx, sy] = start;
    arr[sx][sy] = grid[sx][sy];
    var queue = [start];
    while (queue.length > 0) {
        var tmp = [];
        for (var i of queue) {
            var [x, y] = i;
            for (var j = 0; j < 2; j++) {
                var nx = x+dx[j];
                var ny = y+dy[j];
                if (0 <= nx && nx < N && 0 <= ny && ny < N) {
                    if (arr[nx][ny] === -1) tmp.push([nx, ny]);
                    arr[nx][ny] = Math.max(arr[nx][ny], grid[nx][ny]+arr[x][y]);
                }
            }
            queue = tmp;
        }
    }
}