var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [n, m] = input[0].split(' ').map(x => +x);
var grid = [];
for (var i = 0; i < n; i++) {
    grid.push(input[i+1].trim().split(''));
}
var dx = [-1, 1, 0, 0];
var dy = [0, 0, -1, 1];
for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
        if (grid[i][j] === '#') continue;
        var bol = true;
        for (var k = 0; k < 4; k++) {
            var nx = i+dx[k];
            var ny = j+dy[k];
            if (0 <= nx && nx < n && 0 <= ny && ny < m) {
                if (grid[nx][ny] === 'E') {
                    bol = false;
                    break;
                }
            }
        }
        if (bol) grid[i][j] = 'E';
    }
}
console.log(grid.map(x => x.join('')).join('\n'));