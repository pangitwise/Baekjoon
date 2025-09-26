var input = require('fs').readFileSync(0).toString().trim().split('\n');

var base = 40001;

// node: 트라이의 문자열 정점
// depth: 정점의 깊이(등장 순서)
// parent: 부모 정점
// childNode: 자식 정점
// fail: 자식 정점 검색에 실패했을 경우 돌아가는 위치
// success: 패턴 존재 여부
// output: 현재 정점에서 찾을 수 있는 가장 긴 패턴
var node = Array(base);
var depth = Array(base);
var parent = Array(base);
var childNode = Array(base);
var unsuccess = Array(base);
var success = Array(base);

var map = new Map();
map.set('.', 0)
map.set(0, '.');
for (var i = 0; i < 10; i++) {
    map.set(String(i), i+1);
    map.set(i+1, String(i));
}
for (var i = 0; i < 26; i++) {
    var large = String.fromCharCode(65+i);
    var small = String.fromCharCode(97+i);
    map.set(large, 11+i);
    map.set(11+i, large);
    map.set(small, 37+i);
    map.set(37+i, small);
}

var s = 0;
var T = +input[s++];
var ans = '';
for (c = 0; c < T; c++) {
    node.fill();
    depth.fill();
    parent.fill();
    childNode.fill();
    unsuccess.fill();
    success.fill();
    var patterns = [];
    var N1 = +input[s++];
    for (var i = 0; i < N1; i++) {
        patterns.push(input[s++].trim());
    }
    var N2 = +input[s++];
    for (var i = 0; i < N2; i++) {
        patterns.push(input[s++].trim());
    }
    makeTrie(patterns, N1);
    dfs1(0);
    ans += dfs2(0)+'\n';
}
console.log(ans);


// 배열만을 이용한 트라이 구성
function makeTrie(patterns, N1) {
    node[0] = '';
    parent[0] = undefined;
    childNode[0] = Array(63).fill(0);
    success[0] = false;
    unsuccess[0] = false;
    depth[0] = 0;
    var idx = 1;
    var cnt = 0;
    for (var S of patterns) {
        var loc = 0;
        for (var j = 0; j < S.length; j++) {
            var chr = map.get(S[j]);
            if (childNode[loc][chr]) {
                loc = childNode[loc][chr];
            } else {
                childNode[loc][chr] = idx;
                node[idx] = S[j];
                parent[idx] = loc;
                childNode[idx] = Array(63).fill(0);
                unsuccess[idx] = false;
                success[idx] = false;
                depth[idx] = depth[loc]+1;
                loc = idx;
                idx++;
            }
        }
        cnt < N1 ? success[loc] = true : unsuccess[loc] = true;
        cnt++;
    }
}

function dfs1(x) {
    var deleted = true;
    for (var i = 0; i < childNode[x].length; i++) {
        if (childNode[x][i]) {
            deleted &= dfs1(childNode[x][i]);
        }
    }
    if (!deleted) unsuccess[x] = true;
    if (unsuccess[x]) return false;
    success[x] = true;
    return true;
}

function dfs2(x) {
    var cnt = 0;
    if (success[x]) cnt++;
    if (!unsuccess[x]) return cnt;
    for (var i = 0; i < childNode[x].length; i++) {
        if (childNode[x][i]) {
            cnt += dfs2(childNode[x][i]);
        }
    }
    return cnt;
}