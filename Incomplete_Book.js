var [k, d] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);
var ans = 0;
var rec = 0;
while (k+rec <= d) {
    rec += k;
    k *= 2;
    ans++;
}
console.log(ans);