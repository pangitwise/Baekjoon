var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, P] = input[0].split(' ').map(x => +x);
var a = input[1].split(' ').map(x => +x%P).reverse();
var coeff = Array(P).fill(0);
coeff[0] = a[0];
for (var i = 1; i < P; i++) {
    for (var j = i; j <= N; j += P-1) {
        coeff[i] += a[j];
        if (coeff[i] >= P) coeff[i] %= P;
    }
}
var ans = '';
for (var i = 0; i < P; i++) {
    var total = coeff[0];
    var recent = 1;
    for (j = 1; j < P; j++) {
        recent *= i;
        if (recent >= P) recent %= P;
        total += coeff[j]*recent;
    }
    total %= P;
    ans += total+'\n';
}
console.log(ans);