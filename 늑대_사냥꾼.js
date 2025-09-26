var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, M] = input[0].split(' ').map(x => +x);
var visited = Array.from({length:N}, _ => Array(M).fill(-1));
var trees = [];
var V;
var J;
for (var i = 1; i < N+1; i++) {
    var arr = input[i].trim().split('');
    var k = 0;
    for (var j of arr) {
        if (j === 'V') V = [i-1, k];
        if (j === 'J') J = [i-1, k];
        if (j === '+') trees.push([i-1, k]);
        k++;
    }
}

var dx = [-1, 1, 0, 0];
var dy = [0, 0, -1, 1];

getDistanceFromTree(trees);
var searched = Array.from({length:N}, _ => Array(M).fill(false));
console.log(binarySearch(V, J));


function getDistanceFromTree(trees) {
    var list = trees;
    for (var i of list) {
        var [x, y] = i;
        visited[x][y] = 0;
    }
    var dep = 1;
    while (list.length > 0) {
        var tmp = [];
        for (var i of list) {
            var [x, y] = i;
            for (var j = 0; j < 4; j++) {
                var nx = x+dx[j];
                var ny = y+dy[j];
                if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                    if (visited[nx][ny] === -1) {
                        tmp.push([nx, ny]);
                        visited[nx][ny] = dep;
                    }
                }
            }
        }
        list = tmp;
        dep++;
    }
}


function binarySearch(V, J) {
    var start = -1;
    var end = N+M+1;
    var max = 0;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        searched.forEach(x => x.fill(false));
        var hasSafeRoute = searchForest(V, J, mid, searched);
        if (hasSafeRoute) {
            max = Math.max(max, mid);
            start = mid;
        } else {
            end = mid;
        }
    }
    return max;
}

function searchForest(V, J, limit, searched) {
    var [sx, sy] = V;
    var minDist = visited[sx][sy];
    if (minDist < limit) return false;
    searched[sx][sy] = true;
    var list = [[sx, sy]];
    while (list.length > 0) {
        var tmp = [];
        for (var i of list) {
            var [x, y] = i;
            for (var j = 0; j < 4; j++) {
                var nx = x+dx[j];
                var ny = y+dy[j];
                if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                    if (!searched[nx][ny] && visited[nx][ny] >= limit) {
                        tmp.push([nx, ny])
                        searched[nx][ny] = true;
                        if (nx === J[0] && ny === J[1]) return true;
                    }
                }
            }
        }
        list = tmp;
    }
    return false;
}