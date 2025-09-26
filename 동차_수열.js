var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var ans = '';
for (var i = 0; i < input.length; i++) {
    var n = +input[s++];
    if (n === 0) break;
    var square = [];
    for (var j = 0; j < n; j++) {
        square.push(input[s++].split(' ').map(x => +x));
    }
    var bol = true;
    for (var j = 0; j < n; j++) {
        var r = square[j][0];
        var c = square[0][j];
        for (var k = 0; k < n; k++) {
            if (r !== square[j][k] || c !== square[k][j]) {
                bol = false;
                break;
            }
        }
        if (!bol) break;
    }
    if (bol) {
        ans += 'homogeneous\n';
        continue;
    }
    var set = new Set();
    for (var j = 0; j < n; j++) {
        var sum = 0;
        for (var k = 0; k < n; k++) {
            sum += square[(j+k)%n][k]
        }
        set.add(sum);
        if (set.size > 1) break;
    }
    var series = Array.from({length:n}, (v, k) => k);
    for (var j = 0; j < 1000; j++) {
        series.sort((a,b) => Math.random()-0.5);
        var sum = 0;
        for (var k = 0; k < n; k++) {
            sum += square[k][series[k]];
        }
        set.add(sum);
        if (set.size > 1) break;
    }
    if (set.size === 1) {
        ans += 'homogeneous\n'
    } else {
        ans += 'not homogeneous\n';
    }
}
console.log(ans);