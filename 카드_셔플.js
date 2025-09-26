var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
var visited1 = new Map();
var visited2 = new Map();
for (var c = 0; c < T; c++) {
    var [N, A, B] = input[s++].split(' ').map(x => +x);
    var limit = Math.ceil(Math.log2(N)/2);
    bfs(N, A, limit);
    reverse(N, B, limit);
    var min = Infinity;
    var res = undefined;
    var l1 = undefined;
    var l2 = undefined;
    for (var i of visited1.entries()) {
        var [num, dep1] = i;
        if (visited2.has(num)) {
            var len = dep1+visited2.get(num);
            if (len < min) {
                min = len;
                res = num;
                l1 = dep1;
                l2 = visited2.get(num);
            }
        }
    }
    var cnt = 0;
    var left = dfs(A, res, 0, l1, '');
    var right = dfs(res, B, 0, l2, '');
    ans += left+right+'\n';
    visited1.clear();
    visited2.clear();
}
console.log(ans);

// X-셔플
// 1. 카드가 K <= (N+1)/2에 속하는 경우 : 2K-1로 이동 (K)
// 2. 카드가 K > (N+1)/2에 속하는 경우: 2K-N-1로 이동

// Y-셔플
// 1. 카드가 K <= (N-1)/2에 속하는 경우: 2K로 이동
// 2. 카드가 K > (N-1)/2에 속하는 경우: 2K-N으로 이동

// 중간에서 만나기로 O(T*2^(logN/2))으로 해결 가능


function bfs(N, A, limit) {
    var queue = [A];
    var dep = 0;
    visited1.set(A, 0);
    while (queue.length > 0 && dep < limit) {
        var tmp = [];
        for (var i of queue) {
            var cur = i;
            if (cur <= (N+1)/2) {
                var next = cur*2-1;
                if (!visited1.has(next)) {
                    visited1.set(next, dep+1);
                    tmp.push(next);
                }
            } else {
                var next = cur*2-N-1;
                if (!visited1.has(next)) {
                    visited1.set(next, dep+1);
                    tmp.push(next);
                }
            }
            if (cur <= (N-1)/2) {
                var next = cur*2;
                if (!visited1.has(next)) {
                    visited1.set(next, dep+1);
                    tmp.push(next);
                }
            } else {
                var next = cur*2-N;
                if (!visited1.has(next)) {
                    visited1.set(next, dep+1);
                    tmp.push(next);
                }
            }
        }
        queue = tmp;
        dep++;
    }
}

function reverse(N, B, limit) {
    var queue = [B];
    var dep = 0;
    visited2.set(B, 0);
    while (queue.length > 0 && dep < limit) {
        var tmp = [];
        for (var i of queue) {
            var cur = i;
            var next = (cur+1)/2;
            if (Number.isInteger(next) && next <= (N+1)/2) {
                if (!visited2.has(next)) {
                    visited2.set(next, dep+1);
                    tmp.push(next);
                }
            }
            var next = (cur+N+1)/2;
            if (Number.isInteger(next) && next > (N+1)/2) {
                if (!visited2.has(next)) {
                    visited2.set(next, dep+1);
                    tmp.push(next);
                }
            }
            var next = cur/2;
            if (Number.isInteger(next) && next <= (N-1)/2) {
                if (!visited2.has(next)) {
                    visited2.set(next, dep+1);
                    tmp.push(next);
                }
            }
            var next = (cur+N)/2;
            if (Number.isInteger(next) && next > (N-1)/2) {
                if (!visited2.has(next)) {
                    visited2.set(next, dep+1);
                    tmp.push(next);
                }
            }
        }
        queue = tmp;
        dep++;
    }
}

function dfs(cur, goal, dep, limit, log) {
    cnt++;
    if (cur === goal) return log;
    if (dep === limit) return false;
    var v = false;
    if (cur <= (N+1)/2) {
        var next = cur*2-1;
        var k = dfs(next, goal, dep+1, limit, log+'X');
        if (k) v = k;
    } else {
        var next = cur*2-N-1;
        var k = dfs(next, goal, dep+1, limit, log+'X');
        if (k) v = k;
    }
    if (cur <= (N-1)/2) {
        var next = cur*2;
        var k = dfs(next, goal, dep+1, limit, log+'Y');
        if (k) v = k;
    } else {
        var next = cur*2-N;
        var k = dfs(next, goal, dep+1, limit, log+'Y');
        if (k) v = k;
    }
    return v;
}