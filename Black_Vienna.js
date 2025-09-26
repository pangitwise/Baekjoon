const { verify } = require('crypto');

var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var invest = [];
for (var i = 1; i < N+1; i++) {
    invest.push(input[i].split(' ').map((v, idx) => idx ? +v : v));
}
invest.sort((a,b) => a[1]-b[1]);

// 0000: 미정
// 0001: player 1
// 0010: player 2
// 0100: not player 1
// 1000: not player 2
// 1100: not player 1 and 2
var dp = new Set([0n]);
var p1 = Array.from({length:26}, (v, k) => 1n<<(BigInt(k)*4n));
var p2 = Array.from({length:26}, (v, k) => 2n<<(BigInt(k)*4n));
var notP1 = Array.from({length:26}, (v, k) => 4n<<(BigInt(k)*4n));
var notP2 = Array.from({length:26}, (v, k) => 8n<<(BigInt(k)*4n));
var notPA = Array.from({length:26}, (v, k) => 12n<<(BigInt(k)*4n));
for (var i = 0; i < N; i++) {
    var [seq, num, reply] = invest[i];
    seq = seq.split('').map(x => x.charCodeAt(0)-65);
    var [a, b] = seq;
    var sz = dp.size;
    var j = 0;
    for (var k of dp) {
        if (j === sz) break;
        dp.delete(k);
        update(k, a, b, num, reply);
        j++;
    }
}

var map = new Map();
for (var i of dp) {
    var nec = [];
    for (var k = 0; k < 26; k++) {
        if ((i&notPA[k]) === notPA[k]) nec.push(k);
    }
    if (nec.length > 3) {
        dp.delete(i);
    } else {
        map.set(i, nec);
    }
}

var vienna = [];
backTracking([], 0, 0);
var ans = 0;
for (var i = 0; i < vienna.length; i++) {
    for (var j of map.entries()) {
        var [k, nec] = j;
        if (nec.every(x => vienna[i].includes(x)) && vienna[i].every(x => !(k&p1[x] || k&p2[x]))) {
            ans++;
            break;
        }
    }
}
console.log(ans);



function update(k, a, b, num, reply) {
    if (reply === 0) {
        if (num === 1) {
            if (k&p1[a] || k&p1[b]) return;
            var next = k|notP1[a]|notP1[b];
            dp.add(next);
        } else {
            if (k&p2[a] || k&p2[b]) return;
            var next = k|notP2[a]|notP2[b];
            dp.add(next);
        }
    } else if (reply === 1) {
        if (num === 1) {
            if (!(k&p2[a] || k&notP1[a] || k&p1[b])) {
                var next = k|p1[a]|notP1[b];
                dp.add(next);
            }
            if (!(k&p2[b] || k&notP1[b] || k&p1[a])) {
                var next = k|notP1[a]|p1[b];
                dp.add(next);
            }
        } else {
            if (!(k&p1[a] || k&notP2[a] || k&p2[b])) {
                var next = k|p2[a]|notP2[b];
                dp.add(next);
            }
            if (!(k&p1[b] || k&notP2[b] || k&p2[a])) {
                var next = k|notP2[a]|p2[b];
                dp.add(next);
            }
        }
    } else if (reply === 2) {
        if (num === 1) {
            if (k&p2[a] || k&p2[b] || k&notP1[a] || k&notP1[b]) return;
            var next = k|p1[a]|p1[b];
            dp.add(next);
        } else {
            if (k&p1[a] || k&p1[b] || k&notP2[a] || k&notP2[b]) return;
            var next = k|p2[a]|p2[b];
            dp.add(next);
        }
    }
}

function backTracking(arr, last, dep) {
    if (dep === 3) {
        vienna.push(arr.join(' '));
        vienna[vienna.length-1] = vienna.at(-1).split(' ').map(x => +x);
        return;
    }
    for (var i = last; i < 26; i++) {
        if (!arr.includes(i)) {
            arr.push(i);
            backTracking(arr, i+1, dep+1);
            arr.pop();
        }
    }
}