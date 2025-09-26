var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var K = +input[s++];
var ans = '';
for (var c = 0; c < K; c++) {
    var [n, t, p] = input[s++].split(' ').map(x => +x);
    var len = 0;
    var [lx, ly] = input[s++].split(' ').map(x => +x);
    for (var i = 0; i < n; i++) {
        var [nx, ny] = input[s++].split(' ').map(x => +x);
        lx === nx ? len += Math.abs(ly-ny) : len += Math.abs(lx-nx);
        [lx, ly] = [nx, ny];
    }
    ans += `Data Set ${c+1}:\n${Math.ceil(len*t/p)}\n\n`;
}
console.log(ans.trim());