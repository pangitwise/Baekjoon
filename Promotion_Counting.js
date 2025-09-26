var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var N = +input[s++];
var p = Array(N+1);
for (var i = 0; i < N; i++) {
    p[i+1] = +input[s++];
}
var graph = Array.from({length:N+1}, _ => []);
for (var i = 2; i <= N; i++) {
    var manager = +input[s++];
    graph[i].push(manager);
    graph[manager].push(i);
}
var list = Array.from({length:N+1}, _ => Array(2));
var visited = Array(N+1).fill(false);
var order = Array(N+1);
var cnt = 1;
ETT(1);

var tree = [];
segTree(1, N, 1);

var ans = '';
for (var i = 1; i <= N; i++) {
    var [lo, hi] = list[i];
    ans += find(1, N, lo, hi, p[i], 1)+'\n';
}
console.log(ans);


function ETT(x) {
    visited[x] = true;
    list[x][0] = cnt;
    order[cnt] = x;
    for (var i of graph[x]) {
        if (!visited[i]) {
            cnt++;
            ETT(i);
        }
    }
    list[x][1] = cnt;
}

function segTree(start, end, idx) {
    if (start !== end) {
        var mid = (start+end)>>1;
        var left = segTree(start, mid, idx<<1);
        var right = segTree(mid+1, end, idx<<1|1);
        var [i, j] = [0, 0];
        var sorted = [];
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                sorted.push(left[i]);
                i++;
            } else {
                sorted.push(right[j]);
                j++;
            }
        }
        while (i < left.length) {
            sorted.push(left[i]);
            i++;
        }
        while (j < right.length) {
            sorted.push(right[j]);
            j++;
        }
        tree[idx] = sorted;
    } else {
        tree[idx] = [p[order[start]]];
    }
    return tree[idx];
}

function find(start, end, lo, hi, p, idx) {
    if (lo <= start && end <= hi) {
        return binarySerach(idx, p);
    } else {
        if (lo > end || hi < start) return 0;
        var mid = (start+end)>>1;
        return find(start, mid, lo, hi, p, idx<<1)+find(mid+1, end, lo, hi, p, idx<<1|1);
    }
}

function binarySerach(idx, p) {
    var start = -1;
    var end = tree[idx].length-1;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        var l = tree[idx][mid];
        var r = tree[idx][mid+1];
        if (l <= p && p < r) {
            return tree[idx].length-mid-1
        } else {
            if (l > p) end = mid;
            if (p >= r) start = mid;
        }
    }
    if (p < tree[idx][end]) return tree[idx].length;
    return 0;
}