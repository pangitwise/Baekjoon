var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var a = input[1].split(' ').map(function(x) {
    var rev = '';
    for (var i = 0; i < x.length; i++) {
        var digit = x.at(-1-i);
        rev += revDigit(digit);
    }
    return rev;
});
var len = 0;
var max;
for (var i = 0; i < N; i++) {
    if (a[i].length > len) {
        len = a[i].length;
        max = a[i];
    } else if (a[i].length === len) {
        if (+a[i] > +max) {
            max = a[i];
        }
    }
}
a.push(max);

a.sort(function(a,b) {
    var _a = a;
    var _b = b;
    if (a.length < b.length) {
        var _a = a+a.slice(0, b.length-a.length);
        var _b = b;
    } else if (a.length > b.length) {
        var _a = a;
        var _b = b+b.slice(0, a.length-b.length);
    }
    var i = 0;
    while (i < _a.length) {
        if (_a[i] !== _b[i]) {
            return +_b[i] - +_a[i];
        }
        i++;
    }
    return 0;
});
var rot = a.join('');
var ans = '';
for (var i = 0; i < rot.length; i++) {
    ans += revDigit(rot.at(-1-i));
}
console.log(ans);


function revDigit(digit) {
    switch (digit) {
        case '0': var rev = '0';
        break;
        case '1': var rev = '1';
        break;
        case '2': var rev = '2';
        break;
        case '5': var rev = '5';
        break;
        case '6': var rev = '9';
        break;
        case '8': var rev = '8';
        break;
        case '9': var rev = '6';
    }
    return rev;
}


// 0002
// 003000