var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, m] = input[0].split(' ').map(x => +x);
var edge = [];
for (var i = 1; i < m+1; i++) {
    edge.push(input[i].split(' ').map(x => +x));
}
var [a, b] = input[m+1].split(' ').map(x => +x);
var graph = Array.from({length:n+1}, _ => []);
console.log(binarySearch(a, b));


function binarySearch(a, b) {
    var start = -1;
    var end = m+1;
    var min = Infinity;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        if (has5path(mid, a, b)) {
            min = Math.min(mid, min);
            end = mid;
        } else {
            start = mid;
        }
    }
    if (min === Infinity) return -1;
    return min;
}

function has5path(edgeNum, a, b) {
    for (var i = 0; i < n+1; i++) graph[i] = [];
    for (var i = 0; i < edgeNum; i++) {
        var [u, v] = edge[i];
        graph[u].push(v);
        graph[v].push(u);
    }
    var a1 = [];
    var b1 = [];
    var a2 = new Map();
    var b2 = new Map();
    for (var i of graph[a]) {
        if (i !== b) a1.push(i);
    }
    for (var i of graph[b]) {
        if (i !== a) b1.push(i);
    }
    for (var i = 0; i < a1.length; i++) {
        var v = a1[i];
        for (var j of graph[v]) {
            if (j !== a && j !== b) {
                if (!a2.has(j)) a2.set(j, new Set());
                a2.get(j).add(v);
            }
        }
    }
    for (var i = 0; i < b1.length; i++) {
        var v = b1[i];
        for (var j of graph[v]) {
            if (j !== a && j !== b) {
                if (!b2.has(j)) b2.set(j, new Set());
                b2.get(j).add(v);
            }
        }
    }
    for (var i of a2.keys()) {
        var a1s = a2.get(i);
        for (var j of graph[i]) {
            if (j === a || j === b) continue;
            // b1s에서 i를 제외하고 a1s에서 j를 제외했을 때, a1s와 b1s가 동일하면 거짓이다.
            if (b2.has(j)) {
                var bol1 = false;
                var bol2 = false;
                if (b2.get(j).has(i)) {
                    b2.get(j).delete(i);
                    bol1 = true;
                }
                if (a1s.has(j)) {
                    a1s.delete(j);
                    bol2 = true;
                }
                if (b2.get(j).size > 0) {
                    for (var k of a1s) {
                        if (!b2.get(j).has(k)) {
                            return true;
                        }
                    }
                }
                if (b2.get(j).size > a1s.size && a1s.size > 0) return true;
                if (bol1) b2.get(j).add(i);
                if (bol2) a1s.add(j);
            }
        }
    }
    return false;
}

// 1 - 2 - 3  - 4 - 2
// 1 - 4 - 3
// 

// 3: 2 4 6
// 4: 2 4 6 10

// 3: 2 4 6 10
// 4: 2 4 5

// 3: 2 4
// 4: 2