var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, M] = input[0].split(' ').map(x => +x);
var start;
var map = [];
for (var i = 1; i < N+1; i++) {
    var arr = input[i].trim().split('');
    for (var j = 0; j < M; j++) {
        if (arr[j] === 'P') start = [i-1, j];
    }
    map.push(arr);
}

var dx = [-1, 1, 0, 0];
var dy = [0, 0, -1, 1];

var visited = Array.from({length:N}, _ => Array(M).fill(false));

var ans = [];
dfs(...start);
console.log(ans.join('\n'));


function dfs(x, y) {
    visited[x][y] = true;
    for (var i = 0; i < 4; i++) {
        var nx = x+dx[i];
        var ny = y+dy[i];
        if (0 <= nx && nx < N && 0 <= ny && ny < M) {
            if (!visited[nx][ny] && map[nx][ny] === 'x') {
                switch (i) {
                    case 0:
                        ans.push('gore');
                        break;
                    case 1:
                        ans.push('dolje');
                        break;
                    case 2:
                        ans.push('lijevo');
                        break;
                    case 3:
                        ans.push('desno');
                        break;
                }
                dfs(nx, ny);
            }
        }
    }
}