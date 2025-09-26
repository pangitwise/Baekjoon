var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
var div = Array.from({length:100000}, _ => [1]);
for (var i = 2; i < 50000; i++) {
    for (var j = i*2; j < 100000; j += i) {
        div[j].push(i);
    }
}
for (var i of input) {
    var n = +i;
    if (n === -1) break;
    if (n === div[n].reduce((pre,cur) => pre+cur)) {
        ans += n+' = '+div[n].join(' + ')+'\n';
    } else {
        ans += n+' is NOT perfect.\n'
    }
}
console.log(ans);