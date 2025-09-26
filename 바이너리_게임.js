var input = require('fs').readFileSync(0).toString().trim().split('\n');
var a = input[0].trim();
var b = input[1].trim();
var a_cnt1 = get_cnt1(a);
var b_cnt1 = get_cnt1(b);
for (var i = 0; i < b.length; i++) {
    if (b[i] === '1') b_cnt1++;
}
var bol = judge(a, b);
if (a_cnt1&1) bol |= judge(a+'1', b);
var ans = bol ? 'VICTORY' : 'DEFEAT';
console.log(ans);


function judge(a, b) {
    // 시작지점 찾기
    var bol = true;
    var a_cnt1 = get_cnt1(a);
    var sta = 0;
    var tmp_a = '';
    var tmp_b = '';
    for (var i = 1; i <= Math.min(a.length, b.length); i++) {
        tmp_a = a.at(-i) + tmp_a;
        tmp_b += b[i-1];
        if (tmp_a === tmp_b) sta = i;
    }
    for (var [i, j] = [sta, 0];;) {
        if (a.slice(j) === b) break;
        var nxt = b[i];
        if (nxt === '0') {
            if (!(a_cnt1&1)) {
                i++;
                a += '0';
            } else {
                if (a[j] === '1') a_cnt1--;
                j++;
            }
        } else if (nxt === '1') {
            if (a_cnt1&1) {
                i++;
                a_cnt1++;
                a += '1';
            } else {
                if (a[j] === '1') a_cnt1--;
                j++;
            }
        } else {
            j++;
        }
        if (j === a.length) {
            bol = false;
            break;
        }
    }
    return bol;
}

function get_cnt1(s) {
    var s_cnt1 = 0;
    for (var i = 0; i < s.length; i++) {
        if (s[i] === '1') s_cnt1++;
    }
    return s_cnt1;
}
// 11
// 1100
// 10010
// 0010100
// 1110
// 10000
// 0

// 0101010101001

// 10101010101

// 11
// 1111111111011
// 
