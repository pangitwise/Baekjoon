var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var oper = [];
for (var i = 1; i < n+1; i++) {
    var [kind, num] = input[i].trim().split(' ');
    num = +num;
    oper.push([kind, num]);
}
var cnt = 0;
for (var i = 1; i <= 100; i++) {
    cnt += isMessedUp(oper, i);
}
console.log(cnt);


function isMessedUp(oper, initial) {
    var v = initial;
    for (var i = 0; i < oper.length; i++) {
        var [kind, num] = oper[i];
        if (kind === 'ADD') v += num;
        if (kind === 'SUBTRACT') v -= num;
        if (kind === 'MULTIPLY') v *= num;
        if (kind === 'DIVIDE') v /= num;
        if (v < 0 || !Number.isInteger(v)) return 1;
    }
    return 0;
}