var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, B] = input[0].split(' ').map(x => +x);
var matrix = [];
for (var i = 1; i < N+1; i++) {
    matrix.push(input[i].split(' ').map(x => +x));
}
var list = [matrix];
for (var i = 2; i <= B; i *= 2) {
    list.push(matrixDouble(list.at(-1), list.at(-1)));
}
var ans = div_and_conq(B);
console.log(ans.map(x => x.join(' ')).join('\n'));

function div_and_conq(B) {
    if (B === 1) return matrixPower(1);
    if (B%2 === 0) {
        var half = div_and_conq(B/2);
        return matrixPlus(half, matrixDouble(matrixPower(B/2), half));
    } else {
        var solo = matrixPower(B);
        var half = div_and_conq((B-1)/2);
        var next = matrixPlus(half, matrixDouble(matrixPower((B-1)/2), half));
        return matrixPlus(next, solo);
    }
}

function matrixPlus(matrix1, matrix2) {
    var tmp = Array.from({length:N}, _ => Array(N).fill(0));
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            tmp[i][j] = matrix1[i][j]+matrix2[i][j];
            tmp[i][j] %= 1000;
        }
    }
    return tmp;
}

function matrixDouble(matrix1, matrix2) {
    var tmp = Array.from({length:N}, _ => Array(N).fill(0));
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            for (var k = 0; k < N; k++) {
                tmp[i][j] += matrix1[i][k]*matrix2[k][j];
                tmp[i][j] %= 1000;
            }
        }
    }
    return tmp;
}

function matrixPower(k) {
    var pow = 0;
    var tmp = Array.from({length:N}, (v, k) => Array.from({length:N}, (_v, _k) => k === _k ? 1 : 0));
    for (var i = list.length-1; i >= 0; i--) {
        if (pow+(2**i) <= k) {
            tmp = matrixDouble(tmp, list[i]);
            pow += 2**i;
        }
    }
    return tmp;
}

// a1...a5 + a5(a1+...+a5) + a11

// a1..a5 = a1+a2+a3(a1+a2)

// a1.. a50 + a50(a1..a50)

// a1...a25 + a25(a1...a25) + a50(a1...a25 + a25(a1...a25))

// a1..a2

// 