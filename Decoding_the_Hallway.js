var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var ans = '';
for (var i = 1; i < T+1; i++) {
    var [n, S] = input[i].trim().split(' ');
    n = +n;
    if (judgeBending(n, S, 1, Array(S.length))) {
        ans += 'Case '+i+': Yes\n';
    } else {
        ans += 'Case '+i+': No\n';
    }
}
console.log(ans);


function judgeBending(n, S, k, order) {
    if (!order.includes(undefined)) return true;
    if (n < k) return false;
    var period = 2**k;
    var bol = false;
    for (var i = 0; i < Math.min(period, S.length); i++) {
        if (order[i] === undefined && isValid(i, S, n-k+1, order)) {
            var valid = true;
            for (var j = i; j < S.length; j += period) {
                if (S[j-period] === S[j] || ((k === n) && S[j] === 'R')) {
                    valid = false;
                    break;
                }
                order[j] = n-k+1;
            }
            if (valid) bol |= judgeBending(n, S, k+1, order)
            if (bol) return true;
            for (var j = i; j < S.length; j += period) order[j] = undefined;
        }
    }
    if (period > S.length) bol |= judgeBending(n, S, k+1, order);
    return bol;
}

function isValid(i, S, k, order) {
    var leftMap = new Map();
    var rightMap = new Map();
    for (var j = i-1; j >= 0; j--) {
        if (order[j] !== undefined && !leftMap.has(order[j])) leftMap.set(order[j], S[j]);
    }
    for (var j = i+1; j < S.length; j++) {
        if (order[j] !== undefined && !rightMap.has(order[j])) rightMap.set(order[j], S[j]);
    }
    for (var j of leftMap.entries()) {
        var [num, str] = j;
        if ((num === k+1 && str === 'R') || (num !== k+1 && str === 'L')) return false;
    }
    for (var j of rightMap.entries()) {
        var [num, str] = j;
        if ((num === k+1 && str === 'L') || (num !== k+1 && str === 'R')) return false;
    }
    return true;
}
// 유형 정리
// 1. 임의의 L_k/R_k에 대하여, L_k+1 L_k/R_k R_k+1를 만족해야 한다.
// 2. 임의의 L_k/R_k에 대하여, R_k+t L_k/R_k L_k+t를 만족해야 한다. (t >= 2)
// 3. 시행이 n회일 때, n-k번째 L/R은 2^(k+1)의 주기로 나와야 한다.
// 4. 위의 1, 2, 3이 재귀적으로 성립해야 한다.