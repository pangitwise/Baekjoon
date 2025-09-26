var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var ans = '';
var K = +input[s++];
for (var c = 0; c < K; c++) {
    var [n, M] = input[s++].split(' ').map(x => +x);
    var mass = M;
    var stages = [];
    for (var i = 0; i < n; i++) {
        var [mi, ti, fi] = input[s++].split(' ').map(x => +x);
        mass += mi;
        stages.push([mi, ti, fi]);
    }
    var speed = 0;
    var h = 0;
    for (var i = 0; i < n; i++) {
        var [mi, ti, fi] = stages[i];
        var a = fi/mass-9.81;
        h += travel(speed, a, ti);
        speed = nextSpeed(speed, a, ti);
        mass -= mi;
    }
    ans += `Data Set ${c+1}:\n`;
    h = Number(Math.round(h*100)/100).toFixed(2);
    ans += h+'\n\n';
}
console.log(ans.trim());

function travel(v, a, t) {
    return v*t + a*t**2/2;
}

function nextSpeed(v, a, t) {
    return v+a*t;
}