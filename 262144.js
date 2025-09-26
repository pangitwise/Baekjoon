var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var L = [];
var max = 0;
for (var i = 1; i < N+1; i++) {
    var num = +input[i];
    max = Math.max(max, num);
    L.push(num);
}
var loc = Array.from({length:41}, _ => []);
for (var i = 0; i < N; i++) {
    var num = L[i];
    loc[num].push(i);
}
var queue = new Map();
// i = 슬라임의 목표 크기
for (var i = 1; i <= 60; i++) {
    if (i <= 41) {
        for (var j of loc[i-1]) queue.set(j, j+1);
    }
    var tmp = new Map();
    for (var j of queue.keys()) {
        var inital_size = L[j];
        if (inital_size < i) {
            if (queue.has(j)) {
                var next = queue.get(j);
                if (queue.has(next)) {
                    var next_next = queue.get(next);
                    tmp.set(j, next_next);
                }
            }
        }
    }
    if (i >= 41 && tmp.length === 0) break;
    if (tmp.size > 0) {
        max = Math.max(max, i);
    }
    queue = tmp;
}
console.log(max);