// 미리 전체 트리 구조를 받고 ETT 기록
// 각 깊이마다 직원들의 위치 배열과 세그먼트 트리를 만듦
// 실제 부하직원이 트리에 추가될 때마다 각 깊이의 세그먼트 트리의 해당 값을 1 증가
// 쿼리가 들어올 때마다 ETT+이분탐색으로 범위를 확인하고 세그먼트 트리로 해당 직원의 수를 구함
var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var MAX_NUM = 100001;
var n = +input[s++];
var Q = Array(n);
var graph = Array.from({length:MAX_NUM}, _ => []);
for (var i = 0; i < n; i++) {
    var [a, b, c] = input[s++].trim().split(' ');
    b = +b; c = +c;
    Q[i] = [a, b, c];
    // 트리 그래프 만들기
    if (a === 'Z') {
        graph[b].push(c);
        graph[c].push(b);
    }
}
// ETT + 깊이 세그 만들기
var [info, ord] = ETT(graph);
var depSeg = Array(ord.length);
for (var i = 0; i < ord.length; i++) {
    var len = ord[i].length-1;
    depSeg[i] = makeSeg(len);
}
// 쿼리 수행
var ans = '';
for (var i = 0 ; i < n; i++) {
    var [a, b, c] = Q[i];
    if (a === 'Z') {
        var [p, s] = [b, c];
        var [srt, end, dep, loc] = info[p];
        var len = ord[dep].length-1;
        changeDfs(depSeg[dep], 1, len, loc, loc, 1, 1);
    } else if (a === 'P') {
        var [q, k] = [b, c];
        var [srt, end, dep, loc] = info[q];
        var subDep = dep+k+1;
        var tmp = 0;
        if (ord[subDep]) {
            var [l, r] = [binarySearch_le(ord[subDep], srt), binarySearch_ri(ord[subDep], end)];
            var len = ord[subDep].length-1;
            tmp = findDfs(depSeg[subDep], 1, len, l, r, 1);
        }
        ans += `${tmp}\n`;
    }
}
console.log(ans);


function ETT(graph) {
    var visited = Array(n+1).fill(false);
    var info = Array.from({length:MAX_NUM}, _ => [0, 0, 0, 0]); // ETT의 시작, ETT의 끝, 깊이, 깊이 배열에서의 위치
    var cnt = 1;
    var ord = [];
    var dep = 0;
    dfs(1);
    return [info, ord];

    function dfs(node) {
        visited[node] = true;
        if (!ord[dep]) ord[dep] = [-1];
        ord[dep].push(cnt);
        info[node][0] = cnt; // 시작
        info[node][2] = dep; // 깊이
        info[node][3] = ord[dep].length-1; // 깊이 배열에서의 위치
        for (var i of graph[node]) {
            if (!visited[i]) {
                cnt++;
                dep++;
                dfs(i);
            }
        }
        info[node][1] = cnt; // 끝
        dep--;
    }
}

function makeSeg(size) {
    var tree = [];
    seg(1, size, 1);
    return tree;

    function seg(start, end, idx) {
        if (start !== end) {
            var mid = (start+end)>>1;
            tree[idx] = seg(start, mid, idx<<1)+seg(mid+1, end, idx<<1|1);
        } else {
            tree[idx] = 0;
        }
        return tree[idx];
    }
}

function changeDfs(tree, start, end, l, r, d, idx) {
    if (l <= start && end <= r) {
        tree[idx] += d;
    } else {
        if (l > end || r < start) return tree[idx];
        var mid = (start+end)>>1;
        tree[idx] = changeDfs(tree, start, mid, l, r, d, idx<<1)+changeDfs(tree, mid+1, end, l, r, d, idx<<1|1);
    }
    return tree[idx];
}

function findDfs(tree, start, end, l, r, idx) {
    if (l <= start && end <= r) {
        return tree[idx];
    } else {
        if (l > end || r < start) return 0;
        var mid = (start+end)>>1;
        return findDfs(tree, start, mid, l, r, idx<<1)+findDfs(tree, mid+1, end, l, r, idx<<1|1);
    }
}

function binarySearch_le(arr, goal) {
    var srt = -1;
    var end = arr.length-1;
    while (srt+1 < end) {
        var mid = (srt+end)>>1;
        if (arr[mid] < goal && goal <= arr[mid+1]) {
            return mid+1;
        } else {
            if (arr[mid] >= goal) end = mid;
            if (goal > arr[mid+1]) srt = mid;
        }
    }
    var last = arr.at(-1);
    if (last < goal) return end+1;
    return end;
}

function binarySearch_ri(arr, goal) {
    var srt = -1;
    var end = arr.length-1;
    while (srt+1 < end) {
        var mid = (srt+end)>>1;
        if (arr[mid] <= goal && goal < arr[mid+1]) {
            return mid
        } else {
            if (arr[mid] > goal) end = mid;
            if (goal >= arr[mid+1]) srt = mid;
        }
    }
    return end;
}

// 1 4 5 6 78
//  10 (12 13 14)
//  15 17