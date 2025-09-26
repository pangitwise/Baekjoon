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

function dijstra(x, graph) {
    min_value[x] = 0;
    min_value[0] = -Infinity;
    var heap = [];
    for (var i = 0; i < n+1; i++) {
        heap.Hpush(i);
    }
    heap[0] = -Infinity;
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

var t = 0;
var [n, b, s, r] = input[t++].split(' ').map(x => +x);
var graph = Array.from({length:n+1}, _ => []);
var reverse = Array.from({length:n+1}, _ => []);
for (var i = 0; i < r; i++) {
    var [u, v, l] = input[t++].split(' ').map(x => +x);
    graph[u].push([v, l]);
    reverse[v].push([u, l]);
}
var dist = Array(b).fill(0);
var min_value = Array(n+1).fill(Infinity);
var loc = Array(n+1).fill(undefined);
dijstra(b+1, graph);
for (var i = 1; i < b+1; i++) dist[i-1] += min_value[i];
min_value.fill(Infinity);
loc.fill(undefined);
dijstra(b+1, reverse);
for (var i = 1; i < b+1; i++) dist[i-1] += min_value[i];
dist.sort((a,b) => a-b);
for (var i = 1; i < b; i++) dist[i] += dist[i-1];

var dp1 = Array.from({length:b}, (v, k) => k*dist[k]);
var dp2 = Array(b).fill(Infinity);
for (var i = 1; i < s; i++) {
    if (i&1) {
        dnc(dp1, dp2, i, b-1, i-1, b-1);
        dp1.fill(Infinity);
    } else {
        dnc(dp2, dp1, i, b-1, i-1, b-1);
        dp2.fill(Infinity);
    }
}
i&1 ? console.log(dp1[b-1]) : console.log(dp2[b-1]);

function dnc(dp, tmp, start, end, l, r) {
    var mid = (start+end)>>1;
    var next;
    for (var i = l; i < mid; i++) {
        var v = dp[i]+(dist[mid]-dist[i])*(mid-i-1);
        if (v <= tmp[mid]) {
            tmp[mid] = v;
            next = i;
        }
    }
    if (start < mid) dnc(dp, tmp, start, mid-1, l, next);
    if (mid < end) dnc(dp, tmp, mid+1, end, next, r);
}
// dp[i][j] = min(dp[i-1][k]+(j-k-1)*(prefix[j]-prefix[k-1]))

