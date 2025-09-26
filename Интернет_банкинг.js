var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var n = +input[s++];
var max_match = -1;
var idx;
var arr = [];
for (var i = 0; i < n; i++) {
    arr.push(input[s++].trim());
}
var goal = input[s++].trim();

for (var i = 0; i < arr.length; i++) {
    var match_cnt = 0;
    for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === goal[j]) match_cnt++;
    }
    if (match_cnt > max_match) {
        max_match = match_cnt;
        idx = i;
    }
}

var bol = true;
var comp = arr[idx];
var log = [];
for (var i = 0; i < comp.length; i++) {
    if (comp[i] === goal[i]) continue;
    bol = false;    
    for (var j = 0; j < n; j++) {
        if (j === idx) continue;
        if (arr[j][i] === goal[i]) {
            log.push(`${idx+1} ${j+1} ${i+1}`);
            bol = true;
            break;
        }
    }
    if (!bol) {
        break;
    }
}
ans = bol ? `${log.length}\n${log.join('\n')}` : '-1';
console.log(ans.trim());