var input = require('fs').readFileSync(0).toString().trim().split('\n');

// 2k !== P[2k]가 존재한다다면,
// (k, 1), ..., (k, N)으로 구성할 수 있다.

// 존재하지 않는다면 (2, q1), ... , (2N, q_N) 꼴이다.

// q_N = t (t ≤ N)에 대하여
// 항상 Math.max(N-t, Math.ceil(t/2))개만큼의 쌍을 추가할 수 있다.

// q_N = N+t에 대하여
// 항상 N+t가 짝수면 (N+t)/2-1, 홀수면 floor((N+t)/2) 개만큼의 쌍을 추가할 수 있다.

// 최악의 경우 마지막 1개가 남는다. 이 1개는 전 탐색을 이용해 찾는다.


var N = +input[0];
var imp_P = Array(N*2+1).fill(false);
var pair_Q = Array(N*2+1);
var list = new Set();
for (var i = 1; i < N+1; i++) {
    var [P, Q] = input[i].split(' ').map(x => +x);
    imp_P[P] = true;
    pair_Q[P] = Q;
    list.add(P+' '+Q);
}

var ans = '';
var bol = false; 
for (var i = 1; i <= N; i++) {
    if (!imp_P[i*2]) {
        for (var j = 1; j <= N; j++) {
            ans += i+' '+j+'\n';
        }
        bol = true;
        break;
    }
}
if (!bol) {
    var set = new Set();
    var q_N = pair_Q[N*2];
    var cnt = constructPair(N, q_N, 0);
    if (N-1 >= 1) {
        cnt = constructPair(N-1, pair_Q[(N-1)*2], cnt);
    }
    if (cnt < N) {
        var fianlPair = findLastPair();
        if (fianlPair) {
            ans += fianlPair+'\n';
            cnt++;
        }
    }
    if (cnt === N) {
        console.log('YES');
        console.log(ans);
    } else {
        console.log('NO');
    }
} else {
    console.log('YES');
    console.log(ans);
}


function constructPair(p, q, limit) {
    if (q <= N) {
        var i = q&1 ? Math.ceil(q/2)+1 : q/2+1;
        for (; i <= N; i++) {
            if (limit === N) break;
            var str = p+' '+i;
            ans += str+'\n';
            set.add(str);
            limit++;
        }
    }  else {
        var end = q&1 ? Math.floor(q/2) : q/2-1;
        for (var i = 1; i <= end; i++) {
            if (limit === N) break;
            var str = p+' '+i;
            ans += str+'\n';
            set.add(str);
            limit++;
        }
    }
    return limit;
}

function findLastPair() {
    for (var i = N; i >= 1; i--) {
        for (var j = N; j >= 1; j--) {
            var str = i+' '+j;
            if (set.has(str)) continue;
            for (var k of set) {
                var [p, q] = k.split(' ').map(x => +x);
                var sumStr = (p+i)+' '+(q+j);
                if (!list.has(sumStr)) {
                    return i+' '+j;
                }
            }
        }
    }
}

// 10 11
// 5 4 3 2 1

// 11 12
// 1 2 3 4 5 6 7 8 9 10 11 