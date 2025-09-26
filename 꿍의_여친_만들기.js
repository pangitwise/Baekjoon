var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var cond = input[s++].trim().split(',').map(x => x.split(':').map((v, idx) => idx === 1 ? +v : v));
    var map = new Map(cond);
    var her = input[s++].trim().split('|').map(x => x.split('&'));
    var min = Infinity;
    for (var i = 0; i < her.length; i++) {
        var time = 0;
        for (var j = 0; j < her[i].length; j++) {
            var thisCond = her[i][j];
            time = Math.max(time, map.get(thisCond));
        }
        min = Math.min(min, time);
    }
    ans += min+'\n';
}
console.log(ans);