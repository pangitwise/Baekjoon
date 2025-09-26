var input = require('fs').readFileSync(0).toString().trim().split('\n');
var c5_font = [
    ['.***..', '*...*.', '*****.', '*...*.', '*...*.'],//A
    ['****..', '*...*.', '****..', '*...*.', '****..'],//B
    ['.****.', '*...*.', '*.....', '*.....', '.****.'],//C
    ['****..', '*...*.', '*...*.', '*...*.', '****..'],//D
    ['*****.', '*.....', '***...', '*.....', '*****.'],//E
    ['*****.', '*.....', '***...', '*.....', '*.....'],//F
    ['.****.', '*.....', '*..**.', '*...*.', '.***..'],//G
    ['*...*.', '*...*.', '*****.', '*...*.', '*...*.'],//H
    ['*****.', '..*...', '..*...', '..*...', '*****.'],//I
    ['..***.', '...*..', '...*..', '*..*..', '.**...'],//J
    ['*...*.', '*..*..', '***...', '*..*..', '*...*.'],//K
    ['*.....', '*.....', '*.....', '*.....', '*****.'],//L
    ['*...*.', '**.**.', '*.*.*.', '*...*.', '*...*.'],//M
    ['*...*.', '**..*.', '*.*.*.', '*..**.', '*...*.'],//N
    ['.***..', '*...*.', '*...*.', '*...*.', '.***..'],//O
    ['****..', '*...*.', '****..', '*.....', '*.....'],//P
    ['.***..', '*...*.', '*...*.', '*..**.', '.****.'],//Q
    ['****..', '*...*.', '****..', '*..*..', '*...*.'],//R
    ['.****.', '*.....', '.***..', '....*.', '****..'],//S
    ['*****.', '*.*.*.', '..*...', '..*...', '.***..'],//T
    ['*...*.', '*...*.', '*...*.', '*...*.', '.***..'],//U
    ['*...*.', '*...*.', '.*.*..', '.*.*..', '..*...'],//V
    ['*...*.', '*...*.', '*.*.*.', '**.**.', '*...*.'],//W
    ['*...*.', '.*.*..', '..*...', '.*.*..', '*...*.'],//X
    ['*...*.', '.*.*..', '..*...', '..*...', '..*...'],//Y
    ['*****.', '...*..', '..*...', '.*....', '*****.'],//Z
    ['......', '......', '......', '......', '......']//blank
];

c5_font = c5_font.map(x => x.map(_x => _x.split('')));

var page = Array.from({length:60}, _ => Array(60).fill('.'));
var ans = '';
for (var c = 0; c < input.length; c++) {
    var cmd = input[c].trim().split(' ')[0];
    if (cmd === '.P') {
        var [cmd, font, row, column] = input[c].trim().split(' ');
        var string = input[c].trim().split('|')[1];
        row = +row; column = +column;
        if (font === 'C1') {
            for (var i = 0; i < string.length; i++) {
                if (string[i] !== ' ' && column-1+i < 60) page[row-1][column-1+i] = string[i];
            }
        } else {
            for (var i = 0; i < string.length; i++) {
                placeC5(row-1, column-1+i*6, string[i]);
            }
        }
    } else if (cmd === '.L') {
        var [cmd, font, row] = input[c].trim().split(' ');
        var string = input[c].trim().split('|')[1];
        row = +row;
        if (font === 'C1') {
            for (var i = 0; i < string.length; i++) {
                if (string[i] !== ' ' && i < 60) page[row-1][i] = string[i];
            }
        } else {
            for (var i = 0; i < string.length; i++) {
                placeC5(row-1, i*6, string[i]);
            }
        }
    } else if (cmd === '.R') {
        var [cmd, font, row] = input[c].trim().split(' ');
        var string = input[c].trim().split('|')[1];
        row = +row;
        if (font === 'C1') {
            for (var i = 0; i < string.length; i++) {
                if (string.at(-1-i) !== ' ' && 59-i >= 0) page[row-1][59-i] = string.at(-1-i);
            }
        } else {
            for (var i = 0; i < string.length; i++) {
                placeC5(row-1, 60-(i+1)*6, string.at(-1-i));
            }
        }
    } else if (cmd === '.C') {
        var [cmd, font, row] = input[c].trim().split(' ');
        var string = input[c].trim().split('|')[1];
        row = +row;
        if (string.length&1) {
            var mid = Math.floor(string.length/2);
            if (font === 'C1') {
                page[row-1][30] = string[mid];
                for (var i = mid-1; i >= 0; i--) {
                    if (string[i] !== ' ' && 30-(mid-i) >= 0) page[row-1][30-(mid-i)] = string[i]
                }
                for (var i = mid+1; i < string.length; i++) {
                    if (string[i] !== ' ' && 30+(i-mid) < 60) page[row-1][30+(i-mid)] = string[i];
                }
            } else{
                placeC5(row-1, 27, string[mid]);
                for (var i = mid-1; i >= 0; i--) {
                    placeC5(row-1, 27-(mid-i)*6, string[i]);
                }
                for (var i = mid+1; i < string.length; i++) {
                    placeC5(row-1, 27+(i-mid)*6, string[i]);
                }
            }
        } else {
            var mid = string.length/2-1;
            if (font === 'C1') {
                for (var i = mid; i >= 0; i--) {
                    if (string[i] !== ' ' && 29-(mid-i) >= 0) page[row-1][29-(mid-i)] = string[i];
                }
                for (var i = mid+1; i < string.length; i++) {
                    if (string[i] !== ' ' && 29+(i-mid) >= 0) page[row-1][29+(i-mid)] = string[i];
                }
            } else {
                for (var i = mid; i >= 0; i--) {
                    placeC5(row-1, 24-(mid-i)*6, string[i]);
                }
                for (var i = mid+1; i < string.length; i++) {
                    placeC5(row-1, 24+(i-mid)*6, string[i]);
                }
            }
        }
    } else if (cmd === '.EOP') {
        ans += page.map(x => x.join('')).join('\n')+'\n\n'+'-'.repeat(60)+'\n\n';
        for (var i = 0; i < 60; i++) {
            for (var j = 0; j < 60; j++) {
                page[i][j] = '.';
            }
        }
    }
}
console.log(ans);

function placeC5(r, c, alpha) {
    var str = alpha === ' ' ? 26 : alpha.charCodeAt()-65;
    for (var i = r; i < r+5 && i < 60; i++) {
        for (var j = c; j < c+5 && j < 60; j++) {
            if (j < 0) continue;
            page[i][j] = c5_font[str][i-r][j-c];
        }
    }
}