var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, K, M] = input[0].split(' ').map(x => +x);
var rank = Array.from({length:5}, _ => Array(5).fill(0));
var point = Array(5).fill(0);
for (var i = 1; i < N+1; i++) {
    var [a1, a2, a3, a4, s1, s2, s3, s4] = input[i].trim().split(' ').map(x => +x);
    rank[a1][1]++;
    rank[a2][2]++;
    rank[a3][3]++;
    rank[a4][4]++;
    point[a1] += s1;
    point[a2] += s2;
    point[a3] += s3;
    point[a4] += s4;
}


var bol = false;
for (var i = 100; i >= -100; i--) {
    for (var j = i; j >= -100; j--) {
        for (var k = j; k >= -100; k--) {
            var l = (i+j+k)*-1;
            if (l <= k && -100 <= l && l <= 100) {
                var list = uma_point(i, j, k, l);
                if (list[M-1][1] === K) {
                    bol = true;
                    console.log([i, j, k, l].map(x => +x).join(' '));
                    break;
                }
            }
        }
        if (bol) break;
    }
    if (bol) break;
}
if (!bol) console.log(-1);

function uma_point(i, j, k, l) {
    var p1 = point[1]+rank_uma(1, i, j, k, l);
    var p2 = point[2]+rank_uma(2, i, j, k, l);
    var p3 = point[3]+rank_uma(3, i, j, k, l); 
    var p4 = point[4]+rank_uma(4, i, j, k, l);
    var sorted = [[p1, 1], [p2, 2], [p3, 3], [p4, 4]];
    sorted.sort((a,b) => a[0] !== b[0] ? b[0]-a[0] : a[1]-b[1]);
    return sorted;
}

function rank_uma(num, i, j, k, l) {
    var sum = 0;
    var p = [i, j, k, l]
    for (var t = 1; t <= 4; t++) {
        sum += p[t-1]*rank[num][t];
    }
    return sum;
}