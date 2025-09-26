var [p, t] = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = 0;
var prefix = Array(t.length).fill(0);
for (var j = 0; j < 26; j++) {
    for (var i = 0; i < t.length; i++) {
        var num = t.charCodeAt(i)-97;
        if (j === num) prefix[i]++;
    }
    prefixing(prefix);
    for (var i = 0; i < p.length; i++) {
        var num = p.charCodeAt(i)-97;
        var end = t.length-p.length+i
        if (j === num) ans += prefix[end]-(prefix[i-1] || 0);
    }
    prefix.fill(0);
}
console.log(ans);


function prefixing(arr) {
    for (var i = 1; i < arr.length; i++) {
        arr[i] += arr[i-1];
    }
}