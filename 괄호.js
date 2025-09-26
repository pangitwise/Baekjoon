var input = require('fs').readFileSync(0).toString().trim().split('\n').map(x => +x);

var dp = Array(1001);
var dmap = Array(1001).fill(Infinity);
dp[1] = '()';
dmap[1] = 12n
dp[2] = '{}';
dmap[2] = 34n;
dp[3] = '[]';
dmap[3] = 56n;
for (var i = 1; i < 1000; i++) {
    updateMultiple(i);
    updateAddition(i);
}

var T = input[0];
var ans = '';
for (var i = 1; i < T+1; i++) {
    var N = input[i];
    ans += dp[N]+'\n';
}
console.log(ans);


function updateMultiple(i) {
    var s_dmap = BigInt('1'+String(dmap[i])+'2');
    if (i*2 <= 1000 && s_dmap <= dmap[i*2]) {
        dmap[i*2] = s_dmap;
        dp[i*2] = '('+dp[i]+')';
    }
    var m_dmap = BigInt('3'+String(dmap[i])+'4');
    if (i*3 <= 1000 && m_dmap <= dmap[i*3]) {
        dmap[i*3] = m_dmap;
        dp[i*3] = '{'+dp[i]+'}';
    }
    var b_dmap = BigInt('5'+String(dmap[i])+'6');
    if (i*5 <= 1000 && b_dmap <= dmap[i*5]) {
        dmap[i*5] = b_dmap;
        dp[i*5] = '['+dp[i]+']';
    }
}

function updateAddition(i) {
    for (var j = 1; j <= i && i+j <= 1000; j++) {
        var v = i+j;
        var next1 = dp[i]+dp[j];
        var d_str1 = BigInt(String(dmap[i])+String(dmap[j]));
        if (d_str1 <= dmap[v]) {
            dmap[v] = d_str1;
            dp[v] = next1;
        }
        var next2 = dp[j]+dp[i];
        var d_str2 = BigInt(String(dmap[j])+String(dmap[i]));
        if (d_str2 <= dmap[v]) {
            dmap[v] = d_str2;
            dp[v] = next2;
        }
    }
}
