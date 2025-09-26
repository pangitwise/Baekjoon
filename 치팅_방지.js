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

class dequeue {
    constructor(K) {
        this.length = 0;
        this.K = K;
        this.left = Math.floor(K/2);
        this.right = Math.floor(K/2);
        this.arr = Array(K).fill(undefined);
    }
    unshift(x) {
        if (this.length !== 0) this.left -= 1;
        if (this.left < 0) this.left = this.K-1;
        this.arr[this.left] = x;
        this.length++;
    }
    push(x) {
        if (this.length !== 0) this.right += 1;
        if (this.right >= this.K) this.right = 0;
        this.arr[this.right] = x;
        this.length++;
    }
    shift() {
        if (this.length === 0) return undefined;
        var value = this.arr[this.left];
        this.arr[this.left] = undefined;
        this.left += 1;
        if (this.left >= this.K) this.left = 0;
        if (this.length === 1) this.right = this.left;
        this.length--;
        return value;
    }
    pop() {
        if (this.length === 0) return undefined;
        var value = this.arr[this.right];
        this.arr[this.right] = undefined;
        this.right -= 1;
        if (this.right < 0) this.right = this.K-1;
        if (this.length === 1) this.right = this.left;
        this.length--;
        return value;
    }
}

var N = +input[0];
var K = input[1].split(' ').map(x => +x);
var sum = K.reduce((pre, cur) => pre+cur);
for (var i = 1; i <= N; i++) {
    K[i-1] = [i, K[i-1]];
}
var min_value = Array.from({length:N+1}, (v, k) => k > 0 ? K[k-1][1] : null);
var loc = Array(N);
console.log(binarySearch().join(' '));

function binarySearch() {
    var start = 0;
    var end = sum+1;
    var res;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        var series = getSeries(mid);
        if (series) {
            res = series;
            start = mid;
        } else {
            end = mid;
        }
    }
    return res;
}

function getSeries(x) {
    var arr = [];
    var heap = [null];
    for (var i = 1; i < N+1; i++) min_value[i] = K[i-1][1];
    var deq = new dequeue(x);
    for (var i = 1; i <= N; i++) {
        heap.Hpush(i);
    }
    while (heap.length > 1) {
        var num = heap.Hshift();
        arr.push(num);
        min_value[num]--;
        deq.push(num);
        if (deq.length >= x) {
            var next = deq.shift();
            if (min_value[next] > 0) heap.Hpush(next);
        }
    }
    if (arr.length >= sum) {
        return arr;
    } else {
        return false;
    }
}