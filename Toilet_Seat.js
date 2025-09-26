var S = require('fs').readFileSync(0).toString().trim();
var cnt1 = 0;
var state = S[0];
for (var i = 1; i < S.length; i++) {
    if (state === 'U') {
        if (S[i] === 'D') {
            cnt1 += 2;
        }
    } else if (state === 'D') {
        cnt1 += 1;
    }
    state = 'U';
}

var cnt2 = 0;
var state = S[0];
for (var i = 1; i < S.length; i++) {
    if (state === 'U') {
        cnt2 += 1;
    } else if (state === 'D') {
        if (S[i] === 'U') {
            cnt2 += 2;
        }
    }
    state = 'D';
}

var cnt3 = 0;
for (var i = 1; i < S.length; i++) {
    cnt3 += S[i] !== S[i-1] ? 1 : 0;
}

console.log(cnt1+'\n'+cnt2+'\n'+cnt3);