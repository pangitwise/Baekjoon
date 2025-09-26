var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [w, h] = input[0].trim().split(' ').map(x => +x);
var [vx, vy] = input[1].trim().split(' ').map(x => +x);
var ratio = Math.sqrt(vx**2+vy**2);
var t = +input[2];

var [rx, ry] = [0, 0];
var recPath = 0;
while (recPath+0.0001 < t) {
    var [nextTime, mirrorType] = sectTime(rx, ry, vx, vy);
    var PathLen = nextTime*ratio;
    if (recPath+PathLen <= t) {
        recPath += PathLen;
        rx += vx*nextTime;
        ry += vy*nextTime;
    } else {
        var dp = t-recPath;
        var dt = dp/PathLen*nextTime;
        recPath += dp;
        rx += vx*dt;
        ry += vy*dt;
        break;
    }
    if (mirrorType === 'x') {
        [vx, vy] = [-vx, vy];
    } else if (mirrorType === 'y') {
        [vx, vy] = [vx, -vy];
    }
}
var ans = [rx, ry].join(' ');
console.log(ans)


function sectTime(x, y, vx, vy) {
    var thisTime_x = Math.min(binarySearch_x(x, vx, -w/2), binarySearch_x(x, vx, w/2));
    var thieTime_y = Math.min(binarySearch_y(y, vy, -h/2), binarySearch_y(y, vy, h/2));
    var mirror = thisTime_x < thieTime_y ? 'x' : 'y';
    return [Math.min(thisTime_x, thieTime_y), mirror];
}

function binarySearch_y(y, vy, goal) {
    var start = 0;
    var end = 1000;
    if ((vy <= 0 && goal > 0) || (vy >= 0 && goal < 0)) return Infinity;
    while (start+0.0000001 < end) {
        var mid = (start+end)/2;
        var next = y+vy*mid;
        if (goal < 0) {
            if (next < goal) end = mid;
            if (next > goal) start = mid;
        } else {
            if (next > goal) end = mid;
            if (next < goal) start = mid;
        }
    }
    return mid;
}

function binarySearch_x(x, vx, goal) {
    var start = 0;
    var end = 1000;
    if ((vx <= 0 && goal > 0) || (vx >= 0 && goal < 0)) return Infinity;
    while (start+0.0000001 < end) {
        var mid = (start+end)/2;
        var next = x+vx*mid;
        if (goal < 0) {
            if (next < goal) end = mid;
            if (next > goal) start = mid;
        } else {
            if (next > goal) end = mid;
            if (next < goal) start = mid;
        }
    }
    return mid;
}

// 3 2 -3 2

// 3 -2