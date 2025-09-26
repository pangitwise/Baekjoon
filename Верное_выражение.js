var [A, oper, B, equal, C] = require('fs').readFileSync(0).toString().trim().split(' ');
var valid = [];
for (var i = 2; i <= 10; i++) {
    if (numeralSystem(i, A, oper, B, C)) valid.push(i);
}
var ans = `${valid.length}\n${valid.join(' ')}`;
console.log(ans);

function numeralSystem(base, A, oper, B, C) {
    var _A = baseConversion(A, base);
    var _B = baseConversion(B, base);
    var _C = baseConversion(C, base);
    if (_A === false || _B === false || _C === false) return false;
    if (oper === '+') {
        var res = _A+_B;
    } else if (oper === '-') {
        var res = _A-_B;
    } else if (oper === '*') 
        var res = _A*_B;
    return res === _C;
}

function baseConversion(num, base) {
    num = String(num);
    var cov = BigInt(0);
    for (var i = 0; i < num.length; i++) {
        if (num[i] >= base) return false;
        cov += BigInt(num[i])*BigInt(base)**BigInt(num.length-1-i);
    }
    return cov;
}