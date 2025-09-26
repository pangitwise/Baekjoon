var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var ans = '';
var key = Array.from({length:26}, (v, k) => String.fromCharCode(k+97));
key.push(' ');
for (var i = 1; i < N+1; i++) {
    ans += input[i].trim().split(' ').map(x => key[(x.split('').reduce(function(pre, cur) {
        return pre + cur.charCodeAt()-97;
    }, 0))%27]).join('')+'\n';
}
console.log(ans);