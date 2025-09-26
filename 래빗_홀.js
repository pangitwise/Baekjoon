var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var N = +input[s++];
    var xor = input[s++].split(' ').map(x => +x).reduce((pre, cur) => pre^cur);
    if (N&1) {
        xor === 0 ? ans += 'tweede\n' : ans += 'eerste\n' ;
    } else {
        xor === 1 ? ans += 'tweede\n' : ans += 'eerste\n';
    }
}
console.log(ans)
// 0: 0
// 1: 1
// 2: 2..

// 0 0: 1
// 0 1: 0
// 0 2: 0
// 0 3..: 0

// 1 1: 1
// 1 2: 2
// 1 3: 3
// 1 4:

// 2 2: 1
// 2 3: 2

// 3 3: 1...


// 0 0 0: 0
// 0 0 1: 1
// 0 0 2: 2
// 0 0 3: ...3

// 0 1 1: 0
// 0 1 2: k
// 1 1 1: 1
// 1 1 2: 2
// 1 1 3: k

// 1 1 1 4: k
// 1 1 3 4 : 0
// 1 2 3 4: 1

// 1 1 1 1 1: 1
// 1 1 1 1 1 2: 1
// 1 1 1 1 2 2: 1
