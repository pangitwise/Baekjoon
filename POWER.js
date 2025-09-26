var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var V = +input[1];
var lamp = [];
var total_Watt = 0;
for (var i = 2; i < N+2; i++) {
    var [D, W] = input[i].split(' ').map(x => +x)
    total_Watt += W;
    lamp.push([D, W]);
}
var end_l = V-1;
var end_r = N-V;
// dp[L][R][l_min, r_min, thisWatt] 1 2
var dp = Array.from({length:end_l+1}, _ => Array.from({length:end_r+1}, __ => Array(3).fill(Infinity)));
var visited = Array.from({length:end_l+1}, _ => Array(end_r+1).fill(false));
;
dp[0][0][0] = 0;
dp[0][0][2] = total_Watt-lamp[V-1][1];
visited[0][0] = true;


var dx = [1, 0];
var dy = [0, 1];
var queue = [[0, 0]];
while (queue.length > 0) {
    var tmp = [];
    for (var i of queue) {
        var [L, R] = i;
        var [pos_L, lv] = [lamp[V-L-1][0], dp[L][R][0]];
        var [pos_R, rv] = [lamp[V+R-1][0], dp[L][R][1]];
        var thisWatt = dp[L][R][2];
        for (var j = 0; j < 2; j++) {
            var nl = L+dx[j];
            var nr = R+dy[j];
            if (j === 0) var nk = nl;
            if (j === 1) var nk = nr;
            if (nl <= end_l && nr <= end_r) {
                var [pos_nk, watt_nk] = j === 0 ? lamp[V-nk-1] : lamp[V+nk-1];
                if (j === 0) {
                    dp[nl][nr][0] = Math.min(lv+Math.abs(pos_L-pos_nk)*thisWatt, rv+Math.abs(pos_R-pos_nk)*thisWatt);
                } else {
                    dp[nl][nr][1] = Math.min(lv+Math.abs(pos_L-pos_nk)*thisWatt, rv+Math.abs(pos_R-pos_nk)*thisWatt);
                }
                dp[nl][nr][2] = thisWatt-watt_nk;
                if (!visited[nl][nr]) {
                    tmp.push([nl, nr]);
                    visited[nl][nr] = true;
                }
            }
        }
        queue = tmp;
    }
}
console.log(Math.min(dp[end_l][end_r][0], dp[end_l][end_r][1]));