var input = require('fs').readFileSync(0).toString().trim().split('\n');
var t = +input[0];
var ans = '';
for (var c = 1; c < t+1; c++) {
    var [x, l, r, k] = input[c].split(' ').map((v, idx) => idx > 0 ? +v : v);
    var cnt = 0;
    for (var i = 1; i <= x.length; i++) {
        var start = BigInt(x.slice(0, i))
        var len = i;
        if (String(start).length === len) {
            backTracking(start, i, 1);
        }
    }
    ans += cnt+'\n';
}
console.log(ans);


function backTracking(recent, pointer, dep) {
    if (dep === k) {
        if (pointer === x.length) {
            cnt++;
        }
        return;
    }
    var i = 1;
    while (pointer+i <= x.length) {
        var next = BigInt(x.slice(pointer, pointer+i));
        var len = i;
        var d = recent-next;
        if (d < 0) d *= -1n;
        if (l <= d && d <= r && String(next).length === len) {
            backTracking(next, pointer+i, dep+1);
        }
        i++;
    }
}