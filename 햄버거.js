var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var T = input[1].split(' ').map(x => +x);
var S = input[2].trim();
var cnt = Array(4).fill(0);
var bol = true;
if (!(S[0] === 'a' && S.at(-1) === 'a')) bol = false;
for (var i = 1; i < S.length; i++) {
    if (S[i-1] === S[i]) {
        bol = false;
        break;
    }
    var num = S.charCodeAt(i)-97;
    cnt[num]++;
}
for (var i = 0; i < 4; i++) {
    if (cnt[i] > T[i]) bol = false;
}
bol ? console.log('Yes') : console.log('No');