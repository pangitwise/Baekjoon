var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, c, k] = input[0].split(' ').map(x => +x);
var r = [0];
if (k > 0) {
    var r = [0, ...input[1].split(' ').map(x => +x)].sort((a,b) => a-b);
}
var base = Array.from({length:n}, (v, s) => s+1);
var ans = '';
for (var i = 0; i < c-1; i++) {
    ans += base.join(' ')+'\n';
}
var last = [];
for (var i = 1; i < k+1; i++) {
    last = last.concat(base.slice(r[i-1], r[i]).reverse());
}
for (var i = r.at(-1); i < n; i++) {
    last.push(3000+i);
}
ans += last.join(' ');
console.log(ans);