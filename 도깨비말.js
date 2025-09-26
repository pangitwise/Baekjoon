var input = require('fs').readFileSync(0).toString().trim().split('\n');
var ans = '';
var vowels = ['a', 'e', 'i', 'o', 'u'];
for (var word of input) {
    if (word === '#') break;
    var w = word.trim().split('');
    for (var i = 0; i < w.length; i++) {
        if (vowels.includes(w[0])) {
            break;
        } else {
            w.push(w.shift());
        }
    }
    ans += `${w.join('')}ay\n`;
}
console.log(ans);