var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var map = new Map();

Map.prototype.plus = function(x) {
    if (this.has(x)) {
        this.set(x, this.get(x)+1);
    } else {
        this.set(x, 1);
    }
}

for (var i = 1; i < n+1; i++) {
    var [a, pal] = input[i].trim().split(' ');
    map.plus(pal);
}
var total = 0;
for (var S of map.keys()) {
    var S2 = ['#'];
    for (var i = 0; i < S.length; i++) {
        S2.push(S[i]);
        S2.push('#');
    }
    var odd = manacher(S);
    var even = manacher(S2);
    var value = map.get(S);
    total += findPair(S, S2, S, value, odd);
    total += findPair(S2, S, S, value, even);
}
console.log(total);


function manacher(S) {
    var L = S.length;
    var mana = Array(L).fill(1);
    var R = 0;
    var center = 0;
    for (var i = 1; i < L; i++) {
        var _i = center-(i-center);
        if (i < R && i+mana[_i] <= R) {
            mana[i] = mana[_i];
        } else {
            var j = 1;
            if (i < R) {
                var d = R-i;
                mana[i] += d;
                j += d;   
            }
            while (S[i+j] && S[i+j] === S[i-j]) {
                mana[i]++;
                j++;
            }
            R = i+mana[i]-1;
            center = i;
        }
    }
    return mana;
}

function findPair(S, _S, origin, value, mana) {
    var pairCnt = 0;
    var mid = S.length&1 ? Math.floor(S.length/2) : Math.floor(S.length/2)-1
    var half = '';
    var cnt = 0;
    var j = S.length-1;
    for (var i = mid; i >= 0; i--) {
        if (S[0] === '#' && S[i] !== '#') continue;
        if (mana[i] === i+1) {
            var remain = S.length-((mana[i]-1)*2+1);
            while (cnt < remain) {
                if (S[j] !== '#') half += S[j];
                cnt++;
                j--;
            }
            if (map.has(half)) {
                var halfNum = map.get(half);
                pairCnt += value*halfNum;
                if (origin !== half) pairCnt += value*halfNum;
            }
        }
    }
    return pairCnt;
}