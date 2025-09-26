var K = +require('fs').readFileSync(0).toString().trim();
var list = Array(10).fill('');
var ans = 'Impossible';
var esc = false;
for (var i = 1; i < 3000; i++) {
    for (var j = 1; j < 10; j++) {
        list[j] += j;
        var num = BigInt(list[j]);
        if (num%BigInt(K) === 0n) {
            ans = [j, i].join(' ');
            esc = true;
            break;
        }
    }
    if (esc) break;
}
console.log(ans);