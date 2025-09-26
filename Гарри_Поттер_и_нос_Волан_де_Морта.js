var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [n, m] = input[s++].split(' ').map(x => +x);
var face = [];
for (var i = 0; i < n; i++) {
    face.push(input[s++].trim().split(''));
}
var ans = 0;
for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
        if (face[i][j] === '.') {
            if (face[i][j+1] === '.') ans++;
            if (face[i+1] && face[i+1][j] === '.') ans++;
        }
    }
}
console.log(ans);