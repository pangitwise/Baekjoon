var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var S = input[1].trim();
var rsp = ['R', 'S', 'P'];
var min = Infinity;
for (var i = 0; i < 3; i++) {
    var recent = rsp[i];
    var cnt = 0;
    var lastCnt = 0;
    for (var j = 0; j < N; j++) {
        if (recent !== S[j]) {
            cnt++;
        } else {
            if (recent === 'R') {
                if (i === 1) {
                    lastCnt = cnt+(N-j-1);
                }
                recent = 'S';
            } else if (recent === 'S') {
                if (i === 2) {
                    lastCnt = cnt+(N-j-1);
                }
                recent = 'P';
            } else if (recent === 'P') {
                if (i === 0) {
                    lastCnt = cnt+(N-j-1);
                }
                recent = 'R';
            }
        }
    }
    min = Math.min(min, lastCnt);
}
console.log(min);

// SPR

// SRPSRPRSPRSRP

// R S P R