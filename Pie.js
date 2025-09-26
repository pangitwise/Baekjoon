var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var [N, F] = input[s++].split(' ').map(x => +x);
    var R = input[s++].split(' ').map(x => (+x)**2*Math.PI).sort((a,b) => b-a);
    ans += binarySearch()+'\n';
}
console.log(ans);


function binarySearch() {
    var start = 0;
    var end = 10000**2*Math.PI;
    var max = 0;
    while (start+0.0001 < end) {
        var mid = (start+end)/2;
        if (dividePie(F+1, mid)) {
            max = Math.max(max, mid);
            start = mid;
        } else {
            end = mid;
        }
    }
    return max;
}

function dividePie(limit, r) {
    var cnt = 0;
    for (var i = 0; i < N; i++) {
        cnt += Math.floor(R[i]/r);
        if (cnt >= limit) return true;
    }
    return false;
}