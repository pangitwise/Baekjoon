var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
for (var i of input) {
    var [a, b, c, d] = i.split(' ').map(x => +x);
    if ([a, b, c, d].every(x => x === -1)) break;
    var K = isArithmetic(a, b, c, d);
    if (1 <= K && K <= 10000 && Number.isInteger(K)) {
        ans += K+'\n';
        continue;
    }
    var K = isGeometric(a, b, c, d);
    if (1 <= K && K <= 10000 && Number.isInteger(K)) {
        ans += K+'\n';
        continue;
    }
    ans += '-1\n';
}
console.log(ans);


function isArithmetic(a, b, c, d) {
    if (a === -1) {
        var diff = c-b;
        if (b+d === c*2) return b-diff;
        return false;
    } else if (b === -1) {
        var diff = d-c;
        if (a+c === (d-diff*2)*2) return a+diff;
        return false;
    } else if (c === -1) {
        var diff = b-a;
        if (a+(d-diff) === b*2) return b+diff;
        return false;
    } else if (d === -1) {
        var diff = b-a;
        if (a+c === b*2) return c+diff;
        return false;
    }
}

function isGeometric(a, b, c, d) {
    if (a === -1) {
        var diff = c/b;
        if (b*d === c**2) return b/diff;
        return false;
    } else if (b === -1) {
        var diff = d/c;
        if (a*c === (d/diff/diff)**2) return a*diff;
        return false;
    } else if (c === -1) {
        var diff = b/a;
        if (a*(d/diff) === b**2) return b*diff;
        return false;
    } else if (d === -1) {
        var diff = b/a;
        if (a*c === b**2) return c*diff;
        return false;
    }
}