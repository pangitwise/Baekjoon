var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';

for (var c = 0; c < T; c++) {
    var [M, N, K] = input[s++].split(' ').map(x => +x);
    var f = input[s++].split(' ').map(x => +x);
    var total = Array(M+1).fill(0);
    var cnt = Array(M+1).fill(0);
    var visited = Array(N).fill(false);
    var loc = Array.from({length:M+1}, _ => []);
    var stackFile = [];
    for (var i of f) total[i]++;
    var [l, r] = [1, Math.min(M, K)];
    // 그리디 + 스택 + 용량-위치-방문 처리리
    var i = 0;
    var j = 0;
    var size = 0;
    while (j < N) {
        if (size === K) {
            while (visited[i]) i++;
            visited[i] = 2;
            stackFile.push([f[i], i]);
            size--;
        }
        var num = f[j];
        [l, r, size] = emailFiling(l, r, size, num, j);
        j++;
    }
    // 남은 파일 처리
    while (stackFile.length > 0 || size > 0) {
        if (size === K) break;
        if (size < K) {
            var [num, idx] = stackFile.pop();
            visited[idx] = false;
            [l, r, size] = emailFiling(l, r, size, num, idx);
        }
    }
    !size ? ans += 'YES\n' : ans += 'NO\n';
}
console.log(ans);


function emailFiling(l, r, size, num, idx) {
    if (l <= num && num <= r) {
        cnt[num]++;
        visited[idx] = 1;
        while (total[l] === cnt[l] && l <= r) {
            l++;
            if (r < M) {
                r++;
                while (loc[r].length > 0) {
                    var idx = loc[r].pop();
                    if (!visited[idx]) {
                        visited[idx] = 1;
                        cnt[r]++;
                        size--;
                    }
                }
            }
        }
    } else {
        loc[num].push(j);
        size++;
    }
    return [l, r, size];
}