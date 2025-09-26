var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var N = +input[s++];
var ans = '';
var map = new Map([['T', 9], ['J', 10], ['Q', 11], ['K', 12]]);
var patMap = new Map([['H', 0], ['C', 1], ['D', 2], ['S', 3]]);
for (var i = 0; i <= 9; i++) map.set(String(i), i-1);
var ord = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
for (var i = 0; i < N; i++) {
    var cards = input[s++].trim().split(' ');
    var [num, pattern] = cards.shift().split('');
    var d = compare3(...cards);
    var idx = (map.get(num)+d)%13;
    ans += `${ord[idx]}${pattern}\n`;
}
console.log(ans);

function compare(a, b) {
    var [na, pa] = a.split('');
    var [nb, pb] = b.split('');
    pa = patMap.get(pa);
    pb = patMap.get(pb);
    if (pa !== pb) {
        return pa-pb;
    } else {
        na = map.get(na);
        nb = map.get(nb);
        return na-nb;
    }
}

function compare3(a, b, c) {
    if (compare(a,b) < 0) {
        if (compare(b,c) < 0){
            // a b c: z1 z2 z3
            return 1;
        } else {
            if (compare(a,c) < 0) {
                // a c b: z1 z3 z2
                return 2;
            } else {
                // c a b: z2 z3 z1
                return 4;
            }
        }
    } else {
        if (compare(a,c) < 0) {
            // b a c: z2 z1 z3
            return 3;
        } else {
            if (compare(b,c) < 0) {
                // b c a: z3 z1 z2
                return 5;
            } else {
                // c b a: z3 z2 z1
                return 6;
            }
        }
    }
}