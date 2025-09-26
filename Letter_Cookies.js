var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var letters = input[s++].trim();
    var cnt = Array(26).fill(0);
    for (var i of letters) {
        var num = i.charCodeAt()-65;
        cnt[num]++;
    }
    var W = +input[s++];
    for (var i = 0; i < W; i++) {
        var word = input[s++].trim();
        var tmp = Array(26).fill(0);
        for (var j of word) {
            var num = j.charCodeAt()-65;
            tmp[num]++;
        }
        var bol = true;
        for (var j = 0; j < 26; j++) {
            if (tmp[j] > cnt[j]) {
                bol = false;
                break;
            }
        }
        ans += bol ? 'YES\n' : 'NO\n';
    }
}
console.log(ans);