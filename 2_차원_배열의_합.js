var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, M] = input[s++].split(' ').map(x => +x);
var matrix = [];
for (var j = 0; j < N; j++) {
    matrix.push(input[s++].split(' ').map(x => +x));
}
for (var i = 0; i < N; i++) {
    for (var j = 0; j < M; j++) {
        matrix[i][j] += (i > 0 ? matrix[i-1][j] : 0) + (j > 0 ? matrix[i][j-1] : 0) - (i > 0 && j > 0 ? matrix[i-1][j-1] : 0);
    }
}
var ans = '';
var K = +input[s++];
for (var t = 0; t < K; t++) {
    var [i, j, x, y] = input[s++].split(' ').map(x => +x);
    var v = matrix[x-1][y-1] - (i-2 >= 0 ? matrix[i-2][y-1] : 0) - (j-2 >= 0 ? matrix[x-1][j-2] : 0) + (i-2 >= 0 && j-2 >= 0 ? matrix[i-2][j-2] : 0);
    ans += v+'\n';
}
console.log(ans);