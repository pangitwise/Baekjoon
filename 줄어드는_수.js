var N = +require('fs').readFileSync(0).toString().trim();
var dec = [];
backTracking('', 0);
dec.sort((a,b) => a-b);
var ans = N <= dec.length ? dec[N-1] : -1;
console.log(ans);

function backTracking(rec, dep) {
    for (var i = dep; i <= 9; i++) {
        backTracking(rec+i, i+1);
    }
    if (rec.length) dec.push(+rec.split('').reverse().join(''));
}