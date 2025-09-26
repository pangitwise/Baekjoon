const { timeLog } = require('console');

var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
for (var s = 0; s < input.length;) {
    var n = +input[s++];
    if (n === 0) break;
    var L = input[s++].trim().split('').map(x => +x);
    var info = Array.from({length:30}, _ => Array.from({length:n+1}, __ => [undefined, undefined]));
    // [합성 횟수, 다음 값] 
    var loc = Array.from({length:10}, _ => []);
    var dp = Array(n+1).fill(0);
    for (var i = 0; i < n; i++) {
        var num = L[i];
        info[num][i] = [0, i+1];
        loc[num].push(i);
    }
    var queue = [];
    // i = 슬라임의 목표 크기
    for (var i = 1; i <= 30; i++) {
        if (i <= 10) {
            for (var j of loc[i-1]) queue.push(j);
        }
        var tmp = [];
        for (var j of queue) {
            var inital_size = L[j];
            if (inital_size < i) {
                var [combine, next] = info[i-1][j];
                if (next) {
                    var [next_combine, next_next] = info[i-1][next];
                    if (next_next) {
                        var sum = combine+next_combine+1;
                        info[i][j] = [sum, next_next];
                        tmp.push(j);
                    }
                }
            }
        }
        if (i >= 10 && tmp.length === 0) break;
        queue = tmp;
    }
    for (var i = 0; i < n; i++) {
        var num = L[i];
        for (var j = num; j <= 30; j++) {
            var [thisCombine, next] = info[j][i];
            if (!next) break;
            dp[next] = Math.max(dp[next], dp[i]+thisCombine);
        }
    }
    ans += dp.at(-1)+'\n';
}
console.log(ans);
// 2 1 1

// 4 2 1 1 2 1 1 3

// 4 2 1 1 3 1 2 3 1 2 3 4 1 1

// 2: 1 1 1 0 1 0 1 1 0 1 1 1 1 0

// 4 2 1 2

// 1 2 4 8

// 4 1 1 2 3


// 18

// 5

// 8

// 2 2 2 1 1


// 수열의 맨 앞자리부터 DP를 돌린다.
// dp[i] = i번째까지의 최대 슬라임 합성 횟수

// 현재 위치를 i라고 하자.
// 그러면 L[i]에서부터 시작하여, 더이상 큰 수를 만들 수 없을 때까지 합쳐가며 값을 기록한다.

// 이때 합치는 연산을 최대한 빠르게 할 필요가 있다.
// 앞에서부터 차례대로 탐색하면 O(N^2)이므로,
// 각 수들이 각 위치에서 얼마나 많이 연속하는지를 기록하면 탐색 횟수를 줄일 수 있다.
// 이는 사전에 각 수마다 역방향으로 누적합을 돌리면 해결된다!
