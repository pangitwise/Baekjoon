var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var [R, C] = input[1].split(' ').map(x => +x);
if (N === 3) {
    if (R === 2 && C === 2) {
        console.log(1);
    } else {
        console.log(4);
    }
} else {
    if (N%2) {
        if ((R+C)%2) {
            console.log(Math.floor(N*N/2));
        } else {
            console.log(Math.ceil(N*N/2));
        }
    } else {
        console.log(N*N/2);
    }
}