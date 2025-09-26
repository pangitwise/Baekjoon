var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, R] = input[0].split(' ').map(x => +x);
var cnt = 0;
for (var i = 1; i < N+1; i++) {
    var [x1, y1, x2, y2, x3, y3, x4, y4] = input[i].split(' ').map(x => +x);
    var mid_x = (x1+x3)/2;
    var mid_y = (y1+y3)/2;
    var r = Math.max(dist(x1, y1, mid_x, mid_y), dist(x2, y2, mid_x, mid_y));
    var K = dist(0, 0, mid_x, mid_y);
    if (R+r >= K) cnt++;
}
console.log(cnt);

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1-x2)**2+(y1-y2)**2);
}

// x2+ y2 = r2 

// x^2 - 2ax + a^2 + b^2 - 2by + y^2 = k^2

// 2ax + 2by + a^2+b^2 = r^2-k^2
// 2ax + 2by = r^2-k^2-a^2-b^2
// 2by = -2ax + T
// y = -a/b * x + T
// (x-a)^2+(y-b)^2 = k^2