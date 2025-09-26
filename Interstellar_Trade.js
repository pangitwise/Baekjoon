var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var N = +input[s++];
    var planets = [];
    for (var i = 0; i < N; i++) {
        planets.push(+input[s++]);
    }
    planets.sort((a,b) => a-b);
    var j = 1;
    var opt = Infinity;
    for (var i = 0; i < N-1; i++) {
        var wormhole1 = (planets[i]+planets[0])/2;
        var wormhole1_left = wormhole1-planets[0];
        while (planets[j]-wormhole1 <= wormhole1_left) {
            j++;
        }
        var wormhole1_right = planets[j-1]-wormhole1;
        var wormhole2 = (planets.at(-1)+planets[j])/2;
        var wormhole2_left = wormhole2-planets[j];
        var wormhole2_right = planets.at(-1)-wormhole2;
        var max = Math.max(
            Math.min(wormhole1_left+wormhole2_left, planets[j]-planets[0]),
            wormhole1_left+wormhole2_right,
            Math.min(wormhole1_right+wormhole2_left, planets[j]-planets[j-1]),
            Math.min(wormhole1_right+wormhole2_right, planets.at(-1)-planets[j-1]),
            wormhole1_left+wormhole1_right,
            wormhole2_left+wormhole2_right
        );
        opt = Math.min(opt, max);
    }
    ans += Math.round(opt)+'\n';
}
console.log(ans);