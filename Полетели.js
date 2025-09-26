var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var h = input[1].split(' ').map(x => +x);
var a = input[2].split(' ').map(x => +x);

var update = Array(1000001).fill(0);
var init = 0n;
for (var i = 0; i < n; i++) {
    var _h = h[i];
    update[_h] += a[i];
    init += BigInt((_h-1)*a[i]);
}
var [min, rec] = [init, init];
var num = 1;
var la = 0;
var ra = update.reduce((pre, cur) => pre+cur);
for (var i = 1; i < 1000001; i++) {
    if (rec < min) {
        min = rec;
        num = i;
    }
    la += update[i];
    ra -= update[i];
    rec += BigInt(la);
    rec -= BigInt(ra);
}
var ans = [num, min].join(' ');
console.log(ans);