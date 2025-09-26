var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, M] = input[0].split(' ').map(x => +x);
var board = [];
var list = [];
for (var i = 1; i < N+1; i++) {
    var arr = input[i].trim().split('');
    for (var j = 0; j < M; j++) {
        if (arr[j] === 'D') {
            list.push([i-1, j, 0]);
        }
    }
    board.push(arr);
}

// 뚫린 면의 상태
// 0: 바닥
// 1: 동쪽
// 2: 서쪽
// 3: 남쪽
// 4: 북쪽
// 5: 천장
var visited = Array.from({length: N}, _ => Array.from({length:M}, __ => Array(6).fill(false)));

var dx = [-1, 1, 0, 0];
var dy = [0, 0, -1, 1];

console.log(bfs(list));


function bfs(list) {
    var queue = list;
    var [sx, sy] = list[0];
    visited[sx][sy][0] = true;
    var dep = 1;
    while (queue.length > 0) {
        var tmp = [];
        for (var i of queue) {
            var [x, y, st] = i;
            for (var j = 0; j < 4; j++) {
                var nx = x+dx[j];
                var ny = y+dy[j];
                var nt = nextState(j, st);
                if (0 <= nx && nx < N && 0 <= ny && 0 < M) {
                    if (board[nx][ny] !== '#' && !visited[nx][ny][nt]) {
                        if (board[nx][ny] === 'R') {
                            if (nt === 0) return dep;
                            continue;
                        }
                        visited[nx][ny][nt] = true;
                        tmp.push([nx, ny, nt]);
                    }
                }
            }
        }
        queue = tmp;
        dep++;
    }
    return -1;
}


function nextState(dir, st) {
    if (dir === 0) {
        if (st === 0) return 3;
        if (st === 1 || st === 2) return st;
        if (st === 3) return 5;
        if (st === 4) return 0;
        if (st === 5) return 4;
    } else if (dir === 1) {
        if (st === 0) return 4;
        if (st === 1 || st === 2) return st;
        if (st === 3) return 0;
        if (st === 4) return 5;
        if (st === 5) return 3;
    } else if (dir === 2) {
        if (st === 0) return 1;
        if (st === 1) return 5;
        if (st === 2) return 0;
        if (st === 3 || st === 4) return st;
        if (st === 5) return 2
    } else if (dir === 3) {
        if (st === 0) return 2;
        if (st === 1) return 0;
        if (st === 2) return 5;
        if (st === 3 || st === 4) return st;
        if (st === 5) return 1;
    }
}