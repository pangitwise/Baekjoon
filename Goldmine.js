var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [s, w] = input[0].split(' ').map(x => +x);
var N = +input[1];
var axe_x = Array.from({length:60002}, _ => []);
for (var i = 2; i < N+2; i++) {
    var [x, y] = input[i].split(' ').map(x => +x + 30001);
    axe_x[x].push(y);
}
var tree = [];
var lazy = [];
segTree(1, 70001, 1);

for (var i = 1; i <= s+1; i++) {
    for (var j of axe_x[i]) {
        update(1, 70001, j, Math.min(70001, j+w), 1, 0, 1);
    }
}
var ans = tree[1];
for (var [i, j] = [1, s+2]; j <= 60001; i++, j++) {
    ans = Math.max(ans, tree[1]);
    for (var k of axe_x[i]) {
        update(1, 70001, k, k+w, -1, 0, 1);
    }
    for (var k of axe_x[j]) {
        update(1, 70001, k, k+w, 1, 0, 1);
    }
}
ans = Math.max(ans, tree[1]);
console.log(ans);


function segTree(start, end, idx) {
    if (start !== end) {
        var mid = (start+end)>>1;
        tree[idx] = Math.max(segTree(start, mid, idx<<1), segTree(mid+1, end, idx<<1|1));
        lazy[idx] = 0;
    } else {
        tree[idx] = 0;
        lazy[idx] = 0;
    }
    return tree[idx];
}

function update(start, end, l, r, d, lazySum, idx) {
    if (l <= start && end <= r) {
        tree[idx] += d+lazySum;
        lazy[idx] += d+lazySum;
        return tree[idx];
    } else {
        if (l > end || r < start) {
            tree[idx] += lazySum;
            lazy[idx] += lazySum;
            return tree[idx];
        }
        var mid = (start+end)>>1;
        var left = update(start, mid, l, r, d, lazySum+lazy[idx], idx<<1);
        var right = update(mid+1, end, l, r, d, lazySum+lazy[idx], idx<<1|1);
        lazy[idx] = 0;
        tree[idx] = Math.max(left, right);
        return tree[idx];
    }
}