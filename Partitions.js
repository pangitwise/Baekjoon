var k = +require('fs').readFileSync(0).toString().trim();
// 초기 상테 set = {1]에서 다음 과정을 k번 반복한다.
// 1. set 내 집합의 최소공배수 lcm이 set에 없다면, lcm을 set에 넣는다.
// 2. set 내 집합의 최소공배수 lcm이 set 있다면, lcm*2, lcm*3을 set에 넣는다.
var set = [[0], [1, 2, 1], [1, 3, 1]];
var pow = 1;
for (var i = 2; i <= k; i++) {
    if (i&1) {
        set.push([2, 2, pow, 3, pow-1], [2, 2, pow-1, 3, pow]);
    } else {
        set.push([2, 2, pow, 3, pow])
        pow++;
    }
}
var n = set.length;
ans = `${n}\n${set.map(x => x.join(' ')).join('\n')}`
console.log(ans);