var input = require('fs').readFileSync(0).toString().trim().split('\n');

Array.prototype.Hpush = function(...x) {
    var element = [...x];
    while (element.length !== 0) {
        this.push(element.pop());
        var d = this.length-1;
        loc[this[d]] = d;
        var s = Math.floor(d/2)
        while (min_value[this[d]] > min_value[this[s]]) {
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
        while (min_value[this[s]] < min_value[this[d1]] || min_value[this[s]] < min_value[this[d2]]) {
            if (min_value[this[d2]] === undefined) {
                var d = d1;
            } else {
                if (min_value[this[d1]] > min_value[this[d2]]) {
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
   while (min_value[this[d]] > min_value[this[s]]) {
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

function dijstra(x) {
    min_value[x] = Infinity;
    heap = [Infinity];
    for (var i = 0; i < N+2; i++) {
        heap.Hpush(i);
    }
    while (heap.length !== 1) {
        var v = heap.Hshift();
        loc[v] = -1;
        var w = min_value[v];
        for (var i of graph[v]) {
            var _v = i;
            var _w = cap[v][_v];
           if (Math.min(w, _w) === 0) {
                continue;
            } else if (Math.min(w, _w) > min_value[_v]) {
                min_value[_v] = Math.min(w, _w);
                heap.Hupdate(_v);
            }
        }
    }
}

var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var [N, E, A, B] = input[s++].split(' ').map(x => +x);
    A++;
    B++;
    var graph = Array.from({length:N+2}, (v, k) => []);
    var cap = Array.from({length:N+2}, (v, k) => Array(N+2).fill(0));
    var flow = Array.from({length:N+2}, (v, k) => Array(N+2).fill(0));
    var level = Array(N+2).fill(-1);
    level[0] = 0;
    var work = Array(N+2).fill(0);
    for (var i = 0; i < E; i++) {
        var [U, V, W] = input[s++].split(' ').map(x => +x);
        U++;
        V++;
        if (cap[U][V] === 0 && cap[V][U] === 0) {
            graph[U].push(V);
            graph[V].push(U);
        }
        cap[U][V] += W;
    }
    cap[0][A] = Infinity;
    graph[0].push(A);
    graph[A].push(0);
    cap[B][N+1] = Infinity;
    graph[B].push(N+1);
    graph[N+1].push(B);
    var total = 0;
    while (bfs()) {
        work = Array(N+2).fill(0);
        while (true) {
            var f = dfs(0, N+1, Infinity);
            if (f === 0) break;
            total += f;
        }
    }
    //데이크스트라 DP (min-value -> max_value)
    var min_value = Array(N+2).fill(-1);
    var loc = Array(N+2).fill(undefined);
    dijstra(0);
    var maxRouteFlow = min_value[N+1];
    ans += Number(Math.round((total/maxRouteFlow)*1000)/1000).toFixed(3)+'\n';
}
console.log(ans);


function bfs() {
    level = level.fill(-1);
    level[0] = 0;
    lev = 1;
    list = [0];
    while (list.length) {
        var queue = [];
        for (var i of list) {
            for (var j of graph[i]) {
                if (level[j] === -1 && cap[i][j]-flow[i][j] > 0) {
                    level[j] = lev;
                    queue.push(j);
                }
            }
        }
        list = queue;
        lev++;
    }
    if (level[N+1] === -1) {
        return false;
    } else {
        return true;
    }
}

function dfs(cur, goal, stream) {
    if (cur === goal) return stream;
    for (var i = work[cur]; i < graph[cur].length; i++) {
        var next = graph[cur][i];
        if (level[next] === level[cur]+1 && cap[cur][next]-flow[cur][next] > 0) {
            stream = Math.min(stream, cap[cur][next]-flow[cur][next]);
            var tmp = dfs(next, goal, stream);
            if (tmp > 0) {
                flow[cur][next] += tmp;
                flow[next][cur] -= tmp;
                return tmp;
            }
        }
        work[cur]++;
    }
    return 0;
}