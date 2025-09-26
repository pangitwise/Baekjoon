var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, m] = input[0].split(' ').map(x => +x);
var board = Array.from({length:n}, _ => Array(m).fill(false));
var [q, ...Q] = input[1].split(' ').map(x => +x);
for (var i = 0; i < q; i++) {
    var [r, c] = [Q[i*2], Q[i*2+1]];
    board[r-1][c-1] = 'Q';
}
var [k, ...K] = input[2].split(' ').map(x => +x);
for (var i = 0; i < k; i++) {
    var [r, c] = [K[i*2], K[i*2+1]];
    board[r-1][c-1] = 'K';
}
var [p, ...P] = input[3].split(' ').map(x => +x);
for (var i = 0; i < p; i++) {
    var [r, c] = [P[i*2], P[i*2+1]];
    board[r-1][c-1] = 'P';
}

for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
        if (board[i][j] === 'Q') moveQueen(i, j);
        if (board[i][j] === 'K') moveKnight(i, j);
    }
}
var cnt = 0;
for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
        if (!board[i][j]) cnt++;
    }
}
console.log(cnt);


function moveQueen(r, c) {
    var dx = [-1, -1, -1, 0, 0, 1, 1, 1];
    var dy = [-1, 0, 1, -1, 1, -1, 0, 1];
    for (var i = 0; i < 8; i++) {
        var [x, y] = [r, c];
        while (0 <= x && x < n && 0 <= y && y < m) {
            var [nx, ny] = [x+dx[i], y+dy[i]];
            if (0 <= nx && nx < n && 0 <= ny && ny < m) {
                if (!board[nx][ny]) {
                    board[nx][ny] = true;
                } else if (board[nx][ny] !== true) {
                    break;
                }
            }
            [x, y] = [nx, ny];
        }
    }
}

function moveKnight(r, c) {
    var dx = [-2, -2, -1, -1, 1, 1, 2, 2];
    var dy = [-1, 1, -2, 2, -2, 2, -1, 1];
    for (var i = 0; i < 8; i++) {
        var nr = r+dx[i];
        var nc = c+dy[i];
        if (0 <= nr && nr < n && 0 <= nc && nc < m) {
            if (board[nr][nc] === false) {
                board[nr][nc] = true;
            }
        }
    }
}