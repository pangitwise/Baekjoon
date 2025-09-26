var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var t = +input[s++];
var ans = '';

var sign = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [-1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1], [-1, -1, -1]];

for (var z = 0; z < t; z++) {
    var n = +input[s++];
    var univercities = [];
    for (var i = 0; i < n; i++) {
        var arr = input[s++].split(' ').map(x => +x);
        univercities.push(arr);
    }
    var top = Array(n).fill(false);
    var linear = true;
    var vectorList = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [-1, 0, 0], [0, -1, 0], [0, 0, -1]];
    for (var i = 0; i < n; i++) {
        var [a1, b1, c1] = univercities[i];
        var vect = nomalizationVector(...univercities[i]);
        if (vect) vectorList.push(vect);
        for (var j = i+1; j < n; j++) {
            var [a2, b2, c2] = univercities[j];
            for (var k = j+1; k < n; k++) {
                var [a3, b3, c3] = univercities[k];
                var vector1 = [a1-a3, b1-b3, c1-c3];
                var vector2 = [a2-a3, b2-b3, c2-c3];
                var thisVect = nomalizationVector(...outerProduct(vector1, vector2));
                if (thisVect) {
                    linear = false;
                    vectorList.push(thisVect);
                }
            }
        }
    }
    for (var i = 0; i < vectorList.length; i++) {
        var [px, py, pz] = vectorList[i];
        for (var j = 0; j < 8; j++) {
            var [_px, _py, _pz] = [px, py, pz].map((v, idx) => v*sign[j][idx]);
            var max = -Infinity;
            var topNum = [];
            for (var k = 0; k < n; k++) {
                var [R, T, S] = univercities[k];
                var v = _px*R+_py*T+_pz*S;
                if (v > max) {
                    max = v;
                    topNum = [k];
                } else if (v === max) {
                    topNum.push(k);
                }
            }
            if (topNum) {
                for (var k of topNum) {
                    top[k] = true;
                }
            }
        }
    }
    var res = '';
    for (var i of top) {
        i || linear ? res += 'T' : res += 'F';
    }
    ans += res+'\n';
}
console.log(ans);


function nomalizationVector(a, b, c) {
    var denom = Math.sqrt(a**2+b**2+c**2);
    if (denom === 0) return false;
    return [a/denom, b/denom, c/denom];
}

function outerProduct(vector1, vector2) {
    var [a1, b1, c1] = vector1;
    var [a2, b2, c2] = vector2;
    return [b1*c2-c1*b2, c1*a2-a1*c2, a1*b2-b1*a2];
}