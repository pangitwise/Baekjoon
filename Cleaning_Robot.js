var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var t = input[1].split(' ').map(x => +x);
var limit = Math.max(...t);
var map = new Map();
for (var i = 0; i < t.length; i++) {
    map.set(t[i], i);
}
var grid = Array.from({length:1001}, _ => Array(1001).fill(false));

var R = [];
var points = Array(n);
var uncleaned = Array(n);
for (var i = 2; i < n+2; i++) {
    var [xl, yl, xu, yu] = input[i].split(' ').map(x => +x);
    if (i === 2) var [sx, sy] = [xl, yu];
    R.push([xl, yl, xu, yu]);
    points[i-2] = (yu-yl+1)*2+(xu-xl-1)*2;
    uncleaned[i-2] = points[i-2];
}
var ans = Array(t.length);
cleaning(sx, sy, 'R', 0, 0);
console.log(ans.map(x => x.join(' ')).join('\n'));


function cleaning(x, y, dir, i, t) {
    while (t <= limit) {
        checkTime(x, y, t);
        if (t > limit) return;
        if (x === sx && y === sy && t > 0) {
            t++;
            continue;
        }
        var next = undefined;
        var bol = false;
        for (var j = 0; j < n; j++) {
            if (i === j) continue;
            if (isOnRectangle(x, y, j)) {
                next = j;
                if (uncleaned[j] === points[j]) bol = true;
            }
        }
        if (!grid[x][y]) {
            grid[x][y] = true;
            uncleaned[i]--;
            uncleaned[next]--;
        }
        if (next !== undefined && (bol || uncleaned[i] === 0)) {
            var nextDir = changeRectangle(x, y, dir, next);
            checkTime(x, y, t+1);
            var [dir, i, t] = [nextDir, next, t+2];
            continue;
        }
        if (isOnVertex(x, y, dir, i)) {
            var nextDir = clockwiseTurn(dir);
            checkTime(x, y, t+1);
            var [dir, t] = [nextDir, t+2];
            continue;
        }
        var [nx, ny] = nextPos(x, y, dir);
        var [x, y, t] = [nx, ny, t+1];
    }
}


function isOnRectangle(x, y, i) {
    var [xl, yl, xu, yu] = R[i];
    if (xl === x && yl <= y && y <= yu) return true;
    if (xu === x && yl <= y && y <= yu) return true;
    if (yl === y && xl <= x && x <= xu) return true;
    if (yu === y && xl <= x && x <= xu) return true;
    return false;
}

function changeRectangle(x, y, dir, next) {
    var [xl, yl, xu, yu] = R[next];
    if (dir === 'D') {
        if (y === yu) return 'R';
        if (y === yl) return 'L';
    }
    if (dir === 'R') {
        if (x === xu) return 'D';
        if (x === xl) return 'U';
    }
    if (dir === 'U') {
        if (y === yu) return 'R';
        if (y === yl) return 'L';
    }
    if (dir === 'L') {
        if (x === xu) return 'D';
        if (x === xl) return 'U';
    }
}

function isOnVertex(x, y, dir, i) {
    var [xl, yl, xu, yu] = R[i];
    if (x === xl && y === yl && dir === 'L') return true;
    if (x === xl && y === yu && dir === 'U') return true;
    if (x === xu && y === yl && dir === 'D') return true;
    if (x === xu && y === yu && dir === 'R') return true;
}

function clockwiseTurn(x) {
    if (x === 'D') return 'L';
    if (x === 'R') return 'D';
    if (x === 'U') return 'R';
    if (x === 'L') return 'U';
}

function nextPos(x, y, dir) {
    if (dir === 'U') return [x, y+1];
    if (dir === 'D') return [x, y-1];
    if (dir === 'R') return [x+1, y];
    if (dir === 'L') return [x-1, y];
}

function checkTime(x, y, t) {
    if (map.has(t)) {
        var idx = map.get(t);
        ans[idx] = [x, y];
    }
}