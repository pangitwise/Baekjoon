var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, D] = input[0].split(' ').map(x => +x);
var a = input[1].split(' ').map(x => +x);

var total = 0;
var section = [];
// [y절편, 왼쪽 범위, 오른쪽 범위]
var plus = [];
var minus = [[0, -Infinity, 0]];
// 꼭짓점
var points = [[0, 0]];
var cur_x = 0;
var cur_y = 0;
for (var i = 0; i < N; i++) {
    var next_x = cur_x+a[i];
    var next_y = i&1 ? cur_y-a[i] : cur_y+a[i];
    total += a[i];
    if (i&1) {
        var intc_y = getInterceptY(-1, cur_x, cur_y);
        points.push([next_x, next_y]);
        minus.push([intc_y, cur_x, next_x]);
    } else {
        var intc_y = getInterceptY(1, cur_x, cur_y);
        points.push([next_x, next_y]);
        plus.push([intc_y, cur_x, next_x]);
    }
    section.push([cur_x, cur_y, next_x, next_y]);
    cur_x = next_x;
    cur_y = next_y;
}
var intc_y = getInterceptY(1, cur_x, cur_y);
plus.push([intc_y, cur_x, Infinity]);

var trace = [];
// 꼭짓점+D, 꼭짓점-D에서의 조명 위치 기록록
for (var i = 0; i < points.length; i++) {
    var [x, y] = points[i];
    var rp = getRightTracePoint(x, y);
    if (rp) trace.push(rp);
    var lp = getLeftTracePoint(x, y);
    if (lp) trace.push(lp);
}
// 왼쪽 끝점과 오른쪽 끝점에서의 조명 위치 기록
var lh = binarySearch_H(0, 0);
var ry = section.at(-1)[3];
var rh = binarySearch_H(total, ry);
trace.push([0, lh], [total, ry+rh]);

// 자취 선분 구하기
trace.sort((a,b) => a[0]-b[0]);
var segment = [];
var cur_slope = undefined;
var [x1, y1] = trace[0];
for (var i = 1; i < trace.length; i++) {
    var [x2, y2] = trace[i];
    if (x1 === x2) continue;
    var this_slope = (y2-y1)/(x2-x1);
    if (cur_slope === undefined) {
        cur_slope = this_slope;
        continue;
    }
    if (cur_slope !== this_slope) {
        segment.push([x1, y1, ...trace[i-1]]);
        var [x1, y1] = trace[i-1];
        var cur_slope = (y2-y1)/(x2-x1);
    }
}
segment.push([x1, y1, ...trace.at(-1)]);

console.log(segment.length);
console.log(segment.map(x => x.join(' ')).join('\n'));


// y = ax+b
// y-ax = b 
function getInterceptY(slope, x, y) {
    return y-slope*x;
}

function getRightTracePoint(x, y) {
    var intc_y1 = getInterceptY(1, x, y);
    var rx = x+D;
    var ry = binarySearch_y(rx);
    var r_intc_y = getInterceptY(-1, rx, ry);
    var hx = getSolutionOfEquation(1, intc_y1, -1, r_intc_y);
    var hy = hx+intc_y1;
    if (hx <= total) {
        return [hx, hy];
    } else {
        return false;
    }
}

function getLeftTracePoint(x, y) {
    var intc_y1 = getInterceptY(-1, x, y);
    var rx = x-D;
    var ry = binarySearch_y(rx);
    var r_intc_y = getInterceptY(1, rx, ry);
    var hx = getSolutionOfEquation(-1, intc_y1, 1, r_intc_y);
    var hy = -hx+intc_y1;
    if (hx >= 0) {
        return [hx, hy];
    } else {
        return false;
    }
}

// ax+b = cx+d
// (a-c)x = d-b
// x = (d-b)/(a-c)
function getSolutionOfEquation(a, b, c, d) {
    if (a !== c) {
        return (d-b)/(a-c);
    } else {
        return undefined;
    }
}

function binarySearch_y(x) {
    var start = -1;
    var end = N;
    if (x < 0) return Math.abs(x);
    while (start+1 < end) {
        var mid = (start+end)>>1;
        var [lx, ly, rx, ry] = section[mid];
        if (lx <= x && x < rx) {
            if (ly > ry) {
                return ly-(x-lx);
            } else {
                return ly+(x-lx);
            }
        } else {
            if (lx > x) end = mid;
            if (x >= rx) start = mid;
        }
    }
    var [lx, ly, rx, ry] = section.at(-1);
    return ry+(x-rx);
}

function binarySearch_cross1(arr, slope, x, y) {
    var start = -1;
    var end = arr.length;
    var intc_y = getInterceptY(slope, x, y);
    while (start+1 < end) {
        var mid = (start+end)>>1;
        var [tmp_intc_y, l, r] = arr[mid];
        var sol = getSolutionOfEquation(slope, intc_y, -slope, tmp_intc_y);
        if (l <= sol && sol < r) {
            return sol;
        } else {
            if (l > sol) end = mid;
            if (sol >= r) start = mid;
        }
    }
}

function binarySearch_cross2(arr, slope, x, y) {
    var start = -1;
    var end = arr.length;
    var intc_y = getInterceptY(slope, x, y);
    while (start+1 < end) {
        var mid = (start+end)>>1;
        var [tmp_intc_y, l, r] = arr[mid];
        var sol = getSolutionOfEquation(slope, intc_y, -slope, tmp_intc_y);
        if (l < sol && sol <= r) {
            return sol;
        } else {
            if (l >= sol) end = mid;
            if (sol > r) start = mid;
        }
    }
}

function binarySearch_H(x, y) {
    var start = -1;
    var end = total+1;
    var min = Infinity;
    while (start+1 < end) {
        var mid = Math.floor((start+end)/2);
        var [nx, ny] = [x, y+mid];
        var rx = binarySearch_cross1(plus, -1, nx, ny);
        var lx = binarySearch_cross2(minus, 1, nx, ny);
        if (rx-lx >= D) {
            min = Math.min(min, mid);
            end = mid;
        } else {
            start = mid;
        }
    }
    return min;
}

// 현재 위치 cur을 적절하게 환산할 수 있는 함수를 만드는 게 관건인 듯...

// 오른쪽 누적합: 짝수번쨰
// 왼쪽 누적합: 홀수번째

// 이분 탐색으로 


// [0, 2], [2, 6], [6, 12], [12, 14]
// [0, 14], [2, 14], [2, 8], [8, 8], [8, 6]

// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14

// 0 1 6 7 8 9 10 11 14
//   0 6

// 0 0
// 1 1
// 2 