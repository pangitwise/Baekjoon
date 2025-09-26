var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
for (var i = 0; i < input.length; i++) {
    var [W, N, D, ...div] = input[i].split(' ').map(x => +x);
    if (W === 0) break;
    var unit_angle = 360/N;
    var p = Array(N+1).fill(false);
    for (var j = 0; j < D; j++) {
        var sacred_num = div[j];
        for (var k = sacred_num; k <= N; k += div[j]) {
            p[k] = true;
        }
    }
    var sacred_list = [];
    for (var j = 1; j <= N; j++) {
        if (p[j]) sacred_list.push(j);
    }
    var res = binarySearch(W, N, unit_angle, sacred_list);
    ans += Number(Math.round(res*10)/10).toFixed(1)+'\n';
}
console.log(ans);


function binarySearch(W, N, unit_angle, sacred_list) {
    var start = 2000;
    var end = 2000*Math.PI+2000;
    var min = Infinity;
    while (start+0.0001 < end) {
        var mid = (start+end)/2;
        if (isValidRoute(mid, W, N, unit_angle, sacred_list)) {
            min = Math.min(min, mid);
            end = mid;
        } else {
            start = mid;
        }
    }
    return min;
}


function isValidRoute(limit, W, N, unit_angle, sacred_list) {
    limit -= 2000;
    for (var [i, j] = [0, 0]; j < sacred_list.length; i--, j++) {
        var bol = i === 0 ? true : false;
        i = (i+sacred_list.length)%sacred_list.length;
        var total = 0;
        var cnt = 0;
        var idx = i;
        var lastAngle = undefined;
        var recentLen = -1;
        while (cnt < W && total < sacred_list.length) {
            if (recentLen === -1) {
                total++;
                recentLen = 0;
                lastAngle = sacred_list[idx];
                idx++;
                idx %= sacred_list.length;
            } else {
                var ceta = sacred_list[idx] >= lastAngle ? sacred_list[idx]-lastAngle : sacred_list[idx]+(N-lastAngle);
                ceta *= unit_angle;
                if (ceta > 180) ceta -= 180;
                ceta = ceta*Math.PI/360;
                var chord = 2000*Math.sin(ceta);
                if (recentLen + chord <= limit) {
                    if (!bol && idx === 0) bol = true;
                    recentLen += chord;
                    total++;
                    lastAngle = sacred_list[idx];
                    idx++;
                    idx %= sacred_list.length;
                } else {
                    if (!bol) return false;
                    recentLen = -1;
                    cnt++;
                    lastAngle = undefined;
                }
            }
        }
        if (total == sacred_list.length) return true;
    }
    return false;
}
// 현의 길이 = 2r*sin(ceta/2)