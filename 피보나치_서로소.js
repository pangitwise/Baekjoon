var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var ans = '';
for (var i = 1; i < T+1; i++) {
    var n = +input[i];
    if (n === 1) {
        ans += '0\n';
        continue;
    }
    var phi = 1;
    var j = 2;
    var tmp = n;
    var factor = [];
    while (tmp > 1 && j <= Math.floor(Math.sqrt(n))) {
        var cnt = 0;
        while (tmp%j === 0) {
            tmp /= j;
            cnt++;
        }
        if (cnt > 0) {
            phi *= j**(cnt-1)*(j-1);
            if (j === 2) {
                if (cnt > 1) factor.push(j);
            } else {
                factor.push(j);
            }
        }
        j++;
    }
    if (tmp > 1) {
        factor.push(tmp);
        phi *= tmp-1;
    }
    if (!(n&1) && n > 2) {
        phi += n/2;
        phi -= in_and_ex(2, 0, 0);
    }
    ans += phi+'\n';
}
console.log(ans);


function in_and_ex(x, idx, dep) {
    var sum = dep > 0 ? n/x : 0;
    dep&1 ? sum *= 1 : sum *= -1;
    for (var i = idx; i < factor.length; i++) {
        var p = factor[i];
        sum += in_and_ex(x*p, i+1, dep+1);
    }
    return sum;
}