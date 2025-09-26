var input = require('fs').readFileSync(0).toString().trim().split('\n');
var  [N, K, M] = input[0].split(' ').map(x => +x);
M = BigInt(M);
var matrix = Array.from({length:N}, _ => Array(N).fill(0n));
for (var i = 1; i < N+1; i++) {
    var arr = input[i].trim().split('');
    for (var j = 0; j < N; j++) {
        if (arr[j] === 'Y') {
            matrix[i-1][j] = 1n;
        }
    }
}
if (K === 1) {
    console.log(0);
} else {
    var list = [matrix];
    for (var i = 2; i <= K; i *= 2) {
        list.push(matrixDouble(list.at(-1), list.at(-1)));
    }
    var res = div_and_conq(K-1);
    var ans = 0n;
    for (var i = 0; i < N; i++) {
        ans += res[i][i];
    }
    ans %= M;
    console.log(String(ans));
}

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
    var tmp = Array.from({length:N}, _ => Array(N).fill(0n));
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            tmp[i][j] = matrix1[i][j]+matrix2[i][j];
            tmp[i][j] %= M;
        }
    }
    return tmp;
}

function matrixDouble(matrix1, matrix2) {
    var tmp = Array.from({length:N}, _ => Array(N).fill(0n));
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            for (var k = 0; k < N; k++) {
                tmp[i][j] += matrix1[i][k]*matrix2[k][j];
                tmp[i][j] %= M;
            }
        }
    }
    return tmp;
}

function matrixPower(k) {
    var pow = 0;
    var tmp = Array.from({length:N}, (v, k) => Array.from({length:N}, (_v, _k) => k === _k ? 1n : 0n));
    for (var i = list.length-1; i >= 0; i--) {
        if (pow+(2**i) <= k) {
            tmp = matrixDouble(tmp, list[i]);
            pow += 2**i;
        }
    }
    return tmp;
}

// dp[i] = dp[i-1]

// 0 2 3 2 5

// A^1 + A^2 + A^3 + A^4 + ...

// A^1 + A^2 + A^(1+2) + A^4 + A^(1+4) + A^(2+4) + A^(1+2+4)

// A + A^2 + A^4 + A^8 + ... = P
// 2 4 8 16
// 3 5 9 17



// AP
// A^3*P
