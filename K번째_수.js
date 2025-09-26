var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, m] = input[0].split(' ').map(x => +x);
var a = input[1].split(' ').map(x => +x);
var tree = [];
segTree(1, n, 1);

var ans = '';
for (var s = 2; s < m+2; s++) {
    var [i, j, k] = input[s].split(' ').map(x => +x);
    var list = [];
    findDfS(1, n, i, j, 1);
    for (var t = 0; t < list.length; t++) {
        var res = binarySearch(tree[list[t]], k, t);
        if (res) break;
    }
    ans += res+'\n';
}
console.log(ans);


function segTree(start, end, idx) {
    if (start !== end) {
        var mid = (start+end)>>1;
        var left = segTree(start, mid, idx<<1);
        var right = segTree(mid+1, end, idx<<1|1);
        var [i, j] = [0, 0];
        var sorted = [];
        while (i < left.length && j < right.length) {
            left[i] < right[j] ? sorted.push(left[i]) : sorted.push(right[j]);
            left[i] < right[j] ? i++ : j++;
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
        tree[idx] = [a[start-1]];
    }
    return tree[idx];
}

function findDfS(start, end, lo, hi, idx) {
    if (lo <= start && end <= hi) {
        list.push(idx);
    } else {
        if (lo > end || hi < start) return;
        var mid = (start+end)>>1;
        findDfS(start, mid, lo, hi, idx<<1);
        findDfS(mid+1, end, lo, hi, idx<<1|1);
    }
}

function binarySearch(arr, k, t) {
    if (!arr) return false;
    var start = -1;
    var end = arr.length;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        var loc = mid+1;
        for (var i = 0; i < list.length; i++) {
            if (i === t) continue;
            loc += subBinarySearch(tree[list[i]], arr[mid]);
        }
        if (loc === k) {
            return arr[mid];
        } else {
            if (loc > k) end = mid;
            if (loc < k) start = mid;
        }
    }
    return false;
}

function subBinarySearch(arr, v) {
    var start = -1;
    var end = arr.length-1;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        var l = arr[mid];
        var r = arr[mid+1];
        if (l < v && v < r) {
            return mid+1;
        } else {
            if (l >= v) end = mid;
            if (v >= r) start = mid;
        }
    }
    if (v < arr[end]) {
        return 0;
    } else {
        return arr.length;
    }
}