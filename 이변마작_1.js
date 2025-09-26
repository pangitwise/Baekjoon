var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var mazak = input[1].trim().split(' ');
var map = new Map();

Map.prototype.plus = function(x) {
    if (this.has(x)) {
        this.set(x, this.get(x)+1);
    } else {
        this.set(x, 1);
    }
}

var bol = false;
for (var i = 0; i < N; i++) {
    map.plus(mazak[i]);
    if (map.get(mazak[i]) >= 5) {
        bol = true;
        break;
    }
}
if (bol) {
    console.log(i+1);
} else {
    console.log(0);
}