const { pathToFileURL } = require('url');

var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];

var pytha = [];
var frac = new Set();
for (var x = 2; x <= 1000; x++) {
    for (var y = 1; y < x; y++) {
        var a = 2*x*y;
        var b = x**2-y**2;
        var GCD = gcd(a,b);
        var pair = [a,b].sort((a,b)=>a-b);
        var numer = pair[0]/GCD;
        var denom = pair[1]/GCD;
        var thisFrac = `${numer}/${denom}`;
        if (!frac.has(thisFrac)) {
            pytha.push(pair);
            frac.add(thisFrac)
        }
    }
}

pytha.sort(function(a,b) {
    var sum_a = a[0]+a[1];
    var sum_b = b[0]+b[1];
    return sum_a-sum_b;
});

var arr = Array(10**6+1).fill(0);
var rec = 0;
for (var i = 0; i < pytha.length && rec <= 100_0000; i++) {
    var [w, h] = pytha[i];
    rec += 2*(w+h);
    if (rec > 100_0000) break;
    arr[rec]++
}

for (var i = 1; i < arr.length; i++) arr[i] += arr[i-1];

var ans = '';
for (var i = 0; i < T; i++) {
    var L = +input[s++];
    ans += arr[L]+'\n';
}
console.log(ans);


function gcd(a,b) {
    var r = a%b;
    if (!r) return b;
    return gcd(b,r);
}