var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var Z = +input[s++];
var ans = '';

var dx = [-1, 1, 0, 0];
var dy = [0, 0, -1, 1];

for (var c = 0; c < Z; c++) {
    var [n, m] = input[s++].split(' ').map(x => +x);
    var grid = [];
    for (var i = 0; i < n; i++) {
        grid.push(input[s++].split(' ').map(x => +x));
    }
    // 좌표 압축
    var set = new Set();
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            set.add(grid[i][j]);
        }
    }
    var sorted = [...set].sort((a,b) => a-b);
    var map = new Map();
    for (var i = 0; i < sorted.length; i++) map.set(sorted[i], i);
    var loc = Array.from({length:sorted.length}, _ => []);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            var conv = map.get(grid[i][j]);
            grid[i][j] = conv;
            loc[conv].push([i, j]);
        }
    }
    // 분리 집합
    var list = Array.from({length:n*m}, (v, k) => k);
    var size = Array.from({length:n*m}, _ => 0);
    var visited = Array(n*m).fill(false);
    var cnt = 0;
    var log = Array(sorted.length);
    for (var i = sorted.length-1; i >= 0; i--) {
        for (var j of loc[i]) {
            var [x, y] = j;
            var num = x*m+y;
            visited[num] = true;
            size[num] = 1;
            cnt++;
            for (var k = 0; k < 4; k++) {
                var nx = x+dx[k];
                var ny = y+dy[k];
                if (0 <= nx && nx < n && 0 <= ny && ny < m) {
                    var tmp = nx*m+ny;
                    if (grid[nx][ny] >= grid[x][y] && visited[tmp]) {
                        if (union(num, tmp)) {
                            cnt--;
                        }
                    }
                }
            }
        }
        log[i] = cnt;
    }
    // 스위핑
    var T = +input[s++];
    var t = input[s++].split(' ').map(x => +x);
    var res = Array(T);
    for (var [i, j] = [T-1, sorted.length-1]; i >= 0; i--) {
        while (j >= 0 && t[i] < sorted[j]) j--;
        res[i] = j === sorted.length-1 ? 0 : log[j+1];
    }
    ans += res.join(' ')+'\n';
}
console.log(ans);


function find(x) {
    if (x === list[x]) {
        return x;
    } else {
        list[x] = find(list[x]);
        return list[x];
    }
}

function union(a, b) {
    var root_a = find(a);
    var root_b = find(b);
    if (root_a !== root_b) {
        if (size[root_a] >= size[root_b]) {
            harmony(root_a, root_b);
        } else {
            harmony(root_b, root_a);
        }
        return true;
    }
    return false;
}

function harmony(big, small) {
    size[big] += size[small];
    size[small] = -1;
    list[small] = big;
}