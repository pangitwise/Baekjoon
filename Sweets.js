var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [n, a, b] = input[s++].trim().split(' ').map(x => +x);
var jars = Array(n);
for (var i = 0; i < n; i++) {
    jars[i] = +input[s++];
}
var kinds = Array(b+1).fill(0);
var ini = jars[0];
for (var i = 0; i <= ini; i++) kinds[i] = 1;
var max = ini;
// 슬라이딩 윈도우적 기법으로 다음 경우의 수를 누적합으로 구하기
for (var i = 1; i < n; i++) {
    var wind = jars[i];
    max += wind;
    var sum = 0;
    for (var [j, k] = [0, 0]; j <= Math.min(max-wind, b) && k <= Math.min(max, b); j++, k++) {
        if (k <= wind) {
            sum += kinds[k];
            kinds[k] = sum;
        } else if (wind < k && k <= max-wind) {
            sum += kinds[k];
            sum -= kinds[j-1];
            kinds[k] = sum;
        } else if (k > max-wind) {
            sum -= kinds[j-1];
            kinds[k] = sum;
        }
        kinds[k] %= 2004;
    }
}
var ans = 0;
for (var i = a; i <= b; i++) {
    ans += kinds[i];
}
ans %= 2004;
console.log(ans);

// 0 1 2 3
// 1 1 1 1
// 1 2 3 4
// 1 3 6
// 0

// (2, 0, 0)
// (0, 2, 0)
// (0, 0, 2)
// (1, 1, 0)
// (1, 0, 1)
// (0, 1, 1)
