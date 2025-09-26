var input = require('fs').readFileSync(0).toString().trim().split('\n');

Array.prototype.Hpush = function(...x) {
    var element = [...x];
    while (element.length !== 0) {
        this.push(element.pop());
        var d = this.length-1;
        loc[this[d]] = d;
        var s = Math.floor(d/2)
        while (min_value[this[d]] < min_value[this[s]]) {
            this[d] += this[s];
            this[s] -= this[d];
            this[d] += this[s];
            this[s] *= -1;
            loc[this[d]] = d;
            loc[this[s]] = s;
            var d = s;
            var s = Math.floor(d/2);
            if (d === 1) {
                break;
            }
        }
    }
}
 
Array.prototype.Hshift = function() {
    if (this.length === 1) {
       return undefined;
    } else {
        if (this.length !== 2) {
          var min = this.splice(1, 1, this.pop());
          loc[this[0]] = 0;
        } else {
          var min = this.pop();
          return min;
        }
        var s = 1;
        var d1 = s*2;
        var d2 = s*2+1;
        while (min_value[this[s]] > min_value[this[d1]] || min_value[this[s]] > min_value[this[d2]]) {
            if (min_value[this[d2]] === undefined) {
                var d = d1;
            } else {
                if (min_value[this[d1]] < min_value[this[d2]]) {
                    var d = d1;
                } else {
                    var d = d2;
                }
            }
            this[s] += this[d];
            this[d] -= this[s];
            this[s] += this[d];
            this[d] *= -1;
            loc[this[d]] = d;
            loc[this[s]] = s;
            var s = d;
            var d1 = s*2;
            var d2 = s*2+1;
            if (min_value[this[d1]] === undefined && min_value[this[d2]] === undefined) {
                break;
            }
        }
        return min[0];
    }
}
 
Array.prototype.Hupdate = function(x) {
    var d = loc[x];
    if (d === -1) {
       this.push(x);
       var d = this.length-1;
    }
   var s = Math.floor(d/2)
   while (min_value[this[d]] < min_value[this[s]]) {
       this[d] += this[s];
       this[s] -= this[d];
       this[d] += this[s];
       this[s] *= -1;
       loc[this[d]] = d;
       loc[this[s]] = s;
       var d = s;
       var s = Math.floor(d/2);
       if (d === 1) {
           break;
       }
   }
}

function dijstra(scc, num) {
    var heap = [0];
    for (var i of scc) {
        heap.Hpush(i);
        visited[i] = num
    }
    heap[0] = null;

    while (heap.length !== 1) {
        var v = heap.Hshift();
        loc[v] = -1;
        var w = min_value[v];
        for (var i of graph[v]) {
            var _v = i[0];
            var _w = i[1];
           if (w+_w === Infinity) {
                break;
            } else if (w+_w < min_value[_v]) {
                min_value[_v] = w+_w;
                heap.Hupdate(_v);
            }
        }
    }
}

var s = 0;
var [T, R, P, S] = input[s++].split(' ').map(x => +x);
var graph = Array.from({length:T+1}, _ => []);
var total = Array.from({length:T+1}, _ => []);
for (var i = 0; i < R; i++) {
    var [A, B, C] = input[s++].split(' ').map(x => +x);
    graph[A].push([B, C]);
    graph[B].push([A, C]);
    total[A].push([B, C]);
    total[B].push([A, C]);
}
var plane = Array.from({length:T+1}, _ => []);
for (var i = 0; i < P; i++) {
    var [A, B, C] = input[s++].split(' ').map(x => +x);
    plane[A].push([B, C]);
    total[A].push([B, C]);
}

var id = [];
var visited = [];
var finished = [];
for (var i = 0; i < T+1; i++) {
    id.push(undefined);
    visited.push(false);
    finished.push(false);
}
visited[0] = true;

// 그래프 만들기

var cmd = 0;
var stack = [];
var list = [];
var cnt = 0;
for (var i = 1; i < T+1; i++) {
    if (visited[i] === false) {
        tarjan(i, total);
    }
}

var min_value = Array(T+1).fill(Infinity);
min_value[0] = -Infinity;
min_value[S] = 0;
var loc = Array(T+1).fill(undefined);
var visited = Array(T+1).fill(-1);
for (var i = 0; i < list.length; i++) {
    var scc = list.at(-1-i);
    shortestPath(scc);
}
var ans = '';
for (var i = 1; i <= T; i++) {
    if (min_value[i] === Infinity) {
        ans += 'NO PATH\n';
    } else {
        ans += min_value[i]+'\n';
    }
}
console.log(ans);



function tarjan(x, graph) {
    visited[x] = true;
    stack.push(x);
    id[x] = cmd;
    var origin = cmd;
    for (var i of graph[x]) {
        i = i[0];
        if (visited[i] === false) {
            cmd++;
            id[x] = Math.min(id[x], tarjan(i, graph));
        } else {
            if (finished[i] === false) {
                id[x] = Math.min(id[x], id[i]);
            }
        }
    }
    if (id[x] === origin) {
        var scc = new Set();
        while (true) {
            var node = stack.pop();
            scc.add(node);
            finished[node] = true;
            if (node === x) break;
        }
        list.push(scc);
        cnt++;
    }
    return id[x];
}

function shortestPath(scc, num) {
    dijstra(scc, num);
    for (var i of scc) {
        for (var j of plane[i]) {
            var [next, cost] = j;
            min_value[next] = Math.min(min_value[next], min_value[i]+cost);
        }
        for (var j of graph[i]) {
            var [next, cost] = j;
            min_value[next] = Math.min(min_value[next], min_value[i]+cost);
        }
    }
}