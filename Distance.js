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

function dijstra(x) {
    min_value[x] = 0;
    min_value[0] = -Infinity;
    var heap = [null, x];
    var visited = new Set();
    var other = new Set();
    while (heap.length !== 1) {
        var v = heap.Hshift();
        if (visited.has(v)) continue;
        visited.add(v);
        var w = min_value[v];
        if (pop[v] && v !== x) min_d = Math.min(min_d, w);
        if (pop[v] && w >= min_d) break;
        for (var i of graph[v]) {
            var _v = i[0];
            var _w = i[1];
           if (w+_w === Infinity) {
                break;
            } else if (w+_w < min_value[_v]) {
                min_value[_v] = w+_w;
                other.add(_v);
                heap.Hpush(_v);
            }
        }
    }
    for (var i in other) {
        min_value[i] = Infinity;
    }
    min_value[x] = Infinity;
}

var s = 0;
var [N, K, L] = input[s++].split(' ').map(x => +x);
var pop = Array(K+1).fill(0);
for (var i = 0; i < N; i++) {
    var num = +input[s++];
    pop[num]++;
}
var graph = Array.from({length:K+1}, _ => []);
for (var i = 0; i < L; i++) {
    var [B, C, D] = input[s++].split(' ').map(x => +x);
    graph[B].push([C, D]);
    graph[C].push([B, D]);
}
var min_d = Infinity;
var min_value = Array(K+1).fill(Infinity);
var loc = Array(K+1);
for (var i = 0; i < K; i++) {
    if (pop[i]) {
        if (pop[i] > 1) min_d = 0;
        if (pop[i] === 1) dijstra(i);
    }
}
console.log(min_d*3);

//1 3
// 7

// 2 2 2 2