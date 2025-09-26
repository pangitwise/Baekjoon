var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, M] = input[s++].split(' ').map(x => +x);
var spotty = Array(N);
var plain = Array(N);
for (var i = 0; i < N; i++) {
    var cow = input[s++].trim();
    spotty[i] = cow;
}
for (var i = 0; i < N; i++) {
    var cow = input[s++].trim();
    plain[i] = cow;
}
var cnt = 0;
for (var i = 0; i < M; i++) {
    for (var j = i+1; j < M; j++) {
        for (var k = j+1; k < M; k++) {
            var genomSet = new Set();
            // 점박이소 유전자 저장
            for (var l = 0; l < N; l++) {
                var gen = spotty[l][i]+spotty[l][j]+spotty[l][k];
                genomSet.add(gen);
            }
            // 일반소 유전자와 비교
            var bol = true;
            for (var l = 0; l < N; l++) {
                var gen = plain[l][i]+plain[l][j]+plain[l][k];
                if (genomSet.has(gen)) {
                    bol = false;
                    break;
                }
            }
            if (bol) cnt++;
        }
    }
}
console.log(cnt);