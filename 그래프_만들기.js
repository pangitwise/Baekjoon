var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
if (N === 1) {
    console.log(0);
} else if (N === 2) {
    console.log(+input[1]*2);
} else {
    var list = [0, ...input[1].split(' ').map(x => +x)];
    var table = Array.from({length:N}, _ => Array(N).fill(-1));
    for (var i = 1; i <= N-1; i++) {
        table[i][1] = list[i];
    }
    // i: 남은 정점의 개수
    // j: 현재 부모가 없는 정점의 개수
    // k: 남은 정점 중 하나에 현재 부모가 없는 정점을 몇 개 매칭시킬 것인가가
    for (var i = 2; i < N; i++) {
        for (var j = 1; j < N; j++) {
            if (i+j > N) break;
            for (var k = 0; k < j; k++) {
                var v = list[k+1];
                table[j][i] = Math.max(table[j][i], v+table[j-k+1][i-1]);
            }
        }
    }
    console.log(table[1][N-1]+list[1]);
}