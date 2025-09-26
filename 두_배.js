var input = require('fs').readFileSync(0).toString().trim().split('\n');
var D = +input[0];
var S = input[1].trim();
var C = input[2].trim();
var T = input[3].trim();
var Z = Z_Array(T);

Array.prototype.Hpush = function(idx, ...x) {
    var element = [...x];
    while (element.length !== 0) {
        this.push(element.pop());
        var d = this.length-1;
        loc[this[d]] = d;
        var s = Math.floor(d/2)
        while (min_value[this[d]]+(this[d]-idx) < min_value[this[s]]+(this[s]-idx)) {
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
 
Array.prototype.Hshift = function(idx) {
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
        while (min_value[this[s]]+(this[s]-idx) > min_value[this[d1]]+(this[d1]-idx) || min_value[this[s]]+(this[s]-idx) > min_value[this[d2]]+(this[d2]-idx)) {
            if (min_value[this[d2]] === undefined) {
                var d = d1;
            } else {
                if (min_value[this[d1]]+(this[d1]-idx) < min_value[this[d2]]+(this[d2]-idx)) {
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
 
Array.prototype.Hupdate = function(idx, x) {
    var d = loc[x];
    if (d === -1) {
       this.push(x);
       var d = this.length-1;
    }
   var s = Math.floor(d/2)
   while (min_value[this[d]]+(this[d]-idx) < min_value[this[s]]+(this[s]-idx)) {
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

var table = Array.from({length:26}, _ => Array(26).fill(false));
for (var i = 0; i < D; i++) {
    var s = S.charCodeAt(i)-97;
    var c = C.charCodeAt(i)-97;
    table[s][c] = true;
}
var heap = [null];
var min_value = Array(T.length).fill(Infinity);
var loc = Array(T.length).fill(undefined);
var dp = Array(T.length).fill(Infinity);
dp[0] = 1;
for (var i = 1; i < T.length; i++) {
    var last = T.charCodeAt(i-1)-97;
    var recent = T.charCodeAt(i)-97;
    if (min_value[i-1] !== Infinity) {
        min_value[i-1] = -1;
        heap.Hupdate(i, i-1);
        heap.Hshift(i);
        min_value[i-1] = Infinity;
    }
    for (var j = 0; j < 26; j++) {
        if (table[last][j]) {
            if (Z[i] >= i && T.charCodeAt(i*2)-97 === j) {
                dp[i*2] = Math.min(dp[i*2], dp[i-1]+1);
                min_value[i*2] = Math.min(min_value[i*2], dp[i-1]+1);
                loc[i*2] ? heap.Hupdate(i, i*2) : heap.Hpush(i, i*2);
            } else {
                if (Z[i] > 0) {
                    var next = Math.min(i*2-1, i+Z[i]-1);
                    dp[next] = Math.min(dp[next], dp[i-1]+1+(i*2-next));
                    min_value[next] = Math.min(min_value[next], dp[i-1]+1+(i*2-next));
                    loc[next] ? heap.Hupdate(i, next) : heap.Hpush(i, next);
                }
            }
        } else {
            if (j === recent) dp[i] = Math.min(dp[i], dp[i-1]+1);
        }
    }
    if (heap.length > 1) {
        var num = heap[1];
        dp[i] = Math.min(dp[i], min_value[num]+num-i);
    }
}
if (dp[T.length-1 ]=== Infinity) {
    console.log(-1);
} else {
    console.log(dp[T.length-1]);
}


function Z_Array(S) {
    var Z = Array(S.length).fill(undefined);
    Z[0] = S.length;
    var cnt = 1;
    for (var i = 1; i < S.length;) {
        cnt--;
        j = cnt;
        while (S[i+j] === S[j]) {
            cnt++;
            j++;
        }
        Z[i] = cnt;
        i++;
        cnt--;
        for (var k = 1; cnt > 1; k++, cnt--, i++) {
            Z[i] = Math.min(Z[k], cnt);
            if (Z[i] === cnt) {
                break;
            }
        }
        if (cnt <= 0) cnt = 1;
    }
    return Z;
}