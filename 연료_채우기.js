var input = require('fs').readFileSync(0).toString().trim().split('\n');

Array.prototype.swap = function(a, b) {
    var tmp = this[a];
    this[a] = this[b];
    this[b] = tmp;
}

Array.prototype.Hpush = function(...x) {
    var element = [...x];
    while (element.length !== 0) {
        this.push(element.pop());
        var d = this.length-1;
        while (d > 1) {
            var s = d>>1;
            if (this[d] < this[s]) {
                this.swap(d, s);
                d = s;
            } else {
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
            var min = this.splice(1, 1, this.pop())[0];
        } else {
            var min = this.pop();
            return min;
        }
        var s = 1;
        while (true) {
            var d1 = s<<1;
            var d2 = s<<1|1;
            var num_s = this[s];
            var num_d1 = this[d1] || Infinity;
            var num_d2 = this[d2] || Infinity;
            if (num_s > num_d1 || num_s > num_d2) {
                if (num_d1 < num_d2) {
                    this.swap(s, d1);
                    s = d1;
                } else {
                    this.swap(s, d2);
                    s = d2;
                }
            } else {
                break;
            }
        }
        return min;
    }
}

var s = 0;
var N = +input[s++];
var gasStations = [];
for (var i = 0; i < N; i++) {
    var [a, b] = input[s++].split(' ').map(x => +x);
    gasStations.push([a, b]);
}
var [L, P] = input[s++].split(' ').map(x => +x);

// 주유소를 거리별로 정렬한 후, 트럭이 갈 수 있는 거리까지의 주유소를 모두 heap에 넣고,
// 그 중 저장 연료가 가장 많은 주유소에 들르는 것이 최적
// 이후 트럭이 갈 수 있는 거리 갱신 후 반복
gasStations.sort((a,b) => a[0]-b[0]);
var heap = [-1];
var recent = P;
var idx = 0;
var cnt_visit = 0;
while (recent < L && idx < N) {
    for (; idx < N; idx++) {
        var [a, b] = gasStations[idx];
        if (a <= recent) {
            heap.Hpush(-b);
        } else {
            break;
        }
    }
    if (heap.length > 1) {
        var maxFuel = -heap.Hshift();
        recent += maxFuel;
        cnt_visit++;
    } else {
        break;
    }
}
var ans = recent >= L ? cnt_visit : -1;
console.log(ans);