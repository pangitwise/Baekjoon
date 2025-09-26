var input = require('fs').readFileSync(0).toString().trim().split('\n');
// 원점에서 왼쪽으로 간 거리를 l, 오른쪽으로 간 거리를 r이라 하자.
// (l,r) 쌍은 반드시 원점을 포함해야 함.
// (l,r) 쌍을 미리 정하면 이동해야 하는 최소 거리 d를 구할 수 있다.

// (l,r) 범위 내의 모든 점은 항상 방문하게 되므로,
// 나머지는 우큐로 검사하면 된다.
Array.prototype.Hpush = function(...x) {
    var element = [...x];
    while (element.length !== 0) {
        this.push(element.pop());
        var d = this.length-1;
        var s = Math.floor(d/2)
        while (max_value[this[d]] > max_value[this[s]]) {
            this[d] += this[s];
            this[s] -= this[d];
            this[d] += this[s];
            this[s] *= -1;
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
        } else {
          var min = this.pop();
          return min;
        }
        var s = 1;
        var d1 = s*2;
        var d2 = s*2+1;
        while (max_value[this[s]] < max_value[this[d1]] || max_value[this[s]] < max_value[this[d2]]) {
            if (max_value[this[d2]] === undefined) {
                var d = d1;
            } else {
                if (max_value[this[d1]] > max_value[this[d2]]) {
                    var d = d1;
                } else {
                    var d = d2;
                }
            }
            this[s] += this[d];
            this[d] -= this[s];
            this[s] += this[d];
            this[d] *= -1;
            var s = d;
            var d1 = s*2;
            var d2 = s*2+1;
            if (max_value[this[d1]] === undefined && max_value[this[d2]] === undefined) {
                break;
            }
        }
        return min[0];
    }
}

var [n, m] = input[0].split(' ').map(x => +x);
var a = input[1].split(' ').map(x => +x);
var b = input[2].split(' ').map(x => +x);
var max_value = Array(n).fill(0);
var ans = 0;
// 길이
for (var i = 0; i < n; i++) {
    // 시작점
    for (var j = 0; j < n; j++) {
        var [srt, end] = [j, j+i];
        if (hasOrigin(srt, end, n)) {
            ans = Math.max(ans, GeekFlix(srt, end));
        }
    }
}
console.log(ans);


function hasOrigin(srt, end, n) {
    return (srt <= 0 && 0 <= end) || (srt <= n && n <= end) ? true : false;
}

function GeekFlix(srt, end) {
    // 최소 거리 계산
    if (srt === 0) {
        var d = end-srt;
    } else {
        var [l, r] = [n-srt, end-n];
        var d = Math.min(l*2+r, l+r*2);
    }
    // max_value 초기화
    for (var i = srt; i <= end; i++) max_value[i%n] = a[i%n];
    var heap = [-1];
    for (var i = srt; i <= end; i++) heap.Hpush(i%n);
    var cnt = 0;
    var total = 0;
    while (cnt < m-d) {
        var top = heap.Hshift();
        var val = max_value[top];
        if (val <= 0) break;
        total += val;
        max_value[top] -= b[top];
        heap.Hpush(top);
        cnt++;
    }
    return total;
}
