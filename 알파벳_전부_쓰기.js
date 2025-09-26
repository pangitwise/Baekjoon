var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var ans = '';
for (var i = 1; i < N+1; i++) {
    var S = input[i].trim().toUpperCase();
    var bol = Array(26).fill(false);
    for (var j of S) {
        var num = j.charCodeAt()-65;
        if (0 <= num && num < 26) {
            bol[num] = true;
        }
    }
    var missing = '';
    for (var j = 0; j < 26; j++) {
        if (!bol[j]) {
            missing += String.fromCharCode(j+97);
        }
    }
    ans += missing ? 'missing '+missing+'\n' : 'pangram\n';
}
console.log(ans);