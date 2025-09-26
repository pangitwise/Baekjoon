var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var p = 10_0000_0007n;
var ans = [];
for (var t = 1; t < T+1; t++) {
    [_p, c, n] = input[t].split(' ').map(x => BigInt(x));
    var [_c, _n] = [Number(c), Number(n)];
    var q = p+1n-_p;
    var prob = Array(_n+1);
    var E = Array(_n+1);
    prob[0] = 1n;
    E[0] = 0n;
    var slide_prob = 0n;
    var slide_E = 0n;
    if (n >= c) {
        var last1 = power(q, c-1n, p);
        var last2 = power(q, c-1n, p)*_p%p;
    }
    var i = 1;
    while (i < _n+1) {
        slide_prob *= q;
        slide_prob %= p;
        if (i >= _c) {
            slide_prob -= prob[i-_c]*last2;
            slide_prob += prob[i-_c]*last1;
        }
        slide_prob += _p*prob[i-1];
        slide_prob = (slide_prob%p+p)%p;
        prob[i] = slide_prob;
        slide_E += prob[i];
        slide_E = slide_E%p;
        E[i] = slide_E;
        if (i >= _c) {
            slide_prob -= prob[i-_c]*last1%p;
        }
        i++;
    }
    for (var i = 1; i < E.length; i++) {
        ans.push(E[i]);
    }
}
console.log(ans.join('\n'));


function power(a, b, m) {
    var list = [];
    var k = 0n;
    var v = a%m;
    while ((1n<<k) <= b) {
        list.push(v);
        v = (list.at(-1)**2n)%m;
        k++;
    }
    var cnt = 0n;
    var k = list.length-1;
    var result = 1n;
    while (cnt < b) {
        if (cnt + (1n<<BigInt(k)) <= b) {
            cnt += 1n<<BigInt(k);
            result *= list[k];
            result %= m;
        }
        k--;
    }
    result %= m;
    return result;
}

// q p
// pq -> q p

// 1
// 1/2 1/2  


// 1/4