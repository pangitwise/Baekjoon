var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var t = +input[s++];
var ans = '';
for (var c = 0; c < t; c++) {
    var [n, l, r] = input[s++].split(' ').map(x => +x);
    var a = input[s++].split(' ').map(x => +x);
    // 교환할 수를 i개로 놓자.
    // 구간 [l, r]의 왼쪽 또는 오른쪽에서의 최솟값 i개와 구간 [l, r]의 최댓값 i개를 교환하는 것이 항상 이득이다.
    // i를 늘려가면서 최솟값을 찾으면 된다.
    var sect = a.slice(l-1, r).sort((a,b) => b-a);
    var left = l > 1 ? a.slice(0, l-1).sort((a,b) => a-b) : [];
    var right = a.slice(r).sort((a,b) => a-b);
    suffix_sum(sect);
    suffix_sum(left);
    suffix_sum(right);
    var initial = sect.at(-1);
    var gap = 0;
    for (var i = 1; i <= sect.length; i++) {
        if (left.length >= i) {
            var left_gap = sect[i-1]-left[i-1];
            gap = Math.max(gap, left_gap);
        }
        if (right.length >= i) {
            var right_gap = sect[i-1]-right[i-1];
            gap = Math.max(gap, right_gap);
        }
    }
    var min = initial-gap;
    ans += `${min}\n`;
}
console.log(ans);

function suffix_sum(arr) {
    if (arr.length > 1) {
        for (var i = 1; i < arr.length; i++) arr[i] += arr[i-1];
    }
}