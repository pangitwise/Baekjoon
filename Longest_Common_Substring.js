var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, m, k] = input[0].trim().split(' ').map(x => +x);
const p = 998_244_353;
var w = input[1].trim();
// w의 이진값 구하기
var _w = 0;
for (var i = 0; i < k; i++) {
    _w += Number(w[i])*2**(k-1-i);
}

// bit dp로 문자열의 log상태, 끝자리 상태 기록
var dp = bitDp(_w, k, Math.max(n, m));
// w를 포함하는 유효 문자열
var pos = new Set([_w, _w<<1 , _w<<1|1, _w+(1<<k)]);

// 유효 log 상태 구하기
var logState_total = 2**(2**(k+1));
var validNum = [];
for (var i = 0; i < logState_total; i++) {
    for (var j of pos) {
        if (i&(1<<j)) {
            validNum.push(i);
            break;
        }
    }
}

var ans = getLCS_pair(n, m, k, validNum, dp);
console.log(ans);



function bitDp(w, digit, size) {
    var logState_total = 2**(2**(digit+1));
    var recState_total = 2**(digit+1);
    var dp = Array.from({length:size+1}, _ =>
        Array.from({length:logState_total}, _ => Array(recState_total).fill(0)));
    if (size === digit) return dp;
    for (var i = 0; i < recState_total; i++) {
        dp[digit+1][1<<i][i] = 1;
    }
    for (var i = digit+1; i < size; i++) {
        for (var j = 0; j < logState_total; j++) {
            for (var k = 0; k < recState_total; k++) {
                var [nxt1, nxt2] = getNext(k);
                transition(i, j, k, nxt1);
                transition(i, j, k, nxt2);
            }
        }
    }
    return dp;

    function getNext(num) {
        var nxt1 = num;
        if (nxt1&(1<<digit)) {
            nxt1 -= 1<<digit;
        }
        nxt1 <<= 1;
        nxt2 = nxt1|1;
        return [nxt1, nxt2];
    }

    function isHavingLogState(logState, nxt) {
        return logState&(1<<nxt);
    }
    
    function transition(i, j, k, nxt) {
        if (isHavingLogState(j, nxt)) {
            dp[i+1][j][nxt] += dp[i][j][k];
            dp[i+1][j][nxt] %= p;
        } else {
            dp[i+1][j|(1<<nxt)][nxt] += dp[i][j][k];
            dp[i+1][j|(1<<nxt)][nxt] %= p;
        }
    }
}

function getRowSum(arr, rowIdx) {
    return arr[rowIdx].reduce((pre, cur) => pre+cur);
}

function getLCS_pair(n, m, k, validNum, dp) {
    var cnt = 0;
    // case 나누기
    if (n < k || m < k) return cnt;
    if (n === k && m === k) {
        return 1;
    } else {
        if (n === k) for (var j of validNum) cnt += getRowSum(dp[m], j);
        if (m === k) for (var j of validNum) cnt += getRowSum(dp[n], j);
        if (cnt > 0) return cnt;
    }
    // 유효 쌍 개수 구하기
    for (var i of validNum) {
        for (var j of validNum) {
            if (!(i&j)) {
                var case1 = getRowSum(dp[n], i);
                var case2 = getRowSum(dp[m], j);
                var tmp = BigInt(case1)*BigInt(case2);
                tmp %= BigInt(p);
                cnt += Number(tmp);
                cnt %= p;
            }
        }
    }
    return cnt;
}