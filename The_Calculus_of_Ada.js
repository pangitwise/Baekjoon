var input = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);
var n = input[0];
var series = input.slice(1);
console.log(recursion(series, 1).join(' '));


function recursion(series, dep) {
    if (series.length === 1) return [dep, series.at(-1)];
    var diff = [];
    for (var i = 1; i < series.length; i++) {
        diff.push(series[i]-series[i-1]);
    }
    if (diff.every(x => x === diff[0])) return [dep, series.at(-1)+diff[0]];
    var [poly, last] = recursion(diff, dep+1);
    return [poly, series.at(-1)+last];
}