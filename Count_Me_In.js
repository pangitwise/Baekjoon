var input = require('fs').readFileSync(0).toString().trim().split('\n');
var S = +input[0];
var vowel = ['A','E','I','O','U','a','e','i','o','u'];
var ans = '';
for (var j = 1; j < S+1; j++) {
    var s = input[j].trim();
    var al = 0;
    var v_cnt = 0;
    for (var i of s) {
        if (vowel.includes(i)) v_cnt++;
        if (i !== ' ') al++;
    }
    ans += `${al-v_cnt} ${v_cnt}\n`;
}
console.log(ans);