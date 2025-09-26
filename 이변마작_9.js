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

Map.prototype.delete = function(x) {
    if (this.has(x)) {
        this.set(x, this.get(x)-1);
    }
}

console.log(binarySearch(N));


function binarySearch(N) {
    var start = -1;
    var end = N+1;
    var min = Infinity;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        if (canbeSuspicious(mid)) {
            min = Math.min(min, mid);
            end = mid;
        } else {
            start = mid;
        }
    }
    if (min === Infinity) return -1;
    return min;
}

function canbeSuspicious(X) {
    map.clear();
    for (var [i, j] = [0, -X]; i < N; i++, j++) {
        map.plus(mazak[i]);
        if (j >= 0) map.delete(mazak[j]);
        if (map.get(mazak[i]) >= 5) return true;
    }
    return false;
}