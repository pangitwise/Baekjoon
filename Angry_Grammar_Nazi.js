var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var ans = '';
for (var c = 0; c < T; c++) {
    var S = input[c+1].trim().split(' ');
    var angry = 0;
    for (var i = 0; i < S.length; i++) {
        if (S[i] === 'u' || S[i] === 'ur') angry += 10;
        if ((S[i] === 'would' || S[i] === 'should') && S[i+1] === 'of') angry += 10;
        if (S[i].includes('lol')) angry += 10;
    }
    ans += angry+'\n';
}
console.log(ans);