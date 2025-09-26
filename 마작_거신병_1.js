var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [H, W] = input[0].split(' ').map(x => +x);
var [C, D] = input[1].split(' ').map(x => +x);

var arr = Array.from({length:H}, (v, k) => k);
var total = arr.reduce((pre, cur) => pre+cur);
if (D < total || arr.at(-1) > W) {
    console.log(-1);
} else {
    var remain = D-total;
    var recent = H-1;
    for (var i = 0; i < remain; i++) {
        while (arr[recent] === W || arr[recent]+1 === arr[recent+1]) {
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
            ans += '9 '.repeat(arr[i])+'1 '.repeat(W-arr[i]).trim()+'\n';
        }
        console.log(ans);
    }
}