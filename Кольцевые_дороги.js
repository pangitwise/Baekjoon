var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [n, q] = input[s++].split(' ').map(x => +x);
var road = [];
for (var i = 0; i < n; i++) {
    road.push(+input[s++]);
}
road.sort((a,b) => a-b);

var ans = '';
for (var i = 0; i < q; i++) {
    var [a, b] = input[s++].split(' ').map(x => +x);
    var [l, r, _l, _r] = binarySearch(b);
    var arc1_angle_L = 2*Math.PI*20*Math.min(Math.abs(l-b), 360-Math.abs(l-b))/360;
    var arc1_angle_R = 2*Math.PI*20*Math.min(Math.abs(r-b), 360-Math.abs(r-b))/360;
    var arc2_angle_L = 2*Math.PI*10*Math.min(Math.abs(l-a), 360-Math.abs(l-a))/360;
    var arc2_angle_R = 2*Math.PI*10*Math.min(Math.abs(r-a), 360-Math.abs(r-a))/360;
    var min = 10+Math.min(arc1_angle_L+arc2_angle_L, arc1_angle_R+arc2_angle_R);
    ans += min+'\n';
}
console.log(ans);


function binarySearch(x) {
    var start = -1;
    var end = n-1;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        if (road[mid] <= x && x < road[mid+1]) {
            return [road[mid], road[(mid+1)%n]];
        } else {
            if (road[mid] > x) end = mid;
            if (x >= road[mid+1]) start = mid;
        }
    }
    return [road[n-1], road[0]];
}