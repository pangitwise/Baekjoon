var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var Z = input[1].trim().split(' ').map(x => +x);
// 스택으로 한 방향에서 가장 가까운 자기보다 큰 수 찾기
var highNumberLoc_left = stackingLeft(Z);
var highNumberLoc_right = stackingRight(Z);
console.log(highNumberLoc_right)
// DP를 이용해 최소 밀기 횟수 구하기
var dp = Array(n).fill(0);
dp[-1] = 0;
dp[n] = Infinity;
for (var i = 0; i < n; i++) {
    // 왼쪽으로 미는 경우
    var leftMax = highNumberLoc_left[i];
    dp[i] = Math.min(dp[i], dp[leftMax]+1);
    // 오른쪽으로 미는 경우
    var rightMax = highNumberLoc_right[i];
    dp[rightMax] = Math.min(dp[rightMax], dp[i-1]+1);
}
console.log(dp[n]);


function stackingLeft(Z) {
    // 오른쪽/왼쪽에서 스택으로 자기보다 가장 큰 왼쪽/오른쪽의 수를 찾기
    var stack = [];
    var highLocArr = Array(n);
    for (var i = n-1; i >= 0; i--) {
        while (Z.length > 0 && Z[stack.at(-1)] > Z[i]) {
            var loc = stack.pop();
            highLocArr[loc] = i;
        }
        stack.push(i);
    }
    // 스택에 남은 수들은 모두 왼쪽/오른쪽 끝까지 넘어트릴 수 있음
    for (var i of stack) highLocArr[i] = -1;
    return highLocArr;
}

function stackingRight(Z) {
    var stack = [];
    var highLocArr = Array(n);
    for (var i = 0; i < n; i++) {
        while (Z.length > 0 && Z[stack.at(-1)] > Z[i]) {
            var loc = stack.pop();
            highLocArr[loc] = i;
        }
        stack.push(i);
    }
    for (var i of stack) highLocArr[i] = n;
    return highLocArr;
}