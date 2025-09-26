var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [L, C] = input[0].split(' ').map(x => +x);
var valid = Array(26).fill(false);
var vowel = ['a', 'e', 'i', 'o', 'u'];
var list = input[1].trim.split(' ');
for (var i of list) {
    var num = i.charCodeat()-97;
    valid[num] = true;
}
list.sort((a,b) => a.localeCompare(b));

var ans = [];


function backTracking(cur, dep) {
    if (cur === 4) {
        var cnt = 0;
    }
}