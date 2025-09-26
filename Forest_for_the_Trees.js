var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [nt, ns, r_max] = input[s++].trim().split(' ').map(x => +x);
var trees = [];
var tree_set = new Set();
for (var i = 0; i < nt; i++) {
    var [x, y] = input[s++].split(' ').map(x => +x);
    trees.push([x, y]);
    tree_set.add([x, y].join(' '));
}
var sensor_info = [];
var sensor_grid = Array.from({length:r_max*2+1}, _ => Array(r_max*2+1).fill(false));
for (var i = 0; i < ns; i++) {
    var [x, y] = input[s++].split(' ').map(x => +x);
    sensor_info.push([x, y]);
    sensor_grid[x+r_max][y+r_max] = true;
}
// 로봇이 향하고 있는 방향을 정한 다음, tree마다 sensor_info를 하나씩 매칭시켜 가면서 조건을 만족하는지 확인하기
// 로봇이 나무와 같은 위치에 있지 않도록 주의!
// 로봇 센서의 감지 범위 내에 나무가 추가로 있을 경우 오답
var total = 0;
var valid = [];
var visited = new Set();
for (var i = 0; i < trees.length; i++) {
    var [tx, ty] = trees[i];
    for (var dir = 0; dir < 4; dir++) {
        for (var j = 0; j < sensor_info.length; j++) {
            var [sx, sy] = sensor_info[j];
            var [rob_x, rob_y] = robot_location_chase(tx, ty, sx, sy, dir);
            var robot_convert = convert_robotCoord(rob_x, rob_y);
            if (visited.has(robot_convert)) continue; // 이미 탐색한 점은 건너뛰기
            if (tree_set.has(robot_convert)) continue; // 로봇의 위치로 나무 위의 점을 가리킬 경우 건너뛰기
            // 한 점에서 동시에 4방향 보기
            var bol = [true, true, true, true];
            var bolCnt = 4;
            var cnt = [0, 0, 0, 0];
            var remain = [nt, nt, nt, nt];
            for (var k = 0; k < nt; k++) {
                total++;
                // 1. 남은 범위 내의 나무 수로 감지 개수를 채울 수 없을 시 오류
                bolCnt -= isEnoughRemain(bol, remain, cnt);
                if (!bolCnt) break;
                var [_tx, _ty] = trees[k];
                var thisDist = Math.abs(rob_x-_tx)+Math.abs(rob_y-_ty);
                if (thisDist <= r_max) {
                    // 2. 감지 범위 내의 나무가 감지되지 않았을 시 오류
                    bolCnt -= treat_sensor_info(bol, rob_x, rob_y, _tx, _ty);
                    // 3. 감지 범위 내의 나무가 감지 개수를 초과 시 오류
                    bolCnt -= isExceeded_NumOfTrees_InRegion(bol, cnt);
                    if (!bolCnt) break;
                }
            }
            isValidRobotCoord(bol, cnt, rob_x, rob_y);
            visited.add(robot_convert);
            if (valid.length > 1) break;
        }
        if (valid.length > 1) break;
    }
    if (valid.length > 1) break;
}

var ans = valid.length ? valid.length === 1 ? valid[0].join(' ') : 'Ambiguous' : 'Impossible';
console.log(ans);

function robot_location_chase(tx, ty, sx, sy, dir) {
    switch (dir) {
        case 0: // 상
            var rob_x = tx-sx;
            var rob_y = ty-sy;
            break;
        case 1: // 하
            var rob_x = tx+sx;
            var rob_y = ty+sy;
            break;
        case 2: // 좌
            var rob_x = tx+sy;
            var rob_y = ty-sx;
            break;
        case 3: // 우
            var rob_x = tx-sy;
            var rob_y = ty+sx;
            break;
    }
    return [rob_x, rob_y];
}

function sensor_chase(rx, ry, tx, ty, dir) {
    switch (dir) {
        case 0:
            var sen_x = tx-rx;
            var sen_y = ty-ry;
            break;
        case 1:
            var sen_x = -(tx-rx);
            var sen_y = -(ty-ry);
            break;
        case 2:
            var sen_x = ty-ry;
            var sen_y = -(tx-rx);
            break;
        case 3:
            var sen_x = -(ty-ry);
            var sen_y = tx-rx;
            break;
    }
    return [sen_x, sen_y];
}

function isEnoughRemain(bol, remain, cnt) {
    var beFalse = 0;
    for (var i = 0; i < 4; i++) {
        if (bol[i]) {
            if (remain[i]+cnt[i] < ns) {
                bol[i] = false;
                beFalse++;
            }
        }
    }
    return beFalse;
}

function treat_sensor_info(bol, rx, ry, tx, ty) {
    var beFalse = 0;
    for (var dir = 0; dir < 4; dir++) {
        if (bol[dir]) {
            var [sen_x, sen_y] = sensor_chase(rx, ry, tx, ty, dir);
            if (sensor_grid[sen_x+r_max][sen_y+r_max]) {
                cnt[dir]++;
            } else {
                bol[dir] = false;
                beFalse++;
            }
        }
    }
    return beFalse;
}

function isExceeded_NumOfTrees_InRegion(bol, cnt) {
    var beFalse = 0;
    for (var i = 0; i < 4; i++) {
        if (bol[i]) {
            if (cnt[i] > ns) {
                bol[i] = false;
                beFalse++;
            }
        }
    }
    return beFalse;
}

function isValidRobotCoord(bol, cnt, rob_x, rob_y) {
    for (var i = 0; i < 4; i++) {
        if (bol[i] && cnt[i] === ns) {
            valid.push([rob_x, rob_y]);
        }
    }
}

function convert_robotCoord(rob_x, rob_y) {
    return rob_x*300000+rob_y;
}