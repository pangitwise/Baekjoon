var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var cards = new Set();
for (var i = 1; i < N+1; i++) {
    cards.add(+input[i]);
}
cards = [...cards];
cards.sort((a,b) => a-b);
if (cards[0] === 1) {
    console.log(0);
} else {
    N = cards.length;
    var max = cards.at(-1); // P의 최댓값
    var valid = Array(max+1).fill(false); // 카드에 적힌 수의 순번 찾기
    var dist = Array(max+1).fill(Infinity); // 다음 수까지 거리
    for (var i = 0; i < N; i++) valid[cards[i]] = i;
    var cur = Infinity;
    for (var i = max; i >= 1; i--, cur++) {
        dist[i] = cur;
        if (valid[i] !== false) cur = 0;
    }
    var list = Array.from({length:N}, (v, k) => k);
    var size = Array(N).fill(1);
    var edges = [];
    var min = cards[0];
    for (var i = 0; i < N; i++) {
        var p = cards[i];
        for (var j = p; j <= max;) {
            var d = dist[j];
            if (valid[j] !== false) edges.push([i, valid[j], 0]);
            if (d < p) {
                var next = j+d;
                if (d < min) edges.push([i, valid[next], d]);
                j += p;
            } else {
                j += d;
                var r = j%p;
                j -= r;
            }
        }
    }
    var ans = 0;
    edges.sort((a,b) => a[2]-b[2]);
    for (var i = 0; i < edges.length; i++) {
        var [a, b, w] = edges[i];
        if (union(a, b)) {
            ans += w;
        }
    }
    console.log(ans);
}


function find(x) {
    if (x === list[x]) {
        return x;
    } else {
        list[x] = find(list[x]);
        return list[x];
    }
}

function union(a, b) {
    var root_a = find(a);
    var root_b = find(b);
    if (root_a !== root_b) {
        if (size[root_a] >= size[root_b]) {
            harmony(root_a, root_b);
        } else {
            harmony(root_b, root_a);
        }
        return true;
    }
    return false;
}

function harmony(big, small) {
    list[small] = big;
    size[big] += size[small];
    size[small] = -1;
}
// 2 4 6 8 10
// 3 6 9
// 6
// 11
// card에 적힌 값인 경우, zero 위치 고려
// 오른쪽 스위핑 / 왼쪽 스위핑...
// 이걸 그냥 간선으로 처리해서 프림 알고리즘 대신 크루스칼로?

// 카드에 인접하는 수가 중요하므로... 각 카드에 적힌 수를 P라고 하면,
// 오른쪽 간선 P개, 왼쪽 간선 P개, 영거리 간선 최대 2^N개.

// 0-7
//  -9
//  -15
//  -19
//  1-8
//    3
//  5
//  17
//  16-4
//  2
//  6
// []