var input = require('fs').readFileSync(0).toString().trim().split('\n');

Array.prototype.swap = function(a, b) {
    var tmp = this[a];
    this[a] = this[b];
    this[b] = tmp;
}

var n = +input[0];
var grid = [];
var loc = Array(n**2+1);
for (var i = 1; i < n+1; i++) {
    var row = input[i].split(' ').map(x => +x);
    for (var j = 0; j < n; j++) {
        var num = row[j];
        loc[num] = [i-1, j];
    }
    grid.push(row);
}
var rowEdge = Array.from({length:n}, _ => []);
var columnEdge = Array.from({length:n}, _ => []);
var bol = true;
for (var i = 1; i < n**2; i++) {
    var [r1, c1] = loc[i];
    var [r2, c2] = loc[i+1];
    if (r1 === r2) {
        if (!columnEdge[c1].includes(c2)) {
            if (columnEdge[c1].length === 2 || columnEdge[c2].length === 2) {
                bol = false;
                break;
            }
            columnEdge[c1].push(c2);
            columnEdge[c2].push(c1);
        }
    } else if (c1 === c2) {
        if (!rowEdge[r1].includes(r2)) {
            if (rowEdge[r1].length === 2 || rowEdge[r2].length === 2) {
                console.log(i);
                bol = false;
                break;
            }
            rowEdge[r1].push(r2);
            rowEdge[r2].push(r1);
        }
    } else {
        bol = false;
        break;
    }
}
if (!bol) {
    console.log(-1);
} else {
    // 간선의 개수가 1인 곳부터 탐색하며 번호 매기기
    var rowMin = Infinity;
    for (var i = 0; i < n; i++) {
        if (rowEdge[i].length === 1) {
            var order = [];
            dfs(i, undefined, rowEdge, order);
            rowMin = Math.min(rowMin, sorting(order));
        }
    }
    var columnMin = Infinity;
    for (var i = 0; i < n; i++) {
        if (columnEdge[i].length === 1) {
            var order = [];
            dfs(i, undefined, columnEdge, order);
            columnMin = Math.min(columnMin, sorting(order));
        }
    }
    console.log(rowMin+columnMin);
}



function dfs(x, p, graph, order) {
    order.push(x);
    for (var i of graph[x]) {
        if (i !== p) {
            dfs(i, x, graph, order);
        }
    }
}

function sorting(order) {
    var recent = Array.from({length:n}, (v, k) => k);
    var loc = Array.from({length:n}, (v, k) => k);
    var cnt = 0;
    for (var i = 0; i < n; i++) {
        var goal = order[i];
        if (recent[i] === goal) continue;
        var thisNum = recent[i];
        recent.swap(loc[thisNum], loc[goal]);
        loc.swap(goal, thisNum);
        cnt++;
    }
    return cnt;
}
