var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var s = input[1].trim().split('').map(x => +x);
var occupied = 0;
var cnt_1 = 0;
var cnt_2 = 0;
var score = 0;
for (var i = 0; i < s.length; i++) {
    var plant_size = s[i];
    if (plant_size+occupied <= n) {
        if (plant_size === 1) {
            cnt_1 += 1;
            occupied++;
        } else {
            cnt_2 += 1;
            occupied += 2;
        }
    } else {
        if (plant_size === 1) {
            if (cnt_2 > 0) {
                cnt_2--;
                cnt_1++;
                occupied--;
            }
        }
    }
    score += cnt_1+cnt_2;
}
console.log(score);