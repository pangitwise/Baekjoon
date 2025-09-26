var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [w, h] = input[0].split(' ').map(x => +x);
var [p, q] = input[1].split(' ').map(x => +x);
var t = +input[2];
// x좌표와 y좌표를 따로 구하면 됨
var x = getCoord(w, p, t);
var y = getCoord(h, q, t);
console.log(x, y);

function getCoord(wh, pq, t) {
    var k = (t+pq)%(2*wh);
    if (k > wh) k = wh*2-k;
    return k;
}

