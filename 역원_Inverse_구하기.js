var [N, A] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);;

var x = [];
var y = [];
var R = [];
var B = N-A;
var C = EEA(A, N, 0);
C === false ? C = -1 : C = (C+N)%N;
console.log(B, C);

function EEA(a, b, dep) {
    var r = a%b;
    var q = a/b;
    q < 0 ? q = Math.ceil(q) : q = Math.floor(q);
    if (r < 0) {
        r += Math.abs(b);
        b < 0 ? q += 1 : q -= 1;
    }
    // a = bq+r이므로, a-bq = r
    if (dep === 0) {
        var xi = 1;
        var yi = -q;
    // b = rq1+r1이므로, b = (a-bq)q1+r1
    // a*(-q1) + b(1-q*q1) = r1
    } else if (dep === 1) {
        var xi = -q;
        var yi = 1-y[dep-1]*q;
    // 재귀적으로
    // r_m = am+bm, r_n = an+bn이면 r_m = r_n*q+r_o
    // am+bm = anq+bnq+r_o. a(m-nq)+b(m-nq) = r_o
    } else {
        var xi = x[dep-2]-x[dep-1]*q;
        var yi = y[dep-2]-y[dep-1]*q;
    }
    x.push(xi);
    y.push(yi);
    R.push(r);
    if (r === 1) {
        return xi;
    }
    if (r === 0) return false;
    return EEA(b, r, dep+1);
}