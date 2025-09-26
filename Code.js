var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = Array(7);
for (var n = 1; n <= 6; n++) {
    var visited = Array(10**n).fill(false);
    visited[0] = true;
    // 99...00꼴 빼기
    for (var i = 1; i < n; i++) {
        var skipNum = '9'.repeat(n-i)+'0'.repeat(i);
        visited[+skipNum] = true;
    }
    // 0부터 시작해서 하나씩 추가하기
    var S = '0'.repeat(n);
    for (var i = 1; i < 10**n; i++) {
        if (!visited[i]) {
            var len = String(i).length;
            var num = '0'.repeat(n-len)+i;
            for (var j = 0; j < n; j++) {
                var chk = S.substring(S.length-n+1+j)+num.substring(n-1-j);
                if (chk === num) break;
            }
            var next = num.substring(n-1-j);
            S += next;
            for (var  j = 0; j < next.length; j++) {
                var skiped = S.substring(S.length-n-j, S.length-j);
                visited[+skiped] = true;
            }
        }
    }
    S += '0'.repeat(n-1);
    ans[n] = S;
    // checker
    //var bol = checker(S, n);
    //console.log(S.length, bol);
}

for (var i = 0; i < input.length; i++) {
    var n = +input[i];
    if (n === 0) break;
    console.log(ans[n]);
}


function checker(S, n) {
    var cnt = Array(10**n).fill(0);
    for (var i = 0; i+n <= S.length; i++) {
        var num = S.slice(i, i+n);
        if (cnt[+num]) return num;
        cnt[+num]++;
    }
    if (cnt.every(x => x === 1)) return true;
    return false;
}

// 0001002003004005006

/// 99..00..

// 9999000