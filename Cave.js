var input = require('fs').readFileSync(0).toString().trim().split('\n');
// 가장 높이가 낮은 곳부터 보면서 분리 집합으로 관리
// 합집합 내 가장 낮은 천장의 높이를 h라 할 때, h까지 물을 채울 수 있음
var w = 0;
var Z = +input[w++];
var ans = '';

var MAX_SIZE = 10**6;
var list = Array(MAX_SIZE);
var size = Array(MAX_SIZE);
var min_ceil = Array(MAX_SIZE);
var le_ri = Array.from({length:MAX_SIZE}, (v, k) => [k, k]);
var recent_h = Array(MAX_SIZE);
var visited = Array(MAX_SIZE);
var sorted = Array.from({length:MAX_SIZE}, (v, k) => k);

for (var c = 0; c < Z; c++) {
    var n = +input[w++];
    var p = input[w++].split(' ').map(x => +x);
    var s = input[w++].split(' ').map(x => +x);
    sorted.sort(function(a,b) {
        if (a >= n && b >= n) return 0;
        if (a >= n && b < n) return 1;
        if (a < n && b >= n) return -1;
        if (a < n && b < n) {
            return p[a]-p[b];
        }
    });
    for (var i = 0; i < n; i++) {
        list[i] = i;
        size[i] = 1;
        min_ceil[i] = s[i];
        le_ri[i].fill(i);
        recent_h[i] = p[i];
        visited[i] = false;
    }
    var pond_area = 0;
    // 물이 고일 수 있기 위해서는
    // 1. 주어진 바닥 높이 h의 양옆의 끝을 이루는 바닥이 h보다 높아야 한다.
    // 2. 또는 주어진 바닥 높이 h의 양옆의 끝을 이루는 바닥이 h보다 작거나 같을 경우, 최소 천장의 높이가 h보다 커야 한다.
    for (var i = 0; i < n; i++) {
        var j = sorted[i];
        if (visited[j]) continue; // 이미 합병된 지점은 생략
        var idx = find(j);
        visited[j] = true;
        var [l, r] = le_ri[idx];
        var h = recent_h[idx];
        while ((l > 0 && union(idx, l-1)) || (r < n-1 && union(idx, r+1))) {
            [l, r] = le_ri[find(idx)];
        }
        idx = find(idx);
        // 왼쪽 끝의 바닥, 오른쪽 끝의, 바닥, 최소 천장 높이 중 최솟값까지만 물을 채울 수 있다
        var left_h = l === 0 ? Infinity : p[l-1];
        var right_h = r === n-1 ? Infinity : p[r+1];
        var limit = Math.min(left_h, right_h, min_ceil[idx]);
        if (recent_h[idx] < limit) {
            pond_area += (r-l+1)*(limit-recent_h[idx]);
            recent_h[idx] = limit;
        }
    }
    ans += pond_area+'\n';
}
console.log(ans);


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
        // 수면 또는 바닥면의 높이가 같아야 합칠 수 있음
        if (recent_h[root_a] === recent_h[root_b]) {
            if (size[root_a] >= size[root_b]) {
                harmony(root_a, root_b);
            } else {
                harmony(root_b, root_a);
            }
            visited[a] = true;
            visited[b] = true;
            return true;
        }
    }
    return false;
}

function harmony(big, small) {
    list[small] = big;
    size[big] += size[small];
    min_ceil[big] = Math.min(min_ceil[big], min_ceil[small]);
    le_ri[big][0] = Math.min(le_ri[big][0], le_ri[small][0]);
    le_ri[big][1] = Math.max(le_ri[big][1], le_ri[small][1]);
    size[small] = -1;
}