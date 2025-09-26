var n = require('fs').readFileSync(0).toString().trim().split('');
for (var i = 0; i < n.length-1; i++) {
    if (n[i] !== '9') {
        if ((n.length&1) === ((i+1)&1)) break;
    }
    if (n[i] !== '0' && !(n[i] === '1' && i === 0))  {
        if (((n.length+1)&1) === ((i+1)&1)) break;
    }
}
var ans = !(i&1) ? 'First' : 'Second';
console.log(ans);