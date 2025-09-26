const input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
var s = 0;
var Z = +input[s++].trim();
for (var c = 0; c < Z; c++) {
    var W = input[s++].trim();
    var T = input[s++].trim();
    var K = fail(W);
    ans += KMP(T, W, K)+"\n";
}
console.log(ans);


function fail(P) {
    var j = -1;
    var F = Array(P.length).fill(-1);
    for (var i = 1; i < F.length; i++) {
        j++;
        F[i] = j;
        while (j > -1 && P[i] !== P[j]) {
            j = F[j];
        }
    }
    return F;
}

function KMP(A, B, F) {
    var cnt = 0;
    var match = 0;
    for (var i = 0; i < A.length; i++) {
        var bol = false;
        A[i] === B[match] ? match++ : bol = true;
        if (match === B.length) {
            cnt++;
            match = F[match-1];
            bol = true;
        }
        if (bol) {
            while (match > -1 && A[i] !== B[match]) {
                match = F[match];
            }
            match++;
        }
    }
    return cnt;
}