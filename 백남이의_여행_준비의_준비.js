var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var ans = '';
var x = [];
var y = [];
var R = [];
for (var i = 1; i < T+1; i++) {
    var [A, B, C, a, b, c] = input[i].split(' ').map(x => +x);
    var list_m = [A, B, C];
    var list_a = [a, b, c];
    var gold = crt(list_m, list_a);
    if (gold !== false) {
        ans += gold+'\n';
    } else {
        ans += '-1\n';
    }
}
console.log(ans);


function crt(list_m, list_a) {
    var L = list_m.length;
    // 서로소 판정
    var cop_m = Array.from({length:L}, (v, k) => list_m[k]);
    var cop_a = Array(L);
    var list_lcm = Array(L).fill(1);
    for (var i = 0; i < L; i++) {
        for (var j = i+1; j < L; j++) {
            while (gcd(cop_m[i], cop_m[j]) !== 1) {
                var gcd_m = gcd(cop_m[i], cop_m[j]);
                if (list_a[i]%gcd_m !== list_a[j]%gcd_m) return false;
                var gcd_i = gcd(list_lcm[i], gcd_m);
                var gcd_j = gcd(list_lcm[j], gcd_m);
                if (gcd(cop_m[i]/gcd_m, cop_m[j]) === 1) {
                    list_lcm[i] = list_lcm[i]*gcd_m/(gcd_i)**2;
                    cop_m[i] = list_m[i]/list_lcm[i];
                } else {
                    list_lcm[j] = list_lcm[j]*gcd_m/(gcd_j)**2;
                    cop_m[j] = list_m[j]/list_lcm[j];
                }
            }
        }
    }
    for (var i = 0; i < L; i++) {
        cop_m[i] = list_m[i]/list_lcm[i];
        cop_a[i] = list_a[i]%cop_m[i];
    }
    var M = cop_m.reduce((pre,cur) => BigInt(pre)*BigInt(cur));
    var sol = 0n;
    for (var i = 0; i < L; i++) {
        var tmp_M = Number(M/BigInt(cop_m[i]));
        if (cop_a[i] !== 0) sol += BigInt(cop_a[i])*BigInt(tmp_M)*BigInt(EEA(tmp_M, cop_m[i], 0));
    }
    sol = BigInt(sol);
    sol = ((sol+M)%M+M)%M;
    var bol = false;
    while (!bol) {
        bol = true;
        for (var i = 0; i < L; i++) {
            if (sol%BigInt(list_m[i]) !== BigInt(list_a[i])) bol = false;
        }
        if (!bol) sol += M;
    }
    return sol;
}


function gcd(a, b) {
    var r = a%b;
    if (r === 0) return b;
    return gcd(b, r);
}

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
    x[dep] = xi;
    y[dep] = yi;
    R[dep] = r;
    if (r === 1) {
        return xi;
    }
    if (r === 0) return false;
    return EEA(b, r, dep+1);
}