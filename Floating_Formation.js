var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var [n, m, k] = input[s++].split(' ').map(x => +x);
    var graph = Array.from({length:n+m+1}, _ => []);
    var recent = Array(n+m+1).fill(0);
    for (var i = 0; i < m; i++) {
        var [a, b] = input[s++].split(' ').map(x => +x);
        var boat = n+1+i;
        graph[a].push(boat);
        graph[b].push(boat);
        graph[boat].push(a, b);
        recent[a]++;
        recent[b]++;
        recent[boat] = 2;
    }
    // 간선이 1개뿐인 design 정점(= U)에서부터 BFS로 rank를 매기면서 정점 제거거
    var queue = [];
    for (var i = 1; i <= n; i++) {
        if (recent[i] === 1) {
            queue.push(i);
        }
    }
    var rank = Array(n+m+1).fill(undefined);
    removeBfs(queue);
    // DFS + rank 배열 + 누적합을 이용하여 정점 U를 내버려둘 시 제거되는 design 정점 개수 기록
    var prefix = Array(n+m+1).fill(undefined);
    var max_value = Array(n+1).fill(-Infinity);
    var loc = Array(n+1).fill(undefined);
    for (var i of queue) {
        prefixDfs(i);
        max_value[i] = prefix[i];
    }
    var tree = [];
    segTree(1, n, 1)
    // 최댓값 세그 이용하여 내버려둘 시 가장 많은 design 정점이 제거되는 U를 찾기
    for (var i = 0; i < k; i++) {
        var mostWeak = tree[1];
        if (max_value[mostWeak] <= 0) break;
        loc[mostWeak] = 0;
        recent[mostWeak]++;
        addDfs(mostWeak);
    }
    var sinked = 0;
    for (var i = 1; i <= n; i++) {
        if (recent[i] <= 1) sinked++;
    }
    ans += sinked+'\n';
}
console.log(ans);


function removeBfs(list) {
    var queue = list;
    var dep = 1;
    while (queue.length > 0) {
        var tmp = [];
        for (var i of queue) {
            rank[i] = dep;
            recent[i] = 0;
            for (var j of graph[i]) {
                if (!rank[j]) {
                    recent[j]--;
                    if (recent[j] === 1) {
                        tmp.push(j);
                    }
                }
            }
        }
        dep++;
        queue = tmp;
    }
}

function prefixDfs(x) {
    var cnt = 0;
    for (var i of graph[x]) {
        if (!recent[i] && rank[x] < rank[i]) {
            if (prefix[i] === undefined) {
                cnt += prefixDfs(i);
            } else {
                cnt += prefix[i];
            }
        }
    }
    if (1 <= x && x <= n) cnt++;
    prefix[x] = cnt;
    return prefix[x];
}

function addDfs(x) {
    var bol = false;
    for (var i of graph[x]) {
        if (recent[i] <= 1 && rank[x] < rank[i]) {
            bol = true;
            recent[i]++;
            recent[x]++;
            addDfs(i);
        }
    }
    if (!bol) updateDfs(x, 0);
}

function updateDfs(x, sum) {
    if (1 <= x && x <= n && recent[x] >= 2) sum++;
    if (x <= n) max_value[x] -= sum;
    for (var i of graph[x]) {
        if (rank[x] > rank[i]) {
            updateDfs(i, sum);
        }
    }
    if (x <= n && max_value[x] >= 0) {
        updateSeg(1, n, x, 1);
    }
}

function segTree(start, end, idx) {
    if (start !== end) {
        var mid = (start+end)>>1;
        var l = segTree(start, mid, idx<<1);
        var r = segTree(mid+1, end, idx<<1|1);
        if (max_value[l] >= max_value[r]) {
            tree[idx] = l;
        } else {
            tree[idx] = r;
        }
    } else {
        tree[idx] = start;
    }
    return tree[idx];
}

function updateSeg(start, end, goal, idx) {
    if (goal <= start && end <= goal) {
        return tree[idx];
    } else {
        if (goal > end || goal < start) return tree[idx];
        var mid = (start+end)>>1;
        var l = updateSeg(start, mid, goal, idx<<1);
        var r = updateSeg(mid+1, end, goal, idx<<1|1);
        if (max_value[l] >= max_value[r]) {
            tree[idx] = l;
        } else {
            tree[idx] = r;
        }
        return tree[idx];
    }
}
// 3 4 5 6 7
// 3 4 8 9 10



// 11 12 13 14 15
// 11 16