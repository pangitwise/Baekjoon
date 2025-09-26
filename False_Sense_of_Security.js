var input = require('fs').readFileSync(0).toString().trim().split('\n');
var map1 = new Map([
    ['A', '.-'],
    ['B', '-...'],
    ['C', '-.-.'],
    ['D', '-..'],
    ['E', '.'],
    ['F', '..-.'],
    ['G', '--.'],
    ['H', '....'],
    ['I', '..'],
    ['J', '.---'],
    ['K', '-.-'],
    ['L', '.-..'],
    ['M', '--'],
    ['N', '-.'],
    ['O', '---'],
    ['P', '.--.'],
    ['Q', '--.-'],
    ['R', '.-.'],
    ['S', '...'],
    ['T', '-'],
    ['U', '..-'],
    ['V', '...-'],
    ['W', '.--'],
    ['X', '-..-'],
    ['Y', '-.--'],
    ['Z', '--..'],
    ['_', '..--'],
    [',', '.-.-'],
    ['.', '---.'],
    ['?', '----'],
]
);
var map2 = new Map();
for (var i of map1.entries()) {
    var [key, value] = i;
    map2.set(value, key);
}
var ans = '';
for (var i = 0; i < input.length; i++) {
    var str = input[i].trim();
    var number = [];
    var morse = '';
    for (var j of str) {
        number.push(map1.get(j).length);
        morse += map1.get(j);
    }
    number.reverse();
    var decode = '';
    var j = 0;
    for (var k of number) {
        var part = morse.slice(j, j+k);
        decode += map2.get(part);
        j += k;
    }
    ans += decode+'\n';
}
console.log(ans);