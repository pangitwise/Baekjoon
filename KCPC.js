var input = require('fs').readFileSync(0).toString().trim().split('\n');
var z = 0;
var T = +input[z++];
var ans = '';
for (var c = 0; c < T; c++) {
    var [n, k, t, m] = input[z++].split(' ').map(x => +x);
    t--;
    var scoreboard = Array.from({length:n}, _ => Array(k).fill(0));
    var lastSubmit = Array(n).fill(undefined);
    var submitCnt = Array(n).fill(0);
    for (var x = 0; x < m; x++) {
        var [i, j, s] = input[z++].split(' ').map(x => +x);
        i--; j--;
        scoreboard[i][j] = Math.max(scoreboard[i][j], s);
        lastSubmit[i] = x;
        submitCnt[i]++;
    }
    var total = Array.from({length:n}, (v, k) => scoreboard[k].reduce((pre, cur) => pre+cur));
    var ord = Array.from({length:n}, (v, k) => k);
    ord.sort(function(a,b) {
        if (total[a] !== total[b]) {
            return total[b]-total[a];
        } else {
            if (submitCnt[a] !== submitCnt[b]) {
                return submitCnt[a]-submitCnt[b];
            } else {
                return lastSubmit[a]-lastSubmit[b];
            }
        }
    });
    for (var i = 0; i < n; i++) {
        var id = ord[i];
        if (id === t) {
            ans += `${i+1}\n`;
            break;
        }
    }
}
console.log(ans);