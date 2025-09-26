var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var player = [];
var sum = Array(n);
for (var i = 1; i < n+1; i++) {
    var row = input[i].split(' ').map(x => +x);
    sum[i-1] = row.reduce((pre,cur) => pre+cur);
    player.push(row);
}
var num = Array.from({length:n}, (v, k) => k);
num.sort((a,b) => sum[b]-sum[a]);
var A = num.slice(0, n>>1)
var B = num.slice(n>>1);
var sumA = 0;
var sumB = 0;
for (var i = 0; i < n>>1; i++) {
    for (var j = i; j < n>>1; j++) {
        var numA1 = A[i];
        var numA2 = A[j];
        var numB1 = B[i];
        var numB2 = B[j];
        sumA += player[numA1][numA2];
        sumB += player[numB1][numB2];
    }
}
console.log(sumA-sumB);