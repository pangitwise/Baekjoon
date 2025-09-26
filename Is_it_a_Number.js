var input = require('fs').readFileSync(0).toString().split('\n');
var N = +input[0];
var ans = '';
for (var i = 1; i < N+1; i++) {
    s = input[i].trim().split(/\D+/)
    var bol = s.length === 1 && s[0].length > 0 ? true : false;
    if (bol) {
        var len = s[0].length;
        var zeroCnt = 0;
        for (var j = 0; j < len; j++) {
            if (s[0][j] === '0') {
                zeroCnt++;
            } else {
                break;
            }
        }
        if (zeroCnt === len) {
            ans += '0\n';
        } else {
            ans += s[0].slice(zeroCnt)+'\n';
        }
    } else {
        ans += 'invalid input\n';
    }
}
console.log(ans);