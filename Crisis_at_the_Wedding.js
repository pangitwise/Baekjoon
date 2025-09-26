var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var G = input[1].split(' ').map(x => +x);
G = G.concat(G);
var ans1 = divideGlasses(G);
G.reverse();
var ans2 = divideGlasses(G);
console.log(Math.min(ans1, ans2));


function divideGlasses(arr) {
    var half = arr.length>>1;
    var sum = arr.reduce((pre, cur) => pre+cur)>>1;
    var std = sum/half;
    var total = 0;
    var cnt = 0;
    var recGlass = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] >= std) {
            recGlass += arr[i]-std;
            total += recGlass;
            cnt++;
        } else {
            var d = std-arr[i];
            // 잔의 분배는 항상 제로섬이므로,
            // 최적으로 잔을 분배할 경우, 잔이 할당량을 채우지 못해 부족해지는 일은 없다
            if (recGlass >= d) {
                recGlass -= d;
                total += recGlass;
                cnt++;
            } else {
                // 채우지 못하는 경우, 최적 분배가 아니므로 초기화
                total = 0;
                cnt = 0;
                recGlass = 0;
            }
        }
        if (cnt === half) break;
    }
    return total;
}

// 11 6  10