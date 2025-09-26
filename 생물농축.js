var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var N = +input[s++];
var C = Array(N+1);
var H = Array(N+1);
var E = Array(N+1);
var heavy_metal = Array(N+1).fill(0);
for (var i = 1; i < N+1; i++) {
    var [c, h, e] = input[s++].split(' ').map(x => +x);
    C[i] = c;
    H[i] = h;
    E[i] = e;
    if (c === 0) heavy_metal[i] = h;
}
var inDegree = Array(N+1).fill(0);
var graph = Array.from({length:N+1}, _ => []);
var reverse = Array.from({length:N+1}, _ => []);
var extinct = Array(N+1).fill(false);
var M = +input[s++];
for (var i = 0; i < M; i++) {
    var [a, b] = input[s++].split(' ').map(x => +x);
    graph[a].push(b);
    reverse[b].push(a);
    inDegree[b]++;
}

var queue = [];
for (var i = 1; i < N+1; i++) {
    if (!inDegree[i]) queue.push(i);
}
while (queue.length > 0) {
    var tmp = [];
    for (var i of queue) {
        for (var j of graph[i]) {
            inDegree[j]--;
            if (!inDegree[j]) tmp.push(j);
        }
        if (C[i] === 0) continue;
        var hm_accumul = getHeavyMetalExposure(i, reverse);
        if (hm_accumul === -1) {
            extinct[i] = true;
        } else {
            heavy_metal[i] = hm_accumul;
        }
    }
    queue = tmp;
}
if (extinct[N]) {
    console.log('no');
} else {
    console.log('yes');
    console.log(heavy_metal[N]);
}


function getHeavyMetalExposure(life, food) {
    var canEat = [];
    for (var i of food[life]) {
        if (!extinct[i]) canEat.push(i);
    }
    if (canEat.length === 0) return -1;
    var [c, h] = [C[life], H[life]];
    var dp = Array(c+1).fill(Infinity);
    dp[0] = 0;
    for (var i = 0; i < c; i++) {
        for (var j of canEat) {
            var kcal = E[j];
            dp[Math.min(c, i+kcal)] = Math.min(dp[Math.min(c, i+kcal)], dp[i]+heavy_metal[j]);
        }
    }
    if (dp[c] > h) return -1;
    return dp[c];
}