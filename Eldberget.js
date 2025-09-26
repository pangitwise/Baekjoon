var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, M, K] = input[0].split(' ').map(x => +x);
var map = Array.from({length:K+1}, _ => Array.from({length:N}, _ => Array(M)));
for (var i = 0; i < N; i++) {
    var arr = input[i+1].trim().split('');
    for (var j = 0; j < M; j++) {
        for (var k = 0; k <= K; k++) {
            map[k][i][j] = arr[j];
        }
    }
}

var dx = [-1, 1, 0, 0];
var dy = [0, 0, -1, 1];

bfs(0, 0, 0);
var ans = Infinity;
for (var i = 0; i <= K; i++) {
    ans = Number.isInteger(map[i][N-1][M-1]) ? Math.min(ans, map[i][N-1][M-1]) : ans;
}
console.log(ans === Infinity ? 'nej' : ans);


function bfs(sk, sx, sy) {
    var queue = [[sk, sx, sy]];
    var dep = 1;
    while (queue.length > 0) {
        var tmp = [];
        for (var i of queue) {
            var [k, x, y] = i;
            for (var j = 0; j < 4; j++) {
                var nx = x+dx[j];
                var ny = y+dy[j];
                if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                    if (map[k][nx][ny] === '.') {
                        map[k][nx][ny] = dep;
                        tmp.push([k, nx, ny]);
                    } else if (map[k][nx][ny] === '#') {
                        var nk = k+1;
                        if (nk <= K) {
                            if (!Number.isInteger(map[nk][nx][ny])) {
                                map[nk][nx][ny] = dep;
                                tmp.push([nk, nx, ny]);
                            }
                        }
                    }
                }
            }
        }
        queue = tmp;
        dep++;
    }
}