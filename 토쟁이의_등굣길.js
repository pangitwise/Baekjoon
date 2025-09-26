var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [w, h] = input[0].split(' ').map(x => +x);
var [x, y] = input[1].split(' ').map(x => +x);
var pascalTraingle = Array.from({length: 401}, (v, k) => Array(k+1));
pascalTraingle[0][0] = 1;
for (var i = 1; i < 401; i++) {
    for (var j = 0; j < i+1; j++) {
        pascalTraingle[i][j] = (pascalTraingle[i-1][j-1] || 0) + (pascalTraingle[i-1][j] || 0);
        pascalTraingle[i][j] %= 100_0007;
    }
}
// 중복조합: x_H_y-1
var toToast = pascalTraingle[x+y-2][y-1];
var toSchool = pascalTraingle[w+h-x-y][h-y];
console.log(toToast*toSchool%1000007);