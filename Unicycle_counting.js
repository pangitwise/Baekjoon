var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
for (var c = 0; c < input.length; c++) {
    var [m, n, ...marks] = input[c].split(' ').map(x => +x);
    var road = Array(m).fill(false);
    var list = [];
    for (var i of marks) {
        road[i] = true;
    }
    for (var i = 1; i <= m; i++) {
        for (var j = 0; j < i; j++) {
            var bol = true;
            var cnt = 0;
            for (var k = j; k < m; k += i, cnt++) {
                if (!road[k]) {
                    bol = false;
                    break;
                }
            }
            if (cnt >= 2 && bol) list.push([i, j]);
        }
    }
    var min = n;
    backTracking(Array(m).fill(0), 0, [], 0);
    ans += min+'\n';
}
console.log(ans);


function backTracking(state, cnt, arr, dep) {
    if (dep >= min) return;
    min = Math.min(min, dep+n-cnt);
    if (cnt === n) {
        return min = Math.min(min, dep);
    }
    for (var i = 0; i < list.length; i++) {
        if (!arr.includes(i)) {
            var [a, b] = list[i];
            var nextCnt = cnt;
            for (var j = b; j < m; j += a) {
                if (!state[j]) nextCnt++;
                state[j]++;
            }
            if (nextCnt > cnt) {
                arr.push(i);
                backTracking(state, nextCnt, arr, dep+1);
                arr.pop();
            }
            for (var j = b; j < m; j += a) {
                state[j]--;
            }
        }
    }
}