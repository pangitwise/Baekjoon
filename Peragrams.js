var w = require('fs').readFileSync(0).toString().trim();
var len = w.length;
var cnt = Array(26).fill(0);
for (var i of w) {
    var num = i.charCodeAt()-97;
    cnt[num]++;
}
var odd = 0;
var even = 0;
for (var i = 0; i < 26; i++) {
    cnt[i]&1 ? odd++ : even++;
}
var remove = 0;
for (var i = 0; i < 26; i++) {
    if (len&1) {
        if (odd === 1) break;
        odd--;
        even++;
        remove++;
    } else {
        if (odd === 0) break;
        odd--;
        even++;
        remove++;
    }
    len--;
}
console.log(remove);