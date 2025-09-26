var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var N = +input[s++];
var line = [];
var set = new Set();
for (var i = 0; i < N; i++) {
    var [L, R] = input[s++].split(' ').map(x => +x);
    line.push([L, R, i+1]);
    set.add(L);
    set.add(R);
}

var sorted = [...set].sort((a,b) => a-b);
var map = new Map();
for (var i = 0; i < sorted.length; i++) {
    map.set(sorted[i], i);
}

var start = Array.from({length:sorted.length}, _ => []);
for (var i = 0; i < N; i++) {
    var [L, R, num] = line[i];
    L = map.get(L);
    R = map.get(R);
    start[L].push(R);
}

// 현재 위치에서 최대 오른쪽으로 얼마만큼 이동할 수 있는가
var max = Array.from({length:sorted.length}, (v, k) => k);
var recent = 0;
for (var i = 0; i < sorted.length; i++) {
    for (var j = 0; j < start[i].length; j++) {
        var R = start[i][j];
        recent = Math.max(recent, R);
    }
    max[i] = recent;
}

var sparseTable = Array.from({length:19}, _ => Array(sorted.length).fill(undefined));
for (var i = 0; i < 19; i++) {
    for (var j = 0; j < sorted.length; j++) {
        if (i === 0) {
            sparseTable[i][j] = j === max[j] ? undefined : max[j];
        } else {
            sparseTable[i][j] = sparseTable[i-1][sparseTable[i-1][j]];
        }
    }
}

var Q = +input[s++];
var ans = Array(Q);
for (var i = 0; i < Q; i++) {
    var [A, B] = input[s++].split(' ').map(x => +x);
    var [lA, rA] = line[A-1].map(x => map.get(x));
    var [lB, rB] = line[B-1].map(x => map.get(x));
    if (lA >= lB) {
        var tmp = [lA, rA];
        [lA, rA] = [lB, rB];
        [lB, rB] = [...tmp];
    }
    var dist = findDistance(rA, lB);
    dist === Infinity ? ans[i] = -1 : ans[i] = dist;
}
console.log(ans.join('\n'));



function findDistance(recent, goal) {
    if (recent >= goal) return 1;
    var min = Infinity;
    var dist = 0;
    for (var i = 18; i >= 0; i--) {
        if (sparseTable[i][recent] >= goal) {
            min = Math.min(min, dist+(1<<i));
        } else if (sparseTable[i][recent]) {
            recent = sparseTable[i][recent];
            dist += 1<<i;
        }
    }
    return min+1;
}

// -2 1
//  1 4
//  2 7
//  5 10

// 1 4 7 10
// 4 7 10 un
// 7 10 un
// un un