var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;

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

function dijstra(x, t) {
    min_value[x] = 0n;
    min_value[0] = -Infinity;
    var heap = [];
    for (var i = 0; i < N+1; i++) {
        heap.Hpush(i);
    }
    heap[0] = -Infinity;
    while (heap.length !== 1) {
        var v = heap.Hshift();
        loc[v] = -1;
        var w = min_value[v];
        for (var i of graph[v]) {
            var _v = i[0];
            var _w = i[1]*t+i[2];
           if (w+_w === Infinity) {
                break;
            } else if (w+_w < min_value[_v]) {
                min_value[_v] = w+_w;
                heap.Hupdate(_v);
            }
        }
    }
}

var [N, M] = input[s++].split(' ').map(x => +x);
var graph = Array.from({length:N+1}, _ => []);
for (var i = 0; i < M; i++) {
    var [I, J, A, B] = input[s++].split(' ').map(x => +x);
    A = BigInt(A);
    B = BigInt(B)*10n**13n;
    graph[I].push([J, A, B]);
    graph[J].push([I, A, B]);
}
var min_value = Array(N+1);
var loc = Array(N+1);
var ans = String(ternarySearch(0n, 1440n*10n**13n));
var integer = ans.length >= 14 ? ans.slice(0, ans.length-13) : '0'; 
var decimal = ans.length >= 14 ? ans.slice(ans.length-13) : '0'.repeat(13-ans.length)+ans;
var part = +decimal.slice(0, 5);
if (decimal[5] >= 5) part++;
if (part === 100000) {
    integer++;
    part = '00000';
} else {
    part = String(part);
    part = '0'.repeat(5-part.length)+part;
}
console.log(integer+'.'+part);



function ternarySearch(start, end) {
    var lx = start;
    var rx = end;
    var max = 0n;
    while (lx+2n < rx) {
        var ml_x = lx+(rx-lx)/3n;
        var mr_x = lx+(rx-lx)*2n/3n;
        var ml_tax = getTotalTax(ml_x);
        var mr_tax = getTotalTax(mr_x);
        if (ml_tax <= mr_tax) {
            lx = ml_x;
            max = max < mr_tax ? mr_tax : max;
        } else {
            rx = mr_x;
            max = max < ml_tax ? ml_tax : max;
        }
    }
    return max;
}

function getTotalTax(t) {
    min_value.fill(Infinity);
    loc.fill(undefined);
    dijstra(1, t);
    return min_value.at(-1);
}