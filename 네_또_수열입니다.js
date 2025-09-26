var [N, K] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);
if (N === 1) {
    console.log(Array(K).fill(1).join(' '));
} else if (N === 2 && K === 1) {
    console.log(1, 2);
} else {
    console.log(-1);
}