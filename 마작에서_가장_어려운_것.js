var [P3, P4, P0] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);
var limit = Math.floor((P3+P0)/3);
var bol = false;
for (var i = 0; i <= limit; i++) {
    var k3 = i*3;
    if (k3 < P3) continue;
    var remain3 = k3-P3;
    if (P0-remain3 < 0) continue;
    var remain4 = P4+(P0-remain3);
    if (remain4%4 !== 0) continue;
    var t4 = remain4/4;
    console.log(i, t4);
    bol = true;
    break;
}
if (!bol) console.log(-1);
