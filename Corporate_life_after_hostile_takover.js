var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var rel1 = input[1].split(' ').map(x => +x);
var rel2 = input[2].split(' ').map(x => +x);
var graph1 = makeTreeGraph(rel1);
var graph2 = makeTreeGraph(rel2);

var info2 = ETT(graph2);
var seg2 = [];
segTree(seg2, 1, n, 1);

var ans = ETT_Sweeping(graph1, info2, seg2);
// ETT 스위핑: 방문할 때마다 다른 트리의 해당 노드에 +1
// 방문 시: 범위 내 값은 기존 부하가 아니므로 뺌
// 퇴장 시: 범위 내 값을 더함
console.log(ans.slice(1).join(' '));


function makeTreeGraph(rel) {
    var graph = Array.from({length:n+1}, _ => []);
    for (var [i, j] = [0, 2]; i < n-1; i++, j++) {
        var sup = rel[i];
        graph[j].push(sup);
        graph[sup].push(j);
    }
    return graph;
}

function ETT(graph) {
    var info = Array.from({length:n+1}, _ => [0, 0]);
    var visited = Array(n+1).fill(false);
    var cnt = 1;
    dfs(1);

    function dfs(node) {
        visited[node] = true;
        info[node][0] = cnt; // 시작
        for (var i of graph[node]) {
            if (!visited[i]) {
                cnt++;
                dfs(i);
            }
        }
        info[node][1] = cnt; // 끝
    }
    return info;
}

function segTree(tree, start, end, idx) {
    if (start !== end) {
        var mid = (start+end)>>1;
        tree[idx] = segTree(tree, start, mid, idx<<1)+segTree(tree, mid+1, end, idx<<1|1)
    } else {
        tree[idx] = 0;
    }
    return tree[idx];
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

function ETT_Sweeping(main_graph, sub_info, sub_seg) {
    var vistied = Array(n+1).fill(false);
    var log = Array(n+1).fill(0);
    dfs(1);

    function dfs(node) {
        vistied[node] = true;
        var [srt, end] = sub_info[node];
        log[node] -= findDfs(sub_seg, 1, n, srt, end, 1);
        changeDfs(sub_seg, 1, n, srt, srt, 1, 1);
        for (var i of main_graph[node]) {
            if (!vistied[i]) {
                dfs(i);
            }
        }
        log[node] += srt === end ? 0 : findDfs(sub_seg, 1, n, srt+1, end, 1);
    }
    return log;
}