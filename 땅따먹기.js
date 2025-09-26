const { info } = require('console');
const exp = require('constants');
const { lstat } = require('fs');

var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, M] = input[s++].split(' ').map(x => +x);
var origin = [];
var board = [];
var start_pnt = []
var O_cnt = 0;
var isReachable = Array.from({length:N}, _ => Array(M).fill('N'));
for (var i = 0; i < N; i++) {
    var row = input[s++].trim().split('');
    origin.push(row.slice());
    for (var j = 0; j < M; j++) {
        switch (row[j]) {
            case 'O':
                row[j] = 0;
                O_cnt++;
                break;
            case 'X':
                row[j] = 1;
                break;
            case 'A':
                row[j] = 0;
                start_pnt.push(getGridValue(i,j, i,j));
                isReachable[i][j] = 'Y';
                break;
        }
    }
    board.push(row);
}
// 'X'의 개수를 누적합을 이용해 저장
for (var i = 0; i < N; i++) {
    for (var j = 0; j < M; j++) {
        board[i][j] += (i-1 >= 0 ? board[i-1][j] : 0)
        + (j-1 >= 0 ? board[i][j-1] : 0)
        - (i-1 >= 0 && j-1 >= 0 ? board[i-1][j-1] : 0);
    }
}
// 말이 차지하는 영역을 좌상 꼭짓점과 우하 꼭짓점으로 표현하여 정보를 저장하는 방식으로로 bfs
var info_area = Array.from({length:N*M}, _ => Array(N*M).fill(false));
var visited = Array.from({length:N*M}, _ => Array(N*M).fill(false));
var grid = Array.from({length:N*M}, (v, k) => [Math.floor(k/M), k%M]);
bfs(start_pnt);

// 좌상을 고정하고, 우하 꼭짓점을 맨 끝에서부터 탐색하면서 O(NM)으로 전 영역의 도달/포함 여부 확인
for (var i = 0; i < N*M; i++) {
    var [x1, y1] = [Math.floor(i/M), i%M];
    for (var j = N*M-1; j >= 0; j--) {
        if (info_area[i][j]) {
            var [x2, y2] = [Math.floor(j/M), j%M];
            // 코드 통일을 위해 시작점을 false로 놓음
            info_area[i][j] = false;
            for (var k = y2; k >= y1; k--) {
                for (var l = x2; l >= x1; l--) {
                    var num = l*M+k;
                    if (!info_area[i][num]) {
                        info_area[i][num] = true;
                        isReachable[l][k] = 'Y';
                    } else {
                        break;
                    }
                }
            }
        }
    }
}
console.log(isReachable.map(x => x.join('')).join('\n'));


function bfs(list) {
    var queue = [];
    for (var piece of list) {
        var [v1, v2] = piece;
        visited[v1][v2] = true;
        info_area[v1][v2] = true;
        var [x1, y1] = grid[v1];
        var [x2, y2] = grid[v2];
        is_O(x1, y1)
        is_O(x2, y2);
        if (O_cnt === 0) return;
        var tmp = [];
        tmp.push(...expandTop(x1, y1, x2, y2));
        tmp.push(...expandBottom(x1, y1, x2, y2));
        tmp.push(...expandLeft(x1, y1, x2, y2));
        tmp.push(...expandRight(x1, y1, x2, y2));
        for (var nxt of tmp) {
            var [nx1, ny1, nx2, ny2] = nxt;
            var nv1 = nx1*M+ny1;
            var nv2 = nx2*M+ny2;
            if (!visited[nv1][nv2]) {
                visited[nv1][nv2] = true;
                queue.push([nv1, nv2]);
            }
        }
    }
    if (queue.length > 0) {
        bfs(queue);
    }
}

function getGridValue(x1, y1, x2, y2) {
    var v1 = x1*M+y1;
    var v2 = x2*M+y2;
    return [v1, v2];
}

function is_O(i, j) {
    if (origin[i][j] === 'O') {
        origin[i][j] = '#';
        isReachable[i][j] = 'Y';
        O_cnt--;
    }
}

function get_X_cnt(x1, y1, x2, y2) {
    return board[x2][y2]
    - (y1-1 >= 0 ? board[x2][y1-1] : 0)
    - (x1-1 >= 0 ? board[x1-1][y2] : 0)
    + (x1-1 >= 0 && y1-1 >= 0 ? board[x1-1][y1-1] : 0);
}

function expandTop(x1, y1, x2, y2) {
    x1--;
    if (x1 < 0) return [];
    var X_cnt = get_X_cnt(x1, y1, x2, y2);
    if (X_cnt) return [];
    var list = [];
    var tmp = [moveTop(x1, y1, x2, y2), moveBottom(x1, y1, x2, y2),  moveLeft(x1, y1, x2, y2), moveRight(x1, y1, x2, y2)];
    for (var mov of tmp) {
        if (mov) list.push(mov);
    }
    if (list.length) {
        var [v1, v2] = getGridValue(x1, y1, x2, y2);
        info_area[v1][v2] = true;
        return list;
    } else {
        return [];
    }
}

function expandBottom(x1, y1, x2, y2) {
    x2++;
    if (x2 >= N) return [];
    var X_cnt = get_X_cnt(x1, y1, x2, y2);
    if (X_cnt) return [];
    var list = [];
    var tmp = [moveTop(x1, y1, x2, y2), moveBottom(x1, y1, x2, y2),  moveLeft(x1, y1, x2, y2), moveRight(x1, y1, x2, y2)];
    for (var mov of tmp) {
        if (mov) list.push(mov);
    }
    if (list.length) {
        var [v1, v2] = getGridValue(x1, y1, x2, y2);
        info_area[v1][v2] = true;
        return list;
    } else {
        return [];
    }
}

function expandLeft(x1, y1, x2, y2) {
    y1--;
    if (y1 < 0) return [];
    var X_cnt = get_X_cnt(x1, y1, x2, y2);
    if (X_cnt) return [];
    var list = [];
    var tmp = [moveTop(x1, y1, x2, y2), moveBottom(x1, y1, x2, y2),  moveLeft(x1, y1, x2, y2), moveRight(x1, y1, x2, y2)];
    for (var mov of tmp) {
        if (mov) list.push(mov);
    }
    if (list.length) {
        var [v1, v2] = getGridValue(x1, y1, x2, y2);
        info_area[v1][v2] = true;
        return list;
    } else {
        return [];
    }
}

function expandRight(x1, y1, x2, y2) {
    y2++;
    if (y2 >= M) return [];
    var X_cnt = get_X_cnt(x1, y1, x2, y2);
    if (X_cnt) return [];
    var list = [];
    var tmp = [moveTop(x1, y1, x2, y2), moveBottom(x1, y1, x2, y2),  moveLeft(x1, y1, x2, y2), moveRight(x1, y1, x2, y2)];
    for (var mov of tmp) {
        if (mov) list.push(mov);
    }
    if (list.length) {
        var [v1, v2] = getGridValue(x1, y1, x2, y2);
        info_area[v1][v2] = true;
        return list;
    } else {
        return [];
    }
}


function moveTop(x1, y1, x2, y2) {
    x1--;
    x2--;
    if (x1 < 0) return false;
    var X_cnt = get_X_cnt(x1, y1, x2, y2);
    if (X_cnt) return false;
    return [x1, y1, x2, y2];
}

function moveBottom(x1, y1, x2, y2) {
    x1++;
    x2++;
    if (x2 >= N) return false;
    var X_cnt = get_X_cnt(x1, y1, x2, y2);
    if (X_cnt) return false;
    return [x1, y1, x2, y2];
}

function moveLeft(x1, y1, x2, y2) {
    y1--;
    y2--;
    if (y1 < 0) return false;
    var X_cnt = get_X_cnt(x1, y1, x2, y2);
    if (X_cnt) return false;
    return [x1, y1, x2, y2];
}

function moveRight(x1, y1, x2, y2) {
    y1++;
    y2++;
    if (y2 >= M) return false;
    var X_cnt = get_X_cnt(x1, y1, x2, y2);
    if (X_cnt) return false;
    return [x1, y1, x2, y2];
}