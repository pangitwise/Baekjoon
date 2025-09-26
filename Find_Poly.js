var input = require('fs').readFileSync(0).toString().trim().split(/[\n\r(),;]/);
var arr = [];
for (var i = 0; i < input.length; i++) {
    if (input[i] !== '') arr.push(+input[i]);
}
var map = new Map();
var graph = Array.from({length:arr.length/2}, _ => []);
var idx = 0;
for (var i = 0; i < arr.length/4; i++) {
    var line = [arr[i*4], arr[i*4+1], arr[i*4+2], arr[i*4+3]];
    var p1 = line[0]+' '+line[1];
    var p2 = line[2]+' '+line[3];
    if (addPoint(map, p1, idx)) idx++;
    if (addPoint(map, p2, idx)) idx++;
    var v1 = map.get(p1);
    var v2 = map.get(p2);
    graph[v1].push(v2);
    graph[v2].push(v1);
}
var visited = Array(map.size).fill(false);
var figure = 0;
var polygon = 0;
for (var i = 0; i < visited.length; i++) {
    if (!visited[i]) {
        if (dfs(i, true)) polygon++;
        figure++;
    }
}
console.log(figure, polygon);



function addPoint(map, p, v) {
    if (!map.has(p)) {
        map.set(p, v);
        return true;
    }
    return false;
}

function dfs(x, isPolygon) {
    visited[x] = true;
    if (graph[x].length !== 2) isPolygon = false;
    for (var i of graph[x]) {
        if (!visited[i]) {
            isPolygon &= dfs(i, isPolygon);
        }
    }
    return isPolygon;
}