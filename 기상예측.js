var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, m, a, b] = input[0].split(' ').map(x => +x);
var matrix = [];
for (var i = 1; i < n+1; i++) {
    matrix.push(input[i].split(' ').map(x => +x));
}
for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
        matrix[i][j] = (j > 0 ? matrix[i][j-1] : 0) + matrix[i][j];
    }
}
var combi = [];
verticalDivide([], 0);
var ans = Infinity;
binarySearch();
console.log(ans);


function verticalDivide(arr, dep) {
    if (dep === b) {
        arr.push(m-1);
        combi.push(arr.flat());
        arr.pop();
        return;
    }
    for (var i = 0; i < m-1; i++) {
        if (!arr.includes(i) && i > (arr.at(-1) || -1)) {
            arr.push(i);
            verticalDivide(arr, dep+1);
            arr.pop();
        }
    }
}

function binarySearch() {
    var start = -1;
    var end = n*m*100000+1;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        if(sweeping(mid)) {
            end = mid;
            ans = Math.min(ans, mid);
        } else {
            start = mid;
        }
    }
}

function sweeping(limit) {
    loop:
    for (var i = 0; i < combi.length; i++) {
        var div_cnt = 0;
        var sect = combi[i];
        var sum = Array(b+1).fill(0);
        var j = 0;
        while (j < n) {
            var tmp = [];
            for (var k = 0; k < sect.length; k++) {
                var l = sect[k-1];
                var r = sect[k];
                var v = matrix[j][r] - (matrix[j][l] || 0);
                tmp.push(v);
            }
            for (var p = 0; p < tmp.length; p++) sum[p] += tmp[p];
            // 구간 중 하나라도 제한값을 초과하면 분할
            var max = Math.max(...sum);
            if (max > limit) {
                sum = tmp;
                div_cnt++;
                // 분할했는데도 제한값 초과 시 중단
                var isValid = Math.max(...tmp);
                if (isValid > limit) continue loop;
            }
            j++;
        }
        // 분할 횟수가 a 이하인 경우 참
        if (div_cnt <= a) {
            return true;
        }
    }
    return false;
}