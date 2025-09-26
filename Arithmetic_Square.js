var input = require('fs').readFileSync(0).toString().trim().split('\n');

Map.prototype.plus = function(x) {
    if (this.has(x)) {
        this.set(x, this.get(x)+1);
    } else {
        this.set(x, 1);
    }
}

var s = 0;
var T = +input[s++];
var ans = '';
for (var i = 1; i < T+1; i++) {
    var grid = [];
    for (var j = 0; j < 3; j++) {
        var arr = input[s++].split(' ').map(x => +x);
        if (j !== 1) {
            grid.push(arr)
        } else {
            arr.splice(1, 0, undefined);
            grid.push(arr);
        }
    }
    var cnt = getCnt(grid);
    cnt += getAdditional(grid);
    ans += 'Case #'+i+': '+cnt+'\n';
}
console.log(ans);


function getCnt(grid) {
    var list = [[[0, 0], [0, 2], [0, 1]],[[0, 0], [2, 0], [1, 0]], [[2, 0], [2, 2], [2, 1]], [[0, 2], [2, 2], [1, 2]]];
    var cnt = 0;
    for (var i = 0; i < list.length; i++) {
        var [a, b, c] = list[i];
        var [x1, y1] = a;
        var [x2, y2] = b;
        var [x3, y3] = c;
        a = grid[x1][y1];
        b = grid[x2][y2];
        c = grid[x3][y3];
        if (c*2 === a+b) cnt++;
    }
    return cnt;
}

function getAdditional(G) {
    var map = new Map();
    var v = G[0][0]+G[2][2];
    v /= 2;
    if (Number.isInteger(v)) map.plus(v);
    v = G[0][1]+G[2][1];
    v /= 2;
    if (Number.isInteger(v)) map.plus(v);
    v = G[0][2]+G[2][0];
    v /= 2;
    if (Number.isInteger(v)) map.plus(v);
    v = G[1][0]+G[1][2];
    v /= 2;
    if (Number.isInteger(v)) map.plus(v);
    if (map.size === 0) {
        return 0;
    } else {
        return Math.max(...map.values());
    }
}