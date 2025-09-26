var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, M] = input[s++].trim().split(' ').map(x => +x);
var [K, R, Q] = input[s++].trim().split(' ').map(x => +x);
var forest_square = Array(N*M);
var forest_diamond = Array(N*M);
// 정사각형 모양 화재
for (var i = 0; i < K; i++) {
    var [Xi, Yi, Ai] = input[s++].split(' ').map(x => +x -1);
    var le_X = Math.max(Xi-Ai, 0);
    var le_Y = Math.max(Yi-Ai, 0);
    var ri_X = Math.min(Xi+Ai, N-1);
    var ri_Y = Math.min(Yi+Ai, M-1);
    var le_num = convertToNumber(le_X, le_Y);
    var ri_num = convertToNumber(ri_X, ri_Y);
    if (!forest_square[le_num]) {
        forest_square[le_num] = [ri_num];
    } else {
        forest_square[le_num].push(ri_num);
    }
}
// 마름모 모양 화재
for (var i = 0; i < R; i++) {
    var [Xi, Yi, Ai] = input[s++].split(' ').map(x => +x -1);
    var le_X = Xi;
    var le_Y = Yi-Ai;
    var le_num = convertToNumber(le_X, le_Y);
    // 왼쪽 끝 시작점 찾기
    if (le_Y < 0) {
        le_X += le_Y;
        if (le_X >= 0) {
            le_num = convertToNumber(le_X, 0);
        } else {
            le_num = 0;
        }
    }
    // 오른쪽 끝 도착점 찾기
    var ri_X = Xi;
    var ri_Y = Yi+Ai;
    var ri_num = convertToNumber(ri_X, ri_Y);
//    if (ri_Y >= M) {
//        ri_X += ri_Y-(M-1);
//        if (ri_X < N) {
//            ri_num = convertToNumber(ri_X, M-1);
//        } else {
//            ri_num = N*M-1;
//        }
//    }
    if (!forest_diamond[le_num]) {
        forest_diamond[le_num] = [[ri_X, ri_Y, Ai, Xi, Yi]];
    } else {
        forest_diamond[le_num].push([ri_X, ri_Y, Ai, Xi, Yi]);
    }
}


var square_visited = Array(N*M).fill(false);
var diamond_visited= Array(N*M).fill(false);
square_sweeping(forest_square, square_visited);
diamond_sweeping(forest_diamond, diamond_visited);

// 초기 화재 구역 설정
var initial = [];
var total_visited = Array(N*M).fill(false);
set_initialFireArea(initial, total_visited, square_visited);
set_initialFireArea(initial, total_visited, diamond_visited);
// bfs
var time_fireScale = Array(2001);
var fireCnt = initial.length;
var dx = [-1, 1, 0, 0];
var dy = [0, 0, -1, 1];
bfs(initial, fireCnt, total_visited);

var ans = '';
for (var i = 0; i < Q; i++) {
    var T = +input[s++].trim();
    ans += `${time_fireScale[T]}\n`;
}
console.log(ans);


function convertToNumber(x, y) {
    return x*M+y;
}

function convertToCoord(num) {
    var x = Math.floor(num/M);
    var y = num%M;
    return [x, y];
}

// 정사각형 모양 2차원 스위핑 O(NM)
function square_sweeping(forest, visit) {
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++) {
            var conv = convertToNumber(i, j);
            if (forest[conv]) {
                for (var k of forest[conv]) {
                    var [x, y] = convertToCoord(k);
                    for (var p = x; p >= i; p--) {
                        for (var q = y; q >= j; q--) {
                            var thisNum = convertToNumber(p, q);
                            if (visit[thisNum]) break;
                            visit[thisNum] = true;
                        }
                    }
                }
            }
        }
    }
}

// 마름모 모양 2차원 스위핑 O(NM)
function diamond_sweeping(forest, visit) {
    for (var a = 0; a < N*2-1; a++) {
        var [i, j] = a < N ? [a, 0] : [N-1, a-N+1];
        for (; 0 <= i && i < N && 0 <= j && j < M; i--, j++) {
            var conv = convertToNumber(i, j)
            if (forest[conv]) {
                for (var [x, y, size, cx, cy] of forest[conv]) {
                    // 마름모 모양의 맨 오른쪽이 끝점. 이후 지그재그로 대각선 한 줄씩 탐색
                    for (var l = 0; ; (l&1 ? x++ : y--), l++) {
                        // 거리가 size 이상으로 벌어지면 마름모 바깥이므로 탐색 중단
                        var dist = Math.abs(cx-x)+Math.abs(cy-y);
                        if (dist > size) break;
                        var [p, q] = [x, y];
                        // 거리가 size 내이지만, 주어진 N*M 영역 바깥에 위치할 경우 안쪽에서 시작하도록 조정
                        var outMax = Math.max(x-N+1, y-M+1);
                        if (outMax > 0) {
                            p -= outMax;
                            q -= outMax
                        }
                        // 대각선으로 훑음
                        for (; 0 <= p && p < N && 0 <= q && q < M; p--, q--) {
                            var thisDist = Math.abs(p-cx)+Math.abs(q-cy);
                            if (thisDist > size) break;
                            var thisNum = convertToNumber(p, q);
                            if (visit[thisNum]) break;
                            visit[thisNum] = true;
                        }
                    }
                }
            }
        }
    }
}

function set_initialFireArea(ini, total, arr) {
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++) {
            var num = convertToNumber(i, j);
            if (arr[num]) {
                if (!total[num]) {
                    total[num] = true;
                    ini.push(num);
                }
            }
        }
    }
}

function bfs(list, fireCnt, visit) {
    var queue = list;
    time_fireScale[0] = fireCnt;
    var dep = 1;
    while (queue.length > 0) {
        var tmp = [];
        for (var num of queue) {
            var [x, y] = convertToCoord(num);
            for (var i = 0; i < 4; i++) {
                var nx = x+dx[i]
                var ny = y+dy[i];
                if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                    var thisNum = convertToNumber(nx, ny);
                    if (!visit[thisNum]) {
                        visit[thisNum] = true;
                        fireCnt++;
                        tmp.push(thisNum);
                    }
                }
            }
        }
        time_fireScale[dep] = fireCnt;
        queue = tmp;
        dep++;
    }
    if (dep <= 2000) {
        for (; dep <= 2000; dep++) {
            time_fireScale[dep] = fireCnt;
        }
    }
}
