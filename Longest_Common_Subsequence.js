var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var ans = '';
for (var s = 1; s < T+1; s++) {
    var [n, m, p, x, a, b, c] = input[s].split(' ').map(x => BigInt(x));
    n = Number(n);
    m = Number(m);
    var s_map = new Map();
    for (var i = 0; i < n; i++) {
        x = update(x);
        if (!s_map.has(x)) s_map.set(x, i);
    }
    var cnt = 0;
    for (var i = 0; i < m; i++) {
        x = update(x);
        if (s_map.has(x)) {
            var loc = s_map.get(x);
            cnt = Math.max(cnt, Math.min(n-loc, m-i));
        }
    }
    ans += cnt+'\n';
}
console.log(ans);


function update(x) {
    return (a*x**2n+b*x+c)%p;
}