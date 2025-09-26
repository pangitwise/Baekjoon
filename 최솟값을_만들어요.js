var N = +require('fs').readFileSync(0).toString().trim();
var cntBit = Array.from({length:17}, (v, k) => Array(1<<(k+1)).fill(0));
for (var i = 0; i < N-1; i++) {
    var conv = 0;
    for (var [j, k] = [16, 0]; j >= 0; j--, k++) {
        if (i&(1<<j)) conv += 1<<k;
        cntBit[k][conv]++;
    }
}
var ans = [N-1];
var rec = N-1;
for (var i = 0; i < N-1; i++) {
    var conv = 0;
    var next = 0;
    for (var [j, k] = [16, 0]; j >= 0; j--, k++) {
        if (rec&(1<<j)) {
            conv += 1<<k;
            next += 1<<j;
            if (cntBit[k][conv]) {
                cntBit[k][conv]--;
            } else {
                conv -= 1<<k;
                next -= 1<<j;
                cntBit[k][conv]--;
            }
        } else {
            if (cntBit[k][conv]) {
                cntBit[k][conv]--;
            } else {
                conv += 1<<k;
                next += 1<<j;
                cntBit[k][conv]--;
            }
        }
    }
    ans.push(next);
    rec = next;
}
console.log(ans.join(' '));
// 5

// 000
// 001
// 010
// 011
// 100
// 101
// 110

// 000 100 110 101 001 011 010
// 16

// 100 110 101 011 010 001 000
// 15

// 1000 0000 0001 0011 0010 0110 0111 0101 0100

// 111 110 100 101 001 000 010 011


// 1001 1000 0000 0001 0011 0010 0110 0111 0101 0100
// 9 8 0 1 3 2 6 7 5 4


// 1010 1000 1001 0001 0011 0010 0110 0111 0101 0100 0000


// 1010 1000 1001 0001 0000 0010 0011 0111 0110 0100 0101
// 10 8 9 1 3 2 6 7 5 4 0

// 1011 1010 1000 1001 0001 0000 0010 0011 0111 0110 0100 0101
// 11 10 8 9 1 0 2 3 7 6 4 5

// 0 
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11 -> 1010

// 4 0 1 3 2

// 5 4 0 1 3 2

// 1111111111111111