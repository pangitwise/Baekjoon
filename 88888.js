var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var LIMIT = 10n**18n;
var T = +input[s++];
var set = new Set();
var ini = Array.from({length:18}, (v, k) => '8'.repeat(k+1));
ini = ini.map(x => BigInt(x));
for (var i of ini) set.add(i);
luckyBfs(ini);

var ans = '';
for (var i = 0; i < T; i++) {
    var N = BigInt(input[s++]);
    if (set.has(N)) {
        ans += 'Yes\n';
    } else {
        ans += 'No\n';
    }
}
console.log(ans);


function luckyBfs(ini) {
    var arr = ini.slice(0);
    var dep = 1;
    while (dep < 8) {
        var tmp = [];
        for (var i of arr) {
            for (var j = 0; j < ini.length; j++) {
                var nxt = i+ini[j];
                if (!set.has(nxt) && nxt <= LIMIT) {
                    set.add(nxt);
                    tmp.push(nxt);
                }
            }
        }
        arr = tmp;
        dep++;
    }
}