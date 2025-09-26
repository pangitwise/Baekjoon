var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var n = +input[s++];
var bitSet = Array(n+1);
var sensitivity = [];
var stable = [];
for (var i = 1; i < n+1; i++) {
    var order = input[s++].split(' ').map(x => +x);
    var bit = 0n;
    if (order[0] === i) stable.push(i);
    for (var j = 0; j < n; j++) {
        if (order[j] === i) break;
        bit |= 1n<<BigInt(order[j]);
    }
    bitSet[i] = bit;
    sensitivity.push(order);
}

var p = +input[s++];
if (p === 1) {
    console.log(stable.length);
    console.log(stable.join(' '));
} else {
    var survive = canSurvive();
    console.log(survive.length);
    console.log(survive.join(' '));
}


function canSurvive() {
    var valid = Array(n+1).fill(false);
    for (var i = 0; i < n; i++) {
        var ord = sensitivity[i];
        var first = ord[0];
        valid[first] = true;
        var right = 0n;
        var [j, k] = [0, n-1];
        while (j < n && j < k) {
            var num = ord[j];
            while (!(bitSet[num]&right)) {
                if (k <= j) break;
                right |= 1n<<BigInt(ord[k]);
                k--;
            }
            if (k <= j) break;
            valid[ord[j+1]] = true;
            j++;
        }
    }
    var res = [];
    for (var i = 1; i <= n; i++) if (valid[i]) res.push(i);
    return res;
}