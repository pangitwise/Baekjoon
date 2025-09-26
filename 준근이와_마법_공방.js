var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, M] = input[0].split(' ').map(x => +x);
var A = input[1].split(' ').map(x => +x);
var p = 10_0000_0007;
A.sort((a,b) => b-a);
if (A[0] > 0 && A[1] > 0) {
    var hi = A[0];
    var lo = A[1];
    var i = 0;
    while (i < N) {
        var next = (lo+hi)%p;
        lo = hi;
        hi = next;
        i++;
    }
    console.log(hi);
} else if (A[0] === 0 || A[0] < 0 && A[1] < 0) {
    var ans = (A[0]+A[1]+p)%p;
    console.log(ans);
} else {
    var hi = A[0];
    var lo = A[1];
    var last;
    var i = 0;
    var bol = false;
    while (i < N) {
        var next = (lo+hi);
        last = (next+p)%p;
        if (next <= 0) {
            lo = next;
        } else {
            if (!bol) {
                lo = next;
                bol = true;
            } else {
                next %= p;
                lo = hi;
                hi = next;
            }
        }
        i++;
    }
    console.log(last);
}

// 2 0
// 2 2
// 4 2
// 6 4
// 10 6