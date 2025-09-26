var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var ans = '';
for (var i = 1; i < n+1; i++) {
    var [a, b, f] = input[i].split(' ').map(x => +x);
    ans += 'Data set: '+a+' '+b+' '+f+'\n';
    for (var j = 0; j < f; j++) {
        if (a > b) {
            a = Math.floor(a/2);
        } else {
            b = Math.floor(b/2);
        }
    }
    if (a < b) {
        var tmp = a;
        a = b;
        b = tmp;
    }
    ans += a+' '+b+'\n\n';
}
console.log(ans);