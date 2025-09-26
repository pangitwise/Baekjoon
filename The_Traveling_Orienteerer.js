var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var n = +input[s++];
var cp = [];
for (var i = 0; i < n; i++) {
    cp.push(input[s++].split(' ').map(x => +x));
}
var m = +input[s++];
var ans = '';
for (var i = 0; i < m; i++) {
    var p = +input[s++];
    var route = input[s++].trim().split(' ').map(x => +x);
    var dist = 0;
    for (var j = 1; j < p; j++) {
        var [l, r] = [route[j-1], route[j]];
        var [x1, y1] = cp[l];
        var [x2, y2] = cp[r];
        dist += Math.sqrt((x1-x2)**2+(y1-y2)**2);
    }
    ans += Math.round(dist)+'\n';
}
console.log(ans);