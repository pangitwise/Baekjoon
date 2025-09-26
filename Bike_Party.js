var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var N = +input[s++];
var parties = [];
for (var i = 0; i < N; i++) {
    var [A, D] = input[s++].split(' ').map(x => +x);
    parties.push([A, D]);
}
// 원형이므로 2N 길이의 배열 준비
for (var i = 0; i < N; i++) {
    parties.push(parties[i]);
}
var ans = 'impossible';
for (var i = 0; i < N;) {
    var alcohol = 0;
    var dist = 0;
    var bol = true;
    for (var [j, k] = [i, 0]; k < N; j++, k++) {
        alcohol += parties[j][0];
        dist += parties[j][1];
        // 마지막 도착 지점을 제외한 모든 구간에서 alcohol > dist를 만족해야 한다
        // 마지막 도착 지점은 alchol >= dist면 충분
        if (!((k === N-1 && alcohol >= dist) || (k < N-1 && alcohol > dist))) {
            bol = false;
            break;
        }
    }
    if (bol) {
        ans = i+1;
        break;
    } else {
        // 실패할 시, j+1 미만의 시작점을 고려할 필요 없음
        i = j+1;
    }
}
console.log(ans);