const { hostname } = require('os');

var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
// 최대 맨해튼 거리 구하는 법 응용
var [N, Q] = input[s++].split(' ').map(x => +x);
var houses = Array(N);
for (var i = 0; i < N; i++) {
    houses[i] = input[s++].split(' ').map(x => +x);
}
var parkings = Array(Q);
for (var i = 0; i < Q; i++) {
    parkings[i] = input[s++].split(' ').map(x => +x);
}
var bitSet = Array.from({length:2**11}, _ => [Infinity, -Infinity]);

for (var i = 0; i < N; i++) {
    backTracking(houses, i, 'house', 0, 0, 0);
}

var ans = Array(Q);
for (var i = 0; i < Q; i++) {
    ans[i] = backTracking(parkings, i, 'parking', 0, 0, 0);
}
console.log(ans.join('\n'));


function backTracking(arr, idx, type, val, rec, dep) {
    // 초기값 설정
    if (rec === 0) {
        for (var i = 0; i < 11; i++) {
            val -= arr[idx][i];
        }
    }
    var max = 0;
    for (var i = dep; i < 11; i++) {
        max = Math.max(max, backTracking(arr, idx, type, val+arr[idx][i]*2, rec+(1<<i), i+1));
    }
    if (type === 'house') {
        bitSet[rec][0] = Math.min(bitSet[rec][0], val);
        bitSet[rec][1] = Math.max(bitSet[rec][1], val);
        return -1;
    } else if (type === 'parking') {
        return Math.max(max, Math.abs(bitSet[rec][0]-val), Math.abs(bitSet[rec][1]-val));
    }
}

// x1 > x2 && y1 > y2
// dist = x1-x2 + y1 -y2 = (x1+y1) - (x2+y2)


// (3, -8, -9) (-7, 5, -3)
// max = 29

// (7, 2) (-5, 4) = 14
 // (x1-x2) + (y2-y1)
 // (x1-y1) - (x2-y2)

 // 합: 9 차: 5
 // 합: -1 차: -9
 
 // (5, 8) (4, 2)
 // 합: 13 차: -3
 // 합: 6  차: 2

 // -1 6 9 13 
 // 차 -9 -3 2 5


(7)

// x1+y1 = -5
// x2+y2 = -2
// x1-y1 = 11
// y1-y2 = -12

// (2, 2) (3, -8)  = 11-4 = 7


// x1 > x2 y1 > y2 z1 > z2
// = (x1-x2) + (y1-y2) + (z1-z2)
// = (x1+y1+z1) - (x2+y2+z2)
