var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var [D, I, M, N] = input[s++].split(' ').map(x => +x);
    var a = input[s++].split(' ').map(x => +x);
    // dp[값]
    var dp = Array(256).fill(Infinity);
    for (var j = 0; j <= 255; j++) {
        dp[j] = Math.min(D, Math.abs(a[0]-j));
    }
    for (var i = 1; i < N; i++) {
        var tmp = Array(256).fill(Infinity);
        for (var j = 0; j <= 255; j++) {
            tmp[j] = Math.min(tmp[j], dp[j]+D);
            for (var k = 0; k <= 255; k++) {
                tmp[j] = Math.min(tmp[j], dp[k]+Math.abs(a[i]-j)+(M > 0 ? Math.ceil(Math.max(0, Math.abs(k-j)-M)/M)*I : k === j ? 0 : Infinity));
            }
        }
        dp = tmp;
    }
    var min = Math.min(...dp);
    ans += 'Case #'+(c+1)+': '+min+'\n';
}
console.log(ans);