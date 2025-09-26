var n = +require('fs').readFileSync(0).toString().trim();

var N = 1000000;
var prime = Array(N+1).fill(true);
prime[0] = false;
prime[1] = false;
var L = Math.floor(Math.sqrt(N));
var primeList = [];
for (var i = 2; i <= L; i++) {
    if (prime[i]) {
        primeList.push(i);
        for (var j = i*2; j <= N; j += i) {
            prime[j] = false;
        }
    }
}
for (var i = L+1; i <= N; i++) {
    if (prime[i]) primeList.push(i);
}

var phi = Array(N+1);
for (var i of primeList) {
    for (var j = i; j <= N; j *= i) {
        phi[j] = j-j/i;
    }
}
dfs(1, 0, 1);

var ans = -1;
for (var i = 1; i <= 1000000; i++) {
    if (i*phi[i] === n) {
        ans = i;
        break;
    }
}
console.log(ans);


function dfs(x, idx, v) {
    phi[x] = v;
    for (var i = idx; i < primeList.length; i++) {
        var p = primeList[i];
        if (x*p > N) break;
        for (var j = p; ; j *= p) {
            if (x*j > N) break;
            dfs(x*j, i+1, v*phi[j]);
        }
    }
}