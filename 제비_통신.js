var input = require('fs').readFileSync(0).toString().trim().split('\n');

Map.prototype.plus = function(x) {
    if (!this.has(x)) {
        this.set(x, 1);
    } else {
        this.set(x, this.get(x)+1);
    }
}

var s = 0;
var [N, M] = input[s++].split(' ').map(x => +x);
var slope = input[s++].split(' ').map(x => +x);
var kinds = Array.from({length:M}, _ => new Map());
// y = ax +b
// y-ax = b
for (var i = 0; i < N; i++) {
    var [x, y] = input[s++].split(' ').map(x => +x);
    for (var j = 0; j < M; j++) {
        var a = slope[j];
        var y_itc = y-a*x;
        kinds[j].plus(y_itc);
    }
}
var ans = 0;
for (var i = 0; i < M; i++) {
    for (var j of kinds[i].values()) {
        if (j > 0) ans += j*(j-1);
    } 
}
console.log(ans);