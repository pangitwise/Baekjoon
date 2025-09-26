var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var p = input[1].split(' ').map(x => +x);
var l = input[2].split(' ').map(x => +x);
var cnt = 0;
for (var i = 1; i < n-1; i++) {
    if (p[i] < 0) {
        airCleaning(i);
    }
}
if (p.every((v, idx) => v >= l[idx])) {
    console.log(cnt);
} else {
    console.log(-1);
}


function airCleaning(x) {
    var l = x;
    var r = x;
    for (var i = x; i > 0; i--) {
        if (p[i] < 0) {
            l = i;
            continue;
        }
        break;
    }
    for (var i = x; i < n-1; i++) {
        if (p[i] < 0) {
            r = i;
            continue;
        }
        break;
    }
    var len = r-l+1;
    cnt += getCirculationCnt(len);
    var list = [];
    var sum = 0;
    for (var i = l; i <= r; i++) {
        list.push(-p[i]);
        sum += p[i];
    };
    for (var [i, j] = [l, 0]; i <= r; i++, j++) {
        p[i] = list.at(-1-j);
    }
    p[l-1] += sum;
    p[r+1] += sum;
    if (l-1 > 0 && p[l-1] < 0) airCleaning(l-1);
    if (r+1 < n-1 && p[r+1] < 0) airCleaning(r+1);
}

function getCirculationCnt(x) {
    return x*(x+1)/2;
}