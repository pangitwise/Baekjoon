var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    s++;
    var _N = +input[s++];
    var N = input[s++].split(' ').map(x => +x);
    var _M1 = +input[s++];
    var M1 = input[s++].split(' ').map(x => +x);
    var _M2 = +input[s++];
    var M2 = input[s++].split(' ').map(x => +x);
    var [case1, M1_set] = matching(N, M1);
    var [case2, M2_set] = matching(N, M2);
    var valid = Array(_N).fill(false);
    for (var i of M2_set) valid[i[0]] = true;
    var cnt_P1nP2 = Array(11001).fill(0);
    for (var i = 0; i < M1_set.length; i++) {
        var [start, end] = M1_set[i];
        n_matching(N, end);
    }
    var max = -1;
    var case3 = undefined;
    for (var i = 1; i <= 11000; i++) {
        if (cnt_P1nP2[i] > max) {
            max = cnt_P1nP2[i];
            case3 = i;
        }
    }
    ans += [case1, case2, case3, max].join(' ')+'\n';
}
console.log(ans);


function matching(T, M) {
    var matchSet = [];
    var cnt = 0;
    for (var i = 0; i < T.length; i++) {
        var bol = true;
        var k = i;
        for (var j = 0; j < M.length; j++) {
            var recent = 0;
            while (recent < M[j] && k < T.length) {
                recent += T[k];
                k++;
            }
            if (recent !== M[j]) {
                bol = false;
                break;
            }
        }
        if (bol) {
            cnt++;
            matchSet.push([i, k]);
        }
    }
    return [cnt, matchSet];
}

function n_matching(T, start) {
    var recent = 0;
    for (var i = start; i < T.length; i++) {
        recent += T[i];
        if (valid[i+1]) cnt_P1nP2[recent]++;
    }
}