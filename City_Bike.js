var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, d, c] = input[0].split(' ').map(x => +x);
var initial = Array(n);
for (var i = 1; i < n+1; i++) {
    initial[i-1] = +input[i];
}
var lo = binarySearch1();
var hi = binarySearch2();
console.log(Math.max(0, hi-lo))

function binarySearch1() {
    var start = -1;
    var end = d+1;
    var res = 0;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        if (relocating1(mid)) {
            res = Math.max(res, mid);
            start = mid;
        } else {
            end = mid;
        }
    }
    return res;
}

function relocating1(mid) {
    var recent = c;
    for (var i = 0; i < n; i++) {
        if (initial[i] < mid) {
            recent -= mid-initial[i];
            if (recent < 0) {
                return false;
            }
        } else {
            recent += Math.min(initial[i]-mid, c-recent);
        }
    }
    return true;
}

function binarySearch2() {
    var start = -1;
    var end = d+1;
    var res = d;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        if (relocating2(mid)) {
            res = Math.min(res, mid);
            end = mid;
        } else {
            start = mid;
        }
    }
    return res;
}

function relocating2(mid) {
    var recent = 0;
    for (var i = 0; i < n; i++) {
        if (initial[i] > mid) {
            recent += initial[i]-mid;
            if (recent > c) {
                return false;
            }
        } else {
            recent -= Math.min(mid-initial[i], recent);
        }
    }
    return true;
}
