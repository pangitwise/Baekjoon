var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var t = +input[s++];
var ans = '';
var map = [];
var dx = [1, 0, -1, 0];
var dy = [0, 1, 0, -1];
var set = new Set();
for (var c = 0; c < t; c++) {
    var [n, m, d] = input[s++].split(' ').map(x => +x);
    for (var i = 0; i < n; i++) {
        var arr = input[s++].split(' ').map(x => +x)
        for (var j of arr) set.add(j);
        map.push(arr);
    }
    var tmp = [...set].sort((a,b) => a-b);
    var conv = new Map();
    for (var i = 0; i < tmp.length; i++) {
        conv.set(tmp[i], i);
    }
    var list = Array.from({length:tmp.length}, _ => []);
    var visited = Array.from({length:n}, _ => Array(m).fill(false));
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            var num = conv.get(map[i][j]);
            list[num].push([i, j]);
        }
    }
    var dep = 1;
    var top = 0;
    for (var i = list.length-1; i >= 0; i--) {
        for (var j = 0; j < list[i].length; j++) {
            var cnt = 0;
            var [x, y] = list[i][j];
            if (dfs(x, y, map[x][y], dep)) {
                top += cnt;
            }
            dep++;
        }
    }
    ans += top+'\n';
    map = [];
    set.clear();
}
console.log(ans);

function dfs(x, y, init, dep) {
    if (map[x][y] === init) cnt++;
    visited[x][y] = dep;;
    for (var i = 0; i < 4; i++) {
        var nx = x+dx[i];
        var ny = y+dy[i];
        if (0 <= nx && nx < n && 0 <= ny && ny < m) {
            var gap = init-map[nx][ny];
            if (gap < d) {
                if (!visited[nx][ny]) {
                    var valid = dfs(nx, ny, init, dep);
                    if (!valid) return false;
                } else {
                    if (visited[nx][ny] < dep) return false;
                }
            }
        }
    }
    return true;
}
