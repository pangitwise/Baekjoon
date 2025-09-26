var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var a = input[1].split(' ').map(x => +x);
var set = new Set();
for (var i of a) set.add(i);
var sorted = [...set].sort((a,b) => a-b);
var map = new Map();
for (var i = 0; i < n; i++) map.set(sorted[i], i);

var list = Array.from({length:sorted.length}, _ => []);
for (var i = 0; i < n; i++) {
    var conv = map.get(a[i]);
    list[conv].push(i);
}
for (var i of list) i.reverse();

var tree = [];
segTree(1, sorted.length, 1);

var cnt = 0;
var isStart = true;
for (var i = 0; i < n; i++) {
    if (isStart) {
        cnt++;
        var ord = map.get(a[i])+1;
        var closestLowNum = ord === 1 ? Infinity : find(1, sorted.length, 1, ord-1, 1);
        isStart = false;
    }
    var ord = map.get(a[i])+1;
    list[ord-1].pop();
    update(1, sorted.length, ord, 1);
    var hasHighNum = find(1, sorted.length, ord, sorted.length, 1);
    if (hasHighNum === Infinity || hasHighNum > closestLowNum) hasHighNum = false;
    if (!hasHighNum) isStart = true;
}
console.log(cnt);


function segTree(start, end, idx) {
    if (start !== end) {
        var mid = (start+end)>>1;
        tree[idx] = Math.min(segTree(start, mid, idx<<1), segTree(mid+1, end, idx<<1|1));
    } else {
        tree[idx] = list[start-1].at(-1);
    }
    return tree[idx];
}

function find(start, end, l, r, idx) {
    if (l <= start && end <= r) {
        return tree[idx];
    } else {
        if (end < l || r < start) return Infinity;
        var mid = (start+end)>>1;
        return Math.min(find(start, mid, l, r, idx<<1), find(mid+1, end, l, r, idx<<1|1));
    }
}

function update(start, end, d, idx) {
    if (d <= start && end <= d) {
        tree[idx] = list[start-1].length > 0 ? list[start-1].at(-1) : Infinity;
    } else {
        if (end < d || d < start) return tree[idx];
        var mid = (start+end)>>1;
        tree[idx] = Math.min(update(start, mid, d, idx<<1), update(mid+1, end, d, idx<<1|1));
    }
    return tree[idx];
}
// 2 3 7 4 2 5 6 4 4 3 2 1 5 7 9 11

// 그리디 + 세그로 풀 수 있을 듯

// 현재 위치를 i라 하자.
// 1. i~n 사이의 값 중 a[i]보다 작은 가장 가까운 값이 존재하는지를 찾는다.
// 2. a[i]를 시작점으로 하는 가장 넓은 유효한 구간을 찾아 지정한다.
// 3. 반복


