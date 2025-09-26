var K = +require('fs').readFileSync(0).toString().trim();
var cnt = 0;
var prime = Array(10000000).fill(true);
prime[0] = false;
prime[1] = false;
for (var i = 2; i <= Math.sqrt(10000000); i++) {
    if (prime[i]) {
        cnt++;
        if (cnt === K) {
            console.log(i);
            break;
        }
        for (var j = i*2; j <= 10000000; j += i) {
            prime[j] = false;
        }
    }
}
if (cnt < K) {
    for (var i = Math.ceil(Math.sqrt(10000000)); i <= 10000000; i++) {
        if (prime[i]) {
            cnt++;
            if (cnt === K) {
                console.log(i);
                break;
            }
        }
    }
}

