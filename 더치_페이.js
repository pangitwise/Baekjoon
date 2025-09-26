var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, M] = input[s++].split(' ').map(x => +x);
var list = [];
for (var i = 0; i < N; i++) {
    list.push(input[s++].split(' ').map(x => +x));
}
var order = [];
for (var i = 0; i < M; i++) {
    order.push(input[s++].split(' ').map(x => +x));
}

var set = new Set();
for (var i = 0; i < N; i++) {
    var [s, e] = list[i];
    set.add(s)
    set.add(e);
}
for (var i = 0; i < M; i++) {
    var [t, p] = order[i];
    set.add(t);
}
var sorted = [...set].sort((a,b) => a-b);
var map = new Map();
for (var i = 0; i < sorted.length; i++) {
    map.set(sorted[i], i);
}

var T = Array(sorted.length+1).fill(0);
for (var i = 0; i < N; i++) {
    var [s, e] = list[i].map(x => map.get(x));
    T[s]++;
    T[e+1]--;
}
for (var i = 1; i < sorted.length+1; i++) {
    T[i] += T[i-1];
}

var total = 0;
for (var i = 0; i < M; i++) {
    var [t, p] = order[i];
    t = map.get(t);
    if (T[t]) total += p;
}
console.log(total/N);