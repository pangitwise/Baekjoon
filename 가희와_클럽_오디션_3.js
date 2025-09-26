var lv = BigInt(require('fs').readFileSync(0).toString().trim());

var p = 10_0000_0007n;

if (lv <= 5n) {
    console.log(String(power(4n, lv, p)));
} else {
    var dp = Array.from({length:Number(lv)+1}, _ => Array(7).fill(0n));
    dp[0][0] = 1n;
    for (var i = 0; i < Number(lv); i++) {
        for (var j = 0; j < 7; j++) {
            dp[i+1][j] += dp[i][j]*8n;
            dp[i+1][j] %= p;
            if (j < 6) {
                dp[i+1][j+1] += dp[i][j]*8n;
                dp[i+1][j+1] %= p;
            }
        }
    }
    console.log(String(dp[lv].reduce((pre, cur) => pre+cur)%p));
}


function power(a, b, m) {
    var list = [];
    var k = 0n;
    var v = a%m;
    while ((1n<<k) <= b) {
        list.push(v);
        v = (list.at(-1)**2n)%m;
        k++;
    }
    var cnt = 0n;
    var k = list.length-1;
    var result = 1n;
    while (cnt < b) {
        if (cnt + (1n<<BigInt(k)) <= b) {
            cnt += 1n<<BigInt(k);
            result *= list[k];
            result %= m;
        }
        k--;
    }
    result %= m;
    return result;
}

function pascalTrainge(x) {
    var arr = [[1n]];
    for (var i = 1; i <= x; i++) {
        var tmp = Array(i+1);
        for (var j = 0; j <= i; j++) {
            tmp[j] = (arr[i-1][j-1] || 0n) + (arr[i-1][j] || 0n);
        }
        arr.push(tmp);
    }
    return arr;
}