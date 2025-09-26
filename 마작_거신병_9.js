var input = require('fs').readFileSync(0).toString().trim().split('\n');
var H = +input[0];
var W = input[1].split(' ').map(x => +x);
var [C, D] = input[2].split(' ').map(x => +x);

var arr = Array(H);
arr[0] = 0;
var last = W[0];
var bol = true;
for (var i = 1; i < H; i++) {
    for (var j = 0; j <= W[i]; j++) {
        var sum = j*9+(W[i]-j);
        if (sum > last) {
            arr[i] = j;
            break;
        }
    }
    if (arr[i] === undefined) {
        bol = false;
        break;
    }
    last = sum;
}

var total = arr.reduce((pre, cur) => pre+cur);
if (!bol || D < total || !arr.every((v, idx) => v <= W[idx])) {
    console.log(-1);
} else {
    var remain = D-total;
    var recent = H-1;
    for (var i = 0; i < remain; i++) {
        while (arr[recent] === W[recent] || (arr[recent]+1)*9+(W[recent]-arr[recent]-1) >= arr[recent+1]*9+W[recent+1]-arr[recent+1]) {
            recent--;
            if (recent < 0) break;
        }
        if (recent < 0) break;
        arr[recent]++;
    }
    if (i < remain) {
        console.log(-1);
    } else {
        ans = '';
        for (var i = 0; i < H; i++) {
            ans += '9 '.repeat(arr[i])+'1 '.repeat(W[i]-arr[i]).trim()+'\n';
        }
        console.log(ans);
    }
}