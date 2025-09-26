var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
for (var c = 0; c < T; c++) {
    var [R, K] = input[s++].split(' ').map(x => +x);
    var ships = [];
    for (var i = 0; i < K; i++) {
        ships.push(input[s++].split(' ').map(x => +x));
    }
    ans += binarySearch()+'\n';
}
console.log(ans);


function binarySearch() {
    var start = 0;
    var end = 8000000;
    var min = Infinity;
    while (start+0.0000001 < end) {
        var mid = (start+end)/2;
        if (isPlanteDestructed(mid)) {
            min = Math.min(min, mid);
            end = mid;
        } else {
            start = mid;
        }
    }
    return min;
}

function isPlanteDestructed(t) {
    var section = [];
    var circum = Math.PI*R*2;
    for (var i = 0; i < K; i++) {
        var [X, Y, rocket_sp, virus_sp] = ships[i];
        var D = Math.sqrt(X**2+Y**2)-R;
        var arrivedTime = D/rocket_sp;
        if (arrivedTime <= t) {
            var remainTime = t-arrivedTime;
            var angle = getAngle(X, Y);
            var loc = Math.PI*R*2*(angle/360);
            var spread = virus_sp*remainTime;
            var [l, r] = [loc-spread, loc+spread];
            section.push([l, r]);
        }
    }
    var bol = false;
    if (section.length > 0) {
        section.sort((a,b) => a[0]-b[0]);
        var goal = circum+section[0][0];
        var recent = section[0][1];
        // 작은 값에서 큰 값으로로
        var i = 1;
        while (recent < goal && i < section.length) {
            var [l, r] = section[i];
            if (l <= recent) recent = Math.max(recent, r);
            i++;
        }
        if (recent >= goal) bol = true;
        // 큰 값에서 작은 값으로
        if (!bol) {
            section.sort((a,b) => b[1]-a[1]);
            var goal = section[0][1]-circum;
            var recent = section[0][0];
            var i = 1;
            while (recent > goal && i < section.length) {
                var [l, r] = section[i];
                if (recent <= r) recent = Math.min(recent, l);
                i++;
            }
            if (recent <= goal) bol = true;
        }
    }
    return bol;
}

function getAngle(X, Y) {
    var vector1 = [R, 0];
    var vector2 = [X, Y];
    var scalar = scalarProduct(vector1, vector2);
    var norm = Math.sqrt(R**2)*Math.sqrt(X**2+Y**2);
    var cosValue = scalar/norm;
    var rad = Math.acos(cosValue);
    var degree = rad/Math.PI*180;
    if (Y < 0) degree = 360-degree;
    return degree;
}

function scalarProduct(vector1, vector2) {
    var v = 0;
    for (var i = 0; i < vector1.length; i++) {
        v += vector1[i]*vector2[i];
    }
    return v;
}