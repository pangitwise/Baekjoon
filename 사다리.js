var [x, y, c] = require('fs').readFileSync(0).toString().trim().split(' ').map(x => +x);
var ans = binarySearch(x, y, c);
console.log(ans);


function binarySearch(x, y, c) {
    var start = 0;
    var end = 40_0000_0000
    while (start+0.0001 < end) {
        var mid = (start+end)/2;
        var thisCrossY = get_cross_y(x, y, mid);
        if (thisCrossY < c) end = mid;
        if (thisCrossY > c) start = mid;
    }
    return mid;
}

function get_cross_y(x, y, dist) {
    var [_, ry] = get_contactPointOfLeftLadder(y, dist);
    var [_, ly] = get_contactPointOfRightLadder(x, dist);
    if (ry === undefined || ly === undefined) return -Infinity;
    var [slope_r, y_itc_r] = [ry/dist, 0];
    var [slope_l, y_itc_l] = [-ly/dist, ly];
    var cross_x = get_linear(slope_r, y_itc_r, slope_l, y_itc_l);
    return slope_r*cross_x+y_itc_r;
}

function get_contactPointOfLeftLadder(ry, dist) { 
    return ry > dist ? [dist, Math.sqrt(ry-dist)*Math.sqrt(ry+dist)] : [undefined, undefined];
}

function get_contactPointOfRightLadder(rx, dist) {
    return rx > dist ? [0, Math.sqrt(rx-dist)*Math.sqrt(rx+dist)] : [undefined, undefined];
}

// ax+b = cx+d의 해: x = (d-b)/(a-c)
function get_linear(a, b, c, d) {
    if (a !== c) {
        return (d-b)/(a-c);
    } else {
        return b === d ? undefined : null;
    }
}
