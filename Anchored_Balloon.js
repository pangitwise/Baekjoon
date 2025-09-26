var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
var s = 0;
for (var i = 0; i < input.length; i++) {
    var N = +input[s++];
    if (N === 0) break;
    var rope = [];
    for (var j = 0; j < N; j++) {
        rope.push(input[s++].split(' ').map(x => +x));
    }
    var maxH = Math.max(ternarySearch_2D(0, 90, 0, 100), ternarySearch_2D(90, 180, -100, 0), ternarySearch_2D(180, 270, -100, 0), ternarySearch_2D(270, 360, 0, 100));
    ans += maxH+'\n';
}
console.log(ans);


function ternarySearch(slope, start, end) {
    var lx = start;
    var rx = end;
    while (lx+0.000000001 < rx) {
        var ml_x = lx+(rx-lx)/3;
        var mr_x = lx+(rx-lx)*2/3
        if (slope === Infinity) {
            var [ml_d, mr_d] = [maxHeight(0, ml_x), maxHeight(0, mr_x)];
        } else {
            var [ml_d, mr_d] = [maxHeight(ml_x, linear(slope, ml_x)), maxHeight(mr_x, linear(slope, mr_x))];
        }
        if (ml_d <= mr_d) {
            lx = ml_x;
        } else {
            rx = mr_x;
        }
    }
    return [lx, ml_d];
}

function ternarySearch_2D(la, ra, start, end) {
    while (la+0.000000001 < ra) {
        var ml_a = la+(ra-la)/3;
        var mr_a = la+(ra-la)*2/3;
        var ml_slope = getTanFromDegrees(ml_a);
        var mr_slope = getTanFromDegrees(mr_a);
        var [, ml_d] = ternarySearch(ml_slope, start, end);
        var [, mr_d] = ternarySearch(mr_slope, start, end);
        if (ml_d <= mr_d) {
            la = ml_a;
        } else {
            ra = mr_a;
        }
    }
    return Math.sqrt(ml_d);
}

function maxHeight(x, y) {
    var h = Infinity;
    for (var i = 0; i < N; i++) {
        var [px, py, l] = rope[i];
        var d = (px-x)**2+(py-y)**2;
        h = Math.min(h, l**2-d);
    }
    return h;
}

function linear(slope, x) {
    return slope*x;
}

function getTanFromDegrees(degrees) {
    return Math.tan((degrees * Math.PI) / 180);
}