var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [A, B] = input[0].split(' ').map(x => +x);
var N = +input[1];
var mainStreet = [];
for (var i = 2; i < N+2; i++) {
    mainStreet.push(input[i].split(' ').map(x => +x));
}
mainStreet.push([A, B, A, B]);

var matrix = Array.from({length:N+1}, _ => Array(N+1).fill(0));
for (var i = 0; i < N+1; i++) {
    var [x1, y1, x2, y2] = mainStreet[i];
    for (var j = 0; j < N+1; j++) {
        var [x3, y3, x4, y4] = mainStreet[j];
        if (lineIntersectionCheck(x1, y1, x2, y2, x3, y3, x4, y4)) {
            matrix[i][j] = 3;
            matrix[j][i] = 3;
        } else {
            var ste = pointCheck(x1, y1, j) || pointCheck(x2, y2, j);
            matrix[i][j] = ste || matrix[i][j];
        }
    }
}
for (var i = 0; i < N+1; i++) {
    for (var j = 0; j < N+1; j++) {
        if (!matrix[i][j] && matrix[j][i]) {
            matrix[i][j] = matrix[j][i];
        }
    }
}

var fixedX_list = Array(N+1).fill(false);
var fixedY_list = Array(N+1).fill(false);
for (var i = 0; i < N+1; i++) {
    var [x1, y1, x2, y2] = mainStreet[i];
    fixedX_list[i] = x1 === x2 ? Math.abs(x1) : x1*x2 > 0 ? Math.min(Math.abs(x1), Math.abs(x2)) : Math.min(Math.abs(x1), Math.abs(x2), Math.abs(y1));
    fixedY_list[i] = y1 === y2 ? Math.abs(y1) : y1*y2 > 0 ? Math.min(Math.abs(y1), Math.abs(y2)) : Math.min(Math.abs(y1), Math.abs(y2), Math.abs(x1));
}

var val = Array.from({length:N+1}, (v, k) => [fixedX_list[k], fixedY_list[k]]);
var sorted = Array.from({length:N+1}, (v, k) => k);
for (var i = 0; i < N+1; i++) {
    sorted.sort(function(a,b) {
        var _a = Math.max(...val[a]);
        var _b = Math.max(...val[b]);
        return _b-_a;
    });
    var idx = sorted.pop();
    var v = Math.max(...val[idx]);
    for (var j = 0; j < N+1; j++) {
        if (matrix[j][idx] === 1) {
            val[j][0] = Math.min(val[j][0], v);
        } else if (matrix[j][idx] === 2) {
            val[j][1] = Math.min(val[j][1], v);
        } else if (matrix[j][idx] === 3) {
            val[j][0] = Math.min(val[j][0], v);
            val[j][1] = Math.min(val[j][1], v);
        }
    }
}
console.log(Math.max(...val[N]));


function pointCheck(x, y, j) {
    var state = 0
    // x좌표 위치 고정
    var [x1, y1, x2, y2] = mainStreet[j];
    if ((x1 <= x && x <= x2) || (x2 <= x && x <= x1)) {
        state = 1;
    }
    // y좌표 위치 고정
    if ((y1 <= y && y <= y2) || (y2 <= y && y <= y1)) {
        state = 2;
    }
    return state;
}

function lineIntersectionCheck(x1, y1, x2, y2, x3, y3, x4, y4) {
    var k1 = ccw(x1, y1, x2, y2, x3, y3)
    var k2 = ccw(x1, y1, x2, y2, x4, y4)
    var k3 = ccw(x3, y3, x4, y4, x1, y1)
    var k4 = ccw(x3, y3, x4, y4, x2, y2)
    // 한 점에서 교차함
    if (k1*k2 === -1 && k3*k4 === -1) {
        return 2
    } else 
    // 한 선분 위에 다른 선분의 끝이 있음
    if (k1*k2*k3*k4 === 0 && (k1*k2 === -1 || k3*k4 === -1)) {
        return 1
    }
    // 두 선분의 끝이 서로 만남
    if (k1*k2 === 0 && k3*k4 === 0 && k1+k2 !== 0) {
        return 1
    } else 
    // 만나지 않음
    if (k1*k2 === 1 || k3*k4 === 1) {
        return 0
    } else 
    // 일직선일 때
    if (k1*k2 === 0 && k3*k4 === 0 && k1+k2+k3+k4 === 0) {
        if (isStraigthLineIntersected(x1, y1, x2, y2, x3, y3) ||
        isStraigthLineIntersected(x1, y1, x2, y2, x4, y4) ||
        isStraigthLineIntersected(x3, y3, x4, y4, x1, y1) ||
        isStraigthLineIntersected(x3, y3, x4, y4, x2, y2)) {
            if (straigtlineNode(x1, y1, x2, y2, x3, y3, x4, y4)) {
                return 1
            } else {
                return 3
            }
        } else {
            return 0
        }
    }
}

function ccw(x1, y1, x2, y2, x3, y3) {
    var d = x1*y2+x2*y3+x3*y1-x2*y1-x3*y2-x1*y3;
    if (d < 0) return -1;
    if (d === 0) return 0;
    if (d > 0) return 1;
}

function straigtlineNode(x1, y1, x2, y2, x3, y3, x4, y4) {
    if (x1 === x3 && y1 === y3 && (x2-x1)*(x4-x1) <= 0 && (y2-y1)*(y4-y1) <= 0) {
        return true
    } else if (x1 === x4 && y1 === y4 && (x2-x1)*(x3-x1) <= 0 && (y2-y1)*(y3-y1) <= 0) {
        return true
    } else if (x2 === x3 && y2 === y3 && (x1-x2)*(x4-x2) <= 0 && (y1-y2)*(y4-y2) <= 0) {
        return true
    } else if (x2 === x4 && y2 === y4 && (x1-x2)*(x3-x2) <= 0 && (y1-y2)*(y3-y2) <= 0) {
        return true
    } else {
        return false
    }
}

function isStraigthLineIntersected(x1, y1, x2, y2, x3, y3) {
    var min_x = x1 < x2 ? x1 : x2;
    var max_x = x1 > x2 ? x1 : x2;
    var min_y = y1 < y2 ? y1 : y2;
    var max_y = y1 > y2 ? y1 : y2;
    if (((min_x <= x3 && x3 <= max_x && min_y <= y3 && y3 <= max_y))) {
        return true;
    } else {
        return false;
    }
}