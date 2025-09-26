var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var balls = [];
for (var i = 1; i < N+1; i++) {
    balls.push(+input[i]);
}
var left = Array(N);
var right = Array(N);
// 오른쪽 스위핑
var cur = 0;
for (var i = 0; i < N; i++) {
    if (balls[cur] === balls[i]) {
        left[i] = cur;
    } else {
        cur = i;
        left[i] = cur;
    }
}
// 왼쪽 스위핑
var cur = N-1;
for (var i = N-1; i >= 0; i--) {
    if (balls[cur] === balls[i]) {
        right[i] = cur;
    } else {
        cur = i;
        right[i] = cur;
    }
}

// 공의 색깔 바꾸기
var min = N;
for (var i = 0; i < N; i++) {
    for (var j = 1; j <= 3; j++) {
        if (balls[i] === j) continue;
        min = Math.min(min, changeBallColors(i, j));
    }
}
console.log(min);


function changeBallColors(idx, color) {
    var remain = N;
    var l = idx-1;
    var r = idx+1;
    var l_cur = l >= 0 ? balls[l] : undefined;
    var r_cur = r < N ? balls[r] : undefined;
    var initial = true;
    while (remain) {
        if (l_cur === r_cur) {
            var del = (l-left[l]+1)+(right[r]-r+1);
            if (initial) {
                del += 1;
                initial = false;
            }
            if (del < 4) break;
            remain -= del;
            l = left[l]-1;
            r = right[r]+1;
            l_cur = l >= 0 ? balls[l] : undefined;
            r_cur = r < N ? balls[r] : undefined;
        } else {
            var l_del = l >= 0 ? l-left[l]+1 : 0;
            var r_del = r < N ? right[r]-r+1 : 0;
            if (initial && color === l_cur) {
                l_del++;
                initial = false;
            }
            if (initial && color === r_cur) {
                r_del++;
                initial = false;
            }
            if (l_del < 4 && r_del < 4) break;
            if (l_del >= 4) {
                remain -= l_del;
                l = left[l]-1;
                l_cur = l >= 0 ? balls[l] : undefined;
            }
            if (r_del >= 4) {
                remain -= r_del;
                r = right[r]-1;
                r_cur = r < N ? balls[r] : undefined;
            }
        }
    }
    return remain;
}