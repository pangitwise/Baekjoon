var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [H, W] = input[0].split(' ').map(x => +x);
var sandcastle = [];
for (var i = 1; i < H+1; i++) {
    sandcastle.push(input[i].trim().split(''));
}

var dx = [-1, -1, -1, 0, 0, 1, 1, 1];
var dy = [-1, 0, 1, -1, 1, -1, 0, 1];
var weakSide = [];

for (var i = 0; i < H; i++) {
    for (var j = 0; j < W; j++) {
        if (sandcastle[i][j] !== '.') {
            sandcastle[i][j] = +sandcastle[i][j];
            if (isWeak(i, j)) weakSide.push([i, j]);
        }
    }
}

var checked = Array.from({length:H}, _ => Array(W).fill(-1));
console.log(waveBfs(weakSide));


function isWeak(x, y) {
    var cnt = 0;
    for (var i = 0; i < 8; i++) {
        var nx = x+dx[i];
        var ny = y+dy[i];
        if (0 <= nx && nx < H && 0 <= ny && ny < W) {
            if (sandcastle[nx][ny] === '.' || sandcastle[nx][ny] === '#') cnt++;
        }
    }
    if (cnt >= sandcastle[x][y]) return true;
    return false;
}

function waveBfs(list) {
    var queue = list;
    var dep = 1;
    while (queue.length > 0) {
        var tmp = [];
        for (var i of queue) {
            var [x, y] = i;
            sandcastle[x][y] = '#';
        }
        for (var i of queue) {
            var [x, y] = i;
            for (var j = 0; j < 8; j++) {
                var nx = x+dx[j];
                var ny = y+dy[j];
                if (0 <= nx && nx < H && 0 <= ny && ny < W) {
                    if (checked[nx][ny] < dep) {
                        if (isWeak(nx, ny)) tmp.push([nx, ny]);
                        checked[nx][ny] = dep;
                    }
                }
            }
        }
        queue = tmp;
        dep++;
    }
    return dep-1;
}